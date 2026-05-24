import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

interface CounterProps {
  to: number;
  suffix?: string;
  format?: (n: number) => string;
}

const Counter = ({ to, suffix = "+", format }: CounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(to);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1600;
            const start = performance.now();
            const animate = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setVal(Math.round(to * eased));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [to]);

  const display = format ? format(val) : val.toLocaleString();

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const MetricsBar = () => {
  const { t } = useLanguage();

  const metrics = [
    { value: 50, label: t("metrics.businesses") },
    { value: 500, label: t("metrics.branches") },
    { value: 10000, label: t("metrics.reviews") },
  ];

  return (
    <section className="relative py-20 md:py-24">
      <div className="section-container">
        <ScrollReveal className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-10 rounded-3xl border border-border bg-gradient-to-br from-card via-card/80 to-card/40 px-6 py-12 backdrop-blur-md md:grid-cols-3 md:px-12">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                  <span className="gradient-text">
                    <Counter to={m.value} />
                  </span>
                </div>
                <div className="mt-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MetricsBar;
