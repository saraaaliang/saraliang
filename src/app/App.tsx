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
            { label: "About", id: "about" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNavLink(id)}
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
                { label: "About", id: "about" },
                { label: "Contact", id: "contact" },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => handleNavLink(id)}
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

function HeroSection({
  onNavigate,
}: {
  onNavigate: (p: PageId, scrollTo?: string) => void;
}) {
  return (
    <section
      className="min-h-[100svh] flex items-center pt-16 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #dcefd2 0%, #ffffff 62%)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col gap-5 max-w-3xl"
        >
          <div
            className="inline-flex items-center gap-2.5 self-start text-sm font-semibold"
            style={{ color: "#40474a" }}
          >
            <span
              className="inline-flex h-2 w-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#0f3d2b", boxShadow: "0 0 0 4px #cdec8e" }}
            />
            Available for new projects
          </div>

          <div
            className="text-sm font-semibold tracking-wide"
            style={{ color: "#0f3d2b" }}
          >
            使用者體驗 / 服務設計師
          </div>

          <h1
            className="text-[clamp(1.625rem,3.4vw,2.5rem)] font-semibold text-foreground leading-[1.35] tracking-tight"
            style={{ fontFamily: "var(--font-epilogue)" }}
          >
            從 Wireframe 到可上線介面，我將複雜的使用者需求轉譯成一致的產品體驗；同時具備完整的研究方法論，確保每個設計決策都有證據支撐。
          </h1>

          <div
            className="flex flex-wrap items-center gap-3 text-sm font-medium"
            style={{ color: "#40474a" }}
          >
            <span>7年設計顧問公司經驗</span>
            <span style={{ color: "#d8dbd5" }}>｜</span>
            <span>3年使用者研究 &amp; 服務設計</span>
            <span style={{ color: "#d8dbd5" }}>｜</span>
            <span>英國政府大樓公開展出</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ backgroundColor: "#cdec8e", color: "#0f3d2b" }}
            >
              View Work
              <ArrowRight
                size={13}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold border-[1.5px] hover:opacity-70 transition-opacity"
              style={{ borderColor: "#0f3d2b", color: "#0f3d2b" }}
            >
              Get in Touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── About Section ─────────────────────────────────────────────────────────────

function AboutSection() {
  const stats = [
    { value: "7+", label: "設計顧問公司經驗" },
    { value: "20+", label: "商業客戶簽約合作或公開展出專案" },
  ];

  const skills = [
    "UX 研究",
    "服務設計",
    "UIUX設計",
    "可用性測試",
    "設計策略",
    "資訊架構",
    "原型設計",
    "設計系統",
  ];

  return (
    <section id="about" className="py-24 md:py-32 border-t" style={{ borderColor: "#d8dbd5" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <span
              className="text-xs uppercase tracking-[0.1em] font-semibold block mb-6"
              style={{ color: "#0f3d2b" }}
            >
              About
            </span>
            <div className="space-y-5 max-w-[42ch]">
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ fontFamily: "var(--font-inter)", color: "#40474a" }}
              >
我以可被驗證的設計決策為目標，整合多方關係人的立場，轉譯成一個能真正解決問題的體驗。同時利用AI工具，加快迭代過程，與團隊更專注於「做出一個好的產品」的決策上。
              </p>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ fontFamily: "var(--font-inter)", color: "#40474a" }}
              >
                職涯背景從廣告業的美術創意，到設計顧問公司的策展企劃與數位體驗設計。我於過程中逐漸發現，若只專注於單點體驗的優化，較無系統化了解使用者的困難是否有改善，會是非常可惜的一件事。這讓我在2022年前往英國進修，開始以服務設計及使用者為中心的思維看待產品或服務，為社會、企業，及不同族群創造一個更完整的設計體驗。
              </p>
            </div>
          </motion.div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: "#f4f5f2" }}
                >
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-inter)", color: "#15181a" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs leading-snug" style={{ color: "#8a908d" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#f4f5f2" }}
            >
              <div className="text-xs uppercase tracking-[0.08em] font-semibold mb-4" style={{ color: "#8a908d" }}>
                Expertise
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full border"
                    style={{ backgroundColor: "#ffffff", borderColor: "#d8dbd5", color: "#15181a" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.32, ease }}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#f4f5f2" }}
            >
              <div className="text-xs uppercase tracking-[0.08em] font-semibold mb-4" style={{ color: "#8a908d" }}>
                Tools
              </div>
              <div className="flex flex-wrap gap-2">
                {["Figma", "Miro", "Notion", "Photoshop", "Illustrator", "After Effect", "Claude Code", "Lovable", "Github"].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="text-xs px-3 py-1.5 rounded-full border"
                      style={{ backgroundColor: "#ffffff", borderColor: "#d8dbd5", color: "#15181a" }}
                    >
                      {tool}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onNavigate,
  index,
}: {
  project: Project;
  onNavigate: (p: PageId) => void;
  index: number;
}) {
  const isComingSoon = !!project.comingSoon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.09, ease }}
      onClick={() => !isComingSoon && onNavigate(project.id)}
      className={isComingSoon ? "cursor-default opacity-50" : "group cursor-pointer"}
    >
      {/* Cover image / placeholder */}
      <div
        className="relative overflow-hidden rounded-[20px] mb-5 aspect-[16/10]"
        style={{ backgroundColor: "#f4f5f2" }}
      >
        {project.coverImage ? (
          <>
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center border-2 border-dashed rounded-[20px]"
            style={{ borderColor: "#d8dbd5" }}
          >
            <span className="text-xs uppercase tracking-widest" style={{ color: "#8a908d" }}>
              即將公開
            </span>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Role only — category label dropped per redesign */}
          <div className="flex items-center gap-2 mb-2">
            {project.role && (
              <span className="text-xs" style={{ color: "#8a908d" }}>{project.role}</span>
            )}
            {!project.role && project.year && (
              <span className="text-xs" style={{ color: "#8a908d" }}>{project.year}</span>
            )}
          </div>

          <h3
            className="text-lg md:text-xl font-bold mb-1.5 group-hover:opacity-60 transition-opacity"
            style={{ fontFamily: "var(--font-inter)", color: "#15181a" }}
          >
            {project.title}
          </h3>

          {project.summary && (
            <p className="text-sm leading-relaxed line-clamp-2 max-w-sm" style={{ color: "#40474a" }}>
              {project.summary}
            </p>
          )}

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full border"
                  style={{ borderColor: "#d8dbd5", color: "#8a908d" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {!isComingSoon && (
          <div className="flex-shrink-0 mt-1">
            <div
              className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200"
              style={{ borderColor: "#d8dbd5", color: "#15181a" }}
            >
              <ArrowRight size={13} />
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ── Projects Section ──────────────────────────────────────────────────────────

function ProjectsSection({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <section id="work" className="py-24 md:py-32 border-t" style={{ borderColor: "#d8dbd5" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 md:mb-16"
        >
          <span
            className="text-xs uppercase tracking-[0.1em] font-semibold block mb-3"
            style={{ color: "#0f3d2b" }}
          >
            Selected Work
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "var(--font-inter)", color: "#15181a" }}
          >
            精選專案
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-10 md:gap-y-16">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onNavigate={onNavigate}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" style={{ backgroundColor: "#0f3d2b" }} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <span
              className="text-xs uppercase tracking-[0.1em] font-semibold block mb-6"
              style={{ color: "#cdec8e" }}
            >
              Contact
            </span>
            <h2
              className="text-3xl md:text-[2.75rem] font-bold leading-tight mb-8"
              style={{ fontFamily: "var(--font-inter)", color: "#eef4e9" }}
            >
              Let's Work Together!
            </h2>
            <p className="leading-relaxed mb-10 text-base md:text-lg" style={{ color: "#c7d5c0" }}>
              若有使用者體驗研究或是服務設計相關專案，都期待有聊聊的機會，一起共創一個更以人為中心的未來願景。
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
          </motion.div>
        </div>
      </div>
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
          UX設計師・研究員・服務設計師
        </p>
        <p className="text-xs" style={{ color: "#8a908d" }}>© 2024</p>
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
      <HeroSection onNavigate={onNavigate} />
      <AboutSection />
      <ProjectsSection onNavigate={onNavigate} />
      <ContactSection />
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
  const realProjects = PROJECTS.filter((p) => !p.comingSoon);
  const nextProject =
    realProjects[(realProjects.findIndex((p) => p.id === projectId) + 1) % realProjects.length];

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
    project.id === syncAiContent.meta.id
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
  const [page, setPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace("#", "");
    return hash === "sync-ai-prototype" || hash === "sync-ai-review" ? hash : "home";
  });
  const pendingScrollRef = useRef<string | null>(null);

  const navigate = (newPage: PageId, scrollTo?: string) => {
    if (scrollTo) pendingScrollRef.current = scrollTo;
    setPage(newPage);
  };

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
          ) : (
            <ProjectPage projectId={page} onNavigate={navigate} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
