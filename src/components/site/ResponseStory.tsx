import {
  ChevronDown,
  Copy,
  ExternalLink,
  Languages,
  MapPin,
  Palette,
  PenLine,
  RefreshCw,
  Star,
  TriangleAlert,
} from 'lucide-react';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
import type { LocalizedText } from '@/content/landing';

// Fixed illustrative demo (like ConsoleShowcase) — copy lives here, not in the CMS.
const STR = {
  reviewerName: { en: 'Noura Alharbi', ar: 'نورة الحربي' },
  date: { en: '18 Jul 2026', ar: '١٨ يوليو ٢٠٢٦' },
  sentiment: { en: 'Needs attention', ar: 'يحتاج متابعة' },
  reviewLang: { en: 'English', ar: 'العربية' },
  priority: { en: 'High Priority', ar: 'أولوية عالية' },
  reviewText: {
    en: 'I visited the Al Olaya location at lunchtime. The coffee was good, but my order took more than 20 minutes and the reason for the delay was not clear. I hope orders are better organized during peak hours.',
    ar: 'زرت فرع العليا وقت الظهر. القهوة جيدة، لكن استغرق استلام الطلب أكثر من ٢٠ دقيقة، ولم يتضح سبب التأخير. أتمنى تنظيم الطلبات بشكل أفضل في أوقات الذروة.',
  },
  translate: { en: 'Translate', ar: 'ترجمة' },
  maps: { en: 'View on Google Maps', ar: 'عرض في خرائط Google' },
  generate: { en: 'Draft a response', ar: 'صياغة مسودة رد' },
  generateHint: { en: 'Review before publishing', ar: 'راجعها قبل النشر' },
  generating: { en: 'Drafting response…', ar: 'جارٍ إعداد المسودة…' },
  aiSuggested: { en: 'AI-generated draft', ar: 'مسودة مقترحة بالذكاء الاصطناعي' },
  aiReply: {
    en: 'Thank you, Noura, for sharing your experience. We apologize for the long wait at our Al Olaya location. We will review order management during peak hours with the team, and we hope your next visit is better.',
    ar: 'شكرًا لك يا نورة على مشاركة تجربتك. نعتذر عن طول وقت الانتظار في فرع العليا. سنراجع تنظيم الطلبات خلال أوقات الذروة مع الفريق، ونأمل أن تكون تجربتك القادمة أفضل.',
  },
  copy: { en: 'Copy draft', ar: 'نسخ المسودة' },
  regenerate: { en: 'Create another draft', ar: 'إنشاء مسودة أخرى' },
  suggested: { en: 'Draft ready for review', ar: 'مسودة جاهزة للمراجعة' },
  styleChip: { en: 'Tone: professional and brief + contact number', ar: 'النبرة: مهنية ومختصرة + وسيلة تواصل' },
  styledBefore: {
    en: 'Thank you, Noura. We apologize for the delay at our Al Olaya location. Please contact us at ',
    ar: 'شكرًا لك يا نورة. نعتذر عن تأخر طلبك في فرع العليا. نرجو التواصل معنا على ',
  },
  styledAfter: { en: ' so our team can follow up on your experience.', ar: ' ليتابع الفريق تجربتك.' },
  caption: {
    en: 'Reviewed and approved by your team before publishing',
    ar: 'تُراجع المسودة وتُعتمد من فريقك قبل نشرها',
  },
  ariaLabel: {
    en: 'Illustrative demo: Qrar prepares a customer-review reply draft for the team to review before publishing',
    ar: 'عرض توضيحي: يُعدّ قرار مسودة رد على تقييم العميل ليراجعها الفريق قبل النشر',
  },
} satisfies Record<string, LocalizedText>;

const PHONE = '0555555555';

const CATEGORIES: Record<string, string[]> = {
  en: ['Service speed', 'Wait time', 'Order management'],
  ar: ['سرعة الخدمة', 'وقت الانتظار', 'تنظيم الطلبات'],
};

const STEPS: LocalizedText[] = [
  { en: 'Choose "Draft a response"', ar: 'اختر «صياغة مسودة»' },
  { en: 'Qrar reads the review context', ar: 'يحلل قرار سياق التقييم' },
  { en: 'Review and edit the draft', ar: 'راجع المسودة وعدّلها' },
  { en: 'Approve when ready', ar: 'اعتمد الرد عند جاهزيته' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="response-story-stars" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} className={i < rating ? 'response-story-star is-on' : 'response-story-star'} />
      ))}
    </span>
  );
}

export function ResponseStory() {
  const { pick, language, isArabic } = useSiteLanguage();
  const rating = 2;
  const digits = new Intl.NumberFormat(isArabic ? 'ar-SA' : 'en-US');

  return (
    <div className="response-story" role="img" aria-label={pick(STR.ariaLabel)}>
      <div className="response-story-glow" aria-hidden />
      <div className="response-story-card">
        {/* Review card */}
        <div className="response-story-review">
          <div className="response-story-review-head">
            <span className="response-story-avatar">{pick(STR.reviewerName).charAt(0)}</span>
            <span className="response-story-name">{pick(STR.reviewerName)}</span>
            <StarRating rating={rating} />
            <span className="response-story-date">{pick(STR.date)}</span>
          </div>
          <div className="response-story-badges">
            <span className="rs-badge rs-badge--neg">{pick(STR.sentiment)}</span>
            <span className="rs-badge rs-badge--plain">{pick(STR.reviewLang)}</span>
            <span className="rs-badge rs-badge--prio">
              <TriangleAlert size={13} aria-hidden />
              {pick(STR.priority)}
            </span>
          </div>
          <p className="response-story-text">{pick(STR.reviewText)}</p>
          <div className="response-story-chips">
            {CATEGORIES[language].map((chip) => (
              <span key={chip} className="rs-chip rs-chip--cat">{chip}</span>
            ))}
            <span className="rs-chip rs-chip--tool rs-chip--push">
              <Languages size={13} aria-hidden />
              {pick(STR.translate)}
              <ChevronDown size={13} aria-hidden />
            </span>
            <span className="rs-chip rs-chip--tool">
              <MapPin size={13} aria-hidden />
              {pick(STR.maps)}
              <ExternalLink size={13} aria-hidden />
            </span>
          </div>
        </div>

        {/* Animated response zone — four cross-fading stages on one CSS clock */}
        <div className="response-story-stack">
          <div className="response-story-stage response-story-stage--center" style={{ animationDelay: '0s' }}>
            <span className="response-story-generate">
              <PenLine size={16} aria-hidden />
              {pick(STR.generate)}
            </span>
            <span className="response-story-hint">{pick(STR.generateHint)}</span>
          </div>

          <div className="response-story-stage response-story-stage--center" style={{ animationDelay: '4s' }}>
            <span className="response-story-dots" aria-hidden>
              <span className="response-story-dot" style={{ animationDelay: '0s' }} />
              <span className="response-story-dot" style={{ animationDelay: '.2s' }} />
              <span className="response-story-dot" style={{ animationDelay: '.4s' }} />
            </span>
            <span className="response-story-generating">{pick(STR.generating)}</span>
          </div>

          <div className="response-story-stage" style={{ animationDelay: '8s' }}>
            <span className="response-story-reply-label">
              <PenLine size={14} aria-hidden />
              {pick(STR.aiSuggested)}
            </span>
            <div className="response-story-reply">{pick(STR.aiReply)}</div>
            <div className="response-story-reply-actions">
              <span className="rs-action"><Copy size={13} aria-hidden />{pick(STR.copy)}</span>
              <span className="rs-action"><RefreshCw size={13} aria-hidden />{pick(STR.regenerate)}</span>
            </div>
          </div>

          <div className="response-story-stage response-story-stage--final" style={{ animationDelay: '12s' }}>
            <div className="response-story-style-row">
              <span className="response-story-reply-label">
                <PenLine size={14} aria-hidden />
                {pick(STR.suggested)}
              </span>
              <span className="rs-style-chip">
                <Palette size={13} aria-hidden />
                {pick(STR.styleChip)}
              </span>
            </div>
            <div className="response-story-reply response-story-reply--styled">
              {pick(STR.styledBefore)}
              <span className="response-story-phone" dir="ltr">{PHONE}</span>
              {pick(STR.styledAfter)}
            </div>
            <span className="response-story-caption">{pick(STR.caption)}</span>
          </div>
        </div>

        {/* Step strip — active indicator synced to the same 16s clock */}
        <div className="response-story-steps">
          {STEPS.map((step, i) => (
            <div key={step.en} className="response-story-step">
              <span
                className={`response-story-step-num${i === STEPS.length - 1 ? ' response-story-step-num--last' : ''}`}
                style={{ animationDelay: `${i * 4}s` }}
                aria-hidden
              >
                {digits.format(i + 1)}
              </span>
              {pick(step)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
