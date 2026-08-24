export type ArtWork = {
  slug: string;
  title: string;
  titleCn: string;
  subtitle: string;
  tags: string;
  cover: string;
  hero: string;
  oneliner: string;
  story: string[];
  quote?: string;
  params: [string, string][];
  gallery: { src: string; alt: string; wide?: boolean }[];
};

export const artworks: ArtWork[] = [
  {
    slug: "barbatos",
    title: "BARBATOS",
    titleCn: "机动战士 高达·铁血孤儿",
    subtitle: "Mobile Suit Gundam: Iron-Blooded Orphans",
    tags: "建模 / 渲染 / 剪辑",
    cover: "/img/art/barbatos.jpg",
    hero: "/img/art/barbatos_55_17.png",
    oneliner: "历时一个月搭建的真实风格场景，希望复刻还原作品中的场景",
    story: [
      "在火星的仓库里，巴巴托斯静静地立在黑暗中。昏暗的灯光从头顶照下，装甲上的划痕和磨损在厚重的灰尘下隐约可见。周围是堆放的工具、箱子和管线，墙面有油渍和维修记录。",
      "历时一个月搭建的真实风格场景，希望复刻还原作品中的场景。",
    ],
    quote:
      "在灾难的灰烬里，人类把历史重写成了冷冰的年表。三百年后的天穹被旧日炮火刻出沟壑，行星间的轨道不再只是天体的循环，而是权力与债务的来回。",
    params: [
      ["建模", "Blender"],
      ["人物", "DAZ Studio"],
      ["渲染", "Cycles"],
      ["调色", "DaVinci Resolve"],
      ["材质", "Substance 3D Painter"],
      ["剪辑", "Premiere Pro"],
    ],
    gallery: [
      { src: "/img/art/barbatos_1_460.png", alt: "Barbatos 宽幅渲染", wide: true },
      { src: "/img/art/barbatos_1_471.png", alt: "Barbatos 正面渲染" },
      { src: "/img/art/barbatos_1_493.png", alt: "Barbatos 细节渲染" },
    ],
  },
  {
    slug: "ascend",
    title: "ENDLESS ASCENT",
    titleCn: "攀登",
    subtitle: "Scene for Game Trailer",
    tags: "建模 / 渲染 / 剪辑",
    cover: "/img/art/ascend.jpg",
    hero: "/img/art/ascend_1_521.png",
    oneliner: "为游戏场景宣传渲染搭建",
    story: [
      "场景灵感来自于游戏《刺客信条》。场景主体的搭建使用 Blender 中的置换修改器，最终渲染使用 Cycles 渲染器。整体环境设计希望营造出黄昏的氛围，因此整体影调偏暖。",
    ],
    params: [
      ["建模", "Blender"],
      ["人物", "DAZ Studio"],
      ["渲染", "Cycles"],
      ["调色", "DaVinci Resolve"],
      ["材质", "Substance 3D Painter"],
      ["布料模拟", "Marvelous Designer"],
    ],
    gallery: [
      { src: "/img/art/ascend_1_521.png", alt: "Endless Ascent 宽幅渲染", wide: true },
      { src: "/img/art/ascend_166_235.png", alt: "Endless Ascent 场景渲染" },
      { src: "/img/art/ascend_161_227.png", alt: "Endless Ascent 细节渲染" },
    ],
  },
  {
    slug: "deathstranding",
    title: "DEATH STRANDING",
    titleCn: "死亡搁浅",
    subtitle: "Fan-Made Scene",
    tags: "建模 / 渲染 / 剪辑",
    cover: "/img/art/deathstranding.jpg",
    hero: "/img/art/deathstranding_1_583.png",
    oneliner: "末世氛围的场景复刻",
    story: [
      "场景灵感来自于游戏《死亡搁浅》。场景主体的搭建使用 Blender 中的置换修改器，最终渲染使用 Cycles 渲染器。整体环境设计希望营造出末世的氛围，因此整体影调偏冷。",
    ],
    params: [
      ["建模", "Blender"],
      ["人物", "DAZ Studio"],
      ["渲染", "Cycles"],
      ["调色", "DaVinci Resolve"],
      ["材质", "Substance 3D Painter"],
      ["剪辑", "Premiere Pro"],
    ],
    gallery: [
      { src: "/img/art/deathstranding_1_583.png", alt: "Death Stranding 宽幅渲染", wide: true },
      { src: "/img/art/deathstranding_89_18.png", alt: "Death Stranding 场景渲染" },
      { src: "/img/art/deathstranding_80_2.png", alt: "Death Stranding 环境渲染" },
      { src: "/img/art/deathstranding_86_12.png", alt: "Death Stranding 氛围渲染", wide: true },
    ],
  },
  {
    slug: "vrtreadmill",
    title: "VR TREADMILL",
    titleCn: "VR 万向跑步机",
    subtitle: "Product Commercial",
    tags: "建模 / 渲染 / 剪辑",
    cover: "/img/art/product.jpg",
    hero: "/img/art/vrtreadmill_1_646.png",
    oneliner: "历时一个月为初创产品制作的 CG 宣传片",
    story: [
      "历时一个月为初创产品制作的 CG 宣传片——从产品建模、材质打光到成片剪辑的全流程独立完成。",
    ],
    params: [
      ["建模", "Blender"],
      ["渲染", "Cycles"],
      ["调色", "DaVinci Resolve"],
      ["剪辑", "Premiere Pro"],
    ],
    gallery: [
      { src: "/img/art/vrtreadmill_1_682.png", alt: "VR 跑步机全貌渲染", wide: true },
      { src: "/img/art/vrtreadmill_1_704.png", alt: "VR 跑步机细节渲染" },
      { src: "/img/art/vrtreadmill_1_646.png", alt: "VR 跑步机视角渲染" },
    ],
  },
];

export const otherVisualWorks = [
  {
    img: "/img/mv.png",
    title: "清华毕业季 MV",
    desc: "动画创作 · 从分镜到成片",
  },
  {
    img: "/img/eye-render-01.png",
    title: "CyberEyes 眼球渲染",
    desc: "3D 结构与渲染",
  },
  {
    img: "",
    title: "AI 视频创作大赛",
    desc: "资料整理中 · 即将上线",
    placeholder: true,
  },
];
