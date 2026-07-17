import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, BarChart3, Building2, ChartNoAxesCombined, Check,
  CircleGauge, Clock3, GitCompareArrows, HeartHandshake, History, MapPin,
  MessageCircle, Mic2, Quote, Radar, Search, Sparkles, Store, Tags, Target,
  TrendingUp, Users, WandSparkles,
} from 'lucide-react';
import { SiteAction } from '@/components/site/SiteAction';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import type { LandingLink, LandingSectionBase, LandingTierSnapshot } from '@/content/landing';
import { usePublishedLanding } from '@/contexts/LandingContentContext';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
import { cn } from '@/lib/utils';

const icons = {
  search: Search, sparkles: Sparkles, target: Target, 'map-pin': MapPin,
  'git-compare': GitCompareArrows, radar: Radar, 'message-circle': MessageCircle,
  tags: Tags, 'wand-sparkles': WandSparkles, users: Users, history: History,
  'building-2': Building2, store: Store, 'heart-handshake': HeartHandshake,
  'chart-no-axes-combined': ChartNoAxesCombined,
};

function FeatureIcon({ name }: { name: string }) {
  const Icon = icons[name as keyof typeof icons] || Sparkles;
  return <Icon className="h-6 w-6" aria-hidden />;
}

function Intro({ section, start = false }: { section: LandingSectionBase; start?: boolean }) {
  const { pick } = useSiteLanguage();
  return <div className={cn('max-w-3xl', !start && 'mx-auto text-center')}><span className="section-eyebrow">{pick(section.eyebrow)}</span><h2 className="section-title mt-5">{pick(section.title)}</h2><p className="section-copy mt-5">{pick(section.body)}</p></div>;
}

function ConsolePreview() {
  const { isArabic } = useSiteLanguage();
  return (
    <div className="relative mx-auto w-full max-w-[660px]" aria-label={isArabic ? 'معاينة توضيحية لمنصة قرار' : 'Illustrative Qrar Console preview'}>
      <div className="absolute -inset-12 -z-10 rounded-full bg-fuchsia-400/25 blur-[80px]" />
      <div className="overflow-hidden rounded-[30px] border border-white/80 bg-white/90 p-3 shadow-[0_36px_100px_-28px_rgba(71,34,98,.42)] backdrop-blur-xl sm:p-4">
        <div className="flex items-center justify-between rounded-[20px] border border-violet-950/5 bg-[#faf8fd] px-4 py-3">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ae50ed] text-white"><MapPin className="h-4 w-4" /></span><div><div className="h-2.5 w-24 rounded-full bg-violet-950/75" /><div className="mt-2 h-1.5 w-16 rounded-full bg-violet-950/15" /></div></div>
          <div className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-emerald-400" /><i className="h-2 w-2 rounded-full bg-amber-300" /><i className="h-2 w-2 rounded-full bg-fuchsia-400" /></div>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[124px_1fr]">
          <aside className="hidden rounded-[20px] bg-[#241533] p-3 sm:block"><div className="mb-5 grid h-9 w-9 place-items-center rounded-xl bg-white/10"><i className="h-4 w-4 rotate-45 rounded-[3px] bg-fuchsia-400" /></div>{[1,2,3,4,5].map((item) => <div key={item} className={cn('mb-3 h-2 rounded-full', item === 1 ? 'w-20 bg-fuchsia-300/80' : 'w-16 bg-white/15')} />)}</aside>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2.5">{[
              ['84%', isArabic ? 'مشاعر إيجابية' : 'Positive sentiment', 'bg-emerald-50 text-emerald-700'],
              ['4.6', isArabic ? 'صحة السمعة' : 'Reputation', 'bg-amber-50 text-amber-700'],
              ['+12%', isArabic ? 'اتجاه التحسن' : 'Improvement', 'bg-fuchsia-50 text-fuchsia-700'],
            ].map(([value,label,color]) => <div key={label} className="rounded-2xl border border-violet-950/5 bg-white p-3"><strong className={cn('inline-flex rounded-lg px-2 py-1 text-sm font-black', color)}>{value}</strong><p className="mt-2 truncate text-[9px] font-bold text-violet-950/40 sm:text-[10px]">{label}</p></div>)}</div>
            <div className="grid gap-3 sm:grid-cols-[1.35fr_.8fr]">
              <div className="rounded-2xl border border-violet-950/5 bg-white p-4"><div className="flex justify-between text-[11px] font-bold text-violet-950"><span>{isArabic ? 'أبرز المواضيع' : 'Top themes'}</span><BarChart3 className="h-4 w-4 text-fuchsia-500" /></div><div className="mt-4 flex h-24 items-end gap-2">{[42,68,54,86,64,94,76].map((height,index) => <i key={index} className="flex-1 rounded-t-md bg-gradient-to-t from-[#7e35af] to-[#d79af7]" style={{ height: `${height}%` }} />)}</div></div>
              <div className="rounded-2xl bg-[#f2e6fb] p-4"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-fuchsia-600"><WandSparkles className="h-4 w-4" /></span><p className="mt-3 text-[11px] font-bold text-violet-950">{isArabic ? 'توصية ذكية' : 'AI recommendation'}</p><div className="mt-3 space-y-2"><i className="block h-1.5 rounded-full bg-violet-950/15" /><i className="block h-1.5 w-4/5 rounded-full bg-violet-950/10" /><i className="block h-1.5 w-3/5 rounded-full bg-violet-950/10" /></div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -end-3 -top-6 hidden items-center gap-2 rounded-2xl border border-white bg-white px-3 py-2 text-xs font-bold text-violet-950 shadow-xl sm:flex"><Sparkles className="h-4 w-4 text-fuchsia-500" />{isArabic ? 'رؤى مدعومة بالأدلة' : 'Evidence-backed insight'}</div>
      <div className="absolute -bottom-5 -start-5 hidden items-center gap-2 rounded-2xl bg-[#241533] px-4 py-3 text-xs font-bold text-white shadow-xl sm:flex"><CircleGauge className="h-4 w-4 text-fuchsia-300" />{isArabic ? 'وضوح في كل مؤشر' : 'Clarity in every metric'}</div>
    </div>
  );
}

function Hero() {
  const { landing } = usePublishedLanding();
  const { pick, isArabic } = useSiteLanguage();
  const hero = landing.content.hero;
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  return <section id="top" className="relative overflow-hidden pb-24 pt-36 sm:pt-40 lg:min-h-[850px] lg:pb-28 lg:pt-44"><div className="hero-grid absolute inset-0 opacity-60" /><div className="absolute -start-40 top-20 h-[520px] w-[520px] rounded-full bg-fuchsia-300/20 blur-[110px]" /><div className="site-container relative"><div className="grid items-center gap-16 lg:grid-cols-[.92fr_1.08fr] xl:gap-20"><div className="text-center lg:text-start"><span className="section-eyebrow"><Sparkles className="h-4 w-4" />{pick(hero.eyebrow)}</span><h1 className="mt-7 text-balance text-[clamp(3rem,6vw,6.15rem)] font-black leading-[.98] tracking-[-.045em] text-[#201331]">{pick(hero.titlePrefix)} <span className="relative text-[#ae50ed]">{pick(hero.titleHighlight)}<svg className="absolute -bottom-2 start-0 h-3 w-full" viewBox="0 0 320 12" preserveAspectRatio="none" aria-hidden><path d="M3 8.5C77 1.5 212 1 317 7" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".3" /></svg></span> {pick(hero.titleSuffix)}</h1><p className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-9 text-violet-950/60 lg:mx-0 lg:text-xl">{pick(hero.body)}</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"><SiteAction link={hero.primaryCta} className="brand-button h-14 px-8 text-base"><span>{pick(hero.primaryCta.label)}</span><Arrow className="h-5 w-5" /></SiteAction><SiteAction link={hero.secondaryCta} className="secondary-button h-14 px-8 text-base" /></div><div className="mt-12 grid grid-cols-3 divide-x divide-violet-950/10 rtl:divide-x-reverse">{hero.stats.map((stat,index) => <div key={index} className="px-2 lg:px-5"><strong className="block text-xl font-black text-violet-950 sm:text-2xl">{pick(stat.value)}</strong><span className="mt-1 block text-[11px] leading-5 text-violet-950/40 sm:text-xs">{pick(stat.label)}</span></div>)}</div></div><ConsolePreview /></div></div></section>;
}

function Workflow() {
  const { landing } = usePublishedLanding(); const { pick } = useSiteLanguage(); const section = landing.content.workflow;
  return <section id="how-it-works" className="section-space bg-white"><div className="site-container"><Intro section={section} /><div className="relative mt-16 grid gap-5 lg:grid-cols-3"><div className="absolute left-[16%] right-[16%] top-12 hidden border-t-2 border-dashed border-fuchsia-200 lg:block" />{section.steps.map((step,index) => <article key={step.id} className="relative rounded-[28px] border border-violet-950/5 bg-[#fcfaff] p-7 text-center transition hover:-translate-y-1 hover:border-fuchsia-300"><span className="absolute end-5 top-5 text-4xl font-black text-fuchsia-200/70">0{index+1}</span><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#ae50ed] text-white shadow-xl"><FeatureIcon name={step.icon} /></div><h3 className="mt-6 text-xl font-black text-violet-950">{pick(step.title)}</h3><p className="mt-3 text-sm leading-7 text-violet-950/50">{pick(step.body)}</p></article>)}</div></div></section>;
}

function Features() {
  const { landing } = usePublishedLanding(); const { pick } = useSiteLanguage(); const section = landing.content.features;
  return <section id="features" className="section-space bg-[#f7f0fc]"><div className="site-container"><Intro section={section} /><div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{section.items.map((item) => <article key={item.id} className="group relative overflow-hidden rounded-[26px] border border-white bg-white/85 p-6 shadow-[0_18px_50px_-38px_rgba(63,26,91,.5)] transition hover:-translate-y-1 hover:bg-white"><div className="absolute -end-10 -top-10 h-28 w-28 rounded-full bg-fuchsia-200/30 blur-2xl" /><div className="relative grid h-13 w-13 place-items-center rounded-2xl bg-[#f1dffb] text-[#8d3abd]"><FeatureIcon name={item.icon} /></div><h3 className="relative mt-5 text-xl font-black text-violet-950">{pick(item.title)}</h3><p className="relative mt-3 text-sm leading-7 text-violet-950/50">{pick(item.body)}</p></article>)}</div></div></section>;
}

function Audience() {
  const { landing } = usePublishedLanding(); const { pick } = useSiteLanguage(); const section = landing.content.audience;
  return <section id="audience" className="section-space bg-white"><div className="site-container"><div className="overflow-hidden rounded-[36px] bg-[#241533] text-white shadow-[0_35px_90px_-45px_rgba(44,21,63,.8)]"><div className="grid items-end lg:grid-cols-[1.05fr_.95fr]"><div className="p-8 sm:p-12 lg:p-16"><span className="section-eyebrow border-white/15 bg-white/10 text-fuchsia-200">{pick(section.eyebrow)}</span><h2 className="mt-6 text-balance text-3xl font-black leading-tight sm:text-5xl">{pick(section.title)}</h2><p className="mt-5 text-base leading-8 text-white/60">{pick(section.body)}</p><div className="mt-9 space-y-4">{section.items.map((item) => <div key={item.id} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[.06] p-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-fuchsia-400/15 text-fuchsia-200"><FeatureIcon name={item.icon} /></div><div><h3 className="font-bold">{pick(item.title)}</h3><p className="mt-1 text-sm leading-6 text-white/50">{pick(item.body)}</p></div></div>)}</div></div><div className="relative min-h-[440px] self-stretch bg-[radial-gradient(circle_at_50%_45%,rgba(190,101,244,.45),transparent_48%)] lg:min-h-[620px]"><div className="absolute bottom-8 end-8 top-14 w-[78%] rounded-[999px_999px_40px_40px] bg-gradient-to-b from-[#c982f4] via-[#9650bd] to-[#4a2a60] opacity-70" />{section.imageUrl && <img src={section.imageUrl} alt={pick(section.imageAlt)} className="absolute bottom-0 end-[4%] z-10 max-h-[94%] max-w-[92%] object-contain object-bottom drop-shadow-2xl" onError={(event) => { event.currentTarget.style.display='none'; }} />}<div className="absolute end-6 top-12 z-20 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold backdrop-blur-lg"><TrendingUp className="me-2 inline h-4 w-4 text-fuchsia-200" />{pick(section.items[0]?.title || {en:'Customer insight',ar:'رؤى العملاء'})}</div></div></div></div></div></section>;
}

function tierAction(tier: LandingTierSnapshot): LandingLink {
  if (tier.cta.kind === 'contact') return { label: tier.cta.label, kind: 'mailto', value: `hello@qrar.ai?subject=${encodeURIComponent(`Qrar ${tier.name.en} plan`)}` };
  return { label: tier.cta.label, kind: tier.cta.kind, value: '' };
}

function Pricing() {
  const { landing } = usePublishedLanding(); const { pick, language, isArabic } = useSiteLanguage(); const [yearly,setYearly] = useState(false); const section = landing.content.pricing;
  const number = (value:number) => new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US',{maximumFractionDigits:2}).format(value);
  return <section id="pricing" className="section-space bg-[#fbf8fd]"><div className="site-container"><Intro section={section} /><div className="mx-auto mt-9 flex w-fit rounded-full border border-violet-950/10 bg-white p-1.5"><button className={cn('rounded-full px-6 py-2.5 text-sm font-bold',!yearly?'bg-violet-950 text-white':'text-violet-950/50')} onClick={() => setYearly(false)}>{pick(section.monthlyLabel)}</button><button className={cn('rounded-full px-6 py-2.5 text-sm font-bold',yearly?'bg-violet-950 text-white':'text-violet-950/50')} onClick={() => setYearly(true)}>{pick(section.yearlyLabel)}</button></div>{landing.tiers.length===0?<div className="mx-auto mt-12 max-w-xl rounded-[28px] border border-dashed border-fuchsia-300 bg-white p-10 text-center"><Clock3 className="mx-auto text-fuchsia-500" /><h3 className="mt-4 text-xl font-black text-violet-950">{isArabic?'الباقات قيد الإعداد':'Plans are being prepared'}</h3><p className="mt-2 text-sm leading-7 text-violet-950/50">{isArabic?'ستظهر الأسعار هنا بعد اعتمادها ونشرها من إدارة قرار.':'Pricing will appear after it is approved and published by Qrar administrators.'}</p></div>:<div className={cn('mx-auto mt-14 grid max-w-6xl gap-5',landing.tiers.length===1?'max-w-md':landing.tiers.length===2?'max-w-4xl md:grid-cols-2':'md:grid-cols-2 lg:grid-cols-3')}>{landing.tiers.map((tier) => {const custom=pick(tier.customPriceLabel); const free=!tier.priceMonthly&&!tier.priceYearly&&!custom; const saving=tier.priceMonthly>0&&tier.priceYearly>0?Math.max(0,Math.round((1-tier.priceYearly/(tier.priceMonthly*12))*100)):0; return <article key={tier.id} className={cn('relative flex flex-col rounded-[30px] border bg-white p-7 shadow-[0_22px_65px_-42px_rgba(62,25,88,.55)]',tier.featured?'border-fuchsia-400 ring-4 ring-fuchsia-100 lg:-translate-y-3':'border-violet-950/10')}>{(pick(tier.badge)||tier.featured)&&<span className="absolute -top-3 start-7 rounded-full bg-[#ae50ed] px-4 py-1.5 text-xs font-bold text-white">{pick(tier.badge)||(isArabic?'مميز':'Featured')}</span>}<h3 className="text-2xl font-black text-violet-950">{pick(tier.name)}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-violet-950/50">{pick(tier.description)}</p><div className="mt-7 border-y border-violet-950/5 py-6">{custom?<strong className="text-3xl font-black text-violet-950">{custom}</strong>:free?<strong className="text-4xl font-black text-violet-950">{pick(section.freeLabel)}</strong>:yearly?<div><div className="flex items-baseline gap-2"><strong className="text-4xl font-black text-violet-950">{number(tier.priceYearly)}</strong><span className="text-sm font-bold text-violet-950/40">{tier.currency} {pick(section.perYearLabel)}</span></div><p className="mt-2 text-xs text-violet-950/40">{number(tier.priceYearly/12)} {tier.currency} {pick(section.perMonthLabel)} · {pick(section.billedYearlyLabel)}</p>{saving>0&&<span className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{pick(section.savingsLabel).replace('{percent}',String(saving))}</span>}</div>:<div className="flex items-baseline gap-2"><strong className="text-4xl font-black text-violet-950">{number(tier.priceMonthly)}</strong><span className="text-sm font-bold text-violet-950/40">{tier.currency} {pick(section.perMonthLabel)}</span></div>}</div><ul className="my-7 flex-1 space-y-3">{tier.features.map((feature,index)=><li key={index} className="flex items-start gap-3 text-sm leading-6 text-violet-950/60"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-fuchsia-100 text-fuchsia-700"><Check className="h-3 w-3" /></span>{pick(feature)}</li>)}</ul><SiteAction link={tierAction(tier)} className={cn('h-12 justify-center',tier.featured?'brand-button':'secondary-button')} /></article>;})}</div>}</div></section>;
}

function Testimonials() {
  const { landing }=usePublishedLanding(); const { pick }=useSiteLanguage(); const section=landing.content.testimonials;
  return <section id="testimonials" className="section-space bg-white"><div className="site-container"><Intro section={section}/><div className="mt-14 grid gap-5 lg:grid-cols-3">{section.items.map((item)=><figure key={item.id} className="rounded-[28px] border border-violet-950/5 bg-[#fbf8fd] p-7"><Quote className="h-8 w-8 fill-fuchsia-100 text-fuchsia-500"/><blockquote className="mt-5 text-base leading-8 text-violet-950/70">“{pick(item.quote)}”</blockquote><figcaption className="mt-7 border-t border-violet-950/5 pt-5"><strong className="block text-sm text-violet-950">{pick(item.name)}</strong><span className="mt-1 block text-xs text-violet-950/40">{pick(item.role)}</span></figcaption></figure>)}</div></div></section>;
}

function Najd() {
  const { landing }=usePublishedLanding(); const { pick,isArabic }=useSiteLanguage(); const section=landing.content.najd; const Arrow=isArabic?ArrowLeft:ArrowRight;
  return <section id="najd" className="section-space bg-[#f5e9fb]"><div className="site-container"><div className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-[#241533] via-[#3a1c50] to-[#6e2b91] px-7 py-12 text-white sm:px-12 lg:px-16 lg:py-16"><div className="absolute -end-20 -top-20 h-96 w-96 rounded-full border-[70px] border-white/[.04]"/><div className="grid items-center gap-12 lg:grid-cols-[1fr_.78fr]"><div className="relative z-10"><span className="section-eyebrow border-white/10 bg-white/10 text-fuchsia-200"><Mic2 className="h-4 w-4"/>{pick(section.eyebrow)}</span><h2 className="mt-6 text-balance text-4xl font-black leading-tight sm:text-5xl">{pick(section.title)}</h2><p className="mt-5 text-base leading-8 text-white/60">{pick(section.body)}</p><ul className="mt-8 space-y-3">{section.bullets.map((bullet,index)=><li key={index} className="flex items-center gap-3 text-sm text-white/80"><span className="grid h-6 w-6 place-items-center rounded-full bg-fuchsia-400/20"><Check className="h-3.5 w-3.5"/></span>{pick(bullet)}</li>)}</ul><SiteAction link={section.cta} className="mt-9 inline-flex h-13 items-center gap-2 rounded-full bg-white px-7 font-bold text-violet-950 transition hover:-translate-y-0.5"><span>{pick(section.cta.label)}</span><Arrow className="h-4 w-4"/></SiteAction></div><div className="relative mx-auto w-full max-w-sm"><div className="absolute inset-10 rounded-full bg-fuchsia-400/45 blur-[70px]"/>{section.imageUrl&&<img src={section.imageUrl} alt={pick(section.imageAlt)} className="relative z-10 w-full drop-shadow-2xl" onError={(event)=>{event.currentTarget.style.display='none';}}/>}</div></div></div></div></section>;
}

function FinalCall() {
  const { landing }=usePublishedLanding(); const { pick,isArabic }=useSiteLanguage(); const section=landing.content.finalCta; const Arrow=isArabic?ArrowLeft:ArrowRight;
  return <section id="start" className="section-space bg-white"><div className="site-container"><div className="relative overflow-hidden rounded-[38px] border border-fuchsia-200 bg-[#fbf5ff] px-7 py-16 text-center lg:py-24"><div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300/35 blur-[90px]"/><div className="relative mx-auto max-w-3xl"><span className="section-eyebrow">{pick(section.eyebrow)}</span><h2 className="mt-6 text-balance text-4xl font-black leading-tight text-violet-950 sm:text-6xl">{pick(section.title)}</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-violet-950/50">{pick(section.body)}</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><SiteAction link={section.primaryCta} className="brand-button h-14 px-8"><span>{pick(section.primaryCta.label)}</span><Arrow className="h-5 w-5"/></SiteAction><SiteAction link={section.secondaryCta} className="secondary-button h-14 px-8"/></div></div></div></div></section>;
}

export default function LandingPage() {
  const { landing,source,previewMode }=usePublishedLanding(); const { language,pick,isArabic }=useSiteLanguage();
  useEffect(()=>{document.title=pick(landing.content.seo.title); document.querySelector('meta[name="description"]')?.setAttribute('content',pick(landing.content.seo.description));},[landing.content.seo,language,pick]);
  const sections=useMemo<Array<{key:string;enabled:boolean;order:number;node:ReactNode}>>(()=>[
    {key:'hero',enabled:landing.content.hero.enabled,order:landing.content.hero.order,node:<Hero/>},
    {key:'workflow',enabled:landing.content.workflow.enabled,order:landing.content.workflow.order,node:<Workflow/>},
    {key:'features',enabled:landing.content.features.enabled,order:landing.content.features.order,node:<Features/>},
    {key:'audience',enabled:landing.content.audience.enabled,order:landing.content.audience.order,node:<Audience/>},
    {key:'pricing',enabled:landing.content.pricing.enabled,order:landing.content.pricing.order,node:<Pricing/>},
    {key:'testimonials',enabled:landing.content.testimonials.enabled,order:landing.content.testimonials.order,node:<Testimonials/>},
    {key:'najd',enabled:landing.content.najd.enabled,order:landing.content.najd.order,node:<Najd/>},
    {key:'final',enabled:landing.content.finalCta.enabled,order:landing.content.finalCta.order,node:<FinalCall/>},
  ].filter((item)=>item.enabled).sort((a,b)=>a.order-b.order),[landing]);
  return <div className="min-h-screen bg-[#fbf8fd]">{previewMode&&<div className="fixed inset-x-0 top-0 z-[70] bg-amber-300 px-4 py-1.5 text-center text-xs font-black text-amber-950">{source==='preview'?(isArabic?'معاينة مسودة — غير منشورة':'Draft preview — not published'):(isArabic?'بانتظار بيانات المعاينة من المنصة':'Waiting for preview data from Console')}</div>}<div className={previewMode?'pt-7':''}><SiteHeader/><main>{sections.map((section)=><div key={section.key}>{section.node}</div>)}</main><SiteFooter/></div></div>;
}
