// ── Sync AI：設計溝通轉譯工具 — Case Study Content ──────────────────────────
// All copy and image references for the Sync AI case study live here.
// Edit text or swap image files below — no need to touch the layout component
// (src/app/SyncAiCaseStudy.tsx) to change content.
//
// Status note: unlike the other case studies, this project has not shipped —
// it's a 5-day research-to-wireframe sprint that ends on an open question
// (see `openQuestion`), not a resolved outcome. Keep that framing when editing.

import cover from "./images/sync-ai/cover.png";
import surveyOverview from "./images/sync-ai/survey-overview.png";
import problemSurveyFrustration from "./images/sync-ai/problem-survey-frustration.png";
import userFlowDiagram from "./images/sync-ai/user-flow-diagram.png";
import prototypeDesignerModeSelect from "./images/sync-ai/prototype-designer-mode-select.png";
import prototypeDesignerReview from "./images/sync-ai/prototype-designer-review.png";
import prototypeClientFlow from "./images/sync-ai/prototype-client-flow.png";
import demoDesignerFlow from "./images/sync-ai/demo-designer-flow.gif";
import demoClientFlow from "./images/sync-ai/demo-client-flow.gif";
import wireframeDesignerHighlights from "./images/sync-ai/wireframe-designer-highlights.png";
import wireframeClientHighlights from "./images/sync-ai/wireframe-client-highlights.png";

export type IconKey = "alert" | "lightbulb" | "chat" | "people" | "check" | "target" | "compass";

export interface SyncAiContent {
  meta: {
    id: string;
    titleZh: string;
    year: string;
  };
  hero: {
    kicker: string;
    title: string;
    tags: string[];
    description: string;
    role: string;
    focus: string;
    coverImage: string;
    coverAlt: string;
  };
  keyInsight: {
    kicker: string;
    intro: string;
    stats: Array<{ icon: IconKey; title: string; description: string }>;
  };
  problem: {
    kicker: string;
    before: string;
    bold: string;
    after: string;
    why: { before: string; emphasis: string; after: string };
    images: Array<{ image: string; caption: string }>;
  };
  discovery: {
    kicker: string;
    persona: {
      label: string;
      description: string;
      cards: Array<{
        emoji: string;
        name: string;
        tag: string;
        traits: string[];
        quote: string;
        aiRole: string;
      }>;
    };
    journey: {
      heading: string;
      description: string;
      steps: Array<{ step: number; actor: string; emoji: string; action: string; detail: string }>;
    };
  };
  designRationale: {
    kicker: string;
    intro: string;
    flowImage: string;
    flowImageCaption: string;
    features: Array<{ heading: string; insight: string; why: string }>;
    notAdopted: { heading: string; description: string; reasonHeading: string; reason: string };
  };
  wireframeHighlights: {
    kicker: string;
    intro: string;
    designerImage: string;
    designerCaption: string;
    clientImage: string;
    clientCaption: string;
  };
  prototypeShowcase: {
    kicker: string;
    intro: string;
    designerVideo: string;
    designerVideoCaption: string;
    clientVideo: string;
    clientVideoCaption: string;
    ctaLabel: string;
    ctaDesignerLabel: string;
    ctaClientLabel: string;
  };
  solution: {
    kicker: string;
    before: string;
    bold: string;
    after: string;
    modeCompareHeading: string;
    modeCompare: Array<{ heading: string; items: string[] }>;
    screens: Array<{ image: string; caption: string }>;
  };
  openQuestion: {
    kicker: string;
    intro: string;
    forkBold: string;
    forkAfter: string;
    testPlanHeading: string;
    testPlanItems: string[];
    sprintTimeline: Array<{ day?: string; title: string; items: string[] }>;
  };
}

export const syncAiContent: SyncAiContent = {
  meta: {
    id: "sync-ai",
    titleZh: "AI Product Design · Sync AI 設計溝通轉譯工具",
    year: "2026",
  },

  hero: {
    kicker: "Case Study",
    title: "Sync AI：設計溝通轉譯工具",
    tags: ["使用者研究", "問卷數據洞察", "0-1 功能發想", "AI 產品設計"],
    description:
      "Sync AI 是一款 Figma 插件：幫助設計師把視覺圖像轉譯成客戶更能信服的商業語彙。提升接案設計師與客戶的共同理解，並提供完整的線上確認流程，取代在通訊軟體上反覆瀏覽的溝通方式。我獨立完成從使用者研究、wireframe 到可互動原型（設計師端與客戶端雙系統）的完整 0-1 流程。",
    role: "UI/UX 設計師",
    focus: "0-1 產品定義 · 使用者研究 · AI 功能設計",
    coverImage: cover,
    coverAlt: "Sync AI Figma 插件介面示意，顯示語意轉譯與規格檢測功能",
  },

  keyInsight: {
    kicker: "Key Insight",
    intro:
      "5 天內完成使用者研究、痛點驗證與初步 Wireframe，目標是釐清「AI 轉譯」這個功能方向，是否真的能提升接案設計師與客戶之間的溝通效率。以下數據來自 12 份有效問卷回應。",
    stats: [
      {
        icon: "alert",
        title: "66% 曾因誤解而重工",
        description:
          "「改稿次數超出預期：對方理解有誤，導致產出完全不對，又要重來」，66% 的受訪設計師對此感到心累。",
      },
      {
        icon: "lightbulb",
        title: "58% 希望有專業轉譯介入",
        description: "超過半數的接案設計師，希望能有「專業轉譯」角色，協助把設計語言轉換成客戶聽得懂的說法。",
      },
      {
        icon: "chat",
        title: "落差不只是資訊落差",
        description: "跨領域溝通的根本問題，是雙方對「完成」的定義從未真正對齊過，而不只是單純的用詞不同。",
      },
    ],
  },

  problem: {
    kicker: "Problem",
    before:
      "「與客戶/協作者的溝通摩擦」是接案設計師壓力來源之一。除了線上資料搜集，我也規劃了一份問卷了解接案設計師的背景和困擾，收到 12 份有效回應。核心洞察指出，",
    bold: "缺乏共同理解導致的反覆修改",
    after: "，往往不是因為設計本身不好，而是雙方在過程中沒有建立起共同的判斷依據。",
    why: {
      before: "也發現，",
      emphasis: "設計師在缺乏回饋與決策依據的情況下，必須獨自承擔設計決策風險",
      after:
        "，這也是為什麼「接案設計師的成長」不只是技能提升，而是從「執行設計」轉向「設計整個合作方式」，包含如何定義溝通、設定界線與選擇客戶。",
    },
    images: [
      {
        image: surveyOverview,
        caption: "問卷全貌：《給自由工作者的邀請》一起定義未來的「零摩擦」協作模式",
      },
      {
        image: problemSurveyFrustration,
        caption:
          "問卷第 6 題：「哪種狀況最讓你感到『心累』？」12 則回應中，66.7% 選擇「改稿次數超出預期：對方理解有誤，導致產出完全不對，又要重來」",
      },
    ],
  },

  discovery: {
    kicker: "Discovery",
    persona: {
      label: "Persona",
      description: "歸納出 3 個代表性人物的痛點，以及 AI 可以介入、幫助他們的地方。",
      cards: [
        {
          emoji: "🐣",
          name: "接案新手",
          tag: "剛接案 / 轉職",
          traits: ["剛接案 / 轉職", "容易被客戶帶著走"],
          quote: "做了一堆，最後被刪光光，實際露出的內容變得很少。",
          aiRole: "AI 角色介入：Mentor，協助判斷、補足專業規範。",
        },
        {
          emoji: "🧑",
          name: "斜槓接案者",
          tag: "斜槓 / 中階（最多人）",
          traits: ["斜槓 / 中階（最多人）", "有能力，但溝通過程不順暢"],
          quote: "溝通不夠清楚，導致成果與預期有巨大落差，應提供更明確的 ref 作為參考。",
          aiRole: "AI 角色介入：提升溝通效率，協助攔截無效修改。",
        },
        {
          emoji: "🧔",
          name: "全職接案者",
          tag: "全職接案",
          traits: ["全職接案", "發生過因溝通造成的砍案狀況", "開始建立自己的接案規則"],
          quote: "問題不是難溝通，會去評估這種溝通值不值得我花時間。",
          aiRole: "AI 角色介入：提升個人專業，將溝通變成一種「可收費的產品」。",
        },
      ],
    },
    journey: {
      heading: "User Journey",
      description: "完整狀態下的使用者情境：從設計師完成初步設計，到客戶確認、設計師收到通知的完整循環。",
      steps: [
        { step: 1, actor: "設計師", emoji: "🎨", action: "完成初步設計", detail: "在 Figma 上完成初步設計版本" },
        { step: 2, actor: "設計師", emoji: "📤", action: "交稿前", detail: "點擊「Sync AI 語意同步插件」" },
        {
          step: 3,
          actor: "設計師",
          emoji: "🤖",
          action: "開啟 Plugin 並操作",
          detail: "插件「掃描」畫面，AI 根據圖層屬性自動產出說明文字",
        },
        { step: 4, actor: "設計師", emoji: "🔗", action: "傳送連結", detail: "點擊「分享連結」，傳送至 LINE / Slack" },
        {
          step: 5,
          actor: "客戶",
          emoji: "💬",
          action: "桌機 / 手機端瀏覽 & 操作",
          detail: "逐點瀏覽細部設計說明，確認無誤或標註修改建議",
        },
        { step: 6, actor: "設計師", emoji: "✅", action: "收到通知", detail: "收到設計已確認通知，或收到設計調整建議清單" },
      ],
    },
  },

  designRationale: {
    kicker: "Design Rationale",
    intro:
      "我從問卷與訪談歸納出核心提問：如何透過 AI，讓接案設計師把客戶模糊的「主觀字眼」，轉化為彼此認可的「設計共識」？Sync AI 的目的是加速設計師跟合作夥伴之間的溝通效率，而合作夥伴主要是兩種角色：工程師，或是客戶／PM 這類偏策略面的角色，這也是「視覺溝通模式」跟「開發交付模式」兩種模式的由來。目前 MVP 先聚焦在策略面最痛的地方：設計圖只要經過掃描，就能產出一段輔助設計圖面的說明文字。",
    flowImage: userFlowDiagram,
    flowImageCaption:
      "Sync AI 完整產品願景流程：設計師啟用插件 → AI 自動掃描規格與狀態 → 依交付對象選擇轉譯模式 → 客戶端確認或標註建議 → 設計師收到確認通知",
    features: [
      {
        heading: "功能 1・客戶轉譯",
        insight: "AI 把設計師圖檔的視覺語言，轉譯成客戶能買單的語言。",
        why: "58% 受訪者渴望「專業轉譯」角色，再加上，其中有全職接案者表示他也會用 AI 潤飾文案增加說服力，促成這個功能方向。",
      },
      {
        heading: "功能 2・策略補充",
        insight: "設計師能再補上商業／策略層面的理由，讓客戶不只看到畫面說明，也了解「為什麼」。",
        why: "來自一個問卷中的觀察：部分資深接案者能判斷溝通成本過高，就果斷放棄合作機會，但新手卻較缺乏這樣的判斷力，容易造成合作到最後越來越缺乏身為設計師的意見表達。",
      },
      {
        heading: "功能 3・規格檢測",
        insight: "開發交付模式下，AI 自動掃描規格缺漏（設計系統無統一, 狀態缺漏等），在交付給工程師前先補齊。",
        why: "新手接案者需要有一角色（AI）幫他降低不確定性，確認設計的完整後再送出。",
      },
    ],
    notAdopted: {
      heading: "評估過但未採用：改稿次數上限機制",
      description: "問卷也顯示「改稿次數超出預期」是痛點，曾考慮設定「改稿滿 3 次不再處理」的機制。",
      reasonHeading: "為什麼沒有採用",
      reason:
        "這牽涉客戶關係與信任建立，第一階段不處理。改以 AI 協助雙方對完稿建立更好的共同理解，間接降低改稿次數，這個做法在目前全職接案者的實際案例中已經有成效。",
    },
  },

  wireframeHighlights: {
    kicker: "Wireframe",
    intro:
      "我與 AI 協作時，先產出關鍵 Wireframe 與 User Flow，同步推演極端情境下的操作路徑，逐步優化成更完整的 User Flow，再據此畫出 MVP 每張 Wireframe；過程中也發現功能缺口（例如缺少返回或離開頁面的選項），因此持續對齊 User Flow 架構，直到達到高完整度。我優先做完整的客戶端 wireframe：邀請、確認、留言、重新確認的閉環，這是 Sync AI 真正要驗證的差異化價值；設計師端則只畫出代表 AI 介入邏輯的關鍵畫面，因為這部分相對容易被市場上其他 AI 工具取代。",
    designerImage: wireframeDesignerHighlights,
    designerCaption: "設計師端：掃描、偵測候選重點、審核微調、確認送出。",
    clientImage: wireframeClientHighlights,
    clientCaption: "客戶端：邀請、總覽、決策細節、留言、確認完成、重新審查、再次確認，完整閉環。",
  },

  prototypeShowcase: {
    kicker: "Prototype",
    intro: "Wireframe 達到高完整度後，我把它串成一版可以實際操作的互動原型，並反覆測試、修正，設計師端與客戶端各自獨立的雙系統。",
    designerVideo: demoDesignerFlow,
    designerVideoCaption: "設計師端（桌機）關鍵畫面示範：交付設定 → 偵測結果 → 確認生成清單 → 審核與微調 → 分享審查連結",
    clientVideo: demoClientFlow,
    clientVideoCaption: "客戶端（手機）關鍵畫面示範：邀請頁 → 變更總覽 → 決策細節 → 確認完成",
    ctaLabel: "體驗可互動原型",
    ctaDesignerLabel: "設計師端",
    ctaClientLabel: "客戶端",
  },

  solution: {
    kicker: "Solution",
    before: "以下是我在 MVP 階段主要聚焦的「視覺溝通模式」實際畫面，核心是",
    bold: "把設計理念、行銷、UX 策略轉譯成客戶聽得懂的說明",
    after: "，兩種模式的完整差異見下方對照表。",
    modeCompareHeading: "兩種模式功能對照",
    modeCompare: [
      {
        heading: "視覺溝通模式",
        items: ["無掃描按鈕", "無 Spec 診斷區", "涵蓋功能 1、2（客戶轉譯、策略補充）", "適合廣告 / 文宣 / 品牌"],
      },
      {
        heading: "開發交付模式",
        items: ["掃描並檢測按鈕", "Spec 診斷結果區", "涵蓋功能 3（規格檢測）", "適合 UI / Web 產品"],
      },
    ],
    screens: [
      {
        image: prototypeDesignerModeSelect,
        caption: "插件總覽：啟用後先選擇工作模式，決定工作流程與可用功能（互動原型實際畫面）",
      },
      {
        image: prototypeDesignerReview,
        caption: "設計師端：視覺溝通模式，AI 依圖層屬性自動產出客戶語言與策略說明，逐項審核與微調（互動原型實際畫面）",
      },
      {
        image: prototypeClientFlow,
        caption: "客戶端手機審查流程：接收連結 → 設計概覽 → 詳細審查 → 確認定稿（互動原型實際畫面）",
      },
    ],
  },

  openQuestion: {
    kicker: "Open Question",
    intro:
      "Sync AI 專案仍在產品開發與測試階段。5 天衝刺已完成前期痛點研究、需求定義與 Wireframe，下一步將驗證產品範圍（Product Scope）的取捨：",
    forkBold: "核心問題：是否保留「客戶端確認閉環」，還是把範圍收斂成只做「AI 生成解釋」？",
    forkAfter:
      "此決定會直接影響 Sync AI 在通用 AI 工具（如 Figma MCP + Claude Code）逐漸普及之後，是否還有開發必要。如果只做解釋產出，價值主張會更接近可被取代的「文字生成」；如果保留確認閉環，才真正解決研究裡驗證出的「反覆修改」問題。",
    testPlanHeading: "驗證方法：MVP 開發測試",
    testPlanItems: [
      "A 版（AI Explanation）：設計師將 AI 生成的設計說明分享至既有 LINE／Slack 流程，驗證「僅提供 AI 解釋設計稿」的價值。",
      "B 版（AI Explanation + Confirmation Loop）：建立「分享連結 → 客戶逐項確認 → 即時通知設計師」的完整確認流程，驗證閉環機制是否能降低溝通成本。",
      "再追蹤 A、B 兩版的改稿次數與來回溝通次數，用數據決定產品範圍。",
    ],
    sprintTimeline: [
      {
        day: "Day 1",
        title: "專案啟動",
        items: ["釐清專案目標", "定義核心問題", "確認衡量指標與成功指標"],
      },
      {
        day: "Day 1–2",
        title: "痛點研究",
        items: ["客戶與設計師訪談", "現有流程觀察", "痛點與需求歸納"],
      },
      {
        day: "Day 2–3",
        title: "洞察與機會點",
        items: ["整理關鍵洞察", "定義設計機會點", "優先排序"],
      },
      {
        day: "Day 3–4",
        title: "概念發想",
        items: ["整理解決方案", "定製流程草圖", "功能優先級排序"],
      },
      {
        day: "Day 4–5",
        title: "Wireframe",
        items: ["繪製低保真 Wireframe", "設計關鍵流程與頁面"],
      },
      {
        day: "已完成",
        title: "原型開發",
        items: ["A 版：僅 AI 解釋", "B 版：含確認閉環", "建立可操作的薄型 Prototype"],
      },
      {
        title: "真實測試",
        items: ["邀請設計師與真實客戶參與", "進行實際需求確認流程"],
      },
      {
        title: "數據收集與分析",
        items: ["追蹤改稿次數", "來回溝通次數", "確認所需時間", "首次確認成功率", "主觀滿意度"],
      },
      {
        title: "決策與下一步",
        items: ["分析 A/B 結果", "決定產品範圍", "規劃開發路線圖"],
      },
    ],
  },
};
