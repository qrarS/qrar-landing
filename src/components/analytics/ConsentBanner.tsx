import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
import { analytics } from '@/lib/analytics';

/**
 * Analytics-consent banner (Consent Mode v2, Basic). Renders only while the
 * shared qrar_consent cookie is unset and analytics is configured. The
 * choice is written on domain=.qrar.ai, so accepting here also covers
 * console.qrar.ai (and vice versa).
 */
const COPY = {
  en: {
    message:
      'We use analytics cookies to understand how Qrar is used and improve it. No personal data is ever collected.',
    accept: 'Accept',
    decline: 'Decline',
    privacy: 'Privacy Policy',
  },
  ar: {
    message:
      'نستخدم ملفات تعريف ارتباط تحليلية لفهم استخدام قرار وتحسينه. لا نجمع أي بيانات شخصية إطلاقاً.',
    accept: 'موافق',
    decline: 'رفض',
    privacy: 'سياسة الخصوصية',
  },
} as const;

const ConsentBanner = () => {
  const { language, dir } = useSiteLanguage();
  const t = COPY[language];

  return (
    <div className="qrar-consent-banner" role="dialog" aria-live="polite" aria-label={t.message} dir={dir}>
      <div className="site-container qrar-consent-banner__inner">
        <p className="qrar-consent-banner__text">
          {t.message}{' '}
          <a href="/privacy#cookies-analytics" className="qrar-consent-banner__link">
            {t.privacy}
          </a>
        </p>
        <div className="qrar-consent-banner__actions">
          <button
            type="button"
            className="design-button design-button--primary qrar-consent-banner__button"
            onClick={() => analytics.grantConsent()}
          >
            {t.accept}
          </button>
          <button
            type="button"
            className="design-button design-button--soft qrar-consent-banner__button"
            onClick={() => analytics.denyConsent()}
          >
            {t.decline}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
