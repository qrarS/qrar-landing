import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { SiteLogo } from '@/components/site/SiteLogo';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';

// Standalone lead-capture page (qrar.ai/interests) built to match the
// "سجل اهتمامك Qrar" design mockup. Self-contained styling on purpose —
// it deliberately uses the mockup's Tajawal/Poppins fonts and palette
// rather than the landing design system.

const INTEREST_ENDPOINT = import.meta.env.VITE_QRAR_INTEREST_ENDPOINT
  || 'https://ukskidcsercplsklvdar.supabase.co/functions/v1/register-interest';

const FONTS_LINK_ID = 'qrar-interest-fonts';
const FONTS_HREF = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap';

const COPY = {
  ar: {
    title: 'سجّل اهتمامك',
    intro: 'قرار منصة ذكاء اصطناعي متخصصة في تحليل آراء العملاء على خرائط Google — تكشف لك نقاط القوة والضعف وتقدّم توصيات قابلة للتطبيق لتنمية أعمالك.',
    nameLabel: 'الاسم', namePh: 'اكتب اسمك الكامل',
    bizLabel: 'اسم النشاط التجاري', bizPh: 'مثال: قهوة قرار / مطعم قرار',
    branchLabel: 'عدد الفروع', branchPh: 'مثال: 5',
    phoneLabel: 'رقم الجوال', phonePh: '05xxxxxxxx',
    submitLabel: 'سجّل اهتمامك', submittingLabel: 'جارٍ الإرسال…',
    privacy: 'لن نشارك بياناتك مع أي جهة. سنتواصل معك قريباً.',
    successTitle: 'تم تسجيل اهتمامك!',
    successBody: 'شكراً لك، سيتواصل فريق قرار معك قريباً لتجربة المنصة.',
    againLabel: 'تسجيل مرة أخرى',
    langLabel: 'English',
    errorRequired: 'فضلاً عبّئ جميع الحقول.',
    errorBranches: 'أدخل عدد فروع صحيحاً (1 أو أكثر).',
    errorPhone: 'أدخل رقم جوال صحيحاً.',
    errorSubmit: 'تعذّر الإرسال، حاول مرة أخرى.',
    docTitle: 'سجّل اهتمامك | قرار',
  },
  en: {
    title: 'Register Your Interest',
    intro: 'Qrar is an AI platform specialized in analyzing customer reviews on Google Maps — revealing your strengths and weaknesses and giving actionable recommendations to grow your business.',
    nameLabel: 'Full name', namePh: 'Enter your full name',
    bizLabel: 'Business name', bizPh: 'e.g. Qrar Coffee / Qrar Restaurant',
    branchLabel: 'Number of branches', branchPh: 'e.g. 5',
    phoneLabel: 'Mobile number', phonePh: '05xxxxxxxx',
    submitLabel: 'Register interest', submittingLabel: 'Submitting…',
    privacy: "We never share your data. We'll reach out to you soon.",
    successTitle: "You're on the list!",
    successBody: 'Thank you — the Qrar team will contact you soon to try the platform.',
    againLabel: 'Register again',
    langLabel: 'العربية',
    errorRequired: 'Please fill in all fields.',
    errorBranches: 'Enter a valid number of branches (1 or more).',
    errorPhone: 'Enter a valid mobile number.',
    errorSubmit: 'Something went wrong, please try again.',
    docTitle: 'Register Your Interest | Qrar',
  },
} as const;

interface DiamondSpec {
  left: number; top: number; size: number; depth: number;
  op: number; filled: boolean; dur: string; delay: string;
}

function makeDiamonds(): DiamondSpec[] {
  const r = (a: number, b: number) => a + Math.random() * (b - a);
  return Array.from({ length: 26 }, () => {
    const size = r(14, 62);
    return {
      left: r(-2, 98),
      top: r(-4, 100),
      size,
      depth: r(0.3, 1) * (size > 40 ? 1.4 : 0.7),
      op: r(0.06, 0.22),
      filled: Math.random() > 0.4,
      dur: r(6, 13).toFixed(1),
      delay: r(0, 6).toFixed(1),
    };
  });
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 14,
  border: '1.5px solid #E3D7EE',
  background: '#fff',
  fontFamily: 'inherit',
  fontSize: 16,
  color: '#2E1A47',
};

const labelStyle: CSSProperties = { fontWeight: 700, fontSize: 14, color: '#2E1A47' };
const fieldStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8 };

export default function RegisterInterest() {
  const { isArabic, toggleLanguage } = useSiteLanguage();
  const t = COPY[isArabic ? 'ar' : 'en'];
  const fontStack = isArabic ? "'Tajawal', sans-serif" : "'Poppins', sans-serif";

  const [name, setName] = useState('');
  const [biz, setBiz] = useState('');
  const [branches, setBranches] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — humans never see it
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const diamonds = useMemo(makeDiamonds, []);
  const diamondRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!document.getElementById(FONTS_LINK_ID)) {
      const link = document.createElement('link');
      link.id = FONTS_LINK_ID;
      link.rel = 'stylesheet';
      link.href = FONTS_HREF;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = t.docTitle;
    return () => { document.title = previous; };
  }, [t.docTitle]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      diamondRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = diamonds[i].depth;
        el.style.transform = `translate(${(-cx * d * 46).toFixed(1)}px, ${(-cy * d * 46).toFixed(1)}px)`;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [diamonds]);

  const reset = () => {
    setName(''); setBiz(''); setBranches(''); setPhone('');
    setError(null); setStatus('idle');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setError(null);

    const branchesCount = Number.parseInt(branches, 10);
    if (!name.trim() || !biz.trim() || !branches.trim() || !phone.trim()) {
      setError(t.errorRequired);
      return;
    }
    if (!Number.isInteger(branchesCount) || branchesCount < 1) {
      setError(t.errorBranches);
      return;
    }
    if (!/^\+?[0-9\s\-()]{5,31}$/.test(phone.trim())) {
      setError(t.errorPhone);
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(INTEREST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name.trim(),
          businessName: biz.trim(),
          branchesCount,
          phone: phone.trim(),
          language: isArabic ? 'ar' : 'en',
          website,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
    } catch {
      setStatus('idle');
      setError(t.errorSubmit);
    }
  };

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: fontStack,
        background: 'linear-gradient(150deg,#F7F2FB 0%,#EFE4F5 55%,#E7D6F0 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes qrPop { 0% { transform: scale(.6); opacity: 0; } 60% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes qrRise { from { transform: translateY(14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes qrFloat { 0%,100% { transform: rotate(45deg) translateY(0); } 50% { transform: rotate(45deg) translateY(-14px); } }
        .qr-interest input::placeholder { color: #B9AEC9; }
        .qr-interest input:focus { outline: none; border-color: #A94FE0 !important; box-shadow: 0 0 0 4px rgba(169,79,224,.13); }
        .qr-interest .qr-submit:hover { transform: translateY(-2px); }
        .qr-interest .qr-lang:hover { background: #fff; border-color: rgba(169,79,224,.4); }
      `}</style>

      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {diamonds.map((d, i) => (
          <div
            key={i}
            ref={(el) => { diamondRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              transition: 'transform .5s cubic-bezier(.2,.8,.2,1)',
              willChange: 'transform',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: Math.max(3, d.size * 0.16),
                opacity: d.op,
                background: d.filled ? 'linear-gradient(135deg,#A94FE0,#7C3AED)' : 'transparent',
                border: d.filled ? 'none' : '2px solid #A94FE0',
                animation: `qrFloat ${d.dur}s ease-in-out ${d.delay}s infinite`,
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: -120,
          [isArabic ? 'left' : 'right']: -120,
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(169,79,224,.22),transparent 68%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="qr-interest" style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 2 }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px clamp(20px,5vw,60px)' }}>
          <SiteLogo className="h-11" />
          <button
            type="button"
            onClick={toggleLanguage}
            className="qr-lang"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,.7)', border: '1px solid rgba(46,26,71,.12)',
              borderRadius: 999, padding: '9px 18px', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: 700, fontSize: 14, color: '#2E1A47',
              backdropFilter: 'blur(6px)',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#A94FE0' }} />
            {t.langLabel}
          </button>
        </header>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px clamp(18px,5vw,60px) 48px', gap: 'clamp(26px,4vw,36px)' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, animation: 'qrRise .6s ease both' }}>
            <h1 style={{ margin: 0, fontWeight: 900, fontSize: 'clamp(34px,7vw,66px)', lineHeight: 1.08, color: '#2E1A47', letterSpacing: '-.5px' }}>{t.title}</h1>
            <p style={{ margin: '18px auto 0', maxWidth: 520, fontWeight: 500, fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.7, color: '#6B5B84' }}>{t.intro}</p>
          </div>

          {status === 'success' ? (
            <div style={{ width: '100%', maxWidth: 480, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.9)', borderRadius: 26, boxShadow: '0 30px 70px -30px rgba(46,26,71,.4)', padding: '46px 34px', textAlign: 'center', animation: 'qrRise .5s ease both' }}>
              <div style={{ width: 76, height: 76, margin: '0 auto 22px', borderRadius: '50%', background: 'linear-gradient(135deg,#2E1A47,#A94FE0)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'qrPop .5s ease both' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 style={{ margin: '0 0 10px', fontWeight: 800, fontSize: 26, color: '#2E1A47' }}>{t.successTitle}</h2>
              <p style={{ margin: 0, fontWeight: 500, fontSize: 16, lineHeight: 1.7, color: '#6B5B84' }}>{t.successBody}</p>
              <button type="button" onClick={reset} style={{ marginTop: 26, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, color: '#A94FE0' }}>{t.againLabel}</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: 480, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.9)', borderRadius: 26, boxShadow: '0 30px 70px -30px rgba(46,26,71,.4)', padding: '34px clamp(24px,4vw,38px)', display: 'flex', flexDirection: 'column', gap: 20, animation: 'qrRise .6s .1s ease both' }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>{t.nameLabel}</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePh} maxLength={120} style={inputStyle} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>{t.bizLabel}</label>
                <input value={biz} onChange={(e) => setBiz(e.target.value)} placeholder={t.bizPh} maxLength={160} style={inputStyle} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>{t.branchLabel}</label>
                <input value={branches} onChange={(e) => setBranches(e.target.value)} type="number" min={1} placeholder={t.branchPh} style={inputStyle} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>{t.phoneLabel}</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder={t.phonePh} maxLength={32} style={{ ...inputStyle, direction: 'ltr', textAlign: isArabic ? 'right' : 'left' }} />
              </div>

              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: -9999, top: -9999, width: 1, height: 1, opacity: 0 }}
              />

              <button
                type="submit"
                className="qr-submit"
                disabled={status === 'submitting'}
                style={{
                  marginTop: 6, width: '100%', padding: 16, border: 'none', borderRadius: 14,
                  cursor: status === 'submitting' ? 'wait' : 'pointer',
                  background: 'linear-gradient(135deg,#2E1A47,#A94FE0)', color: '#fff',
                  fontFamily: 'inherit', fontWeight: 800, fontSize: 17,
                  boxShadow: '0 14px 30px -10px rgba(169,79,224,.6)',
                  transition: 'transform .15s ease',
                  opacity: status === 'submitting' ? 0.75 : 1,
                }}
              >
                {status === 'submitting' ? t.submittingLabel : t.submitLabel}
              </button>

              {error && (
                <p role="alert" style={{ margin: 0, textAlign: 'center', fontSize: 13.5, fontWeight: 600, color: '#C0392B' }}>{error}</p>
              )}

              <p style={{ margin: 0, textAlign: 'center', fontSize: 12.5, color: '#9384A8', fontWeight: 500 }}>{t.privacy}</p>
            </form>
          )}
        </main>

        <footer style={{ textAlign: 'center', padding: '0 20px 24px', fontSize: 13, color: '#9384A8', fontWeight: 500 }}>© 2026 Qrar · qrar.ai</footer>
      </div>
    </div>
  );
}
