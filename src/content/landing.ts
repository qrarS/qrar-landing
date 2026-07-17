// Shared, versioned content contract for the qrar.ai landing page.
//
// Keep this file dependency-free: it is imported by Supabase Edge Functions and
// the browser admin bundle. Published documents are immutable snapshots of this
// contract; bump LANDING_SCHEMA_VERSION when making a breaking change.

export const LANDING_SCHEMA_VERSION = 1 as const;

export interface LocalizedText {
  en: string;
  ar: string;
}

export type LandingLinkKind =
  | 'anchor'
  | 'signup'
  | 'signin'
  | 'route'
  | 'mailto'
  | 'external'
  | 'placeholder';

export interface LandingLink {
  label: LocalizedText;
  kind: LandingLinkKind;
  value: string;
}

export interface LandingSectionBase {
  enabled: boolean;
  order: number;
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
}

export interface LandingStat {
  value: LocalizedText;
  label: LocalizedText;
}

export interface LandingCard {
  id: string;
  icon: string;
  title: LocalizedText;
  body: LocalizedText;
}

export interface LandingPageContent {
  schemaVersion: typeof LANDING_SCHEMA_VERSION;
  seo: {
    title: LocalizedText;
    description: LocalizedText;
  };
  navigation: {
    links: LandingLink[];
    signInLabel: LocalizedText;
    signUpLabel: LocalizedText;
  };
  hero: LandingSectionBase & {
    titlePrefix: LocalizedText;
    titleHighlight: LocalizedText;
    titleSuffix: LocalizedText;
    primaryCta: LandingLink;
    secondaryCta: LandingLink;
    stats: LandingStat[];
  };
  workflow: LandingSectionBase & {
    steps: LandingCard[];
  };
  features: LandingSectionBase & {
    items: LandingCard[];
  };
  audience: LandingSectionBase & {
    imageUrl: string;
    imageAlt: LocalizedText;
    items: LandingCard[];
  };
  pricing: LandingSectionBase & {
    monthlyLabel: LocalizedText;
    yearlyLabel: LocalizedText;
    perMonthLabel: LocalizedText;
    perYearLabel: LocalizedText;
    billedYearlyLabel: LocalizedText;
    savingsLabel: LocalizedText;
    freeLabel: LocalizedText;
  };
  testimonials: LandingSectionBase & {
    items: Array<{
      id: string;
      quote: LocalizedText;
      name: LocalizedText;
      role: LocalizedText;
    }>;
  };
  najd: LandingSectionBase & {
    imageUrl: string;
    imageAlt: LocalizedText;
    bullets: LocalizedText[];
    cta: LandingLink;
  };
  finalCta: LandingSectionBase & {
    primaryCta: LandingLink;
    secondaryCta: LandingLink;
  };
  footer: {
    tagline: LocalizedText;
    columns: Array<{
      id: string;
      title: LocalizedText;
      links: LandingLink[];
    }>;
    copyright: LocalizedText;
  };
}

export interface LandingTierSnapshot {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  featured: boolean;
  badge: LocalizedText;
  cta: {
    kind: 'signup' | 'contact' | 'placeholder';
    label: LocalizedText;
  };
  customPriceLabel: LocalizedText;
  features: LocalizedText[];
}

const bi = (en: string, ar: string): LocalizedText => ({ en, ar });
const link = (
  en: string,
  ar: string,
  kind: LandingLinkKind,
  value = '',
): LandingLink => ({ label: bi(en, ar), kind, value });

export const DEFAULT_LANDING_CONTENT: LandingPageContent = {
  schemaVersion: LANDING_SCHEMA_VERSION,
  seo: {
    title: bi('Qrar | Turn customer feedback into clearer decisions', 'قرار | حوّل آراء عملائك إلى قرارات أوضح'),
    description: bi(
      'Analyze reviews, compare locations, explore nearby customer evidence, and act on AI-powered insights with Qrar.',
      'حلّل المراجعات، وقارن المواقع، واستكشف أدلة العملاء القريبة، واتخذ قرارات مدعومة بالذكاء الاصطناعي مع قرار.',
    ),
  },
  navigation: {
    links: [
      link('How it works', 'كيف يعمل', 'anchor', 'how-it-works'),
      link('Features', 'المزايا', 'anchor', 'features'),
      link('Pricing', 'الأسعار', 'anchor', 'pricing'),
      link('Najd', 'نجد', 'anchor', 'najd'),
    ],
    signInLabel: bi('Sign in', 'تسجيل الدخول'),
    signUpLabel: bi('Start free', 'ابدأ مجاناً'),
  },
  hero: {
    enabled: true,
    order: 10,
    eyebrow: bi('Customer intelligence for better decisions', 'ذكاء العملاء لقرارات أفضل'),
    title: bi('See what customers are really telling you', 'اعرف ما يقوله عملاؤك فعلاً'),
    body: bi(
      'Qrar turns reviews and public conversations into practical insight: what works, what needs attention, and what to do next.',
      'يحوّل قرار المراجعات والمحادثات العامة إلى رؤى عملية: ما الذي ينجح، وما الذي يحتاج انتباهك، وما الخطوة التالية.',
    ),
    titlePrefix: bi('From customer voices to', 'من أصوات العملاء إلى'),
    titleHighlight: bi('clear decisions', 'قرارات أوضح'),
    titleSuffix: bi('', ''),
    primaryCta: link('Start free', 'ابدأ مجاناً', 'signup'),
    secondaryCta: link('Explore features', 'استكشف المزايا', 'anchor', 'features'),
    stats: [
      { value: bi('4', '٤'), label: bi('analysis modes', 'أنماط تحليل') },
      { value: bi('2–8', '٢–٨'), label: bi('locations per comparison', 'مواقع في المقارنة') },
      { value: bi('AR + EN', 'عربي + إنجليزي'), label: bi('bilingual experience', 'تجربة ثنائية اللغة') },
    ],
  },
  workflow: {
    enabled: true,
    order: 20,
    eyebrow: bi('Simple by design', 'بساطة في كل خطوة'),
    title: bi('From a place to an actionable view in three steps', 'من موقع إلى رؤية قابلة للتنفيذ في ثلاث خطوات'),
    body: bi(
      'Choose the question you want to answer. Qrar organizes the evidence and gives your team a clear place to begin.',
      'اختر السؤال الذي تريد إجابته، وسيجمع قرار الأدلة وينظمها ليمنح فريقك نقطة بداية واضحة.',
    ),
    steps: [
      { id: 'choose', icon: 'search', title: bi('Choose your analysis', 'اختر نوع التحليل'), body: bi('Analyze one location, compare branches, explore an area, or study X conversations.', 'حلّل موقعاً واحداً، أو قارن الفروع، أو استكشف منطقة، أو ادرس محادثات X.') },
      { id: 'understand', icon: 'sparkles', title: bi('Understand the signal', 'افهم الإشارات'), body: bi('See sentiment, themes, customer evidence, trends, and the reviews behind every insight.', 'اطّلع على المشاعر والمواضيع وأدلة العملاء والاتجاهات والمراجعات الداعمة لكل رؤية.') },
      { id: 'act', icon: 'target', title: bi('Decide what comes next', 'حدّد خطوتك التالية'), body: bi('Use AI summaries, recommendations, reports, and Najd to move from insight to action.', 'استخدم الملخصات والتوصيات والتقارير ومساعد نجد للانتقال من الرؤية إلى الإجراء.') },
    ],
  },
  features: {
    enabled: true,
    order: 30,
    eyebrow: bi('Built around real customer evidence', 'مبني حول أدلة العملاء الحقيقية'),
    title: bi('One workspace for every customer signal', 'مساحة واحدة لكل إشارة من عملائك'),
    body: bi(
      'Explore the capabilities available in Qrar Console. Access depends on the subscription tier selected by your administrator.',
      'استكشف إمكانات منصة قرار. يعتمد الوصول إلى كل ميزة على باقة الاشتراك التي يحددها المسؤول.',
    ),
    items: [
      { id: 'single', icon: 'map-pin', title: bi('Single location analysis', 'تحليل موقع واحد'), body: bi('Measure sentiment, themes, reputation health, trends, and the reviews driving the result.', 'قِس المشاعر والمواضيع وصحة السمعة والاتجاهات مع الرجوع للمراجعات التي صنعت النتيجة.') },
      { id: 'benchmark', icon: 'git-compare', title: bi('Location benchmarking', 'مقارنة المواقع'), body: bi('Compare 2–8 locations across customer metrics, topics, rankings, and AI-generated insights.', 'قارن بين ٢–٨ مواقع عبر مؤشرات العملاء والمواضيع والترتيب والرؤى المولدة بالذكاء الاصطناعي.') },
      { id: 'nearby', icon: 'radar', title: bi('Nearby Explorer', 'استكشاف المنطقة'), body: bi('Inventory nearby places and facilities, then build a review-grounded customer evidence report.', 'احصر المواقع والمرافق القريبة، ثم أنشئ تقرير أدلة عملاء مستنداً إلى المراجعات.') },
      { id: 'x', icon: 'message-circle', title: bi('X conversation analysis', 'تحليل محادثات X'), body: bi('Analyze public X conversations for sentiment, emotion, themes, summaries, and recommendations.', 'حلّل محادثات X العامة لاكتشاف المشاعر والانفعالات والمواضيع والملخصات والتوصيات.') },
      { id: 'topics', icon: 'tags', title: bi('Custom topics', 'مواضيع مخصصة'), body: bi('Ask focused questions of the current review sample and retain prior runs when your tier allows it.', 'اطرح أسئلة مركزة على عينة المراجعات الحالية واحتفظ بالنتائج السابقة عندما تسمح باقتك.') },
      { id: 'ai', icon: 'wand-sparkles', title: bi('AI insights and recommendations', 'رؤى وتوصيات ذكية'), body: bi('Turn patterns into concise summaries, practical recommendations, and tailored review replies.', 'حوّل الأنماط إلى ملخصات واضحة وتوصيات عملية وردود مخصصة على المراجعات.') },
      { id: 'employees', icon: 'users', title: bi('Employee mentions', 'إشارات الموظفين'), body: bi('Identify employee mentions and understand the customer sentiment connected to each name.', 'تعرّف على إشارات الموظفين وافهم مشاعر العملاء المرتبطة بكل اسم.') },
      { id: 'history', icon: 'history', title: bi('History and PDF reports', 'السجل وتقارير PDF'), body: bi('Return to saved analyses and export clear reports for one location or a location comparison.', 'ارجع إلى التحليلات المحفوظة وصدّر تقارير واضحة لموقع واحد أو لمقارنة مواقع.') },
      { id: 'teams', icon: 'building-2', title: bi('Company and team management', 'إدارة الشركة والفريق'), body: bi('Organize members, permissions, and shared locations in one company workspace.', 'نظّم الأعضاء والصلاحيات والمواقع المشتركة ضمن مساحة عمل واحدة للشركة.') },
    ],
  },
  audience: {
    enabled: true,
    order: 40,
    eyebrow: bi('Made for teams that listen', 'لفِرق تنصت لعملائها'),
    title: bi('Useful wherever customer experience shapes the decision', 'مفيد أينما كانت تجربة العميل تصنع القرار'),
    body: bi(
      'Qrar helps operators, experience teams, marketers, and decision-makers work from the same customer evidence.',
      'يساعد قرار فرق التشغيل وتجربة العميل والتسويق وصنّاع القرار على العمل انطلاقاً من أدلة عملاء مشتركة.',
    ),
    imageUrl: '/assets/qrar-audience.png',
    imageAlt: bi('A team member reviewing customer insights', 'عضو فريق يراجع رؤى العملاء'),
    items: [
      { id: 'operators', icon: 'store', title: bi('Operators and branch leaders', 'فرق التشغيل وقادة الفروع'), body: bi('Track service patterns, compare locations, and focus improvement where it matters.', 'تابع أنماط الخدمة، وقارن المواقع، وركّز التحسين حيث يصنع فرقاً.') },
      { id: 'cx', icon: 'heart-handshake', title: bi('Customer experience teams', 'فرق تجربة العميل'), body: bi('Connect sentiment and themes to the reviews behind them.', 'اربط المشاعر والمواضيع بالمراجعات التي تقف خلفها.') },
      { id: 'strategy', icon: 'chart-no-axes-combined', title: bi('Strategy and marketing teams', 'فرق الاستراتيجية والتسويق'), body: bi('Bring customer language into planning, positioning, and reporting.', 'أدخل لغة العملاء في التخطيط والتموضع وإعداد التقارير.') },
    ],
  },
  pricing: {
    enabled: true,
    order: 50,
    eyebrow: bi('Flexible plans', 'باقات مرنة'),
    title: bi('Choose the plan that fits your team', 'اختر الباقة المناسبة لفريقك'),
    body: bi('Plan prices and included capabilities are published directly by Qrar administrators.', 'تنشر إدارة قرار أسعار الباقات والإمكانات المشمولة مباشرةً.'),
    monthlyLabel: bi('Monthly', 'شهري'),
    yearlyLabel: bi('Yearly', 'سنوي'),
    perMonthLabel: bi('/ month', '/ شهرياً'),
    perYearLabel: bi('/ year', '/ سنوياً'),
    billedYearlyLabel: bi('billed yearly', 'تُدفع سنوياً'),
    savingsLabel: bi('Save {percent}%', 'وفّر {percent}٪'),
    freeLabel: bi('Free', 'مجاناً'),
  },
  testimonials: {
    enabled: true,
    order: 60,
    eyebrow: bi('Clarity teams can share', 'وضوح يمكن للفريق مشاركته'),
    title: bi('Customer evidence becomes easier to use', 'أدلة العملاء تصبح أسهل في الاستخدام'),
    body: bi('Edit or replace these quotes before publishing if you have approved customer testimonials.', 'عدّل أو استبدل هذه الاقتباسات قبل النشر عند توفر شهادات عملاء معتمدة.'),
    items: [
      { id: 'one', quote: bi('We can move from a broad customer concern to the exact reviews behind it, then agree on the next action.', 'نستطيع الانتقال من ملاحظة عامة لدى العملاء إلى المراجعات التي تقف خلفها، ثم الاتفاق على الإجراء التالي.'), name: bi('Qrar product team', 'فريق منتج قرار'), role: bi('Illustrative workflow', 'مثال توضيحي لسير العمل') },
      { id: 'two', quote: bi('Comparing branches in one view makes recurring strengths and service gaps much easier to discuss.', 'تجميع مقارنة الفروع في شاشة واحدة يجعل مناقشة نقاط القوة المتكررة وفجوات الخدمة أكثر سهولة.'), name: bi('Qrar product team', 'فريق منتج قرار'), role: bi('Illustrative workflow', 'مثال توضيحي لسير العمل') },
      { id: 'three', quote: bi('Najd lets us ask a follow-up question without losing the context of the analysis in front of us.', 'يتيح لنا نجد طرح سؤال متابعة دون فقدان سياق التحليل الظاهر أمامنا.'), name: bi('Qrar product team', 'فريق منتج قرار'), role: bi('Illustrative workflow', 'مثال توضيحي لسير العمل') },
    ],
  },
  najd: {
    enabled: true,
    order: 70,
    eyebrow: bi('Meet Najd', 'تعرّف على نجد'),
    title: bi('Ask your analysis a follow-up question', 'اسأل تحليلك سؤالاً إضافياً'),
    body: bi(
      'Najd is Qrar’s bilingual assistant. It stays grounded in the analysis you are viewing so your next question keeps the right context.',
      'نجد هو مساعد قرار ثنائي اللغة. يبقى مرتبطاً بالتحليل الذي تشاهده ليحافظ سؤالك التالي على السياق الصحيح.',
    ),
    imageUrl: '/assets/qrar-najd.png',
    imageAlt: bi('Najd, Qrar’s analysis assistant', 'نجد، مساعد التحليل في قرار'),
    bullets: [
      bi('Text questions inside supported analyses', 'أسئلة نصية داخل التحليلات المدعومة'),
      bi('Voice conversations when enabled in your plan', 'محادثات صوتية عندما تكون مفعلة في باقتك'),
      bi('Arabic and English responses grounded in the current result', 'إجابات عربية وإنجليزية مرتبطة بالنتيجة الحالية'),
    ],
    cta: link('Start with Qrar', 'ابدأ مع قرار', 'signup'),
  },
  finalCta: {
    enabled: true,
    order: 80,
    eyebrow: bi('A clearer next step starts here', 'خطوتك الأوضح تبدأ هنا'),
    title: bi('Turn the customer voice into your next Qrar', 'حوّل صوت العميل إلى قرارك التالي'),
    body: bi('Create your account and start exploring the signals already present in customer feedback.', 'أنشئ حسابك وابدأ باستكشاف الإشارات الموجودة بالفعل في آراء عملائك.'),
    primaryCta: link('Create an account', 'أنشئ حساباً', 'signup'),
    secondaryCta: link('Sign in', 'تسجيل الدخول', 'signin'),
  },
  footer: {
    tagline: bi('Customer intelligence for clearer decisions.', 'ذكاء العملاء لقرارات أوضح.'),
    columns: [
      { id: 'product', title: bi('Product', 'المنتج'), links: [link('Features', 'المزايا', 'anchor', 'features'), link('Pricing', 'الأسعار', 'anchor', 'pricing'), link('Najd', 'نجد', 'anchor', 'najd')] },
      { id: 'account', title: bi('Account', 'الحساب'), links: [link('Create account', 'إنشاء حساب', 'signup'), link('Sign in', 'تسجيل الدخول', 'signin')] },
      { id: 'company', title: bi('Company', 'الشركة'), links: [link('About', 'من نحن', 'placeholder'), link('Contact', 'تواصل معنا', 'mailto', 'hello@qrar.ai')] },
      { id: 'legal', title: bi('Legal', 'قانوني'), links: [link('Privacy policy', 'سياسة الخصوصية', 'route', '/privacy'), link('Terms of service', 'شروط الاستخدام', 'route', '/terms')] },
    ],
    copyright: bi('© {year} Qrar. All rights reserved.', '© {year} قرار. جميع الحقوق محفوظة.'),
  },
};

export interface LandingValidationResult {
  valid: boolean;
  errors: string[];
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function validateLandingContent(value: unknown): LandingValidationResult {
  const errors: string[] = [];
  const allowedKinds = new Set<LandingLinkKind>(['anchor', 'signup', 'signin', 'route', 'mailto', 'external', 'placeholder']);

  const localized = (candidate: unknown, path: string) => {
    if (!isObject(candidate)) {
      errors.push(`${path} must be bilingual text`);
      return;
    }
    for (const language of ['en', 'ar'] as const) {
      const text = candidate[language];
      if (typeof text !== 'string') errors.push(`${path}.${language} must be a string`);
      else if (text.length > 4000) errors.push(`${path}.${language} is too long`);
    }
  };

  const landingLink = (candidate: unknown, path: string) => {
    if (!isObject(candidate)) {
      errors.push(`${path} must be a link`);
      return;
    }
    localized(candidate.label, `${path}.label`);
    if (!allowedKinds.has(candidate.kind as LandingLinkKind)) errors.push(`${path}.kind is invalid`);
    if (typeof candidate.value !== 'string' || candidate.value.length > 2048) errors.push(`${path}.value is invalid`);
    if (candidate.kind === 'external' && typeof candidate.value === 'string' && !/^https:\/\//i.test(candidate.value)) {
      errors.push(`${path}.value must use https`);
    }
    if (candidate.kind === 'route' && typeof candidate.value === 'string' && !candidate.value.startsWith('/')) {
      errors.push(`${path}.value must be an internal path`);
    }
  };

  const section = (candidate: unknown, path: string) => {
    if (!isObject(candidate)) {
      errors.push(`${path} must be a section`);
      return;
    }
    if (typeof candidate.enabled !== 'boolean') errors.push(`${path}.enabled must be boolean`);
    if (!Number.isFinite(candidate.order) || Number(candidate.order) < 0 || Number(candidate.order) > 1000) errors.push(`${path}.order is invalid`);
    localized(candidate.eyebrow, `${path}.eyebrow`);
    localized(candidate.title, `${path}.title`);
    localized(candidate.body, `${path}.body`);
  };

  if (!isObject(value)) return { valid: false, errors: ['content must be an object'] };
  if (value.schemaVersion !== LANDING_SCHEMA_VERSION) errors.push(`schemaVersion must be ${LANDING_SCHEMA_VERSION}`);
  if (JSON.stringify(value).length > 250_000) errors.push('content exceeds the 250 KB limit');

  if (!isObject(value.seo)) errors.push('seo is required');
  else {
    localized(value.seo.title, 'seo.title');
    localized(value.seo.description, 'seo.description');
  }

  if (!isObject(value.navigation)) errors.push('navigation is required');
  else {
    const links = value.navigation.links;
    if (!Array.isArray(links) || links.length > 12) errors.push('navigation.links must contain at most 12 links');
    else links.forEach((item, index) => landingLink(item, `navigation.links[${index}]`));
    localized(value.navigation.signInLabel, 'navigation.signInLabel');
    localized(value.navigation.signUpLabel, 'navigation.signUpLabel');
  }

  for (const key of ['hero', 'workflow', 'features', 'audience', 'pricing', 'testimonials', 'najd', 'finalCta'] as const) {
    section(value[key], key);
  }

  const hero = value.hero;
  if (isObject(hero)) {
    localized(hero.titlePrefix, 'hero.titlePrefix');
    localized(hero.titleHighlight, 'hero.titleHighlight');
    localized(hero.titleSuffix, 'hero.titleSuffix');
    landingLink(hero.primaryCta, 'hero.primaryCta');
    landingLink(hero.secondaryCta, 'hero.secondaryCta');
    if (!Array.isArray(hero.stats) || hero.stats.length > 6) errors.push('hero.stats must contain at most 6 items');
    else hero.stats.forEach((item, index) => {
      if (!isObject(item)) errors.push(`hero.stats[${index}] is invalid`);
      else {
        localized(item.value, `hero.stats[${index}].value`);
        localized(item.label, `hero.stats[${index}].label`);
      }
    });
  }

  const cards = (candidate: unknown, path: string, limit: number) => {
    if (!Array.isArray(candidate) || candidate.length > limit) {
      errors.push(`${path} must contain at most ${limit} items`);
      return;
    }
    candidate.forEach((item, index) => {
      if (!isObject(item)) errors.push(`${path}[${index}] is invalid`);
      else {
        if (typeof item.id !== 'string' || !/^[a-z0-9-]{1,64}$/.test(item.id)) errors.push(`${path}[${index}].id is invalid`);
        if (typeof item.icon !== 'string' || item.icon.length > 64) errors.push(`${path}[${index}].icon is invalid`);
        localized(item.title, `${path}[${index}].title`);
        localized(item.body, `${path}[${index}].body`);
      }
    });
  };

  if (isObject(value.workflow)) cards(value.workflow.steps, 'workflow.steps', 8);
  if (isObject(value.features)) cards(value.features.items, 'features.items', 18);
  if (isObject(value.audience)) {
    cards(value.audience.items, 'audience.items', 8);
    if (typeof value.audience.imageUrl !== 'string' || value.audience.imageUrl.length > 2048) errors.push('audience.imageUrl is invalid');
    localized(value.audience.imageAlt, 'audience.imageAlt');
  }

  if (isObject(value.pricing)) {
    for (const key of ['monthlyLabel', 'yearlyLabel', 'perMonthLabel', 'perYearLabel', 'billedYearlyLabel', 'savingsLabel', 'freeLabel']) {
      localized(value.pricing[key], `pricing.${key}`);
    }
  }

  if (isObject(value.testimonials)) {
    const items = value.testimonials.items;
    if (!Array.isArray(items) || items.length > 12) errors.push('testimonials.items must contain at most 12 items');
    else items.forEach((item, index) => {
      if (!isObject(item)) errors.push(`testimonials.items[${index}] is invalid`);
      else {
        if (typeof item.id !== 'string') errors.push(`testimonials.items[${index}].id is invalid`);
        localized(item.quote, `testimonials.items[${index}].quote`);
        localized(item.name, `testimonials.items[${index}].name`);
        localized(item.role, `testimonials.items[${index}].role`);
      }
    });
  }

  if (isObject(value.najd)) {
    if (typeof value.najd.imageUrl !== 'string' || value.najd.imageUrl.length > 2048) errors.push('najd.imageUrl is invalid');
    localized(value.najd.imageAlt, 'najd.imageAlt');
    if (!Array.isArray(value.najd.bullets) || value.najd.bullets.length > 10) errors.push('najd.bullets must contain at most 10 items');
    else value.najd.bullets.forEach((item, index) => localized(item, `najd.bullets[${index}]`));
    landingLink(value.najd.cta, 'najd.cta');
  }
  if (isObject(value.finalCta)) {
    landingLink(value.finalCta.primaryCta, 'finalCta.primaryCta');
    landingLink(value.finalCta.secondaryCta, 'finalCta.secondaryCta');
  }

  if (!isObject(value.footer)) errors.push('footer is required');
  else {
    localized(value.footer.tagline, 'footer.tagline');
    localized(value.footer.copyright, 'footer.copyright');
    const columns = value.footer.columns;
    if (!Array.isArray(columns) || columns.length > 8) errors.push('footer.columns must contain at most 8 columns');
    else columns.forEach((column, index) => {
      if (!isObject(column)) errors.push(`footer.columns[${index}] is invalid`);
      else {
        if (typeof column.id !== 'string') errors.push(`footer.columns[${index}].id is invalid`);
        localized(column.title, `footer.columns[${index}].title`);
        if (!Array.isArray(column.links) || column.links.length > 12) errors.push(`footer.columns[${index}].links is invalid`);
        else column.links.forEach((item, linkIndex) => landingLink(item, `footer.columns[${index}].links[${linkIndex}]`));
      }
    });
  }

  return { valid: errors.length === 0, errors };
}
