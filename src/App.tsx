import { useEffect, useState } from "react";
import { Nav } from "@/sections/Nav";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Artworks } from "@/sections/Artworks";
import { ArtDetail } from "@/sections/ArtDetail";
import { About, Footer } from "@/sections/About";

export default function App() {
  const [artSlug, setArtSlug] = useState<string | null>(null);
  useEffect(() => {
    const apply = () => {
      const m = window.location.hash.match(/^#\/art\/([a-z]+)/);
      setArtSlug(m ? m[1] : null);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  // 从作品详情页返回时，主视图渲染后滚到目标锚点
  useEffect(() => {
    if (artSlug === null && window.location.hash.startsWith("#") && !window.location.hash.startsWith("#/")) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
    }
  }, [artSlug]);

  if (artSlug !== null) {
    return (
      <>
        <Nav />
        <main>
          <ArtDetail />
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
