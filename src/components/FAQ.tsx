import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();

  const items = [
    { qKey: "faq.q1.q", aKey: "faq.q1.a" },
    { qKey: "faq.q2.q", aKey: "faq.q2.a" },
    { qKey: "faq.q3.q", aKey: "faq.q3.a" },
    { qKey: "faq.q4.q", aKey: "faq.q4.a" },
    { qKey: "faq.q5.q", aKey: "faq.q5.a" },
    { qKey: "faq.q6.q", aKey: "faq.q6.a" },
  ];

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {t("faq.eyebrow")}
            </p>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("faq.title")}
            </h2>
            <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
              {t("faq.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mx-auto max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border bg-card/40 px-2 backdrop-blur-md sm:px-4"
          >
            {items.map((item, i) => (
              <AccordionItem
                key={item.qKey}
                value={`item-${i}`}
                className="border-border last:border-b-0"
              >
                <AccordionTrigger className="py-5 text-start text-base font-semibold text-foreground hover:no-underline [&>svg]:text-accent rtl:[&>svg]:order-first rtl:[&>svg]:me-0 rtl:[&>svg]:ms-0">
                  {t(item.qKey)}
                </AccordionTrigger>
                <AccordionContent className="pb-5 pe-2 text-sm leading-relaxed text-muted-foreground">
                  {t(item.aKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;
