import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ChevronDown,
  Play,
  ArrowLeft,
  ArrowRight,
  Check,
  Target,
  MessageCircle,
  Users,
  AlertCircle,
  Lightbulb,
  Compass,
} from "lucide-react";
import type { Decision, DecisionVisual, FlowStep, IconKey, SyncAiContent } from "../content/sync-ai";
import type { Project } from "./App";
import { SyncAiUserFlow } from "./SyncAiUserFlow";

// ── Design tokens — shared "Version C" palette, see CLAUDE.md ────────────
const c = {
  ink: "#15181a",
  body: "#40474a",
  accent: "#0f3d2b",
  accentLight: "#d6e6cc",
  accentOnDark: "#b9d3b0",
  muted: "#8a908d",
  surface: "#f4f5f2",
  border: "#d8dbd5",
  problemBand: "#eef4e8",
  darkBg: "#0f3d2b",
  darkInk: "#eef4e9",
  darkBody: "#c7d5c0",
  darkCaption: "#9db097",
  darkMobileBg: "#164a35",
  // backdrop baked into the prototype screenshots; decision frames use it so the
  // screenshots blend in instead of showing as a lighter box on --surface
  screenBg: "#fafaf8",
};

const ICONS: Record<IconKey, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  check: Check,
  target: Target,
  chat: MessageCircle,
  people: Users,
  alert: AlertCircle,
  lightbulb: Lightbulb,
  compass: Compass,
};

function IconCircle({ icon }: { icon: IconKey }) {
  const Icon = ICONS[icon];
  return (
    <div
      className="w-[52px] h-[52px] rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: c.accentLight }}
    >
      <Icon size={22} strokeWidth={1.6} color={c.accent} />
    </div>
  );
}

function Kicker({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div
      className="text-xs uppercase tracking-[0.1em] font-semibold"
      style={{ color: onDark ? c.accentOnDark : c.accent }}
    >
      {children}
    </div>
  );
}

// L6 label used inside a decision ("Pain point" / "Decision"), on persona cards and above rows
function SmallLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-3" style={{ color: c.muted }}>
      {children}
    </div>
  );
}

function Caption({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <figcaption className={`mt-2 text-xs leading-[1.6] text-pretty ${className}`} style={{ color: c.muted }}>
      {children}
    </figcaption>
  );
}

function TryPrototype({
  proto,
  onNavigate,
}: {
  proto: SyncAiContent["prototypeShowcase"];
  onNavigate: (p: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-[13px] font-semibold mr-2" style={{ color: c.muted }}>
        {proto.ctaLabel}
      </span>
      {[
        ["sync-ai-prototype", proto.ctaDesignerLabel],
        ["sync-ai-review", proto.ctaClientLabel],
      ].map(([route, label]) => (
        <button
          key={route}
          onClick={() => onNavigate(route)}
          className="group inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold hover:opacity-70 transition-opacity"
          style={{ backgroundColor: c.accentLight, color: c.accent }}
        >
          {label}
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      ))}
    </div>
  );
}

// A demo recording that waits on its first frame until the reader presses play; clicking
// it again pauses, so two demos side by side never run at once unless asked to.
function DemoVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };
  return (
    <div className="relative rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
        className="w-full h-auto block cursor-pointer"
      />
      {!playing && (
        <button
          onClick={toggle}
          aria-label={`Play: ${label}`}
          className="absolute inset-0 flex items-center justify-center group"
          style={{ backgroundColor: "rgba(21,24,26,0.06)" }}
        >
          <span
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"
            style={{ backgroundColor: c.ink }}
          >
            <Play size={20} color="#ffffff" fill="#ffffff" className="ml-0.5" />
          </span>
        </button>
      )}
    </div>
  );
}

// The full branching flow under "How it works", closed by default: its label is the toggle.
function FullFlow({ content }: { content: SyncAiContent["howItWorks"]["userFlow"] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-14 pt-6" style={{ borderTop: `1px solid ${c.border}` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-opacity"
        style={{ color: c.ink }}
      >
        {content.label}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <figure className="mt-6">
          <SyncAiUserFlow content={content} />
          <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
            {content.caption}
          </figcaption>
        </figure>
      )}
    </div>
  );
}

// ── "How it works" strip ───────────────────────────────────────────────────
// Drawn scenes for the steps no screen can show (sending the link, tapping it, having a
// question), in the prototype's own palette (indigo, terracotta) so they sit with the screens.
const ink = "#15181a";
const brand = "#5352c4";
const brandLight = "#eeedfb";
const terracotta = "#b85a31";
const terracottaLight = "#f7e9e2";
const designerPurple = "#9747ff";

// The two recurring characters, drawn once and reused so every scene shows the same people.
// The designer: brown hair in a bun, purple top, behind a laptop (seen from the back).
function DesignerFigure({ mood = "happy" }: { mood?: "happy" | "tired" }) {
  return (
    <g>
      <path d="M22 132 C22 106 36 96 56 96 C76 96 90 106 90 132 Z" fill={designerPurple} />
      <circle cx="56" cy="70" r="18" fill={terracottaLight} stroke={ink} strokeWidth="2" />
      <path d="M38 68 C36 48 74 46 74 66 C68 58 48 58 38 68 Z" fill="#5b3a29" />
      <circle cx="56" cy="47" r="7" fill="#5b3a29" />
      {mood === "happy" ? (
        <>
          <circle cx="50" cy="73" r="1.8" fill={ink} />
          <circle cx="62" cy="73" r="1.8" fill={ink} />
          <path d="M51 80 q5 3 10 0" stroke={ink} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* tired: half-closed eyes, flat mouth, a sweat drop */}
          <path d="M47 73 h6 M59 73 h6" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M52 81 h8" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M74 60 q3 5 0 7 q-3 -2 0 -7 z" fill="#8ec5ff" stroke={ink} strokeWidth="1" />
        </>
      )}
      <path d="M34 108 L46 136 H110 L98 108 Z" fill="#d8dbd5" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      <rect x="18" y="134" width="108" height="6" rx="3" fill="#bfc3bc" stroke={ink} strokeWidth="2" />
    </g>
  );
}

// The client: dark hair, indigo top, phone in hand.
function ClientFigure({ mood }: { mood: "puzzled" | "meh" }) {
  return (
    <g>
      <path d="M38 146 C38 112 54 98 78 98 C102 98 118 112 118 146 Z" fill={brand} />
      <circle cx="78" cy="68" r="22" fill={terracottaLight} stroke={ink} strokeWidth="2" />
      <path d="M56 64 C56 44 100 42 100 62 C92 56 70 56 56 64 Z" fill={ink} />
      {mood === "puzzled" ? (
        <>
          {/* puzzled, not sad: one eyebrow raised, eyes glancing up, a wavy mouth */}
          <path d="M65 66 h8" stroke={ink} strokeWidth="2" strokeLinecap="round" />
          <path d="M81 64 q5 -4 10 -1" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="71" cy="71" r="2" fill={ink} />
          <circle cx="86" cy="70" r="2" fill={ink} />
          <path d="M72 83 q3 -2.5 6 0 t6 0" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* unsure: eyes to the side, mouth pulled to one side */}
          <circle cx="73" cy="71" r="2" fill={ink} />
          <circle cx="87" cy="71" r="2" fill={ink} />
          <path d="M74 84 L84 81.5" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}
      <rect x="92" y="104" width="22" height="36" rx="4" fill="#ffffff" stroke={ink} strokeWidth="2" transform="rotate(-12 103 122)" />
    </g>
  );
}

// The designer (purple top, like the "A" avatar in the prototype) at their laptop,
// sending a chat message that holds a review link with a recognisable chain-link icon.
function ShareIllustration({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={label} className="w-full h-full">
      <DesignerFigure />
      {/* chat bubble with the link */}
      <path d="M112 22 h74 a8 8 0 0 1 8 8 v40 a8 8 0 0 1 -8 8 h-52 l-12 10 v-10 h-10 a8 8 0 0 1 -8 -8 v-40 a8 8 0 0 1 8 -8 z" fill={brand} />
      <rect x="114" y="30" width="48" height="5" rx="2.5" fill="#ffffff" opacity="0.75" />
      <rect x="114" y="44" width="72" height="24" rx="6" fill="#ffffff" />
      <g transform="translate(118 47) scale(0.75)" stroke={brand} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </g>
      <text x="140" y="60" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill={brand} textDecoration="underline">
        sync.ai/r/…
      </text>
    </svg>
  );
}

function TapIllustration({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={label} className="w-full h-full">
      <rect x="62" y="8" width="76" height="136" rx="12" fill="#ffffff" stroke={ink} strokeWidth="2.5" />
      <rect x="68" y="18" width="64" height="12" rx="2" fill="#f4f5f2" />
      <circle cx="75" cy="24" r="3.5" fill="#9747ff" />
      <rect x="82" y="22" width="24" height="4" rx="2" fill={ink} />
      {/* designer's message, then the link card */}
      <rect x="70" y="38" width="46" height="16" rx="7" fill="#f4f5f2" />
      <rect x="75" y="44" width="34" height="4" rx="2" fill="#8a908d" />
      <rect x="70" y="60" width="58" height="40" rx="8" fill={brandLight} stroke={brand} strokeWidth="1.5" />
      <rect x="76" y="66" width="46" height="16" rx="3" fill="#23305a" />
      <g transform="translate(75 85) scale(0.45)" stroke={brand} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </g>
      <rect x="88" y="89" width="32" height="4" rx="2" fill={brand} />
      {/* fingertip tap with a ripple */}
      <circle cx="108" cy="82" r="18" fill={terracotta} opacity="0.12" />
      <circle cx="108" cy="82" r="11" fill={terracotta} opacity="0.22" />
      <path d="M104 132 V96 a5 5 0 0 1 10 0 V112 l12 3 a6 6 0 0 1 4 7 l-3 10" fill={terracottaLight} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function QuestionIllustration({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={label} className="w-full h-full">
      <ClientFigure mood="puzzled" />
      {/* the question */}
      <circle cx="116" cy="54" r="3" fill="#ffffff" stroke={ink} strokeWidth="1.5" />
      <circle cx="126" cy="42" r="5" fill="#ffffff" stroke={ink} strokeWidth="1.5" />
      <circle cx="154" cy="28" r="22" fill="#ffffff" stroke={ink} strokeWidth="2" />
      <text x="154" y="38" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="700" fill={terracotta}>
        ?
      </text>
    </svg>
  );
}

// ── "Before Sync AI" scenes: the same two people, the same chat, but feedback by message ──
const chatGreen = "#c9eeb1";

function ScreenshotIllustration({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={label} className="w-full h-full">
      <DesignerFigure />
      {/* a screenshot pasted into the chat */}
      <path d="M112 16 h74 a8 8 0 0 1 8 8 v58 a8 8 0 0 1 -8 8 h-52 l-12 10 v-10 h-10 a8 8 0 0 1 -8 -8 v-58 a8 8 0 0 1 8 -8 z" fill={chatGreen} stroke={ink} strokeWidth="1.5" />
      <rect x="114" y="23" width="72" height="46" rx="3" fill="#ffffff" stroke={ink} strokeWidth="1.2" />
      <rect x="114" y="23" width="72" height="16" rx="3" fill="#23305a" />
      <rect x="120" y="44" width="40" height="4" rx="2" fill={ink} />
      <rect x="120" y="52" width="28" height="3" rx="1.5" fill="#8a908d" />
      <rect x="164" y="43" width="18" height="10" rx="2" fill="#ffffff" stroke={ink} strokeWidth="1" />
      <rect x="114" y="74" width="50" height="4" rx="2" fill={ink} opacity="0.55" />
    </svg>
  );
}

function VagueReplyIllustration({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={label} className="w-full h-full">
      <ClientFigure mood="meh" />
      {/* a reply that is a feeling, not a decision */}
      <path d="M118 18 h66 a10 10 0 0 1 10 10 v24 a10 10 0 0 1 -10 10 h-44 l-14 12 v-12 h-8 a10 10 0 0 1 -10 -10 v-24 a10 10 0 0 1 10 -10 z" fill="#ffffff" stroke={ink} strokeWidth="2" />
      <text x="150" y="38" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="600" fill={ink}>
        Hmm… it feels
      </text>
      <text x="150" y="52" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="600" fill={ink}>
        a bit off?
      </text>
    </svg>
  );
}

function BackAndForthIllustration({ label }: { label: string }) {
  const left = (y: number, w: number) => (
    <rect x="40" y={y} width={w} height="14" rx="7" fill="#ffffff" stroke={ink} strokeWidth="1.5" />
  );
  const right = (y: number, w: number) => (
    <rect x={160 - w} y={y} width={w} height="14" rx="7" fill={chatGreen} stroke={ink} strokeWidth="1.5" />
  );
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={label} className="w-full h-full">
      {/* a long thread across days */}
      <g transform="translate(-14 0)">
      <rect x="30" y="8" width="140" height="134" rx="12" fill="#dfe6ee" stroke={ink} strokeWidth="2" />
      {left(18, 52)}
      {right(36, 44)}
      {left(54, 66)}
      <rect x="82" y="73" width="36" height="11" rx="5.5" fill={ink} opacity="0.35" />
      <text x="100" y="81" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="600" fill="#ffffff">
        Day 3
      </text>
      {left(90, 46)}
      {right(108, 60)}
      {left(124, 38)}
      </g>
      {/* round and round */}
      <g transform="translate(178 30)">
        <circle r="17" fill={terracottaLight} stroke={terracotta} strokeWidth="2" />
        <path d="M-8 -3 a9 9 0 0 1 15 -4 M7 -7 v-5 M7 -7 h-5 M8 3 a9 9 0 0 1 -15 4 M-7 7 v5 M-7 7 h5" stroke={terracotta} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function RedoIllustration({ label }: { label: string }) {
  const board = (x: number, y: number, v: string, crossed: boolean) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="46" height="60" rx="3" fill="#ffffff" stroke={ink} strokeWidth="1.5" />
      <rect x="0" y="0" width="46" height="16" rx="3" fill="#23305a" />
      <rect x="6" y="22" width="28" height="3.5" rx="1.75" fill={ink} />
      <rect x="6" y="30" width="20" height="3" rx="1.5" fill="#8a908d" />
      <text x="40" y="54" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill={ink}>
        {v}
      </text>
      {crossed && <path d="M4 4 L42 56" stroke={terracotta} strokeWidth="2.4" strokeLinecap="round" />}
    </g>
  );
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={label} className="w-full h-full">
      <g transform="translate(60 0)">
        {board(28, 14, "v1", true)}
        {board(48, 25, "v2", true)}
        {board(68, 36, "v3", true)}
        {board(88, 47, "v4", false)}
      </g>
      <g transform="translate(-6 8) scale(0.92)">
        <DesignerFigure mood="tired" />
      </g>
    </svg>
  );
}

// Who is acting in a step, as a small solid block next to the step number (outside the
// image so it never covers the screen): indigo for the designer, terracotta for the client.
function ActorTag({ actor, label }: { actor: FlowStep["actor"]; label: string }) {
  return (
    <span
      className="inline-block text-[10px] font-semibold uppercase tracking-[0.08em] leading-none px-1.5 py-[4px] rounded-[3px] text-white"
      style={{ backgroundColor: actor === "designer" ? brand : terracotta }}
    >
      {label}
    </span>
  );
}

function FlowTile({ step }: { step: Pick<FlowStep, "image" | "phone" | "illustration" | "alt"> }) {
  return (
    <div
      className="rounded-[12px] overflow-hidden flex items-center justify-center aspect-[4/3]"
      style={{ backgroundColor: c.screenBg, border: `1px solid ${c.border}` }}
    >
      {step.illustration === "share" ? (
        <ShareIllustration label={step.alt} />
      ) : step.illustration === "tap" ? (
        <TapIllustration label={step.alt} />
      ) : step.illustration === "question" ? (
        <QuestionIllustration label={step.alt} />
      ) : step.illustration === "screenshot" ? (
        <ScreenshotIllustration label={step.alt} />
      ) : step.illustration === "vague" ? (
        <VagueReplyIllustration label={step.alt} />
      ) : step.illustration === "backforth" ? (
        <BackAndForthIllustration label={step.alt} />
      ) : step.illustration === "redo" ? (
        <RedoIllustration label={step.alt} />
      ) : (
        <img
          src={step.image}
          alt={step.alt}
          className={step.phone ? "h-full w-auto py-2 block" : "w-full h-full object-contain block"}
        />
      )}
    </div>
  );
}

// Three phases (designer, client opens, client suggests), each a row of three numbered
// tiles with arrows between, so the hand-off reads left to right, top to bottom.
function HowItWorks({ content }: { content: SyncAiContent["howItWorks"] }) {
  let n = 0;
  return (
    <div className="space-y-10">
      {content.phases.map((phase) => (
        <div key={phase.label}>
          <div className="text-sm font-bold mb-4" style={{ color: c.ink }}>
            {phase.label}
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
            {phase.steps.map((step, i) => {
              n += 1;
              return (
                <li key={i} className="relative">
                  <FlowTile step={step} />
                  <div className="flex items-center gap-2 mt-2.5">
                    <span className="text-xs font-bold" style={{ color: c.muted }}>
                      {String(n).padStart(2, "0")}
                    </span>
                    <ActorTag actor={step.actor} label={content.actorLabels[step.actor]} />
                  </div>
                  <p className="text-[13px] leading-[1.55] mt-0.5 text-pretty" style={{ color: c.body }}>
                    {step.text}
                  </p>
                  {i < phase.steps.length - 1 && (
                    <ArrowRight
                      size={18}
                      color={c.accent}
                      className="hidden sm:block absolute top-[calc(37.5%-9px)] -right-[26px]"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      ))}
      <p className="text-xs" style={{ color: c.muted }}>
        {content.illustrationNote}
      </p>
    </div>
  );
}

type PersonaCard = SyncAiContent["problem"]["persona"]["cards"][number];

// Persona portraits in the same flat, outlined style as the client and designer in
// "How it works": same face, line weight and palette, told apart by hair, glasses and top.
function PersonaAvatar({ kind, label }: { kind: PersonaCard["avatar"]; label: string }) {
  const clipId = `persona-${kind}`;
  const shirt = kind === "newcomer" ? "#8f8ee0" : kind === "side" ? terracotta : "#23305a";
  const hair = kind === "side" ? "#5b3a29" : kind === "fulltime" ? "#4a4f4c" : ink;
  return (
    <svg viewBox="0 0 60 60" role="img" aria-label={label} className="w-[52px] h-[52px] flex-shrink-0">
      <defs>
        <clipPath id={clipId}>
          <circle cx="30" cy="30" r="30" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="60" fill={c.accentLight} />
        {kind === "side" && <ellipse cx="42.5" cy="27" rx="4.5" ry="7" fill={hair} stroke={ink} strokeWidth="1.5" />}
        <path d="M9 64 C9 47 18 41 30 41 C42 41 51 47 51 64 Z" fill={shirt} stroke={ink} strokeWidth="1.5" />
        <circle cx="30" cy="27" r="11.5" fill={terracottaLight} stroke={ink} strokeWidth="1.5" />
        {kind === "newcomer" && (
          <>
            <path d="M18.5 26 C18 13 42 13 41.5 26 C38 21 34 22 31 19 C28 22 23 21 18.5 26 Z" fill={hair} />
            <circle cx="23.5" cy="31.5" r="2" fill={terracotta} opacity="0.35" />
            <circle cx="36.5" cy="31.5" r="2" fill={terracotta} opacity="0.35" />
          </>
        )}
        {kind === "side" && <path d="M18.5 27 C17 13 43 13 41.5 27 C38 19 24 18 18.5 27 Z" fill={hair} />}
        {kind === "fulltime" && (
          <>
            <path d="M18.5 25 C18.5 14 41.5 14 41.5 25 C36 20 24 20 18.5 25 Z" fill={hair} />
            <path d="M21.5 31.5 C23 40.5 37 40.5 38.5 31.5 C35 37 25 37 21.5 31.5 Z" fill="#8a7466" />
          </>
        )}
        <circle cx="25.5" cy="27.5" r="1.4" fill={ink} />
        <circle cx="34.5" cy="27.5" r="1.4" fill={ink} />
        {kind === "fulltime" ? (
          <>
            <circle cx="25.5" cy="27.5" r="3.6" fill="none" stroke={ink} strokeWidth="1.3" />
            <circle cx="34.5" cy="27.5" r="3.6" fill="none" stroke={ink} strokeWidth="1.3" />
            <path d="M29.1 27.5 h1.8" stroke={ink} strokeWidth="1.3" />
            <path d="M27 33.5 q3 1.5 6 0" stroke={ink} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <path d="M26.5 32.5 q3.5 2.5 7 0" stroke={ink} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        )}
      </g>
    </svg>
  );
}

// Full persona card (white on the light problem band): who they are, core traits,
// their own words, and the role AI plays for them. Three cards share one row height.
function PersonaCardBlock({ card }: { card: PersonaCard }) {
  return (
    <div className="rounded-2xl p-6 h-full flex flex-col bg-white">
      <div className="flex items-center gap-3 mb-5">
        <PersonaAvatar kind={card.avatar} label={card.name} />
        <div>
          <div className="text-base font-bold" style={{ color: c.ink }}>
            {card.name}
          </div>
          <span
            className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1"
            style={{ backgroundColor: c.problemBand, color: c.accent }}
          >
            {card.tag}
          </span>
        </div>
      </div>

      <SmallLabel>Core traits</SmallLabel>
      <ol className="space-y-1.5 mb-5 list-decimal list-outside pl-4">
        {card.traits.map((t, i) => (
          <li key={i} className="text-[13px] leading-[1.6] text-pretty" style={{ color: c.body }}>
            {t}
          </li>
        ))}
      </ol>

      <p
        className="text-base leading-[1.5] mb-5 text-pretty"
        style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: c.accent }}
      >
        "{card.quote}"
      </p>

      <div className="mt-auto pt-4" style={{ borderTop: `1px solid ${c.border}` }}>
        <SmallLabel>AI's role</SmallLabel>
        <p className="text-[13px] leading-[1.6] text-pretty" style={{ color: c.body }}>
          <strong style={{ color: c.ink, fontWeight: 700 }}>{card.aiRole.name}.</strong> {card.aiRole.description}
        </p>
      </div>
    </div>
  );
}

// "Before Sync AI" as the same kind of strip as "How it works" (tiles, role tags, arrows),
// so the two flows compare like for like. The loop step carries a note for the repeat rounds.
function BeforeFlow({
  before,
  actorLabels,
}: {
  before: SyncAiContent["problem"]["before"];
  actorLabels: { designer: string; client: string };
}) {
  return (
    <div>
      <SmallLabel>{before.label}</SmallLabel>
      <h3 className="text-xl font-bold leading-[1.35] mb-8" style={{ color: c.ink }}>
        {before.heading}
      </h3>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
        {before.steps.map((st, i) => (
          <li key={i} className="relative">
            <FlowTile step={st} />
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <span className="text-xs font-bold" style={{ color: c.muted }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {st.actors.map((a) => (
                <ActorTag key={a} actor={a} label={actorLabels[a]} />
              ))}
              {st.note && (
                <span className="text-xs font-semibold" style={{ color: terracotta }}>
                  {st.note}
                </span>
              )}
            </div>
            <p className="text-[13px] leading-[1.55] mt-0.5 text-pretty" style={{ color: c.body }}>
              {st.text}
            </p>
            {i < before.steps.length - 1 && (
              <ArrowRight
                size={18}
                color={terracotta}
                className="hidden lg:block absolute top-[calc(37.5%-9px)] -right-[26px]"
              />
            )}
          </li>
        ))}
      </ol>
      <p
        className="mt-10 pl-4 text-[14px] leading-[1.7] max-w-3xl text-pretty"
        style={{ borderLeft: `3px solid ${c.accent}`, color: c.body }}
      >
        <strong style={{ color: c.ink, fontWeight: 700 }}>{before.keepLine.bold}</strong>
        {before.keepLine.after}
      </p>
    </div>
  );
}

// The one visual under a decision, always in the same grey frame at full width.
// Phone screens are height-limited so a pair (or a before → after) sits side by side.
function VisualFrame({ visual }: { visual: DecisionVisual }) {
  if (visual.kind === "beforeAfter") {
    return (
      <figure>
        <div
          className="rounded-[20px] px-6 py-8 md:py-10 flex items-center justify-center gap-4 md:gap-10"
          style={{ backgroundColor: c.screenBg, border: `1px solid ${c.border}` }}
        >
          {[visual.before, visual.after].map((side, i) => (
            <div key={i} className="contents">
              {i === 1 && <ArrowRight size={22} color={c.accent} className="flex-shrink-0" />}
              <div className="min-w-0 flex flex-col items-center">
                <div
                  className="text-[10px] font-bold uppercase tracking-[0.08em] mb-3"
                  style={{ color: i ? c.accent : c.muted }}
                >
                  {side.label}
                </div>
                <img src={side.image} alt={side.alt} className="h-[200px] sm:h-[440px] w-auto max-w-full block object-contain" />
                {side.note && (
                  <span
                    className="mt-3 text-[11px] font-semibold px-2.5 py-1 rounded-[3px]"
                    style={i ? { backgroundColor: c.accentLight, color: c.accent } : { backgroundColor: c.surface, color: c.body, border: `1px solid ${c.border}` }}
                  >
                    {side.note}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <Caption>{visual.caption}</Caption>
      </figure>
    );
  }

  return (
    <figure>
      <div
        className="rounded-[20px] overflow-hidden flex justify-center"
        style={{
          backgroundColor: c.screenBg,
          border: `1px solid ${c.border}`,
          padding: visual.device === "phone" ? "32px 24px" : 0,
        }}
      >
        <img
          src={visual.image}
          alt={visual.alt}
          className={visual.device === "phone" ? "h-auto max-h-[480px] w-auto max-w-full block" : "w-full h-auto block"}
        />
      </div>
      <Caption>{visual.caption}</Caption>
    </figure>
  );
}

// Options weighed for a decision, side by side with equal weight, so the one not
// taken reads as a real trade-off rather than a footnote.
function OptionsCompared({ options }: { options: NonNullable<Decision["options"]> }) {
  return (
    <div className="mb-8">
      <SmallLabel>{options.label}</SmallLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.items.map((o, i) => {
          const chosen = o.verdict === "Chosen";
          return (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{ border: `1px solid ${chosen ? c.accent : c.border}`, backgroundColor: chosen ? c.problemBand : "#ffffff" }}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="text-base font-bold" style={{ color: c.ink }}>
                  {String.fromCharCode(65 + i)}. {o.name}
                </div>
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={chosen ? { backgroundColor: c.accentLight, color: c.accent } : { backgroundColor: c.surface, color: c.muted }}
                >
                  {o.verdict}
                </span>
              </div>
              <dl className="space-y-3">
                {[
                  ["Pro", o.pro],
                  ["Con", o.con],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[44px_1fr] gap-2">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.08em] pt-1" style={{ color: c.muted }}>
                      {k}
                    </dt>
                    <dd className="text-[13px] leading-[1.65] text-pretty" style={{ color: c.body }}>
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// One decision, same format every time (after Krystal Cheng's Nexa BIM case study):
// "01. Title" → Pain point | Decision side by side → one visual at full width.
function DecisionBlock({
  decision,
  index,
  labels,
}: {
  decision: Decision;
  index: number;
  labels: { painPoint: string; decision: string };
}) {
  return (
    <article className="pt-12" style={{ borderTop: `1px solid ${c.border}` }}>
      <h3 className="text-xl font-bold leading-[1.35] mb-6" style={{ color: c.ink }}>
        <span className="tabular-nums mr-2" style={{ color: c.accent }}>
          {String(index + 1).padStart(2, "0")}.
        </span>
        {decision.title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8">
        <div>
          <SmallLabel>{labels.painPoint}</SmallLabel>
          <p className="text-[15px] leading-[1.75] text-pretty" style={{ color: c.body }}>
            {decision.painPoint}
          </p>
          {decision.evidence && (
            <figure className="mt-5 max-w-[420px]">
              <div className="rounded-xl overflow-hidden bg-white" style={{ border: `1px solid ${c.border}` }}>
                <img src={decision.evidence.image} alt={decision.evidence.caption} className="w-full h-auto block" />
              </div>
              <Caption>{decision.evidence.caption}</Caption>
            </figure>
          )}
        </div>
        <div>
          <SmallLabel>{labels.decision}</SmallLabel>
          <p className="text-[15px] leading-[1.75] text-pretty" style={{ color: c.body }}>
            {decision.decision}
          </p>
        </div>
      </div>

      {decision.options && <OptionsCompared options={decision.options} />}

      <VisualFrame visual={decision.visual} />
    </article>
  );
}

export default function SyncAiCaseStudy({
  project,
  content,
  onNavigate,
}: {
  project: Project;
  content: SyncAiContent;
  onNavigate: (p: string, scrollTo?: string) => void;
}) {
  const { prototypeShowcase: proto, problem, decisions } = content;

  return (
    <main style={{ fontFamily: "var(--font-inter)", color: c.body, background: "#ffffff" }}>
      {/* Hero */}
      <section className="pt-28 md:pt-40 pb-8">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <button
              onClick={() => onNavigate("home", "work")}
              className="group inline-flex items-center gap-2 text-sm font-semibold mb-12 hover:opacity-70 transition-opacity"
              style={{ color: c.ink }}
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              All projects
            </button>

            <h1
              className="text-[2.5rem] md:text-5xl font-bold leading-[1.3] tracking-tight mt-4 mb-6 max-w-3xl"
              style={{ color: c.ink }}
            >
              {content.hero.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {content.hero.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: c.problemBand, color: c.accent }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[15px] leading-[1.8] max-w-2xl mb-8" style={{ color: c.body }}>
              {content.hero.description}
            </p>

            {/* Summary: role, type, team, deliverables */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5 mb-10 border-y" style={{ borderColor: c.border }}>
              {[
                ["Role", content.hero.role],
                ["Type", content.hero.type],
                ["Worked with", content.hero.workedWith],
                ["Deliverables", content.hero.deliverables],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
                    {label}
                  </div>
                  <div className="text-sm font-medium" style={{ color: c.ink }}>{value}</div>
                </div>
              ))}
            </div>

            <img
              src={content.hero.coverImage}
              alt={content.hero.coverAlt}
              className="w-full h-auto block rounded-[20px] mb-12"
            />
          </motion.div>
        </div>
      </section>

      {/* See it in motion — the two demos side by side, each paused on its first frame until
          the reader presses play, so the pair stays calm before the problem section */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.howItWorks.prototypeLabel}</Kicker>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_220px] gap-6 md:gap-8 items-start">
          <figure>
            <SmallLabel>{proto.designerStep}</SmallLabel>
            <DemoVideo src={proto.designerVideo} poster={proto.designerPoster} label={proto.designerVideoCaption} />
            <Caption>{proto.designerVideoCaption}</Caption>
          </figure>

          <div className="flex md:flex-col items-center justify-center gap-1.5 md:self-center">
            <span className="text-[12px] font-semibold md:text-center md:max-w-[88px]" style={{ color: c.accent }}>
              {proto.handoffLabel}
            </span>
            <ArrowRight size={22} color={c.accent} className="hidden md:block" />
            <ArrowDown size={22} color={c.accent} className="md:hidden" />
          </div>

          <figure className="max-w-[260px] mx-auto md:max-w-none w-full">
            <SmallLabel>{proto.clientStep}</SmallLabel>
            <DemoVideo src={proto.clientVideo} poster={proto.clientPoster} label={proto.clientVideoCaption} />
            <Caption>{proto.clientVideoCaption}</Caption>
          </figure>
        </div>

        <div className="mt-12 flex justify-center">
          <TryPrototype proto={proto} onNavigate={onNavigate} />
        </div>
      </div>

      {/* The problem — paragraph, stats, quotes, personas, then the "before" flow on a light band */}
      <div style={{ backgroundColor: c.problemBand }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker>{problem.kicker}</Kicker>
          <h2 className="text-2xl md:text-[1.75rem] font-bold leading-snug mt-3" style={{ color: c.ink }}>
            {problem.heading}
          </h2>
          <p className="text-[15px] leading-[1.85] max-w-3xl mt-4 mb-12" style={{ color: c.body }}>
            {problem.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {problem.stats.map((stat, i) => (
              <div key={i}>
                <div className="mb-4">
                  <IconCircle icon={stat.icon} />
                </div>
                <div className="text-base font-bold mb-1.5 leading-[1.4]" style={{ color: c.ink }}>
                  {stat.title}
                </div>
                <p className="text-[13px] leading-[1.7] text-pretty" style={{ color: c.body }}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Open survey answers backing the "no shared idea of done" stat */}
          <div className="mb-16">
            <SmallLabel>{problem.quotes.label}</SmallLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {problem.quotes.items.map((q, i) => (
                <p
                  key={i}
                  className="pt-4 text-base leading-[1.55] text-pretty"
                  style={{
                    borderTop: `1px solid ${c.border}`,
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    color: c.accent,
                  }}
                >
                  "{q}"
                </p>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <SmallLabel>{problem.persona.label}</SmallLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {problem.persona.cards.map((card, i) => (
                <PersonaCardBlock key={i} card={card} />
              ))}
            </div>
          </div>

          <BeforeFlow before={problem.before} actorLabels={content.howItWorks.actorLabels} />
        </div>
      </div>

      {/* Key decisions — same format for each: title, final screen, process evidence, why */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{decisions.kicker}</Kicker>
        <h2 className="text-2xl md:text-[1.75rem] font-bold leading-snug mt-3 mb-12" style={{ color: c.ink }}>
          {decisions.heading}
        </h2>

        <div className="space-y-20">
          {decisions.items.map((d, i) => (
            <DecisionBlock
              key={i}
              decision={d}
              index={i}
              labels={{ painPoint: decisions.painPointLabel, decision: decisions.decisionLabel }}
            />
          ))}
        </div>
      </div>

      {/* How it works — the finished product, step by step, after the decisions that shaped it */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.howItWorks.kicker}</Kicker>
        <h2 className="text-2xl md:text-[1.75rem] font-bold leading-snug mt-3 mb-10" style={{ color: c.ink }}>
          {content.howItWorks.heading}
        </h2>
        <HowItWorks content={content.howItWorks} />

        {/* the same story with every branch, folded away for readers who want the whole system */}
        <FullFlow content={content.howItWorks.userFlow} />
      </div>

      {/* Reflection — same closing kicker as the other cases */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-6">
        <Kicker>{content.reflection.kicker}</Kicker>
      </div>

      {/* How I built it with AI — one compact box, like Krystal Cheng's "How I used AI in this phase" */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <div className="rounded-2xl p-7 md:p-8 max-w-3xl" style={{ backgroundColor: c.problemBand }}>
          <Kicker>{content.howIBuilt.kicker}</Kicker>
          <ul className="mt-5 space-y-3">
            {content.howIBuilt.items.map((item, i) => (
              <li key={i} className="text-[14px] leading-[1.7] text-pretty" style={{ color: c.body }}>
                <strong style={{ color: c.ink, fontWeight: 700 }}>{item.bold}</strong>
                {item.after}
              </li>
            ))}
          </ul>
          <p className="text-xs mt-5 pt-4" style={{ color: c.muted, borderTop: `1px solid ${c.border}` }}>
            {content.howIBuilt.toolsLabel}: {content.howIBuilt.tools}
          </p>
        </div>
      </div>

      {/* What's next — dark band, replaces the usual "Outcome" slot: this project hasn't shipped yet */}
      <div style={{ backgroundColor: c.darkBg, padding: "96px 0" }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10" style={{ color: c.darkInk }}>
          <Kicker onDark>{content.whatsNext.kicker}</Kicker>
          <p className="text-[15px] leading-[1.85] max-w-2xl mt-6 mb-4" style={{ color: c.darkBody }}>
            {content.whatsNext.intro}
          </p>

          {/* One ordered list: the scope test first, then the work to make it a product */}
          <div className="max-w-2xl">
            <ol>
              {content.whatsNext.steps.map((item, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[28px_1fr] text-[13px] leading-[1.75] py-3"
                  style={{ color: c.darkBody, borderBottom: `1px solid ${c.darkMobileBg}` }}
                >
                  <span className="font-bold tabular-nums" style={{ color: c.accentOnDark }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong style={{ color: c.darkInk, fontWeight: 700 }}>{item.bold}</strong>
                    {item.after}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
