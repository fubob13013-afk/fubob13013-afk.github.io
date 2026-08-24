import { useEffect, useState, type ReactNode } from "react";
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

/** 三态语音球：紧裁切圆形，视频轻微放大让圆边刚好卡在球体上 */
function OrbRow({ src, title, desc, big }: { src: string; title: string; desc: string; big?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`relative shrink-0 overflow-hidden rounded-full ${
          big ? "h-32 w-32 md:h-40 md:w-40" : "h-20 w-20 md:h-24 md:w-24"
        }`}
      >
        <video src={src} autoPlay loop muted playsInline className="h-full w-full scale-[1.06] object-cover" />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ boxShadow: "inset 0 0 10px 4px rgba(11,15,20,0.35)" }}
        />
      </div>
      <div className="min-w-0">
        <p className={`font-semibold ${big ? "text-base text-primary" : "text-sm text-foreground"}`}>{title}</p>
        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

/** 手机截图：原始比例完整展示，可点击放大 */
function PhoneShot({ src, caption, onZoom }: { src: string; caption: string; onZoom: (s: string) => void }) {
  return (
    <figure className="glass-card p-2">
      <img
        src={src}
        alt={caption}
        loading="lazy"
        onClick={() => onZoom(src)}
        className="mx-auto w-full cursor-zoom-in rounded-lg"
      />
      <figcaption className="py-2 text-center text-xs leading-5 text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** 语音助手项目：全宽上下布局（决策+三球左右 · 状态流全宽 · 工作台收尾） */
function VoiceProject({ project }: { project: (typeof projects)[number] }) {
  const ref = useReveal<HTMLDivElement>();
  const [zoom, setZoom] = useState<string | null>(null);
  useEffect(() => {
    document.body.style.overflow = zoom ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoom]);

  const steps: [string, string, string][] = [
    ["/img/voice/step1-hello.png", "① 唤醒对话", "「你好，你能做什么」——自然的开场问答"],
    ["/img/voice/step2-sendmsg.png", "② 发消息", "「帮我给爸爸发一条消息」——直接指挥手机"],
    ["/img/voice/step3-remind.png", "③ 设提醒", "「定每天晚上十点的提醒」——异步任务委派"],
    ["/img/voice/step4-remind-setup.png", "④ 提醒配置", "重复规则 / 时间点，一句话自动生成"],
    ["/img/voice/step5-claude.png", "⑤ 调用 Claude Code", "语音直达电脑 Agent——发消息、跑任务"],
    ["/img/voice/step6-history.png", "⑥ 会话历史", "记忆系统：历史可回溯，可继续某段对话"],
    ["/img/voice/step7-manage.png", "⑦ 管理提醒", "已建任务总览——手机电脑双端可查"],
  ];

  return (
    <section id={project.id} ref={ref} className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="fade-up mb-8">
        <p className="text-xs tracking-[0.3em] text-primary">{project.index}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <h2 className="text-3xl font-bold text-foreground">{project.title}</h2>
          <span className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary">{project.badge}</span>
        </div>
        <div className="section-rule mt-4" />
        <p className="mt-6 max-w-4xl text-lg font-medium leading-relaxed text-foreground/90">{project.oneliner}</p>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">{project.intro}</p>
      </div>

      {/* 局部左右：决策（左）· 三态球竖排（右） */}
      <div className="fade-up grid gap-6 lg:grid-cols-[1fr_400px]">
        <div>
          <h3 className="text-sm font-semibold tracking-widest text-primary">关键产品决策</h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {project.decisions.map((d) => (
              <li key={d.title} className="glass-card p-4">
                <p className="font-semibold text-foreground">{d.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-l-4 border-primary bg-muted/60 p-4 text-sm leading-relaxed text-foreground/90">
            <span className="font-semibold text-primary">验证结果：</span>
            {project.result}
          </div>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm font-semibold text-primary">三态语音球（真机在用）</p>
          <div className="mt-6 space-y-7">
            <OrbRow src="/video/orb/orb-idle.mp4" title="待机 DORMANT" desc="会话外默认小球，安静等待" />
            <OrbRow
              src="/video/orb/orb-listening.mp4"
              title="聆听 LISTENING"
              desc="大球放大——暗示「可以讲话」"
              big
            />
            <OrbRow src="/video/orb/orb-working.mp4" title="工作中 WORKING" desc="缩小+低亮度——暗示「稍勿打扰」" />
          </div>
          <p className="mt-6 text-xs leading-5 text-muted-foreground">
            球体大小即状态语义：无需文字，一眼读懂助手当前能否插话。
          </p>
        </div>
      </div>

      {/* 全宽状态流：原始手机比例，大图 */}
      <div className="fade-up mt-12">
        <h3 className="text-sm font-semibold tracking-widest text-primary">一次完整使用的状态流</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {steps.map(([src, title, desc]) => (
            <PhoneShot key={src} src={src} caption={`${title} · ${desc}`} onZoom={setZoom} />
          ))}
        </div>
      </div>

      {/* 全宽工作台 */}
      <div className="fade-up mt-12">
        <h3 className="text-sm font-semibold tracking-widest text-primary">电脑工作台 · 监视正在进行的对话</h3>
        <div className="mt-4">
          <Figure
            src="/img/workbench.png"
            alt="电脑工作台全链路时间线"
            caption="全链路时间线（用户 / 豆包 / 工具 / Claude / 系统），永久保存——手机下达指令，电脑全程可视"
          />
        </div>
      </div>

      {/* 点击放大 */}
      {zoom && (
        <div
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/95 p-6"
          onClick={() => setZoom(null)}
        >
          <img src={zoom} alt="" className="max-h-[92vh] object-contain" />
          <p className="absolute bottom-6 text-xs tracking-widest text-white/40">点击任意处关闭</p>
        </div>
      )}
    </section>
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

const medias = [null, <HealthMedia key="h" />, <CyberEyesMedia key="c" />];

export function Projects() {
  return (
    <div>
      {/* 语音助手：全宽上下布局 */}
      <VoiceProject project={projects[0]} />
      {projects.slice(1).map((p, i) => (
        <ProjectBlock key={p.id} {...p} media={medias[i + 1]} flip={i % 2 === 0} />
      ))}
    </div>
  );
}
