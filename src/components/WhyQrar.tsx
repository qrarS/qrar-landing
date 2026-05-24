import { Infinity, Sparkles, ShieldCheck, Zap, Users, Headphones } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyQrar = () => {
  const { t } = useLanguage();

  const tiles = [
    { icon: Infinity, titleKey: "why.tile1.title", descKey: "why.tile1.desc" },
    { icon: Sparkles, titleKey: "why.tile2.title", descKey: "why.tile2.desc" },
    { icon: ShieldCheck, titleKey: "why.tile3.title", descKey: "why.tile3.desc" },
    { icon: Zap, titleKey: "why.tile4.title", descKey: "why.tile4.desc" },
    { icon: Users, titleKey: "why.tile5.title", descKey: "why.tile5.desc" },
    { icon: Headphones, titleKey: "why.tile6.title", descKey: "why.tile6.desc" },
  ];

  return (
    <section id="why-qrar" className="relative py-24 md:py-32">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {t("why.eyebrow")}
            </p>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("why.title")}
            </h2>
            <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
              {t("why.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile, i) => (
            <ScrollReveal key={tile.titleKey} delay={i * 60}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-md transition-colors duration-300 hover:border-accent/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20">
                  <tile.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-base font-semibold text-foreground">
                    {t(tile.titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(tile.descKey)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyQrar;
