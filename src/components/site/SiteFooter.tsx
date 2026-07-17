import { SiteLogo } from './SiteLogo';
import { SiteAction } from './SiteAction';
import { usePublishedLanding } from '@/contexts/LandingContentContext';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';

export function SiteFooter() {
  const { landing } = usePublishedLanding();
  const { pick, isArabic } = useSiteLanguage();
  const footer = landing.content.footer;
  return (
    <footer className="relative overflow-hidden bg-[#201331] pb-8 pt-20 text-white">
      <div className="absolute -start-32 top-8 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[110px]" />
      <div className="site-container relative">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_2fr]">
          <div><div className="inline-flex rounded-2xl bg-white p-3"><SiteLogo className="h-10" /></div><p className="mt-5 max-w-sm leading-8 text-white/60">{pick(footer.tagline)}</p><a href="mailto:hello@qrar.ai" className="mt-6 inline-flex text-sm font-bold text-fuchsia-300 hover:text-white">hello@qrar.ai</a></div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">{footer.columns.map((column) => <div key={column.id}><h2 className="text-sm font-bold">{pick(column.title)}</h2><ul className="mt-5 space-y-3.5">{column.links.map((link, index) => <li key={index}><SiteAction link={link} className="inline-flex text-sm text-white/55 transition hover:text-white" disabledClassName="text-white/35" /></li>)}</ul></div>)}</div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-white/40 sm:flex-row sm:justify-between"><p>{pick(footer.copyright).replace('{year}', String(new Date().getFullYear()))}</p><p>{isArabic ? 'صُمّم في الرياض لقرارات أوضح' : 'Built in Riyadh for clearer decisions'}</p></div>
      </div>
    </footer>
  );
}
