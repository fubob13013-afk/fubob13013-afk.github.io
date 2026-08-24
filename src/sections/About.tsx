import { Github, Mail, Phone, Sprout } from "lucide-react";
import { profile } from "@/data";
import { useReveal } from "@/lib/useReveal";

export function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="scroll-mt-24 border-t border-border/60 py-20">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className="fade-up">
          <p className="text-xs tracking-[0.3em] text-primary">ABOUT ME</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">关于我</h2>
          <div className="section-rule mt-5" />
        </div>

        <div className="fade-up mt-10 flex flex-col gap-10 lg:flex-row">
          <div className="lg:w-72 lg:shrink-0">
            <div className="glass-card p-3">
              <img
                src="/img/portrait.jpg"
                alt={profile.name}
                className="w-full rounded-lg object-cover"
              />
            </div>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              {profile.education.map((e) => (
                <p key={e} className="leading-6">
                  {e}
                </p>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-10">
            <p className="text-sm leading-8 text-foreground/90">{profile.intro}</p>

            <div>
              <h3 className="text-sm font-semibold tracking-widest text-primary">技能清单</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {Object.entries(profile.skills).map(([group, items]) => (
                  <div key={group} className="glass-card p-4">
                    <p className="text-sm font-semibold text-foreground">{group}</p>
                    <ul className="mt-3 space-y-1.5">
                      {items.map((s) => (
                        <li key={s} className="text-xs leading-5 text-muted-foreground">
                          · {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-widest text-primary">实践经历</h3>
              <div className="mt-4 space-y-4">
                {profile.practice.map((p) => (
                  <div key={p.title} className="glass-card p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.time}</p>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const c = profile.contact;
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-lg font-bold tracking-widest text-foreground">{profile.name}</p>
        <p className="mt-2 text-sm text-primary">{profile.tagline}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <a href={`tel:${c.phone}`} className="flex items-center gap-2 hover:text-primary">
            <Phone className="size-4" /> {c.phone}
          </a>
          <a href={`mailto:${c.email}`} className="flex items-center gap-2 hover:text-primary">
            <Mail className="size-4" /> {c.email}
          </a>
          <a
            href={c.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-primary"
          >
            <Github className="size-4" /> {c.github}
          </a>
          <span className="flex items-center gap-2">
            <Sprout className="size-4" /> {c.media}
          </span>
        </div>
        <p className="mt-8 text-xs text-muted-foreground/60">
          © 2026 {profile.name} · 微信 {c.wechat} · 本站由本人独立设计并开发
        </p>
      </div>
    </footer>
  );
}
