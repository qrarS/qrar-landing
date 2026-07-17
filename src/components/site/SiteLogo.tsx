import logoAr from '@/assets/qrar-logo-ar.svg';
import logoEn from '@/assets/qrar-logo-en.svg';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
import { cn } from '@/lib/utils';

export function SiteLogo({ className }: { className?: string }) {
  const { isArabic } = useSiteLanguage();
  return <img src={isArabic ? logoAr : logoEn} alt="Qrar" className={cn('w-auto select-none', className)} draggable={false} />;
}
