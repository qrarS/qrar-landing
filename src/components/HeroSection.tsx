import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardMockup from "./DashboardMockup";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 gradient-mesh-bg" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="section-container relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 items-center">
          {/* Text */}
          <div className="lg:col-span-6 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1.5 backdrop-blur-md animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium text-muted-foreground">
                {t("hero.eyebrow")}
              </span>
            </div>

            <h1 className="mt-6 font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl animate-fade-in-up">
              {t("hero.headline")}
            </h1>

            <p className="mx-auto lg:mx-0 mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg animate-fade-in-up animation-delay-200">
              {t("hero.subheadline")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start animate-fade-in-up animation-delay-400">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-[0_10px_40px_-10px_hsl(var(--accent)/0.65)] transition-all hover:bg-accent-soft hover:-translate-y-0.5 hover:shadow-[0_14px_50px_-10px_hsl(var(--accent)/0.8)]"
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </a>
              <a
                href="mailto:info@qrar.ai?subject=Demo%20Request"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:bg-card hover:border-accent/40"
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </div>

          {/* Mockup */}
          <div className="lg:col-span-6 animate-fade-in-up animation-delay-600">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
