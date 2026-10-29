// ── 2040 Community of Care — Case Study Content ────────────────────────────
// All copy and image references for the Community of Care case study live here.
// Edit text or swap image files below — no need to touch the layout component
// (src/app/CommunityOfCareCaseStudy.tsx) to change content.

import cover from "./images/community-of-care/cover.png";
import earlyDeathGrant from "./images/community-of-care/early-death-grant.png";
import earlyCityOfTrustMap from "./images/community-of-care/early-city-of-trust-map.png";
import keyInsightTrendScan from "./images/community-of-care/key-insight-trend-scan.png";
import outcomeServiceBlueprint from "./images/community-of-care/outcome-service-blueprint.png";
import outcomePrototypeCollage from "./images/community-of-care/outcome-prototype-collage.png";
import reflectionPhoto from "./images/community-of-care/reflection.png";

export type IconKey = "compass" | "flask" | "lightbulb" | "alert" | "target";

export interface CommunityOfCareContent {
  meta: {
    id: string;
    titleZh: string;
    year: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
    role: string;
    focus: string;
    coverImage: string;
    coverAlt: string;
  };
  impact: {
    kicker: string;
    stats: Array<{ icon: IconKey; title: string; description: string }>;
    notes: string[];
  };
  problem: {
    kicker: string;
    heading: string;
    before: string;
    bold: string;
    after: string;
    why: { before: string; emphasis: string; after: string };
  };
  discovery: {
    kicker: string;
    cards: Array<{ icon: IconKey; heading: string; body: string[] }>;
  };
  earlyExploration: {
    kicker: string;
    intro: string;
    directions: Array<{
      title: string;
      description: string;
      rejectedReason: string;
      image?: string;
      imageCaption?: string;
    }>;
    pivotNote: string;
  };
  keyInsight: {
    kicker: string;
    hypothesisLabel: string;
    hypothesis: string;
    concernsLabel: string;
    concerns: string[];
    nextStepLabel: string;
    nextStep: string;
    image: string;
    imageCaption: string;
  };
  decisionRationale: {
    kicker: string;
    notChosen: { heading: string; description: string; reasonHeading: string; reason: string };
    chosen: { heading: string; description: string; reasonHeading: string; reason: string };
  };
  solution: {
    kicker: string;
    before: string;
    bold: string;
    after: string;
  };
  outcome: {
    kicker: string;
    description: string;
    blueprintImage: string;
    blueprintCaption: string;
    prototypeImage: string;
    prototypeCaption: string;
  };
  reflection: {
    kicker: string;
    paragraph: string;
    image: string;
    imageCaption: string;
  };
}

export const communityOfCareContent: CommunityOfCareContent = {
  meta: {
    id: "community-of-care",
    titleZh: "Public Service Design · 2040 Community of Care",
    year: "2023",
  },

  hero: {
    title: "2040 Community of Care 社區心理健康支持服務設計",
    description:
      "將抽象模糊的公共服務概念，轉化為可測試與討論的產品計畫，此未來服務獲英國政府數位部門對外展出。我以 Prototype 與 Storyboard 進行街訪測試，依每週產品審查回饋調整服務假設。",
    role: "UX 研究員 · 服務設計師",
    focus: "英國數位政府 GOV.UK 合作 · 服務設計 · GDS 使用者中心原則",
    coverImage: cover,
    coverAlt: "封面照片 — 2040 Community of Care 社區心理健康支持服務設計",
  },

  impact: {
    kicker: "Impact",
    stats: [
      {
        icon: "target",
        title: "於英國政府大樓公開展出",
        description: "作為未來服務參考案例，向 GOV.UK 團隊及相關利害關係人展示。",
      },
      {
        icon: "compass",
        title: "獲得公共部門 stakeholders 近 75% 滿意度",
        description: "反映的是與相關人互動及訪談後，對此概念方向的認同度。",
      },
    ],
    notes: [
      "此專案性質：政策探索與概念驗證。目的：協助 GOV.UK 探索未來方向的可能性。",
      "採用 Research through Design（RtD）——設計不是最終產出，而是研究方法。透過情境、原型與接觸點，讓模糊的未來政策討論變得可視化、可有討論依據，並且和利害關係人進行方案迭代。",
    ],
  },

  problem: {
    kicker: "Problem",
    heading: "當前健保挑戰",
    before: "英國心理健康系統面臨需求劇增與資源枯竭，NHS 等候名單持續拉長，",
    bold: "民眾難以在問題惡化前獲得可及的支持",
    after: "。政府需要一套更具預防性、根植於社區的照護模式。",
    why: {
      before: "我與組員的任務不是提出現成解方，而是先驗證",
      emphasis: "「預防性、社區型照護」的方向是否可行",
      after: "。",
    },
  },

  discovery: {
    kicker: "Discovery",
    cards: [
      {
        icon: "compass",
        heading: "掃描到收斂",
        body: [
          "團隊以 Horizon Scanning 搭配 PESTLE 框架掃描社會趨勢，鎖定 2 大方向：高齡化議題、公民與政府共創關係，發展成 2 個初步概念並測試。",
        ],
      },
      {
        icon: "flask",
        heading: "初步概念測試結果",
        body: [
          "高齡化議題的「協助安樂死」測試中得到高度倫理疑慮",
          "公民與政府共創的「廢除警察」測試中觀眾感到困惑",
        ],
      },
      {
        icon: "lightbulb",
        heading: "推斷：需要一個更容易被公部門接受的框架",
        body: [
          "發現 GOV.UK 核心報告指出 2020 年代將是「預防性照護」的時代，團隊因此收斂到 Community of Care 的概念。",
        ],
      },
    ],
  },

  earlyExploration: {
    kicker: "Early Directions",
    intro:
      "團隊最早從 Horizon Scanning 找到的兩則弱訊號（weak signals）出發：一則是英國社會對「協助安樂死」合法化的討論，另一則是台灣 vTaiwan 公民與政府共同立法的協作平台。順著這兩則訊號，團隊先發展出兩個完全不同方向的概念並實際測試，後來都因為受訪者反饋而放棄。",
    directions: [
      {
        title: "Assisted Euthanasia／Death Grant",
        description:
          "因應高齡化人口、預期增加的疾病負擔與有限的政府預算，提出「死亡補助金（Death Grant）」作為協助民眾自主決定臨終方式的服務，並以低擬真原型（病患資訊卡、海報、線上申請頁）向路人與 GOV.UK 工作者測試。",
        rejectedReason:
          "測試後多數人提出倫理疑慮：經濟弱勢者是否可能被誘導申請？這項服務的立法者該是誰？團隊因此重新思考如何讓概念更像一個正向的政府倡議，而不是被誤解為變相的成本削減手段。",
        image: earlyDeathGrant,
        imageCaption: "我與團隊成員隨機找尋合適路人介紹政府安樂死計劃且依據回應思考方案優化方向",
      },
      {
        title: "Abolish Police／City of Trust Map",
        description:
          "設想一個公民與政府直接協作、不再需要警察作為中介角色的未來城市：警察局轉型為社區中心或食物銀行，理髮師成為傾聽民眾心理困擾的日常據點，社區也設有值得信賴的公共充電站、紓壓艙等設施。",
        rejectedReason:
          "受訪者（尤其是 GOV.UK 工作者）提出強烈疑問：現有制度要如何過渡？沒有警察真的安全嗎？團隊意識到「廢除警察」作為主要訴求太具爭議性，需要換一個更容易被接受的切入角度。",
        image: earlyCityOfTrustMap,
        imageCaption: "我與團隊成員正在和 GOV.UK 設計團隊進行服務每週審查（Product Weekly Critique）",
      },
    ],
    pivotNote:
      "因應回饋，團隊將焦點轉向「預防性」與「安全支持的社區」這個更正向、更容易溝通的角度，並依此發展出三個新原型：Life After Prison、Helping Health Choice、Community of Care，以腳本扮演向受訪者測試。但因三個主題彼此跳躍、評審與其他團隊成員反應難以跟上敘事，團隊最終決定集中深化 Community of Care 一個方向，其餘僅簡要帶過以呈現完整世界觀。",
  },

  keyInsight: {
    kicker: "Key Insight",
    hypothesisLabel: "假設",
    hypothesis:
      "團隊參考「理髮師作為社區心理健康介入點」的既有案例，賦能日常接觸點，降低民眾開口求助的心理門檻。",
    concernsLabel: "疑慮",
    concerns: [
      "信任：民眾測試後指出，可能不願意和目前接觸較少的 Uber 司機等角色傾訴心事，需要先建立起比現有更高程度的信任。",
      "隱私：向陌生店家人員揭露心理狀態，隱私邊界該如何拿捏。",
      "品質控管：如果店家人員的回應方式出了問題，民眾可以向誰反映？",
      "可及性：如何確保這項服務不會只惠及較有資源的族群，而排除弱勢或偏遠地區的民眾？",
    ],
    nextStepLabel: "下一階段目標",
    nextStep:
      "場所信任度提高——需額外機制設計（公開認證、培訓、品質把關等）。此為下一階段的設計議題，不是本次專案提供解法的部分。",
    image: keyInsightTrendScan,
    imageCaption:
      "趨勢掃描幫助我發現了心理健康治療方面的趨勢、微弱信號（Weak Signals）以及未來的可能性",
  },

  decisionRationale: {
    kicker: "Decision Rationale",
    notChosen: {
      heading: "不選擇：增設專業機構",
      description:
        "由中央政府提供資金與培訓，重新打造一個專門的場所提供民眾諮詢服務。",
      reasonHeading: "不選擇原因",
      reason:
        "「機構化」目前定義為等問題已經嚴重到需要正式醫療系統處理，由專業機構介入，和 GOV.UK 報告中提到的「主動預防」特性違背。",
    },
    chosen: {
      heading: "選擇：賦能在地店家",
      description:
        "由中央政府提供資金與培訓，地方政府管理參與店家提供的額外諮詢服務，讓理髮師、計程車司機等角色具備基本傾聽技巧。",
      reasonHeading: "選擇原因",
      reason:
        "針對「信任基礎不足」的疑慮，我理解對方指出的是「這個假設還需要哪些配套機制」，而不是「假設本身不成立」。理髮師模式已有案例佐證可行性，只是套用到更陌生情境時，信任門檻更高。",
    },
  },

  solution: {
    kicker: "Solution",
    before: "最終服務方向截取「在地商家作為心理健康接觸點」的可行性佐證，將",
    bold: "理髮師、計程車司機、店家人員培訓為社區日常心理支持的第一道接觸點",
    after:
      "，讓民眾在原本就熟悉、信任的日常場域裡，先有一次「被聽見」的機會，再視需要轉介正式醫療資源。",
  },

  outcome: {
    kicker: "Outcome",
    description:
      "服務目標：降低民眾開口求助的心理門檻。中央政府提供資金，地方政府與在地店家中心協調。於地方社區中心、店家等服務接觸點培訓具備基本傾聽技巧的人員，讓民眾能在熟悉的日常場所獲得初步的心理支持，並視需要轉介更完整的資源。",
    blueprintImage: outcomeServiceBlueprint,
    blueprintCaption:
      "社區心理健康服務流程：中央政府、地方政府、地方社區中心、服務接觸點與服務使用者之間如何協作與轉介",
    prototypeImage: outcomePrototypeCollage,
    prototypeCaption:
      "服務觸點原型：於不同店家場景測試的互動腳本與 Prototype，包含向 GOV.UK 介紹服務、用戶意見調查表、跨機構合作原型，以及幫助店家與民眾開啟對話的分享工具設計",
  },

  reflection: {
    kicker: "Reflection",
    paragraph:
      "我發現此專案經驗能很好運用於產品開發前期的概念模糊階段，利用 prototypes 和利益相關人測試，並以stroyboard讓溝通對象(客戶)對服務對象(user)產生深刻連結，以此建立更開放的心態進行討論，讓產出能考量到未來前瞻性 & 落地性，也在快速測試中了解每個角色最看重的價值是什麼。",
    image: reflectionPhoto,
    imageCaption: "於展覽現場介紹 Community of Care 服務概念",
  },
};
