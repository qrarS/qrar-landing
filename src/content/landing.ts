// Shared, versioned content contract for the qrar.ai landing page.
//
// Keep this file dependency-free: it is imported by Supabase Edge Functions and
// the browser admin bundle. Published documents are immutable snapshots of this
// contract; bump LANDING_SCHEMA_VERSION when making a breaking change.

export const LANDING_SCHEMA_VERSION = 2 as const;

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

export type LandingMetricKey = 'reviewsAnalyzed' | 'businessLocations' | 'comparedLocations';

export interface LandingUsageMetrics {
  reviewsAnalyzed: number;
  businessLocations: number;
  comparedLocations: number;
  updatedAt: string;
}

export interface LandingStat {
  metric: LandingMetricKey;
  label: LocalizedText;
}

export interface LandingCard {
  id: string;
  icon: string;
  title: LocalizedText;
  body: LocalizedText;
}

export interface LandingAboutContent {
  seo: {
    title: LocalizedText;
    description: LocalizedText;
  };
  hero: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
  };
  mission: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
  };
  values: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
    items: LandingCard[];
  };
  finalCta: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
    primaryCta: LandingLink;
    secondaryCta: LandingLink;
  };
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
  about: LandingAboutContent;
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

export const DEFAULT_LANDING_TIERS: LandingTierSnapshot[] = [
  {
    id: 'free',
    name: bi('Free plan', 'الخطة المجانية'),
    description: bi('For trying Qrar as an individual', 'للتجربة والأفراد'),
    priceMonthly: 0, priceYearly: 0, currency: 'ريال', featured: false, badge: bi('', ''),
    cta: { kind: 'signup', label: bi('Start free', 'ابدأ مجاناً') },
    customPriceLabel: bi('', ''),
    features: [
      bi('2 analyses per month', '٢ تحليل / شهر'),
      bi('One business location', 'موقع واحد'),
      bi('Arabic and English', 'اللغة: عربي + إنجليزي'),
      bi('1 team member', '١ عضو فريق'),
      bi('Community support', 'دعم: مجتمع'),
    ],
  },
  {
    id: 'starter',
    name: bi('Starter', 'مبتدئ'),
    description: bi('For small businesses', 'للأعمال الصغيرة'),
    priceMonthly: 149, priceYearly: 1430, currency: 'ريال', featured: false, badge: bi('', ''),
    cta: { kind: 'signup', label: bi('Subscribe now', 'اشترك الآن') },
    customPriceLabel: bi('', ''),
    features: [
      bi('10 analyses per month', '١٠ تحليلات / شهر'),
      bi('Saved places and analysis history', 'حفظ المواقع + سجل التحليلات'),
      bi('Executive AI summary', 'ملخص تنفيذي بالذكاء الاصطناعي'),
      bi('Strengths and weaknesses', 'نقاط القوة والضعف'),
      bi('20 Najd questions per month', 'مساعد نجد: ٢٠ استفسار / شهر'),
      bi('10 AI replies per month', 'ردود ذكية: ١٠ / شهر'),
      bi('3 team members', '٣ أعضاء فريق'),
      bi('Email support', 'دعم: بريد إلكتروني'),
    ],
  },
  {
    id: 'professional',
    name: bi('Professional', 'احترافي'),
    description: bi('For restaurants and growing chains', 'للمطاعم والسلاسل'),
    priceMonthly: 399, priceYearly: 3830, currency: 'ريال', featured: true,
    badge: bi('Most popular', 'الأكثر شيوعاً'),
    cta: { kind: 'signup', label: bi('Subscribe now', 'اشترك الآن') },
    customPriceLabel: bi('', ''),
    features: [
      bi('30 analyses per month', '٣٠ تحليل / شهر'),
      bi('Compare up to 3 locations', 'مقارنة حتى ٣ فروع'),
      bi('Custom-topic analysis', 'تحليل مخصص'),
      bi('Recurring pattern discovery', 'الأنماط المتكررة'),
      bi('Prioritized recommendations', 'توصيات مرتبة بالأولوية'),
      bi('Employee-mention analysis', 'تحليل الموظفين المذكورين'),
      bi('100 Najd questions per month', 'مساعد نجد: ١٠٠ استفسار / شهر'),
      bi('50 AI replies per month', 'ردود ذكية: ٥٠ / شهر'),
      bi('Custom reply tone', 'تخصيص نبرة الرد'),
      bi('PDF reports', 'تقارير PDF'),
      bi('10 team members', '١٠ أعضاء فريق'),
      bi('Member permissions', 'صلاحيات مخصصة لكل عضو'),
      bi('Priority support', 'دعم: أولوية'),
    ],
  },
  {
    id: 'business',
    name: bi('Business', 'أعمال'),
    description: bi('For multi-location companies', 'للشركات المتوسطة'),
    priceMonthly: 899, priceYearly: 8630, currency: 'ريال', featured: false, badge: bi('', ''),
    cta: { kind: 'signup', label: bi('Subscribe now', 'اشترك الآن') },
    customPriceLabel: bi('', ''),
    features: [
      bi('100 analyses per month', '١٠٠ تحليل / شهر'),
      bi('Compare up to 8 locations', 'مقارنة حتى ٨ فروع'),
      bi('Nearby market intelligence', 'استخبارات جدوى الموقع'),
      bi('Commercial growth opportunities', 'فرص النمو التجاري'),
      bi('Advanced employee-mention analysis', 'تحليل متقدم لإشارات الموظفين'),
      bi('Najd voice assistant', 'مساعد نجد صوتي'),
      bi('500 Najd questions per month', 'مساعد نجد: ٥٠٠ استفسار / شهر'),
      bi('200 AI replies per month', 'ردود ذكية: ٢٠٠ / شهر'),
      bi('25 team members', '٢٥ عضو فريق'),
      bi('Priority support', 'دعم: أولوية'),
    ],
  },
  {
    id: 'enterprise',
    name: bi('Enterprise', 'مؤسسي'),
    description: bi('For large organizations', 'مخصص لأعمال الشركات الكبرى'),
    priceMonthly: 1999, priceYearly: 19190, currency: 'ريال', featured: false, badge: bi('', ''),
    cta: { kind: 'signup', label: bi('Subscribe now', 'اشترك الآن') },
    customPriceLabel: bi('', ''),
    features: [
      bi('500 analyses per month', '٥٠٠ تحليل / شهر'),
      bi('Advanced location benchmarking', 'مقارنات مواقع متقدمة'),
      bi('All AI capabilities', 'جميع ميزات الذكاء الاصطناعي'),
      bi('Expanded Najd and AI reply capacity', 'سعة موسعة لمساعد نجد والردود الذكية'),
      bi('API access', 'وصول API'),
      bi('100 team members', '١٠٠ عضو فريق'),
      bi('Guaranteed service level', 'SLA مضمون'),
      bi('Dedicated support', 'دعم مخصص'),
    ],
  },
  {
    id: 'custom',
    name: bi('Custom', 'مخصص'),
    description: bi('For groups and agencies', 'للمجموعات والوكالات'),
    priceMonthly: 0, priceYearly: 0, currency: 'ريال', featured: false, badge: bi('', ''),
    cta: { kind: 'contact', label: bi('Contact us', 'تواصل معنا') },
    customPriceLabel: bi('Contact us', 'تواصل معنا'),
    features: [
      bi('All capabilities with custom limits', 'جميع الميزات بحدود مخصصة'),
      bi('Flexible team size', 'فريق مرن حسب الاحتياج'),
      bi('Dedicated support and account manager', 'دعم مخصص ومدير حساب'),
      bi('Custom integrations', 'تكاملات مخصصة'),
      bi('API access', 'وصول API'),
    ],
  },
];

export const DEFAULT_LANDING_CONTENT: LandingPageContent = {
  schemaVersion: LANDING_SCHEMA_VERSION,
  seo: {
    title: bi('Qrar | Turn customer feedback into smart decisions', 'قرار | حوّل آراء عملائك إلى قرارات ذكية'),
    description: bi(
      'Qrar analyzes Google Maps reviews, reveals strengths and weaknesses, and turns evidence into practical recommendations.',
      'قرار منصة ذكاء اصطناعي تحلل آراء العملاء على خرائط Google، وتكشف نقاط القوة والضعف، وتقدم توصيات قابلة للتطبيق.',
    ),
  },
  navigation: {
    links: [
      link('Home', 'الصفحة الرئيسية', 'anchor', 'top'),
      link('Product', 'المنتج', 'anchor', 'features'),
      link('Pricing', 'الأسعار', 'anchor', 'pricing'),
      link('About us', 'من نحن', 'route', '/about'),
      link('Contact us', 'تواصل معنا', 'mailto', 'info@qrar.ai'),
    ],
    signInLabel: bi('Sign in', 'تسجيل الدخول'),
    signUpLabel: bi('Start free', 'ابدأ مجاناً'),
  },
  about: {
    seo: {
      title: bi('About Qrar | Decisions grounded in customer feedback', 'عن قرار | قرارات مبنية على آراء العملاء'),
      description: bi(
        'Learn how Qrar helps businesses turn Google Maps reviews into clear evidence, prioritized opportunities, and practical action.',
        'تعرّف على كيف يساعد قرار المنشآت على تحويل تقييمات خرائط Google إلى أدلة واضحة وأولويات قابلة للتنفيذ.',
      ),
    },
    hero: {
      eyebrow: bi('About Qrar', 'عن قرار'),
      title: bi('We turn customer feedback into clearer business decisions', 'نحوّل آراء العملاء إلى قرارات أعمال أوضح'),
      body: bi(
        'Customers explain what is working and what needs attention every day. Qrar brings those signals together, analyzes them with AI, and gives teams a practical view of what to improve next.',
        'يشارك العملاء يومياً ما ينجح وما يحتاج إلى تحسين. يجمع قرار هذه الإشارات ويحللها بالذكاء الاصطناعي ليمنح فرق العمل رؤية عملية لما ينبغي تحسينه بعد ذلك.',
      ),
    },
    mission: {
      eyebrow: bi('Our mission', 'مهمتنا'),
      title: bi('Make the voice of the customer useful, accessible, and actionable', 'أن نجعل صوت العميل مفيداً وسهل الوصول وقابلاً للتطبيق'),
      body: bi(
        'Qrar is built for teams that want to move beyond scattered comments and assumptions. We organize review evidence into strengths, weaknesses, comparisons, and prioritized recommendations so decisions stay connected to what customers actually said.',
        'بُني قرار للفرق التي تريد تجاوز التعليقات المتفرقة والافتراضات. ننظم أدلة التقييمات في نقاط قوة ومواطن ضعف ومقارنات وتوصيات مرتبة بالأولوية، لتبقى القرارات مرتبطة بما قاله العملاء فعلاً.',
      ),
    },
    values: {
      eyebrow: bi('How we build', 'كيف نبني قرار'),
      title: bi('Principles behind every Qrar experience', 'مبادئ تقود كل تجربة في قرار'),
      body: bi('', ''),
      items: [
        {
          id: 'evidence',
          icon: 'search-check',
          title: bi('Evidence before assumptions', 'الأدلة قبل الافتراضات'),
          body: bi(
            'Insights remain traceable to real reviews, so teams can understand why a recommendation matters.',
            'تبقى الرؤى مرتبطة بتقييمات حقيقية، حتى يفهم الفريق سبب أهمية كل توصية.',
          ),
        },
        {
          id: 'bilingual',
          icon: 'languages',
          title: bi('Arabic-first, bilingual by design', 'تجربة عربية أولاً وثنائية اللغة'),
          body: bi(
            'Qrar is designed for Arabic and English workflows, not translated as an afterthought.',
            'صُمم قرار لسير العمل بالعربية والإنجليزية من البداية، لا كترجمة لاحقة.',
          ),
        },
        {
          id: 'action',
          icon: 'list-checks',
          title: bi('Practical action over dashboards', 'إجراءات عملية لا مجرد لوحات'),
          body: bi(
            'We turn patterns into clear priorities teams can discuss, assign, and act on.',
            'نحوّل الأنماط إلى أولويات واضحة يمكن للفرق مناقشتها وتوزيعها وتنفيذها.',
          ),
        },
        {
          id: 'responsible-ai',
          icon: 'shield-check',
          title: bi('Responsible use of AI', 'استخدام مسؤول للذكاء الاصطناعي'),
          body: bi(
            'AI supports judgment with organized evidence; it does not replace context, accountability, or human decisions.',
            'يدعم الذكاء الاصطناعي الحكم البشري بأدلة منظمة، ولا يستبدل السياق أو المسؤولية أو القرار الإنساني.',
          ),
        },
      ],
    },
    finalCta: {
      eyebrow: bi('Start with evidence', 'ابدأ بالأدلة'),
      title: bi('Ready to understand what your customers are telling you?', 'هل أنت مستعد لفهم ما يقوله عملاؤك؟'),
      body: bi(
        'Connect your Google Maps location and turn customer feedback into your next clear action.',
        'اربط موقعك على خرائط Google وحوّل آراء العملاء إلى خطوتك العملية التالية.',
      ),
      primaryCta: link('Start free', 'ابدأ مجاناً', 'signup'),
      secondaryCta: link('Contact us', 'تواصل معنا', 'mailto', 'sales@qrar.ai'),
    },
  },
  hero: {
    enabled: true, order: 10, eyebrow: bi('', ''),
    title: bi('Turn customer feedback into smart decisions', 'حوّل آراء عملائك إلى قرارات ذكية'),
    body: bi(
      'Qrar is an AI platform specialized in analyzing Google Maps customer reviews—revealing strengths and weaknesses and delivering practical recommendations to grow your business.',
      'قرار منصة ذكاء اصطناعي متخصصة في تحليل آراء العملاء على خرائط Google — تكشف لك نقاط القوة والضعف، وتقدم توصيات قابلة للتطبيق لتنمية أعمالك.',
    ),
    titlePrefix: bi('Turn customer feedback', 'حوّل آراء عملائك'),
    titleHighlight: bi('smart decisions', 'قرارات ذكية'),
    titleSuffix: bi('into', 'إلى'),
    primaryCta: link('Start free — no credit card', 'ابدأ مجاناً — لا يحتاج بطاقة ائتمان', 'signup'),
    secondaryCta: link('See how it works', 'شاهد كيف يعمل', 'anchor', 'how-it-works'),
    stats: [
      { metric: 'reviewsAnalyzed', label: bi('reviews analyzed', 'تقييمات تم تحليلها') },
      { metric: 'businessLocations', label: bi('Business analyzed', 'مواقع تجارية تم تحليلها') },
      { metric: 'comparedLocations', label: bi('Business compared', 'مواقع تمت مقارنتها') },
    ],
  },
  workflow: {
    enabled: true, order: 20,
    eyebrow: bi('How Qrar works', 'كيف يعمل قرار'),
    title: bi('Three simple steps from reviews to decisions', 'ثلاث خطوات بسيطة من التقييمات إلى القرار'),
    body: bi('', ''),
    steps: [
      { id: 'choose', icon: 'map-pin', title: bi('Add your business location', 'أدخل موقع نشاطك التجاري'), body: bi('Enter the name or link of your business location on Google Maps.', 'أدخل اسم أو رابط موقع نشاطك التجاري على خرائط Google.') },
      { id: 'understand', icon: 'sparkles', title: bi('Let artificial intelligence work', 'دع الذكاء الاصطناعي يعمل'), body: bi('Qrar analyzes hundreds of reviews in seconds and extracts patterns and sentiment.', 'يحلل قرار مئات التقييمات في ثوانٍ ويستخرج الأنماط والمشاعر.') },
      { id: 'act', icon: 'chart-no-axes-combined', title: bi('Get actionable insight', 'احصل على رؤى قابلة للتطبيق'), body: bi('Executive summaries, prioritized recommendations, and location comparisons.', 'ملخص تنفيذي، توصيات مرتبة بالأولوية، ومقارنة الفروع.') },
    ],
  },
  features: {
    enabled: true, order: 30,
    eyebrow: bi('Core features', 'المميزات الرئيسية'),
    title: bi('Everything you need to understand your customers', 'نقدم لك كل ما تحتاجه لفهم عملائك'),
    body: bi('', ''),
    items: [
      { id: 'ai-summary', icon: 'sparkles', title: bi('AI summary', 'ملخص بالذكاء الاصطناعي'), body: bi('A concise executive view of what customers are saying without reading hundreds of reviews.', 'ملخص تنفيذي يوضح فوراً كل ما يقوله عملاؤك دون قراءة مئات التقييمات.') },
      { id: 'strengths', icon: 'chart-no-axes-combined', title: bi('Strengths and weaknesses', 'نقاط القوة ومواطن الضعف'), body: bi('See what makes customers happy and what causes dissatisfaction, grounded in real evidence.', 'اكتشف ما الذي يسعد عملاءك وما الذي يسبب عدم الرضا بناءً على بيانات حقيقية.') },
      { id: 'benchmark', icon: 'building-2', title: bi('Location benchmarking', 'مقارنة الفروع'), body: bi('Compare 2–8 locations across ratings, themes, rankings, and customer experience.', 'حلّل أداء فروعك في مكان واحد وقارن بينها عبر التقييمات وتجربة العملاء.') },
      { id: 'priorities', icon: 'target', title: bi('Prioritized recommendations', 'توصيات مرتبة بالأولوية'), body: bi('Turn evidence into a ranked list of actions based on impact and urgency.', 'احصل على قائمة ذكية من الإجراءات المقترحة مرتبة حسب الأهمية والتأثير.') },
      { id: 'growth', icon: 'chart-no-axes-combined', title: bi('Commercial growth opportunities', 'فرص النمو التجاري'), body: bi('Reveal overlooked service, marketing, and customer-experience opportunities.', 'اكتشف فرصاً جديدة للتوسع وتحسين خدمتك من خلال تحليل عميق لبيانات العملاء.') },
      { id: 'nearby', icon: 'map-pin', title: bi('Location feasibility intelligence', 'استخبارات جدوى الموقع'), body: bi('Explore nearby places and market evidence before opening or evaluating a location.', 'قيّم أي فرع أو موقع جديد بناءً على بيانات السوق والتقييمات في المنطقة.') },
      { id: 'najd', icon: 'bot', title: bi('Najd smart assistant', 'مساعد نجد الذكي'), body: bi('Ask follow-up questions by text or voice while keeping the current analysis in context.', 'تفاعل مع نجد ليفهم نشاطك ويجيب عن استفساراتك فوراً ضمن سياق التحليل.') },
      { id: 'replies', icon: 'messages', title: bi('Smart review replies', 'ردود ذكية على التقييمات'), body: bi('Create accurate, tailored replies for each review with a configurable tone.', 'وفّر وقتك واحصل على ردود احترافية ومخصصة لكل تقييم عميل.') },
      { id: 'employees', icon: 'users', title: bi('Employee performance analysis', 'تحليل أداء الموظفين'), body: bi('Identify employee mentions and understand the sentiment and evidence tied to each name.', 'تعرّف على أداء فريقك من خلال تحليل ذكر الموظفين في تقييمات العملاء.') },
    ],
  },
  audience: {
    enabled: true, order: 40,
    eyebrow: bi('Who we serve', 'من نخدم؟'),
    title: bi('Built for everyone who relies on customer trust', 'صُمم لكل من يعتمد على ثقة العملاء'),
    body: bi('', ''),
    imageUrl: '/assets/qrar-audience-figma.webp',
    imageAlt: bi('A Saudi business leader representing customer trust', 'قائد أعمال سعودي يمثل ثقة العملاء'),
    items: [
      { id: 'restaurants', icon: 'coffee', title: bi('Restaurants and cafés', 'المطاعم والكافيهات'), body: bi('Analyze the complete dining experience, from food to atmosphere.', 'تحليل التجربة الكاملة من الطعام للخدمة للجو العام.') },
      { id: 'retail', icon: 'building-2', title: bi('Stores and retail chains', 'المحلات والسلاسل التجارية'), body: bi('Compare locations and discover why one branch performs better.', 'قارن فروعك واكتشف من يؤدي الأفضل ولماذا.') },
      { id: 'hospitality', icon: 'hotel', title: bi('Hotels and hospitality', 'الفنادق والضيافة'), body: bi('Understand what influences your rating and act with confidence.', 'افهم ما يؤثر على تقييمك بدقة وتصرف فوراً.') },
      { id: 'health', icon: 'pill', title: bi('Clinics and healthcare', 'العيادات والخدمات الصحية'), body: bi('Monitor reputation and patient confidence with review evidence.', 'راقب سمعتك الطبية وثقة مرضاك.') },
      { id: 'agencies', icon: 'chart-no-axes-combined', title: bi('Digital agencies', 'الوكالات الرقمية'), body: bi('Deliver professional competitor and customer analysis for clients.', 'قدم تحليل المنافسين والعملاء كخدمة احترافية.') },
    ],
  },
  pricing: {
    enabled: true, order: 50,
    eyebrow: bi('Pricing plans', 'خطط الأسعار'),
    title: bi('Plans that fit the size of your business', 'خطط تناسب حجم نشاطك'),
    body: bi('All prices are in Saudi riyals and include VAT.', 'جميع الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة.'),
    monthlyLabel: bi('Monthly', 'شهري'),
    yearlyLabel: bi('Yearly', 'سنوي'),
    perMonthLabel: bi('/month', '/شهرياً'),
    perYearLabel: bi('/year', '/سنوياً'),
    billedYearlyLabel: bi('billed yearly', 'تُدفع سنوياً'),
    savingsLabel: bi('Save {percent}%', 'وفّر {percent}٪'),
    freeLabel: bi('Free', 'مجاناً'),
  },
  testimonials: {
    enabled: true, order: 60,
    eyebrow: bi('Customer stories', 'شهادات العملاء'),
    title: bi('With Qrar, reviews become real success', 'مع قرار التقييمات تتحول إلى نجاح حقيقي'),
    body: bi('See how teams use Qrar to understand customers more deeply, improve experience, and make evidence-backed decisions.', 'اكتشف كيف يساعد قرار أصحاب المشاريع والمطاعم على فهم عملائهم بشكل أعمق، وتحسين تجربتهم، واتخاذ قرارات مبنية على بيانات حقيقية.'),
    items: [
      { id: 'one', quote: bi('Comparing locations in one view makes recurring strengths and service gaps much easier to discuss.', 'الميزة التي أعجبتني أكثر هي مقارنة الفروع — الآن أعرف بالضبط أي فرع يحتاج تدخلاً وفي أي جانب.'), name: bi('Qrar product example', 'فريق منتج قرار'), role: bi('Illustrative workflow', 'مثال توضيحي لسير العمل') },
      { id: 'two', quote: bi('We can move from a customer concern to the exact reviews behind it, then agree on the next action.', 'أصبح لدينا ملخص واضح وقابل للتطبيق دون قراءة مئات التعليقات.'), name: bi('Qrar product example', 'فريق منتج قرار'), role: bi('Illustrative workflow', 'مثال توضيحي لسير العمل') },
      { id: 'three', quote: bi('Najd lets us ask follow-up questions without losing the analysis context in front of us.', 'نجد يجيب عن الأسئلة ضمن سياق التحليل ويوفر وقتاً كبيراً في الوصول إلى الأدلة.'), name: bi('Qrar product example', 'فريق منتج قرار'), role: bi('Illustrative workflow', 'مثال توضيحي لسير العمل') },
    ],
  },
  najd: {
    enabled: true, order: 70,
    eyebrow: bi('Meet Najd', 'تعرّف على نجد'),
    title: bi('Meet Najd, your smart assistant', 'تعرّف على نجد مساعدك الذكي'),
    body: bi(
      'Najd is Qrar’s integrated AI assistant. It understands the analysis in front of you, answers follow-up questions, and helps you make informed decisions in Arabic and English.',
      'نجد هو مساعد الذكاء الاصطناعي المدمج في قرار. يفهم بياناتك، يجيب على أسئلتك، ويساعدك على اتخاذ قرارات مدروسة — كل ذلك باللغة العربية والإنجليزية.',
    ),
    imageUrl: '/assets/qrar-najd.png',
    imageAlt: bi('Najd, Qrar’s smart assistant', 'نجد، مساعد قرار الذكي'),
    bullets: [
      bi('Compare Riyadh location performance with last month', 'قارن أداء فرع الرياض بأداء الشهر الماضي'),
      bi('Which employee received the most customer praise?', 'أي موظف حصل على أكبر إشادة من العملاء؟'),
      bi('What recommendations matter most for improving ratings?', 'ما التوصيات الأهم لتحسين تقييماتنا؟'),
      bi('What do Jeddah customers complain about most?', 'ما أكثر شيء يشتكي منه عملاؤنا في فرع جدة؟'),
      bi('Ask by text or voice in Arabic or English', 'اسأل نصياً أو صوتياً بالعربية أو الإنجليزية'),
    ],
    cta: link('Start a conversation with Najd', 'ابدأ محادثة مع نجد', 'signup'),
  },
  finalCta: {
    enabled: true, order: 80,
    eyebrow: bi('Start now', 'ابدأ الآن'),
    title: bi('Ready to turn customer feedback into a competitive advantage?', 'جاهز لتحويل آراء عملائك إلى ميزة تنافسية؟'),
    body: bi('Join the businesses that rely on Qrar to make smarter decisions every day.', 'انضم لمئات الأعمال التجارية التي تعتمد على قرار لاتخاذ قرارات أذكى كل يوم.'),
    primaryCta: link('Start free now', 'ابدأ مجاناً الآن', 'signup'),
    secondaryCta: link('Talk to our team', 'تحدث مع فريقنا', 'mailto', 'sales@qrar.ai'),
  },
  footer: {
    tagline: bi('Customer intelligence for clearer, smarter decisions.', 'ذكاء العملاء لقرارات أوضح وأذكى.'),
    columns: [
      { id: 'product', title: bi('Product', 'المنتج'), links: [link('Features', 'المميزات', 'anchor', 'features'), link('Pricing', 'الأسعار', 'anchor', 'pricing'), link('Enterprise plans', 'خطط المؤسسات', 'anchor', 'pricing'), link('Developer API', 'API للمطورين', 'placeholder')] },
      { id: 'company', title: bi('Company', 'الشركة'), links: [link('About us', 'من نحن', 'route', '/about'), link('Blog', 'المدونة', 'placeholder'), link('Careers', 'الوظائف', 'placeholder')] },
      { id: 'support', title: bi('Contact us', 'تواصل معنا'), links: [link('Support', 'الدعم', 'mailto', 'support@qrar.ai'), link('Help center', 'مركز المساعدة', 'placeholder'), link('Privacy policy', 'سياسة الخصوصية', 'route', '/privacy'), link('Terms of service', 'شروط الاستخدام', 'route', '/terms')] },
      { id: 'follow', title: bi('Follow us', 'تابعنا'), links: [link('X / Twitter', 'تويتر / X', 'placeholder'), link('LinkedIn', 'لينكدإن', 'placeholder'), link('Instagram', 'إنستغرام', 'placeholder')] },
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

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function activateAboutLink(candidate: unknown): void {
  if (!isObject(candidate) || !isObject(candidate.label)) return;
  const english = typeof candidate.label.en === 'string' ? candidate.label.en.trim().toLowerCase() : '';
  const arabic = typeof candidate.label.ar === 'string' ? candidate.label.ar.trim() : '';
  if (english !== 'about us' && arabic !== 'من نحن') return;
  candidate.kind = 'route';
  candidate.value = '/about';
}

const RENAMED_STAT_LABELS_EN: Record<string, string> = {
  'business locations analyzed': 'Business analyzed',
  'locations compared': 'Business compared',
};

function renameLegacyStatLabels(candidate: unknown): void {
  if (!isObject(candidate) || !isObject(candidate.hero) || !Array.isArray(candidate.hero.stats)) return;
  for (const stat of candidate.hero.stats) {
    if (!isObject(stat) || !isObject(stat.label) || typeof stat.label.en !== 'string') continue;
    const renamed = RENAMED_STAT_LABELS_EN[stat.label.en.trim().toLowerCase()];
    if (renamed) stat.label.en = renamed;
  }
}

export function upgradeLandingContent(value: unknown): LandingPageContent | null {
  if (!isObject(value)) return null;
  if (value.schemaVersion === LANDING_SCHEMA_VERSION) {
    renameLegacyStatLabels(value);
    return validateLandingContent(value).valid ? value as unknown as LandingPageContent : null;
  }
  if (value.schemaVersion !== 1) return null;

  try {
    const upgraded = cloneJson(value) as Record<string, unknown>;
    upgraded.schemaVersion = LANDING_SCHEMA_VERSION;
    upgraded.about = cloneJson(DEFAULT_LANDING_CONTENT.about);

    if (isObject(upgraded.hero)) {
      upgraded.hero.stats = cloneJson(DEFAULT_LANDING_CONTENT.hero.stats);
    }
    if (isObject(upgraded.navigation) && Array.isArray(upgraded.navigation.links)) {
      upgraded.navigation.links.forEach(activateAboutLink);
    }
    if (isObject(upgraded.footer) && Array.isArray(upgraded.footer.columns)) {
      upgraded.footer.columns.forEach((column) => {
        if (isObject(column) && Array.isArray(column.links)) column.links.forEach(activateAboutLink);
      });
    }

    return validateLandingContent(upgraded).valid
      ? upgraded as unknown as LandingPageContent
      : null;
  } catch {
    return null;
  }
}

export function validateLandingContent(value: unknown): LandingValidationResult {
  const errors: string[] = [];
  const allowedKinds = new Set<LandingLinkKind>(['anchor', 'signup', 'signin', 'route', 'mailto', 'external', 'placeholder']);
  const allowedMetrics = new Set<LandingMetricKey>(['reviewsAnalyzed', 'businessLocations', 'comparedLocations']);

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
    if (!Array.isArray(hero.stats) || hero.stats.length !== 3) errors.push('hero.stats must contain the 3 production metrics');
    else {
      const seenMetrics = new Set<string>();
      hero.stats.forEach((item, index) => {
        if (!isObject(item)) errors.push(`hero.stats[${index}] is invalid`);
        else {
          if (!allowedMetrics.has(item.metric as LandingMetricKey)) errors.push(`hero.stats[${index}].metric is invalid`);
          else if (seenMetrics.has(String(item.metric))) errors.push(`hero.stats[${index}].metric is duplicated`);
          else seenMetrics.add(String(item.metric));
          localized(item.label, `hero.stats[${index}].label`);
        }
      });
    }
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

  if (!isObject(value.about)) errors.push('about is required');
  else {
    if (!isObject(value.about.seo)) errors.push('about.seo is required');
    else {
      localized(value.about.seo.title, 'about.seo.title');
      localized(value.about.seo.description, 'about.seo.description');
    }
    for (const key of ['hero', 'mission', 'values', 'finalCta'] as const) {
      const block = value.about[key];
      if (!isObject(block)) errors.push(`about.${key} is required`);
      else {
        localized(block.eyebrow, `about.${key}.eyebrow`);
        localized(block.title, `about.${key}.title`);
        localized(block.body, `about.${key}.body`);
      }
    }
    if (isObject(value.about.values)) cards(value.about.values.items, 'about.values.items', 8);
    if (isObject(value.about.finalCta)) {
      landingLink(value.about.finalCta.primaryCta, 'about.finalCta.primaryCta');
      landingLink(value.about.finalCta.secondaryCta, 'about.finalCta.secondaryCta');
    }
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
