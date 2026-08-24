import { useEffect, useState } from "react";
import { Nav } from "@/sections/Nav";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Artworks } from "@/sections/Artworks";
import { ArtDetail } from "@/sections/ArtDetail";
import { About, Footer } from "@/sections/About";

// 进入作品详情页前保存主页面滚动位置，返回时恢复
let savedScroll = 0;

export default function App() {
  const [artSlug, setArtSlug] = useState<string | null>(null);

  useEffect(() => {
    const apply = () => {
      const m = window.location.hash.match(/^#\/art\/([a-z]+)/);
      const next = m ? m[1] : null;
      if (next !== null) savedScroll = window.scrollY;
      setArtSlug(next);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  // 从详情页返回主页面时，恢复之前的滚动位置
  useEffect(() => {
    if (artSlug === null) {
      requestAnimationFrame(() => window.scrollTo(0, savedScroll));
    }
  }, [artSlug]);

  if (artSlug !== null) {
    return (
      <>
        <Nav />
        <main>
          <ArtDetail slug={artSlug} />
        </main>
      </>
    );
  }
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Artworks />
        <About />
      </main>
      <Footer />
    </>
  );
}
