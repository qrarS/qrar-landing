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
  reviewerName: { en: 'Manar Ahmed', ar: 'فيصل إبراهيم' },
  date: { en: 'Jun 28, 2026', ar: '١٤ مايو ٢٠٢٦' },
  sentiment: { en: 'Negative', ar: 'سلبي' },
  reviewLang: { en: 'English', ar: 'العربية' },
  priority: { en: 'High Priority', ar: 'أولوية عالية' },
  reviewText: {
    en: 'The worst matcha ever 🤮',
    ar: 'للاسف كان عندهم ايسد ماتشا لاتيه خرافي الين امس، اليوم رحتلهم قالو انهم وقفوه ونزلو نوع جديد… وبخصوص الخدمة بالفرع غير جيدة بصراحة وتحتاج الى تحسين خصوصاً فترات الانتظار الغير منطقية.',
  },
  translate: { en: 'Translate', ar: 'ترجمة' },
  maps: { en: 'View on Google Maps', ar: 'عرض في خرائط Google' },
  generate: { en: 'Generate Response', ar: 'إنشاء رد' },
  generateHint: { en: 'One click, for any review', ar: 'ضغطة واحدة لأي تقييم' },
  generating: { en: 'Generating response…', ar: 'جارٍ إنشاء الرد…' },
  aiSuggested: { en: 'AI Suggested Response', ar: 'رد مقترح بالذكاء الاصطناعي' },
  aiReply: {
    en: 'Thank you for your feedback, and we are sorry to hear you were disappointed with the matcha. We would like the chance to make this right — please contact us with the date and time of your visit so we can review what happened and offer a replacement or refund…',
    ar: 'نشكرك على تقييمك وملاحظاتك، ونعتذر عن أي تجربة غير مرضية في الخدمة. تم رفع طلبكم للإدارة للنظر في إعادة المشروب، كما سنراجع إجراءات التشغيل لتقليل فترات الانتظار وتحسين مستوى الخدمة في الفرع…',
  },
  copy: { en: 'Copy', ar: 'نسخ' },
  regenerate: { en: 'Regenerate', ar: 'إعادة الإنشاء' },
  suggested: { en: 'Suggested response', ar: 'رد مقترح' },
  styleChip: { en: 'Style: friendly & brief + phone number', ar: 'النمط: ودّي ومختصر + رقم الجوال' },
  styledBefore: {
    en: 'Sorry for the experience, please call ',
    ar: 'نشكرك على تقييمك، ونعتذر عن إيقاف المشروب وتأخر الخدمة. نرجو التواصل على ',
  },
  styledAfter: { en: ' so we can make it right. Thanks.', ar: ' عشان نعوّضك 🌹' },
  caption: {
    en: 'Your saved style — applied to every future reply',
    ar: 'حسب نمطك المحفوظ — يُطبَّق على كل الردود القادمة',
  },
  ariaLabel: {
    en: 'Demo: how Qrar turns a negative review into a ready-to-send reply in your style',
    ar: 'عرض توضيحي: كيف يحوّل قرار التقييم السلبي إلى رد جاهز بأسلوبك',
  },
} satisfies Record<string, LocalizedText>;

const PHONE = '0555555555';

// Review chips differ per language (EN: one category; AR: three).
const CATEGORIES: Record<string, string[]> = {
  en: ['Beverage Quality'],
  ar: ['وقت الانتظار', 'جودة الخدمة', 'توفر المنتجات'],
};

const STEPS: LocalizedText[] = [
  { en: 'Click "Generate Response"', ar: 'اضغط «إنشاء رد»' },
  { en: 'AI writes it', ar: 'الذكاء الاصطناعي يكتب' },
  { en: 'Ready in seconds', ar: 'رد جاهز خلال ثوانٍ' },
  { en: 'In your style', ar: 'وبأسلوبك أنت' },
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
  const rating = isArabic ? 3 : 1;
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
