import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  FlaskConical,
  Lightbulb,
  AlertCircle,
  Target,
} from "lucide-react";
import type { IconKey, CommunityOfCareContent } from "../content/community-of-care";
import type { Project } from "./App";

// ── Design tokens — shared with "Enterprise Service Design · Version C" ────
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
  warnBg: "#fdf6ec",
  warnBorder: "#f0dfc0",
};

const ICONS: Record<IconKey, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  compass: Compass,
  flask: FlaskConical,
  lightbulb: Lightbulb,
  alert: AlertCircle,
  target: Target,
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

export default function CommunityOfCareCaseStudy({
  content,
  onNavigate,
}: {
  project: Project;
  content: CommunityOfCareContent;
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

            <h1
              className="text-[2.5rem] md:text-5xl font-bold leading-[1.3] tracking-tight mt-4 mb-8 max-w-3xl"
              style={{ color: c.ink }}
            >
              {content.hero.title}
            </h1>

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
                  <div className="text-sm font-medium" style={{ color: c.ink }}>{content.hero.role}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
                    Focus
                  </div>
                  <div className="text-sm font-medium max-w-[260px]" style={{ color: c.ink }}>
                    {content.hero.focus}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <div className="w-full aspect-[16/9] rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
          <img
            src={content.hero.coverImage}
            alt={content.hero.coverAlt}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        </div>
      </div>

      {/* Impact */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.impact.kicker}</Kicker>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
          {content.impact.stats.map((stat, i) => (
            <Card2 key={i}>
              <div className="mb-5">
                <IconCircle icon={stat.icon} />
              </div>
              <div className="text-xl font-bold mb-2.5" style={{ color: c.ink }}>{stat.title}</div>
              <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>{stat.description}</p>
            </Card2>
          ))}
        </div>
        <div className="rounded-2xl p-6" style={{ border: `1px solid ${c.border}` }}>
          <div className="flex gap-2 mb-2">
            <span className="text-base leading-none">💡</span>
            <span className="text-xs font-bold uppercase tracking-[0.06em]" style={{ color: c.muted }}>
              專案定位
            </span>
          </div>
          <ul className="space-y-2.5 list-disc list-outside pl-5">
            {content.impact.notes.map((note, i) => (
              <li key={i} className="text-sm leading-[1.7]" style={{ color: c.body }}>{note}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Problem — colored band */}
      <div style={{ backgroundColor: c.problemBand }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker>{content.problem.kicker}</Kicker>
          <h2 className="text-2xl font-bold mt-4 mb-6" style={{ color: c.ink }}>
            {content.problem.heading}
          </h2>
          <p className="text-[15px] leading-[1.85] max-w-3xl mb-5" style={{ color: c.body }}>
            {content.problem.before}
            <strong style={{ color: c.accent, fontWeight: 700 }}>{content.problem.bold}</strong>
            {content.problem.after}
          </p>
          <p className="text-sm leading-[1.8] max-w-3xl" style={{ color: c.body }}>
            {content.problem.why.before}
            <strong style={{ color: c.accent, fontWeight: 700 }}>{content.problem.why.emphasis}</strong>
            {content.problem.why.after}
          </p>
        </div>
      </div>

      {/* Discovery */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{content.discovery.kicker}</Kicker>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {content.discovery.cards.map((card, i) => (
            <Card2 key={i}>
              <div className="mb-4">
                <IconCircle icon={card.icon} />
              </div>
              <div className="text-base font-bold mb-3 leading-[1.4]" style={{ color: c.ink }}>
                {card.heading}
              </div>
              {card.body.length > 1 ? (
                <ol className="space-y-1.5 list-decimal list-outside pl-4">
                  {card.body.map((line, li) => (
                    <li key={li} className="text-[13px] leading-[1.6]" style={{ color: c.body }}>
                      {line}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-[13px] leading-[1.6]" style={{ color: c.body }}>{card.body[0]}</p>
              )}
            </Card2>
          ))}
        </div>
      </div>

      {/* Early Exploration */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.earlyExploration.kicker}</Kicker>
        <p className="text-sm leading-[1.8] max-w-3xl mt-6 mb-9" style={{ color: c.body }}>
          {content.earlyExploration.intro}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-9 items-stretch">
          {content.earlyExploration.directions.map((dir, i) => (
            <Card2 key={i} className="flex flex-col h-full">
              <div>
                <div className="text-base font-bold mb-3" style={{ color: c.ink }}>{dir.title}</div>
                <p className="text-[13px] leading-[1.7] mb-4" style={{ color: c.body }}>{dir.description}</p>
                {dir.image ? (
                  <div className="mb-4">
                    <div className="rounded-[16px] overflow-hidden" style={{ backgroundColor: c.border }}>
                      <img
                        src={dir.image}
                        alt={dir.imageCaption ?? dir.title}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    {dir.imageCaption && (
                      <figcaption className="mt-2 text-[11px] leading-[1.5]" style={{ color: c.muted }}>
                        {dir.imageCaption}
                      </figcaption>
                    )}
                  </div>
                ) : (
                  <div
                    className="rounded-[16px] mb-4 h-32 flex items-center justify-center text-xs"
                    style={{ backgroundColor: c.border, color: c.muted }}
                  >
                    原型照片待上傳
                  </div>
                )}
              </div>
              <div className="pt-4 mt-auto" style={{ borderTop: `1px solid ${c.border}` }}>
                <div className="text-xs font-bold uppercase tracking-[0.06em] mb-1.5" style={{ color: c.muted }}>
                  不選擇原因
                </div>
                <p className="text-[13px] leading-[1.6]" style={{ color: c.body }}>{dir.rejectedReason}</p>
              </div>
            </Card2>
          ))}
        </div>
        <p className="text-sm leading-[1.8] max-w-3xl" style={{ color: c.body }}>
          {content.earlyExploration.pivotNote}
        </p>
      </div>

      {/* Key Insight */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.keyInsight.kicker}</Kicker>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 mt-6 items-center">
          <div className="flex-1 space-y-6">
            <div className="rounded-2xl p-6" style={{ backgroundColor: c.problemBand }}>
              <div className="text-xs font-bold uppercase tracking-[0.06em] mb-2" style={{ color: c.muted }}>
                {content.keyInsight.hypothesisLabel}
              </div>
              <p className="text-sm leading-[1.7] font-semibold" style={{ color: c.ink }}>
                {content.keyInsight.hypothesis}
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: c.warnBg, border: `1px solid ${c.warnBorder}` }}>
              <div className="text-xs font-bold uppercase tracking-[0.06em] mb-2" style={{ color: c.muted }}>
                ⚠️ {content.keyInsight.concernsLabel}
              </div>
              <ul className="space-y-1.5 list-disc list-outside pl-4">
                {content.keyInsight.concerns.map((item, i) => (
                  <li key={i} className="text-[13px] leading-[1.6]" style={{ color: c.body }}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: c.surface }}>
              <div className="text-xs font-bold uppercase tracking-[0.06em] mb-2" style={{ color: c.muted }}>
                ✅ {content.keyInsight.nextStepLabel}
              </div>
              <p className="text-[13px] leading-[1.6]" style={{ color: c.body }}>{content.keyInsight.nextStep}</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
              <img
                src={content.keyInsight.image}
                alt={content.keyInsight.imageCaption}
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
              {content.keyInsight.imageCaption}
            </figcaption>
          </div>
        </div>
      </div>

      {/* Decision Rationale */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.decisionRationale.kicker}</Kicker>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div className="rounded-2xl p-7" style={{ border: `1px solid ${c.border}` }}>
            <div className="text-2xl mb-3">⚠️</div>
            <div className="text-lg font-bold mb-4" style={{ color: c.ink }}>
              {content.decisionRationale.notChosen.heading}
            </div>
            <p className="text-[13px] leading-[1.7] mb-5 pb-5" style={{ color: c.body, borderBottom: `1px solid ${c.border}` }}>
              {content.decisionRationale.notChosen.description}
            </p>
            <div className="text-xs font-bold uppercase tracking-[0.06em] mb-1.5" style={{ color: c.muted }}>
              {content.decisionRationale.notChosen.reasonHeading}
            </div>
            <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>
              {content.decisionRationale.notChosen.reason}
            </p>
          </div>
          <div className="rounded-2xl p-7" style={{ border: `1.5px solid ${c.accent}` }}>
            <div className="text-2xl mb-3">✅</div>
            <div className="text-lg font-bold mb-4" style={{ color: c.ink }}>
              {content.decisionRationale.chosen.heading}
            </div>
            <p className="text-[13px] leading-[1.7] mb-5 pb-5" style={{ color: c.body, borderBottom: `1px solid ${c.border}` }}>
              {content.decisionRationale.chosen.description}
            </p>
            <div className="text-xs font-bold uppercase tracking-[0.06em] mb-1.5" style={{ color: c.muted }}>
              {content.decisionRationale.chosen.reasonHeading}
            </div>
            <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>
              {content.decisionRationale.chosen.reason}
            </p>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.solution.kicker}</Kicker>
        <p className="text-[15px] leading-[1.85] max-w-3xl mt-6" style={{ color: c.body }}>
          {content.solution.before}
          <strong style={{ color: c.accent, fontWeight: 700 }}>{content.solution.bold}</strong>
          {content.solution.after}
        </p>
      </div>

      {/* Outcome — dark band */}
      <div style={{ backgroundColor: c.darkBg, padding: "96px 0" }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10" style={{ color: c.darkInk }}>
          <Kicker onDark>{content.outcome.kicker}</Kicker>
          <p className="text-sm leading-[1.85] max-w-2xl mt-6 mb-9" style={{ color: c.darkBody }}>
            {content.outcome.description}
          </p>

          <div className="rounded-[20px] overflow-hidden mb-3" style={{ backgroundColor: "#ffffff" }}>
            <img
              src={content.outcome.blueprintImage}
              alt={content.outcome.blueprintCaption}
              className="w-full h-auto object-contain"
            />
          </div>
          <figcaption className="text-xs mb-14" style={{ color: c.darkCaption }}>
            {content.outcome.blueprintCaption}
          </figcaption>

          <div className="rounded-[20px] overflow-hidden mb-3" style={{ backgroundColor: "#ffffff" }}>
            <img
              src={content.outcome.prototypeImage}
              alt={content.outcome.prototypeCaption}
              className="w-full h-auto object-contain"
            />
          </div>
          <figcaption className="text-xs" style={{ color: c.darkCaption }}>
            {content.outcome.prototypeCaption}
          </figcaption>
        </div>
      </div>

      {/* Reflection */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{content.reflection.kicker}</Kicker>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mt-6">
          <p className="text-[15px] leading-[1.85] flex-1" style={{ color: c.body }}>
            {content.reflection.paragraph}
          </p>
          <div className="flex-none w-full md:w-[360px]">
            <div className="w-full aspect-[3/2] rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
              <img
                src={content.reflection.image}
                alt={content.reflection.imageCaption}
                className="w-full h-full object-cover object-left"
              />
            </div>
            <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
              {content.reflection.imageCaption}
            </figcaption>
          </div>
        </div>
      </div>
    </main>
  );
}
