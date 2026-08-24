import { useEffect, useState } from "react";
import { artworks } from "@/art";

/** 作品详情页：版式复刻原作品集站点（纯黑背景 · 原图比例 · Italiana 展示字体） */
export function ArtDetail({ slug }: { slug: string }) {
  const work = artworks.find((w) => w.slug === slug);
  const [zoom, setZoom] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    document.body.style.overflow = zoom ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoom]);

  if (!work) return null;

  const backLink = (
    <a
      href="#art"
      className="inline-flex items-center gap-2 py-3 text-sm text-white/50 transition-colors hover:text-white"
    >
      ← 返回作品集
    </a>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部返回 */}
      <div className="mx-auto max-w-[1760px] px-6 pt-8 md:px-20">
        {backLink}
      </div>

      {/* Hero：原图比例，不裁切 */}
      <div className="relative mt-6 w-full">
        <img
          src={work.hero}
          alt={work.title}
          onClick={() => setZoom(work.hero)}
          className="mx-auto max-h-[80vh] w-auto max-w-full cursor-zoom-in object-contain"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, #000 0%, transparent 40%)" }}
        />
        <div className="absolute bottom-10 left-6 md:left-20">
          <h1 className="font-display text-5xl font-normal leading-none tracking-wide md:text-7xl">
            {work.title}
          </h1>
          <p className="mt-2 text-xs font-light text-white/60">{work.subtitle}</p>
          <p className="mt-1 text-xl font-thin text-white/50">{work.titleCn}</p>
        </div>
      </div>

      {/* 正文区 */}
      <div className="mx-auto max-w-[1760px] px-6 py-20 md:px-20">
        <div className="grid items-start gap-16 md:grid-cols-2">
          <div>
            <h3 className="font-display text-4xl font-normal md:text-5xl">Story</h3>
            {work.story.map((p, i) => (
              <p key={i} className="mt-5 text-base font-light leading-10 text-white/80">
                {p}
              </p>
            ))}
            {work.quote && (
              <blockquote className="mt-6 border-l border-white/20 py-2 pl-10 text-sm italic leading-8 text-white/40">
                {work.quote}
              </blockquote>
            )}
          </div>
          <div>
            <h3 className="font-display text-4xl font-normal md:text-5xl">
              Production<br />parameters
            </h3>
            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-base">
              {work.params.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="font-display text-white/50">{k}：</dt>
                  <dd className="font-normal">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* 画廊：原图比例，仅对齐排布 */}
        <div className="mt-16 grid justify-items-center gap-5 md:grid-cols-2">
          {work.gallery.map((g) => (
            <button
              key={g.src}
              onClick={() => setZoom(g.src)}
              className={`overflow-hidden ${g.wide ? "md:col-span-2" : ""}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-auto w-full transition-transform duration-500 hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>

        <p className="mt-16 text-center font-display text-sm font-light text-white/30">
          {work.oneliner}
        </p>

        {/* 底部返回 */}
        <div className="mt-16 border-t border-white/10 pt-8">{backLink}</div>
      </div>

      {/* 点击放大 */}
      {zoom && (
        <div
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/95"
          onClick={() => setZoom(null)}
        >
          <img src={zoom} alt="" className="max-h-[92vh] max-w-[96vw] object-contain" />
          <p className="absolute bottom-6 text-xs tracking-widest text-white/40">点击任意处关闭</p>
        </div>
      )}
    </div>
  );
}
