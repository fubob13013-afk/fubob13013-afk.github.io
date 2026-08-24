import { useEffect, useState } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { profile } from "@/data";

const links = [
  { href: "#voice-assistant", label: "语音助手" },
  { href: "#health-record", label: "健康病例系统" },
  { href: "#cybereyes", label: "CyberEyes" },
  { href: "#art", label: "3D 艺术" },
  { href: "#about", label: "关于我" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card !rounded-none border-x-0 border-t-0" : "bg-transparent border-none"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top" className="text-lg font-bold tracking-widest text-foreground">
          傅宬博<span className="ml-2 text-xs font-normal tracking-wider text-primary">BOB FU</span>
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${profile.contact.email}`}>
          <LiquidButton size="sm">联系我</LiquidButton>
        </a>
      </nav>
    </header>
  );
}
