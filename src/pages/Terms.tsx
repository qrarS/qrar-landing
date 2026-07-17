import LegalPage, { type LegalSection } from "@/components/site/SiteLegalPage";

const EFFECTIVE_DATE = "April 27, 2026";

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: { en: "Introduction", ar: "مقدمة" },
    body: {
      en: (
        <>
          <p>
            These Terms of Service ("Terms") govern your use of Qrar at{" "}
            <a href="https://qrar.ai">qrar.ai</a>. By accessing or using Qrar,
            you agree to be bound by these Terms.
          </p>
          <p>
            Qrar is operated by Qrar (قرار), based in Riyadh, Kingdom of Saudi
            Arabia.
          </p>
        </>
      ),
      ar: (
        <>
          <p>
            تحكم شروط الخدمة هذه («الشروط») استخدامك لمنصّة Qrar على{" "}
            <a href="https://qrar.ai">qrar.ai</a>. باستخدامك للمنصّة، فإنك
            توافق على الالتزام بهذه الشروط.
          </p>
          <p>
            تُشغَّل المنصّة من قِبَل قرار (Qrar) ومقرها الرياض، المملكة العربية
            السعودية.
          </p>
        </>
      ),
    },
  },
  {
    id: "eligibility",
    title: { en: "Eligibility", ar: "الأهلية" },
    body: {
      en: (
        <ul>
          <li>
            You must be a registered business or an authorized representative
            of one.
          </li>
          <li>You must be 18 years of age or older.</li>
          <li>
            By connecting your Google account, you confirm that you have the
            authority to do so on behalf of your business.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            يجب أن تكون نشاطاً تجارياً مسجّلاً أو ممثلاً مخوّلاً عنه.
          </li>
          <li>يجب أن يكون عمرك 18 عاماً أو أكثر.</li>
          <li>
            بربط حساب Google الخاص بك، فإنك تؤكد امتلاكك صلاحية القيام بذلك
            بالنيابة عن نشاطك التجاري.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "account",
    title: { en: "Your Account", ar: "حسابك" },
    body: {
      en: (
        <ul>
          <li>
            You are responsible for maintaining the security of your account.
          </li>
          <li>You must provide accurate business information.</li>
          <li>
            Notify us immediately of any unauthorized access at{" "}
            <a href="mailto:support@qrar.ai">support@qrar.ai</a>.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>أنت مسؤول عن الحفاظ على أمان حسابك.</li>
          <li>يجب عليك تقديم معلومات تجارية دقيقة.</li>
          <li>
            أبلغنا فوراً بأي وصول غير مصرّح به على{" "}
            <a href="mailto:support@qrar.ai">support@qrar.ai</a>.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "google-access",
    title: {
      en: "Google Business Profile Access",
      ar: "الوصول إلى Google Business Profile",
    },
    body: {
      en: (
        <ul>
          <li>
            Qrar accesses your GBP data solely through Google's official OAuth
            2.0 flow.
          </li>
          <li>
            You grant Qrar permission to read and write to your GBP listings,
            reviews, and location data on your behalf.
          </li>
          <li>
            You can revoke this access at any time through your Google Account
            settings.
          </li>
          <li>Qrar is not affiliated with or endorsed by Google LLC.</li>
          <li>
            Your use of Google services remains subject to Google's own Terms
            of Service.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            تصل Qrar إلى بيانات GBP الخاصة بك حصراً عبر تدفّق OAuth 2.0 الرسمي
            من Google.
          </li>
          <li>
            تمنح Qrar صلاحية قراءة وكتابة قوائم GBP والتقييمات وبيانات المواقع
            بالنيابة عنك.
          </li>
          <li>
            يمكنك إلغاء هذه الصلاحية في أي وقت من إعدادات حساب Google.
          </li>
          <li>
            Qrar ليست تابعة لشركة Google LLC ولا معتمدة من قبلها.
          </li>
          <li>
            يخضع استخدامك لخدمات Google لشروط خدمة Google الخاصة بها.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "acceptable-use",
    title: { en: "Acceptable Use", ar: "الاستخدام المقبول" },
    body: {
      en: (
        <ul>
          <li>
            You may not use Qrar to violate Google's Terms of Service or
            policies.
          </li>
          <li>
            You may not use Qrar to post fake, misleading, or incentivized
            reviews.
          </li>
          <li>
            You may not attempt to reverse engineer or otherwise misuse the
            platform.
          </li>
          <li>
            You may not resell or redistribute Qrar's services without our
            written consent.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            لا يجوز استخدام Qrar لانتهاك شروط أو سياسات Google.
          </li>
          <li>
            لا يجوز استخدام Qrar لنشر تقييمات مزيّفة أو مضلّلة أو مدفوعة.
          </li>
          <li>
            لا يجوز محاولة الهندسة العكسية أو إساءة استخدام المنصّة.
          </li>
          <li>
            لا يجوز إعادة بيع أو توزيع خدمات Qrar دون موافقة كتابية منّا.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "billing",
    title: {
      en: "Subscription & Billing",
      ar: "الاشتراك والفوترة",
    },
    body: {
      en: (
        <ul>
          <li>Qrar is offered on a subscription basis.</li>
          <li>
            Fees are billed in advance on a monthly or annual basis.
          </li>
          <li>
            No refunds for partial periods unless required by applicable law.
          </li>
          <li>
            We reserve the right to change pricing with 30 days' prior notice.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>تُقدَّم Qrar وفق نظام الاشتراك.</li>
          <li>
            تُفوتر الرسوم مقدماً على أساس شهري أو سنوي.
          </li>
          <li>
            لا توجد مبالغ مستردّة للفترات الجزئية ما لم يُلزم القانون المعمول
            به بذلك.
          </li>
          <li>
            نحتفظ بحق تعديل الأسعار بإشعار مسبق مدته 30 يوماً.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "availability",
    title: { en: "Service Availability", ar: "توفّر الخدمة" },
    body: {
      en: (
        <ul>
          <li>
            We aim for high availability but do not guarantee 100% uptime.
          </li>
          <li>
            We are not liable for Google API outages or changes to Google's
            platform.
          </li>
          <li>
            Scheduled maintenance will be communicated in advance whenever
            possible.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            نسعى لتقديم توفّر عالٍ، لكنّنا لا نضمن تشغيلاً بنسبة 100%.
          </li>
          <li>
            لسنا مسؤولين عن أعطال Google API أو التغييرات على منصّة Google.
          </li>
          <li>
            سيتم الإعلان عن أعمال الصيانة المجدولة مسبقاً متى أمكن ذلك.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "ip",
    title: { en: "Intellectual Property", ar: "الملكية الفكرية" },
    body: {
      en: (
        <ul>
          <li>
            Qrar's platform, design, and content are owned by Qrar.
          </li>
          <li>
            Your business data remains yours — we claim no ownership over it.
          </li>
          <li>
            You grant Qrar a limited license to process your data solely to
            provide the service.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            منصّة Qrar وتصميمها ومحتواها ملك لشركة Qrar.
          </li>
          <li>
            بيانات نشاطك التجاري تبقى ملكك — لا ندّعي أي ملكية عليها.
          </li>
          <li>
            تمنح Qrar ترخيصاً محدوداً لمعالجة بياناتك حصراً لأغراض تقديم
            الخدمة.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "liability",
    title: { en: "Limitation of Liability", ar: "تحديد المسؤولية" },
    body: {
      en: (
        <ul>
          <li>
            Qrar is provided <strong>"as is"</strong> without warranties of any
            kind.
          </li>
          <li>
            We are not liable for indirect, incidental, or consequential
            damages.
          </li>
          <li>
            Our total liability shall not exceed the fees paid in the last 3
            months.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            تُقدَّم Qrar <strong>«كما هي»</strong> دون أي ضمانات من أي نوع.
          </li>
          <li>
            لسنا مسؤولين عن الأضرار غير المباشرة أو العرضية أو التبعية.
          </li>
          <li>
            لا تتجاوز مسؤوليتنا الإجمالية الرسوم المدفوعة في آخر 3 أشهر.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "termination",
    title: { en: "Termination", ar: "إنهاء الخدمة" },
    body: {
      en: (
        <ul>
          <li>You may cancel your account at any time.</li>
          <li>
            We may suspend or terminate accounts that violate these Terms.
          </li>
          <li>
            Upon termination, your data will be deleted within 30 days.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>يمكنك إلغاء حسابك في أي وقت.</li>
          <li>
            يحق لنا تعليق أو إنهاء الحسابات التي تخالف هذه الشروط.
          </li>
          <li>
            عند إنهاء الخدمة، سيتم حذف بياناتك خلال 30 يوماً.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "governing-law",
    title: { en: "Governing Law", ar: "القانون الحاكم" },
    body: {
      en: (
        <ul>
          <li>
            These Terms are governed by the laws of the Kingdom of Saudi
            Arabia.
          </li>
          <li>
            Disputes shall be resolved in the courts of Riyadh, Saudi Arabia.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            تخضع هذه الشروط لأنظمة المملكة العربية السعودية.
          </li>
          <li>
            تُحلّ النزاعات أمام محاكم مدينة الرياض في المملكة العربية السعودية.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "changes",
    title: { en: "Changes to Terms", ar: "تحديثات الشروط" },
    body: {
      en: (
        <ul>
          <li>
            We may update these Terms and will notify users 14 days in advance.
          </li>
          <li>
            Continued use after changes take effect constitutes acceptance.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            قد نقوم بتحديث هذه الشروط، وسنخطر المستخدمين قبل 14 يوماً من
            التطبيق.
          </li>
          <li>
            يعدّ الاستمرار في استخدام المنصّة بعد سريان التحديثات قبولاً بها.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "contact",
    title: { en: "Contact", ar: "تواصل معنا" },
    body: {
      en: (
        <ul>
          <li>
            Email: <a href="mailto:info@qrar.ai">info@qrar.ai</a>
          </li>
          <li>
            Website: <a href="https://qrar.ai">qrar.ai</a>
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            البريد الإلكتروني:{" "}
            <a href="mailto:info@qrar.ai">info@qrar.ai</a>
          </li>
          <li>
            الموقع الإلكتروني: <a href="https://qrar.ai">qrar.ai</a>
          </li>
        </ul>
      ),
    },
  },
];

const Terms = () => (
  <LegalPage
    eyebrow={{ en: "Legal", ar: "قانوني" }}
    title={{ en: "Terms of Service", ar: "شروط الاستخدام" }}
    intro={{
      en: "The terms that govern your access to and use of the Qrar platform.",
      ar: "الشروط التي تحكم وصولك إلى منصّة Qrar واستخدامك لها.",
    }}
    effectiveDate={EFFECTIVE_DATE}
    lastUpdatedLabel={{ en: "Last updated", ar: "آخر تحديث" }}
    sections={sections}
  />
);

export default Terms;
