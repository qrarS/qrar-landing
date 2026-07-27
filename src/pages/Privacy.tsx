import LegalPage, { type LegalSection } from "@/components/site/SiteLegalPage";

const EFFECTIVE_DATE = "July 27, 2026";

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: { en: "Introduction", ar: "مقدمة" },
    body: {
      en: (
        <>
          <p>
            Qrar (<strong>"we"</strong>, <strong>"us"</strong>, or{" "}
            <strong>"our"</strong>) operates the website{" "}
            <a href="https://qrar.ai">qrar.ai</a> and the Qrar platform.
          </p>
          <p>
            This Privacy Policy explains what data we collect, how we use it,
            and the rights you have in relation to your personal information.
          </p>
        </>
      ),
      ar: (
        <>
          <p>
            تُشغّل قرار (<strong>«نحن»</strong>) الموقع الإلكتروني{" "}
            <a href="https://qrar.ai">qrar.ai</a> ومنصّة Qrar.
          </p>
          <p>
            توضّح سياسة الخصوصية هذه البيانات التي نجمعها، وكيفية استخدامها،
            والحقوق المتاحة لك فيما يخص بياناتك الشخصية.
          </p>
        </>
      ),
    },
  },
  {
    id: "data-we-collect",
    title: { en: "Data We Collect", ar: "البيانات التي نجمعها" },
    body: {
      en: (
        <ul>
          <li>
            <strong>Account information:</strong> name, business name, and email
            address.
          </li>
          <li>
            <strong>Google Business Profile data</strong> accessed via OAuth on
            your behalf: location info, reviews, performance metrics, and
            photos.
          </li>
          <li>
            <strong>Usage data:</strong> pages visited, features used, and
            session duration.
          </li>
          <li>
            We do <strong>not</strong> collect payment card data directly — it
            is handled securely by our payment processor.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            <strong>بيانات الحساب:</strong> الاسم، اسم النشاط التجاري، والبريد
            الإلكتروني.
          </li>
          <li>
            <strong>بيانات Google Business Profile</strong> التي نصل إليها عبر
            OAuth بالنيابة عنك: معلومات المواقع، التقييمات، مقاييس الأداء،
            والصور.
          </li>
          <li>
            <strong>بيانات الاستخدام:</strong> الصفحات التي تزورها، الميزات
            المستخدمة، ومدة الجلسة.
          </li>
          <li>
            <strong>لا</strong> نجمع بيانات بطاقات الدفع مباشرة — تتم معالجتها
            بأمان عبر مزوّد خدمة الدفع.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "how-we-use",
    title: { en: "How We Use Your Data", ar: "كيف نستخدم بياناتك" },
    body: {
      en: (
        <ul>
          <li>To provide the Qrar platform and its features.</li>
          <li>To sync and manage your Google Business Profile locations.</li>
          <li>
            To send you product updates and alerts (such as review
            notifications).
          </li>
          <li>To improve platform performance and user experience.</li>
          <li>
            We do <strong>not</strong> sell your data to any third party.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>لتقديم منصّة Qrar وميزاتها.</li>
          <li>
            لمزامنة وإدارة مواقع Google Business Profile الخاصة بك.
          </li>
          <li>
            لإرسال تحديثات المنتج والتنبيهات (مثل إشعارات التقييمات).
          </li>
          <li>لتحسين أداء المنصّة وتجربة المستخدم.</li>
          <li>
            <strong>لا</strong> نبيع بياناتك لأي طرف ثالث.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "google-oauth",
    title: { en: "Google OAuth & API Data", ar: "Google OAuth وبيانات API" },
    body: {
      en: (
        <ul>
          <li>
            We access your Google Business Profile data solely through Google's
            official OAuth 2.0 flow.
          </li>
          <li>
            You grant access voluntarily and can revoke it at any time from
            your Google Account settings.
          </li>
          <li>
            We only request the minimum permissions necessary to operate the
            platform.
          </li>
          <li>
            Google's Privacy Policy also applies:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              policies.google.com/privacy
            </a>
            .
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            نصل إلى بيانات Google Business Profile الخاصة بك حصراً عبر تدفّق
            OAuth 2.0 الرسمي من Google.
          </li>
          <li>
            تمنحنا الصلاحية طوعياً، ويمكنك إلغاؤها في أي وقت من إعدادات حساب
            Google الخاص بك.
          </li>
          <li>
            نطلب فقط الحد الأدنى من الأذونات اللازمة لتشغيل المنصّة.
          </li>
          <li>
            تنطبق سياسة خصوصية Google كذلك:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              policies.google.com/privacy
            </a>
            .
          </li>
        </ul>
      ),
    },
  },
  {
    id: "storage-security",
    title: {
      en: "Data Storage & Security",
      ar: "تخزين البيانات وأمنها",
    },
    body: {
      en: (
        <ul>
          <li>Data is stored on secure cloud infrastructure.</li>
          <li>
            We use industry-standard encryption in transit (HTTPS) and at rest.
          </li>
          <li>
            Access to your data is restricted to authorized Qrar personnel
            only.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>تُخزَّن البيانات على بنية تحتية سحابية آمنة.</li>
          <li>
            نستخدم تشفيراً وفق معايير الصناعة أثناء النقل (HTTPS) وعند التخزين.
          </li>
          <li>
            يقتصر الوصول إلى بياناتك على موظفي Qrar المخوّلين فقط.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "data-retention",
    title: { en: "Data Retention", ar: "الاحتفاظ بالبيانات" },
    body: {
      en: (
        <ul>
          <li>We retain your data for as long as your account is active.</li>
          <li>
            Upon account deletion, your data is removed within 30 days.
          </li>
          <li>
            Google OAuth tokens are revoked immediately upon disconnection.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>نحتفظ ببياناتك طالما أن حسابك فعّال.</li>
          <li>
            عند حذف الحساب، تُحذف بياناتك خلال 30 يوماً.
          </li>
          <li>
            تُلغى رموز Google OAuth فور قطع الاتصال.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "your-rights",
    title: { en: "Your Rights", ar: "حقوقك" },
    body: {
      en: (
        <ul>
          <li>Access, correct, or delete your personal data at any time.</li>
          <li>Withdraw Google OAuth consent at any time.</li>
          <li>Request a copy of your data.</li>
          <li>
            Contact us at:{" "}
            <a href="mailto:info@qrar.ai">info@qrar.ai</a>.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت.</li>
          <li>سحب موافقتك على Google OAuth في أي وقت.</li>
          <li>طلب نسخة من بياناتك.</li>
          <li>
            تواصل معنا عبر:{" "}
            <a href="mailto:info@qrar.ai">info@qrar.ai</a>.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "third-parties",
    title: { en: "Third-Party Services", ar: "خدمات الأطراف الثالثة" },
    body: {
      en: (
        <ul>
          <li>Google Business Profile API (Google LLC).</li>
          <li>Cloud hosting providers.</li>
          <li>Google Analytics (Google LLC) — see the Cookies &amp; Analytics section below.</li>
          <li>
            Each third party operates under its own privacy policy, which we
            encourage you to review.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>واجهة Google Business Profile API (شركة Google LLC).</li>
          <li>مزوّدو الاستضافة السحابية.</li>
          <li>تحليلات Google (شركة Google LLC) — راجع قسم ملفات تعريف الارتباط والتحليلات أدناه.</li>
          <li>
            يعمل كل طرف ثالث وفق سياسة خصوصيته الخاصة، وننصحك بمراجعتها.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "cookies-analytics",
    title: { en: "Cookies & Analytics", ar: "ملفات تعريف الارتباط والتحليلات" },
    body: {
      en: (
        <ul>
          <li>
            <strong>Analytics cookies (optional):</strong> with your consent, we use
            Google Analytics to understand how qrar.ai and console.qrar.ai are used —
            pages visited, features used, and where visitors come from. Nothing is
            collected before you choose "Accept" on the consent banner.
          </li>
          <li>
            <strong>What we never send:</strong> no names, emails, phone numbers,
            passwords, review content, or anything you type. Web addresses are
            stripped of identifiers before any measurement is recorded.
          </li>
          <li>
            <strong>Cookies used:</strong> <strong>qrar_consent</strong> remembers your
            choice, and Google's <strong>_ga</strong> cookies distinguish visits. Both
            are set for the qrar.ai domain, so one choice covers the website and the
            console together.
          </li>
          <li>
            <strong>Your choice:</strong> declining (or doing nothing) keeps analytics
            fully off. You can withdraw consent at any time by clearing this site's
            cookies in your browser — the banner will ask again.
          </li>
        </ul>
      ),
      ar: (
        <ul>
          <li>
            <strong>ملفات تعريف ارتباط تحليلية (اختيارية):</strong> بموافقتك، نستخدم
            تحليلات Google لفهم كيفية استخدام qrar.ai وconsole.qrar.ai — الصفحات
            المزارة والميزات المستخدمة ومصادر الزيارات. لا نجمع أي شيء قبل اختيارك
            «موافق» في شريط الموافقة.
          </li>
          <li>
            <strong>ما لا نرسله أبداً:</strong> لا أسماء ولا بريداً إلكترونياً ولا أرقام
            جوال ولا كلمات مرور ولا محتوى مراجعات ولا أي شيء تكتبه. وتُجرَّد عناوين
            الصفحات من أي مُعرِّفات قبل تسجيل أي قياس.
          </li>
          <li>
            <strong>الملفات المستخدمة:</strong> يحفظ <strong>qrar_consent</strong>{" "}
            اختيارك، وتميّز ملفات <strong>_ga</strong> من Google الزيارات. يُضبط
            كلاهما على نطاق qrar.ai، فيغطي اختيار واحد الموقع ولوحة التحكم معاً.
          </li>
          <li>
            <strong>خيارك بيدك:</strong> الرفض (أو عدم الاختيار) يبقي التحليلات
            متوقفة تماماً. ويمكنك سحب موافقتك في أي وقت بمسح ملفات تعريف الارتباط
            لهذا الموقع من متصفحك — وسيسألك الشريط مجدداً.
          </li>
        </ul>
      ),
    },
  },
  {
    id: "changes",
    title: { en: "Changes to This Policy", ar: "تحديثات على هذه السياسة" },
    body: {
      en: (
        <p>
          We may update this Privacy Policy from time to time. When we do, we
          will notify users via email or in-app notification.
        </p>
      ),
      ar: (
        <p>
          قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. وعند القيام بذلك،
          سنخطر المستخدمين عبر البريد الإلكتروني أو إشعار داخل التطبيق.
        </p>
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

const Privacy = () => (
  <LegalPage
    eyebrow={{ en: "Legal", ar: "قانوني" }}
    title={{ en: "Privacy Policy", ar: "سياسة الخصوصية" }}
    intro={{
      en: "How Qrar collects, uses, and protects your information when you use qrar.ai and our platform.",
      ar: "كيف تقوم Qrar بجمع بياناتك واستخدامها وحمايتها عند استخدامك لموقع qrar.ai والمنصّة.",
    }}
    effectiveDate={EFFECTIVE_DATE}
    sections={sections}
  />
);

export default Privacy;
