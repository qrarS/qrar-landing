import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-28">
      <div className="section-container">
        <ScrollReveal className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/15 via-card to-primary/40 px-8 py-16 text-center md:px-16 md:py-20">
            {/* Decorative gradients */}
            <div className="pointer-events-none absolute -top-32 start-1/2 h-64 w-[120%] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

            <div className="relative">
              <div className="diamond-divider mb-6">
                <span className="text-base">◆◆</span>
              </div>

              <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {t("finalCTA.title")}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
                {t("finalCTA.subtitle")}
              </p>

              <div className="mt-10">
                <a
                  href="mailto:info@qrar.ai?subject=Get%20Started"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-[0_15px_50px_-10px_hsl(var(--accent)/0.7)] transition-all hover:bg-accent-soft hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-10px_hsl(var(--accent)/0.85)]"
                >
                  {t("finalCTA.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FinalCTA;
