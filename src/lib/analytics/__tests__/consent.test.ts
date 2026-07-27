import { describe, expect, it } from 'vitest';
import { CONSENT_COOKIE, buildConsentCookie, isQrarHost, parseConsentCookie } from '../consent';

describe('parseConsentCookie', () => {
  it('reads granted/denied v1 values', () => {
    expect(parseConsentCookie('qrar_consent=v1:granted')).toBe('granted');
    expect(parseConsentCookie('foo=bar; qrar_consent=v1:denied; baz=1')).toBe('denied');
  });

  it('treats absence and malformed values as unset (fail-closed)', () => {
    expect(parseConsentCookie('')).toBe('unset');
    expect(parseConsentCookie(null)).toBe('unset');
    expect(parseConsentCookie('other=1')).toBe('unset');
    expect(parseConsentCookie('qrar_consent=granted')).toBe('unset'); // unversioned
    expect(parseConsentCookie('qrar_consent=v2:granted')).toBe('unset'); // future version
    expect(parseConsentCookie('qrar_consent=')).toBe('unset');
  });
});

describe('buildConsentCookie', () => {
  it('scopes to .qrar.ai with Secure on qrar hosts', () => {
    const cookie = buildConsentCookie('granted', 'console.qrar.ai');
    expect(cookie).toContain(`${CONSENT_COOKIE}=v1:granted`);
    expect(cookie).toContain('domain=.qrar.ai');
    expect(cookie).toContain('Secure');
    expect(cookie).toContain('SameSite=Lax');
    expect(cookie).toContain('path=/');
    expect(cookie).toContain('max-age=31536000');
  });

  it('stays host-only without Secure on localhost/dev', () => {
    const cookie = buildConsentCookie('denied', 'localhost');
    expect(cookie).toContain(`${CONSENT_COOKIE}=v1:denied`);
    expect(cookie).not.toContain('domain=');
    expect(cookie).not.toContain('Secure');
  });

  it('round-trips through the parser', () => {
    const cookie = buildConsentCookie('granted', 'qrar.ai');
    const pair = cookie.split(';')[0];
    expect(parseConsentCookie(pair)).toBe('granted');
  });
});

describe('isQrarHost', () => {
  it('matches the apex and subdomains only', () => {
    expect(isQrarHost('qrar.ai')).toBe(true);
    expect(isQrarHost('console.qrar.ai')).toBe(true);
    expect(isQrarHost('localhost')).toBe(false);
    expect(isQrarHost('evilqrar.ai')).toBe(false);
  });
});
