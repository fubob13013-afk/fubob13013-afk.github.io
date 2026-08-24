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
    <section id={id} ref={ref} className="mx-auto max-w-6xl scroll-mt-20 border-t-2 border-border px-6 py-20">
      <div className="fade-up mb-10">
        <p className="text-xs tracking-[0.3em] text-primary">{index}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <h2 className="bg-primary/15 px-3 py-1 text-4xl font-bold text-foreground">{title}</h2>
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

/** 三态语音球：统一尺寸，点击循环切换状态（模拟 App 内的球体状态机） */
function OrbRow({ src, title, desc }: { src: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full md:h-24 md:w-24">
        <video src={src} autoPlay loop muted playsInline className="h-full w-full scale-[1.06] object-cover" />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ boxShadow: "inset 0 0 10px 4px rgba(11,15,20,0.35)" }}
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

/** 手机截图：统一尺寸，可点击放大 */
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
      <figcaption className="py-2 text-center text-base font-medium leading-6 text-foreground">{caption}</figcaption>
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

  return (
    <section id={project.id} ref={ref} className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="fade-up mb-8">
        <p className="text-xs tracking-[0.3em] text-primary">{project.index}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <h2 className="bg-primary/15 px-3 py-1 text-4xl font-bold text-foreground">{project.title}</h2>
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
          <div className="mt-6 space-y-6">
            <OrbRow src="/video/orb/orb-idle.mp4" title="待机 DORMANT" desc="会话外默认状态，安静等待" />
            <OrbRow src="/video/orb/orb-listening.mp4" title="聆听 LISTENING" desc="大球语义——可以讲话" />
            <OrbRow src="/video/orb/orb-working.mp4" title="工作中 WORKING" desc="缩小语义——稍勿打扰" />
          </div>
          <p className="mt-6 text-xs leading-5 text-muted-foreground">
            真机上球体随语音状态实时切换：聆听时放大暗示「可以说话」，处理时缩小暗示「稍勿打扰」——无需文字，一眼读懂。
          </p>
        </div>
      </div>

      {/* 全宽工作流：左侧竖向节点时间线，右侧内容整体右移 */}
      <div className="fade-up mt-12">
        <h3 className="text-2xl font-bold text-foreground">一次完整使用的工作流</h3>

        <div className="relative mt-6 md:pl-14">
          {/* 竖向节点线 */}
          <div className="absolute bottom-2 left-[7px] top-2 hidden w-px bg-primary/30 md:block" />

          {/* 第一排：主题切换 */}
          <div className="relative">
            <span className="absolute -left-14 top-1.5 hidden size-[15px] rounded-full border-2 border-primary bg-background md:block" />
            <p className="text-lg font-bold text-primary">主题切换 · 亮色 / 暗色双主题</p>
            <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
              <PhoneShot src="/img/voice/theme-light.png" caption="亮色主题" onZoom={setZoom} />
              <PhoneShot src="/img/voice/theme-dark.png" caption="暗色主题" onZoom={setZoom} />
            </div>
          </div>

          {/* 第二排：语音对话三连 */}
          <div className="relative mt-6">
            <span className="absolute -left-14 top-1.5 hidden size-[15px] rounded-full border-2 border-primary bg-background md:block" />
            <p className="text-lg font-bold text-primary">语音对话 · 从问答到指挥</p>
            <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
              <PhoneShot src="/img/voice/convo-hello.png" caption="唤醒对话 ·「你好，你能做什么」" onZoom={setZoom} />
              <PhoneShot src="/img/voice/step2-sendmsg.png" caption="发消息 ·「帮我给爸爸发一条消息」" onZoom={setZoom} />
              <PhoneShot src="/img/voice/step5-claude.png" caption="调用电脑 Claude Code 跑任务" onZoom={setZoom} />
            </div>
          </div>

          {/* 第三排：提醒闭环 */}
          <div className="relative mt-6">
            <span className="absolute -left-14 top-1.5 hidden size-[15px] rounded-full border-2 border-primary bg-background md:block" />
            <p className="text-lg font-bold text-primary">提醒闭环 · 一句话创建 → 触发 → 管理</p>
            <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
              <PhoneShot src="/img/voice/remind-2pm5pm.png" caption="创建 ·「定下午 2 点和 5 点的提醒」" onZoom={setZoom} />
              <PhoneShot src="/img/voice/step6-remind-alert.png" caption="触发 · 响铃震动，息屏也生效" onZoom={setZoom} />
              <PhoneShot src="/img/voice/step8-manage.png" caption="管理 · 已建任务总览" onZoom={setZoom} />
              <PhoneShot src="/img/voice/step4-remind-setup.png" caption="配置详情 · 重复规则自动生成" onZoom={setZoom} />
            </div>
          </div>

          {/* 第四排：记忆系统 */}
          <div className="relative mt-6">
            <span className="absolute -left-14 top-1.5 hidden size-[15px] rounded-full border-2 border-primary bg-background md:block" />
            <p className="text-lg font-bold text-primary">记忆系统 · 历史可回溯，可延续</p>
            <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
              <PhoneShot src="/img/voice/step7-history.png" caption="会话历史 · 过往对话全量保存" onZoom={setZoom} />
              <PhoneShot src="/img/voice/theme-resume.png" caption="继续这段对话 · 从任意历史会话接续" onZoom={setZoom} />
            </div>
          </div>
        </div>
      </div>

      {/* 全宽工作台 */}
      <div className="fade-up mt-12">
        <h3 className="text-2xl font-bold text-foreground">电脑工作台 · 监视正在进行的对话</h3>
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

/** 健康病例系统：全宽讲故事结构（起因 → 演进 → 效果与案例 → 内嵌真实网页） */
function HealthProject({ project }: { project: (typeof projects)[number] }) {
  const ref = useReveal<HTMLDivElement>();
  const [showSite, setShowSite] = useState(false);

  const evolution: [string, string, string][] = [
    ["v1", "Skill 转换", "最初把病历整理流程做成网上流传的 Skill 模板，手工填字段"],
    ["v2", "Claude Code 编辑", "随后用 Claude Code 直接编辑结构化档案：md 档案 + CSV 追踪表 + 字段标准"],
    ["v3", "微信 Cloud Bot 打通", "手机拍照 → 微信 Bot 上传到电脑 Claude Code → 自动归档、提取化验单内容、整理每次就医记录"],
    ["now", "日常突发交互", "皮肤病发作、拉肚子等突发状况也直接对话记录，系统随用随长"],
  ];

  return (
    <section id={project.id} ref={ref} className="mx-auto max-w-6xl scroll-mt-20 border-t-2 border-border px-6 py-20">
      <div className="fade-up mb-8">
        <p className="text-xs tracking-[0.3em] text-primary">{project.index}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <h2 className="bg-primary/15 px-3 py-1 text-4xl font-bold text-foreground">{project.title}</h2>
          <span className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary">{project.badge}</span>
        </div>
        <div className="section-rule mt-4" />
        <p className="mt-6 max-w-4xl text-lg font-medium leading-relaxed text-foreground/90">{project.oneliner}</p>
      </div>

      {/* 起因 */}
      <div className="fade-up">
        <h3 className="text-lg font-bold text-primary">起因</h3>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          长期生病、反复检查——气胸、皮肤病、鼻炎、肛肠消化，四类病症分散在不同医院的不同单据里。
          每次就医都在重复「回忆上一次的检查结果」，<span className="text-foreground">难以有效把控自身病症</span>。
          于是给自己做了这套系统：把所有病历变成可追踪、可分析的结构化档案。
        </p>
      </div>

      {/* 演进：时间线 */}
      <div className="fade-up mt-10">
        <h3 className="text-lg font-bold text-primary">演进过程</h3>
        <div className="relative mt-6 md:pl-14">
          <div className="absolute bottom-2 left-[7px] top-2 hidden w-px bg-primary/30 md:block" />
          {evolution.map(([ver, title, desc]) => (
            <div key={ver} className="relative mb-5 last:mb-0">
              <span className="absolute -left-14 top-1.5 hidden size-[15px] rounded-full border-2 border-primary bg-background md:block" />
              <div className="glass-card p-4">
                <p className="text-sm font-semibold text-foreground">
                  <span className="mr-2 rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs text-primary">{ver}</span>
                  {title}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 效果与案例 */}
      <div className="fade-up mt-10">
        <h3 className="text-lg font-bold text-primary">效果与用户案例</h3>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          自用体验良好——跨病症的关联分析（如气胸 ↔ 换季、空调 ↔ 尘螨的假设验证）确实带来了新的洞察。
          第一个外部用户：同学因舅姥爷患小细胞肺癌找来，用这套系统整理病史，反馈「确实有用」。
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          <figure className="glass-card p-2">
            <img
              src="/img/health/case-request.png"
              alt="同学来要病例 skill"
              loading="lazy"
              className="mx-auto w-full cursor-zoom-in rounded-lg"
              onClick={() => window.open("/img/health/case-request.png", "_blank")}
            />
            <figcaption className="py-2 text-center text-sm font-medium text-foreground">
              用户主动找来 · 索要病例 Skill
            </figcaption>
          </figure>
          <figure className="glass-card p-2">
            <img
              src="/img/health/case-feedback.png"
              alt="用户反馈"
              loading="lazy"
              className="mx-auto w-full cursor-zoom-in rounded-lg"
              onClick={() => window.open("/img/health/case-feedback.png", "_blank")}
            />
            <figcaption className="py-2 text-center text-sm font-medium text-foreground">
              使用后的反馈 · 表示感谢
            </figcaption>
          </figure>
        </div>
      </div>

      {/* 关键决策（保留原有产品思维内容） */}
      <div className="fade-up mt-10">
        <h3 className="text-lg font-bold text-primary">关键产品决策</h3>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
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

      {/* 内嵌真实系统网页 */}
      <div className="fade-up mt-10">
        <h3 className="text-lg font-bold text-primary">系统实况 · 直接体验</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          这就是系统本身导出的网页——四个病症档案的真实数据、追踪记录与关联分析。点击进入查看。
        </p>
        <div className="mt-4">
          {showSite ? (
            <div className="glass-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
                <p className="text-xs text-muted-foreground">Bob 的树屋病例 · 系统导出页</p>
                <a href="/health.html" target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                  新标签页打开 ↗
                </a>
              </div>
              <iframe src="/health.html" title="健康病例系统" className="h-[640px] w-full bg-white" />
            </div>
          ) : (
            <button
              onClick={() => setShowSite(true)}
              className="glass-card flex w-full flex-col items-center gap-2 py-12 transition-colors hover:border-primary/40"
            >
              <span className="text-lg font-semibold text-foreground">▶ 点击加载系统实况</span>
              <span className="text-xs text-muted-foreground">「Bob 的树屋病例」· 4 个病症档案真实数据</span>
            </button>
          )}
        </div>
      </div>
    </section>
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

const medias = [null, null, <CyberEyesMedia key="c" />];

export function Projects() {
  return (
    <div>
      {/* 语音助手：全宽上下布局 */}
      <VoiceProject project={projects[0]} />
      {/* 健康病例：全宽讲故事布局 */}
      <HealthProject project={projects[1]} />
      <ProjectBlock {...projects[2]} media={medias[2]} flip={false} />
    </div>
  );
}
