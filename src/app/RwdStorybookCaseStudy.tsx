import { motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  Target,
  Users,
  Heart,
  Compass,
  Lightbulb,
  AlertTriangle,
  Smartphone,
  Layers,
  Navigation,
} from "lucide-react";
import type { IconKey, RwdStorybookContent } from "../content/rwd-storybook";
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
};

const ICONS: Record<IconKey, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  check: Check,
  target: Target,
  people: Users,
  heart: Heart,
  compass: Compass,
  lightbulb: Lightbulb,
  alert: AlertTriangle,
  smartphone: Smartphone,
  layers: Layers,
  navigation: Navigation,
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

export default function RwdStorybookCaseStudy({
  content,
  onNavigate,
}: {
  project: Project;
  content: RwdStorybookContent;
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
              className="text-[2.5rem] md:text-5xl font-bold leading-[1.3] tracking-tight mt-4 mb-5 max-w-3xl"
              style={{ color: c.ink }}
            >
              {content.hero.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {content.hero.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: c.surface, color: c.body, border: `1px solid ${c.border}` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
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
                  <div className="text-sm font-medium max-w-[220px]" style={{ color: c.ink }}>
                    {content.hero.focus}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24 pt-6">
        <div className="rounded-[20px] overflow-hidden flex items-center justify-center" style={{ backgroundColor: c.surface }}>
          <img src={content.hero.coverImage} alt={content.hero.coverAlt} className="w-full h-auto" />
        </div>
        <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
          {content.hero.coverCaption}
          <a
            href={content.hero.coverLinkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: c.accent }}
          >
            {content.hero.coverLinkLabel}
          </a>
        </figcaption>
      </div>

      {/* Impact */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.impact.kicker}</Kicker>
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {content.impact.stats.map((stat, i) => (
              <Card2 key={i}>
                <div className="mb-4">
                  <IconCircle icon={stat.icon} />
                </div>
                <div className="text-base font-bold mb-1.5" style={{ color: c.ink }}>{stat.title}</div>
                <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>{stat.description}</p>
              </Card2>
            ))}
          </div>

          <div
            className="text-xs font-semibold uppercase tracking-[0.08em] mb-6"
            style={{ color: c.muted }}
          >
            {content.impact.feedbackLabel}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {content.impact.quotes.map((q, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ border: `1px solid ${c.border}` }}>
                <p
                  className="text-[17px] leading-[1.6] mb-3.5"
                  style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: c.accent }}
                >
                  {q.quote}
                </p>
                <div className="text-xs" style={{ color: c.muted }}>{q.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem — colored band */}
      <div style={{ backgroundColor: c.problemBand }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker>{content.problem.kicker}</Kicker>
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 mt-6 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold leading-[1.5]" style={{ color: c.ink }}>
                {content.problem.heading}
              </h2>
            </div>
            <div className="flex-1">
              <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
                <img
                  src={content.problem.image}
                  alt={content.problem.imageCaption}
                  className="w-full h-auto object-contain"
                />
              </div>
              <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
                {content.problem.imageCaption}
              </figcaption>
            </div>
          </div>
        </div>
      </div>

      {/* Users */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <div className="text-[13px] font-semibold mb-3" style={{ color: c.muted }}>
          {content.problem.users.label}
        </div>
        <p className="text-sm leading-[1.8] max-w-2xl mb-7" style={{ color: c.body }}>
          {content.problem.users.description}
        </p>
        <div className="rounded-2xl p-5 md:p-6 mb-8" style={{ backgroundColor: c.problemBand }}>
          <div
            className="grid gap-x-5 gap-y-3"
            style={{ gridTemplateColumns: content.problem.users.groups.map(() => "minmax(0,1fr)").join(" 1px ") }}
          >
            {content.problem.users.groups.map((_, i) =>
              i > 0 ? (
                <div key={`div-${i}`} style={{ gridColumn: i * 2, backgroundColor: c.border }} />
              ) : null
            )}
            {content.problem.users.groups.map((g, i) => (
              <div key={i} style={{ gridColumn: i * 2 + 1 }}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-[52px] h-[52px] rounded-full flex-shrink-0 flex items-center justify-center text-2xl"
                    style={{ backgroundColor: c.accentLight }}
                  >
                    <span role="img" aria-label={g.name}>{g.emoji}</span>
                  </div>
                  <div>
                    <div className="text-[15px] font-bold" style={{ color: c.ink }}>{g.name}</div>
                    <span
                      className="inline-block text-[10px] font-semibold px-[8px] py-[2px] rounded-full mt-1"
                      style={{ backgroundColor: c.accent, color: "#fff" }}
                    >
                      {g.tag}
                    </span>
                  </div>
                </div>
                <ul className="space-y-0.5 list-disc list-outside pl-4">
                  {g.traits.map((t, j) => (
                    <li key={j} className="text-xs leading-[1.5]" style={{ color: c.body }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: "#ffffff", border: `1px solid ${c.border}` }}>
          <p className="text-sm leading-[1.8]" style={{ color: c.body }}>
            <strong style={{ color: c.accent, fontWeight: 700 }}>💡 {content.problem.insight.label}</strong>
            <br />
            {content.problem.insight.text}
          </p>
        </div>
      </div>

      {/* Discovery */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.discovery.kicker}</Kicker>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {content.discovery.assumptions.map((a, i) => (
            <Card2 key={i}>
              <div className="mb-4">
                <IconCircle icon={a.icon} />
              </div>
              <div className="text-base font-bold mb-3 leading-[1.4]" style={{ color: c.ink }}>
                {a.heading}
              </div>
              <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>{a.body}</p>
            </Card2>
          ))}
        </div>
      </div>

      {/* Decision Rationale */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.decisionRationale.kicker}</Kicker>
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 mt-6 items-center">
          <div className="flex-1">
            <p className="text-xl md:text-2xl font-bold leading-[1.6]" style={{ color: c.ink }}>
              {content.decisionRationale.statement.before}
              <strong style={{ color: c.accent }}>{content.decisionRationale.statement.bold}</strong>
              {content.decisionRationale.statement.after}
            </p>
          </div>
          <div className="flex-1">
            <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
              <img
                src={content.decisionRationale.image}
                alt={content.decisionRationale.imageCaption}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Design Process */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{content.designProcess.kicker}</Kicker>
        <p className="text-[15px] leading-[1.85] mt-6 mb-8 max-w-2xl" style={{ color: c.body }}>
          {content.designProcess.intro.before}
          <strong style={{ color: c.accent, fontWeight: 700 }}>{content.designProcess.intro.bold}</strong>
          {content.designProcess.intro.after}
        </p>

        <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
          <img
            src={content.designProcess.flowDiagram.image}
            alt={content.designProcess.flowDiagram.caption}
            className="w-full h-auto"
          />
        </div>
        <figcaption className="mt-2.5 text-xs mb-16" style={{ color: c.muted }}>
          {content.designProcess.flowDiagram.caption}
        </figcaption>

        {/* Mobile optimization */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
            <div className="flex-1">
              <div className="text-base font-bold mb-3" style={{ color: c.ink }}>
                {content.designProcess.mobileOptimization.heading}
              </div>
              <p className="text-sm leading-[1.8] font-semibold mb-3" style={{ color: c.ink }}>
                🎯 {content.designProcess.mobileOptimization.insight}
              </p>
              <ul className="space-y-2 list-disc list-outside pl-4">
                {content.designProcess.mobileOptimization.fixes.map((f, i) => (
                  <li key={i} className="text-[13px] leading-[1.7]" style={{ color: c.body }}>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="rounded-[20px] overflow-hidden max-w-[360px]" style={{ backgroundColor: c.surface }}>
                <img
                  src={content.designProcess.mobileOptimization.image}
                  alt={content.designProcess.mobileOptimization.imageCaption}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Progressive disclosure */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
            <div className="flex-1">
              <div className="text-base font-bold mb-3" style={{ color: c.ink }}>
                {content.designProcess.progressiveDisclosure.heading}
              </div>
              <p className="text-sm leading-[1.8] font-semibold mb-2" style={{ color: c.ink }}>
                🎯 {content.designProcess.progressiveDisclosure.insight}
              </p>
              <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>
                {content.designProcess.progressiveDisclosure.description}
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-6">
              {content.designProcess.progressiveDisclosure.examples.map((ex, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: c.surface }}>
                      <img src={ex.main.src} alt={ex.main.caption} className="w-full h-auto" />
                    </div>
                    <figcaption className="mt-2 text-xs text-center" style={{ color: c.muted }}>
                      {ex.main.caption}
                    </figcaption>
                  </div>
                  <div>
                    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: c.surface }}>
                      <img src={ex.sub.src} alt={ex.sub.caption} className="w-full h-auto" />
                    </div>
                    <figcaption className="mt-2 text-xs text-center" style={{ color: c.muted }}>
                      {ex.sub.caption}
                    </figcaption>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side nav */}
        <div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
            <div className="flex-1">
              <div className="text-base font-bold mb-3" style={{ color: c.ink }}>
                {content.designProcess.sideNav.heading}
              </div>
              <p className="text-sm leading-[1.8] font-semibold mb-3" style={{ color: c.ink }}>
                🎯 {content.designProcess.sideNav.insight}
              </p>
              <ul className="space-y-2 list-disc list-outside pl-4">
                {content.designProcess.sideNav.points.map((p, i) => (
                  <li key={i} className="text-[13px] leading-[1.7]" style={{ color: c.body }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full flex flex-col justify-center">
              <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
                <img
                  src={content.designProcess.sideNav.image}
                  alt={content.designProcess.sideNav.imageCaption}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>
                {content.designProcess.sideNav.imageCaption}
              </figcaption>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome — dark band */}
      <div style={{ backgroundColor: c.darkBg, padding: "96px 0" }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10" style={{ color: c.darkInk }}>
          <Kicker onDark>{content.outcome.kicker}</Kicker>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-20">
            {content.outcome.pills.map((pill, i) => (
              <div
                key={i}
                className="rounded-2xl px-6 py-5 text-sm font-semibold text-center"
                style={{ backgroundColor: "#164a35", color: c.darkInk }}
              >
                {pill}
              </div>
            ))}
          </div>

          <div className="mb-7">
            <strong style={{ color: c.darkInk, fontWeight: 700 }} className="text-sm">
              {content.outcome.screensLabel}
            </strong>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
            {content.outcome.screens.map((src, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden aspect-[368/195]"
                style={{ backgroundColor: "#164a35" }}
              >
                <img
                  src={src}
                  alt={`${content.outcome.screensLabel} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mb-7">
            <strong style={{ color: c.darkInk, fontWeight: 700 }} className="text-sm">
              {content.outcome.exhibitionHeading}
            </strong>
          </div>
          <div className="grid gap-5 mb-5" style={{ gridTemplateColumns: "645fr 230fr" }}>
            {content.outcome.exhibitionPhotos.slice(0, 2).map((src, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ aspectRatio: i === 0 ? "645/410" : "230/410" }}
              >
                <img
                  src={src}
                  alt={`${content.outcome.exhibitionHeading} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="grid gap-5" style={{ gridTemplateColumns: "497fr 379fr" }}>
            {content.outcome.exhibitionPhotos.slice(2, 4).map((src, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ aspectRatio: i === 0 ? "497/320" : "379/320" }}
              >
                <img
                  src={src}
                  alt={`${content.outcome.exhibitionHeading} ${i + 3}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{content.reflection.kicker}</Kicker>
        <div
          className="grid gap-x-8 gap-y-8 mt-6"
          style={{ gridTemplateColumns: content.reflection.cards.map(() => "1fr").join(" 1px ") }}
        >
          {content.reflection.cards.map((_, i) =>
            i > 0 ? (
              <div key={`div-${i}`} style={{ gridColumn: i * 2, backgroundColor: c.border }} />
            ) : null
          )}
          {content.reflection.cards.map((card, i) => (
            <div key={i} style={{ gridColumn: `${i * 2 + 1}` }}>
              <div className="text-base font-bold mb-2 leading-[1.4]" style={{ color: c.ink }}>{card.heading}</div>
              <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
