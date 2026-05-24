import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-accent/50 hover:text-foreground backdrop-blur-md"
      aria-label="Toggle language"
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{language === "en" ? "العربية" : "English"}</span>
    </button>
  );
};

export default LanguageToggle;
