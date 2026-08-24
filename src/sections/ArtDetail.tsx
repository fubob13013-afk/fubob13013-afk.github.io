import { useEffect, useState } from "react";
import { artworks } from "@/art";

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const m = hash.match(/^#\/art\/([a-z]+)/);
  return m ? m[1] : null;
}

export function ArtDetail() {
  const slug = useHashRoute();
  const work = artworks.find((w) => w.slug === slug);

  useEffect(() => {
    if (work) window.scrollTo(0, 0);
  }, [work]);

  if (!work) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <a
          href="#art"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          ← 返回作品集
        </a>
      </div>

      {/* Hero */}
      <div className="relative mt-6 overflow-hidden">
        <img src={work.hero} alt={work.title} className="max-h-[80vh] w-full object-contain" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--color-background) 0%, transparent 35%)" }}
        />
        <div className="absolute bottom-8 left-6 md:left-10">
          <h1 className="font-serif text-5xl font-light italic tracking-wider text-white md:text-7xl">
            {work.title}
          </h1>
          <p className="mt-2 text-sm text-white/60">{work.subtitle}</p>
          <p className="mt-1 text-lg text-white/50">{work.titleCn}</p>
        </div>
      </div>

      {/* Intro + Params */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h3 className="font-serif text-3xl font-light italic text-primary">Story</h3>
          {work.story.map((p, i) => (
            <p key={i} className="mt-5 text-sm leading-8 text-foreground/80">
              {p}
            </p>
          ))}
          {work.quote && (
            <blockquote className="mt-6 border-l border-primary/40 pl-5 text-sm italic leading-7 text-muted-foreground">
              {work.quote}
            </blockquote>
          )}
        </div>
        <div>
          <h3 className="font-serif text-3xl font-light italic text-primary">Parameters</h3>
          <dl className="mt-5 glass-card p-6">
            {work.params.map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border/50 py-3 last:border-0">
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="text-sm font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {work.gallery.map((g) => (
            <figure key={g.src} className={`glass-card overflow-hidden ${g.wide ? "md:col-span-2" : ""}`}>
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className={`w-full transition-transform duration-500 hover:scale-[1.02] ${
                  g.wide ? "object-cover" : "object-contain"
                }`}
              />
            </figure>
          ))}
        </div>
        <p className="mt-10 text-center font-serif text-sm italic text-muted-foreground/50">
          {work.oneliner}
        </p>
      </div>
    </div>
  );
}
