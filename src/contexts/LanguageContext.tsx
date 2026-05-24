import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations = {
  en: {
    // Navigation
    "nav.features": "Features",
    "nav.howItWorks": "How it works",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.startFree": "Start Free",

    // Hero
    "hero.eyebrow": "The Saudi platform for Google Maps presence",
    "hero.headline": "Run every branch's Google presence from one screen.",
    "hero.subheadline":
      "Qrar gives multi-branch businesses full control over their online presence — listings, reviews, photos, and analytics — in one unified dashboard.",
    "hero.ctaPrimary": "Start Free Trial",
    "hero.ctaSecondary": "Book a Demo",

    // Features
    "features.eyebrow": "Features",
    "features.title": "One dashboard. Every branch. Total control.",
    "features.subtitle":
      "Everything you need to run your Google presence at scale — from a single, beautifully simple workspace.",
    "features.branches.title": "Unified Branch Management",
    "features.branches.desc":
      "Update all your Google Maps listings from a single dashboard.",
    "features.reviews.title": "Review Monitoring & Response",
    "features.reviews.desc":
      "Get notified instantly and reply to every review without switching tabs.",
    "features.analytics.title": "Performance Analytics",
    "features.analytics.desc":
      "Track views, searches, and interactions per branch with clear visual reports.",
    "features.photos.title": "Photo & Info Management",
    "features.photos.desc":
      "Update business photos, hours, and details across all locations at once.",
    "features.notifications.title": "Real-time Notifications",
    "features.notifications.desc":
      "Never miss a new review with instant push alerts across all branches.",
    "features.team.title": "Multi-team Access",
    "features.team.desc":
      "Invite operations and marketing teammates with unlimited seats — no per-user fees.",

    // How it works
    "how.eyebrow": "How it works",
    "how.title": "Up and running in minutes.",
    "how.subtitle": "Three simple steps. No technical setup. No long onboarding.",
    "how.step1.title": "Connect your Google account",
    "how.step1.desc": "Authorize Qrar with a single secure OAuth click.",
    "how.step2.title": "We sync all your branches",
    "how.step2.desc": "Every location, review, and metric pulled in automatically.",
    "how.step3.title": "Manage everything from one dashboard",
    "how.step3.desc": "Update, respond, and analyze — across all branches at once.",

    // Why Qrar
    "why.eyebrow": "Why Qrar",
    "why.title": "Built for the way Saudi businesses actually run.",
    "why.subtitle":
      "A platform designed around real multi-branch operations — not a generic SaaS bolted on.",
    "why.tile1.title": "Unlimited branches",
    "why.tile1.desc": "One unified dashboard, no per-location setup.",
    "why.tile2.title": "Built for ease",
    "why.tile2.desc": "Clean Arabic-first interface anyone on your team can use.",
    "why.tile3.title": "Secure by design",
    "why.tile3.desc": "Connect once with secure sign-in — we never store your password.",
    "why.tile4.title": "Real-time sync",
    "why.tile4.desc": "Changes reflect on Google Maps within minutes, not days.",
    "why.tile5.title": "Multi-team access",
    "why.tile5.desc": "Give your operations and marketing teams unlimited seats.",
    "why.tile6.title": "Saudi-first support",
    "why.tile6.desc": "Local team, Arabic support, MENA business hours.",

    // Metrics
    "metrics.businesses": "Businesses",
    "metrics.branches": "Branches Managed",
    "metrics.reviews": "Reviews Monitored",

    // Pricing
    "pricing.eyebrow": "Pricing",
    "pricing.title": "Simple pricing that scales with you.",
    "pricing.subtitle": "Start free. Upgrade when you grow. Talk to us when you scale.",
    "pricing.popular": "Most popular",
    "pricing.starter.name": "Starter",
    "pricing.starter.price": "Free",
    "pricing.starter.desc": "For single-location businesses.",
    "pricing.starter.f1": "1 branch",
    "pricing.starter.f2": "Review monitoring",
    "pricing.starter.f3": "Basic analytics",
    "pricing.starter.cta": "Start Free",
    "pricing.growth.name": "Growth",
    "pricing.growth.price": "Custom",
    "pricing.growth.desc": "For growing chains with multiple branches.",
    "pricing.growth.f1": "Up to 25 branches",
    "pricing.growth.f2": "Real-time notifications",
    "pricing.growth.f3": "Advanced analytics",
    "pricing.growth.f4": "Priority support",
    "pricing.growth.cta": "Contact Sales",
    "pricing.enterprise.name": "Enterprise",
    "pricing.enterprise.price": "Let's talk",
    "pricing.enterprise.desc": "For nationwide brands and franchises.",
    "pricing.enterprise.f1": "Unlimited branches",
    "pricing.enterprise.f2": "Dedicated account manager",
    "pricing.enterprise.f3": "SLA & custom integrations",
    "pricing.enterprise.f4": "Onboarding & training",
    "pricing.enterprise.cta": "Contact Us",

    // FAQ
    "faq.eyebrow": "FAQ",
    "faq.title": "Questions, answered.",
    "faq.subtitle": "Everything you need to know about Qrar before you start.",
    "faq.q1.q": "How quickly can I get started?",
    "faq.q1.a":
      "Just a few minutes. Connect your business account once and we automatically sync all your branches.",
    "faq.q2.q": "Does Qrar support multi-branch businesses?",
    "faq.q2.a":
      "Yes. Qrar supports an unlimited number of branches, all manageable from a single dashboard — no need to sign in to each location.",
    "faq.q3.q": "How do you protect my Google account?",
    "faq.q3.a":
      "We use official secure sign-in — your password is never stored, and you can revoke access at any time from your Google account settings.",
    "faq.q4.q": "Can my whole team use Qrar?",
    "faq.q4.a":
      "Absolutely. Your subscription includes unlimited team access — no per-seat fees.",
    "faq.q5.q": "Will I be notified of new reviews instantly?",
    "faq.q5.a":
      "Yes — you get an instant notification the moment a new review is posted on any branch, and can reply directly from the dashboard.",
    "faq.q6.q": "What kind of analytics do I get?",
    "faq.q6.a":
      "Track views, searches, direction requests, and interactions per branch — in clear, comparable visual reports.",

    // Final CTA
    "finalCTA.title": "Ready to strengthen your presence on Google Maps?",
    "finalCTA.subtitle":
      "Join the businesses managing every branch the smart, consistent way.",
    "finalCTA.cta": "Get Started",

    // Contact form
    "contact.eyebrow": "Contact",
    "contact.title": "Let's talk.",
    "contact.subtitle": "Tell us about your business and we'll get back to you within one business day.",
    "contact.name": "Full name",
    "contact.namePlaceholder": "Your name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "you@company.com",
    "contact.company": "Company (optional)",
    "contact.companyPlaceholder": "Your company",
    "contact.message": "Message",
    "contact.messagePlaceholder": "How can we help?",
    "contact.send": "Send message",
    "contact.success.title": "Thanks!",
    "contact.success.desc": "Your email client will open to send the message.",
    "contact.error.title": "Please check your details",
    "contact.error.required": "Name, email, and message are required.",
    "contact.error.email": "Please enter a valid email address.",

    // Footer
    "footer.tagline":
      "A Saudi platform built to manage multi-branch businesses on Google Maps — listings, reviews, and analytics in one place.",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.about": "About Qrar",
    "footer.demo": "Book a Demo",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
  },
  ar: {
    // Navigation
    "nav.features": "المزايا",
    "nav.howItWorks": "كيف يعمل",
    "nav.pricing": "الأسعار",
    "nav.faq": "الأسئلة الشائعة",
    "nav.contact": "تواصل معنا",
    "nav.startFree": "ابدأ مجاناً",

    // Hero
    "hero.eyebrow": "منصّة سعودية لإدارة حضورك على خرائط جوجل",
    "hero.headline": "تحكّم كامل بحضورك الرقمي على خرائط جوجل ماب",
    "hero.subheadline":
      "أدر جميع فروعك، وراقب التقييمات، وحدّث بيانات حضورك الرقمي من لوحة واحدة — بدقة وسرعة وانتظام.",
    "hero.ctaPrimary": "ابدأ تجربة مجانية",
    "hero.ctaSecondary": "احجز عرضاً توضيحياً",

    // Features
    "features.eyebrow": "المزايا",
    "features.title": "لوحة واحدة. كل الفروع. تحكم كامل.",
    "features.subtitle":
      "كل ما تحتاجه لإدارة حضورك على جوجل بمساحة عمل واحدة بسيطة وأنيقة.",
    "features.branches.title": "إدارة موحدة لجميع الفروع",
    "features.branches.desc":
      "حدّث كل قوائم Google Maps الخاصة بك من لوحة تحكم واحدة.",
    "features.reviews.title": "مراقبة التقييمات والرد عليها",
    "features.reviews.desc":
      "إشعارات فورية ورد على كل تقييم دون تنقل بين علامات التبويب.",
    "features.analytics.title": "تحليلات الأداء",
    "features.analytics.desc":
      "تابع المشاهدات والبحث والتفاعلات لكل فرع بتقارير مرئية واضحة.",
    "features.photos.title": "إدارة الصور والمعلومات",
    "features.photos.desc":
      "حدّث صور النشاط وساعات العمل والتفاصيل في كل الفروع دفعة واحدة.",
    "features.notifications.title": "إشعارات فورية",
    "features.notifications.desc":
      "لن تفوتك أي مراجعة جديدة بفضل التنبيهات اللحظية لكل الفروع.",
    "features.team.title": "وصول لكامل الفريق",
    "features.team.desc":
      "أضف فريق العمليات والتسويق بمقاعد غير محدودة، دون رسوم لكل مستخدم.",

    // How it works
    "how.eyebrow": "كيف يعمل",
    "how.title": "جاهز للعمل خلال دقائق.",
    "how.subtitle": "ثلاث خطوات بسيطة. بدون إعدادات تقنية. بدون انتظار.",
    "how.step1.title": "اربط حسابك على جوجل",
    "how.step1.desc": "صادق على Qrar بنقرة واحدة عبر OAuth الآمن.",
    "how.step2.title": "نزامن لك جميع الفروع",
    "how.step2.desc": "نسحب تلقائياً كل موقع وتقييم ومقياس.",
    "how.step3.title": "أدر كل شيء من لوحة واحدة",
    "how.step3.desc": "حدّث، رد، وحلّل — في كل الفروع دفعة واحدة.",

    // Why Qrar
    "why.eyebrow": "لماذا Qrar",
    "why.title": "مصمّم لطريقة عمل الأنشطة السعودية فعلاً.",
    "why.subtitle":
      "منصّة بُنيت حول العمليات الحقيقية للفروع المتعددة — وليست أداة عامة معدّلة.",
    "why.tile1.title": "فروع غير محدودة",
    "why.tile1.desc": "لوحة واحدة موحّدة دون إعداد لكل فرع.",
    "why.tile2.title": "سهولة استخدام",
    "why.tile2.desc": "واجهة عربية أولاً يستخدمها أي فرد في فريقك.",
    "why.tile3.title": "آمن بطبيعته",
    "why.tile3.desc": "اتصال واحد عبر تسجيل دخول آمن، دون تخزين كلمات المرور.",
    "why.tile4.title": "مزامنة لحظية",
    "why.tile4.desc": "تظهر التحديثات على خرائط جوجل خلال دقائق، لا أيام.",
    "why.tile5.title": "وصول للفريق بأكمله",
    "why.tile5.desc": "أضف فريق العمليات والتسويق بمقاعد غير محدودة.",
    "why.tile6.title": "دعم سعودي",
    "why.tile6.desc": "فريق محلي ودعم عربي بأوقات السوق السعودي.",

    // Metrics
    "metrics.businesses": "شركة",
    "metrics.branches": "فرع نديره",
    "metrics.reviews": "تقييم نراقبه",

    // Pricing
    "pricing.eyebrow": "الأسعار",
    "pricing.title": "أسعار بسيطة تنمو معك.",
    "pricing.subtitle": "ابدأ مجاناً. ارتقِ عندما تنمو. تحدث معنا عندما تتوسع.",
    "pricing.popular": "الأكثر شعبية",
    "pricing.starter.name": "المبتدئ",
    "pricing.starter.price": "مجاني",
    "pricing.starter.desc": "للأنشطة بفرع واحد.",
    "pricing.starter.f1": "فرع واحد",
    "pricing.starter.f2": "مراقبة التقييمات",
    "pricing.starter.f3": "تحليلات أساسية",
    "pricing.starter.cta": "ابدأ مجاناً",
    "pricing.growth.name": "النمو",
    "pricing.growth.price": "مخصص",
    "pricing.growth.desc": "للسلاسل المتنامية بعدة فروع.",
    "pricing.growth.f1": "حتى 25 فرعاً",
    "pricing.growth.f2": "إشعارات فورية",
    "pricing.growth.f3": "تحليلات متقدمة",
    "pricing.growth.f4": "دعم ذو أولوية",
    "pricing.growth.cta": "تواصل مع المبيعات",
    "pricing.enterprise.name": "المؤسسات",
    "pricing.enterprise.price": "لنتحدث",
    "pricing.enterprise.desc": "للعلامات الوطنية والامتيازات.",
    "pricing.enterprise.f1": "فروع غير محدودة",
    "pricing.enterprise.f2": "مدير حساب مخصص",
    "pricing.enterprise.f3": "اتفاقية مستوى خدمة وتكاملات مخصصة",
    "pricing.enterprise.f4": "تأهيل وتدريب",
    "pricing.enterprise.cta": "تواصل معنا",

    // FAQ
    "faq.eyebrow": "الأسئلة الشائعة",
    "faq.title": "إجابات لأهم أسئلتك.",
    "faq.subtitle": "كل ما تحتاج معرفته عن Qrar قبل أن تبدأ.",
    "faq.q1.q": "كم يستغرق تفعيل Qrar؟",
    "faq.q1.a":
      "دقائق فقط. تربط حسابك التجاري مرة واحدة، ونزامن جميع فروعك تلقائياً.",
    "faq.q2.q": "هل Qrar مناسب للأنشطة متعدّدة الفروع؟",
    "faq.q2.a":
      "نعم، يدعم Qrar عدداً غير محدود من الفروع، يمكنك إدارتها جميعاً من واجهة واحدة دون تسجيل الدخول لكل فرع.",
    "faq.q3.q": "كيف تحمون حساب جوجل الخاص بي؟",
    "faq.q3.a":
      "نستخدم تسجيل دخول آمن ورسمي عبر Google. لا نخزّن كلمة المرور إطلاقاً، ويمكنك إلغاء الصلاحية في أي وقت من إعدادات حسابك.",
    "faq.q4.q": "هل يمكن لفريقي بأكمله استخدام Qrar؟",
    "faq.q4.a":
      "بالتأكيد. اشتراكك يمنحك صلاحية دخول غير محدودة لفريقك، دون رسوم إضافية لكل مستخدم.",
    "faq.q5.q": "هل أتلقى إشعارات فورية بالتقييمات الجديدة؟",
    "faq.q5.a":
      "نعم، يصلك تنبيه فوري عند نشر أي تقييم جديد على أي من فروعك، مع إمكانية الرد مباشرة من اللوحة.",
    "faq.q6.q": "ما نوع التحليلات التي تقدّمونها؟",
    "faq.q6.a":
      "تتابع المشاهدات، عمليات البحث، طلبات الاتجاهات، والتفاعلات لكل فرع، في تقارير مرئية واضحة وقابلة للمقارنة.",

    // Final CTA
    "finalCTA.title": "هل أنت مستعد لتعزيز تواجدك الرقمي على خرائط جوجل؟",
    "finalCTA.subtitle":
      "انضم إلى الأنشطة التي اختارت إدارة فروعها بذكاء وانتظام.",
    "finalCTA.cta": "ابدأ الآن",

    // Contact form
    "contact.eyebrow": "تواصل معنا",
    "contact.title": "لنتحدث.",
    "contact.subtitle": "أخبرنا عن نشاطك وسنرد عليك خلال يوم عمل واحد.",
    "contact.name": "الاسم الكامل",
    "contact.namePlaceholder": "اسمك",
    "contact.email": "البريد الإلكتروني",
    "contact.emailPlaceholder": "you@company.com",
    "contact.company": "الشركة (اختياري)",
    "contact.companyPlaceholder": "اسم شركتك",
    "contact.message": "رسالتك",
    "contact.messagePlaceholder": "كيف يمكننا مساعدتك؟",
    "contact.send": "إرسال الرسالة",
    "contact.success.title": "شكراً لك!",
    "contact.success.desc": "سيُفتح بريدك الإلكتروني لإرسال الرسالة.",
    "contact.error.title": "يرجى مراجعة بياناتك",
    "contact.error.required": "الاسم والبريد والرسالة حقول مطلوبة.",
    "contact.error.email": "يرجى إدخال بريد إلكتروني صالح.",

    // Footer
    "footer.tagline":
      "منصّة سعودية متخصصة في إدارة حضور الأنشطة التجارية على خرائط جوجل، عبر لوحة موحّدة لإدارة الفروع والتقييمات.",
    "footer.product": "المنتج",
    "footer.company": "الشركة",
    "footer.legal": "الشؤون القانونية",
    "footer.about": "عن قرار",
    "footer.demo": "احجز عرضاً توضيحياً",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الاستخدام",
    "footer.contact": "تواصل معنا",
    "footer.rights": "جميع الحقوق محفوظة.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("qrar-language");
    return (saved as Language) || "en";
  });

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("qrar-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const t = (key: string): string => {
    const value = translations[language][key as keyof typeof translations.en];
    return value !== undefined ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
