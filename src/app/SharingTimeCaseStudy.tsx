import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Target } from "lucide-react";
import type { SharingDecision, SharingImage, SharingTimeContent } from "../content/sharing-time";
import type { Project } from "./App";

// ── Design tokens — "Enterprise Service Design · Version C" ──────────────
const c = {
  ink: "#15181a",
  body: "#40474a",
  accent: "#0f3d2b",
  accentLight: "#d6e6cc",
  accentOnDark: "#b9d3b0",
  accentMid: "#7d9f86",
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

const IMPACT_ICONS = [Check, Target];

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
      className="text-2xl md:text-[1.75rem] font-bold leading-snug mt-3 max-w-3xl"
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

// Each image's flex-grow is its width / height ratio, so the row shares one height without cropping.
function EqualHeightRow({ images, onDark }: { images: SharingImage[]; onDark?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-5">
      {images.map((img) => (
        <figure key={img.caption} className="min-w-0" style={{ flex: `${img.ratio} 1 0` }}>
          <img src={img.src} alt={img.caption} className="w-full h-auto block rounded-[12px]" />
          <figcaption className="mt-2 text-xs leading-[1.6]" style={{ color: onDark ? c.darkCaption : c.muted }}>
            {img.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

// Text inside straight double quotes is someone's own words, so it's set in italics.
function WithQuotes({ text }: { text: string }) {
  return (
    <>
      {text.split(/("[^"]+")/).map((part, i) =>
        part.startsWith('"') ? <em key={i}>{part}</em> : part
      )}
    </>
  );
}

// Short findings as light divided columns, not cards.
function DividedColumns({ items }: { items: string[] }) {
  const cols = items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 ${cols} gap-5 md:gap-0`}>
      {items.map((text, i) => (
        <p
          key={text}
          className={`text-sm leading-[1.75] pt-4 border-t md:pt-0 md:border-t-0 md:px-6 ${
            i === 0 ? "md:pl-0" : "md:border-l"
          } ${i === items.length - 1 ? "md:pr-0" : ""}`}
          style={{ color: c.body, borderColor: c.border }}
        >
          {text}
        </p>
      ))}
    </div>
  );
}

type PersonaCard = SharingTimeContent["research"]["persona"]["cards"][number];

function PersonaHeader({ card }: { card: PersonaCard }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <img src={card.photo} alt={card.name} className="w-[52px] h-[52px] rounded-full flex-shrink-0 object-cover" />
      <div>
        <div className="text-[15px] font-bold" style={{ color: c.ink }}>{card.name}</div>
        <span
          className="inline-block text-[10px] font-semibold px-[8px] py-[2px] rounded-full mt-1"
          style={
            card.tagStyle === "primary"
              ? { backgroundColor: c.accentLight, color: c.accent }
              : card.tagStyle === "dark"
              ? { backgroundColor: c.accent, color: "#fff" }
              : { backgroundColor: "#e2e4de", color: c.body }
          }
        >
          {card.tag}
        </span>
      </div>
    </div>
  );
}

function PersonaQuote({ card }: { card: PersonaCard }) {
  return (
    <p
      className="text-[15px] leading-[1.5] mb-5 text-pretty"
      style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: c.accent }}
    >
      "{card.quote}"
    </p>
  );
}

function PersonaField({ label, items, tight = false }: { label: string; items: string[]; tight?: boolean }) {
  return (
    <div className={tight ? "" : "mb-2.5 last:mb-0"}>
      <div className="text-[10px] font-bold uppercase tracking-[0.06em] mb-1" style={{ color: c.muted }}>
        {label}
      </div>
      <ul className="space-y-0.5 list-disc list-outside pl-4">
        {items.map((item, ii) => (
          <li key={ii} className="text-xs leading-[1.5] text-pretty" style={{ color: c.body }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const PERSONA_FIELDS = ["About", "Needs", "Challenges", "Opportunities"] as const;

function personaItems(card: PersonaCard, label: (typeof PERSONA_FIELDS)[number]) {
  return label === "About"
    ? card.about
    : label === "Needs"
    ? card.needs
    : label === "Challenges"
    ? card.challenges
    : card.opportunities;
}

function Decision({ decision, index }: { decision: SharingDecision; index: number }) {
  const { heading, body, evidence, quote, stages, changes, images } = decision;
  return (
    <div className="pt-10 border-t" style={{ borderColor: c.border }}>
      <div className="max-w-2xl">
        <div className="text-xs font-bold mb-2" style={{ color: c.accent }}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="text-base font-bold mb-2" style={{ color: c.ink }}>{heading}</h3>
        <p className="text-[15px] leading-[1.8]" style={{ color: c.body }}>{body}</p>
        {evidence && (
          <div className="mt-5 pl-4 border-l-2" style={{ borderColor: c.accentMid }}>
            <div className="text-[11px] uppercase tracking-[0.08em] mb-1" style={{ color: c.muted }}>
              What led to it
            </div>
            <p className="text-sm leading-[1.7]" style={{ color: c.body }}>
              <WithQuotes text={evidence} />
            </p>
          </div>
        )}
        {quote && (
          <p className="mt-5 pl-4 border-l-2 text-sm leading-[1.7]" style={{ color: c.body, borderColor: c.accentMid }}>
            <WithQuotes text={quote} />
          </p>
        )}
      </div>

      {stages && (
        <div className="mt-7">
          {/* Trust builds from left to right, so the bar deepens from light to dark green. */}
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-1">
            {stages.map((st, i) => {
              const fill = [c.accentLight, c.accentMid, c.accent][i];
              const ink = i === 2 ? c.darkInk : c.accent;
              return (
                <li key={st.title}>
                  <div
                    className={`flex items-baseline justify-between gap-3 px-4 py-3 ${
                      i === 0 ? "rounded-2xl md:rounded-r-none md:rounded-l-full" : i === stages.length - 1 ? "rounded-2xl md:rounded-l-none md:rounded-r-full" : "rounded-2xl md:rounded-none"
                    }`}
                    style={{ backgroundColor: fill, color: ink }}
                  >
                    <span className="text-sm font-bold">{st.title}</span>
                    <span className="text-[11px] font-semibold opacity-80 whitespace-nowrap">{st.months}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {changes && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">
          {changes.map((row) => (
            <div key={row.feature} className="rounded-2xl p-5 border" style={{ borderColor: c.border }}>
              <div className="text-[10px] uppercase tracking-[0.08em] font-semibold mb-1.5" style={{ color: c.accent }}>
                Service rule
              </div>
              <div className="text-base font-bold leading-[1.4]" style={{ color: c.ink }}>{row.feature}</div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-semibold mt-4 mb-1" style={{ color: c.muted }}>
                Why
              </div>
              <p className="text-sm leading-[1.6]" style={{ color: c.body }}>{row.why}</p>
              <p className="mt-3 pt-3 border-t text-xs leading-[1.6]" style={{ borderColor: c.border, color: c.muted }}>
                Prompted by {row.who}: <em>"{row.said}"</em>
              </p>
            </div>
          ))}
        </div>
      )}

      {images && (
        <div className={`mt-7 ${images.length === 1 ? "max-w-3xl" : ""}`}>
          <EqualHeightRow images={images} />
        </div>
      )}
    </div>
  );
}

export default function SharingTimeCaseStudy({
  content,
  onNavigate,
}: {
  project: Project;
  content: SharingTimeContent;
  onNavigate: (p: string, scrollTo?: string) => void;
}) {
  const { hero, platform, impact, problem, research, decisions, service, reflection } = content;
  const { persona } = research;
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5 border-y" style={{ borderColor: c.border }}>
              <Meta label="Role" value={hero.role} />
              <Meta label="Project" value={hero.project} />
              <Meta label="Timeline" value={hero.timeline} />
              <Meta label="What I did" value={hero.whatIDid} />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24 pt-6">
        <div className="w-full aspect-[3/2] rounded-[20px] overflow-hidden">
          <img src={hero.coverImage} alt={hero.coverAlt} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* The platform — dark band, the product first */}
      <div style={{ backgroundColor: c.darkBg }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker onDark>{platform.kicker}</Kicker>
          <SectionHeading onDark>{platform.heading}</SectionHeading>
          <p className="text-[15px] leading-[1.8] max-w-2xl mt-4" style={{ color: c.darkBody }}>
            {platform.paragraph}
          </p>
          <p className="text-sm leading-[1.7] max-w-2xl mt-4 pl-4 border-l-2" style={{ color: c.darkBody, borderColor: c.accentMid }}>
            {platform.testNote}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-10">
            {platform.decisions.map((d, i) => (
              <div key={d.title} className="flex gap-3">
                <span
                  className="w-6 h-6 rounded-full flex-none flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: c.accentLight, color: c.accent }}
                >
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-bold mb-1" style={{ color: c.darkInk }}>{d.title}</div>
                  <p className="text-[13px] leading-[1.65]" style={{ color: c.darkBody }}>{d.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12 mb-9">
            {platform.screens.map((screen) => (
              <figure key={screen.caption}>
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden" style={{ backgroundColor: c.darkMobileBg }}>
                  <video
                    src={screen.src}
                    aria-label={screen.caption}
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <figcaption className="mt-2 text-xs text-center" style={{ color: c.darkCaption }}>
                  {screen.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <a
            href={platform.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: c.accentLight, color: c.accent }}
          >
            {platform.cta}
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Impact */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{impact.kicker}</Kicker>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 mt-6 mb-14">
          {impact.stats.map((stat, i) => {
            const Icon = IMPACT_ICONS[i % IMPACT_ICONS.length];
            return (
              <div
                key={stat.title}
                className={`flex gap-4 ${i === 0 ? "md:pr-8" : "pt-6 border-t md:pt-0 md:border-t-0 md:border-l md:pl-8"}`}
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

        <div className="text-[11px] uppercase tracking-[0.08em] mb-4" style={{ color: c.muted }}>
          {impact.feedbackLabel}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {impact.quotes.map((q) => (
            <div key={q.author + q.quote} className="rounded-2xl p-6" style={{ border: `1px solid ${c.border}` }}>
              <p
                className="text-[17px] leading-[1.5] mb-3.5"
                style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: c.accent }}
              >
                {q.quote}
              </p>
              <div className="text-xs" style={{ color: c.muted }}>{q.author}</div>
            </div>
          ))}
        </div>
      </div>

      {/* The problem — colored band */}
      <div style={{ backgroundColor: c.problemBand }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker>{problem.kicker}</Kicker>
          <SectionHeading>{problem.heading}</SectionHeading>
          <div className="max-w-2xl mt-5 space-y-4">
            {problem.paragraphs.map((p) => (
              <p key={p} className="text-[15px] leading-[1.85]" style={{ color: c.body }}>{p}</p>
            ))}
          </div>
          <div className="max-w-2xl mt-6 pt-4 border-t" style={{ borderColor: c.border }}>
            <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
              {problem.usersLabel}
            </div>
            <p className="text-sm leading-[1.7]" style={{ color: c.ink }}>{problem.users}</p>
          </div>
        </div>
      </div>

      {/* What I found */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{research.kicker}</Kicker>
        <SectionHeading>{research.heading}</SectionHeading>

        {research.phases.map((phase) => (
          <div key={phase.label} className="mt-14">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.08em] mb-1.5" style={{ color: c.muted }}>
                {phase.label}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: c.ink }}>{phase.heading}</h3>
              <p className="text-[15px] leading-[1.8] mb-6" style={{ color: c.body }}>{phase.description}</p>
            </div>
            <DividedColumns items={phase.findings} />
            <div className="mt-8 space-y-6">
              {phase.rows.map((row) => (
                <EqualHeightRow key={row[0].caption} images={row} />
              ))}
            </div>
          </div>
        ))}

        {/* Personas — kept in full; research depth is part of the evidence */}
        <div className="mt-16">
          <h3 className="text-base font-bold mb-2" style={{ color: c.ink }}>{persona.label}</h3>
          <p className="text-[15px] leading-[1.8] max-w-2xl mb-7" style={{ color: c.body }}>
            {persona.description}
          </p>
          <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: c.problemBand }}>
            {/* Mobile / tablet — one persona per stacked block */}
            <div className="lg:hidden space-y-8">
              {persona.cards.map((card) => (
                <div key={card.name}>
                  <PersonaHeader card={card} />
                  <PersonaQuote card={card} />
                  {PERSONA_FIELDS.map((label) => (
                    <PersonaField key={label} label={label} items={personaItems(card, label)} />
                  ))}
                </div>
              ))}
            </div>

            {/* Desktop — row-major grid so About/Needs/Challenges/Opportunities align across all 4 personas.
                Columns interleave content tracks (1fr) with 1px divider tracks; dividers span all rows via gridRow 1 / -1. */}
            <div
              className="hidden lg:grid gap-x-5 gap-y-3"
              style={{
                gridTemplateColumns: persona.cards.map(() => "1fr").join(" 1px "),
                gridTemplateRows: "repeat(6, auto)",
              }}
            >
              {persona.cards.map((_, i) =>
                i > 0 ? (
                  <div
                    key={`div-${i}`}
                    style={{
                      gridColumnStart: i * 2,
                      gridColumnEnd: i * 2 + 1,
                      gridRowStart: 1,
                      gridRowEnd: -1,
                      backgroundColor: c.border,
                    }}
                  />
                ) : null
              )}
              {persona.cards.map((card, i) => (
                <div key={`head-${i}`} style={{ gridColumn: i * 2 + 1 }}>
                  <PersonaHeader card={card} />
                </div>
              ))}
              {persona.cards.map((card, i) => (
                <div key={`quote-${i}`} style={{ gridColumn: i * 2 + 1 }}>
                  <PersonaQuote card={card} />
                </div>
              ))}
              {PERSONA_FIELDS.map((label) =>
                persona.cards.map((card, i) => (
                  <div key={`${label}-${i}`} style={{ gridColumn: i * 2 + 1 }}>
                    <PersonaField label={label} items={personaItems(card, label)} tight />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* The question that framed the decisions */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        <div className="max-w-3xl pl-5 md:pl-6 border-l-4" style={{ borderColor: c.accentMid }}>
          <div className="text-[11px] uppercase tracking-[0.08em] mb-2" style={{ color: c.muted }}>
            {research.hmw.label}
          </div>
          {/* **…** marks the three things the question asks for; they get a highlighter underline. */}
          <p className="text-xl md:text-2xl font-medium leading-[1.5]" style={{ color: c.ink }}>
            {research.hmw.question.split(/\*\*(.+?)\*\*/).map((part, i) =>
              i % 2 ? (
                <strong
                  key={i}
                  className="font-bold"
                  style={{
                    color: c.accent,
                    backgroundImage: `linear-gradient(transparent 62%, ${c.accentLight} 62%)`,
                  }}
                >
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
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

      {/* The service — dark band */}
      <div style={{ backgroundColor: c.darkBg }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
          <Kicker onDark>{service.kicker}</Kicker>
          <SectionHeading onDark>{service.heading}</SectionHeading>
          <p className="text-[15px] leading-[1.8] max-w-2xl mt-4 mb-10" style={{ color: c.darkBody }}>
            {service.description}
          </p>

          {/* One session as a simple step flow, before the detailed blueprint */}
          <div className="text-sm font-bold mb-2" style={{ color: c.darkInk }}>{service.session.label}</div>
          <div className="flex flex-wrap gap-2 mb-5">
            {service.session.facts.map((f) => (
              <span
                key={f}
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: c.darkMobileBg, color: c.darkInk }}
              >
                {f}
              </span>
            ))}
          </div>
          <ol className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 max-w-4xl mb-16">
            {service.session.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center" style={{ backgroundColor: "#eeecd8" }}>
                  <img src={step.image} alt="" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <span
                    className="w-5 h-5 rounded-full flex-none flex items-center justify-center text-[11px] font-bold mt-[1px]"
                    style={{ backgroundColor: c.accentLight, color: c.accent }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-xs sm:text-[13px] font-bold leading-[1.35]" style={{ color: c.darkInk }}>{step.title}</div>
                    {step.time && <div className="text-[11px] mt-0.5" style={{ color: c.darkCaption }}>{step.time}</div>}
                  </div>
                </div>
                {i < service.session.steps.length - 1 && (
                  <ArrowRight
                    size={14}
                    color={c.accentOnDark}
                    className="hidden sm:block absolute top-[37%] -right-[10px] -translate-y-1/2"
                    aria-hidden
                  />
                )}
              </li>
            ))}
          </ol>
          {/* The two halves stay full width and stacked; side by side the blueprint text is too small to read. */}
          <div className="text-sm font-bold mb-3" style={{ color: c.darkInk }}>
            {service.blueprintCaption}
          </div>
          <div className="space-y-6 mb-14">
            {service.blueprint.map((img) => (
              <EqualHeightRow key={img.caption} images={[img]} onDark />
            ))}
          </div>
          <div className="max-w-3xl">
            <span
              className="inline-block mb-3 text-[11px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full"
              style={{ backgroundColor: c.accentLight, color: c.accent }}
            >
              {service.board.label}
            </span>
            <EqualHeightRow images={[service.board]} onDark />
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-24">
        <Kicker>{reflection.kicker}</Kicker>
        <SectionHeading>{reflection.heading}</SectionHeading>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mt-6">
          <div className="flex-1">
            <ol className="space-y-5">
              {reflection.takeaways.map((t) => (
                <li key={t.lead} className="pt-5 border-t first:pt-0 first:border-t-0" style={{ borderColor: c.border }}>
                  <div className="text-base font-bold mb-1" style={{ color: c.ink }}>{t.lead}</div>
                  <p className="text-sm leading-[1.7]" style={{ color: c.body }}>{t.text}</p>
                </li>
              ))}
            </ol>
            <blockquote className="mt-8 py-2 pl-5 border-l-2" style={{ borderColor: c.accentMid }}>
              <p
                className="text-xl leading-[1.45]"
                style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: c.accent }}
              >
                {reflection.quote.text}
              </p>
              <footer className="text-xs mt-2" style={{ color: c.muted }}>{reflection.quote.author}</footer>
            </blockquote>
          </div>
          <figure className="flex-none w-full md:w-[360px]">
            <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden">
              <img src={reflection.image} alt={reflection.imageCaption} className="w-full h-full object-cover" />
            </div>
            <figcaption className="mt-2.5 text-xs" style={{ color: c.muted }}>{reflection.imageCaption}</figcaption>
          </figure>
        </div>
      </div>
    </main>
  );
}
