import { SiteLogo } from './SiteLogo';
import { SiteAction } from './SiteAction';
import { usePublishedLanding } from '@/contexts/LandingContentContext';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';

export function SiteFooter() {
  const { landing } = usePublishedLanding();
  const { pick, isArabic } = useSiteLanguage();
  const footer = landing.content.footer;

  return (
    <footer className="design-footer">
      <div className="site-container">
        <div className="design-footer-main">
          <div className="design-footer-brand">
            <SiteLogo />
            <p>{pick(footer.tagline)}</p>
          </div>
          <div className="design-footer-columns">
            {footer.columns.map((column) => (
              <div key={column.id}>
                <h2>{pick(column.title)}</h2>
                <ul>
                  {column.links.map((link, index) => (
                    <li key={index}>
                      <SiteAction link={link} disabledClassName="design-footer-placeholder" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="design-footer-bottom">
          <p>{pick(footer.copyright).replace('{year}', String(new Date().getFullYear()))}</p>
          <div className="design-footer-social" aria-label={isArabic ? 'تابع قرار' : 'Follow Qrar'}>
            <span>X / Twitter</span>
            <span>LinkedIn</span>
            <span>Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
