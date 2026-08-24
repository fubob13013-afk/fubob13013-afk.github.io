import type { ReactNode } from "react";
import { projects } from "@/data";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

function ProjectBlock({
  index,
  title,
  badge,
  oneliner,
  intro,
  decisions,
  result,
  media,
  flip,
  id,
}: {
  index: string;
  title: string;
  badge: string;
  oneliner: string;
  intro: string;
  decisions: { title: string; desc: string }[];
  result: string;
  media: ReactNode;
  flip: boolean;
  id: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id={id} ref={ref} className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="fade-up mb-10">
        <p className="text-xs tracking-[0.3em] text-primary">{index}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          <span className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary">{badge}</span>
        </div>
        <div className="section-rule mt-4" />
      </div>

      <div className={cn("flex flex-col gap-10 lg:flex-row lg:items-start")}>
        <div className="fade-up lg:w-[46%] lg:shrink-0">
          <p className="text-lg font-medium leading-relaxed text-foreground/90">{oneliner}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{intro}</p>

          <h3 className="mt-8 text-sm font-semibold tracking-widest text-primary">关键产品决策</h3>
          <ul className="mt-4 space-y-4">
            {decisions.map((d) => (
              <li key={d.title} className="glass-card p-4">
                <p className="font-semibold text-foreground">{d.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-l-4 border-primary bg-muted/60 p-4 text-sm leading-relaxed text-foreground/90">
            <span className="font-semibold text-primary">验证结果：</span>
            {result}
          </div>
        </div>

        <div className={cn("fade-up min-w-0 flex-1", flip && "lg:order-first")}>{media}</div>
      </div>
    </section>
  );
}

function Figure({ src, alt, caption, className }: { src: string; alt: string; caption?: string; className?: string }) {
  return (
    <figure className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-xl border border-border object-cover"
      />
      {caption && <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

function VoiceMedia() {
  return (
    <div className="space-y-6">
      <div className="glass-card overflow-hidden p-4">
        <video
          src="/video/orb/listening.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="mx-auto max-h-72 rounded-lg"
        />
        <p className="mt-3 text-center text-xs text-muted-foreground">
          语音球动画 · 倾听状态（idle / listening / speaking / thinking 四态）
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Figure src="/img/phone-idle.png" alt="语音助手待机界面" caption="待机 · 语音球界面" />
        <Figure src="/img/phone-orb.png" alt="语音助手会话界面" caption="会话中 · 小米 14 真机" />
      </div>
      <Figure
        src="/img/workbench.png"
        alt="电脑工作台全链路时间线"
        caption="电脑工作台：全链路时间线（用户 / 豆包 / 工具 / Claude / 系统），永久保存"
      />
    </div>
  );
}

function HealthMedia() {
  return (
    <div className="space-y-6">
      {/* 数据流：拍照 → AI 提取 → 结构化归档 → 关联分析 */}
      <div className="glass-card p-5">
        <p className="text-sm font-semibold text-primary">系统数据流</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          {["拍化验单", "AI 自动提取", "结构化归档", "跨病症关联分析"].map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-foreground">
                {step}
              </span>
              {i < 3 && <span className="text-primary">→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* 档案结构：4 病症档案 + 3 追踪表 + 字段标准 */}
      <div className="glass-card p-5">
        <p className="text-sm font-semibold text-primary">档案结构（统一字段标准）</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          {[
            "病症档案 ×4（气胸 / 皮肤 / 鼻炎 / 肛肠消化）",
            "症状汇总表（日期·病症·严重度·诱因）",
            "体检指标表（结果·参考范围·趋势）",
            "用药打卡表（用量·时段·效果与副作用）",
          ].map((t) => (
            <p key={t} className="rounded-md border border-border/60 bg-muted/40 px-3 py-2">
              {t}
            </p>
          ))}
        </div>
      </div>

      {/* 跨病症关联分析：产品思维核心证据 */}
      <div className="glass-card p-5">
        <p className="text-sm font-semibold text-primary">跨病症关联分析（假设 · 证据 · 验证）</p>
        <div className="mt-3 space-y-2 text-xs">
          <div className="flex items-start justify-between gap-3 rounded-md bg-muted/40 px-3 py-2">
            <span className="text-foreground">气胸 ↔ 换季</span>
            <span className="text-muted-foreground">高中三年换季复发规律 · 待验证</span>
          </div>
          <div className="flex items-start justify-between gap-3 rounded-md bg-muted/40 px-3 py-2">
            <span className="text-foreground">空调 ↔ 鼻炎</span>
            <span className="text-muted-foreground">多城市对照后推翻原假设：空调是协同扳机，根因尘螨 ✅</span>
          </div>
          <div className="flex items-start justify-between gap-3 rounded-md bg-muted/40 px-3 py-2">
            <span className="text-foreground">鼻炎 ↔ 皮肤</span>
            <span className="text-muted-foreground">过敏体质（Th2 偏向）可能双重影响 · 观察中</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CyberEyesMedia() {
  return (
    <div className="space-y-6">
      <Figure src="/img/cybereyes-cover.png" alt="CyberEyes 封面" caption="一只长在背上、替你感知身后动静的「第三只眼」" />
      <div className="glass-card overflow-hidden p-4">
        <video src="/video/cybereyes-demo.mp4" controls playsInline className="w-full rounded-lg" />
        <p className="mt-3 text-center text-xs text-muted-foreground">
          结课演示视频 · 真机眼球追踪与眨眼 ·{" "}
          <a
            href="https://www.bilibili.com/video/BV1gtJH6AEtM/"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            B 站高清版 ↗
          </a>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Figure src="/img/eye-render-01.png" alt="眼球渲染 01" caption="眼球渲染 01" />
        <Figure src="/img/eye-render-02.png" alt="眼球渲染 02" caption="眼球渲染 02" />
      </div>
    </div>
  );
}

const medias = [<VoiceMedia key="v" />, <HealthMedia key="h" />, <CyberEyesMedia key="c" />];

export function Projects() {
  return (
    <div>
      {projects.map((p, i) => (
        <ProjectBlock key={p.id} {...p} media={medias[i]} flip={i % 2 === 1} />
      ))}
    </div>
  );
}
