import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    { n: "01", titleKey: "how.step1.title", descKey: "how.step1.desc" },
    { n: "02", titleKey: "how.step2.title", descKey: "how.step2.desc" },
    { n: "03", titleKey: "how.step3.title", descKey: "how.step3.desc" },
  ];

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-card/30 border-y border-border/50">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {t("how.eyebrow")}
            </p>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("how.title")}
            </h2>
            <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
              {t("how.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          {/* Connecting line on desktop */}
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {steps.map((step, i) => (
            <ScrollReveal key={step.n} delay={i * 120}>
              <div className="relative flex flex-col items-center text-center md:items-start md:text-start">
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-card text-lg font-bold text-accent">
                  <span className="absolute inset-0 -z-10 rounded-full bg-accent/10 blur-md" />
                  {step.n}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {t(step.titleKey)}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {t(step.descKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
