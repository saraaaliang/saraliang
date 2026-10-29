// ── 設計師端狀態機（D1-D8b + S1-S5b）──────────────────────────────────────
// 只管設計師自己畫面上的導覽（flow）跟本機編輯中的決策資料；「decisions」在
// 送出（COPY_LINK）之前完全是本機草稿，客戶端看不到，送出那一刻才寫進共用
// 資料。送出之後靠「重新整理狀態」重新讀取共用資料，藉此知道客戶回覆了沒。
import {
  type Decision,
  loadSharedDecisions,
  saveSharedDecisions,
  resetSharedDecisions,
  selectedDecisions,
} from "./decisionModel";

export type DesignerFlow =
  | "idle"
  | "scanning" // D1
  | "delivery_setup" // D2
  | "scan_results" // D3
  | "generation_list" // D4
  | "translating" // D5
  | "reviewing" // D6（逐項審核，用 reviewCursor 決定顯示第幾項）
  | "send_setup" // S4
  | "link_ready" // S5（分享審查連結，還沒複製，有「預覽接收端頁面」「複製連結」兩個按鈕）
  | "link_copied" // S5b（按過「複製連結」之後，標題變「連結已產生」，按鈕變「完成」）
  | "review_status"; // D7／D8／D8b：同一個 flow，畫面依 decisions 實際狀態決定顯示「等待回應」還是「已回覆」

// S1-S3（AI 不確定性）是掛在 translating 之下的例外分支，不佔獨立 flow 值，
// 用一個獨立旗標表示目前是否顯示這個彈層，才不用把 translating 拆成好幾個 flow 狀態。
export interface UncertaintyModal {
  decisionId: string;
  step: "flagged" | "context_input"; // S1 / S2；S3 是 context_input 送出後的短暫確認，不需要獨立狀態
}

export interface DesignerState {
  flow: DesignerFlow;
  decisions: Decision[];
  reviewCursor: number; // D6 逐項審核到第幾個（index into decisions.filter(selectedForGeneration)）
  uncertainty: UncertaintyModal | null; // 非 null 時，UI 疊加 S1/S2 彈層
  deliveryMode: "visual" | "dev" | null; // D2 選擇的模式，MVP 只有 visual 可選
  clientConsentEnabled: boolean | null; // S4：是否開啟接收方確認功能，MVP 鎖定 true
}

// 每次「重新開始」都重新讀一次共用資料當初始值（正常情況下就是 initialDecisions，
// 除非上一輪示範已經寫入客戶端的回覆，RESET 時會連共用資料一起重置）。
export function createInitialDesignerState(): DesignerState {
  return {
    flow: "idle",
    decisions: loadSharedDecisions(),
    reviewCursor: 0,
    uncertainty: null,
    deliveryMode: null,
    clientConsentEnabled: null,
  };
}

export type DesignerAction =
  | { type: "START_SCAN" }
  | { type: "SCAN_DONE" }
  | { type: "SELECT_MODE"; mode: "visual" }
  | { type: "TOGGLE_CANDIDATE"; id: string }
  | { type: "CONTINUE_TO_GENERATION_LIST" }
  | { type: "REMOVE_FROM_GENERATION_LIST"; id: string }
  | { type: "BACK_TO_SCAN_RESULTS" }
  | { type: "START_GENERATION" }
  | { type: "GENERATION_DONE" }
  | { type: "EDIT_WHAT_CHANGED"; id: string; value: string } // AI 草擬的「變更」，設計師可改
  | { type: "EDIT_WHY"; id: string; value: string } // 「設計理由」：設計師自己寫，AI 不代填
  | { type: "CONFIRM_EXPLANATION"; id: string } // 文字框內「確認」：鎖定文字，自動前進到下一項
  | { type: "SET_REVIEW_CURSOR"; index: number } // 「‹ N / M ›」自由左右切換，跟確認狀態無關
  | { type: "ADVANCE_REVIEW" } // 外層「已確認說明 →」：全部項目個別確認後才可點，送出（開 S4）
  | { type: "CONFIRM_SEND_SETUP" }
  | { type: "COPY_LINK" } // S5「複製連結」：這一刻決策資料才真的寫進共用資料，客戶端才看得到
  | { type: "FINISH_SHARE" } // S5b「完成」關閉彈窗 → D7
  | { type: "REFRESH_STATUS" } // D7/D8/D8b 的「重新整理狀態」：重新讀共用資料，取代原本「開啟接收端畫面」
  | { type: "FLAG_UNCERTAINTY"; id: string } // S1（示範用，非自動觸發）
  | { type: "UNCERTAINTY_ADD_CONTEXT" } // S1 →「新增」→ S2
  | { type: "UNCERTAINTY_SUBMIT_CONTEXT" } // S2 → S3 →（自動）回 translating
  | { type: "UNCERTAINTY_SKIP" } // S1 →「略過」→ 回 D4，該項標記已移除
  | { type: "RESET" };

export function designerReducer(state: DesignerState, action: DesignerAction): DesignerState {
  switch (action.type) {
    case "START_SCAN":
      return { ...state, flow: "scanning" };

    case "SCAN_DONE":
      return { ...state, flow: "delivery_setup" };

    case "SELECT_MODE":
      return { ...state, deliveryMode: action.mode, flow: "scan_results" };

    case "TOGGLE_CANDIDATE":
      return {
        ...state,
        decisions: state.decisions.map((d) =>
          d.id === action.id ? { ...d, selectedForGeneration: !d.selectedForGeneration } : d
        ),
      };

    case "CONTINUE_TO_GENERATION_LIST":
      return { ...state, flow: "generation_list" };

    case "REMOVE_FROM_GENERATION_LIST":
      return {
        ...state,
        decisions: state.decisions.map((d) =>
          d.id === action.id ? { ...d, selectedForGeneration: false } : d
        ),
      };

    case "BACK_TO_SCAN_RESULTS":
      return { ...state, flow: "scan_results" };

    case "START_GENERATION":
      return { ...state, flow: "translating" };

    case "GENERATION_DONE":
      // AI 只產生「變更」；「設計理由」清空，要設計師自己填（示範資料裡的句子只當 placeholder）
      return {
        ...state,
        flow: "reviewing",
        reviewCursor: 0,
        decisions: state.decisions.map((d) => ({ ...d, clientExplanation: { ...d.clientExplanation, why: "" } })),
      };

    case "EDIT_WHAT_CHANGED":
    case "EDIT_WHY": {
      const field = action.type === "EDIT_WHAT_CHANGED" ? "whatChanged" : "why";
      return {
        ...state,
        decisions: state.decisions.map((d) =>
          d.id === action.id ? { ...d, clientExplanation: { ...d.clientExplanation, [field]: action.value } } : d
        ),
      };
    }

    case "CONFIRM_EXPLANATION": {
      const decisions = state.decisions.map((d) =>
        d.id === action.id ? { ...d, reviewed: true } : d
      );
      const selected = selectedDecisions(decisions);
      const isLast = state.reviewCursor >= selected.length - 1;
      return { ...state, decisions, reviewCursor: isLast ? state.reviewCursor : state.reviewCursor + 1 };
    }

    case "SET_REVIEW_CURSOR": {
      const selected = selectedDecisions(state.decisions);
      const clamped = Math.max(0, Math.min(action.index, selected.length - 1));
      return { ...state, reviewCursor: clamped };
    }

    case "ADVANCE_REVIEW":
      // 按鈕本身要所有項目都個別確認過才可點（由畫面端 disabled 控制）。
      return { ...state, flow: "send_setup" };

    case "CONFIRM_SEND_SETUP":
      // MVP 鎖定「是」。
      return { ...state, clientConsentEnabled: true, flow: "link_ready" };

    case "COPY_LINK":
      // 真正「送出」的瞬間：把目前的決策資料寫進共用資料，客戶端從這一刻起才看得到。
      saveSharedDecisions(state.decisions);
      return { ...state, flow: "link_copied" };

    case "FINISH_SHARE":
      return { ...state, flow: "review_status" };

    case "REFRESH_STATUS":
      return { ...state, decisions: loadSharedDecisions() };

    case "FLAG_UNCERTAINTY":
      return { ...state, uncertainty: { decisionId: action.id, step: "flagged" } };

    case "UNCERTAINTY_ADD_CONTEXT":
      return state.uncertainty
        ? { ...state, uncertainty: { ...state.uncertainty, step: "context_input" } }
        : state;

    case "UNCERTAINTY_SUBMIT_CONTEXT":
      return { ...state, uncertainty: null, flow: "translating" };

    case "UNCERTAINTY_SKIP": {
      if (!state.uncertainty) return state;
      const id = state.uncertainty.decisionId;
      return {
        ...state,
        uncertainty: null,
        flow: "generation_list",
        decisions: state.decisions.map((d) =>
          d.id === id ? { ...d, selectedForGeneration: false } : d
        ),
      };
    }

    case "RESET":
      // 重新開始連共用資料一起重置，不然客戶端上一輪的回覆會留著，跟新的一輪對不上。
      return { ...createInitialDesignerState(), decisions: resetSharedDecisions() };

    default:
      return state;
  }
}
