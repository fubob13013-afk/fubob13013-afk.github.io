export const profile = {
  name: "傅宬博",
  nameEn: "BOB FU · 一棵老头树",
  role: "AI 产品经理 / 产品策划（求职：日常 · 实习）",
  tagline: "能独立将想法变成真实可用的产品",
  sub: "审美与交互 · AI 与工程 · 从需求洞察到真机验证",
  intro:
    "清华美院信息艺术设计系本科在读，兼具审美素养、交互设计能力与工程技术落地能力。能独立完成从需求洞察、方案设计到技术开发、真机验证的全链路产品闭环，擅长利用 AI 与大模型技术将创意转化为真实可用的产品。",
  education: [
    "清华大学 美术学院 信息艺术设计系 本科 2024.09 - 至今",
    "清华大学通用人工智能课程（THUAGI）结业，系统掌握 Transformer 原理与大模型机制。",
  ],
  contact: {
    phone: "15683010529",
    email: "292901802@qq.com",
    wechat: "bob15683010529",
    github: "fubob13013-afk",
    githubUrl: "https://github.com/fubob13013-afk",
    media: "小红书 / B站：一棵老头树（AI 产品 · AI 创作）",
  },
  skills: {
    产品能力: ["需求判断与取舍", "竞品与技术调研", "用户与内容运营", "AI 模型深度应用"],
    设计能力: ["品牌视觉", "交互设计", "3D 建模（Blender）", "达芬奇剪辑", "AI 视频创作"],
    技术能力: ["Python", "JavaScript / Node.js", "STM32 嵌入式", "AI 大模型应用", "MCP", "Docker", "Claude Code"],
  },
  practice: [
    {
      title: "CineClub（AI 创作社区）营销运营",
      time: "2026",
      desc: "负责 AI 创作者集成平台的小红书冷启动运营策略与内容推广，助力剪辑、导演、编剧等创作者聚集组队。",
    },
    {
      title: "启界互动 企业品牌设计",
      time: "2025",
      desc: "独立负责品牌视觉体系搭建及产品宣传片制作，实现从概念构思到成片交付的全流程。",
    },
    {
      title: "清华美院学生会外联部 / 清华创客空间",
      time: "2024 - 至今",
      desc: "参与校企对接工作，推动跨学科硬件与 AI 项目孵化。",
    },
    {
      title: "NAS 24×7 Claude Code 部署（开源）",
      time: "持续",
      desc: "基于 Docker 搭建常驻服务，配合 Tailscale 实现远程访问，项目已在 GitHub 开源并提供中英双语文档，多平台传播。",
    },
  ],
};

export type Project = {
  id: string;
  index: string;
  title: string;
  badge: string;
  oneliner: string;
  intro: string;
  decisions: { title: string; desc: string }[];
  result: string;
};

export const projects: Project[] = [
  {
    id: "voice-assistant",
    index: "PROJECT 01",
    title: "手机语音助手",
    badge: "持续迭代中 · 单用户",
    oneliner: "用嘴指挥电脑干活的 AI 助理——端到端实时语音，下达指令、后台执行、语音汇报。",
    intro:
      "让用户用自然的端到端实时语音，直接指挥 Windows 电脑上的 Agent（如 Claude Code）工作，实现「下达指令 - 后台执行 - 语音汇报」的完整闭环，打通「小米 14 语音 → Windows Hub → Claude Code」三端。",
    decisions: [
      {
        title: "端到端实时语音",
        desc: "摒弃「转文字→模型→转语音」的传统级联方案，保留停顿、语气与插话特性，像真人对话一样自然。",
      },
      {
        title: "任务异步委派",
        desc: "指令下达即确认，后台静默执行，等待期支持多轮对话，不让你干等着。",
      },
      {
        title: "双通道反馈",
        desc: "语音只播报大白话结论，屏幕展示完整技术原文——技术细节用眼睛看，不用耳朵听。",
      },
      {
        title: "分级安全确认",
        desc: "读取无需确认、修改需语音确认、删除/推送需点击确认，在效率与安全之间取平衡。",
      },
    ],
    result: "小米 14 真机跑通完整闭环，音频体验问题已修复，目前处于单用户持续迭代阶段。",
  },
  {
    id: "health-record",
    index: "PROJECT 02",
    title: "个人健康病例系统",
    badge: "真实数据 · 给自己也给需要的人",
    oneliner: "拍张化验单，AI 自动归档成能长期追踪、会找关联的健康档案。",
    intro:
      "针对慢性病患者及需要长期追踪健康状况的人群，开发 AI 健康档案系统。通过拍照自动提取化验单数据并归档，实现跨病症关联分析。",
    decisions: [
      {
        title: "录入门槛降到「拍一下」",
        desc: "拍照自动提取、归档，替代繁琐的手填表单——录入越轻，记录越持久。",
      },
      {
        title: "数据结构化",
        desc: "症状日志、体检指标统一字段标准，AI 才能做深度分析。",
      },
      {
        title: "从「记录」到「找关联」",
        desc: "从单一记录工具升级为关联分析工具，实现跨病症（如气胸与换季）的关联洞察。",
      },
    ],
    result:
      "已覆盖个人真实病史数据；协助同学为患癌亲属整理病史，获得「确实有用」的正向反馈。",
  },
  {
    id: "cybereyes",
    index: "PROJECT 03",
    title: "CyberEyes · 背后空间感知穿戴设备",
    badge: "课程结课装置 · 真机跑通",
    oneliner: "一只长在背上、替你感知身后动静的「第三只眼」。",
    intro:
      "通过距离传感器感知身后人员靠近，利用眼球转动、眨眼、追踪物体传递信息，并通过背部震动马达反馈方位。技术构成：STM32F103C8 主控 + VL53L0X 激光测距（藏在眼球内）+ 3 个舵机（上眼皮 / 俯仰 / 水平）+ 3 个背部震动马达，状态机驱动「眯眼巡航 → 警觉触发 → 持续追踪」。",
    decisions: [
      {
        title: "诚实收敛 scope",
        desc: "初衷是「情绪陪伴」，基于课程时限聚焦为「空间感知」，确保交付可用成品。",
      },
      {
        title: "感知落到「眼神」",
        desc: "将抽象的感知具象化为会动的眼神——眼球追踪 + 眨眼 + 扫视，而非枯燥的屏幕文字。",
      },
      {
        title: "双路反馈",
        desc: "眼球动态对外展示，背部震动马达对内提醒佩戴者方位。",
      },
      {
        title: "开源底座 + 自研集成",
        desc: "开源 3D 结构 + AI 生成算法 + 自主集成调参的开发模式。",
      },
    ],
    result:
      "课程结课装置真机跑通，像真人一样转动、眨眼、追踪物体；情绪陪伴为下一步迭代方向。",
  },
];

export const visualWorks = [
  {
    img: "/img/metal.png",
    title: "枪黑金属",
    desc: "Blender 3D 建模 · 材质实验",
  },
  {
    img: "/img/mv.png",
    title: "清华毕业季 MV",
    desc: "动画创作 · 从分镜到成片",
  },
  {
    img: "/img/aivideo.png",
    title: "AI 视频创作大赛",
    desc: "AI 生成工具链 · 参赛作品",
  },
  {
    img: "/img/eye-render-01.png",
    title: "CyberEyes 眼球渲染",
    desc: "3D 结构与渲染",
  },
  {
    img: "/img/eye-render-02.png",
    title: "CyberEyes 眼球渲染",
    desc: "3D 结构与渲染",
  },
];
