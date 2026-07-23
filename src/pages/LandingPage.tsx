import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Building2,
  Check,
  ChartNoAxesCombined,
  Coffee,
  GitCompareArrows,
  Headphones,
  History,
  Hotel,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Mic2,
  Pill,
  Radar,
  Search,
  Sparkles,
  Star,
  Store,
  Tags,
  Target,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';
import { ConsoleShowcase } from '@/components/site/ConsoleShowcase';
import { ResponseStory } from '@/components/site/ResponseStory';
import { SiteAction } from '@/components/site/SiteAction';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import type { LandingLink, LandingSectionBase, LandingTierSnapshot } from '@/content/landing';
import { usePublishedLanding } from '@/contexts/LandingContentContext';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
import { cn } from '@/lib/utils';

const icons: Record<string, LucideIcon> = {
  search: Search,
  sparkles: Sparkles,
  target: Target,
  'map-pin': MapPin,
  'git-compare': GitCompareArrows,
  radar: Radar,
  'message-circle': MessageCircle,
  tags: Tags,
  'wand-sparkles': WandSparkles,
  users: Users,
  history: History,
  'building-2': Building2,
  store: Store,
  'heart-handshake': Headphones,
  'chart-no-axes-combined': ChartNoAxesCombined,
  bot: Bot,
  'brain-circuit': BrainCircuit,
  coffee: Coffee,
  hotel: Hotel,
  pill: Pill,
  messages: MessagesSquare,
};

function FeatureIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = icons[name] || Sparkles;
  return <Icon size={size} strokeWidth={1.9} aria-hidden />;
}

function SectionIntro({ section, callouts = false }: { section: LandingSectionBase; callouts?: boolean }) {
  const { pick, isArabic } = useSiteLanguage();
  return (
    <div className="design-intro">
      <span className="design-eyebrow">{pick(section.eyebrow)}</span>
      <div className="design-intro-heading-row">
        {callouts && <small>{isArabic ? 'ذكاء اصطناعي يفهم عملاءك' : 'AI that understands customers'}</small>}
        <h2>{pick(section.title)}</h2>
        {callouts && <small>{isArabic ? 'قرارات مبنية على بيانات حقيقية' : 'Decisions grounded in real data'}</small>}
      </div>
      {pick(section.body) && <p>{pick(section.body)}</p>}
    </div>
  );
}

function Hero() {
  const { landing } = usePublishedLanding();
  const { pick, isArabic, language } = useSiteLanguage();
  const hero = landing.content.hero;
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const statIcons = [UserRound, Store, ChartNoAxesCombined];
  const metricFormatter = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    maximumFractionDigits: 0,
  });

  return (
    <section id="top" className="design-hero">
      <div className="design-grid design-hero-grid" />
      <div className="design-blob design-blob--hero" />
      <div className="site-container design-hero-inner">
        <div className="design-hero-copy">
          <h1>
            <span>{pick(hero.titlePrefix)}</span>
            <span className="design-hero-line-two">
              {pick(hero.titleSuffix)} <em>{pick(hero.titleHighlight)}</em>
            </span>
          </h1>
          <p>{pick(hero.body)}</p>
          <div className="design-actions">
            <SiteAction link={hero.primaryCta} className="design-button design-button--primary">
              <span>{pick(hero.primaryCta.label)}</span>
              <Arrow size={19} />
            </SiteAction>
            <SiteAction link={hero.secondaryCta} className="design-button design-button--soft" />
          </div>
          <div className="design-stats">
            {hero.stats.map((stat, index) => {
              const Icon = statIcons[index] || Sparkles;
              const value = landing.usageMetrics?.[stat.metric];
              return (
                <div className="design-stat" key={`${pick(stat.label)}-${index}`}>
                  <span className="design-stat-icon"><Icon size={21} /></span>
                  <strong>{value === undefined ? '—' : metricFormatter.format(value)}</strong>
                  <small>{pick(stat.label)}</small>
                </div>
              );
            })}
          </div>
        </div>
        <ConsoleShowcase compact />
      </div>
    </section>
  );
}

function Workflow() {
  const { landing } = usePublishedLanding();
  const { pick } = useSiteLanguage();
  const section = landing.content.workflow;

  return (
    <section id="how-it-works" className="design-section design-workflow">
      <div className="design-grid design-grid--center" />
      <div className="site-container">
        <SectionIntro section={section} />
        <div className="design-workflow-cards">
          {section.steps.map((step, index) => (
            <article key={step.id} className="design-workflow-card">
              <span className="design-workflow-number">0{index + 1}</span>
              <span className="design-icon-bubble"><FeatureIcon name={step.icon} /></span>
              <div>
                <h3>{pick(step.title)}</h3>
                <p>{pick(step.body)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const RESPONSE_STORY_INTRO: LandingSectionBase = {
  enabled: true,
  order: 25,
  eyebrow: { en: 'The magic moment', ar: 'اللحظة السحرية' },
  title: {
    en: 'One click turns a bad review into an on-brand reply',
    ar: 'ضغطة واحدة تحوّل التقييم السلبي إلى رد بأسلوب علامتك',
  },
  body: { en: '', ar: '' },
};

function ResponseStorySection() {
  return (
    <section id="response-story" className="design-section design-response-story">
      <div className="design-grid design-grid--center" />
      <div className="site-container">
        <SectionIntro section={RESPONSE_STORY_INTRO} />
        <ResponseStory />
      </div>
    </section>
  );
}

function Features() {
  const { landing } = usePublishedLanding();
  const { pick } = useSiteLanguage();
  const section = landing.content.features;

  return (
    <section id="features" className="design-section design-features">
      <div className="design-blob design-blob--features" />
      <div className="design-grid design-grid--center" />
      <div className="site-container">
        <SectionIntro section={section} callouts />
        <div className="design-feature-grid">
          {section.items.map((item) => (
            <article key={item.id} className="design-feature-card">
              <span className="design-icon-bubble"><FeatureIcon name={item.icon} /></span>
              <h3>{pick(item.title)}</h3>
              <p>{pick(item.body)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience() {
  const { landing } = usePublishedLanding();
  const { pick } = useSiteLanguage();
  const section = landing.content.audience;

  return (
    <section id="audience" className="design-section design-audience">
      <div className="site-container design-audience-grid">
        <div className="design-audience-visual">
          <div className="design-audience-collage">
            <span className="design-audience-glow" aria-hidden="true" />
            <img
              className="design-audience-shot design-audience-shot--dashboard"
              src={pick({ en: '/assets/qrar-audience-dashboard-en.webp', ar: '/assets/qrar-audience-dashboard-ar.webp' })}
              alt={pick({ en: 'Qrar dashboard showing rating and sentiment trends over time', ar: 'لوحة قرار تعرض اتجاهات التقييم والانطباعات عبر الزمن' })}
              width={1000}
              height={652}
              loading="lazy"
              decoding="async"
            />
            <img
              className="design-audience-shot design-audience-shot--reputation"
              src={pick({ en: '/assets/qrar-audience-reputation-en.webp', ar: '/assets/qrar-audience-reputation-ar.webp' })}
              alt={pick({ en: 'Qrar reputation health score', ar: 'مؤشر السمعة في قرار' })}
              width={780}
              height={337}
              loading="lazy"
              decoding="async"
            />
            <img
              className="design-audience-shot design-audience-shot--chat"
              src="/assets/qrar-audience-chat.webp"
              alt={pick({ en: 'Conversation with Najd, Qrar’s smart assistant', ar: 'محادثة مع نجد، مساعد قرار الذكي' })}
              width={420}
              height={478}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="design-audience-copy">
          <span className="design-eyebrow">{pick(section.eyebrow)}</span>
          <h2>{pick(section.title)}</h2>
          {pick(section.body) && <p className="design-audience-lead">{pick(section.body)}</p>}
          <div className="design-audience-list">
            {section.items.map((item, index) => {
              const audienceIcons = [Coffee, Building2, Hotel, Pill, WalletCards];
              const Icon = icons[item.icon] || audienceIcons[index] || Store;
              return (
                <div key={item.id} className="design-audience-item">
                  <span><Icon size={27} /></span>
                  <div><h3>{pick(item.title)}</h3><p>{pick(item.body)}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function tierAction(tier: LandingTierSnapshot): LandingLink {
  if (tier.cta.kind === 'contact') {
    return {
      label: tier.cta.label,
      kind: 'mailto',
      value: `sales@qrar.ai?subject=${encodeURIComponent(`Qrar ${tier.name.en} plan`)}`,
    };
  }
  return { label: tier.cta.label, kind: tier.cta.kind, value: '' };
}

function PricingCard({ tier, yearly }: { tier: LandingTierSnapshot; yearly: boolean }) {
  const { landing } = usePublishedLanding();
  const { pick, language, isArabic } = useSiteLanguage();
  const section = landing.content.pricing;
  const custom = pick(tier.customPriceLabel);
  const monthlyEquivalent = tier.priceYearly > 0 ? tier.priceYearly / 12 : 0;
  const shownPrice = yearly && tier.priceYearly > 0 ? monthlyEquivalent : tier.priceMonthly;
  const formatter = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', { maximumFractionDigits: 0 });
  const saving = tier.priceMonthly > 0 && tier.priceYearly > 0
    ? Math.max(0, Math.round((1 - tier.priceYearly / (tier.priceMonthly * 12)) * 100))
    : 0;

  return (
    <article className={cn('design-price-card', tier.featured && 'design-price-card--featured')}>
      <div className="design-price-heading">
        <span>
          {pick(tier.name)}
          {(pick(tier.badge) || tier.featured) && (
            <span className="design-price-badge"><Star size={13} fill="currentColor" />{pick(tier.badge) || (isArabic ? 'الأكثر شيوعاً' : 'Most popular')}</span>
          )}
        </span>
        {custom ? <strong className="design-price-custom">{custom}</strong> : (
          <strong><b>{formatter.format(shownPrice)}</b> {tier.currency}<small>{pick(section.perMonthLabel)}</small></strong>
        )}
        <p>{pick(tier.description)}</p>
        {yearly && saving > 0 && <em>{pick(section.savingsLabel).replace('{percent}', String(saving))}</em>}
      </div>
      <ul>
        {tier.features.map((feature, index) => (
          <li key={`${tier.id}-${index}`}><span><Check size={12} strokeWidth={3} /></span>{pick(feature)}</li>
        ))}
      </ul>
      <SiteAction
        link={tierAction(tier)}
        className={cn('design-price-action', tier.featured && 'design-price-action--featured')}
      />
    </article>
  );
}

function Pricing() {
  const { landing } = usePublishedLanding();
  const { pick, isArabic } = useSiteLanguage();
  const [yearly, setYearly] = useState(false);
  const section = landing.content.pricing;
  const primary = landing.tiers.slice(0, 4);
  const extended = landing.tiers.slice(4);
  const primaryGridClass = primary.length >= 4
    ? 'design-pricing-grid--4'
    : primary.length === 3
      ? 'design-pricing-grid--3'
      : primary.length === 2
        ? 'design-pricing-grid--2'
        : 'design-pricing-grid--1';

  return (
    <section id="pricing" className="design-section design-pricing">
      <div className="design-blob design-blob--pricing" />
      <div className="site-container">
        <SectionIntro section={section} />
        <div className="design-billing-toggle" role="group" aria-label={isArabic ? 'دورة الفوترة' : 'Billing cycle'}>
          <button type="button" className={cn(!yearly && 'is-active')} onClick={() => setYearly(false)}>{pick(section.monthlyLabel)}</button>
          <button type="button" className={cn(yearly && 'is-active')} onClick={() => setYearly(true)}>
            {pick(section.yearlyLabel)} <small>{pick(section.savingsLabel).replace('{percent}', '20')}</small>
          </button>
        </div>
        {primary.length > 0 ? (
          <>
            <div className={cn('design-pricing-grid', primaryGridClass)}>
              {primary.map((tier) => <PricingCard key={tier.id} tier={tier} yearly={yearly} />)}
            </div>
            {extended.length > 0 && (
              <div className="design-pricing-extended">
                <h3>{isArabic ? 'خطط أخرى للمؤسسات وكبار الشركات' : 'Additional plans for enterprises and agencies'}</h3>
                <div className={cn('design-pricing-grid design-pricing-grid--extended', extended.length === 1 && 'design-pricing-grid--single')}>
                  {extended.map((tier) => <PricingCard key={tier.id} tier={tier} yearly={yearly} />)}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="design-pricing-empty">
            <Sparkles size={28} />
            <strong>{isArabic ? 'الباقات قيد الإعداد' : 'Plans are being prepared'}</strong>
            <p>{isArabic ? 'ستظهر الباقات هنا فور نشرها من إدارة قرار.' : 'Plans will appear here as soon as Qrar administrators publish them.'}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Testimonials() {
  const { landing } = usePublishedLanding();
  const { pick, isArabic } = useSiteLanguage();
  const section = landing.content.testimonials;
  const cards = section.items.length > 0 ? [...section.items, ...section.items].slice(0, 6) : [];

  return (
    <section id="testimonials" className="design-section design-testimonials">
      <div className="site-container design-testimonial-grid">
        <div className="design-testimonial-copy">
          <span className="design-eyebrow">{pick(section.eyebrow)}</span>
          <h2>{pick(section.title)}</h2>
          <p>{pick(section.body)}</p>
          <SiteAction link={{ label: { en: 'Start free — no credit card', ar: 'ابدأ مجاناً — لا يحتاج بطاقة ائتمان' }, kind: 'signup', value: '' }} className="design-button design-button--primary" />
        </div>
        <div className="design-testimonial-wall" aria-label={isArabic ? 'شهادات العملاء' : 'Customer testimonials'}>
          {cards.map((item, index) => (
            <figure key={`${item.id}-${index}`}>
              <div className="design-stars">{Array.from({ length: 5 }).map((_, star) => <Star key={star} size={15} fill="currentColor" />)}</div>
              <blockquote>“{pick(item.quote)}”</blockquote>
              <figcaption><span><UserRound size={17} /></span><div><strong>{pick(item.name)}</strong><small>{pick(item.role)}</small></div></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Najd() {
  const { landing } = usePublishedLanding();
  const { pick } = useSiteLanguage();
  const section = landing.content.najd;

  return (
    <section id="najd" className="design-section design-najd">
      <div className="design-grid design-grid--najd" />
      <div className="design-blob design-blob--najd" />
      <div className="site-container design-najd-inner">
        <img src={section.imageUrl} alt={pick(section.imageAlt)} />
        <span className="design-eyebrow">{pick(section.eyebrow)}</span>
        <h2>{pick(section.title)}</h2>
        <p>{pick(section.body)}</p>
        <div className="design-najd-prompts">
          {section.bullets.map((bullet, index) => <span key={index}>{pick(bullet)}</span>)}
        </div>
        <SiteAction link={section.cta} className="design-button design-button--primary"><Mic2 size={18} /><span>{pick(section.cta.label)}</span></SiteAction>
      </div>
    </section>
  );
}

function FinalCall() {
  const { landing } = usePublishedLanding();
  const { pick, isArabic } = useSiteLanguage();
  const section = landing.content.finalCta;

  return (
    <section id="start" className="design-section design-final">
      <div className="design-blob design-blob--final" />
      <div className="site-container">
        <div className="design-final-card">
          <div className="design-final-copy">
            <span className="design-eyebrow">{pick(section.eyebrow)}</span>
            <h2>{pick(section.title)}</h2>
            <p>{pick(section.body)}</p>
            <div className="design-actions">
              <SiteAction link={section.primaryCta} className="design-button design-button--primary" />
              <SiteAction link={section.secondaryCta} className="design-button design-button--soft" />
            </div>
            <span className="design-credit-note"><WalletCards size={20} />{isArabic ? 'لا يحتاج بطاقة ائتمان — ابدأ في ثوانٍ' : 'No credit card required — start in seconds'}</span>
          </div>
          <ConsoleShowcase compact />
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const { landing, source, previewMode } = usePublishedLanding();
  const { language, pick, isArabic } = useSiteLanguage();

  useEffect(() => {
    document.title = pick(landing.content.seo.title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', pick(landing.content.seo.description));
  }, [landing.content.seo, language, pick]);

  const sections = useMemo<Array<{ key: string; enabled: boolean; order: number; node: ReactNode }>>(() => [
    { key: 'hero', enabled: landing.content.hero.enabled, order: landing.content.hero.order, node: <Hero /> },
    { key: 'workflow', enabled: landing.content.workflow.enabled, order: landing.content.workflow.order, node: <Workflow /> },
    { key: 'responseStory', enabled: true, order: 25, node: <ResponseStorySection /> },
    { key: 'features', enabled: landing.content.features.enabled, order: landing.content.features.order, node: <Features /> },
    { key: 'audience', enabled: landing.content.audience.enabled, order: landing.content.audience.order, node: <Audience /> },
    { key: 'pricing', enabled: landing.content.pricing.enabled, order: landing.content.pricing.order, node: <Pricing /> },
    { key: 'testimonials', enabled: landing.content.testimonials.enabled, order: landing.content.testimonials.order, node: <Testimonials /> },
    { key: 'najd', enabled: landing.content.najd.enabled, order: landing.content.najd.order, node: <Najd /> },
    { key: 'final', enabled: landing.content.finalCta.enabled, order: landing.content.finalCta.order, node: <FinalCall /> },
  ].filter((item) => item.enabled).sort((a, b) => a.order - b.order), [landing]);

  return (
    <div className="design-page">
      {previewMode && (
        <div className="design-preview-banner">
          {source === 'preview'
            ? (isArabic ? 'معاينة مسودة — غير منشورة' : 'Draft preview — not published')
            : (isArabic ? 'بانتظار بيانات المعاينة من المنصة' : 'Waiting for preview data from Console')}
        </div>
      )}
      <div className={previewMode ? 'design-preview-offset' : undefined}>
        <SiteHeader />
        <main>{sections.map((section) => <div key={section.key}>{section.node}</div>)}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
