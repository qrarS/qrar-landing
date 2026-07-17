import type { ReactNode } from 'react';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';

export interface LegalSection {
  id: string;
  title: { en: string; ar: string };
  body: { en: ReactNode; ar: ReactNode };
}
interface Props {
  eyebrow: { en: string; ar: string };
  title: { en: string; ar: string };
  intro: { en: string; ar: string };
  effectiveDate: string;
  lastUpdatedLabel?: { en: string; ar: string };
  sections: LegalSection[];
}

export default function SiteLegalPage({ eyebrow,title,intro,effectiveDate,lastUpdatedLabel,sections }: Props) {
  const { language,dir,isArabic }=useSiteLanguage();
  const dateLabel=lastUpdatedLabel?.[language]??(isArabic?'تاريخ السريان':'Effective date');
  return <div className="min-h-screen bg-[#fbf8fd]"><SiteHeader/><main className="pb-24 pt-36 sm:pt-40"><div className="site-container"><div className="mx-auto max-w-3xl text-center"><span className="section-eyebrow">{eyebrow[language]}</span><h1 className="mt-6 text-balance text-4xl font-black tracking-tight text-violet-950 sm:text-6xl">{title[language]}</h1><p className="mt-5 text-base leading-8 text-violet-950/55">{intro[language]}</p><p className="mt-4 text-xs font-bold uppercase tracking-[.16em] text-fuchsia-600">{dateLabel}: {effectiveDate}</p></div><div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-12"><aside className="lg:col-span-4 xl:col-span-3"><div className="rounded-[24px] border border-violet-950/5 bg-white p-5 shadow-sm lg:sticky lg:top-28"><h2 className="mb-4 text-xs font-black uppercase tracking-[.14em] text-violet-950">{isArabic?'المحتويات':'Contents'}</h2><ol className="space-y-1.5">{sections.map((section,index)=><li key={section.id}><a href={`#${section.id}`} className="block rounded-xl px-3 py-2 text-sm text-violet-950/50 hover:bg-fuchsia-50 hover:text-fuchsia-700"><span className="me-2 text-fuchsia-400">{String(index+1).padStart(2,'0')}</span>{section.title[language]}</a></li>)}</ol></div></aside><article className="space-y-5 lg:col-span-8 xl:col-span-9" dir={dir}>{sections.map((section,index)=><section key={section.id} id={section.id} className="scroll-mt-28 rounded-[26px] border border-violet-950/5 bg-white p-6 shadow-sm sm:p-8"><h2 className="mb-5 flex items-baseline gap-3 text-xl font-black text-violet-950 sm:text-2xl"><span className="text-sm text-fuchsia-500">{String(index+1).padStart(2,'0')}</span>{section.title[language]}</h2><div className="prose max-w-none text-sm leading-8 text-violet-950/60 prose-li:my-1 prose-p:my-2 prose-a:text-fuchsia-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-violet-950">{section.body[language]}</div></section>)}</article></div></div></main><SiteFooter/></div>;
}
