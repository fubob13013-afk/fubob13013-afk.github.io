import { visualWorks } from "@/data";
import { useReveal } from "@/lib/useReveal";

export function VisualWorks() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="visual" className="scroll-mt-24 border-t border-border/60 py-20">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className="fade-up">
          <p className="text-xs tracking-[0.3em] text-primary">DESIGN &amp; 3D</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">审美与视觉作品</h2>
          <div className="section-rule mt-5" />
          <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground">
            审美是产品判断的底色——3D 建模、AI 视频创作、品牌视觉，是我对「表现力与体验」的持续训练。
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visualWorks.map((w) => (
            <figure key={w.title + w.img} className="fade-up glass-card overflow-hidden">
              <img src={w.img} alt={w.title} className="aspect-video w-full object-cover" />
              <figcaption className="p-4">
                <p className="text-sm font-semibold text-foreground">{w.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{w.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
