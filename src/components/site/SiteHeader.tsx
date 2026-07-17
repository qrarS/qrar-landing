import { useEffect, useState } from 'react';
import { Languages, Menu, X } from 'lucide-react';
import { SiteLogo } from './SiteLogo';
import { SiteAction } from './SiteAction';
import { usePublishedLanding } from '@/contexts/LandingContentContext';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const { landing } = usePublishedLanding();
  const { language, toggleLanguage, isArabic } = useSiteLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const signIn = { label: landing.content.navigation.signInLabel, kind: 'signin' as const, value: '' };
  const signUp = { label: landing.content.navigation.signUpLabel, kind: 'signup' as const, value: '' };
  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', scrolled || open ? 'border-b border-violet-950/10 bg-[#fbf8ff]/95 shadow-[0_12px_40px_-28px_rgba(69,35,92,.55)] backdrop-blur-xl' : 'bg-transparent')}>
      <div className="site-container">
        <nav className="flex h-[82px] items-center justify-between gap-5" aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}>
          <a href="/" aria-label={isArabic ? 'قرار - الصفحة الرئيسية' : 'Qrar home'}><SiteLogo className="h-11 sm:h-12" /></a>
          <ul className="hidden items-center gap-7 xl:flex">{landing.content.navigation.links.map((link, index) => <li key={`${link.kind}-${index}`}><SiteAction link={link} className="text-[15px] font-medium text-violet-950/65 transition hover:text-violet-950" /></li>)}</ul>
          <div className="hidden items-center gap-2 md:flex">
            <button onClick={toggleLanguage} className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-violet-950 hover:bg-fuchsia-50" aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}><Languages className="h-4 w-4" />{language === 'ar' ? 'EN' : 'ع'}</button>
            <SiteAction link={signIn} className="inline-flex h-11 items-center rounded-full px-5 text-sm font-bold text-violet-950 hover:bg-fuchsia-50" />
            <SiteAction link={signUp} className="brand-button h-11 px-6 text-sm" />
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleLanguage} className="grid h-10 w-10 place-items-center rounded-full border border-violet-950/10 text-sm font-black text-violet-950">{language === 'ar' ? 'EN' : 'ع'}</button>
            <button onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full bg-violet-950 text-white" aria-expanded={open} aria-label={isArabic ? 'فتح القائمة' : 'Open menu'}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </nav>
        {open && <div className="border-t border-violet-950/10 pb-5 pt-3 md:hidden"><ul>{landing.content.navigation.links.map((link, index) => <li key={index}><SiteAction link={link} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-bold text-violet-950 hover:bg-fuchsia-50" /></li>)}</ul><div className="mt-3 grid grid-cols-2 gap-2"><SiteAction link={signIn} className="secondary-button h-11" /><SiteAction link={signUp} className="brand-button h-11" /></div></div>}
      </div>
    </header>
  );
}
