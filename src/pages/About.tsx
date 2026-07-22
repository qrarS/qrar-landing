import { useEffect, type ComponentType } from 'react';
import {
  ArrowUpLeft,
  ArrowUpRight,
  Languages,
  ListChecks,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  type LucideProps,
} from 'lucide-react';
import { SiteAction } from '@/components/site/SiteAction';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import qrarMark from '@/assets/qrar-mark-dark.svg';
import { usePublishedLanding } from '@/contexts/LandingContentContext';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';

const valueIcons: Record<string, ComponentType<LucideProps>> = {
  'search-check': SearchCheck,
  languages: Languages,
  'list-checks': ListChecks,
  'shield-check': ShieldCheck,
};

export default function About() {
  const { landing, source, previewMode } = usePublishedLanding();
  const { language, pick, isArabic } = useSiteLanguage();
  const about = landing.content.about;
  const Arrow = isArabic ? ArrowUpLeft : ArrowUpRight;

  useEffect(() => {
    document.title = pick(about.seo.title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', pick(about.seo.description));
  }, [about.seo, language, pick]);

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
        <main className="about-page">
          <section className="about-hero">
            <div className="site-container about-hero-grid">
              <div className="about-hero-copy">
                <span className="design-eyebrow">{pick(about.hero.eyebrow)}</span>
                <h1>{pick(about.hero.title)}</h1>
                <p>{pick(about.hero.body)}</p>
              </div>
              <div className="about-hero-art" aria-hidden="true">
                <div className="about-orbit about-orbit--outer" />
                <div className="about-orbit about-orbit--inner" />
                <div className="about-hero-mark"><img src={qrarMark} alt="" /></div>
                <span className="about-signal about-signal--one"><SearchCheck /></span>
                <span className="about-signal about-signal--two"><Languages /></span>
                <span className="about-signal about-signal--three"><ListChecks /></span>
              </div>
            </div>
          </section>

          <section className="about-mission">
            <div className="site-container about-mission-grid">
              <div className="about-mission-art" aria-hidden="true">
                <span className="about-mission-glow" />
                <div className="about-evidence-card about-evidence-card--first">
                  <span /><span /><span />
                </div>
                <div className="about-evidence-card about-evidence-card--second">
                  <Sparkles />
                  <span /><span />
                </div>
              </div>
              <div className="about-mission-copy">
                <span className="design-eyebrow">{pick(about.mission.eyebrow)}</span>
                <h2>{pick(about.mission.title)}</h2>
                <p>{pick(about.mission.body)}</p>
              </div>
            </div>
          </section>

          <section className="about-values">
            <div className="site-container">
              <div className="design-intro about-values-intro">
                <span className="design-eyebrow">{pick(about.values.eyebrow)}</span>
                <h2>{pick(about.values.title)}</h2>
                {pick(about.values.body) && <p>{pick(about.values.body)}</p>}
              </div>
              <div className="about-values-grid">
                {about.values.items.map((item) => {
                  const Icon = valueIcons[item.icon] ?? Sparkles;
                  return (
                    <article className="about-value-card" key={item.id}>
                      <span className="about-value-icon"><Icon /></span>
                      <h3>{pick(item.title)}</h3>
                      <p>{pick(item.body)}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="design-final about-final">
            <div className="site-container">
              <div className="design-final-card about-final-card">
                <div className="design-final-copy">
                  <span className="design-eyebrow">{pick(about.finalCta.eyebrow)}</span>
                  <h2>{pick(about.finalCta.title)}</h2>
                  <p>{pick(about.finalCta.body)}</p>
                  <div className="design-actions">
                    <SiteAction link={about.finalCta.primaryCta} className="design-button design-button--primary">
                      <span>{pick(about.finalCta.primaryCta.label)}</span>
                      <Arrow size={18} />
                    </SiteAction>
                    <SiteAction link={about.finalCta.secondaryCta} className="design-button design-button--soft" />
                  </div>
                </div>
                <div className="about-final-art" aria-hidden="true">
                  <span className="about-final-ring about-final-ring--one" />
                  <span className="about-final-ring about-final-ring--two" />
                  <span className="about-final-dot about-final-dot--one" />
                  <span className="about-final-dot about-final-dot--two" />
                  <div className="about-final-mark"><img src={qrarMark} alt="" /></div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
