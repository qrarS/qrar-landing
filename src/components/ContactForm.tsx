import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim().slice(0, 100);
    const trimmedEmail = email.trim().slice(0, 255);
    const trimmedCompany = company.trim().slice(0, 100);
    const trimmedMessage = message.trim().slice(0, 1000);

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast({
        title: t("contact.error.title"),
        description: t("contact.error.required"),
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: t("contact.error.title"),
        description: t("contact.error.email"),
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(`Contact from ${trimmedName}`);
    const body = encodeURIComponent(
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nCompany: ${trimmedCompany}\n\n${trimmedMessage}`
    );
    window.location.href = `mailto:info@qrar.ai?subject=${subject}&body=${body}`;

    toast({
      title: t("contact.success.title"),
      description: t("contact.success.desc"),
    });

    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="section-container">
        <ScrollReveal className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className="diamond-divider mb-6">
              <span className="text-base">◆◆</span>
            </div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              {t("contact.eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {t("contact.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
              {t("contact.subtitle")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-12 rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm md:p-10"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  {t("contact.name")}
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  required
                  className="h-12 rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors"
                  placeholder={t("contact.namePlaceholder")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t("contact.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  required
                  className="h-12 rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors"
                  placeholder={t("contact.emailPlaceholder")}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="company" className="text-sm font-medium text-foreground">
                  {t("contact.company")}
                </label>
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  maxLength={100}
                  className="h-12 rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors"
                  placeholder={t("contact.companyPlaceholder")}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  required
                  rows={5}
                  className="rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors resize-none"
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-[0_15px_50px_-10px_hsl(var(--accent)/0.7)] transition-all hover:bg-accent-soft hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-10px_hsl(var(--accent)/0.85)]"
              >
                {t("contact.send")}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </button>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactForm;
