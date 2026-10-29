// ── Sync AI 互動原型：共用資料模型 ──────────────────────────────────────────
// 設計師端（DesignerConsole）跟客戶端（ClientReview）是兩個獨立的網頁／路由，
// 各自有自己的畫面導覽狀態（見 designerState.ts／clientState.ts），但共用
// 同一份「決策資料」——真實產品裡這份資料活在後端，兩邊前端各自讀寫；這裡
// 沒有後端，用 localStorage 模擬「共用資料庫」：一邊寫入，另一邊重新載入
// （設計師端按「重新整理狀態」／客戶端重新整理頁面）時就會讀到最新版本。
//
// 完整規格見（開始改動前務必重新讀一次，比這份檔案新）：
//   Wireframe: https://claude.ai/code/artifact/1e16b7f3-23a2-4b47-af14-55380cbb024c
//   FR / 架構: https://claude.ai/code/artifact/a2e803f6-04e0-4e88-812b-8355859132a1

export type DecisionStatus =
  | "not_confirmed" // D7 送出後、C 端還沒確認也還沒留言（未閱覽）
  | "commented" // C4 留言但未確認（設計需調整，D8b）
  | "confirmed" // C5／C7 確認（D8／D11 已確認）
  | "affected_by_change"; // D9 模擬變更後，已確認的決策被標記受影響（D10 前）

export interface ClientExplanation {
  // 介面上只有兩欄：「變更」由 AI 依 Figma 檔案寫（事實），「設計理由」一律由設計師寫。
  // 原本的第三欄「背景脈絡」已併進設計理由（2026-10-27），一個畫面不要放三個註釋。
  whatChanged: string; // 變更
  why: string; // 設計理由
}

export interface Decision {
  id: string;
  name: string; // 例：「整體頁面設計」「CTA 視覺層級」
  candidateOrder: number; // D3 候選清單裡的顯示順序
  selectedForGeneration: boolean; // D3 是否被勾選（進入 D4 生成清單）

  // D6 審核：「變更」由 AI 依檔案差異草擬（設計師可改），「設計理由」一律由設計師自己寫，
  // AI 不代填（2026-10-28 方案 B）。whyExample 只當成設計理由欄位的 placeholder 示範句。
  whyExample: string;
  clientExplanation: ClientExplanation; // C3a/C3b 顯示的兩段式說明（變更／設計理由）

  reviewed: boolean; // D6：這一項是否已按下「確認」
  status: DecisionStatus;
  comment: string | null; // C4 送出的留言內容

  confirmedBy: string | null;
  confirmedAt: string | null;

  // D9-D11 版本變更迴圈專用；沒有變更時維持 undefined
  changeNote?: {
    diffSummary: string; // D10「修改差異與其他說明」文字框內容，可編輯
    diffReviewed: boolean; // 對應 D10 → D10b：設計師是否已按「確認」
  };
}

const CANDIDATE_DECISIONS: Omit<
  Decision,
  "selectedForGeneration" | "reviewed" | "status" | "comment" | "confirmedBy" | "confirmedAt"
>[] = [
  {
    id: "overall-layout",
    name: "整體頁面設計",
    whyExample: "讓訪客一眼看懂這是什麼課、適不適合自己，再決定要不要報名。",
    candidateOrder: 0,
    clientExplanation: {
      whatChanged: "課程頁重新排列，標題與關鍵資訊集中在主視覺下方。",
      why: "讓訪客一眼看懂這是什麼課、適不適合自己，再決定要不要報名。",
    },
  },
  {
    id: "cta-hierarchy",
    name: "CTA 視覺層級",
    whyExample: "讓訪客更快找到下一步，減少看完介紹卻沒有報名的情況。",
    candidateOrder: 1,
    clientExplanation: {
      whatChanged: "「Enroll now」報名按鈕放進右側卡片，並加強顏色對比。",
      why: "讓訪客更快找到下一步，減少看完介紹卻沒有報名的情況。",
    },
  },
  {
    id: "spacing",
    name: "間距調整",
    whyExample: "延續整體頁面重新排列的方向，讓資訊層級更容易一眼看懂。",
    candidateOrder: 2,
    clientExplanation: {
      whatChanged: "各區塊之間的間距重新調整。",
      why: "延續整體頁面重新排列的方向，讓資訊層級更容易一眼看懂。",
    },
  },
  {
    id: "type-contrast",
    name: "字級對比",
    whyExample: "延續整體頁面重新排列的方向，讓重點資訊更快被看到。",
    candidateOrder: 3,
    clientExplanation: {
      whatChanged: "標題與內文的字級對比加大。",
      why: "延續整體頁面重新排列的方向，讓重點資訊更快被看到。",
    },
  },
];

// 示範資料：4 個候選，預設勾選前 2 個（整體頁面設計、CTA 視覺層級）。
export const initialDecisions: Decision[] = CANDIDATE_DECISIONS.map((d, i) => ({
  ...d,
  selectedForGeneration: i < 2,
  reviewed: false,
  status: "not_confirmed",
  comment: null,
  confirmedBy: null,
  confirmedAt: null,
}));

export function selectedDecisions(decisions: Decision[]): Decision[] {
  return decisions.filter((d) => d.selectedForGeneration);
}

// ── 「共用後端」：用 localStorage 模擬，兩個獨立網頁各自讀寫同一組 key ──────────
const STORAGE_KEY = "sync-ai-prototype:shared-decisions";

export function loadSharedDecisions(): Decision[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialDecisions;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialDecisions;
  } catch {
    return initialDecisions;
  }
}

export function saveSharedDecisions(decisions: Decision[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
  } catch {
    // localStorage 不可用（例如無痕模式關閉儲存）就放棄同步，示範仍可繼續跑，只是兩邊看不到彼此的更新。
  }
}

export function resetSharedDecisions(): Decision[] {
  saveSharedDecisions(initialDecisions);
  return initialDecisions;
}
