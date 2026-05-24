import logoEn from "@/assets/qrar-logo-en.svg";
import logoAr from "@/assets/qrar-logo-ar.svg";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface QrarLogoProps {
  className?: string;
}

const QrarLogo = ({ className }: QrarLogoProps) => {
  const { language } = useLanguage();
  return (
    <img
      src={language === "ar" ? logoAr : logoEn}
      alt="Qrar"
      className={cn("w-auto select-none", className)}
      draggable={false}
    />
  );
};

export default QrarLogo;
