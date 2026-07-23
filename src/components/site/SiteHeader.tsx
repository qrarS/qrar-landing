import { useEffect, useState } from 'react';
import { ArrowUpLeft, ArrowUpRight, Globe2, Menu, UserRound, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { SiteLogo } from './SiteLogo';
import { SiteAction } from './SiteAction';
import { usePublishedLanding } from '@/contexts/LandingContentContext';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const { landing } = usePublishedLanding();
  const { language, toggleLanguage, isArabic, pick } = useSiteLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const signIn = { label: landing.content.navigation.signInLabel, kind: 'signin' as const, value: '' };
  const signUp = { label: landing.content.navigation.signUpLabel, kind: 'signup' as const, value: '' };
  const Arrow = isArabic ? ArrowUpLeft : ArrowUpRight;

  return (
    <header className={cn('design-header', (scrolled || open) && 'design-header--solid')}>
      <div className="site-container">
        <nav className="design-header-nav" aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}>
          <a className="design-header-logo" href="/" aria-label={isArabic ? 'قرار — الصفحة الرئيسية' : 'Qrar home'}>
            <SiteLogo />
          </a>

          <ul className="design-header-links">
            {landing.content.navigation.links.map((link, index) => (
              <li key={`${link.kind}-${index}`}>
                <SiteAction
                  link={link}
                  className={cn(
                    ((location.pathname === '/' && index === 0)
                      || (link.kind === 'route' && link.value === location.pathname))
                    && 'is-current',
                  )}
                />
              </li>
            ))}
          </ul>

          <div className="design-header-actions">
            <button type="button" className="design-language-button" onClick={toggleLanguage} aria-label={isArabic ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}>
              <Globe2 size={18} />
              <span>{language === 'ar' ? 'EN' : 'ع'}</span>
            </button>
            <SiteAction link={signIn} className="design-header-signin">
              <UserRound size={19} />
              <span>{pick(signIn.label)}</span>
            </SiteAction>
            <SiteAction link={signUp} className="design-header-signup">
              <span>{pick(signUp.label)}</span>
              <Arrow size={18} />
            </SiteAction>
          </div>

          <div className="design-header-mobile-actions">
            <button type="button" onClick={toggleLanguage} aria-label={isArabic ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}>
              {language === 'ar' ? 'EN' : 'ع'}
            </button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={isArabic ? (open ? 'إغلاق القائمة' : 'فتح القائمة') : (open ? 'Close menu' : 'Open menu')}
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="design-mobile-menu">
            <ul>
              {landing.content.navigation.links.map((link, index) => (
                <li key={index}><SiteAction link={link} onClick={() => setOpen(false)} /></li>
              ))}
            </ul>
            <div>
              <SiteAction link={signIn} className="design-header-signin" />
              <SiteAction link={signUp} className="design-header-signup" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
