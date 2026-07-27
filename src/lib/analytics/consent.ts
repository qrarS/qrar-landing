// PORTED from the console repo (~/qrar-delovable-work/src/lib/analytics/consent.ts).
// Keep in sync manually — the qrar_consent cookie contract is shared across
// qrar.ai and console.qrar.ai.
/**
 * Consent state — persisted in a cookie scoped to `.qrar.ai` so one choice
 * covers both console.qrar.ai and (once the landing adopts the same
 * contract) qrar.ai. localStorage cannot cross subdomains; this cookie is
 * the shared source of truth.
 *
 * Value format is versioned (`v1:granted` / `v1:denied`) so future granular
 * categories can extend it without ambiguity. Anything unrecognized reads
 * as `unset` (fail-closed: unset means nothing is collected).
 *
 * iOS Safari caveat: ITP caps document.cookie-set cookies at ~7 days, so
 * the choice is re-written on every load to extend the window; a Safari
 * user away longer than that will be asked again.
 */

export type ConsentStatus = 'granted' | 'denied' | 'unset';

export const CONSENT_COOKIE = 'qrar_consent';
const CONSENT_MAX_AGE = 31536000; // 12 months (browsers may cap it lower)

export function isQrarHost(hostname: string): boolean {
  return hostname === 'qrar.ai' || hostname.endsWith('.qrar.ai');
}

/** Parse a document.cookie string into a consent status. */
export function parseConsentCookie(cookieHeader: string | null | undefined): ConsentStatus {
  if (!cookieHeader) return 'unset';
  for (const part of cookieHeader.split(';')) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() !== CONSENT_COOKIE) continue;
    const value = part.slice(eq + 1).trim();
    if (value === 'v1:granted') return 'granted';
    if (value === 'v1:denied') return 'denied';
    return 'unset';
  }
  return 'unset';
}

/** Build the exact document.cookie assignment string for a choice. */
export function buildConsentCookie(status: 'granted' | 'denied', hostname: string): string {
  const base = `${CONSENT_COOKIE}=v1:${status}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;
  return isQrarHost(hostname) ? `${base}; domain=.qrar.ai; Secure` : base;
}
