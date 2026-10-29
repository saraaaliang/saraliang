// ── RWD 數位繪本互動網站設計 — Case Study Content ──────────────────────────
// All copy and image references for the RWD Storybook case study live here.
// Edit text or swap image files below — no need to touch the layout component
// (src/app/RwdStorybookCaseStudy.tsx) to change content.

import cover from "./images/rwd-storybook/cover.png";
import problemPhoto from "./images/rwd-storybook/problem-photo.png";
import decisionVenn from "./images/rwd-storybook/decision-venn.png";
import userFlowImage from "./images/rwd-storybook/user-flow.png";
import mobileBeforeAfter from "./images/rwd-storybook/mobile.png";
import disclosureStory1 from "./images/rwd-storybook/disclosure-story-1.png";
import disclosureSubpageDevelopment from "./images/rwd-storybook/disclosure-subpage-development.png";
import disclosureStory2 from "./images/rwd-storybook/disclosure-story-2.png";
import disclosureSubpageEden from "./images/rwd-storybook/disclosure-subpage-eden.png";
import sidenavDiagram from "./images/rwd-storybook/sidenav-diagram.png";
import screen1 from "./images/rwd-storybook/screen-1.png";
import screen2 from "./images/rwd-storybook/screen-2.png";
import screen3 from "./images/rwd-storybook/screen-3.png";
import screen4 from "./images/rwd-storybook/screen-4.png";
import screen5 from "./images/rwd-storybook/screen-5.png";
import screen6 from "./images/rwd-storybook/screen-6.png";
import exhibition1 from "./images/rwd-storybook/exhibition-1.png";
import exhibition2 from "./images/rwd-storybook/exhibition-2.png";
import exhibition3 from "./images/rwd-storybook/exhibition-3.png";
import exhibition4 from "./images/rwd-storybook/exhibition-4.png";

export type IconKey =
  | "check"
  | "target"
  | "people"
  | "heart"
  | "compass"
  | "lightbulb"
  | "alert"
  | "smartphone"
  | "layers"
  | "navigation";

export interface RwdStorybookContent {
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
    coverCaption: string;
    coverLinkLabel: string;
    coverLinkHref: string;
  };
  impact: {
    kicker: string;
    stats: Array<{ icon: IconKey; title: string; description: string }>;
    feedbackLabel: string;
    quotes: Array<{ quote: string; author: string }>;
  };
  problem: {
    kicker: string;
    heading: string;
    image: string;
    imageCaption: string;
    users: {
      label: string;
      description: string;
      groups: Array<{ emoji: string; name: string; tag: string; traits: string[] }>;
    };
    insight: { label: string; text: string };
  };
  discovery: {
    kicker: string;
    assumptions: Array<{ icon: IconKey; heading: string; body: string }>;
  };
  decisionRationale: {
    kicker: string;
    image: string;
    imageCaption: string;
    statement: { before: string; bold: string; after: string };
  };
  designProcess: {
    kicker: string;
    intro: { before: string; bold: string; after: string };
    flowDiagram: { image: string; caption: string };
    mobileOptimization: {
      heading: string;
      insight: string;
      fixes: string[];
      image: string;
      imageCaption: string;
    };
    progressiveDisclosure: {
      heading: string;
      insight: string;
      description: string;
      examples: Array<{
        main: { src: string; caption: string };
        sub: { src: string; caption: string };
      }>;
    };
    sideNav: {
      heading: string;
      insight: string;
      points: string[];
      image: string;
      imageCaption: string;
    };
  };
  outcome: {
    kicker: string;
    pills: string[];
    screensLabel: string;
    screens: string[];
    exhibitionHeading: string;
    exhibitionPhotos: string[];
  };
  reflection: {
    kicker: string;
    cards: Array<{ heading: string; body: string }>;
  };
}

export const rwdStorybookContent: RwdStorybookContent = {
  meta: {
    id: "rwd-storybook",
    titleZh: "Interactive Design · RWD 數位繪本互動網站設計",
    year: "2021",
  },

  hero: {
    title: "RWD 數位繪本互動網站設計",
    tags: ["0-1數位體驗規劃", "資訊架構彙整", "視覺&互動效果設計"],
    description:
      "轉化線下展覽為數位互動網站，成功傳遞早療知識且結合娛樂互動，達到10倍以上高流量社群曝光。我針對使用者互動假設（能否持續參與、邊讀邊玩），與團隊進行多裝置實測，並用漸進式揭露平衡資訊量與設計一致性。（與伊甸基金會合作）",
    role: "UI/UX 設計師",
    focus: "0-1數位體驗規劃 · 資訊架構彙整 · 視覺&互動效果設計",
    coverImage: cover,
    coverAlt: "封面照片 — RWD 數位繪本互動網站設計，筆電與手機裝置上的「太空小英雄飛飛」互動網站畫面",
    coverCaption: "已上線之實際產品：",
    coverLinkLabel: "lovekidstory.eden.org.tw",
    coverLinkHref: "https://lovekidstory.eden.org.tw/",
  },

  impact: {
    kicker: "Impact",
    stats: [
      {
        icon: "check",
        title: "10 倍以上社群參與",
        description: "網站上線後達成 10 倍以上的社群參與、破千讚數，累積超過 6.5 萬次瀏覽。",
      },
      {
        icon: "target",
        title: "轉為長期展示網站",
        description: "品牌將此年度活動轉為長期對外展示網站。",
      },
      {
        icon: "heart",
        title: "親子共同參與好評",
        description: "參與者家長認為體驗「充滿想像力」「適合親子共同參與」。",
      },
    ],
    feedbackLabel: "User Feedback 社群媒體實際用戶回饋",
    quotes: [
      { quote: "兒童啟發，令人讚嘆！", author: "社群媒體留言" },
      { quote: "充滿想像力又繽紛，適合和小朋友一起體驗", author: "社群媒體留言" },
      { quote: "好看好玩！", author: "社群媒體留言" },
    ],
  },

  problem: {
    kicker: "Problem",
    heading: "疫情期間，如何把預計的線下展覽轉為線上，並協助家長在體驗中判斷孩童的發展情形？",
    image: problemPhoto,
    imageCaption: "照顧者與孩童一起體驗遊戲中",
    users: {
      label: "Users",
      description: "兩種使用者的需求互相牽動，網站需要同時滿足家長的觀察需求與孩童的遊戲樂趣。",
      groups: [
        {
          emoji: "👨‍👩‍👧",
          name: "家長／照顧者",
          tag: "觀察者",
          traits: ["與孩童一起使用這個網站", "需要吸收知識、同時觀察孩子"],
        },
        {
          emoji: "👶",
          name: "孩童",
          tag: "體驗者",
          traits: ["進行遊戲體驗", "需要好玩，才會想持續參與"],
        },
      ],
    },
    insight: {
      label: "兩種使用者的需求互相牽動",
      text: "如果孩子不想玩，家長就沒有觀察的情境；若文字資訊過於繁雜，家長也難以與孩子一起互動。",
    },
  },

  discovery: {
    kicker: "Discovery",
    assumptions: [
      {
        icon: "lightbulb",
        heading: "假設 1：知識用「讀」的效果有限",
        body: "比起被動閱讀衛教資訊,家長在跟孩子共同進行遊戲式互動時,更容易展現真實的觀察行為。",
      },
      {
        icon: "alert",
        heading: "假設 2：難同時「說故事＋玩遊戲＋吸收資訊」",
        body: "這三件事如果同時攤開在使用者面前，會造成注意力分散，反而三個都做不好。",
      },
      {
        icon: "compass",
        heading: "假設 3：瀏覽路徑需被引導，不是自由探索",
        body: "如果讓使用者可以跳頁直接玩遊戲，會失去故事鋪陳的意義，也可能漏掉自然觀察孩子互動的沈浸式設計。",
      },
    ],
  },

  decisionRationale: {
    kicker: "Decision Rationale",
    image: decisionVenn,
    imageCaption: "核心體驗落在遊戲體驗、早療知識與繪本視覺三者的交集",
    statement: {
      before: "核心體驗為「繪本敘事 + 穿插互動遊戲」而不是單純資訊型網站。目的是創造一個讓家長",
      bold: "「邊玩邊觀察」",
      after: "的自然情境。",
    },
  },

  designProcess: {
    kicker: "Design Process",
    intro: {
      before: "在前期概念階段，我對用戶的互動方式做出多項假設，例如能否持續參與、邊讀故事邊進行遊戲等。針對以上假設，我在不同裝置上測試，",
      bold: "進行迭代優化設計",
      after: "。",
    },
    flowDiagram: {
      image: userFlowImage,
      caption: "設計迭代過程中發現的用戶潛在痛點",
    },
    mobileOptimization: {
      heading: "為什麼將手機版優化",
      insight: "易用性測試中發現手機用戶沒注意到部分資訊",
      fixes: [
        "移除原本的插畫風格字體，採用黑體字體。",
        "背景以深色呈現，讓白色字體更清楚辨認。",
        "增強按鈕動畫效果，讓用戶更好辨認。",
        "在網站宣傳上多強調，「尋寶」「找到隱藏按鈕」的文字說明，儘量增加提醒。",
      ],
      image: mobileBeforeAfter,
      imageCaption: "手機版優化前後對照",
    },
    progressiveDisclosure: {
      heading: "為什麼要用漸進式揭露提升資訊易讀性",
      insight: "若同時「讀故事、玩遊戲、吸收資訊」易注意力分散",
      description:
        "我採用漸進式揭露方式，將發展遲緩資訊藏在按鈕背後，並將資訊內容分散至各頁面。保持介面視覺簡潔，讓家長在想要瞭解更多資訊時，再點擊隱藏按鈕，深入了解相關知識。",
      examples: [
        {
          main: { src: disclosureStory1, caption: "主要故事頁面（暗藏發光動態按鈕）" },
          sub: { src: disclosureSubpageDevelopment, caption: "子頁面：一到六歲發展指標資訊" },
        },
        {
          main: { src: disclosureStory2, caption: "主要故事頁面（暗藏發光動態按鈕）" },
          sub: { src: disclosureSubpageEden, caption: "子頁面：關於伊甸基金會介紹資訊" },
        },
      ],
    },
    sideNav: {
      heading: "為什麼要用側邊導覽設計",
      insight: "遊戲需要融入故事情境，才能自然的觀察孩童行為",
      points: [
        "側邊欄設計為「不能跳頁」。如果未逐一閱覽故事，就不能進行遊戲。",
        "如果用戶跳過故事頁，只玩遊戲，就只是「破關」用途，達不到讓家長觀察孩子行為的目的。",
      ],
      image: sidenavDiagram,
      imageCaption: "側邊導覽邏輯：Current page／Story page／Game page，完成任務後標記為星星",
    },
  },

  outcome: {
    kicker: "Outcome",
    pills: [
      "繪本故事頁面 + 3 款互動遊戲",
      "側邊導覽引導瀏覽路徑",
      "支援手機 / 平板 / 桌機（RWD）",
      "資訊採漸進式揭露，分散於各頁面按鈕",
    ],
    screensLabel: "Screens 部分畫面",
    screens: [screen1, screen2, screen3, screen4, screen5, screen6],
    exhibitionHeading: "後續實體展覽應用",
    exhibitionPhotos: [exhibition1, exhibition2, exhibition3, exhibition4],
  },

  reflection: {
    kicker: "Reflection",
    cards: [
      {
        heading: "讓需被點擊的元件增加差異性",
        body: "若有更多時間，我會更優化目前UI按鈕的呈現方式。讓按鈕與導覽等互動元素在視覺上更清晰地與插畫內容區分，提升不同裝置版本的易用性。",
      },
      {
        heading: "優化無障礙設計",
        body: "更注重無障礙設計，遵循 WCAG 規範，並對身心障礙或神經多樣性用戶進行更多測試，確保體驗對更廣泛的受眾具有包容性。",
      },
      {
        heading: "RWD需被優先考慮",
        body: "雖然專案初期以桌機優先設計，但經測試後發現手機使用率卻比想像中高更多。故往後專案在初期就會注意到手機版的安排。",
      },
    ],
  },
};
