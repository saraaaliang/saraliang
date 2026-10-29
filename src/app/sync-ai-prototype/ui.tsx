import { useEffect, useId, useState } from "react";
import { Check } from "lucide-react";
import type { DecisionStatus } from "./decisionModel";
import courseDesign from "../../content/images/sync-ai/design-course-page.png";

// 沿用既有案例頁的 Version C 色票（見 CLAUDE.md），另外補幾個 prototype 專用的狀態色。
// 品牌色從 Sync AI 官方 landing page（cover.png / cover-ub.png）取樣：主色深靛紫、
// 輔色赤陶橘，取代原本沿用作品集自身的深綠 Version C 色票（2026-09-09 使用者確認）。
export const c = {
  ink: "#15181a",
  body: "#40474a",
  accent: "#5352c4",
  accentLight: "#eeedfb",
  muted: "#8a908d",
  surface: "#f4f5f2",
  border: "#d8dbd5",
  amber: "#b85a31",
  amberLight: "#f7e9e2",
  blue: "#1d4ed8",
  blueLight: "#e3ebfd",
};

const STATUS_MAP: Record<DecisionStatus, { label: string; fg: string; bg: string }> = {
  not_confirmed: { label: "未確認", fg: c.muted, bg: c.surface },
  commented: { label: "設計需調整", fg: c.amber, bg: c.amberLight },
  confirmed: { label: "已確認", fg: c.accent, bg: c.accentLight },
  affected_by_change: { label: "需要重新確認", fg: c.amber, bg: c.amberLight },
};

export function StatusBadge({ status, meta }: { status: DecisionStatus; meta?: string }) {
  const s = STATUS_MAP[status];
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap"
        style={{ backgroundColor: s.bg, color: s.fg }}
      >
        {s.label}
      </span>
      {meta && (
        <span className="text-[11px]" style={{ color: c.muted }}>
          {meta}
        </span>
      )}
    </span>
  );
}

// 掃描 / AI 生成都共用這個元件，只是傳進去的 items 不同。
export function LoadingChecklist({ items, onDone }: { items: string[]; onDone: () => void }) {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    setDoneCount(0);
    const timers: number[] = items.map((_, i) =>
      window.setTimeout(() => setDoneCount(i + 1), 420 + i * 460)
    );
    const finishTimer = window.setTimeout(onDone, 420 + items.length * 460 + 420);
    timers.push(finishTimer);
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="space-y-2.5">
      {items.map((label, i) => {
        const isDone = i < doneCount;
        return (
          <div
            key={label}
            className="flex items-center gap-2.5 text-[13px] transition-colors duration-300"
            style={{ color: isDone ? c.ink : c.muted }}
          >
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
              style={{ backgroundColor: isDone ? c.accentLight : c.border }}
            >
              {isDone && <Check size={10} strokeWidth={3} color={c.accent} />}
            </span>
            {label}
          </div>
        );
      })}
    </div>
  );
}

// D3（勾選候選項目）／狀態顯示（D8b／D9／D10／D11）共用的「圓點 + 標籤」列。
// interactive 時渲染成真的 button（可鍵盤操作、有 aria-pressed）；非 interactive 時純顯示狀態。
export function CheckRow({
  label,
  done,
  interactive = false,
  dimmed = false,
  onToggle,
  detail,
}: {
  label: string;
  done: boolean;
  interactive?: boolean;
  dimmed?: boolean;
  onToggle?: () => void;
  detail?: string;
}) {
  const dot = (
    <span
      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-[1px]"
      style={{ backgroundColor: done ? c.accentLight : "transparent", border: done ? "none" : `1.5px solid ${c.border}` }}
    >
      {done && <Check size={10} strokeWidth={3} color={c.accent} />}
    </span>
  );

  const content = (
    <>
      {dot}
      <span className="text-left">
        <span
          className="text-[13px] block"
          style={{ color: dimmed ? c.muted : c.ink, fontWeight: done || interactive ? 600 : 400 }}
        >
          {label}
        </span>
        {detail && (
          <span className="text-[12px] block mt-0.5" style={{ color: c.body }}>
            {detail}
          </span>
        )}
      </span>
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={done}
        className="w-full flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors hover:opacity-80"
        style={{ backgroundColor: c.surface, opacity: dimmed ? 0.55 : 1 }}
      >
        {content}
      </button>
    );
  }

  return (
    <div className="flex items-start gap-2.5 py-1.5" style={{ opacity: dimmed ? 0.55 : 1 }}>
      {content}
    </div>
  );
}

// D6／D10 共用：AI 生成文字的審核框，文字框跟「編輯」「確認」按鈕做成同一個元件。
export function EditConfirmBox({
  label,
  value,
  confirmed,
  onChange,
  onConfirm,
}: {
  label: string;
  value: string;
  confirmed: boolean;
  onChange: (v: string) => void;
  onConfirm: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const fieldId = useId();

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${c.border}`, boxShadow: "0 2px 10px -2px rgba(20,20,40,0.08)" }}
    >
      <div className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor={fieldId} className="text-[12px] font-semibold" style={{ color: c.ink }}>
            {label}
          </label>
          {confirmed && !editing && (
            <span className="text-[11px] font-medium" style={{ color: c.accent }}>
              已確認
            </span>
          )}
        </div>
        <textarea
          id={fieldId}
          value={value}
          readOnly={!editing}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full text-[13px] leading-[1.6] resize-none outline-none bg-transparent"
          style={{ color: c.body }}
        />
      </div>
      <div className="flex" style={{ borderTop: `1px solid ${c.border}` }}>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="flex-1 py-2.5 text-[12px] font-medium hover:bg-black/[0.02] transition-colors"
          style={{ color: c.body, borderRight: `1px solid ${c.border}` }}
        >
          {editing ? "完成編輯" : "編輯"}
        </button>
        <button
          type="button"
          onClick={() => {
            setEditing(false);
            onConfirm();
          }}
          disabled={confirmed}
          className="flex-1 py-2.5 text-[12px] font-semibold hover:bg-black/[0.02] transition-colors disabled:opacity-40"
          style={{ color: c.accent }}
        >
          確認
        </button>
      </div>
    </div>
  );
}

// ── 示範用的設計稿：設計師端畫布、客戶端 C1/C2/C3、S5 預覽都看同一張 ─────────────
// 使用者自己做的課程頁設計（V Houses 課程詳情頁首屏，1440×1024，2026-10-27 提供）。
// 要換別張圖時：改 image 的 import、aspect 換成新圖的寬高，ctaRect／各 focus 改成新圖裡
// 對應區域（以整張圖的百分比計），畫布、C1/C2/C3、S5 預覽會自動跟著換。
// 沒有 image 時顯示 DesignPlaceholder（一個不可點擊的頁面示意）。
export type DesignRect = { top: number; left: number; width: number; height: number };

export const DESIGN: {
  image?: string;
  aspect: { w: number; h: number };
  frameName: string;
  size: string;
  ctaRect: DesignRect;
  // C1 邀請頁縮圖、C3「變更」縮圖要裁的區域：整體頁面看主視覺＋標題，CTA 看報名卡片
  thumbFocus: DesignRect;
  layoutFocus: DesignRect;
  ctaFocus: DesignRect;
} = {
  image: courseDesign,
  aspect: { w: 1440, h: 1024 },
  frameName: "Course page – Desktop",
  size: "1440 × 1024",
  ctaRect: { top: 33.5, left: 67.7, width: 20.1, height: 5 },
  thumbFocus: { top: 0, left: 0, width: 100, height: 52 },
  layoutFocus: { top: 7, left: 0, width: 100, height: 49 },
  ctaFocus: { top: 23.4, left: 62.5, width: 30.6, height: 25.4 },
};

const FULL: DesignRect = { top: 0, left: 0, width: 100, height: 100 };

function DesignPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="h-[7%] flex items-center px-[6%]" style={{ borderBottom: `1px solid ${c.surface}` }}>
        <div className="h-[18%] w-[35%] rounded-full" style={{ backgroundColor: c.border }} />
      </div>
      <div className="h-[42%]" style={{ backgroundColor: c.surface }} />
      <div className="px-[6%] pt-[5%] flex-1 flex flex-col gap-[4%]">
        <div className="h-[4%] min-h-[4px] rounded-full w-3/4" style={{ backgroundColor: c.border }} />
        <div className="h-[4%] min-h-[4px] rounded-full w-1/3" style={{ backgroundColor: c.surface }} />
      </div>
      <div className="px-[6%] pb-[6%]">
        <div
          className="rounded-[10%/40%] h-0 pb-[16%] relative"
          style={{ backgroundColor: c.ink }}
        >
          <span
            className="absolute inset-0 flex items-center justify-center font-semibold text-white"
            style={{ fontSize: "clamp(6px, 4.8cqw, 12px)" }}
          >
            加入購物車
          </span>
        </div>
      </div>
    </div>
  );
}

// 把設計稿的某個區域（focus，百分比）裁進一個等比例的框裡；children 疊在上面，座標
// 以 focus 為基準的百分比計（focus 是整張時就等於整張設計稿的百分比）。
export function DesignArt({
  focus = FULL,
  children,
  className = "",
  style,
}: {
  focus?: DesignRect;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ratio = (focus.width * DESIGN.aspect.w) / (focus.height * DESIGN.aspect.h);
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: String(ratio), containerType: "inline-size", ...style }}>
      <div
        className="absolute"
        style={{
          width: `${(100 / focus.width) * 100}%`,
          height: `${(100 / focus.height) * 100}%`,
          left: `${-(focus.left / focus.width) * 100}%`,
          top: `${-(focus.top / focus.height) * 100}%`,
          containerType: "inline-size",
        }}
      >
        {DESIGN.image ? (
          <img src={DESIGN.image} alt="Course page design" className="w-full h-full block object-cover" />
        ) : (
          <DesignPlaceholder />
        )}
      </div>
      {children}
    </div>
  );
}

// 設計稿縮圖一律用同一個圓角（2026-10-28 使用者要求：各畫面裡的設計稿圓角要一致，
// 並接近 Figma 的設定）。Figma 的 frame 本身是直角，所以縮圖只給很小的 4px，跟 Figma
// 畫布上直角的 frame 看起來是同一張東西；客戶端 C1/C2/C3、S5 預覽都透過 DesignThumb 套用。
export const DESIGN_THUMB_RADIUS = 4;

export function DesignThumb({ focus, className = "", children }: { focus?: DesignRect; className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ borderRadius: DESIGN_THUMB_RADIUS, border: `1px solid ${c.border}` }}
    >
      <DesignArt focus={focus} className="w-full">
        {children}
      </DesignArt>
    </div>
  );
}

// 把 DESIGN 上的某個區域換算成 focus 內的百分比位置，用來疊選取框或標記
export function rectWithin(r: DesignRect, focus: DesignRect = FULL): React.CSSProperties {
  return {
    position: "absolute",
    top: `${((r.top - focus.top) / focus.height) * 100}%`,
    left: `${((r.left - focus.left) / focus.width) * 100}%`,
    width: `${(r.width / focus.width) * 100}%`,
    height: `${(r.height / focus.height) * 100}%`,
  };
}

// C2 變更總覽與設計師端 S5 預覽共用：整張設計稿，標記 1 = 整體頁面、2 = CTA，
// 對應接下來逐項看的兩個決策。
export function OverviewWithMarkers() {
  const marker = "absolute w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white";
  return (
    <div className="relative">
      {/* 只放數字標記，不在按鈕外加框：使用者反饋框線讓人以為是按鈕本身的設計（2026-10-27） */}
      <DesignThumb />
      <span className={`${marker} -top-3 -left-3`} style={{ backgroundColor: c.accent }}>
        1
      </span>
      <span
        className={marker}
        style={{
          backgroundColor: c.accent,
          top: `calc(${DESIGN.ctaRect.top}% - 13px)`,
          left: `calc(${DESIGN.ctaRect.left + DESIGN.ctaRect.width}% - 7px)`,
        }}
      >
        2
      </span>
    </div>
  );
}

// C3a/C3b「變更」底下的縮圖，也給設計師端「預覽接收端頁面」共用：直接裁真的設計稿。
// 整體頁面設計看主視覺＋標題；CTA 視覺層級放大報名卡片（裁切本身就是重點，不另外加框）。
export function ChangePreview({ decisionId }: { decisionId: string }) {
  const isCta = decisionId === "cta-hierarchy";
  const focus = isCta ? DESIGN.ctaFocus : DESIGN.layoutFocus;
  return (
    <div>
      <DesignThumb focus={focus} />
    </div>
  );
}
