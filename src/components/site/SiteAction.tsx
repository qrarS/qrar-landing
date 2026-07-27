import type { ReactNode } from 'react';
import type { LandingLink } from '@/content/landing';
import { usePublishedLanding } from '@/contexts/LandingContentContext';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
import { analytics, toErrorCategory } from '@/lib/analytics';
import { cn } from '@/lib/utils';

function hrefFor(link: LandingLink, auth: { signupUrl: string; signinUrl: string }): string | null {
  switch (link.kind) {
    case 'anchor': return '/#' + link.value.replace(/^#/, '');
    case 'signup': return auth.signupUrl;
    case 'signin': return auth.signinUrl;
    case 'route': return link.value.startsWith('/') ? link.value : null;
    case 'mailto': return 'mailto:' + link.value.replace(/^mailto:/, '');
    case 'external': return /^https:\/\//i.test(link.value) ? link.value : null;
    default: return null;
  }
}

type CtaSource = 'header' | 'header_mobile' | 'footer' | 'hero' | 'pricing' | 'use_cases' | 'najd' | 'final_cta' | 'about';

export function SiteAction({ link, className, disabledClassName, children, onClick, source, tierId }: {
  link: LandingLink;
  className?: string;
  disabledClassName?: string;
  children?: ReactNode;
  onClick?: () => void;
  /** Analytics: which surface rendered this CTA (cta_click.source). */
  source?: CtaSource;
  /** Analytics: pricing tier id for per-tier CTAs. */
  tierId?: string;
}) {
  const { landing } = usePublishedLanding();
  const { pick, isArabic } = useSiteLanguage();
  const href = hrefFor(link, landing.auth);
  const disabled = !href || (link.kind === 'signup' && landing.signupDisabled);
  const label = children ?? pick(link.label);

  if (disabled) {
    return (
      <span
        className={cn(className, disabledClassName, 'cursor-not-allowed opacity-60')}
        aria-disabled
        title={link.kind === 'signup'
          ? (isArabic ? 'التسجيل غير متاح حاليًا' : 'Sign-up is currently unavailable')
          : (isArabic ? 'متاح قريبًا' : 'Available soon')}
      >
        {label}
      </span>
    );
  }

  const external = link.kind === 'external';
  const handleClick = () => {
    // Every console CTA in the app renders through here — the cta_click
    // choke point (gtag delivers via beacon, safe across same-tab navigation).
    if (source && link.kind !== 'placeholder') {
      analytics.track('cta_click', {
        cta_kind: link.kind,
        source,
        tier_id: tierId ? toErrorCategory(tierId) : 'none',
      });
    }
    onClick?.();
  };
  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {label}
    </a>
  );
}
