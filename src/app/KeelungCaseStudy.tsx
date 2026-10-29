import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Users, Route, Wrench } from "lucide-react";
import type { KeelungContent } from "../content/keelung";
import type { Project } from "./App";

// ── Design tokens — shared with "Enterprise Service Design · Version C" ────
const c = {
  ink: "#15181a",
  body: "#40474a",
  accent: "#0f3d2b",
  accentLight: "#cdec8e",
  muted: "#8a908d",
  surface: "#f4f5f2",
  border: "#d8dbd5",
  problemBand: "#eef4e8",
};

const IMPACT_ICONS = [Users, Route, Wrench];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-xs uppercase tracking-[0.1em] font-semibold"
      style={{ color: c.accent }}
    >
      {children}
    </div>
  );
}

// Steps 1, 10 and 11 are drawn so the journey reads in one style; so they are drawn in the kiosk's palette
// (teal, coral, cream). No real brand UI, just a map and a generic fan page.
function CardsIllustration({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 200 125" role="img" aria-label={label} className="w-full h-full">
      {/* reader with a soft glow */}
      <ellipse cx="100" cy="108" rx="62" ry="10" fill="#bff3ea" opacity="0.7" />
      <rect x="48" y="98" width="104" height="14" rx="5" fill="#d9efe9" stroke="#1f5c50" strokeWidth="2" />
      {/* card waiting on the counter */}
      <g transform="translate(150 50) rotate(8)">
        <rect width="30" height="48" rx="4" fill="#e9d2a8" stroke="#a9834a" strokeWidth="2" />
        <path d="M8 20 C10 10 20 10 22 20 C22 26 8 26 8 20 Z" fill="#2f9c86" />
        <rect x="7" y="32" width="16" height="4" rx="2" fill="#8a3b24" />
      </g>
      {/* card going onto the reader */}
      <g transform="translate(80 22) rotate(-6)">
        <rect width="40" height="62" rx="5" fill="#e9d2a8" stroke="#a9834a" strokeWidth="2" />
        <ellipse cx="20" cy="24" rx="10" ry="7" fill="#e8785e" />
        <circle cx="16" cy="18" r="1.8" fill="#15181a" />
        <circle cx="24" cy="18" r="1.8" fill="#15181a" />
        <path d="M10 23 C4 20 4 14 9 13 M30 23 C36 20 36 14 31 13" stroke="#e8785e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="9" y="42" width="22" height="5" rx="2.5" fill="#8a3b24" />
      </g>
      <path d="M100 88 V95 M96 91 L100 95 L104 91" stroke="#1f5c50" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapsAndPageIllustration({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 200 125" role="img" aria-label={label} className="w-full h-full">
      {/* map phone */}
      <rect x="38" y="10" width="56" height="105" rx="9" fill="#ffffff" stroke="#15181a" strokeWidth="2" />
      <rect x="43" y="18" width="46" height="89" rx="3" fill="#d9efe9" />
      <path d="M43 50 L89 38 M43 78 L89 92 M60 18 L70 107" stroke="#ffffff" strokeWidth="4" />
      <path d="M66 50 c0 -8 12 -8 12 0 c0 7 -6 13 -6 13 s-6 -6 -6 -13 z" fill="#e8785e" />
      <circle cx="72" cy="50" r="2.4" fill="#ffffff" />
      {/* fan page phone */}
      <rect x="106" y="10" width="56" height="105" rx="9" fill="#ffffff" stroke="#15181a" strokeWidth="2" />
      <rect x="111" y="18" width="46" height="22" rx="3" fill="#e8785e" />
      <circle cx="122" cy="42" r="8" fill="#fff8ec" stroke="#1f5c50" strokeWidth="2" />
      <rect x="133" y="44" width="20" height="4" rx="2" fill="#15181a" />
      <rect x="114" y="56" width="40" height="8" rx="4" fill="#1f5c50" />
      <rect x="114" y="70" width="40" height="3" rx="1.5" fill="#8a908d" />
      <rect x="114" y="77" width="32" height="3" rx="1.5" fill="#8a908d" />
      <rect x="114" y="86" width="40" height="18" rx="3" fill="#d9efe9" />
    </svg>
  );
}

function RestaurantIllustration({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 200 125" role="img" aria-label={label} className="w-full h-full">
      <rect x="34" y="40" width="132" height="78" fill="#fff8ec" stroke="#8a3b24" strokeWidth="2" />
      <rect x="54" y="12" width="92" height="22" rx="5" fill="#8a3b24" />
      <text x="100" y="27" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#fff8ec" letterSpacing="1">
        LOCAL HOT POT
      </text>
      <path d="M30 40 H170 V52 H30 Z" fill="#e8785e" />
      <path
        d="M30 52 q8 7 17.5 0 q8 7 17.5 0 q8 7 17.5 0 q8 7 17.5 0 q8 7 17.5 0 q8 7 17.5 0 q8 7 17.5 0 q8 7 17.5 0"
        fill="#e8785e"
      />
      <rect x="46" y="66" width="62" height="40" rx="4" fill="#d9efe9" />
      <ellipse cx="77" cy="94" rx="14" ry="5" fill="#ffffff" />
      <path
        d="M70 88 c-2 -5 3 -6 1 -11 M78 87 c-2 -5 3 -6 1 -11 M86 88 c-2 -5 3 -6 1 -11"
        stroke="#1f5c50"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="122" y="66" width="32" height="52" rx="3" fill="#1f5c50" />
      <circle cx="148" cy="94" r="2.5" fill="#fff8ec" />
    </svg>
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

export default function KeelungCaseStudy({
  content,
  onNavigate,
}: {
  project: Project;
  content: KeelungContent;
  onNavigate: (p: string, scrollTo?: string) => void;
}) {
  const { hero, impact, problem, decisions, journey, hardware, outcome, reflection } = content;
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

            <Kicker>{hero.kicker}</Kicker>
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

            {/* Summary: role, client, team, deliverables */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5 border-y"
              style={{ borderColor: c.border }}
            >
              <Meta label="Role" value={hero.role} />
              <Meta label="Client" value={hero.client} />
              <Meta label="Worked with" value={hero.workedWith} />
              <Meta label="Deliverables" value={hero.deliverables} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* The stage backdrop is part of the image, so the homepage card can use the same file. */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24 pt-6">
        <img src={hero.coverImage} alt={hero.coverAlt} className="w-full h-auto block rounded-[20px]" />
        <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>{hero.caption}</figcaption>
      </div>

      {/* Impact */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{impact.kicker}</Kicker>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {impact.stats.map((stat, i) => {
            const Icon = IMPACT_ICONS[i % IMPACT_ICONS.length];
            return (
              <div key={stat.title} className="rounded-2xl p-7" style={{ backgroundColor: c.surface }}>
                <div
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: c.accentLight }}
                >
                  <Icon size={22} strokeWidth={1.6} color={c.accent} />
                </div>
                <div className="text-base font-bold mb-1.5" style={{ color: c.ink }}>{stat.title}</div>
                <p className="text-[13px] leading-[1.7]" style={{ color: c.body }}>{stat.description}</p>
              </div>
            );
          })}
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
            </div>
            <div className="flex-1">
              <div className="rounded-[20px] overflow-hidden">
                <img src={problem.image} alt={problem.imageCaption} className="w-full h-auto block" />
              </div>
              <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>{problem.imageCaption}</figcaption>
            </div>
          </div>
        </div>
      </div>

      {/* Key decisions — one row, divided columns; each points to the journey step that shows it */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pt-24">
        <Kicker>{decisions.kicker}</Kicker>
        <h2 className="text-2xl md:text-[1.75rem] font-bold leading-snug mt-3" style={{ color: c.ink }}>
          {decisions.heading}
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mt-8">
          {decisions.items.map((d, i) => (
            <li
              key={d.title}
              className={`md:px-6 ${i === 0 ? "md:pl-0" : "md:border-l"} ${i === decisions.items.length - 1 ? "md:pr-0" : ""}`}
              style={{ borderColor: c.border }}
            >
              <div className="text-xs font-bold mb-2" style={{ color: c.accent }}>{String(i + 1).padStart(2, "0")}</div>
              <div className="text-base font-bold mb-2 leading-[1.4]" style={{ color: c.ink }}>{d.title}</div>
              <p className="text-sm leading-[1.75]" style={{ color: c.body }}>{d.text}</p>
              <div className="text-[11px] uppercase tracking-[0.08em] mt-3" style={{ color: c.muted }}>{d.see}</div>
            </li>
          ))}
        </ol>
      </div>

      {/* The journey */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{journey.kicker}</Kicker>
        <h2 className="text-2xl md:text-[1.75rem] font-bold leading-snug mt-3" style={{ color: c.ink }}>
          {journey.heading}
        </h2>
        <ol className="grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-8 mt-8">
          {journey.steps.map((step, i) => (
            <li key={i} className="relative">
              <div
                className="rounded-[10px] overflow-hidden flex items-center justify-center aspect-[16/9]"
                style={{ backgroundColor: step.phone || step.illustration ? c.surface : "#2a2a2a" }}
              >
                {step.illustration === "cards" ? (
                  <CardsIllustration label={step.alt} />
                ) : step.illustration === "maps-and-page" ? (
                  <MapsAndPageIllustration label={step.alt} />
                ) : step.illustration === "restaurant" ? (
                  <RestaurantIllustration label={step.alt} />
                ) : (
                  <img
                    src={step.image}
                    alt={step.alt}
                    className={step.phone ? "h-full w-auto py-1.5" : "w-full h-full object-contain"}
                  />
                )}
              </div>
              <div className="text-xs font-bold mt-2" style={{ color: c.muted }}>
                {String(i + 1).padStart(2, "0")}
                {step.note && <span className="ml-1.5" style={{ color: c.accent }}>{step.note}</span>}
              </div>
              <p className="text-[13px] leading-[1.5] mt-0.5" style={{ color: c.body }}>{step.text}</p>
              {i < journey.steps.length - 1 && (
                <ArrowRight
                  size={16}
                  className="hidden md:block absolute top-[calc(31%-8px)] -right-[18px]"
                  color={c.accent}
                />
              )}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs" style={{ color: c.muted }}>{journey.illustrationNote}</p>

        <div className="mt-16 rounded-[20px] overflow-hidden border" style={{ borderColor: c.border }}>
          <img src={journey.userFlow} alt="User flow" className="w-full h-auto block" />
        </div>
        <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>{journey.userFlowCaption}</figcaption>
      </div>

      {/* On the phone — light band (phone screenshots have white edges) */}
      <div style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
          <Kicker>{outcome.kicker}</Kicker>
          <h2 className="text-2xl md:text-[1.75rem] font-bold leading-snug mt-3" style={{ color: c.ink }}>
            {outcome.heading}
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-10">
            {outcome.phones.map((src, i) => (
              <img key={i} src={src} alt={`Phone screen ${i + 1}`} className="w-full h-auto block rounded-[14px]" />
            ))}
          </div>
          <figcaption className="mt-4 text-xs" style={{ color: c.muted }}>{outcome.caption}</figcaption>
        </div>
      </div>
      {/* Designing with hardware */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{hardware.kicker}</Kicker>
        <h2 className="text-2xl md:text-[1.75rem] font-bold leading-snug mt-3" style={{ color: c.ink }}>
          {hardware.heading}
        </h2>
        <p className="text-[15px] leading-[1.85] max-w-2xl mt-4" style={{ color: c.body }}>{hardware.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4 mt-8">
          {hardware.images.map((src, i) => (
            <img key={i} src={src} alt={`Hardware test ${i + 1}`} className="w-full h-auto rounded-[14px] block" />
          ))}
        </div>
        <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>{hardware.caption}</figcaption>
      </div>
      {/* Reflection */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <Kicker>{reflection.kicker}</Kicker>
        <h2 className="text-2xl md:text-[1.75rem] font-bold leading-snug mt-3" style={{ color: c.ink }}>
          {reflection.heading}
        </h2>
        <p className="text-[15px] leading-[1.85] max-w-2xl mt-4" style={{ color: c.body }}>{reflection.paragraph}</p>
      </div>
    </main>
  );
}
