import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export interface LegalSection {
  id: string;
  title: { en: string; ar: string };
  body: { en: ReactNode; ar: ReactNode };
}

interface LegalPageProps {
  eyebrow: { en: string; ar: string };
  title: { en: string; ar: string };
  intro: { en: string; ar: string };
  effectiveDate: string;
  lastUpdatedLabel?: { en: string; ar: string };
  sections: LegalSection[];
}

const LegalPage = ({
  eyebrow,
  title,
  intro,
  effectiveDate,
  lastUpdatedLabel,
  sections,
}: LegalPageProps) => {
  const { language, dir } = useLanguage();
  const isAr = language === "ar";
  const tocTitle = isAr ? "المحتويات" : "Contents";
  const dateLabel =
    lastUpdatedLabel?.[language] ?? (isAr ? "تاريخ السريان" : "Effective date");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="section-container">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {eyebrow[language]}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {title[language]}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {intro[language]}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/80">
              {dateLabel}: {effectiveDate}
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-10 lg:grid-cols-12">
            {/* TOC */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-28 rounded-2xl border border-border bg-card/40 p-5">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  {tocTitle}
                </h2>
                <ol className="space-y-2">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        <span className="text-muted-foreground/60">
                          {String(i + 1).padStart(2, "0")}.
                        </span>{" "}
                        {s.title[language]}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            {/* Content */}
            <article
              className="lg:col-span-8 xl:col-span-9 space-y-10"
              dir={dir}
            >
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-28 rounded-2xl border border-border bg-card/30 p-6 sm:p-8"
                >
                  <h2 className="mb-4 flex items-baseline gap-3 text-xl font-semibold text-foreground sm:text-2xl">
                    <span className="text-sm font-mono text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title[language]}
                  </h2>
                  <div className="prose prose-invert max-w-none text-sm leading-relaxed text-muted-foreground prose-li:my-1 prose-p:my-2 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
                    {s.body[language]}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
