import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { NOT_FOUND_TEMPLATE, ROUTE_TEMPLATES, sanitizePath } from '../sanitizeUrl';

// Keeps the sanitizer's route templates in lockstep with SiteApp.tsx.

const appSource = readFileSync(new URL('../../../SiteApp.tsx', import.meta.url), 'utf8');

// '/Intersters' is a <Navigate replace> typo-redirect — it never settles as a
// page_view, so the sanitizer intentionally has no template for it.
const SKIP = new Set(['*', '/Intersters']);

const derivedTemplates = (): Set<string> => {
  const templates = new Set<string>();
  for (const match of appSource.matchAll(/path="([^"]+)"/g)) {
    const path = match[1];
    if (SKIP.has(path)) continue;
    expect(path.startsWith('/'), `unexpected relative route ${path}`).toBe(true);
    templates.add(path);
  }
  return templates;
};

describe('SiteApp.tsx ↔ sanitizer route sync', () => {
  const fromApp = derivedTemplates();

  it('found a plausible route table', () => {
    expect(fromApp.size).toBeGreaterThanOrEqual(5);
    expect(fromApp.has('/interests')).toBe(true);
  });

  it('every SiteApp route sanitizes to its own template', () => {
    for (const template of fromApp) {
      expect(sanitizePath(template).template, `SiteApp route ${template} missing from ROUTE_TEMPLATES`).toBe(template);
    }
  });

  it('every sanitizer template exists in SiteApp (no stale templates)', () => {
    for (const route of ROUTE_TEMPLATES) {
      if (route.template === NOT_FOUND_TEMPLATE) continue;
      expect(fromApp.has(route.template), `stale template ${route.template}`).toBe(true);
    }
  });
});
