import { motion } from "motion/react";
import { ArrowLeft, Check, Timer, Users } from "lucide-react";
import type { EnergyDecision, EnergyImage, SdgEnergyContent } from "../content/sdg-energy";
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

const IMPACT_ICONS = [Check, Timer, Users];

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

function Figure({ src, caption }: { src: string; caption: string }) {
  return (
    <figure>
      <div className="rounded-[14px] overflow-hidden border" style={{ borderColor: c.border }}>
        <img src={src} alt={caption} className="w-full h-auto block" />
      </div>
      <figcaption className="mt-2 text-xs leading-[1.6]" style={{ color: c.muted }}>{caption}</figcaption>
    </figure>
  );
}

// Each image's flex-grow is its width / height ratio, so the row shares one height without cropping.
function EqualHeightRow({ images }: { images: EnergyImage[] }) {
  return (
    <div className="flex flex-col sm:flex-row gap-5 mt-3">
      {images.map((img) => (
        <figure key={img.caption} className="min-w-0" style={{ flex: `${img.ratio ?? 1} 1 0` }}>
          <img src={img.src} alt={img.caption} className="w-full h-auto block rounded-[10px]" />
          <figcaption className="mt-2 text-xs leading-[1.6]" style={{ color: c.muted }}>{img.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function MapNumber({ n }: { n: number }) {
  return (
    <span
      className="w-6 h-6 rounded-full flex-none flex items-center justify-center text-xs font-bold"
      style={{ backgroundColor: c.accentLight, color: c.accent }}
    >
      {n}
    </span>
  );
}

// Numbered marker placed over the screenshot; x / y are percentages of the image.
function MapMarker({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-[22px] md:h-[22px] rounded-full flex items-center justify-center text-[9px] md:text-[11px] font-bold"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: c.accentLight,
        color: c.accent,
        boxShadow: `0 0 0 2px ${c.accent}`,
      }}
      aria-hidden
    >
      {n}
    </span>
  );
}

function Decision({ decision, index }: { decision: EnergyDecision; index: number }) {
  const { heading, body, compare, imagesLabel, images, layout = "single" } = decision;
  const grid =
    layout === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1";
  return (
    <div className="pt-10 border-t" style={{ borderColor: c.border }}>
      <div className="max-w-2xl">
        <div className="text-xs font-bold mb-2" style={{ color: c.accent }}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="text-base font-bold mb-2" style={{ color: c.ink }}>{heading}</h3>
        <p className="text-[15px] leading-[1.8]" style={{ color: c.body }}>{body}</p>
      </div>
      {compare && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          {compare.map((img) => (
            <figure key={img.label}>
              <span
                className="inline-block mb-2 text-[11px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full"
                style={
                  img.label === "After"
                    ? { backgroundColor: c.accent, color: c.accentLight }
                    : { backgroundColor: "#ffffff", color: c.ink, border: `1px solid ${c.border}` }
                }
              >
                {img.label}
              </span>
              {/* Both cropped to the final screen's ratio so the pair matches in size; the old screen loses a little top and bottom. */}
              <div className="aspect-[1035/493] rounded-[14px] overflow-hidden">
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover block" />
              </div>
              <figcaption className="mt-2 text-xs leading-[1.6]" style={{ color: c.muted }}>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
      {decision.compareRows && (
        <div className="mt-6 border-t" style={{ borderColor: c.border }}>
          {/* Column labels only on wide screens; on phones each row names its own side. */}
          <div
            className="hidden sm:grid grid-cols-[1fr_1fr_1fr] gap-5 py-2.5 text-[11px] uppercase tracking-[0.08em] border-b"
            style={{ color: c.muted, borderColor: c.border }}
          >
            <span />
            <span>Before</span>
            <span>After</span>
          </div>
          {decision.compareRows.map((row) => (
            <div
              key={row.question}
              className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr] gap-1 sm:gap-5 py-3 border-b text-sm leading-[1.6]"
              style={{ borderColor: c.border }}
            >
              <span className="font-bold" style={{ color: c.ink }}>{row.question}</span>
              <span style={{ color: c.muted }}>
                <span className="sm:hidden font-semibold">Before: </span>
                {row.before}
              </span>
              <span style={{ color: c.body }}>
                <span className="sm:hidden font-semibold" style={{ color: c.accent }}>After: </span>
                {row.after}
              </span>
            </div>
          ))}
        </div>
      )}
      {imagesLabel && (
        <div className="text-[11px] uppercase tracking-[0.08em] mt-10" style={{ color: c.muted }}>
          {imagesLabel}
        </div>
      )}
      {layout === "row" ? (
        <EqualHeightRow images={images} />
      ) : (
        <div
          className={`grid ${grid} gap-5 ${imagesLabel ? "mt-3" : "mt-6"} ${layout === "single" ? "max-w-3xl" : layout === "small" ? "max-w-md" : ""}`}
        >
          {images.map((img) => (
            <Figure key={img.caption} src={img.src} caption={img.caption} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SdgEnergyCaseStudy({
  content,
  onNavigate,
}: {
  project: Project;
  content: SdgEnergyContent;
  onNavigate: (p: string, scrollTo?: string) => void;
}) {
  const { hero, impact, problem, discovery, decisions, outcome, reflection } = content;
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

            {/* Summary: role, exhibition, team, what I did */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5 border-y"
              style={{ borderColor: c.border }}
            >
              <Meta label="Role" value={hero.role} />
              <Meta label="Exhibition" value={hero.exhibition} />
              <Meta label="Worked with" value={hero.workedWith} />
              <Meta label="What I did" value={hero.whatIDid} />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24 pt-6">
        <div className="w-full aspect-[16/9] rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
          {/* Square mockup: keep the whole stand screen in a 16:9 frame. */}
          <img src={hero.image} alt={hero.imageAlt} className="w-full h-full object-cover object-[50%_38%]" />
        </div>
        <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>{hero.caption}</figcaption>
      </div>

      {/* Impact */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{impact.kicker}</Kicker>
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 mt-6 items-start">
          <figure>
            <div className="aspect-[4/3] rounded-[20px] overflow-hidden" style={{ backgroundColor: c.surface }}>
              <img src={impact.photo} alt={impact.photoAlt} className="w-full h-full object-cover" />
            </div>
            <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>{impact.photoCaption}</figcaption>
          </figure>
          {/* Stats as a divided list beside the photo, not cards. */}
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

      {/* The gap — colored band */}
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
                  {problem.usersLabel}
                </div>
                <p className="text-sm leading-[1.7]" style={{ color: c.ink }}>{problem.users}</p>
              </div>
            </div>
            {/* The old screen isn't Sara's work and is low resolution, so it stays small. */}
            <figure className="md:w-[300px] max-w-[300px] flex-none md:pt-1">
              <div className="rounded-[12px] overflow-hidden">
                <img src={problem.image} alt={problem.imageCaption} className="w-full h-auto block" />
              </div>
              <figcaption className="mt-2 text-xs leading-[1.6]" style={{ color: c.muted }}>{problem.imageCaption}</figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* What I found — one row, divided columns */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{discovery.kicker}</Kicker>
        <SectionHeading>{discovery.heading}</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 mt-8">
          {discovery.items.map((item, i) => (
            <div
              key={item.label}
              className={`md:px-6 ${i === 0 ? "md:pl-0" : "md:border-l"} ${i === discovery.items.length - 1 ? "md:pr-0" : ""}`}
              style={{ borderColor: c.border }}
            >
              <div className="text-base font-bold mb-2 leading-[1.4]" style={{ color: c.ink }}>{item.label}</div>
              <p className="text-sm leading-[1.75]" style={{ color: c.body }}>{item.text}</p>
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
            <Decision key={d.heading} decision={d} index={i} />
          ))}
        </div>
      </div>

      {/* The final screen — dark band */}
      <div style={{ backgroundColor: c.darkBg }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker onDark>{outcome.kicker}</Kicker>
          <SectionHeading onDark>{outcome.heading}</SectionHeading>
          <p className="text-[15px] leading-[1.8] max-w-2xl mt-4" style={{ color: c.darkBody }}>
            {outcome.description}
          </p>
          <div className="relative rounded-[20px] overflow-hidden mt-8">
            <img src={outcome.image} alt={outcome.imageAlt} className="w-full h-auto block" />
            {outcome.points.map((p, i) => (
              <MapMarker key={p.title} n={i + 1} x={p.x} y={p.y} />
            ))}
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mt-8">
            {outcome.points.map((p, i) => (
              <li key={p.title} className="flex gap-3">
                <MapNumber n={i + 1} />
                <div>
                  <div className="text-sm font-bold" style={{ color: c.darkInk }}>{p.title}</div>
                  <p className="text-[13px] leading-[1.65] mt-0.5" style={{ color: c.darkBody }}>{p.text}</p>
                  {"image" in p && p.image && (
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className={`mt-2.5 h-auto block ${
                        "imageBox" in p && p.imageBox ? "w-[150px] bg-white rounded-lg p-2" : "w-auto max-w-[200px] max-h-[90px] rounded-md"
                      }`}
                    />
                  )}
                </div>
              </li>
            ))}
          </ol>
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
