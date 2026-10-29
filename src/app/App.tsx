import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Mail, Menu, X, ExternalLink } from "lucide-react";
import { sharingTimeContent } from "../content/sharing-time";
import SharingTimeCaseStudy from "./SharingTimeCaseStudy";
import { communityOfCareContent } from "../content/community-of-care";
import CommunityOfCareCaseStudy from "./CommunityOfCareCaseStudy";
import { sdgEnergyContent } from "../content/sdg-energy";
import SdgEnergyCaseStudy from "./SdgEnergyCaseStudy";
import { rwdStorybookContent } from "../content/rwd-storybook";
import RwdStorybookCaseStudy from "./RwdStorybookCaseStudy";
import { syncAiContent } from "../content/sync-ai";
import SyncAiCaseStudy from "./SyncAiCaseStudy";
import SyncAiPrototype from "./sync-ai-prototype/SyncAiPrototype";
import SyncAiClientPage from "./sync-ai-prototype/SyncAiClientPage";
import { homeContent, type HomeCase } from "../content/home";
import { keelungContent } from "../content/keelung";
import KeelungCaseStudy from "./KeelungCaseStudy";
import { kiosksContent } from "../content/kiosks";
import KiosksCaseStudy from "./KiosksCaseStudy";
import { visualDesignContent } from "../content/visual-design";
import VisualDesignPage from "./VisualDesignPage";

// ── Types ─────────────────────────────────────────────────────────────────────

type PageId = "home" | string;

export interface Project {
  id: string;
  title: string;
  titleZh: string;
  category: string;
  year: string;
  role?: string;
  valueProposition?: string;
  coverImage: string;
  tags: string[];
  summary: string;
  comingSoon?: boolean;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: syncAiContent.meta.id,
    title: syncAiContent.hero.title,
    titleZh: syncAiContent.meta.titleZh,
    category: "AI 產品設計",
    year: syncAiContent.meta.year,
    role: syncAiContent.hero.role,
    valueProposition: syncAiContent.hero.description,
    coverImage: syncAiContent.hero.coverImage,
    tags: ["使用者研究", "0-1 功能發想", "AI 產品設計"],
    summary: syncAiContent.hero.description,
  },
  {
    id: sharingTimeContent.meta.id,
    title: sharingTimeContent.hero.title,
    titleZh: sharingTimeContent.meta.titleZh,
    category: "服務設計",
    year: sharingTimeContent.meta.year,
    role: sharingTimeContent.hero.role,
    valueProposition: sharingTimeContent.hero.description,
    coverImage: sharingTimeContent.hero.coverImage,
    tags: ["0-1從研究至功能產生", "使用者研究", "服務設計", "AI工具建立"],
    summary: sharingTimeContent.hero.description,
  },
  {
    id: communityOfCareContent.meta.id,
    title: communityOfCareContent.hero.title,
    titleZh: communityOfCareContent.meta.titleZh,
    category: "服務設計",
    year: communityOfCareContent.meta.year,
    role: communityOfCareContent.hero.role,
    valueProposition: communityOfCareContent.hero.description,
    coverImage: communityOfCareContent.hero.coverImage,
    tags: ["政策探索", "使用者研究", "服務設計", "概念驗證"],
    summary: communityOfCareContent.hero.description,
  },
  {
    id: sdgEnergyContent.meta.id,
    title: sdgEnergyContent.hero.title,
    titleZh: sdgEnergyContent.meta.titleZh,
    category: "互動設計",
    year: sdgEnergyContent.meta.year,
    role: sdgEnergyContent.hero.role,
    valueProposition: sdgEnergyContent.hero.description,
    coverImage: sdgEnergyContent.hero.coverImage,
    tags: ["易用性測試", "互動設計", "資料視覺化", "跨部門協作"],
    summary: sdgEnergyContent.hero.description,
  },
  {
    id: rwdStorybookContent.meta.id,
    title: rwdStorybookContent.hero.title,
    titleZh: rwdStorybookContent.meta.titleZh,
    category: "互動設計",
    year: rwdStorybookContent.meta.year,
    role: rwdStorybookContent.hero.role,
    valueProposition: rwdStorybookContent.hero.description,
    coverImage: rwdStorybookContent.hero.coverImage,
    tags: ["0-1數位體驗規劃", "資訊架構彙整", "視覺&互動效果設計"],
    summary: rwdStorybookContent.hero.description,
  },
  {
    id: keelungContent.meta.id,
    title: keelungContent.hero.title,
    titleZh: keelungContent.meta.titleZh,
    category: "Interaction design",
    year: keelungContent.meta.year,
    role: keelungContent.hero.role,
    coverImage: keelungContent.hero.coverImage,
    tags: keelungContent.hero.tags,
    summary: keelungContent.hero.description,
  },
  {
    id: kiosksContent.meta.id,
    title: kiosksContent.hero.title,
    titleZh: kiosksContent.meta.titleZh,
    category: "Interaction design",
    year: kiosksContent.meta.year,
    role: kiosksContent.hero.role,
    coverImage: kiosksContent.hero.coverImage,
    tags: kiosksContent.hero.tags,
    summary: kiosksContent.hero.description,
  },
];

// ── Motion helpers ────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const;

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav({
  page,
  onNavigate,
}: {
  page: PageId;
  onNavigate: (p: PageId, scrollTo?: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [page]);

  const handleNavLink = (sectionId: string) => {
    const wasMenuOpen = menuOpen;
    setMenuOpen(false);

    const doNavigate = () => {
      if (page === "home") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        onNavigate("home", sectionId);
      }
    };

    // Wait for the mobile menu's collapse animation (duration: 0.2) to finish first —
    // otherwise the collapsing height keeps reflowing the page mid-scroll and cancels it.
    if (wasMenuOpen) {
      setTimeout(doNavigate, 220);
    } else {
      doNavigate();
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="font-semibold text-sm tracking-wide text-foreground hover:opacity-60 transition-opacity"
          style={{ fontFamily: "var(--font-epilogue)" }}
        >
          Sara Liang
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Work", id: "work" },
            { label: "Visual design", id: "visual-design" },
            { label: "About", id: "about" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => (id === "visual-design" ? onNavigate(id) : handleNavLink(id))}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </button>
          ))}
          <a
            href="/resume/Sara_Liang_UX_Designer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 pb-4 pt-2 flex flex-col gap-1">
              {[
                { label: "Work", id: "work" },
                { label: "Visual design", id: "visual-design" },
                { label: "About", id: "about" },
                { label: "Contact", id: "contact" },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => (id === "visual-design" ? onNavigate(id) : handleNavLink(id))}
                  className="text-left py-3 text-foreground border-b border-border last:border-0 text-sm"
                >
                  {label}
                </button>
              ))}
              <a
                href="/resume/Sara_Liang_UX_Designer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left py-3 text-foreground text-sm"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────

function HeroSection() {
  const { hero } = homeContent;
  return (
    <section className="pt-36 md:pt-48 pb-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="max-w-3xl"
        >
          <span
            className="text-xs uppercase tracking-[0.1em] font-semibold block mb-5"
            style={{ color: "#0f3d2b" }}
          >
            {hero.kicker}
          </span>
          <h1
            className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-inter)", color: "#15181a" }}
          >
            {hero.titleBefore}
            <span style={{ background: "linear-gradient(transparent 62%, #cdec8e 62%)" }}>
              {hero.titleHighlight}
            </span>
            {hero.titleAfter}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "#40474a" }}>
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-8">
            <button
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ backgroundColor: "#cdec8e", color: "#0f3d2b" }}
            >
              See the work
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold border-[1.5px] hover:opacity-70 transition-opacity"
              style={{ borderColor: "#d8dbd5", color: "#15181a" }}
            >
              Get in touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Selected Work ─────────────────────────────────────────────────────────────

// One repeated row per case: label + title on the left, 1-2 sentences on the
// right, a wide image below. Rows with a caseId link to that case study page.
function CaseRow({
  item,
  onNavigate,
  first,
}: {
  item: HomeCase;
  onNavigate: (p: PageId) => void;
  first: boolean;
}) {
  const open = item.caseId ? () => onNavigate(item.caseId!) : undefined;
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease }}
      className={`py-12 md:py-14 ${first ? "" : "border-t"}`}
      style={{ borderColor: "#d8dbd5" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-3 md:gap-10 items-start">
        <div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "#8a908d" }}>
            {item.label}
            {item.status && (
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: "#fff4d6", color: "#7a5a00" }}
              >
                {item.status}
              </span>
            )}
          </div>
          <h3
            className="text-[1.375rem] md:text-[1.625rem] font-bold leading-tight mt-1.5"
            style={{ fontFamily: "var(--font-inter)", color: "#15181a" }}
          >
            {item.title}
          </h3>
        </div>
        <div>
          <p className="text-base md:text-[1.0625rem] leading-relaxed" style={{ color: "#40474a" }}>
            {item.text}
          </p>
          {open ? (
            <button
              onClick={open}
              className="group inline-flex items-center gap-1.5 mt-3 text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "#0f3d2b" }}
            >
              Read case study
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            item.status && (
              <span className="inline-block mt-3 text-sm" style={{ color: "#8a908d" }}>
                Case study coming soon
              </span>
            )
          )}
        </div>
      </div>
      <div
        onClick={open}
        className={`mt-7 rounded-[20px] overflow-hidden ${open ? "cursor-pointer group" : ""}`}
        style={{ backgroundColor: "#f4f5f2" }}
      >
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
          className={`w-full aspect-[16/9] block ${
            item.contain ? "object-contain p-6" : "object-cover"
          } ${open ? "transition-transform duration-700 group-hover:scale-[1.02]" : ""}`}
        />
      </div>
    </motion.article>
  );
}

function WorkSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section id="work" className="pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <span
          className="text-xs uppercase tracking-[0.1em] font-semibold block mb-2"
          style={{ color: "#0f3d2b" }}
        >
          Selected Work
        </span>
        {homeContent.cases.map((item, i) => (
          <CaseRow key={item.title} item={item} onNavigate={onNavigate} first={i === 0} />
        ))}
        <VisualTeaser onNavigate={onNavigate} />
      </div>
    </section>
  );
}

// Teaser for the Visual design page: a row of thumbnails, the whole block is the link.
function VisualTeaser({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <button
      onClick={() => onNavigate("visual-design")}
      className="group block w-full text-left pt-12 md:pt-14 border-t"
      style={{ borderColor: "#d8dbd5" }}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <span
            className="text-xs uppercase tracking-[0.1em] font-semibold block mb-2"
            style={{ color: "#0f3d2b" }}
          >
            {visualDesignContent.kicker}
          </span>
          <h3
            className="text-[1.375rem] md:text-[1.625rem] font-bold leading-tight"
            style={{ fontFamily: "var(--font-inter)", color: "#15181a" }}
          >
            {visualDesignContent.title}
          </h3>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-sm font-semibold shrink-0 group-hover:opacity-70 transition-opacity"
          style={{ color: "#0f3d2b" }}
        >
          See visual design
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 md:gap-4">
        {visualDesignContent.homePreview.map((img) => (
          <div key={img.src} className="rounded-[14px] overflow-hidden" style={{ backgroundColor: "#f4f5f2" }}>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover block transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
    </button>
  );
}

// ── Testimonial ───────────────────────────────────────────────────────────────

function TestimonialSection() {
  const { testimonial } = homeContent;
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#eef4e8" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <span
          className="text-xs uppercase tracking-[0.1em] font-semibold block mb-4"
          style={{ color: "#0f3d2b" }}
        >
          What partners say
        </span>
        <figure className="max-w-3xl">
          {/* Someone's own words: Cormorant italic in accent, same as quotes on the case pages. */}
          <blockquote
            className="text-lg md:text-xl leading-relaxed text-pretty"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#0f3d2b" }}
          >
            "{testimonial.quote}"
          </blockquote>
          {/* One quiet style for the whole credit line, so only the quote stands out. */}
          <figcaption className="mt-4 text-sm leading-relaxed" style={{ color: "#8a908d" }}>
            <span className="block" style={{ color: "#40474a" }}>{testimonial.name}</span>
            <span className="block">{testimonial.role}</span>
            <span className="block">{testimonial.context}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ── About + Contact ───────────────────────────────────────────────────────────
// One closing block: who I am, then how to reach me. Keeps both nav anchors.

function AboutContactSection() {
  const { about } = homeContent;
  return (
    <section id="about" style={{ backgroundColor: "#0f3d2b" }} className="py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="max-w-6xl mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 md:gap-12">
          <div>
            <span
              className="text-xs uppercase tracking-[0.1em] font-semibold block mb-3"
              style={{ color: "#cdec8e" }}
            >
              About
            </span>
            <h2
              className="text-2xl md:text-[1.75rem] font-bold leading-snug"
              style={{ fontFamily: "var(--font-inter)", color: "#eef4e9" }}
            >
              {about.heading}
            </h2>
          </div>
          <p className="text-base md:text-[1.0625rem] leading-relaxed md:pt-7" style={{ color: "#c7d5c0" }}>
            {about.body}
          </p>
        </div>

        <div
          id="contact"
          className="mt-14 md:mt-16 pt-14 md:pt-16 border-t scroll-mt-20 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 md:gap-12"
          style={{ borderColor: "#3a6a53" }}
        >
          <h2
            className="text-2xl md:text-[1.75rem] font-bold leading-snug"
            style={{ fontFamily: "var(--font-inter)", color: "#eef4e9" }}
          >
            Let's work together.
          </h2>
          <div>
            <p className="leading-relaxed mb-6 text-base md:text-[1.0625rem]" style={{ color: "#c7d5c0" }}>
              Open to UX and product design roles and projects. I'd love to hear what you're working on.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:saraliang66@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ backgroundColor: "#cdec8e", color: "#0f3d2b" }}
              >
                <Mail size={13} />
                saraliang66@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/sara-liang-yunjung-liang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border px-6 py-3 rounded-full text-sm font-semibold hover:opacity-80 transition-colors"
                style={{ borderColor: "#3a6a53", color: "#eef4e9" }}
              >
                <ExternalLink size={13} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer({ onNavigate }: { onNavigate?: (p: PageId) => void }) {
  return (
    <footer className="border-t py-8" style={{ borderColor: "#d8dbd5" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        {onNavigate ? (
          <button
            onClick={() => onNavigate("home")}
            className="text-sm font-semibold hover:opacity-60 transition-opacity"
            style={{ fontFamily: "var(--font-inter)", color: "#15181a" }}
          >
            Sara Liang
          </button>
        ) : (
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: "var(--font-inter)", color: "#15181a" }}
          >
            Sara Liang
          </span>
        )}
        <p className="text-xs" style={{ color: "#8a908d" }}>
          UX Designer
        </p>
        <p className="text-xs" style={{ color: "#8a908d" }}>© 2026</p>
      </div>
    </footer>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────

function HomePage({
  onNavigate,
}: {
  onNavigate: (p: PageId, scrollTo?: string) => void;
}) {
  return (
    <main>
      <HeroSection />
      <WorkSection onNavigate={onNavigate} />
      <TestimonialSection />
      <AboutContactSection />
      <Footer onNavigate={onNavigate} />
    </main>
  );
}

// ── Project Page ──────────────────────────────────────────────────────────────

function ProjectPage({
  projectId,
  onNavigate,
}: {
  projectId: string;
  onNavigate: (p: PageId, scrollTo?: string) => void;
}) {
  const project = PROJECTS.find((p) => p.id === projectId);
  // Next project follows the homepage order, among cases that have a page.
  const linked = homeContent.cases
    .map((c) => PROJECTS.find((p) => p.id === c.caseId))
    .filter((p): p is Project => !!p);
  const at = linked.findIndex((p) => p.id === projectId);
  const nextProject = at >= 0 ? linked[(at + 1) % linked.length] : linked[0];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => onNavigate("home")}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to home
        </button>
      </div>
    );
  }

  if (
    project.id === sharingTimeContent.meta.id ||
    project.id === communityOfCareContent.meta.id ||
    project.id === sdgEnergyContent.meta.id ||
    project.id === rwdStorybookContent.meta.id ||
    project.id === syncAiContent.meta.id ||
    project.id === keelungContent.meta.id ||
    project.id === kiosksContent.meta.id
  ) {
    const CaseStudy =
      project.id === sharingTimeContent.meta.id ? (
        <SharingTimeCaseStudy project={project} content={sharingTimeContent} onNavigate={onNavigate} />
      ) : project.id === communityOfCareContent.meta.id ? (
        <CommunityOfCareCaseStudy project={project} content={communityOfCareContent} onNavigate={onNavigate} />
      ) : project.id === sdgEnergyContent.meta.id ? (
        <SdgEnergyCaseStudy project={project} content={sdgEnergyContent} onNavigate={onNavigate} />
      ) : project.id === rwdStorybookContent.meta.id ? (
        <RwdStorybookCaseStudy project={project} content={rwdStorybookContent} onNavigate={onNavigate} />
      ) : project.id === keelungContent.meta.id ? (
        <KeelungCaseStudy project={project} content={keelungContent} onNavigate={onNavigate} />
      ) : project.id === kiosksContent.meta.id ? (
        <KiosksCaseStudy project={project} content={kiosksContent} onNavigate={onNavigate} />
      ) : (
        <SyncAiCaseStudy project={project} content={syncAiContent} onNavigate={onNavigate} />
      );

    return (
      <>
        {CaseStudy}

        {/* Next project */}
        {nextProject && (
          <div className="border-t border-border mt-4 py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5">
                Next Project
              </p>
              <button
                onClick={() => onNavigate(nextProject.id)}
                className="group flex items-center gap-4 hover:opacity-60 transition-opacity"
              >
                <span
                  className="text-2xl md:text-4xl font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-epilogue)" }}
                >
                  {nextProject.title}
                </span>
                <ArrowRight
                  size={22}
                  className="text-muted-foreground group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        )}

        <Footer onNavigate={onNavigate} />
      </>
    );
  }

  // Fallback for projects without a dedicated case-study page yet
  return (
    <main>
      <section className="pt-28 md:pt-40 pb-24 min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <button
            onClick={() => onNavigate("home", "work")}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            All projects
          </button>
          <h1
            className="text-4xl md:text-6xl font-semibold text-foreground leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-epilogue)" }}
          >
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground">內容準備中，敬請期待。</p>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </main>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  // 尚未公開的頁面：只能透過網址 hash 進入（例如 #sync-ai-prototype），
  // 不會出現在任何可點擊的連結上，做完之前不想讓一般訪客看到。
  // sync-ai-prototype／sync-ai-review 是兩個各自獨立的隱藏頁面（設計師端／
  // 客戶端），不是同一頁裡切換視角——現實中這兩邊本來就是不同系統。
  // 每個案例頁都有自己的網址（#sdg-energy 這類 hash），首頁的 Read case study
  // 才能直接連過去，也能被分享、被瀏覽器上一頁帶回來。沒對應到頁面的 hash 一律回首頁。
  const pageFromHash = (): PageId => {
    const hash = window.location.hash.replace("#", "");
    const known =
      hash === "sync-ai-prototype" ||
      hash === "sync-ai-review" ||
      hash === visualDesignContent.meta.id ||
      PROJECTS.some((p) => p.id === hash);
    return known ? hash : "home";
  };
  const [page, setPage] = useState<PageId>(pageFromHash);
  const pendingScrollRef = useRef<string | null>(null);

  const navigate = (newPage: PageId, scrollTo?: string) => {
    if (scrollTo) pendingScrollRef.current = scrollTo;
    const url = newPage === "home" ? window.location.pathname : `#${newPage}`;
    if (newPage !== page) window.history.pushState(null, "", url);
    setPage(newPage);
  };

  useEffect(() => {
    const onPop = () => setPage(pageFromHash());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (page === "home" && pendingScrollRef.current) {
      const target = pendingScrollRef.current;
      pendingScrollRef.current = null;
      const timer = setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 420);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [page]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav page={page} onNavigate={navigate} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {page === "home" ? (
            <HomePage onNavigate={navigate} />
          ) : page === "sync-ai-prototype" ? (
            <SyncAiPrototype onNavigate={navigate} />
          ) : page === "sync-ai-review" ? (
            <SyncAiClientPage onNavigate={navigate} />
          ) : page === visualDesignContent.meta.id ? (
            <>
              <VisualDesignPage content={visualDesignContent} onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          ) : (
            <ProjectPage projectId={page} onNavigate={navigate} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
