import { describe, expect, it } from 'vitest';
import { NOT_FOUND_TEMPLATE, ROUTE_TEMPLATES, sanitizeLocation, sanitizePath, sanitizeReferrer } from '../sanitizeUrl';

const ORIGIN = 'https://qrar.ai';

describe('sanitizePath', () => {
  it('maps every declared template to itself', () => {
    for (const route of ROUTE_TEMPLATES) {
      if (route.template === NOT_FOUND_TEMPLATE) continue;
      expect(sanitizePath(route.template).template).toBe(route.template);
    }
  });

  it('never returns a raw unknown path', () => {
    expect(sanitizePath('/totally/unknown').template).toBe(NOT_FOUND_TEMPLATE);
    expect(sanitizePath('/Intersters').template).toBe(NOT_FOUND_TEMPLATE);
    expect(sanitizePath('/interests/extra').template).toBe(NOT_FOUND_TEMPLATE);
  });

  it('normalizes trailing slashes', () => {
    expect(sanitizePath('/about/').template).toBe('/about');
    expect(sanitizePath('/').template).toBe('/');
  });
});

describe('sanitizeLocation', () => {
  it('drops every query param and hash', () => {
    expect(sanitizeLocation(ORIGIN, '/', '?utm_source=x&qrar_internal=1&cms-preview=1').url).toBe(`${ORIGIN}/`);
    expect(sanitizeLocation(ORIGIN, '/privacy', '?anything=1').url).toBe(`${ORIGIN}/privacy`);
  });

  it('labels routes', () => {
    expect(sanitizeLocation(ORIGIN, '/interests', '').label).toBe('Register Interest');
  });
});

describe('sanitizeReferrer', () => {
  it('sanitizes same-origin referrers and caps cross-origin ones', () => {
    expect(sanitizeReferrer(ORIGIN, `${ORIGIN}/about?x=1#y`)).toBe(`${ORIGIN}/about`);
    expect(sanitizeReferrer(ORIGIN, 'https://www.google.com/search')).toBe('https://www.google.com/search');
    expect(sanitizeReferrer(ORIGIN, `https://example.com/${'a'.repeat(1000)}`).length).toBeLessThanOrEqual(420);
    expect(sanitizeReferrer(ORIGIN, '')).toBe('');
    expect(sanitizeReferrer(ORIGIN, 'garbage')).toBe('');
  });
});
