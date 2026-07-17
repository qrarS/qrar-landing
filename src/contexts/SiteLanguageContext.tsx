import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { LocalizedText } from '@/content/landing';

export type SiteLanguage = 'ar' | 'en';
interface SiteLanguageValue {
  language: SiteLanguage;
  dir: 'rtl' | 'ltr';
  isArabic: boolean;
  setLanguage: (language: SiteLanguage) => void;
  toggleLanguage: () => void;
  pick: (value: LocalizedText) => string;
}
const SiteLanguageContext = createContext<SiteLanguageValue | null>(null);

export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>(() => {
    const saved = localStorage.getItem('qrar-language');
    return saved === 'en' || saved === 'ar' ? saved : 'ar';
  });
  const isArabic = language === 'ar';
  useEffect(() => {
    localStorage.setItem('qrar-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic, language]);
  const value = useMemo<SiteLanguageValue>(() => ({
    language,
    dir: isArabic ? 'rtl' : 'ltr',
    isArabic,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => current === 'ar' ? 'en' : 'ar'),
    pick: (value) => value[language] || value.ar || value.en,
  }), [isArabic, language]);
  return <SiteLanguageContext.Provider value={value}>{children}</SiteLanguageContext.Provider>;
}

export function useSiteLanguage() {
  const value = useContext(SiteLanguageContext);
  if (!value) throw new Error('useSiteLanguage must be used inside SiteLanguageProvider');
  return value;
}
