import { Map, MessageSquare, BarChart3, Image, Bell, Users } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesGrid = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Map, titleKey: "features.branches.title", descKey: "features.branches.desc" },
    { icon: MessageSquare, titleKey: "features.reviews.title", descKey: "features.reviews.desc" },
    { icon: BarChart3, titleKey: "features.analytics.title", descKey: "features.analytics.desc" },
    { icon: Image, titleKey: "features.photos.title", descKey: "features.photos.desc" },
    { icon: Bell, titleKey: "features.notifications.title", descKey: "features.notifications.desc" },
    { icon: Users, titleKey: "features.team.title", descKey: "features.team.desc" },
  ];

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {t("features.eyebrow")}
            </p>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("features.title")}
            </h2>
            <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
              {t("features.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <ScrollReveal key={f.titleKey} delay={i * 70}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.4)]">
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:from-accent/10 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20 transition-all group-hover:bg-accent/20 group-hover:ring-accent/40">
                    <f.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {t(f.titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(f.descKey)}
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

export default FeaturesGrid;
