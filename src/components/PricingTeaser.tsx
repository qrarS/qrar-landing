import { Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const PricingTeaser = () => {
  const { t } = useLanguage();

  const tiers = [
    {
      name: t("pricing.starter.name"),
      price: t("pricing.starter.price"),
      desc: t("pricing.starter.desc"),
      features: [
        t("pricing.starter.f1"),
        t("pricing.starter.f2"),
        t("pricing.starter.f3"),
      ],
      cta: t("pricing.starter.cta"),
      highlighted: false,
    },
    {
      name: t("pricing.growth.name"),
      price: t("pricing.growth.price"),
      desc: t("pricing.growth.desc"),
      features: [
        t("pricing.growth.f1"),
        t("pricing.growth.f2"),
        t("pricing.growth.f3"),
        t("pricing.growth.f4"),
      ],
      cta: t("pricing.growth.cta"),
      highlighted: true,
    },
    {
      name: t("pricing.enterprise.name"),
      price: t("pricing.enterprise.price"),
      desc: t("pricing.enterprise.desc"),
      features: [
        t("pricing.enterprise.f1"),
        t("pricing.enterprise.f2"),
        t("pricing.enterprise.f3"),
        t("pricing.enterprise.f4"),
      ],
      cta: t("pricing.enterprise.cta"),
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {t("pricing.eyebrow")}
            </p>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("pricing.title")}
            </h2>
            <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
              {t("pricing.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-5 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 100}>
              <div
                className={cn(
                  "relative h-full rounded-2xl border p-7 transition-all duration-300",
                  tier.highlighted
                    ? "border-accent/50 bg-gradient-to-b from-accent/10 via-card to-card shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.5)] lg:scale-[1.03]"
                    : "border-border bg-card/60 backdrop-blur-md hover:border-accent/30"
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                    {t("pricing.popular")}
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{tier.desc}</p>
                </div>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-foreground">
                    {tier.price}
                  </span>
                </div>

                <ul className="mb-8 space-y-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15">
                        <Check className="h-2.5 w-2.5 text-accent" strokeWidth={3} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={cn(
                    "block w-full rounded-full px-5 py-3 text-center text-sm font-semibold transition-all",
                    tier.highlighted
                      ? "bg-accent text-accent-foreground hover:bg-accent-soft hover:-translate-y-0.5"
                      : "border border-border bg-card text-foreground hover:border-accent/50 hover:bg-card/80"
                  )}
                >
                  {tier.cta}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
