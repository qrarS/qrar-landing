import { describe, expect, it } from 'vitest';
import { REGISTRY, toErrorCategory, toSnakeCase } from '../registry';

const SNAKE = /^[a-z][a-z0-9_]*$/;

const RESERVED_NAMES = new Set([
  'first_visit', 'session_start', 'user_engagement', 'first_open', 'app_remove',
  'app_update', 'screen_view', 'form_start', 'form_submit', 'click', 'scroll',
  'file_download', 'view_search_results', 'video_start', 'video_progress',
  'video_complete', 'ad_click', 'ad_impression',
]);
const RESERVED_PREFIXES = ['_', 'ga_', 'google_', 'firebase_'];

describe('landing registry naming rules', () => {
  const entries = Object.entries(REGISTRY);

  it('event names are snake_case, ≤40 chars, no reserved names/prefixes', () => {
    for (const [name] of entries) {
      expect(name, name).toMatch(SNAKE);
      expect(name.length, name).toBeLessThanOrEqual(40);
      expect(RESERVED_NAMES.has(name), name).toBe(false);
      for (const prefix of RESERVED_PREFIXES) expect(name.startsWith(prefix), name).toBe(false);
    }
  });

  it('every event documents trigger + question; params follow the rules', () => {
    for (const [name, spec] of entries) {
      expect(spec.trigger.length, name).toBeGreaterThan(10);
      expect(spec.question.length, name).toBeGreaterThan(5);
      for (const [param, ps] of Object.entries(spec.params)) {
        const label = `${name}.${param}`;
        expect(param, label).toMatch(SNAKE);
        expect(param, label).not.toBe('language');
        if (ps.kind === 'enum') {
          for (const v of ps.values ?? []) expect(v, `${label}=${v}`).toMatch(SNAKE);
        }
        if (ps.kind === 'number') {
          expect(/(_count|_ms|_limit|_index)$/.test(param), label).toBe(true);
          expect(ps.ga, label).toBe('metric');
        }
      }
    }
  });
});

describe('normalizers', () => {
  it('toErrorCategory never forwards message text', () => {
    expect(toErrorCategory('invalid_phone')).toBe('invalid_phone');
    expect(toErrorCategory('Growth Plan!')).toBe('unknown');
    expect(toErrorCategory(undefined)).toBe('unknown');
  });

  it('toSnakeCase handles hyphens and camelCase', () => {
    expect(toSnakeCase('how-it-works')).toBe('how_it_works');
    expect(toSnakeCase('responseStory')).toBe('response_story');
  });
});
