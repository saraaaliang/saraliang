import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  Frame,
  Hand,
  MessageCircle,
  MousePointer2,
  PenTool,
  RefreshCw,
  Square,
  Type,
  X,
} from "lucide-react";
import { c, ChangePreview, CheckRow, DESIGN, DesignArt, LoadingChecklist, OverviewWithMarkers, rectWithin } from "./ui";
import type { Decision } from "./decisionModel";
import type { DesignerAction, DesignerState } from "./designerState";

const SIDEBAR_PAGES = [
  { name: "Homepage", active: false },
  { name: "Course page", active: true },
  { name: "Discover", active: false },
];

// 外框刻意模仿 Figma 介面（工具列、Layers、灰色畫布、浮動外掛視窗），讓作品集讀者一看
// 就知道 Sync AI 是活在 Figma 裡的外掛，而不是一個獨立網站（2026-10-27 使用者要求）。
// 畫布上的設計稿跟客戶端看到的是同一張，來源在 ui.tsx 的 DESIGN。
const LAYERS = [
  { name: "Nav", cta: false },
  { name: "Hero image", cta: false },
  { name: "Course info", cta: false },
  { name: "Donation card / Enroll now", cta: true },
];

const FIGMA_BLUE = "#0d99ff";
const FIGMA_CANVAS = "#f5f5f5";

function PanelFade({ children, panelKey }: { children: React.ReactNode; panelKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={panelKey}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.08em] font-semibold mb-4" style={{ color: c.accent }}>
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
      style={{ backgroundColor: c.accent }}
    >
      {children}
      <ArrowRight size={14} />
    </button>
  );
}

function GhostButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-black/[0.03]"
      style={{ color: c.body, border: `1px solid ${c.border}` }}
    >
      {children}
    </button>
  );
}

function ModeCard({
  title,
  desc,
  disabled,
  onSelect,
}: {
  title: string;
  desc: string;
  disabled?: boolean;
  onSelect?: () => void;
}) {
  return (
    <div
      className="rounded-xl p-3.5"
      style={{
        border: `1px solid ${disabled ? c.border : c.accent}`,
        opacity: disabled ? 0.45 : 1,
        boxShadow: disabled ? "none" : "0 4px 16px -4px rgba(83,82,196,0.18)",
      }}
    >
      <div className="text-[13px] font-bold mb-1" style={{ color: c.ink }}>
        {title}
      </div>
      <p className="text-[12px] leading-[1.5] mb-2.5" style={{ color: c.body }}>
        {desc}
      </p>
      {disabled ? (
        <span className="text-[12px] font-medium" style={{ color: c.muted }}>
          選擇此模式
        </span>
      ) : (
        <button
          onClick={onSelect}
          className="text-[12px] font-semibold hover:opacity-70 transition-opacity"
          style={{ color: c.accent }}
        >
          選擇此模式 →
        </button>
      )}
    </div>
  );
}

// D2 起，tab bar 旁邊顯示目前選定的工作模式（wireframe 全程可見）。
// D6 審核卡（方案 B，2026-10-28）：「變更」是 AI 依檔案差異草擬的事實，設計師可以改；
// 「設計理由」一開始是空的，只有示範句當 placeholder，要設計師自己寫一句才能「確認」。
// 這樣原型本身就能證明：AI 只描述看得到的改變，為什麼這樣改永遠是設計師的話。
function ReviewCard({
  decision,
  onEditChange,
  onEditWhy,
  onConfirm,
}: {
  decision: Decision;
  onEditChange: (v: string) => void;
  onEditWhy: (v: string) => void;
  onConfirm: () => void;
}) {
  const [editingChange, setEditingChange] = useState(false);
  const why = decision.clientExplanation.why;
  const canConfirm = why.trim().length > 0 && !decision.reviewed;
  const label = "text-[10px] font-semibold uppercase tracking-[0.06em]";
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${c.border}`, boxShadow: "0 2px 10px -2px rgba(20,20,40,0.08)" }}
    >
      <div className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold" style={{ color: c.ink }}>
            {decision.name}
          </span>
          {decision.reviewed && (
            <span className="text-[11px] font-medium" style={{ color: c.accent }}>
              已確認
            </span>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className={label} style={{ color: c.muted }}>
              變更 <span className="ml-1 px-1 py-px rounded-[3px] normal-case tracking-normal" style={{ backgroundColor: c.accentLight, color: c.accent }}>AI 草擬</span>
            </span>
            {!decision.reviewed && (
              <button type="button" onClick={() => setEditingChange((v) => !v)} className="text-[11px] hover:opacity-70" style={{ color: c.accent }}>
                {editingChange ? "完成" : "編輯"}
              </button>
            )}
          </div>
          {editingChange ? (
            <textarea
              value={decision.clientExplanation.whatChanged}
              onChange={(e) => onEditChange(e.target.value)}
              rows={2}
              className="w-full text-[12px] leading-[1.55] resize-none outline-none rounded-md px-2 py-1.5"
              style={{ color: c.body, border: `1px solid ${c.border}` }}
            />
          ) : (
            <p className="text-[12px] leading-[1.55]" style={{ color: c.body }}>
              {decision.clientExplanation.whatChanged}
            </p>
          )}
        </div>
        <div>
          <div className={`${label} mb-1`} style={{ color: c.muted }}>
            設計理由 <span className="ml-1 normal-case tracking-normal" style={{ color: c.amber }}>設計師填寫</span>
          </div>
          <textarea
            aria-label="設計理由"
            value={why}
            readOnly={decision.reviewed}
            onChange={(e) => onEditWhy(e.target.value)}
            placeholder={`例：${decision.whyExample}`}
            rows={2}
            className="w-full text-[12px] leading-[1.55] resize-none outline-none rounded-md px-2 py-1.5"
            style={{ color: c.body, border: `1px solid ${why ? c.border : c.amber}`, backgroundColor: decision.reviewed ? c.surface : "#fff" }}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setEditingChange(false);
          onConfirm();
        }}
        disabled={!canConfirm}
        className="w-full py-2.5 text-[12px] font-semibold hover:bg-black/[0.02] transition-colors disabled:opacity-40"
        style={{ color: c.accent, borderTop: `1px solid ${c.border}` }}
      >
        確認
      </button>
    </div>
  );
}

function ModeTag({ mode }: { mode: DesignerState["deliveryMode"] }) {
  if (!mode) return null;
  return (
    <span
      className="hidden sm:inline-flex text-[10px] px-2.5 py-1 rounded-full font-semibold ml-2"
      style={{ backgroundColor: c.accentLight, color: c.accent }}
    >
      視覺溝通
    </span>
  );
}

// S1-S5 共用彈層外殼：蓋在整個插件視窗上，不是右側面板的一個步驟。
function Modal({
  titleId,
  children,
}: {
  titleId: string;
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstButton = cardRef.current?.querySelector("button");
    (firstButton as HTMLButtonElement | null)?.focus();
  }, []);

  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(21,24,26,0.35)" }}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-[320px] rounded-2xl p-5"
        style={{ backgroundColor: "#fff", border: `1px solid ${c.border}` }}
      >
        {children}
      </div>
    </div>
  );
}

// D3 候選清單：內容可捲動（項目一多時不會把面板往下撐長），右側常駐畫一條
// 滾軸當作「這裡可以往下滑」的視覺提示——跟 wireframe 一樣是固定樣式的軌道＋
// 滑塊，不是原生捲軸（原生捲軸在不捲動時就不會出現，沒辦法穩定當作提示用）。
function CandidateScrollList({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex mb-3">
      <div className="flex-1 space-y-2 max-h-[200px] overflow-y-auto pr-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
      <div className="absolute top-0 right-0 w-[3px] h-full rounded-full" style={{ backgroundColor: c.surface }} />
      <div
        className="absolute top-0 right-0 w-[3px] rounded-full"
        style={{ height: "45%", backgroundColor: c.border }}
      />
    </div>
  );
}

// S5「預覽接收端頁面」：疊在桌機視窗裡的唯讀面板，不是切換到接收端 surface——
// 目的只是讓設計師送出前確認圖跟文字有沒有清楚標示，不需要互動（留言／確認這些
// 按鈕在這裡都用不到），所以做成一頁式由上往下捲動看完，不分頁、不模擬手機殼。
function PreviewSheet({ decisions, onClose }: { decisions: Decision[]; onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(21,24,26,0.45)" }}
    >
      <div
        className="w-full max-w-[440px] rounded-2xl flex flex-col"
        style={{ backgroundColor: "#fff", border: `1px solid ${c.border}`, maxHeight: "100%" }}
      >
        <div
          className="flex items-center gap-2 px-4 h-12 flex-shrink-0"
          style={{ borderBottom: `1px solid ${c.border}` }}
        >
          <button onClick={onClose} className="p-1 -ml-1" aria-label="返回分享設定">
            <ArrowLeft size={16} color={c.ink} />
          </button>
          <span className="text-[13px] font-bold" style={{ color: c.ink }}>
            接收端預覽
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="text-[10px] uppercase tracking-[0.08em] font-semibold mb-2" style={{ color: c.muted }}>
            整體版面配置
          </div>
          <p className="text-[13px] leading-[1.6] mb-3" style={{ color: c.body }}>
            這是課程頁的整體配置，以下標出這次需要您留意的地方：
          </p>
          <div className="mb-6 px-1 pt-1">
            <OverviewWithMarkers />
          </div>

          {decisions.map((d, i) => (
            <div key={d.id} className={i > 0 ? "pt-5 mt-5" : undefined} style={i > 0 ? { borderTop: `1px solid ${c.border}` } : undefined}>
              <div className="text-[13px] font-bold mb-2" style={{ color: c.ink }}>
                {d.name}
              </div>
              <ChangePreview decisionId={d.id} />
              <div className="mt-3 space-y-2.5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.08em] font-semibold mb-0.5" style={{ color: c.muted }}>
                    變更
                  </div>
                  <p className="text-[13px] leading-[1.6]" style={{ color: c.body }}>
                    {d.clientExplanation.whatChanged}
                  </p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.08em] font-semibold mb-0.5" style={{ color: c.muted }}>
                    設計理由
                  </div>
                  <p className="text-[13px] leading-[1.6]" style={{ color: c.body }}>
                    {d.clientExplanation.why}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DesignerConsole({
  state,
  dispatch,
}: {
  state: DesignerState;
  dispatch: React.Dispatch<DesignerAction>;
}) {
  const { flow, decisions } = state;
  const candidates = [...decisions].sort((a, b) => a.candidateOrder - b.candidateOrder);
  const selected = decisions.filter((d) => d.selectedForGeneration);
  const allResolved = selected.length > 0 && selected.every((d) => d.status === "confirmed");
  const anyResponded = selected.some((d) => d.status !== "not_confirmed");
  const [previewOpen, setPreviewOpen] = useState(false);
  // 畫布上的藍色選取框：還沒掃描時什麼都沒選；審核到 CTA 那一項時框 CTA，其他時候框整個 frame
  const reviewing = flow === "reviewing" ? selected[state.reviewCursor] : undefined;
  const selection: "none" | "frame" | "cta" =
    flow === "idle" ? "none" : reviewing?.id === "cta-hierarchy" ? "cta" : "frame";

  return (
    <div
      className="relative rounded-2xl overflow-hidden mx-auto max-w-[920px]"
      style={{
        border: `1px solid ${c.border}`,
        backgroundColor: "#fff",
        boxShadow: "0 20px 60px -12px rgba(20,20,40,0.18), 0 8px 24px -8px rgba(20,20,40,0.12)",
      }}
    >
      {flow === "link_ready" && previewOpen && (
        <PreviewSheet decisions={selected} onClose={() => setPreviewOpen(false)} />
      )}

      {flow === "send_setup" && (
        <Modal titleId="s4-title">
          <h3 id="s4-title" className="text-[15px] font-bold mb-2" style={{ color: c.ink }}>
            是否開啟接收方設計確認功能
          </h3>
          <p className="text-[12px] leading-[1.6] mb-4" style={{ color: c.body }}>
            開啟後，接收端會看到「設計確認」與「標註建議」功能；關閉則接收端只會收到說明文字，沒有確認機制。
          </p>
          <div className="flex justify-center gap-1.5 mb-4">
            <span
              className="text-[12px] px-3 py-1.5 rounded-lg font-semibold"
              style={{ backgroundColor: c.accent, color: "#fff" }}
            >
              是
            </span>
            <span
              className="text-[12px] px-3 py-1.5 rounded-lg cursor-not-allowed"
              style={{ backgroundColor: c.surface, color: c.muted }}
            >
              否
            </span>
          </div>
          <PrimaryButton onClick={() => dispatch({ type: "CONFIRM_SEND_SETUP" })}>繼續</PrimaryButton>
        </Modal>
      )}

      {/* S5：分享審查連結，連結還沒被複製，標題不能先說「連結已產生」 */}
      {flow === "link_ready" && !previewOpen && (
        <Modal titleId="s5-title">
          <h3 id="s5-title" className="text-[15px] font-bold mb-4" style={{ color: c.ink }}>
            分享審查連結
          </h3>
          <button
            onClick={() => setPreviewOpen(true)}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-medium hover:bg-black/[0.03] transition-colors mb-2.5"
            style={{ color: c.body, border: `1px solid ${c.border}` }}
          >
            <Eye size={13} />
            預覽接收端頁面
          </button>
          <button
            onClick={() => dispatch({ type: "COPY_LINK" })}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white hover:opacity-90 transition-opacity mb-3"
            style={{ backgroundColor: c.accent }}
          >
            <Copy size={13} />
            複製連結
          </button>
          <p className="text-[11px] mb-2 text-center" style={{ color: c.muted }}>
            或透過以下方式傳送
          </p>
          <div className="flex gap-2 justify-center">
            {["LINE", "Slack", "Email"].map((label) => (
              <span
                key={label}
                className="text-[11px] px-3 py-1.5 rounded-lg cursor-not-allowed"
                style={{ backgroundColor: c.surface, color: c.muted }}
              >
                {label}
              </span>
            ))}
          </div>
        </Modal>
      )}

      {/* S5b：按過「複製連結」才會看到，標題文案跟按鈕狀態才改變。
          「已複製」是狀態顯示（不能點），「完成」才是真正的動作按鈕——
          2026-09-05 使用者反饋原本把兩者合在同一顆按鈕上會讓人搞不清楚
          為什麼「已經複製了」還要再點一次，所以拆開。 */}
      {flow === "link_copied" && (
        <Modal titleId="s5b-title">
          <div className="flex flex-col items-center text-center">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: c.accentLight }}
            >
              <Check size={16} color={c.accent} strokeWidth={3} />
            </div>
            <h3 id="s5b-title" className="text-[15px] font-bold mb-1" style={{ color: c.ink }}>
              連結已產生
            </h3>
            <p className="text-[12px] mb-4 flex items-center gap-1" style={{ color: c.muted }}>
              <Check size={12} color={c.accent} strokeWidth={3} />
              已複製到剪貼簿
            </p>
            <PrimaryButton onClick={() => dispatch({ type: "FINISH_SHARE" })}>完成</PrimaryButton>
            <p className="text-[11px] mt-4 mb-2" style={{ color: c.muted }}>
              或透過以下方式傳送
            </p>
            <div className="flex gap-2 justify-center">
              {["LINE", "Slack", "Email"].map((label) => (
                <span
                  key={label}
                  className="text-[11px] px-3 py-1.5 rounded-lg cursor-not-allowed"
                  style={{ backgroundColor: c.surface, color: c.muted }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Figma 工具列：左邊工具、中間檔名、右邊分享 */}
      <div className="flex items-center gap-3 px-3 h-11" style={{ borderBottom: `1px solid ${c.border}` }}>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {[MousePointer2, Frame, Square, PenTool, Type, Hand, MessageCircle].map((Icon, i) => (
            <span
              key={i}
              className={`w-7 h-7 rounded-md items-center justify-center ${i > 3 ? "hidden sm:flex" : "flex"}`}
              style={i === 0 ? { backgroundColor: FIGMA_BLUE, color: "#fff" } : { color: c.body }}
            >
              <Icon size={14} strokeWidth={1.8} />
            </span>
          ))}
        </div>
        <div className="flex-1 text-center text-[12px] truncate" style={{ color: c.muted }}>
          V Houses / <span style={{ color: c.ink, fontWeight: 600 }}>Course_Page_v2</span>
          <ChevronDown size={12} className="inline ml-0.5 -mt-0.5" />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="hidden sm:flex w-6 h-6 rounded-full items-center justify-center text-[10px] font-semibold text-white"
            style={{ backgroundColor: "#9747ff" }}
          >
            A
          </span>
          <span className="text-[11px] font-semibold px-3 py-1.5 rounded-md text-white" style={{ backgroundColor: FIGMA_BLUE }}>
            Share
          </span>
          <span className="hidden sm:inline text-[11px]" style={{ color: c.body }}>
            100%
          </span>
        </div>
      </div>

      {/* body */}
      <div className="flex" style={{ minHeight: 500 }}>
        {/* Figma 左側面板：Pages + Layers */}
        <div className="w-[170px] py-3 hidden md:block flex-shrink-0 text-[11px]" style={{ borderRight: `1px solid ${c.border}` }}>
          <div className="px-3 mb-1.5 font-semibold" style={{ color: c.ink }}>
            Pages
          </div>
          <div className="space-y-0.5 px-1.5 mb-4">
            {SIDEBAR_PAGES.map((p) => (
              <div
                key={p.name}
                className="px-2 py-1 rounded truncate"
                style={{ backgroundColor: p.active ? "#e5f4ff" : "transparent", color: p.active ? c.ink : c.body }}
              >
                {p.name}
              </div>
            ))}
          </div>
          <div className="px-3 pt-3 mb-1.5 font-semibold" style={{ color: c.ink, borderTop: `1px solid ${c.border}` }}>
            Layers
          </div>
          <div className="px-1.5">
            <div
              className="flex items-center gap-1.5 px-2 py-1 rounded"
              style={selection === "frame" ? { backgroundColor: "#e5f4ff", color: c.ink } : { color: c.ink }}
            >
              <Frame size={11} strokeWidth={2} />
              <span className="truncate font-medium">{DESIGN.frameName}</span>
            </div>
            {LAYERS.map((l) => (
              <div
                key={l.name}
                className="flex items-center gap-1.5 pl-6 pr-2 py-1 rounded"
                style={selection === "cta" && l.cta ? { backgroundColor: "#e5f4ff", color: c.ink } : { color: c.body }}
              >
                <Square size={10} strokeWidth={2} />
                <span className="truncate">{l.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Figma 畫布：frame 名稱 + 設計稿 + 藍色選取框；外掛視窗浮在右上 */}
        <div className="flex-1 relative flex flex-col md:block" style={{ backgroundColor: FIGMA_CANVAS }}>
          <div className="flex justify-center md:justify-start md:pl-10 pt-8 pb-10">
            <div className="w-[360px] max-w-full flex-shrink-0">
              <div
                className="text-[10px] mb-1 truncate"
                style={{ color: selection === "frame" ? FIGMA_BLUE : c.muted }}
              >
                {DESIGN.frameName}
              </div>
              <div
                className="relative bg-white"
                style={{
                  outline: selection === "frame" ? `1.5px solid ${FIGMA_BLUE}` : "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                <DesignArt>
                  {selection === "cta" && (
                    <div className="pointer-events-none" style={{ ...rectWithin(DESIGN.ctaRect), outline: `1.5px solid ${FIGMA_BLUE}` }} />
                  )}
                </DesignArt>
              </div>
              {selection === "frame" && (
                <div className="flex justify-center mt-1.5">
                  <span className="text-[9px] px-1.5 py-0.5 rounded-sm text-white" style={{ backgroundColor: FIGMA_BLUE }}>
                    {DESIGN.size}
                  </span>
                </div>
              )}
            </div>
          </div>

        {/* Sync AI 外掛視窗：跟真的 Figma 外掛一樣浮在畫布上，有自己的標題列；內容依 flow 切換 */}
        <div
          className="md:absolute md:top-5 md:right-5 w-full md:w-[290px] bg-white md:rounded-xl overflow-hidden"
          style={{ boxShadow: "0 10px 30px -8px rgba(20,20,40,0.25), 0 2px 6px rgba(20,20,40,0.08)", border: `1px solid ${c.border}` }}
        >
          <div className="flex items-center gap-2 px-3 h-9" style={{ borderBottom: `1px solid ${c.border}` }}>
            <span className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold text-white" style={{ backgroundColor: c.accent }}>
              S
            </span>
            <span className="text-[12px] font-semibold" style={{ color: c.ink }}>
              Sync AI
            </span>
            {flow !== "idle" && flow !== "scanning" && <ModeTag mode={state.deliveryMode} />}
            <div className="flex-1" />
            <X size={13} color={c.muted} />
          </div>
        <div className="p-5">
          {flow === "idle" && (
            <PanelFade panelKey="idle">
              <PanelHeading>準備分析</PanelHeading>
              <p className="text-[13px] leading-[1.7] mb-5" style={{ color: c.body }}>
                掃描這個檔案，找出值得跟客戶說明的設計決策。
              </p>
              <PrimaryButton onClick={() => dispatch({ type: "START_SCAN" })}>掃描此設計</PrimaryButton>
            </PanelFade>
          )}

          {/* D1 掃描中：只確認「有東西」，不揭露清單內容 */}
          {flow === "scanning" && (
            <PanelFade panelKey="scanning">
              <PanelHeading>正在分析 Course Page</PanelHeading>
              <LoadingChecklist
                items={["版面結構", "元件屬性", "設計決策"]}
                onDone={() => dispatch({ type: "SCAN_DONE" })}
              />
            </PanelFade>
          )}

          {/* D2 交付設定：唯一動作是挑模式卡片 */}
          {flow === "delivery_setup" && (
            <PanelFade panelKey="delivery_setup">
              <span
                className="inline-block text-[11px] px-2.5 py-1 rounded-full mb-3"
                style={{ backgroundColor: c.surface, color: c.body }}
              >
                已選取需生成說明之圖檔
              </span>
              <PanelHeading>選擇工作模式</PanelHeading>
              <p className="text-[12px] leading-[1.5] mb-3 -mt-2.5" style={{ color: c.muted }}>
                依設計類型選擇對應工作流程
              </p>
              <div className="space-y-2.5">
                <ModeCard
                  title="視覺溝通"
                  desc="廣告／品牌／文宣・AI 語境轉譯"
                  onSelect={() => dispatch({ type: "SELECT_MODE", mode: "visual" })}
                />
                <ModeCard title="開發交付" desc="UI／Web 產品・AI Spec 檢測" disabled />
              </div>
            </PanelFade>
          )}

          {/* D3 偵測結果列表：候選清單可勾選 */}
          {flow === "scan_results" && (
            <PanelFade panelKey="scan_results">
              <PanelHeading>偵測結果</PanelHeading>
              <p className="text-[12px] leading-[1.5] mb-3 -mt-2.5" style={{ color: c.muted }}>
                在這個畫面裡找到以下可能需要說明的重點：
              </p>
              <CandidateScrollList>
                {candidates.map((d) => (
                  <CheckRow
                    key={d.id}
                    label={d.name}
                    done={d.selectedForGeneration}
                    interactive
                    dimmed={!d.selectedForGeneration}
                    onToggle={() => dispatch({ type: "TOGGLE_CANDIDATE", id: d.id })}
                  />
                ))}
              </CandidateScrollList>
              <button
                type="button"
                className="w-full text-left text-[12px] px-3 py-2 rounded-lg mb-4 cursor-not-allowed"
                style={{ color: c.muted, border: `1px dashed ${c.border}` }}
                aria-disabled="true"
                title="展示用，此原型未實作手動新增"
              >
                ＋ 手動新增項目
              </button>
              <PrimaryButton
                disabled={selected.length === 0}
                onClick={() => dispatch({ type: "CONTINUE_TO_GENERATION_LIST" })}
              >
                繼續
              </PrimaryButton>
            </PanelFade>
          )}

          {/* D4 確認生成清單：可移除，可回上一步 */}
          {flow === "generation_list" && (
            <PanelFade panelKey="generation_list">
              <PanelHeading>確認生成清單</PanelHeading>
              <p className="text-[12px] leading-[1.5] mb-3 -mt-2.5" style={{ color: c.muted }}>
                以下項目將產生接收端說明：
              </p>
              <div className="space-y-2 mb-4">
                {selected.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5"
                    style={{ backgroundColor: c.surface }}
                  >
                    <span className="text-[13px] font-semibold" style={{ color: c.ink }}>
                      {d.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "REMOVE_FROM_GENERATION_LIST", id: d.id })}
                      className="text-[11px] font-medium hover:opacity-70 transition-opacity"
                      style={{ color: c.body }}
                    >
                      － 移除
                    </button>
                  </div>
                ))}
                {selected.length === 0 && (
                  <p className="text-[12px]" style={{ color: c.muted }}>
                    清單是空的，請回上一步重新勾選。
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <GhostButton onClick={() => dispatch({ type: "BACK_TO_SCAN_RESULTS" })}>
                  <ArrowLeft size={13} />
                  上一步
                </GhostButton>
                <div className="flex-1">
                  <PrimaryButton
                    disabled={selected.length === 0}
                    onClick={() => dispatch({ type: "START_GENERATION" })}
                  >
                    開始生成
                  </PrimaryButton>
                </div>
              </div>
            </PanelFade>
          )}

          {/* D5 AI 轉譯中 */}
          {flow === "translating" && (
            <PanelFade panelKey="translating">
              <PanelHeading>AI 轉譯</PanelHeading>
              <p className="text-[12px] leading-[1.5] mb-3 -mt-2.5" style={{ color: c.muted }}>
                說明策略生成中
              </p>
              <LoadingChecklist
                items={["設計結構", "設計決策", "正在轉譯接收端語境"]}
                onDone={() => dispatch({ type: "GENERATION_DONE" })}
              />
            </PanelFade>
          )}

          {/* D6 審核與微調：‹ N/M › 可左右自由切換，跟逐項確認狀態無關；
              「已確認說明 →」要所有項目都個別按過「確認」才會亮起 */}
          {flow === "reviewing" && selected[state.reviewCursor] && (
            <PanelFade panelKey="reviewing">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[11px] uppercase tracking-[0.08em] font-semibold"
                  style={{ color: c.accent }}
                >
                  審核與微調
                </span>
                <div className="flex items-center gap-1 rounded-md" style={{ backgroundColor: c.surface }}>
                  <button
                    type="button"
                    aria-label="上一項"
                    disabled={state.reviewCursor === 0}
                    onClick={() => dispatch({ type: "SET_REVIEW_CURSOR", index: state.reviewCursor - 1 })}
                    className="p-1 disabled:opacity-30 hover:opacity-70 transition-opacity"
                    style={{ color: c.muted }}
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <span className="text-[11px] font-mono" style={{ color: c.muted }}>
                    {state.reviewCursor + 1} / {selected.length}
                  </span>
                  <button
                    type="button"
                    aria-label="下一項"
                    disabled={state.reviewCursor === selected.length - 1}
                    onClick={() => dispatch({ type: "SET_REVIEW_CURSOR", index: state.reviewCursor + 1 })}
                    className="p-1 disabled:opacity-30 hover:opacity-70 transition-opacity"
                    style={{ color: c.muted }}
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <ReviewCard
                  key={selected[state.reviewCursor].id}
                  decision={selected[state.reviewCursor]}
                  onEditChange={(value) =>
                    dispatch({ type: "EDIT_WHAT_CHANGED", id: selected[state.reviewCursor].id, value })
                  }
                  onEditWhy={(value) => dispatch({ type: "EDIT_WHY", id: selected[state.reviewCursor].id, value })}
                  onConfirm={() =>
                    dispatch({ type: "CONFIRM_EXPLANATION", id: selected[state.reviewCursor].id })
                  }
                />
              </div>
              <PrimaryButton
                disabled={!selected.every((d) => d.reviewed)}
                onClick={() => dispatch({ type: "ADVANCE_REVIEW" })}
              >
                已確認說明
              </PrimaryButton>
            </PanelFade>
          )}

          {/* D7／D8／D8b 是同一個 flow（review_status），畫面內容完全由 decisions
              的實際狀態決定：還沒人回覆 → D7「等待接收端回應」；已經有回覆 → D8
              或 D8b。現實中設計師不會有按鈕能「打開」接收端的畫面（那是接收端自己
              的裝置），所以這裡改成顯示已產生的連結，跟一顆「重新整理狀態」——
              去共用資料重新查一次，看接收端是否已經回覆，不是即時推播。 */}
          {flow === "review_status" && (
            <PanelFade panelKey="review_status">
              <PanelHeading>{anyResponded ? "接收端已回覆" : "已送出，等待接收端回應"}</PanelHeading>
              <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: c.surface }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[13px] font-bold" style={{ color: c.ink }}>
                    設計報告
                  </span>
                  {!anyResponded ? (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ border: `1px dashed ${c.border}`, color: c.muted }}
                    >
                      未確認
                    </span>
                  ) : allResolved ? (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ backgroundColor: c.accentLight, color: c.accent }}
                    >
                      已確認
                    </span>
                  ) : (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ border: `1px dashed ${c.border}`, color: c.muted }}
                    >
                      回饋與建議
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  {selected.map((d) => (
                    <CheckRow
                      key={d.id}
                      label={d.name}
                      done={d.status === "confirmed"}
                      detail={anyResponded && d.status !== "confirmed" ? d.comment ?? undefined : undefined}
                    />
                  ))}
                </div>
                {anyResponded && (
                  <p className="text-[12px] mt-3" style={{ color: c.body }}>
                    確認者：接收端・今天 15:42
                  </p>
                )}
              </div>
              {allResolved && (
                <p className="text-[12px] font-semibold mb-4" style={{ color: c.ink }}>
                  ✓ 沒有待處理項目，可以放心進入完稿階段。
                </p>
              )}
              <button
                onClick={() => dispatch({ type: "REFRESH_STATUS" })}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-black/[0.03]"
                style={{ color: c.body, border: `1px solid ${c.border}` }}
              >
                <RefreshCw size={13} />
                重新整理狀態
              </button>
            </PanelFade>
          )}
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
