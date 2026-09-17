import { motion } from "motion/react";
import {
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
import type { IconKey, SyncAiContent } from "../content/sync-ai";
import type { Project } from "./App";

// ── Design tokens — shared "Version C" palette, see CLAUDE.md ────────────
const c = {
  ink: "#15181a",
  body: "#40474a",
  accent: "#0f3d2b",
  accentLight: "#cdec8e",
  muted: "#8a908d",
  surface: "#f4f5f2",
  border: "#d8dbd5",
  problemBand: "#eef4e8",
  darkBg: "#0f3d2b",
  darkInk: "#eef4e9",
  darkBody: "#c7d5c0",
  darkCaption: "#9db097",
  darkMobileBg: "#164a35",
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
      style={{ color: onDark ? c.accentLight : c.accent }}
    >
      {children}
    </div>
  );
}

// Click-to-play GIF demo: starts on a static poster frame so two of these side by
// side (or stacked) don't both auto-loop and compete for attention; clicking swaps
// in the animated GIF, which then loops on its own until the visitor scrolls away.
function AutoplayDemo({ gif, alt }: { gif: string; alt: string }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ backgroundColor: c.surface }}>
      <img src={gif} alt={alt} className="w-full h-auto object-contain" />
    </div>
  );
}

function Card2({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`rounded-2xl p-7 ${className}`} style={{ backgroundColor: c.surface, ...style }}>
      {children}
    </div>
  );
}

type PersonaCard = SyncAiContent["discovery"]["persona"]["cards"][number];

function PersonaCardBlock({ card }: { card: PersonaCard }) {
  return (
    <Card2 className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-[52px] h-[52px] rounded-full flex-shrink-0 flex items-center justify-center text-2xl"
          style={{ backgroundColor: c.accentLight }}
        >
          <span role="img" aria-label={card.name}>
            {card.emoji}
          </span>
        </div>
        <div>
          <div className="text-base font-bold" style={{ color: c.ink }}>
            {card.name}
          </div>
          <span
            className="inline-block text-[10px] font-semibold px-[8px] py-[2px] rounded-full mt-1"
            style={{ backgroundColor: "#e2e4de", color: c.body }}
          >
            {card.tag}
          </span>
        </div>
      </div>

      <p
        className="text-[13px] leading-[1.6] mb-4 text-pretty"
        style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: c.accent }}
      >
        「{card.quote}」
      </p>

      <ul className="space-y-1 list-disc list-outside pl-4 mb-4">
        {card.traits.map((t, i) => (
          <li key={i} className="text-xs leading-[1.5] text-pretty" style={{ color: c.body }}>
            {t}
          </li>
        ))}
      </ul>

      <div
        className="text-xs leading-[1.6] pt-3 mt-auto text-pretty"
        style={{ borderTop: `1px solid ${c.border}`, color: c.accent, fontWeight: 600 }}
      >
        {card.aiRole}
      </div>
    </Card2>
  );
}

function JourneyStep({ step }: { step: SyncAiContent["discovery"]["journey"]["steps"][number] }) {
  return (
    <div className="flex-1 min-w-0">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-3"
        style={{ backgroundColor: c.accent, color: "#fff" }}
      >
        {step.step}
      </div>
      <div className="text-xl mb-1.5" role="img" aria-hidden>
        {step.emoji}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[0.06em] mb-1" style={{ color: c.muted }}>
        {step.actor}
      </div>
      <div className="text-sm font-bold mb-1.5 leading-[1.4]" style={{ color: c.ink }}>
        {step.action}
      </div>
      <p className="text-xs leading-[1.6] text-pretty" style={{ color: c.body }}>
        {step.detail}
      </p>
    </div>
  );
}

// Horizontal strip on the dark Open Question band: 01–05 are the finished sprint days,
// 06–09 are the not-yet-run validation steps. One continuous row (scrolls on narrow
// screens) so the "done → next" flow reads as a single line, not two stacked halves.
function SprintTimelineStrip({ steps }: { steps: SyncAiContent["openQuestion"]["sprintTimeline"] }) {
  const doneCount = steps.filter((s) => s.day).length;
  const doneFraction = (doneCount - 1) / (steps.length - 1);

  return (
    <div className="-mx-6 md:-mx-10 px-6 md:px-10 mb-16">
      <div className="overflow-x-auto pb-2">
        <div className="relative" style={{ width: "max-content", minWidth: "100%" }}>
          <div
            className="absolute top-[14px] h-px"
            style={{ left: 100, width: `calc((100% - 200px) * ${doneFraction})`, backgroundColor: c.accentLight }}
          />
          <div
            className="absolute top-[14px] h-px"
            style={{
              left: `calc(100px + (100% - 200px) * ${doneFraction})`,
              right: 100,
              backgroundImage: `repeating-linear-gradient(90deg, ${c.darkCaption} 0 6px, transparent 6px 12px)`,
            }}
          />
          <div className="relative flex gap-5">
            {steps.map((step, i) => {
              const done = Boolean(step.day);
              return (
                <div key={i} className="w-[200px] flex-shrink-0">
                  {done ? (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: c.accentLight }}
                    >
                      <Check size={14} strokeWidth={2.5} color={c.accent} />
                    </div>
                  ) : (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-3"
                      style={{ border: `1.5px dashed ${c.darkCaption}`, color: c.darkCaption }}
                    >
                      {i + 1}
                    </div>
                  )}
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.06em] mb-1.5"
                    style={{ color: c.darkCaption }}
                  >
                    {step.day ?? "待啟動"}
                  </div>
                  <div className="text-sm font-bold mb-1.5 leading-[1.4]" style={{ color: c.darkInk }}>
                    {step.title}
                  </div>
                  <ul className="space-y-1 list-disc list-outside pl-4">
                    {step.items.map((item, ii) => (
                      <li key={ii} className="text-xs leading-[1.6] text-pretty" style={{ color: c.darkBody }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
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

            <Kicker>{content.hero.kicker}</Kicker>
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

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-10">
              <div className="max-w-xl flex-1">
                <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
                  Description
                </div>
                <p className="text-[15px] leading-[1.8]" style={{ color: c.body }}>
                  {content.hero.description}
                </p>
              </div>
              <div className="hidden md:block w-px flex-none" style={{ backgroundColor: c.border }} />
              <div className="flex flex-row gap-8 flex-none">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
                    Role
                  </div>
                  <div className="text-sm font-medium" style={{ color: c.ink }}>
                    {content.hero.role}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
                    Focus
                  </div>
                  <div className="text-sm font-medium max-w-[220px]" style={{ color: c.ink }}>
                    {content.hero.focus}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <div
          className="w-full rounded-[20px] overflow-hidden"
          style={{ backgroundColor: "#ffffff", border: `1px solid ${c.border}` }}
        >
          <img
            src={content.hero.coverImage}
            alt={content.hero.coverAlt}
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* Key Insight */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.keyInsight.kicker}</Kicker>
        <p className="text-[15px] leading-[1.85] max-w-3xl mt-6 mb-9" style={{ color: c.body }}>
          {content.keyInsight.intro}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.keyInsight.stats.map((stat, i) => (
            <Card2 key={i}>
              <div className="mb-5">
                <IconCircle icon={stat.icon} />
              </div>
              <div className="text-lg font-bold mb-2.5 leading-[1.4]" style={{ color: c.ink }}>
                {stat.title}
              </div>
              <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>
                {stat.description}
              </p>
            </Card2>
          ))}
        </div>
      </div>

      {/* Problem — colored band */}
      <div style={{ backgroundColor: c.problemBand }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker>{content.problem.kicker}</Kicker>
          <p className="text-[15px] leading-[1.85] max-w-3xl mt-6 mb-5" style={{ color: c.body }}>
            {content.problem.before}
            <strong style={{ color: c.accent, fontWeight: 700 }}>{content.problem.bold}</strong>
            {content.problem.after}
          </p>
          <p className="text-sm leading-[1.8] max-w-3xl mb-10" style={{ color: c.body }}>
            {content.problem.why.before}
            <strong style={{ color: c.accent, fontWeight: 700 }}>{content.problem.why.emphasis}</strong>
            {content.problem.why.after}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {content.problem.images.map((item, i) => (
              <div key={i}>
                <div
                  className="h-56 sm:h-72 rounded-[20px] overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: "#ffffff", border: `1px solid ${c.border}` }}
                >
                  <img src={item.image} alt={item.caption} className="w-full h-full object-contain" />
                </div>
                <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
                  {item.caption}
                </figcaption>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discovery */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{content.discovery.kicker}</Kicker>

        {/* Persona */}
        <div className="mt-6 mb-16">
          <div className="text-[13px] font-semibold mb-3" style={{ color: c.muted }}>
            {content.discovery.persona.label}
          </div>
          <p className="text-sm leading-[1.8] max-w-2xl mb-7" style={{ color: c.body }}>
            {content.discovery.persona.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {content.discovery.persona.cards.map((card, i) => (
              <PersonaCardBlock key={i} card={card} />
            ))}
          </div>
        </div>

        {/* User Journey */}
        <div>
          <div className="text-[13px] font-semibold mb-3" style={{ color: c.muted }}>
            {content.discovery.journey.heading}
          </div>
          <p className="text-sm leading-[1.8] max-w-2xl mb-7" style={{ color: c.body }}>
            {content.discovery.journey.description}
          </p>

          {/* Mobile — stacked */}
          <div className="lg:hidden space-y-7">
            {content.discovery.journey.steps.map((step, i) => (
              <div key={i} className="pl-4" style={{ borderLeft: `2px solid ${c.border}` }}>
                <JourneyStep step={step} />
              </div>
            ))}
          </div>

          {/* Desktop — horizontal row with connecting line */}
          <div className="hidden lg:block relative">
            <div className="absolute top-[14px] left-0 right-0 h-px" style={{ backgroundColor: c.border }} />
            <div className="relative grid grid-cols-6 gap-5">
              {content.discovery.journey.steps.map((step, i) => (
                <JourneyStep key={i} step={step} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Design Rationale */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.designRationale.kicker}</Kicker>
        <p className="text-[15px] leading-[1.85] max-w-3xl mt-6 mb-9" style={{ color: c.body }}>
          {content.designRationale.intro}
        </p>

        <div className="rounded-[20px] overflow-hidden mb-2.5">
          <img
            src={content.designRationale.flowImage}
            alt={content.designRationale.flowImageCaption}
            className="w-full h-auto object-contain"
          />
        </div>
        <figcaption className="text-xs mb-10" style={{ color: c.muted }}>
          {content.designRationale.flowImageCaption}
        </figcaption>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.designRationale.features.map((f, i) => (
            <Card2 key={i} className="h-full flex flex-col">
              <div className="text-sm font-bold mb-2.5" style={{ color: c.ink }}>
                {f.heading}
              </div>
              <p className="text-[13px] leading-[1.7] mb-3" style={{ color: c.body }}>
                {f.insight}
              </p>
              <div className="pt-3 mt-auto border-t" style={{ borderColor: c.border }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.06em] mb-1" style={{ color: c.muted }}>
                  Why
                </div>
                <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>
                  {f.why}
                </p>
              </div>
            </Card2>
          ))}
        </div>

        <div className="rounded-2xl p-7 mt-5" style={{ border: `1px solid ${c.border}` }}>
          <div className="text-xl mb-3">⚠️</div>
          <div className="text-sm font-bold mb-4" style={{ color: c.ink }}>
            {content.designRationale.notAdopted.heading}
          </div>
          <p
            className="text-[13px] leading-[1.7] mb-5 pb-5 max-w-2xl"
            style={{ color: c.body, borderBottom: `1px solid ${c.border}` }}
          >
            {content.designRationale.notAdopted.description}
          </p>
          <div className="text-xs font-bold uppercase tracking-[0.06em] mb-1.5" style={{ color: c.muted }}>
            {content.designRationale.notAdopted.reasonHeading}
          </div>
          <p className="text-[13px] leading-[1.7] max-w-2xl" style={{ color: c.body }}>
            {content.designRationale.notAdopted.reason}
          </p>
        </div>
      </div>

      {/* Solution */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.solution.kicker}</Kicker>
        <p className="text-[15px] leading-[1.85] max-w-3xl mt-6 mb-9" style={{ color: c.body }}>
          {content.solution.before}
          <strong style={{ color: c.accent, fontWeight: 700 }}>{content.solution.bold}</strong>
          {content.solution.after}
        </p>

        <Card2 className="mb-16">
          <div className="text-sm font-bold mb-5" style={{ color: c.ink }}>
            {content.solution.modeCompareHeading}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.solution.modeCompare.map((group, i) => (
              <div key={i}>
                <div className="text-sm font-bold mb-2.5" style={{ color: c.accent }}>
                  {group.heading}
                </div>
                <ul className="space-y-1 list-disc list-outside pl-4">
                  {group.items.map((item, ii) => (
                    <li key={ii} className="text-[13px] leading-[1.6] text-pretty" style={{ color: c.body }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card2>

        <div className="space-y-10">
          {content.solution.screens.map((screen, i) => (
            <div key={i}>
              <div className="rounded-[20px] overflow-hidden">
                <img src={screen.image} alt={screen.caption} className="w-full h-auto object-contain" />
              </div>
              <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
                {screen.caption}
              </figcaption>
            </div>
          ))}
        </div>
      </div>

      {/* Wireframe Highlights */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.wireframeHighlights.kicker}</Kicker>
        <p className="text-[15px] leading-[1.85] max-w-3xl mt-6 mb-9" style={{ color: c.body }}>
          {content.wireframeHighlights.intro}
        </p>

        <div className="space-y-10">
          <div>
            <div className="rounded-[20px] overflow-hidden" style={{ border: `1px solid ${c.border}` }}>
              <img
                src={content.wireframeHighlights.clientImage}
                alt={content.wireframeHighlights.clientCaption}
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
              {content.wireframeHighlights.clientCaption}
            </figcaption>
          </div>

          <div>
            <div className="rounded-[20px] overflow-hidden" style={{ border: `1px solid ${c.border}` }}>
              <img
                src={content.wireframeHighlights.designerImage}
                alt={content.wireframeHighlights.designerCaption}
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
              {content.wireframeHighlights.designerCaption}
            </figcaption>
          </div>
        </div>
      </div>

      {/* Prototype */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.prototypeShowcase.kicker}</Kicker>
        <p className="text-[15px] leading-[1.85] max-w-3xl mt-6 mb-9" style={{ color: c.body }}>
          {content.prototypeShowcase.intro}
        </p>

        <div className="space-y-10 mb-9">
          <div>
            <AutoplayDemo
              gif={content.prototypeShowcase.designerVideo}
              alt={content.prototypeShowcase.designerVideoCaption}
            />
            <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
              {content.prototypeShowcase.designerVideoCaption}
            </figcaption>
          </div>

          <div>
            <div className="max-w-[320px] mx-auto">
              <AutoplayDemo
                gif={content.prototypeShowcase.clientVideo}
                alt={content.prototypeShowcase.clientVideoCaption}
              />
            </div>
            <figcaption className="mt-2.5 text-xs text-center" style={{ color: c.muted }}>
              {content.prototypeShowcase.clientVideoCaption}
            </figcaption>
          </div>
        </div>

        <div className="text-[13px] font-semibold mb-3" style={{ color: c.muted }}>
          {content.prototypeShowcase.ctaLabel}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate("sync-ai-prototype")}
            className="group inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ backgroundColor: c.accentLight, color: c.accent }}
          >
            {content.prototypeShowcase.ctaDesignerLabel}
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate("sync-ai-review")}
            className="group inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ backgroundColor: c.accentLight, color: c.accent }}
          >
            {content.prototypeShowcase.ctaClientLabel}
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Open Question — dark band, replaces the usual "Outcome" slot: this project hasn't shipped yet */}
      <div style={{ backgroundColor: c.darkBg, padding: "96px 0" }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10" style={{ color: c.darkInk }}>
          <Kicker onDark>{content.openQuestion.kicker}</Kicker>
          <p className="text-sm leading-[1.85] max-w-2xl mt-6 mb-5" style={{ color: c.darkBody }}>
            {content.openQuestion.intro}
          </p>
          <p className="text-sm leading-[1.85] max-w-2xl mb-10" style={{ color: c.darkBody }}>
            <strong style={{ color: c.darkInk, fontWeight: 700 }}>{content.openQuestion.forkBold}</strong>{" "}
            {content.openQuestion.forkAfter}
          </p>

          <SprintTimelineStrip steps={content.openQuestion.sprintTimeline} />

          <div
            className="rounded-2xl p-7 mb-16 max-w-2xl"
            style={{ backgroundColor: c.darkMobileBg }}
          >
            <div className="text-sm font-bold mb-3" style={{ color: c.darkInk }}>
              {content.openQuestion.testPlanHeading}
            </div>
            <ul className="space-y-2 list-disc list-outside pl-4">
              {content.openQuestion.testPlanItems.map((item, i) => (
                <li key={i} className="text-[13px] leading-[1.75]" style={{ color: c.darkBody }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
