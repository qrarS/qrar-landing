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
    name: bi('Free', 'مجانية'),
    description: bi('Try Qrar with one location', 'لبدء تحليل تقييمات موقع واحد'),
    priceMonthly: 0, priceYearly: 0, currency: 'ريال', featured: false, badge: bi('', ''),
    cta: { kind: 'signup', label: bi('Start free', 'ابدأ مجانًا') },
    customPriceLabel: bi('', ''),
    features: [
      bi('2 analyses per month', 'تحليلان شهريًا'),
      bi('One business location', 'موقع تجاري واحد'),
      bi('Arabic and English interface', 'واجهة عربية وإنجليزية'),
      bi('1 user', 'مستخدم واحد'),
      bi('Community support', 'دعم عبر مجتمع المستخدمين'),
    ],
  },
  {
    id: 'starter',
    name: bi('Essentials', 'أساسية'),
    description: bi('For small businesses getting started', 'للمنشآت الصغيرة التي تبدأ بتحليل التقييمات'),
    priceMonthly: 149, priceYearly: 1430, currency: 'ريال', featured: false, badge: bi('', ''),
    cta: { kind: 'signup', label: bi('Choose Essentials', 'ابدأ بهذه الباقة') },
    customPriceLabel: bi('', ''),
    features: [
      bi('10 analyses per month', '١٠ تحليلات شهريًا'),
      bi('Saved locations and analysis history', 'حفظ المواقع وسجل التحليلات'),
      bi('Executive AI summary', 'ملخص تنفيذي بالذكاء الاصطناعي'),
      bi('Satisfaction drivers and performance gaps', 'أسباب الرضا ومواطن التراجع'),
      bi('20 Najd questions per month', '٢٠ سؤالًا لنجد شهريًا'),
      bi('10 AI reply drafts per month', '١٠ مسودات رد ذكية شهريًا'),
      bi('Up to 3 users', 'حتى ٣ مستخدمين'),
      bi('Email support', 'دعم عبر البريد الإلكتروني'),
    ],
  },
  {
    id: 'professional',
    name: bi('Growth', 'نمو'),
    description: bi('For growing multi-location businesses', 'للمنشآت النامية متعددة الفروع'),
    priceMonthly: 399, priceYearly: 3830, currency: 'ريال', featured: true,
    badge: bi('Built for growth', 'للأعمال النامية'),
    cta: { kind: 'signup', label: bi('Choose Growth', 'ابدأ بباقة نمو') },
    customPriceLabel: bi('', ''),
    features: [
      bi('30 analyses per month', '٣٠ تحليلًا شهريًا'),
      bi('Compare up to 3 locations', 'مقارنة ما يصل إلى ٣ فروع'),
      bi('Custom-topic analysis', 'تحليل موضوعات مخصصة'),
      bi('Recurring pattern discovery', 'اكتشاف الأنماط المتكررة'),
      bi('Prioritized recommendations', 'توصيات مرتبة حسب الأولوية'),
      bi('Employee-mention analysis', 'تحليل الإشارات المرتبطة بالموظفين'),
      bi('100 Najd questions per month', '١٠٠ سؤال لنجد شهريًا'),
      bi('50 AI reply drafts per month', '٥٠ مسودة رد ذكية شهريًا'),
      bi('Custom reply tone', 'تخصيص نبرة الرد'),
      bi('PDF reports', 'تقارير بصيغة PDF'),
      bi('Up to 10 users', 'حتى ١٠ مستخدمين'),
      bi('Role-based permissions', 'صلاحيات حسب دور المستخدم'),
      bi('Priority support', 'أولوية في الدعم'),
    ],
  },
  {
    id: 'business',
    name: bi('Business', 'أعمال'),
    description: bi('For companies operating several locations', 'للشركات التي تدير عدة فروع'),
    priceMonthly: 899, priceYearly: 8630, currency: 'ريال', featured: false, badge: bi('', ''),
    cta: { kind: 'signup', label: bi('Choose Business', 'ابدأ بباقة أعمال') },
    customPriceLabel: bi('', ''),
    features: [
      bi('100 analyses per month', '١٠٠ تحليل شهريًا'),
      bi('Compare up to 8 locations', 'مقارنة ما يصل إلى ٨ فروع'),
      bi('Nearby market intelligence', 'تحليل السوق المحيط بكل موقع'),
      bi('Commercial growth opportunities', 'اكتشاف فرص النمو التجاري'),
      bi('Advanced employee-mention analysis', 'تحليل متقدم للإشارات المرتبطة بالموظفين'),
      bi('Najd voice assistant', 'استخدام نجد بالصوت'),
      bi('500 Najd questions per month', '٥٠٠ سؤال لنجد شهريًا'),
      bi('200 AI reply drafts per month', '٢٠٠ مسودة رد ذكية شهريًا'),
      bi('Up to 25 users', 'حتى ٢٥ مستخدمًا'),
      bi('Priority support', 'أولوية في الدعم'),
    ],
  },
  {
    id: 'enterprise',
    name: bi('Enterprise', 'مؤسسات'),
    description: bi('For large organizations and extensive location networks', 'للمنشآت الكبيرة وشبكات الفروع الواسعة'),
    priceMonthly: 1999, priceYearly: 19190, currency: 'ريال', featured: false, badge: bi('', ''),
    cta: { kind: 'signup', label: bi('Choose Enterprise', 'ابدأ بباقة مؤسسات') },
    customPriceLabel: bi('', ''),
    features: [
      bi('500 analyses per month', '٥٠٠ تحليل شهريًا'),
      bi('Advanced location benchmarking', 'مقارنات متقدمة بين المواقع'),
      bi('All AI capabilities', 'جميع إمكانات الذكاء الاصطناعي'),
      bi('Expanded Najd and AI reply capacity', 'سعة موسعة لأسئلة نجد ومسودات الردود'),
      bi('API access', 'الوصول إلى واجهة API'),
      bi('Up to 100 users', 'حتى ١٠٠ مستخدم'),
      bi('Guaranteed service level', 'اتفاقية مستوى خدمة مضمونة'),
      bi('Dedicated support', 'دعم مخصص'),
    ],
  },
  {
    id: 'custom',
    name: bi('Custom solution', 'حل مخصص'),
    description: bi('For groups, franchises, and agencies', 'للمجموعات والامتيازات التجارية والوكالات'),
    priceMonthly: 0, priceYearly: 0, currency: 'ريال', featured: false, badge: bi('', ''),
    cta: { kind: 'contact', label: bi('Contact sales', 'تواصل مع المبيعات') },
    customPriceLabel: bi('Contact sales', 'تواصل مع المبيعات'),
    features: [
      bi('All capabilities with custom limits', 'جميع الإمكانات بحدود تناسب احتياجك'),
      bi('Flexible team size', 'عدد مرن من المستخدمين'),
      bi('Dedicated support and account manager', 'دعم مخصص ومدير حساب'),
      bi('Custom integrations', 'تكاملات مخصصة'),
      bi('API access', 'الوصول إلى واجهة API'),
    ],
  },
];

export const DEFAULT_LANDING_CONTENT: LandingPageContent = {
  schemaVersion: LANDING_SCHEMA_VERSION,
  seo: {
    title: bi('Qrar | Turn Google reviews into better location decisions', 'قرار | حوّل تقييمات Google إلى قرارات تحسّن أداء فروعك'),
    description: bi(
      'Qrar analyzes Google Maps reviews to reveal satisfaction drivers, performance gaps, and the next priority for every location.',
      'يجمع قرار تقييمات عملائك على خرائط Google ويحللها ليوضح أسباب الرضا والتراجع، ويحدد أولويات التحسين لكل فرع.',
    ),
  },
  navigation: {
    links: [
      link('Home', 'الرئيسية', 'anchor', 'top'),
      link('Features', 'المزايا', 'anchor', 'features'),
      link('Plans', 'الباقات', 'anchor', 'pricing'),
      link('About Qrar', 'عن قرار', 'route', '/about'),
      link('Contact sales', 'تواصل مع المبيعات', 'mailto', 'info@qrar.ai'),
    ],
    signInLabel: bi('Sign in', 'تسجيل الدخول'),
    signUpLabel: bi('Start free', 'ابدأ مجانًا'),
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
      primaryCta: link('Start free', 'ابدأ مجانًا', 'signup'),
      secondaryCta: link('Contact us', 'تواصل معنا', 'mailto', 'sales@qrar.ai'),
    },
  },
  hero: {
    enabled: true, order: 10, eyebrow: bi('', ''),
    title: bi('Know what customers say and improve every location', 'اعرف ماذا يقول عملاؤك، وحسّن أداء كل فرع'),
    body: bi(
      'Qrar brings your Google Maps reviews together, reveals what drives satisfaction or decline, and shows the next priority for every location.',
      'يجمع قرار تقييمات عملائك على خرائط Google ويحللها ليكشف أسباب الرضا والتراجع، ويحدد لك أولويات التحسين في كل فرع.',
    ),
    titlePrefix: bi('Know what customers say', 'اعرف ماذا يقول عملاؤك'),
    titleHighlight: bi('location', 'كل فرع'),
    titleSuffix: bi('and improve every', 'وحسّن أداء'),
    primaryCta: link('Start free', 'ابدأ مجانًا', 'signup'),
    secondaryCta: link('See how it works', 'استكشف طريقة العمل', 'anchor', 'how-it-works'),
    stats: [
      { metric: 'reviewsAnalyzed', label: bi('Reviews analyzed', 'تقييمات تم تحليلها') },
      { metric: 'businessLocations', label: bi('Locations analyzed', 'فروع تم تحليلها') },
      { metric: 'comparedLocations', label: bi('Locations compared', 'فروع تمت مقارنتها') },
    ],
  },
  workflow: {
    enabled: true, order: 20,
    eyebrow: bi('From review to action', 'من التقييم إلى الإجراء'),
    title: bi('A clear view of location performance in three steps', 'صورة واضحة لأداء فروعك في ثلاث خطوات'),
    body: bi('Bring the evidence together and decide what deserves attention first.', 'اجمع الأدلة وحدد ما يستحق التحسين أولًا بدلًا من قراءة التقييمات واحدًا تلو الآخر.'),
    steps: [
      { id: 'choose', icon: 'map-pin', title: bi('Add a Google Maps location', 'أضف موقعك من خرائط Google'), body: bi('Search by location name or paste its link to collect the available reviews.', 'ابحث باسم الفرع أو ألصق رابطه لبدء جمع التقييمات المتاحة.') },
      { id: 'understand', icon: 'sparkles', title: bi('Find the patterns in customer feedback', 'حلّل ما يتكرر في آراء العملاء'), body: bi('Qrar identifies satisfaction drivers and performance gaps, with the reviews behind every finding.', 'يستخلص قرار أسباب الرضا ومواطن التراجع، ويربط كل نتيجة بالتقييمات التي تدعمها.') },
      { id: 'act', icon: 'chart-no-axes-combined', title: bi('Turn findings into priorities', 'حوّل النتائج إلى أولويات عمل'), body: bi('Review ranked recommendations, compare locations, and share the next action with your team.', 'راجع التوصيات المرتبة، وقارن الفروع، وشارك الخطوة التالية مع فريقك.') },
    ],
  },
  features: {
    enabled: true, order: 30,
    eyebrow: bi('What Qrar gives you', 'ما الذي يقدمه قرار؟'),
    title: bi('Everything you need to improve customer experience across locations', 'كل ما تحتاجه لتحسين تجربة العميل عبر فروعك'),
    body: bi('An executive view backed by real reviews—from performance summaries to the next action.', 'رؤية تنفيذية مدعومة بتقييمات حقيقية، من ملخص الأداء إلى الإجراء التالي.'),
    items: [
      { id: 'ai-summary', icon: 'sparkles', title: bi('Clear executive summary', 'ملخص تنفيذي واضح'), body: bi('See what affects customer satisfaction without reading every review one by one.', 'اطّلع على أبرز ما يؤثر في رضا العملاء دون قراءة كل تقييم على حدة.') },
      { id: 'strengths', icon: 'chart-no-axes-combined', title: bi('Satisfaction drivers and performance gaps', 'أسباب الرضا ومواطن التراجع'), body: bi('Understand recurring themes that raise or lower ratings, with supporting review evidence.', 'افهم الموضوعات المتكررة التي ترفع التقييم أو تخفضه، مع التقييمات الداعمة.') },
      { id: 'benchmark', icon: 'building-2', title: bi('Location performance comparison', 'مقارنة أداء الفروع'), body: bi('Compare ratings, themes, and customer experience to see where improvement should begin.', 'قارن الفروع عبر التقييم والموضوعات وتجربة العميل لتعرف أين يبدأ التحسين.') },
      { id: 'priorities', icon: 'target', title: bi('Actionable priorities', 'أولويات قابلة للتنفيذ'), body: bi('Rank improvement opportunities by impact and recurrence so your team can focus on what matters.', 'رتّب فرص التحسين بحسب أثرها وتكرارها لتوجّه وقت فريقك إلى الأهم.') },
      { id: 'growth', icon: 'chart-no-axes-combined', title: bi('Growth opportunities from customer voice', 'فرص نمو من صوت العميل'), body: bi('Find recurring needs and opportunities to improve the service or offer based on customer feedback.', 'اكتشف احتياجات متكررة وفرصًا لتحسين الخدمة أو العرض بناءً على ما يقوله العملاء.') },
      { id: 'nearby', icon: 'map-pin', title: bi('Market view around each location', 'قراءة السوق حول كل موقع'), body: bi('Explore nearby-business reviews when assessing a new location or reviewing an existing one.', 'استكشف تقييمات الأنشطة القريبة عند دراسة فرع جديد أو مراجعة أداء موقع قائم.') },
      { id: 'najd', icon: 'bot', title: bi('Najd in the context of your analysis', 'مساعد نجد ضمن سياق التحليل'), body: bi('Ask about results by text or voice and continue the analysis without losing context.', 'اسأل عن النتائج نصيًا أو صوتيًا، وواصل التحليل دون فقدان السياق.') },
      { id: 'replies', icon: 'messages', title: bi('Consistent reply drafts', 'مسودات ردود متسقة'), body: bi('Create a draft for every review in your business tone, then review it before publishing.', 'أنشئ مسودة مناسبة لكل تقييم ولنبرة منشأتك، ثم راجعها قبل النشر.') },
      { id: 'employees', icon: 'users', title: bi('Signals tied to employee mentions', 'مؤشرات مرتبطة بذكر الموظفين'), body: bi('Find praise or concerns connected to employee names mentioned in reviews.', 'تعرّف على مواضع الإشادة أو الملاحظات المرتبطة بأسماء الموظفين في التقييمات.') },
    ],
  },
  audience: {
    enabled: true, order: 40,
    eyebrow: bi('Built for multi-location businesses', 'مصمم للمنشآت متعددة الفروع'),
    title: bi('For teams responsible for customer experience', 'للفرق المسؤولة عن تجربة العميل'),
    body: bi('For businesses that depend on local reputation and need a clear view across locations.', 'مناسب للمنشآت التي تعتمد على السمعة المحلية وتحتاج إلى متابعة الأداء بين الفروع.'),
    imageUrl: '/assets/qrar-audience-figma.webp',
    imageAlt: bi('A Saudi business leader representing customer trust', 'قائد أعمال سعودي يمثل ثقة العملاء'),
    items: [
      { id: 'restaurants', icon: 'coffee', title: bi('Restaurants and cafés', 'المطاعم والمقاهي'), body: bi('Track service, product quality, and wait times across locations.', 'تابع جودة الخدمة والمنتجات وأوقات الانتظار عبر الفروع.') },
      { id: 'retail', icon: 'building-2', title: bi('Retail stores and chains', 'المتاجر والسلاسل التجارية'), body: bi('Compare visitor experience and understand why location performance varies.', 'قارن تجربة الزوار واكتشف أسباب تفاوت الأداء بين المواقع.') },
      { id: 'hospitality', icon: 'hotel', title: bi('Hotels and hospitality', 'الفنادق والضيافة'), body: bi('See what influences guest satisfaction and each property’s reputation.', 'ارصد ما يؤثر في رضا الضيف وسمعة كل منشأة.') },
      { id: 'health', icon: 'pill', title: bi('Clinics and healthcare', 'العيادات والخدمات الصحية'), body: bi('Track patient experience and improvement areas while keeping every finding traceable to reviews.', 'تابع تجربة المراجع ومواطن التحسين مع إمكانية الرجوع إلى نص التقييم.') },
      { id: 'agencies', icon: 'chart-no-axes-combined', title: bi('Digital agencies', 'الوكالات الرقمية'), body: bi('Give clients evidence-backed analysis and clear comparisons across locations and competitors.', 'قدّم لعملائك تحليلًا موثقًا ومقارنات واضحة بين المواقع والمنافسين.') },
    ],
  },
  pricing: {
    enabled: true, order: 70,
    eyebrow: bi('Plans', 'الباقات'),
    title: bi('Choose a plan for your location count and team size', 'اختر الباقة المناسبة لعدد فروعك وحجم فريقك'),
    body: bi('Prices are in Saudi riyals and include VAT. Start free and upgrade when you need to.', 'الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة. ابدأ مجانًا، وانتقل إلى باقة أعلى عند الحاجة.'),
    monthlyLabel: bi('Monthly billing', 'دفع شهري'),
    yearlyLabel: bi('Yearly billing', 'دفع سنوي'),
    perMonthLabel: bi('/month', '/ شهر'),
    perYearLabel: bi('/year', '/ سنة'),
    billedYearlyLabel: bi('yearly total', 'الإجمالي السنوي'),
    savingsLabel: bi('Save {percent}%', 'وفّر {percent}٪'),
    freeLabel: bi('Free', 'مجانًا'),
  },
  testimonials: {
    enabled: true, order: 60,
    eyebrow: bi('Use cases', 'أمثلة استخدام'),
    title: bi('From customer feedback to a clearer operating decision', 'من ملاحظة العميل إلى قرار تشغيلي أوضح'),
    body: bi('Use Qrar to find where performance declines, return to the supporting reviews, and continue the analysis with your team.', 'استخدم قرار لتحديد موضع التراجع، والرجوع إلى التقييمات الداعمة، ومتابعة التحليل مع فريقك.'),
    items: [
      { id: 'one', quote: bi('See which location needs attention and the recurring themes that explain the difference in performance.', 'اعرف أي فرع يحتاج إلى تدخل، والموضوعات المتكررة التي تفسّر تفاوت الأداء بين الفروع.'), name: bi('Find where performance declines', 'حدّد موضع التراجع'), role: bi('Location performance comparison', 'مقارنة أداء الفروع') },
      { id: 'two', quote: bi('Move from any finding to the reviews behind it before agreeing on the action your team should take.', 'انتقل من أي نتيجة إلى التقييمات التي تدعمها قبل اعتماد الإجراء المناسب لفريقك.'), name: bi('Return from the finding to the evidence', 'ارجع من النتيجة إلى دليلها'), role: bi('Evidence-backed action', 'إجراء مدعوم بالأدلة') },
      { id: 'three', quote: bi('Ask a follow-up question while keeping the current analysis in context, then share the answer with your team.', 'اطرح سؤالًا إضافيًا ضمن سياق التحليل، ثم شارك الإجابة الواضحة مع فريقك.'), name: bi('Continue the analysis with Najd', 'تابع التحليل مع نجد'), role: bi('Questions in context', 'أسئلة ضمن السياق') },
    ],
  },
  najd: {
    enabled: true, order: 50,
    eyebrow: bi('Your analysis assistant', 'مساعدك التحليلي'),
    title: bi('Ask Najd about location performance in everyday business language', 'اسأل نجد عن أداء فروعك بلغة العمل اليومية'),
    body: bi(
      'Najd understands the analysis in front of you and answers follow-up questions using the linked results and reviews, in Arabic or English.',
      'يفهم نجد التحليل المفتوح أمامك، ويجيب عن الأسئلة الإضافية استنادًا إلى النتائج والتقييمات المرتبطة بها، بالعربية أو الإنجليزية.',
    ),
    imageUrl: '/assets/qrar-najd.png',
    imageAlt: bi('Najd, Qrar’s analysis assistant', 'نجد، مساعد قرار التحليلي'),
    bullets: [
      bi('Compare why the Riyadh location declined from last month', 'قارن أسباب تراجع فرع الرياض بالشهر الماضي'),
      bi('What theme appears most often in Jeddah reviews?', 'ما الموضوع الأكثر تكرارًا في تقييمات فرع جدة؟'),
      bi('What is the highest priority for improving customer experience?', 'ما الأولوية الأعلى لتحسين تجربة العميل؟'),
      bi('Show the reviews supporting this finding', 'اعرض التقييمات التي تدعم هذه النتيجة'),
      bi('Ask by text or voice in Arabic or English', 'اسأل نصيًا أو صوتيًا بالعربية أو الإنجليزية'),
    ],
    cta: link('Start analyzing with Najd', 'ابدأ التحليل مع نجد', 'signup'),
  },
  finalCta: {
    enabled: true, order: 80,
    eyebrow: bi('Start with one location', 'ابدأ من فرع واحد'),
    title: bi('Make customer voice part of every operating decision', 'اجعل صوت العميل جزءًا من قرارك التشغيلي'),
    body: bi('Connect a Google Maps location and understand what needs attention before your next meeting.', 'اربط موقعك على خرائط Google، وافهم ما يحتاج إلى تحسين قبل اجتماعك القادم.'),
    primaryCta: link('Start free', 'ابدأ مجانًا', 'signup'),
    secondaryCta: link('Talk to sales', 'تحدث مع فريق المبيعات', 'mailto', 'sales@qrar.ai'),
  },
  footer: {
    tagline: bi('Customer-review analysis for clearer operating decisions and better performance across locations.', 'تحليل آراء العملاء لقرارات تشغيلية أوضح وأداء أفضل عبر الفروع.'),
    columns: [
      { id: 'product', title: bi('Product', 'المنتج'), links: [link('Features', 'المزايا', 'anchor', 'features'), link('Plans and pricing', 'الباقات والأسعار', 'anchor', 'pricing'), link('Enterprise solutions', 'حلول المؤسسات', 'anchor', 'pricing'), link('Developer API', 'واجهة API للمطورين', 'placeholder')] },
      { id: 'company', title: bi('Company', 'الشركة'), links: [link('About Qrar', 'عن قرار', 'route', '/about'), link('Articles', 'المقالات', 'placeholder'), link('Join the team', 'انضم إلى الفريق', 'placeholder')] },
      { id: 'support', title: bi('Support and contact', 'الدعم والتواصل'), links: [link('Contact support', 'تواصل مع الدعم', 'mailto', 'support@qrar.ai'), link('Help center', 'مركز المساعدة', 'placeholder'), link('Privacy policy', 'سياسة الخصوصية', 'route', '/privacy'), link('Terms of service', 'شروط الاستخدام', 'route', '/terms')] },
      { id: 'follow', title: bi('Follow Qrar', 'تابع قرار'), links: [link('X / Twitter', 'إكس (X)', 'placeholder'), link('LinkedIn', 'لينكدإن', 'placeholder'), link('Instagram', 'إنستغرام', 'placeholder')] },
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

const LEGACY_ARABIC_COPY: Record<string, string> = {
  'استخبارات جدوى الموقع': 'قراءة السوق حول كل موقع',
};

function normalizeLegacyArabicCopy(candidate: unknown): void {
  if (Array.isArray(candidate)) {
    candidate.forEach(normalizeLegacyArabicCopy);
    return;
  }
  if (!isObject(candidate)) return;

  for (const [key, value] of Object.entries(candidate)) {
    if (key === 'ar' && typeof value === 'string' && LEGACY_ARABIC_COPY[value]) {
      candidate[key] = LEGACY_ARABIC_COPY[value];
    } else {
      normalizeLegacyArabicCopy(value);
    }
  }
}

export function upgradeLandingContent(value: unknown): LandingPageContent | null {
  if (!isObject(value)) return null;
  if (value.schemaVersion === LANDING_SCHEMA_VERSION) {
    renameLegacyStatLabels(value);
    normalizeLegacyArabicCopy(value);
    return validateLandingContent(value).valid ? value as unknown as LandingPageContent : null;
  }
  if (value.schemaVersion !== 1) return null;

  try {
    const upgraded = cloneJson(value) as Record<string, unknown>;
    upgraded.schemaVersion = LANDING_SCHEMA_VERSION;
    upgraded.about = cloneJson(DEFAULT_LANDING_CONTENT.about);
    normalizeLegacyArabicCopy(upgraded);

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
