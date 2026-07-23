import type { ReactNode } from 'react';
import type { LandingLink } from '@/content/landing';
import { usePublishedLanding } from '@/contexts/LandingContentContext';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
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

export function SiteAction({ link, className, disabledClassName, children, onClick }: {
  link: LandingLink;
  className?: string;
  disabledClassName?: string;
  children?: ReactNode;
  onClick?: () => void;
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
  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {label}
    </a>
  );
}
