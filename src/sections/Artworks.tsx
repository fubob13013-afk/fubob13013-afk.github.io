import { artworks, otherVisualWorks } from "@/art";
import { useReveal } from "@/lib/useReveal";

export function Artworks() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="art" className="scroll-mt-24 border-t border-border/60 py-20">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className="fade-up">
          <p className="text-xs tracking-[0.3em] text-primary">3D ARTWORKS</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">3D 艺术作品</h2>
          <div className="section-rule mt-5" />
          <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground">
            审美是产品判断的底色--历时一个月的场景搭建、产品级 CG 宣传片，
            从建模、材质、灯光到渲染调色的完整管线训练。
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {artworks.map((w) => (
            <a
              key={w.slug}
              href={`#/art/${w.slug}`}
              className="fade-up glass-card group relative block overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={w.cover}
                  alt={w.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-end justify-between p-5">
                <div>
                  <h3 className="font-display text-2xl tracking-wide text-foreground">{w.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{w.titleCn} · {w.tags}</p>
                </div>
                <span className="ml-4 shrink-0 rounded-full border border-primary/40 px-3 py-1 text-xs text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  查看详情 →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* 更多视觉：靠后的小板块，AI 大赛预留占位 */}
        <div className="fade-up mt-16">
          <h3 className="text-sm font-semibold tracking-widest text-primary">更多视觉</h3>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            {otherVisualWorks.map((w) =>
              w.placeholder ? (
                <div
                  key={w.title}
                  className="glass-card flex aspect-video flex-col items-center justify-center border-dashed"
                >
                  <p className="text-sm font-semibold text-muted-foreground">{w.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground/60">{w.desc}</p>
                </div>
              ) : (
                <figure key={w.title} className="glass-card overflow-hidden">
                  <img src={w.img} alt={w.title} loading="lazy" className="aspect-video w-full object-cover" />
                  <figcaption className="p-3">
                    <p className="text-xs font-semibold text-foreground">{w.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{w.desc}</p>
                  </figcaption>
                </figure>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
