/**
 * Internal-traffic marking (landing side). The device flag is a cookie on
 * domain=.qrar.ai shared with console.qrar.ai — marking a browser once on
 * either site excludes it on both (traffic_type=internal rides the GA
 * property's Internal Traffic data filter). The landing has no auth, so
 * there is no account-derived path here; `?qrar_internal=1` / `=0` is the
 * only control (the console also auto-marks admins/@qrar.ai accounts and
 * writes this same cookie).
 */
import { isQrarHost } from './consent';

export const INTERNAL_COOKIE = 'qrar_internal';
const INTERNAL_MAX_AGE = 31536000; // 12 months, re-written on every visit

export function parseInternalParam(search: string): 'set' | 'clear' | null {
  try {
    const value = new URLSearchParams(search || '').get('qrar_internal');
    if (value === '1') return 'set';
    if (value === '0') return 'clear';
    return null;
  } catch {
    return null;
  }
}

export function parseInternalCookie(cookieHeader: string | null | undefined): boolean {
  if (!cookieHeader) return false;
  for (const part of cookieHeader.split(';')) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() === INTERNAL_COOKIE) return part.slice(eq + 1).trim() === '1';
  }
  return false;
}

/** Cookie assignment string to set (on=true) or clear (on=false) the flag. */
export function buildInternalCookie(on: boolean, hostname: string): string {
  const base = on
    ? `${INTERNAL_COOKIE}=1; path=/; max-age=${INTERNAL_MAX_AGE}; SameSite=Lax`
    : `${INTERNAL_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  return isQrarHost(hostname) ? `${base}; domain=.qrar.ai${on ? '; Secure' : ''}` : base;
}
