# CLAUDE.md

指引 Claude Code 在這個作品集網站專案裡工作時使用。這份文件是給「接手 session」看的進度筆記，不是給訪客看的網站文件。

## 常用指令

都從 `Modern Portfolio Website/` 這個資料夾底下執行：

```bash
npm run dev                    # 啟動本機開發伺服器
npm run build                  # 打包成正式版
npm run optimize-images        # 一次性壓縮 content/images 底下的圖片
npm run optimize-images:watch  # 監看模式，丟新圖進資料夾會自動壓縮
```

目前沒有設定 lint 或測試指令（`package.json` 裡沒有 `lint`／`test` script），不要假設有並嘗試執行。

## 專案概況

- 這是 Sara 的個人作品集網站：首頁 + 6 個作品案例頁（`PROJECTS` 陣列規劃了 6 個位置，目前有 5 個實際條目——4 個真實作品（Sharing Time / Community of Care / SDG Energy / RWD Storybook）+ 1 個 `comingSoon` 佔位，**還缺 1 個佔位條目**才補滿 6 個）。
- 技術棧：Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion（`motion/react`）+ lucide-react 圖示。
- 專案根目錄：`Modern Portfolio Website/`（`npm run dev` 從這裡執行）。
- **已完成**：首頁（Hero / Selected Work / About / Contact / Footer 全部套用新設計系統）；作品1 Sharing Time、作品2 Community of Care、作品3 SDG Energy、作品4 RWD Storybook 四頁都已整頁做完，各自狀態見下方「作品進度」。
- **待完成**：作品 5–6，目前完全沒有內容，只有 `PROJECTS` 陣列裡的 `comingSoon` 佔位資料。

## 設計系統 / 規則

網站經歷過一次「Claude Design」提供的設計系統改版（代號 **Version C**），從舊的米色/teal 主題換成現在這套。**新作品頁請直接沿用這套色票字級，不要延用舊的 teal/米色系統。**

### 色票（都是寫死的 hex，不是 Tailwind 內建色名）

```
底色 / 墨色
  --bg 主背景        #ffffff
  --ink 標題文字       #15181a
  --body 內文文字      #40474a
  --muted 次要/說明文字  #8a908d
  --surface 卡片底色    #f4f5f2
  --border 邊框       #d8dbd5

強調色
  --accent 深綠（主強調色，kicker/連結/按鈕文字用）   #0f3d2b
  --accent-light 淺綠（icon圓圈底色、標籤pill、CTA按鈕底色） #cdec8e

區塊底色（整站最多用1-2個背景色，別亂加新色）
  --problem-band 淺卡其/鼠尾草綠（Problem區塊、Persona區塊底）  #eef4e8
  --dark-bg 深綠滿版色塊（Outcome區塊、首頁Contact收尾）      #0f3d2b
    --dark-ink 深色塊上的標題文字   #eef4e9
    --dark-body 深色塊上的內文文字  #c7d5c0
    --dark-caption 深色塊上的圖說   #9db097
    --dark-mobile-bg 深色塊裡手機截圖的底  #164a35
```

這些色票在 `src/styles/theme.css` 的 `:root` 裡也同步成 shadcn 語意變數了（`--background`／`--foreground`／`--card`／`--muted-foreground`／`--border`／`--primary`／`--accent` 等），所以舊元件如果用的是 `bg-background`／`text-foreground`／`border-border` 這類 Tailwind 語意 class，**會自動吃到新色票**，不需要每處都手動寫 hex。新寫的區塊（像 `SharingTimeCaseStudy.tsx`）則是直接用 inline `style={{ color: c.xxx }}` 寫死 hex（元件檔案開頭有一個 `c` 常數物件收斂全部色票）。

### 字體

- **Inter**（`var(--font-inter)`）：新設計系統的主字體，標題和內文都用它。案例頁 `SharingTimeCaseStudy.tsx` 全部用 Inter。
- **Cormorant Garamond 斜體**（`var(--font-cormorant)`）：**只用在引言/quote**（User Feedback 引言、Persona 卡片裡的語錄），不要用在其他地方。
- **Epilogue**（`var(--font-epilogue)`）：舊字體，理論上已被 Inter 取代，但還有 **4 處沒改**，是遺留、不是刻意設計：
  - Nav 左上角 logo「Sara Zhang」（`App.tsx` 裡的 `Nav` function）
  - 首頁 Hero 中文大標「善於將複雜議題...」（`HeroSection`）
  - 案例頁底部「Next Project」連結標題（`ProjectPage`）
  - 找不到專案時的 fallback「即將公開」頁面標題（`ProjectPage` 的 else 分支）
  - **待決定**：這 4 處要不要也換成 Inter，統一風格；還是刻意保留 Epilogue 做標題字體差異化。目前沒有定論。
- 字體都在 `src/styles/fonts.css` 用 `@import` 從 Google Fonts 載入，已含 Inter 400/500/600/700 + Cormorant Garamond 斜體 300/400。

### 間距 / 版型邏輯

- Kicker（區塊小標，如 Impact / Problem / Discovery）：`text-xs uppercase tracking-[0.1em] font-semibold`，顏色用 `--accent`，**永遠維持英文**，不要翻中文（首頁的 Selected Work / About / Contact 同理）。
- **完整的大中小標層級系統（L1-L6）**：見 `.claude/skills/heading-hierarchy/SKILL.md`。每次新增/修改案例頁的標題類元素（section 標題、子標題、卡片標題、小標籤）都要對照這份層級表，確認沒有「子層級視覺上比父層級還搶眼」的狀況（SDG Energy 的 Version 1/2/3 曾經比 Decision Rationale 還大，就是這個問題的實例）。
- 卡片：`rounded-2xl`（16px）用 `--surface` 底色；圖片用 `rounded-[20px]`。
- Icon 圓圈：`w-[52px] h-[52px] rounded-full`，底色 `--accent-light`，圖示或 emoji 置中。
- 圖文順序規則（使用者明確要求過）：**標題 → 內文 → 圖片 → 圖說**，圖片不能插在文字中間。
- 圖片處理原則：段落級大標題（Challenge/Solution等）可保留 1-2 段完整說明文字；細節展示型圖片（persona、journey map、過程照片）一律走「短句圖說 + 大圖」，不要長段落解釋圖片內容。
- 響應式對齊：像 Persona 的 About/Needs/Challenges/Opportunities 這種「多欄位需要跨欄水平對齊」的版面，桌面版用 **row-major CSS Grid**（同類項目排同一列，用 `gridTemplateRows` 明確宣告列數，讓 `grid-row: 1 / -1` 的分隔線能正確撐滿全高——**這裡曾經因為沒宣告 `gridTemplateRows` 導致分隔線只有一列高，之後遇到類似需求要記得先宣告好行數**），手機版用簡單的直向 stacked 版面（兩份 markup 各自用 `lg:hidden` / `hidden lg:grid` 切換，不要用同一份 markup 硬做響應式，行不通）。
- **卡片留白檢查（這個問題重複發生過好幾次，寫進去給每個 session 檢查）**：卡片（`Card2`／灰色 `--surface` 卡片、單點文字卡片等）只要內容撐不滿、留下大片空白或整張卡感覺「內容不多但卡很大」，就要重新設計，不要放著不管——**做完一個新區塊/卡片後，養成習慣自己截圖檢查一次留白比例，不要等使用者回頭抓**。常見修法（依情況挑一種，不是照順序都做）：
  1. **合併成一張卡**：好幾張各自獨立、內容稀疏的小卡，改成一張卡內部用 `border-top` 分隔多個小節。
  2. **收斂寬度對齊內容**：卡片不要無腦撐滿容器寬度，寬度收斂到跟相鄰文字段落對齊（例如用 `max-w-3xl` 對齊上方段落），或用 `display:inline-block`／`w-fit` 讓卡片貼合實際內容寬度，不要為了「看起來像卡片」硬撐滿版。
  3. **改成橫向排列**：資訊量少、每項都是「短標籤 + 一行說明」的情況，改成單行橫向多欄（欄與欄之間用 1px 分隔線），比堆疊直向的大留白卡更省空間。
  4. **降級成無卡片的純文字列表**：如果資訊真的很少（1-3 個短句），不一定需要卡片背景，用貼齊段落寬度的條列文字（`border-top` 分隔每項）或小標籤 chips 就夠了，不用每個區塊都塞進 `--surface` 灰底卡。
  SDG Energy 的 Reflection 區塊（`SdgEnergyCaseStudy.tsx` 的 `projectValue`）是這個問題的實際案例：原本 3 張稀疏小卡 → 先合併成 1 張大卡但還是偏空 → 使用者反饋「灰色卡片太大但資訊不多」，後續要在上面 4 種修法裡挑一種再改一輪（例如改法 3 橫向三欄，或改法 2 收斂成貼合內容寬度的小卡）。

### 共用 Component / Layout 邏輯

- `src/app/App.tsx`：首頁所有區塊（`HeroSection` / `AboutSection` / `ProjectsSection` / `ProjectCard` / `ContactSection` / `Footer` / `Nav`）+ 路由邏輯（`ProjectPage`：依 `project.id` 決定渲染哪個案例頁元件，找不到對應元件就渲染通用「即將公開」fallback）。
- **每個作品案例頁都應該是獨立元件 + 獨立內容檔**，不要塞進共用的 `CaseBlock`／泛用渲染邏輯（那套舊架構已經整個拆除，因為新設計系統每個案例頁的排版都不太一樣，硬共用只會綁死）。範例見 Sharing Time：
  - `src/app/SharingTimeCaseStudy.tsx` — 版面元件，不寫死任何文字或圖片路徑，全部從 `content` prop 讀。
  - `src/content/sharing-time.ts` — 純資料檔，文字內容 + 圖片 import 都在這裡，改文案/換圖不用碰版面程式碼。
  - `src/content/images/sharing-time/` — 圖片資料夾，**檔名要看得懂**（如 `cover.png`、`discovery-phase2-workshop.png`），不要用 Figma 匯出的亂碼檔名。
  - **未來作品2-6比照這個模式**：`SomeProjectCaseStudy.tsx` + `content/some-project.ts` + `content/images/some-project/`，然後在 `App.tsx` 的 `ProjectPage` 裡加一個 id 判斷分支。
- 圖片優化工具：`npm run optimize-images`（一次性）／`npm run optimize-images:watch`（監看模式，丟圖進資料夾自動壓縮）。原地覆蓋、同檔名同路徑，PNG/JPEG 用 `sharp` 壓、GIF 用 `gifsicle` 壓。腳本在 `scripts/optimize-images.mjs`。**GIF 如果是螢幕錄影類的長動畫，壓縮效果有限（GIF格式先天限制），建議轉成 MP4**（`<video autoPlay loop muted playsInline>`），可省 60-90% 檔案大小，Outcome 區塊的手機截圖已經是這樣處理。

## 作品3目前進度（SDG Energy / SDGs 能源互動體驗設計）

**整頁架構已經做完**，Hero → Impact → Problem → Discovery → Design Process（獨立呈現 Version 1→2→3 介面迭代故事）→ Outcome → Reflection，全部有真實文案，圖片是從 Figma 截圖裁切出來的（Figma 檔案節點過大，`get_metadata` 對這個 node 一直回傳 SSE 解析錯誤，改用 `get_screenshot` 抓整頁再用 Python/Pillow 裁切成各區塊圖片，存進 `content/images/sdg-energy/`）。

**背景資訊：**
- 舊版能源互動裝置是**前一屆專案團隊留下的**，Sara 這次接手改版，並訪談了前案的 PM 與工程師來確認問題根源（不是 Sara 自己團隊的舊版）。
- 展出於 2021 台灣永續行動週（Taiwan SDGs Action Days）· 國父紀念館及中山公園廣場 · 主辦：立法院聯合國永續發展目標策進會、國立國父紀念館 · 承辦：紙風車文教基金會。這段資訊放在 Hero 區塊的 `exhibition` 欄位。
- Design Process 裡 Version 1→2→3 的手勢迭代故事：V1 是 Sara 提的翻轉指針（旋鈕）手勢但工程成本太高 → 工程師建議延用舊版旋轉手勢，但 Sara 認為不夠直覺、改用左右滑動 → V3 定案為「車用儀表板」視覺概念。

**卡住 / 還沒決定的事：**
1. 圖片是從 Figma 截圖裁切而來（非乾淨的原始 export），畫質已是 Figma 原始畫布解析度（1280px 寬）上限，如果之後 Sara 有更高解析度的原始素材，可以直接替換 `content/images/sdg-energy/` 裡對應檔名的圖。
2. 沒有專屬的 Reflection 照片，目前 Reflection 區塊是純文字 + Project Value 小卡片，沒有配圖（跟 Sharing Time / Community of Care 的 Reflection 都有照片不同，是刻意的版面差異）。

**下一步：** 沒有明確排定——上面 2 點任一項有新素材，直接接續處理即可。

## 作品1目前進度（Sharing Time / 企業服務：內部分享服務設計）

**整頁架構已經做完**，Hero → Impact → Problem → Discovery（含 Phase1/Phase2/Persona/利害關係人地圖）→ Design Process → Solution → Outcome（含 Service Blueprint + 數位化延伸 4 支 MP4）→ Reflection，全部有真實文案和真實圖片/影片，不是佔位內容。

**卡住 / 還沒決定的事：**
1. **Persona 4 張人物照片還沒有**——目前是「照片待上傳」空白佔位（`content/sharing-time.ts` 裡 `persona.cards[].photo` 是 `undefined`）。原本 Figma 匯出的兩張圖其實是研究看板截圖不是人像照，已經刪除。等 Sara 提供新照片後，存進 `src/content/images/sharing-time/`，用檔名告訴 Claude 就能接上。
2. **字體一致性未決**：Nav logo / 首頁 Hero 中文大標 / Next Project 連結 / Coming Soon fallback 這 4 處還是 Epilogue 字體，要不要統一成 Inter 還沒決定（見上方「字體」小節）。
3. Decision 區塊的 3 張競品參考圖、Service Blueprint 的左右兩張截圖，都是沿用最早 Figma 匯出的原始素材，還沒跟 Sara 確認是否為最終定案版本。

**下一步：** 沒有明確排定——上面 3 點任一項有新素材或決定，直接接續處理即可。

## 作品4目前進度（RWD Storybook / RWD 數位繪本互動網站設計）

**整頁架構已經做完**，Hero → Impact（含 User Feedback 社群留言）→ Problem（含 Users）→ Discovery（3 個假設卡）→ Decision Rationale（venn 圖）→ User Flow → Design Process（手機版優化 / 漸進式揭露 / 側邊導覽三個子區塊）→ Outcome（4 個重點 pill + Screens 截圖 + 後續實體展覽應用）→ Reflection，全部有真實文案，來源是 Figma 檔案 `Ib75XLreTXSmOdKhN7lhI6`（node `1:1115`）。

**背景資訊：**
- 與伊甸社會福利基金會合作，將原訂的線下早療知識展覽因疫情改為線上互動網站（「太空小英雄飛飛」故事＋3款互動遊戲），後續也延伸出實體展覽版本（黑洞歷險互動裝置等）。
- 這個 Figma node 跟 SDG Energy 一樣，`get_metadata`／`get_design_context` 對這個 node 直接回傳 SSE 解析錯誤（node 太大），改用 `get_screenshot` 抓整頁（1280×8431）再用 Python/Pillow 裁切成各區塊圖片，存進 `content/images/rwd-storybook/`。

**卡住 / 還沒決定的事：**
1. **專案年份是猜的**——`content/rwd-storybook.ts` 的 `meta.year` 目前寫 `"2021"`，是根據「疫情期間」的敘述推測、跟 SDG Energy 同年，Sara 當時問到年份時回答「沒有偏好」。這個欄位目前網站上幾乎不會顯示出來（因為 `ProjectCard` 有 `role` 時不會秀 `year`），但如果之後要精確標示，需要跟 Sara 再確認實際執行年份。
2. Decision Rationale 的 venn 圖、User Flow 的流程圖、側邊導覽邏輯圖，都是直接從 Figma 截圖裁切而來（非乾淨原始 export），文字是圖片裡烤進去的，不是可選取的真實文字——如果之後有更高解析度或可編輯的原始素材，可以替換。

**下一步：** 沒有明確排定——上面 2 點任一項有新素材或決定，直接接續處理即可。

## Sync AI Prototype 目前進度

一個獨立於作品集主站的**互動原型**，不是案例頁的一部分，做完之前刻意不放出任何可點擊的連結。

### 2026-09-05 架構大改：拆成兩個各自獨立的網頁（設計師端／客戶端）

**這是目前最重要的架構決定，之後接手務必先讀這段。** 原本整個原型是「一個 session、一份共用 state、用 `surface` 欄位切換視角」，裡面有好幾顆「開啟接收端審查畫面」「查看設計師端」這種按鈕讓單人示範可以切來切去。使用者指出這不對：**真實產品裡設計師端（Figma 外掛）跟客戶端（任何瀏覽器都能打開的純網頁，不用下載 App）是兩個完全獨立的系統，中間沒有任何一邊能「打開」另一邊的畫面**，兩邊只靠共用的後端資料連動——客戶確認或留言，資料會進後端；設計師重新整理才會看到最新狀態，不是即時推播。舊架構那些切換按鈕全部拿掉，改成下面這個模型：

- **兩個完全獨立的隱藏路由**（`src/app/App.tsx`）：
  - `#sync-ai-prototype` → `SyncAiPrototype.tsx`（設計師端入口，only render `DesignerConsole`）
  - `#sync-ai-review` → `SyncAiClientPage.tsx`（客戶端入口，only render `ClientReview`）
  - 兩個入口各自 `useReducer`，完全不共用 React state，也沒有任何「切到對方視角」的按鈕或 UI。
- **共用資料靠 localStorage 模擬後端**（`decisionModel.ts`）：`loadSharedDecisions()`／`saveSharedDecisions()`／`resetSharedDecisions()`，key 是 `sync-ai-prototype:shared-decisions`。這是唯一連接兩個系統的地方，刻意做成「讀寫一份資料」而不是「兩份各自寫死的假資料」，因為使用者明確要求「背後資料是連動的」。
- **設計師端只在「送出」那一刻寫入共用資料**：D1-D6 全部是本機草稿，客戶端看不到；`COPY_LINK`（S5「複製連結」）那一刻才 `saveSharedDecisions(state.decisions)`，這之後客戶端才讀得到內容。送出之後設計師端不會再主動寫入，只能用 D7/D8/D8b 畫面上的「重新整理狀態」（`REFRESH_STATUS` action）重新讀一次，藉此知道客戶端做了什麼——這顆按鈕取代了原本「開啟接收端審查畫面」，語意上誠實很多（「去後端查最新狀態」而不是「打開對方的畫面」）。
- **客戶端每次確認／送出建議都立刻寫回共用資料**（`clientState.ts` 的 `CLIENT_CONFIRM_CURRENT`／`CLIENT_SUBMIT_COMMENT` 內都呼叫 `saveSharedDecisions`），因為客戶端動作對應到「打 API 更新後端」，是即時的；不對稱地，設計師端要「重新整理」才看得到，這個不對稱是刻意的，符合現實中沒有 websocket 即時通知的情境。
- **D7/D8/D8b 合併成同一個 flow 值 `review_status`**（原本是分開的 `review_pending`／`designer_resolved`），畫面上顯示哪一種完全看 `decisions` 目前的實際狀態算出來（`anyResponded`／`allResolved`），不是靠切換 flow 值——這樣「重新整理狀態」單純只是重新抓資料，畫面自然跟著資料變，不需要額外的狀態機分支。
- **RESET 的範圍不對稱**：設計師端「重新開始」會連 `resetSharedDecisions()` 一起重置（回到最初始的 2 個 not_confirmed 決策），因為重新開始示範代表要讓客戶端也回到起點；客戶端「重新開始」只重置自己的畫面導覽位置（回到 C1），**不會**動共用資料，因為現實中客戶沒有權限重置設計師那邊的東西。
- **測試方式**：兩個路由各自開一個分頁（`#sync-ai-prototype` 一個、`#sync-ai-review` 一個），在其中一邊操作、另一邊重新整理／按「重新整理狀態」，確認資料真的同步——已經這樣測過一輪：客戶端兩項都確認 → 設計師端按「重新整理狀態」→ 正確顯示 D8「已確認」雙勾；設計師端「重新開始」→ 客戶端重新整理 → 正確變回 `not_confirmed`。
- **D9-D11／C6-C7 尚未實作，而且需要重新設計，不是直接照舊的 reducer 邏輯接上去**：舊版 `state.ts` 曾經寫過 `SIMULATE_CHANGE`／`REDETECT`／`NOTIFY_CLIENT_REPROMPT`／`CLIENT_RECONFIRM` 這些 action，但都是建立在「單一共用 state、靠 surface 切換」的舊架構上，這次重構時已經整個拿掉，**不在** `designerState.ts`／`clientState.ts` 裡。之後要做這段時，`NOTIFY_CLIENT_REPROMPT` 這類「設計師端動作、影響客戶端看到的東西」的 action，要照現在的模式設計成「設計師端寫入共用資料」，客戶端要靠自己重新整理頁面才看得到（不是靠 action 直接把兩邊狀態一起改掉），跟 D7/D8 現在的「送出／重新整理」模式一致。

### 程式碼位置（`src/app/sync-ai-prototype/`，2026-09-05 更新）

- `decisionModel.ts` — `Decision`／`DecisionStatus`／`ClientExplanation` 型別、`initialDecisions` 示範資料、localStorage 共用資料讀寫函式。兩邊入口都從這裡 import。
- `designerState.ts` — 設計師端專用：`DesignerFlow`／`DesignerState`／`designerReducer`，只管 D1-D8b + S1-S5b 的本機導覽跟草稿編輯。
- `clientState.ts` — 客戶端專用：`ClientFlow`／`ClientState`／`clientReducer`，只管 C1-C5 的本機導覽。
- `ui.tsx` — 色票 `c`、`StatusBadge`、`LoadingChecklist`、`CheckRow`、`EditConfirmBox`、`MiniPagePreview`（C3a/C3b 跟 S5 預覽面板共用的迷你畫面示意圖，2026-09-05 從 `ClientReview.tsx` 搬過來，兩邊都要用）。
- **示範設計稿（2026-10-27）**：`ui.tsx` 的 `DESIGN` 是設計師端 Figma 畫布、客戶端 C1/C2/C3、S5 預覽共用的唯一來源，目前是使用者自己的 V Houses 課程頁首屏（`content/images/sync-ai/design-course-page.png`，1440×1024）。`ctaRect`／`thumbFocus`／`layoutFocus`／`ctaFocus` 都是以整張圖百分比計的區域，換圖時要一起重量；`DesignArt` 負責裁切、`rectWithin` 負責把區域換算成疊加框。設計師端外框刻意做成 Figma 介面（工具列、Pages/Layers、灰色畫布、浮動外掛視窗、藍色選取框），示範決策文案也改成課程頁情境（主視覺下方集中資訊／「Enroll now」報名按鈕）。案例頁的兩支 GIF 與原型截圖是改完後用 Playwright 重錄的（腳本沒有進 repo）。
- **D6 審核卡改成方案 B（2026-10-28）**：「變更」由 AI 依檔案差異草擬（可編輯），「設計理由」一開始是空的、只有示範句當 placeholder（`Decision.whyExample`），設計師要自己寫才能按「確認」；`GENERATION_DONE` 會把 `clientExplanation.why` 清空，`EDIT_WHAT_CHANGED`／`EDIT_WHY` 取代原本的 `EDIT_RATIONALE`，`designerRationale` 欄位已拿掉。客戶端單獨開（沒有經過設計師流程）時，`initialDecisions` 的 why 仍是示範句，所以客戶端示範不會出現空白理由。設計稿縮圖圓角統一是 `ui.tsx` 的 `DESIGN_THUMB_RADIUS`（4px，透過 `DesignThumb`），Figma 畫布上的 frame 維持直角。
- `DesignerConsole.tsx` — 設計師端畫面 D1–D8b + S1-S5b，吃 `DesignerState`／`Dispatch<DesignerAction>`。
- `ClientReview.tsx` — 客戶端畫面 C1–C5，吃 `ClientState`／`Dispatch<ClientAction>`。
- `SyncAiPrototype.tsx` — 設計師端入口（`#sync-ai-prototype`），掛 `designerReducer`，沒有任何跨系統切換 UI。
- `SyncAiClientPage.tsx` — 客戶端入口（`#sync-ai-review`），掛 `clientReducer`，沒有任何跨系統切換 UI。
- ~~`state.ts`~~ — 2026-09-05 已刪除，內容拆成上面三個檔案。

### 畫面內容本身的規格歷史（跟這次架構重構無關，是 wireframe 內容迭代的記錄）

- **已完成並驗證**：設計師端 D1–D7 + S4/S5/S5b（彈窗）+ D8/D8b（現在合併成 `review_status` 一個 flow，見上面架構說明）；客戶端 C1–C5（含 C3a/C3b 逐項、C4 補充建議）。D8 或 D8b 顯示哪一種完全由 `decisions` 的實際 `status` 決定，任何項目都可以走任一分支。S1-S3（AI 不確定性彈窗）還沒做。
- **D6／C3a-C3b 的「‹ N/M ›」自由切換 + 確認自動前進**：標題旁／正下方的頁碼可以自由左右切換，跟確認狀態無關；「確認」動作額外會自動前進到下一項（不是最後一項時），這是使用者 2026-09-05 明確要求的行為（跟「導覽完全脫鉤」的原始設計有點矛盾，但使用者看過取捨後選了這版）。D6「已確認說明 →」要 `selected.every(d => d.reviewed)` 才會亮起。
- **S4／S5／S5b**：S4 是非/是選項置中的「是否開啟接收方設計確認功能」；S5「分享審查連結」有「預覽接收端頁面」＋「複製連結」兩個按鈕；S5b「連結已產生」，狀態文字「✓ 已複製到剪貼簿」（不能點）跟動作按鈕「完成」是分開的兩個元素，不要合併回同一顆按鈕（使用者明確反饋過這樣會讓人搞不清楚幹嘛要點兩次）。
- **S5「預覽接收端頁面」**：疊在桌機視窗裡的唯讀面板（`DesignerConsole.tsx` 內部 `previewOpen` 這個本地 `useState`，跟共用的 reducer 完全無關），`DesignerConsole` 桌機外框全程不卸載；內容一頁式由上往下捲動，沒有任何按鈕互動，純粹讓設計師核對圖跟文字有沒有清楚標示。
- **C3a/C3b**：標題列用 `DetailHeader`（‹›各自貼邊，到頭尾會 disabled；標題正下方縮小淡化的「N/M」）；內容只有兩欄：「變更」（AI 依 Figma 檔案寫的事實）和「設計理由」（一律由設計師寫）。2026-10-27 使用者要求把原本的「發生了什麼變化／為什麼／背景脈絡」三欄改成這兩欄，理由是字眼冗長口語、一個畫面三個註釋太複雜，「背景脈絡」的內容已併進設計理由（`ClientExplanation` 型別也拿掉了 `context`），設計師端 S5 預覽面板同步改。案例頁的 `demo-client-flow.gif`／`final-client-detail.png`／`prototype-client-flow.png` 是改完後用 Playwright 重拍的。「變更」底下用 `MiniPagePreview`（迷你瀏覽器列＋版面線條＋深灰 CTA 色塊，CTA 視覺層級那項的色塊刻意比另一項大且有邊框）；底部按鈕「補充建議」／「確認設計」等寬。C5 只有全部確認的分支會到達（只留言不確認的示範路徑不會經過 C5，見架構說明的「重新整理狀態」）；C5 文案是大標「已確認並回傳設計師」→小標「無需進一步操作，有變更會再通知您」→細項「整體頁面設計、CTA 視覺層級・剛剛」。
- **術語規則：全產品不能出現「核准」這個詞，一律用「確認」**（2026-08-27 使用者明確要求）。`DecisionStatus` 的 `"approved"` 這個 enum 值可以維持英文（使用者看不到），但任何會顯示出來的中文標籤一律用「確認」。
- **核心原則，重構時不要合併**：`flow`（導覽用，決定畫面）跟 `decision.status`（確認狀態，決定 StatusBadge 顏色文字）是兩條獨立軸線，故意不合成一個狀態機，因為同一個 `decision.status` 要被好幾個畫面共用。
- **示範資料是 2 個決策**：整體頁面設計、CTA 視覺層級。C3 拆成 C3a／C3b，C2 整頁 mockup 上有 2 個數字標記對應這兩項。D9-D11／C6-C7 之後做的話，刻意只針對 CTA 這一項示範版本變更，不用兩項都跑一次——這個迴圈的敘事本來就是「其中一項後來被改動」。

### 外部參考文件

唯一可信來源，不在 repo 裡，是 Claude Artifact，開始改動畫面內容之前一定要重新讀一次，內容比這份 CLAUDE.md 新：

- Wireframe（21 個畫面全灰階，正式規格尺寸 390×844 / 1440×900）：`https://claude.ai/code/artifact/1e16b7f3-23a2-4b47-af14-55380cbb024c`
- 需求分析／架構圖／產品邊界（FR 編號 FR1-FR13）：`https://claude.ai/code/artifact/a2e803f6-04e0-4e88-812b-8355859132a1`
- User Flow（16 個 beat 的分支流程圖，SVG 繪製，設計師端／接收端兩欄＋AI 不確定例外分支）：`https://claude.ai/code/artifact/16a6f4c1-9e36-45c7-8014-fdae293936ed`

（2026-09-05 已經把兩路由／localStorage 這個架構決定回寫進這三份文件：wireframe 的 D7/D8/D8b 三張卡片改成「重新整理狀態」按鈕＋desc 說明兩邊是各自獨立系統；FR 文件的「03 架構設計圖」整節改成兩個入口＋decisionModel.ts 共用資料，「05 真實系統會怎麼分佈」的開頭段落也更新成反映 demo 已經接近真實架構；User Flow 圖把 D7→C1、C5→D8／D8b 這兩條原本畫成實線「主要動作」的箭頭改成虛線「分支／延遲」，並補充圖說跟標籤，反映「接收端自己開連結、設計師端要手動按重新整理狀態」這個沒有即時連動的實際行為。三份文件「04 產品邊界」、FR1-FR13、S1-S3 例外分支、D9-D11 迴圈內部本身沒有跟這次架構重組衝突，維持原樣沒動。）

### 下一步優先順序（2026-09-05 修正）

1. **D9→D10→D10b→C6→C7→D11**（模擬版本變更 → 變更偵測／已生成差異說明 → 設計師確認差異說明 → 通知客戶重新審查 → 客戶再次確認 → 設計師看到重新確認完成）。**這段需要照新架構重新設計 action，不是照抄舊 `state.ts` 裡刪掉的那些**（`SIMULATE_CHANGE`／`REDETECT`／`NOTIFY_CLIENT_REPROMPT`／`CLIENT_RECONFIRM` 等）：設計師端模擬變更、確認差異說明後，要寫回共用資料；客戶端要重新整理頁面才會看到 C6「重新審查通知」，不是靠某個 action 直接把兩邊 state 一起改掉。D8/D8b 畫面（`review_status` flow）目前是乾淨的終點，接這段時要在這裡補一個觸發「模擬變更」的入口。
2. S1-S3（AI 不確定性彈窗，掛在 D5 底下）、視覺打磨排在最後，就算沒做完也不影響上面那步的核心論點。

### 顏色系統

**2026-09-09 已從綠色改成 Sync AI 真實品牌色**：互動原型（`sync-ai-prototype/ui.tsx` 的 `c` 物件）原本沿用作品集自身的深綠 Version C 色票，只是暫時的，使用者確認品牌色應該是深靛紫＋赤陶橘（從 `content/images/sync-ai/cover.png`／`cover-ub.png` 這兩張官方 landing page 截圖取樣）。目前色票：`accent: #5352c4`、`accentLight: #eeedfb`、`amber`（複用做品牌輔色）：`#b85a31`、`amberLight: #f7e9e2`。取樣時第一版直接用飽和度較高的 `#4c5fe0`＋`#d9682d`，使用者反饋「不夠有質感」，改成降飽和、加深的版本才定案，同時 `ClientReview.tsx` 的 C1 邀請頁從整塊實色背景改成淺灰底＋分隔線（避免大面積色塊），`DesignerConsole.tsx`／`ClientReview.tsx`／`ui.tsx` 的外層視窗、選中的模式卡片、審核卡片都加上柔和 `boxShadow`（呼應舊示意圖 `cover.png` 的飄浮質感）。Wireframe 灰階線框稿（`wireframe-designer-highlights.png`／`wireframe-client-highlights.png`）維持灰階不受影響，那是刻意的「色彩系統套用前」階段呈現。

## 待辦

- [ ] 取得 Persona 4 張人物照片，放進 `content/images/sharing-time/`，接上 `persona.cards[].photo`
- [ ] 決定 Epilogue 殘留的 4 處要不要統一成 Inter
- [ ] 確認 Decision 參考圖 / Service Blueprint 截圖是否為最終版本
- [ ] `PROJECTS` 陣列補齊到 6 個條目（目前 5 個：4 真實 + 1 個 `comingSoon`，還差 1 個）
- [ ] 作品 5-6：比照 Sharing Time 的三件套模式（案例頁元件 + content 資料檔 + images 資料夾）逐一開工，目前完全未開始
- [ ] （可選）SDG Energy 的圖片目前是 Figma 截圖裁切，如有更高解析度原始素材可替換
- [ ] （可選）RWD Storybook 的年份待 Sara 確認（見上方「作品4目前進度」）
- [ ] （可選）Nav 導覽列目前沒有特別重新設計過，只是自動吃到新色票；如果想要更貼合新設計系統可以再調整
