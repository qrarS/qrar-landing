import QrarLogo from "./QrarLogo";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const productLinks = [
    { href: "/#features", label: t("nav.features") },
    { href: "/#how-it-works", label: t("nav.howItWorks") },
    { href: "/#pricing", label: t("nav.pricing") },
  ];

  const companyLinks = [
    { href: "mailto:info@qrar.ai?subject=About%20Qrar", label: t("footer.about") },
    { href: "mailto:info@qrar.ai?subject=Qrar%20Inquiry", label: t("footer.contact") },
    { href: "mailto:info@qrar.ai?subject=Demo%20Request", label: t("footer.demo") },
  ];

  const legalLinks = [
    { href: "/privacy", label: t("footer.privacy") },
    { href: "/terms", label: t("footer.terms") },
  ];

  return (
    <footer className="border-t border-border bg-card/30 py-14">
      <div className="section-container">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <QrarLogo className="h-10" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Product */}
          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              {t("footer.product")}
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Qrar. {t("footer.rights")}
          </p>
          <a
            href="mailto:info@qrar.ai"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            info@qrar.ai
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
