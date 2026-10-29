import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Layers, MapPin, RotateCcw, Users } from "lucide-react";
import type {
  Kiosk,
  KioskAnatomy,
  KioskDecision,
  KioskImage,
  KioskScreen,
  KiosksContent,
  ScreenShape,
} from "../content/kiosks";
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

const IMPACT_ICONS = [Layers, MapPin, Users];

// Kiosk exports are 1080×1920 or 1920×1080 give or take a pixel; one ratio per shape keeps rows even.
const RATIO: Record<Exclude<ScreenShape, "stacked">, string> = { portrait: "9 / 16", landscape: "16 / 9" };

// One kiosk screen; a stacked kiosk shows its upper and lower screen together.
function ScreenArt({ screen, shape, alt, radius = 10 }: { screen: KioskScreen; shape: ScreenShape; alt: string; radius?: number }) {
  if (shape === "stacked") {
    return (
      <div className="flex flex-col gap-1">
        {[screen.src, screen.src2].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={i === 0 ? `${alt}, upper screen` : `${alt}, lower screen`}
            className="w-full block object-cover"
            style={{ aspectRatio: RATIO.landscape, borderRadius: radius }}
          />
        ))}
      </div>
    );
  }
  return (
    <img
      src={screen.src}
      alt={alt}
      className="w-full block object-cover"
      style={{ aspectRatio: RATIO[shape], borderRadius: radius }}
    />
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

function SectionHeading({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <h2
      className="text-2xl md:text-[1.75rem] font-bold leading-snug mt-3"
      style={{ color: onDark ? c.darkInk : c.ink }}
    >
      {children}
    </h2>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
        {label}
      </div>
      <div className="text-sm font-medium" style={{ color: c.ink }}>{value}</div>
    </div>
  );
}

function Caption({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <figcaption className="mt-2 text-xs leading-[1.6]" style={{ color: onDark ? c.darkCaption : c.muted }}>
      {children}
    </figcaption>
  );
}

function Screen({ img, onDark }: { img: KioskImage; onDark?: boolean }) {
  return (
    <figure className="min-w-0">
      <img
        src={img.src}
        alt={img.caption}
        className="w-full block rounded-[10px] object-cover"
        style={img.natural ? undefined : { aspectRatio: RATIO[img.shape === "landscape" ? "landscape" : "portrait"] }}
      />
      <Caption onDark={onDark}>{img.caption}</Caption>
    </figure>
  );
}

function GroupLabel({ label, final }: { label: string; final?: boolean }) {
  return (
    <span
      className="inline-block mb-2 text-[11px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full"
      style={
        final
          ? { backgroundColor: c.accent, color: c.accentLight }
          : { backgroundColor: "#ffffff", color: c.ink, border: `1px solid ${c.border}` }
      }
    >
      {label}
    </span>
  );
}

// The four steps every kiosk repeats, as one loop.
function Journey({ copy }: { copy: KiosksContent["journey"] }) {
  return (
    <figure className="mt-8">
      <div className="text-[11px] uppercase tracking-[0.08em] mb-3" style={{ color: c.muted }}>{copy.label}</div>
      <div className="rounded-2xl px-5 py-6 md:px-8 md:py-7" style={{ backgroundColor: c.problemBand }}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
          {copy.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className="flex items-center gap-2 rounded-full pl-1.5 pr-4 py-1.5 text-sm font-bold"
                style={{ backgroundColor: "#ffffff", color: c.ink, boxShadow: `0 0 0 1.5px ${c.accent}` }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  style={{ backgroundColor: c.accent, color: c.accentLight }}
                >
                  {i + 1}
                </span>
                {step}
              </span>
              {i < copy.steps.length - 1 && <ArrowRight size={16} color={c.accent} aria-hidden />}
            </li>
          ))}
        </ol>
        <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: c.accent }}>
          <RotateCcw size={14} aria-hidden />
          {copy.loop}
        </div>
        <p className="text-[13px] mt-5 pt-4 border-t" style={{ borderColor: c.border, color: c.body }}>{copy.note}</p>
      </div>
    </figure>
  );
}

function AnatomyMarker({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-[11px] font-bold"
      style={{ left: `${x}%`, top: `${y}%`, backgroundColor: c.accentLight, color: c.accent, boxShadow: `0 0 0 2px ${c.accent}` }}
      aria-hidden
    >
      {n}
    </span>
  );
}

// One kiosk's four screens with numbered markers, and a legend of what every kiosk repeats.
function Anatomy({ anatomy }: { anatomy: KioskAnatomy }) {
  return (
    <figure className="mt-10">
      <div className="text-[11px] uppercase tracking-[0.08em] mb-3" style={{ color: c.muted }}>{anatomy.label}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {anatomy.screens.map((s, i) => (
          <div key={s.src} className="min-w-0">
            <div className="relative">
              <img src={s.src} alt={`Disaster Prep: ${s.label}`} className="w-full block rounded-[10px] object-cover" style={{ aspectRatio: RATIO.landscape }} />
              {anatomy.markers.map((m, n) =>
                m.screen === i ? <AnatomyMarker key={n} n={n + 1} x={m.x} y={m.y} /> : null,
              )}
            </div>
            <div className="mt-2 text-xs" style={{ color: c.muted }}>{s.label}</div>
          </div>
        ))}
      </div>
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-6">
        {anatomy.markers.map((m, n) => (
          <li key={m.title} className="flex gap-3">
            <span
              className="w-6 h-6 rounded-full flex-none flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: c.accentLight, color: c.accent }}
            >
              {n + 1}
            </span>
            <div>
              <div className="text-sm font-bold" style={{ color: c.ink }}>{m.title}</div>
              <p className="text-[13px] leading-[1.65] mt-0.5" style={{ color: c.body }}>{m.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Decision({
  decision,
  index,
  journey,
}: {
  decision: KioskDecision;
  index: number;
  journey: KiosksContent["journey"];
}) {
  const { heading, body, compare, images, video, photo, anatomy, aside } = decision;
  const text = (
    <div className={aside ? "max-w-xl" : "max-w-2xl"}>
      <div className="text-xs font-bold mb-2" style={{ color: c.accent }}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="text-base font-bold mb-2" style={{ color: c.ink }}>{heading}</h3>
      <p className="text-[15px] leading-[1.8]" style={{ color: c.body }}>{body}</p>
    </div>
  );

  // Small visuals: pairs or a single clip, sized to sit beside the text on wide screens.
  const media = (
    <>
      {compare && (
        <div className="flex gap-5 sm:gap-6">
          {compare.map((group, i) => (
            <div key={group.label} className="w-[150px] sm:w-[170px] min-w-0">
              <GroupLabel label={group.label} final={i === compare.length - 1} />
              {group.images.map((img) => (
                <Screen key={img.src} img={img} />
              ))}
            </div>
          ))}
        </div>
      )}
      {images && (
        <div className="flex items-start gap-5 sm:gap-6">
          {images.map((img) => (
            <div key={img.src} className="w-[150px] sm:w-[170px] min-w-0">
              <Screen img={img} />
            </div>
          ))}
        </div>
      )}
      {video && (
        <figure className="w-full max-w-[324px] sm:max-w-[364px]">
          <video src={video.src} autoPlay loop muted playsInline className="w-full h-auto block rounded-[10px]" />
          <Caption>{video.caption}</Caption>
        </figure>
      )}
    </>
  );

  return (
    <div className="pt-10 border-t" style={{ borderColor: c.border }}>
      {aside ? (
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_364px] gap-6 md:gap-12 items-start">
          {/* The visual column is always as wide as two screens side by side, so every right column lines up. */}
          {text}
          <div>{media}</div>
        </div>
      ) : (
        <>
          {text}
          {decision.journey && <Journey copy={journey} />}
          {anatomy && <Anatomy anatomy={anatomy} />}
          {(compare || images || video) && <div className="mt-6">{media}</div>}
          {photo && (
            <figure className="mt-10 max-w-2xl">
              <img src={photo.src} alt={photo.caption} className="w-full h-auto block rounded-[14px]" />
              <Caption>{photo.caption}</Caption>
            </figure>
          )}
        </>
      )}
    </div>
  );
}

// Column counts per shape, picked so portrait, wide and stacked screens come out at a similar size.
const FLOW_GRID: Record<ScreenShape, string> = {
  portrait: "grid-cols-4 max-w-[640px]",
  landscape: "grid-cols-2 sm:grid-cols-4",
  stacked: "grid-cols-2 sm:grid-cols-4 max-w-[820px]",
};

// One kiosk's screens in order, wrapping onto a second row rather than scrolling sideways.
function KioskFlow({ kiosk, index }: { kiosk: Kiosk; index: number }) {
  return (
    <div className="pt-8 border-t" style={{ borderColor: "rgba(238,244,233,0.18)" }}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-xs font-bold" style={{ color: c.accentOnDark }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-base font-bold" style={{ color: c.darkInk }}>{kiosk.name}</h3>
        <span className="text-[13px]" style={{ color: c.darkBody }}>{kiosk.control}</span>
      </div>
      <div className={`grid ${FLOW_GRID[kiosk.shape]} gap-x-3 md:gap-x-5 gap-y-6 mt-4`}>
        {kiosk.flow.map((s) => (
          <figure key={s.src} className="min-w-0">
            <ScreenArt screen={s} shape={kiosk.shape} alt={`${kiosk.name}: ${s.label}`} radius={8} />
            <figcaption className="mt-2 text-xs" style={{ color: c.darkCaption }}>{s.label}</figcaption>
          </figure>
        ))}
      </div>
      {kiosk.flowNote && (
        <p className="mt-3 text-xs" style={{ color: c.darkCaption }}>{kiosk.flowNote}</p>
      )}
    </div>
  );
}

export default function KiosksCaseStudy({
  content,
  onNavigate,
}: {
  project: Project;
  content: KiosksContent;
  onNavigate: (p: string, scrollTo?: string) => void;
}) {
  const { hero, impact, problem, kiosksIntro, kiosks, decisions, outcome, reflection } = content;
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
              {hero.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {hero.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: c.surface, color: c.body, border: `1px solid ${c.border}` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[15px] leading-[1.8] max-w-2xl mb-8" style={{ color: c.body }}>
              {hero.description}
            </p>

            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5 border-y"
              style={{ borderColor: c.border }}
            >
              <Meta label="Role" value={hero.role} />
              <Meta label="Event" value={hero.event} />
              <Meta label="Worked with" value={hero.workedWith} />
              <Meta label="What I did" value={hero.whatIDid} />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24 pt-6">
        <figure>
          <img
            src={hero.image}
            alt={hero.imageAlt}
            className="w-full h-auto rounded-[20px] block"
          />
          <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>{hero.caption}</figcaption>
        </figure>
      </div>

      {/* Impact */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{impact.kicker}</Kicker>
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 mt-6 items-start">
          <figure>
            <img
              src={impact.photo}
              alt={impact.photoAlt}
              className="w-full aspect-[4/3] object-cover rounded-[20px] block"
            />
            <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>{impact.photoCaption}</figcaption>
          </figure>
          <div>
            {impact.stats.map((stat, i) => {
              const Icon = IMPACT_ICONS[i % IMPACT_ICONS.length];
              return (
                <div
                  key={stat.title}
                  className={`flex gap-4 py-5 ${i > 0 ? "border-t" : "pt-0"}`}
                  style={{ borderColor: c.border }}
                >
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center flex-none"
                    style={{ backgroundColor: c.accentLight }}
                  >
                    <Icon size={22} strokeWidth={1.6} color={c.accent} />
                  </div>
                  <div>
                    <div className="text-base font-bold mb-1" style={{ color: c.ink }}>{stat.title}</div>
                    <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>{stat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* The challenge — colored band */}
      <div style={{ backgroundColor: c.problemBand }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker>{problem.kicker}</Kicker>
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 mt-6">
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-2xl md:text-[1.75rem] font-bold leading-snug" style={{ color: c.ink }}>
                {problem.heading}
              </h2>
              <p className="text-[15px] leading-[1.85]" style={{ color: c.body }}>{problem.description}</p>
              <div className="pt-4 border-t" style={{ borderColor: c.border }}>
                <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
                  {problem.goalLabel}
                </div>
                <p className="text-sm leading-[1.7]" style={{ color: c.ink }}>{problem.goal}</p>
              </div>
            </div>
            {/* The PM's document, not Sara's work, so it stays small. */}
            <figure className="md:w-[380px] max-w-[380px] flex-none md:pt-1">
              <img src={problem.image} alt={problem.imageCaption} className="w-full h-auto block rounded-[12px]" />
              <Caption>{problem.imageCaption}</Caption>
            </figure>
          </div>
        </div>
      </div>

      {/* The six kiosks — what each one asks of the player */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{kiosksIntro.kicker}</Kicker>
        <SectionHeading>{kiosksIntro.heading}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 mt-8">
          {kiosks.map((k, i) => (
            <div key={k.name} className="min-w-0">
              <img
                src={k.photo}
                alt={k.photoAlt}
                className="w-full aspect-[4/3] object-cover rounded-[14px] block"
                style={{ objectPosition: k.photoPosition }}
              />
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-xs font-bold" style={{ color: c.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="text-base font-bold" style={{ color: c.ink }}>{k.name}</div>
              </div>
              <p className="text-sm leading-[1.7] mt-1" style={{ color: c.body }}>{k.task}</p>
              <span
                className="inline-block mt-2.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: c.accentLight, color: c.accent }}
              >
                {k.control}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Key decisions */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{decisions.kicker}</Kicker>
        <SectionHeading>{decisions.heading}</SectionHeading>
        <div className="space-y-14 mt-10">
          {decisions.items.map((d, i) => (
            <Decision key={d.heading} decision={d} index={i} journey={content.journey} />
          ))}
        </div>
      </div>

      {/* All six flows — dark band */}
      <div style={{ backgroundColor: c.darkBg }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker onDark>{outcome.kicker}</Kicker>
          <SectionHeading onDark>{outcome.heading}</SectionHeading>
          <p className="text-[15px] leading-[1.8] max-w-2xl mt-4" style={{ color: c.darkBody }}>
            {outcome.description}
          </p>
          <div className="space-y-10 mt-10">
            {kiosks.map((k, i) => (
              <KioskFlow key={k.name} kiosk={k} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{reflection.kicker}</Kicker>
        <SectionHeading>{reflection.heading}</SectionHeading>
        <p className="text-[15px] leading-[1.85] max-w-2xl mt-4" style={{ color: c.body }}>
          {reflection.paragraph}
        </p>
      </div>
    </main>
  );
}
