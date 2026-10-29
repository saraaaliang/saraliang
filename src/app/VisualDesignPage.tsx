import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { VisualDesignContent, VisualImage } from "../content/visual-design";

// ── Design tokens — shared with "Enterprise Service Design · Version C" ────
const c = {
  ink: "#15181a",
  body: "#40474a",
  accent: "#0f3d2b",
  muted: "#8a908d",
  surface: "#f4f5f2",
  border: "#d8dbd5",
};

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs uppercase tracking-[0.1em] font-semibold" style={{ color: c.accent }}>
      {children}
    </div>
  );
}

// One large image with arrows, plus a thumbnail strip so people can see how
// many images there are and jump straight to one.
function Carousel({ images }: { images: VisualImage[] }) {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + images.length) % images.length);
  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: c.surface }}>
        <img src={images[i].src} alt={images[i].alt} className="w-full aspect-[16/10] object-contain block" />
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(i - 1)}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 shadow"
              style={{ color: c.ink }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(i + 1)}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 shadow"
              style={{ color: c.ink }}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-2.5">
          {images.map((img, n) => (
            <button
              key={img.src}
              onClick={() => go(n)}
              aria-label={`Show image ${n + 1}`}
              className="flex-1 max-w-[96px] rounded-lg overflow-hidden border-2 transition-opacity"
              style={{ borderColor: n === i ? c.accent : "transparent", opacity: n === i ? 1 : 0.6, backgroundColor: c.surface }}
            >
              <img src={img.src} alt="" className="w-full aspect-[16/10] object-cover block" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function VisualDesignPage({
  content,
  onNavigate,
}: {
  content: VisualDesignContent;
  onNavigate: (p: string, scrollTo?: string) => void;
}) {
  return (
    <main style={{ fontFamily: "var(--font-inter)", color: c.body, background: "#ffffff" }}>
      <section className="pt-28 md:pt-40 pb-4">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <button
            onClick={() => onNavigate("home", "work")}
            className="group inline-flex items-center gap-2 text-sm font-semibold mb-12 hover:opacity-70 transition-opacity"
            style={{ color: c.ink }}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to work
          </button>
          <Kicker>{content.kicker}</Kicker>
          <h1
            className="text-[2rem] md:text-[2.625rem] font-bold leading-[1.2] tracking-tight mt-4 max-w-3xl"
            style={{ color: c.ink }}
          >
            {content.title}
          </h1>
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto px-6 md:px-10 pb-24">
        {content.groups.map((group) => (
          <section key={group.kicker} className="pt-16">
            <Kicker>{group.kicker}</Kicker>
            <h2 className="text-2xl font-bold mt-2" style={{ color: c.ink }}>{group.heading}</h2>
            {group.projects.map((p) => (
              <article
                key={p.title}
                className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 py-9 border-t mt-6 items-start"
                style={{ borderColor: c.border }}
              >
                <Carousel images={p.images} />
                <div>
                  <div className="text-[13px] mb-1.5" style={{ color: c.muted }}>{p.meta}</div>
                  <h3 className="text-[1.375rem] font-bold leading-snug mb-2.5" style={{ color: c.ink }}>{p.title}</h3>
                  <p className="text-[15px] leading-[1.75]" style={{ color: c.body }}>{p.text}</p>
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
