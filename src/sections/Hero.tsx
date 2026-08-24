import { ShaderAnimation } from "@/components/ui/shader-lines";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { profile } from "@/data";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <ShaderAnimation />
      {/* 上下渐隐遮罩，让文字可读 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="mb-6 text-xs tracking-[0.4em] text-primary">AI 产品经理 · 求职作品集 / PORTFOLIO</p>
        <h1 className="text-6xl font-bold tracking-[0.2em] text-white md:text-7xl">{profile.name}</h1>
        <p className="mt-4 text-sm tracking-[0.35em] text-primary">{profile.nameEn}</p>
        <div className="my-8 h-[2px] w-24 bg-primary" />
        <p className="max-w-2xl text-2xl font-semibold leading-snug text-white md:text-3xl">
          {profile.tagline}
        </p>
        <p className="mt-5 text-sm tracking-[0.2em] text-muted-foreground">{profile.sub}</p>
        <div className="mt-12 flex items-center gap-6">
          <a href="#voice-assistant">
            <LiquidButton>查看项目</LiquidButton>
          </a>
          <a href="#about">
            <LiquidButton variant="outline">关于我</LiquidButton>
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs tracking-widest text-muted-foreground">
        ↓ SCROLL
      </div>
    </section>
  );
}
