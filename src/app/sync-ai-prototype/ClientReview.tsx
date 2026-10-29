import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Menu, Signal, Wifi, BatteryFull } from "lucide-react";
import { c, ChangePreview, DESIGN, DesignThumb, OverviewWithMarkers } from "./ui";
import type { ClientAction, ClientState } from "./clientState";

// 補充建議的示範預設文字，只有 CTA 這項在示範情境裡會被留言（見 D8b）；
// 其他項目沒有預先寫好的示範建議，維持空白讓使用者自己輸入。
const DEFAULT_COMMENT_DRAFT: Record<string, string> = {
  "cta-hierarchy": "報名按鈕可以改用主視覺的橘色嗎？比較有我們的品牌感。",
};

function PanelFade({ children, panelKey }: { children: React.ReactNode; panelKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={panelKey}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22 }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 text-[11px] flex-shrink-0" style={{ color: c.ink }}>
      <span className="font-semibold">9:41</span>
      <div className="flex items-center gap-1">
        <Signal size={12} />
        <Wifi size={12} />
        <BatteryFull size={14} />
      </div>
    </div>
  );
}

// C1 用 Menu icon 當品牌入口；C2 之後的畫面改成頁面標題（跟 wireframe m-header 一致），
// 有 onBack 時顯示返回箭頭（目前只有 C4 需要）。C3a/C3b 的頭是另一個獨立元件 DetailHeader。
function AppHeader({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
      style={{ borderBottom: `1px solid ${c.border}` }}
    >
      {onBack ? (
        <button onClick={onBack} className="-ml-1 p-0.5" aria-label="返回">
          <ArrowLeft size={15} color={c.ink} />
        </button>
      ) : (
        <Menu size={16} color={c.ink} />
      )}
      <span className="text-[13px] font-semibold flex-1 truncate" style={{ color: c.ink }}>
        {title}
      </span>
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[10px] uppercase tracking-[0.08em] font-semibold"
      style={{ color: c.muted }}
    >
      {children}
    </div>
  );
}

// C3a/C3b 專用頭：‹ › 各自貼在頭尾兩側，標題正下方是縮小、變淡的「N/M」，
// 不搶標題的視覺焦點；在頭尾兩端時對應那顆箭頭要變暗（不可再往前/後）。
function DetailHeader({
  title,
  index,
  total,
  onPrev,
  onNext,
}: {
  title: string;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="flex items-center px-2 py-2.5 flex-shrink-0"
      style={{ borderBottom: `1px solid ${c.border}` }}
    >
      <button
        type="button"
        aria-label="上一項"
        onClick={onPrev}
        disabled={index === 0}
        className="p-1.5 disabled:opacity-35 hover:opacity-70 transition-opacity flex-shrink-0"
        style={{ color: c.muted }}
      >
        <ChevronLeft size={15} />
      </button>
      <div className="flex-1 flex flex-col items-center gap-0.5 min-w-0">
        <span className="text-[13px] font-semibold truncate max-w-full" style={{ color: c.ink }}>
          {title}
        </span>
        <span className="text-[10px] font-mono" style={{ color: c.muted }}>
          {index + 1}/{total}
        </span>
      </div>
      <button
        type="button"
        aria-label="下一項"
        onClick={onNext}
        disabled={index === total - 1}
        className="p-1.5 disabled:opacity-35 hover:opacity-70 transition-opacity flex-shrink-0"
        style={{ color: c.muted }}
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  flex,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  flex?: number;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: c.accent, flex }}
      className="inline-flex items-center justify-center rounded-full px-4 py-3 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function GhostButton({
  children,
  onClick,
  flex,
}: {
  children: React.ReactNode;
  onClick: () => void;
  flex?: number;
}) {
  return (
    <button
      onClick={onClick}
      style={{ color: c.body, border: `1px solid ${c.border}`, flex }}
      className="inline-flex items-center justify-center rounded-full px-4 py-3 text-[13px] font-medium transition-colors hover:bg-black/[0.03]"
    >
      {children}
    </button>
  );
}

export default function ClientReview({
  state,
  dispatch,
}: {
  state: ClientState;
  dispatch: React.Dispatch<ClientAction>;
}) {
  const selected = state.decisions.filter((d) => d.selectedForGeneration);
  const current = selected[state.clientCursor];
  const [commentDraft, setCommentDraft] = useState("");
  const [commentSent, setCommentSent] = useState(false);

  useEffect(() => {
    if (state.flow === "client_comment" && current) {
      setCommentDraft(DEFAULT_COMMENT_DRAFT[current.id] ?? "");
      setCommentSent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.flow, current?.id]);

  const confirmedNames = selected.filter((d) => d.status === "confirmed").map((d) => d.name);

  return (
    <div className="mx-auto" style={{ width: 300 }}>
      <div
        className="rounded-[32px] overflow-hidden flex flex-col"
        style={{
          border: `8px solid ${c.ink}`,
          backgroundColor: "#fff",
          height: 620,
          boxShadow: "0 20px 60px -12px rgba(20,20,40,0.22), 0 8px 24px -8px rgba(20,20,40,0.14)",
        }}
      >
        <StatusBar />

        {/* C1 邀請頁 */}
        {state.flow === "client_invite" && (
          <PanelFade panelKey="c1">
            <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: `1px solid ${c.border}` }}>
              <Menu size={16} color={c.ink} />
              <span className="text-[13px] font-semibold" style={{ color: c.ink }}>
                Sync AI
              </span>
            </div>
            <div className="px-5 pt-6 flex-1 flex flex-col">
              {/* 誰邀請你、審什麼：設計師頭像＋檔案名稱，下面是這次要審的設計稿縮圖 */}
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold text-white flex-shrink-0"
                  style={{ backgroundColor: "#9747ff" }}
                >
                  A
                </span>
                <div className="min-w-0">
                  <div className="text-[12px]" style={{ color: c.body }}>
                    <span className="font-semibold" style={{ color: c.ink }}>Alex</span> 邀請你審查設計
                  </div>
                  <div className="text-[11px]" style={{ color: c.muted }}>
                    Course_Page_v2・今天 14:20
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <DesignThumb focus={DESIGN.thumbFocus} />
                <div className="pt-2.5">
                  <div className="text-[14px] font-bold" style={{ color: c.ink }}>
                    Course Page
                  </div>
                  <div className="text-[11px]" style={{ color: c.muted }}>
                    {DESIGN.frameName}
                  </div>
                </div>
              </div>
              <p className="text-[13px] leading-[1.7] mb-4" style={{ color: c.body }}>
                {selected.length} 個設計決策需要您的意見：
                <br />
                <span className="font-semibold" style={{ color: c.ink }}>
                  {selected.map((d) => d.name).join("、")}
                </span>
              </p>
              <button
                onClick={() => dispatch({ type: "CLIENT_START_REVIEW" })}
                className="w-full rounded-full py-3 text-[13px] font-semibold text-white mb-3"
                style={{ backgroundColor: c.accent }}
              >
                開始審查
              </button>
              <p className="text-[11px] text-center mt-auto" style={{ color: c.muted }}>
                此連結於 48 小時後失效
              </p>
            </div>
          </PanelFade>
        )}

        {/* C2 變更總覽：整頁配置 + 數字標記，對應待確認的決策 */}
        {state.flow === "client_overview" && (
          <PanelFade panelKey="c2">
            <AppHeader title="整體版面配置" />
            <div className="px-5 py-6 flex-1 flex flex-col">
              <p className="text-[13px] leading-[1.7] mb-4" style={{ color: c.body }}>
                這是課程頁的整體配置，以下標出這次需要您留意的地方：
              </p>
              <div className="flex-1 pt-2">
                <OverviewWithMarkers />
              </div>
              <button
                onClick={() => dispatch({ type: "CLIENT_START_DETAIL" })}
                className="w-full rounded-full py-3 text-[13px] font-semibold text-white"
                style={{ backgroundColor: c.accent }}
              >
                開始逐一查看
              </button>
            </div>
          </PanelFade>
        )}

        {/* C3a / C3b 決策細節：同一份殼子重複渲染，換 Decision 當 props */}
        {state.flow === "client_detail" && current && (
          <PanelFade panelKey="client_detail">
            <DetailHeader
              title={current.name}
              index={state.clientCursor}
              total={selected.length}
              onPrev={() => dispatch({ type: "SET_CLIENT_CURSOR", index: state.clientCursor - 1 })}
              onNext={() => dispatch({ type: "SET_CLIENT_CURSOR", index: state.clientCursor + 1 })}
            />
            <div className="px-5 py-5 flex-1 flex flex-col gap-4">
              <div className="space-y-1">
                <Kicker>變更</Kicker>
                <ChangePreview decisionId={current.id} />
                <p className="text-[13px] leading-[1.6]" style={{ color: c.body }}>
                  {current.clientExplanation.whatChanged}
                </p>
              </div>
              <div className="space-y-1">
                <Kicker>設計理由</Kicker>
                <p className="text-[13px] leading-[1.6]" style={{ color: c.body }}>
                  {current.clientExplanation.why}
                </p>
              </div>

              {current.status === "commented" && current.comment && (
                <div className="rounded-lg px-3 py-2.5" style={{ backgroundColor: c.surface }}>
                  <p className="text-[11px] font-semibold mb-0.5" style={{ color: c.body }}>
                    您已提供建議
                  </p>
                  <p className="text-[12px] leading-[1.5]" style={{ color: c.body }}>
                    {current.comment}
                  </p>
                </div>
              )}

              <div className="flex gap-2 mt-auto pt-1">
                <GhostButton flex={1} onClick={() => dispatch({ type: "CLIENT_OPEN_COMMENT" })}>
                  補充建議
                </GhostButton>
                <PrimaryButton
                  flex={1}
                  disabled={current.status === "confirmed"}
                  onClick={() => dispatch({ type: "CLIENT_CONFIRM_CURRENT" })}
                >
                  {current.status === "confirmed" ? "已確認" : "確認設計"}
                </PrimaryButton>
              </div>
            </div>
          </PanelFade>
        )}

        {/* C4 補充建議：從 C3a 或 C3b 點「補充建議」都會到這頁，獨立動作，不會自動變成確認 */}
        {state.flow === "client_comment" && current && (
          <PanelFade panelKey="c4">
            <AppHeader title="留下建議" onBack={() => dispatch({ type: "CLIENT_COMMENT_DONE_RETURN" })} />
            <div className="px-5 py-5 flex-1 flex flex-col">
              <div
                className="rounded-xl p-3 mb-4"
                style={{ border: `1px solid ${c.border}`, minHeight: 96 }}
              >
                <textarea
                  value={commentDraft}
                  readOnly={commentSent}
                  onChange={(e) => setCommentDraft(e.target.value)}
                  rows={4}
                  placeholder="輸入您的建議…"
                  className="w-full text-[13px] leading-[1.6] resize-none outline-none bg-transparent"
                  style={{ color: c.body }}
                />
              </div>

              {!commentSent ? (
                <button
                  onClick={() => {
                    dispatch({ type: "CLIENT_SUBMIT_COMMENT", text: commentDraft });
                    setCommentSent(true);
                  }}
                  disabled={!commentDraft.trim()}
                  className="w-full rounded-full py-3 text-[13px] font-semibold text-white disabled:opacity-40"
                  style={{ backgroundColor: c.accent }}
                >
                  送出建議
                </button>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-[13px]" style={{ color: c.muted }}>
                    ✓ 已送出
                  </p>
                  <button
                    onClick={() => dispatch({ type: "CLIENT_COMMENT_DONE_RETURN" })}
                    className="text-[12px] font-semibold hover:opacity-70 transition-opacity"
                    style={{ color: c.accent }}
                  >
                    ‹ 返回
                  </button>
                </div>
              )}
            </div>
          </PanelFade>
        )}

        {/* C5 確認完成：逐一確認完 C3a、C3b 兩項後才會看到這頁。沒有「查看設計師端結果」
            這種功能——接收端不用看設計師那邊在做什麼，之後有變更會走 C6 通知。 */}
        {state.flow === "client_confirmed" && (
          <PanelFade panelKey="c5">
            <AppHeader title="確認決策" />
            <div className="px-5 py-6 flex-1 flex flex-col items-center justify-center text-center gap-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: c.accentLight }}
              >
                <Check size={16} color={c.accent} strokeWidth={3} />
              </div>
              <p className="text-[15px] font-bold" style={{ color: c.ink }}>
                已確認並回傳設計師
              </p>
              <p className="text-[13px] font-semibold" style={{ color: c.ink }}>
                無需進一步操作，有變更會再通知您
              </p>
              <p className="text-[12px] mt-1.5" style={{ color: c.body }}>
                {confirmedNames.join("、")} · 剛剛
              </p>
            </div>
          </PanelFade>
        )}
      </div>
    </div>
  );
}
