import { Nav } from "@/sections/Nav";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { VisualWorks } from "@/sections/VisualWorks";
import { About, Footer } from "@/sections/About";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <VisualWorks />
        <About />
      </main>
      <Footer />
    </>
  );
}
