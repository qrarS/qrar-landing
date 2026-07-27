/**
 * Landing-site analytics event registry — single source of truth for every
 * GA4 event qrar.ai may send. Same grammar and parameter vocabulary as the
 * console app's registry (~/qrar-delovable-work/src/lib/analytics/registry.ts);
 * both sites report to the SAME measurement ID, so parameter names must stay
 * consistent across repos. `docs/analytics.md` is generated from this file
 * (`npm run analytics:docs`, drift-guarded by docs.test.ts).
 *
 * Rules (enforced by registry.test.ts): snake_case names ≤40 chars,
 * object-first; enum values are closed sets declared here; `error_category`,
 * `error_name` and `tier_id` are `kind: 'string'` normalized via
 * `toErrorCategory()` — never message text, never CMS copy, never PII.
 */

export type ParamKind = 'enum' | 'string' | 'number' | 'bool';

export interface ParamSpec {
  readonly kind: ParamKind;
  readonly values?: readonly string[];
  readonly doc: string;
  readonly ga: 'dimension' | 'metric' | 'none';
}

export interface EventSpec {
  readonly trigger: string;
  readonly question: string;
  readonly params: Readonly<Record<string, ParamSpec>>;
}

export const REGISTRY = {
  page_view: {
    trigger: 'Settled route change (AnalyticsListener: 50ms coalesce — absorbs the /Intersters typo-redirect — deduped on identical sanitized URL).',
    question: 'Which landing pages get traffic.',
    params: {},
  },
  consent_update: {
    trigger: 'Consent banner / qrarAnalytics seam. The choice is shared with console.qrar.ai via the qrar_consent cookie on .qrar.ai.',
    question: 'Consent grant/deny rate on the marketing site.',
    params: {
      status: { kind: 'enum', values: ['granted', 'denied'], doc: 'The choice just made.', ga: 'dimension' },
    },
  },
  app_crash: {
    trigger: 'window error / unhandledrejection listeners (cap 3 per session, deduped by error name; no message or stack ever).',
    question: 'Does the landing site crash anywhere.',
    params: {
      error_name: { kind: 'string', doc: 'Error constructor name only.', ga: 'dimension' },
      source: { kind: 'enum', values: ['window_error', 'unhandled_rejection'], doc: 'Which listener caught it.', ga: 'dimension' },
    },
  },
  cta_click: {
    trigger: 'Any SiteAction link click — the single choke point every console CTA renders through.',
    question: 'Which CTAs convert visitors toward console.qrar.ai (cta_kind signup/signin), and which nav/anchor links get used.',
    params: {
      cta_kind: { kind: 'enum', values: ['anchor', 'signup', 'signin', 'route', 'mailto', 'external'], doc: 'LandingLink kind.', ga: 'dimension' },
      source: { kind: 'enum', values: ['header', 'header_mobile', 'footer', 'hero', 'pricing', 'use_cases', 'najd', 'final_cta', 'about'], doc: 'Which surface rendered the CTA.', ga: 'dimension' },
      tier_id: { kind: 'string', doc: 'Pricing tier id for pricing CTAs (normalized; none when N/A).', ga: 'dimension' },
    },
  },
  section_view: {
    trigger: 'IntersectionObserver on landing-page sections (threshold 0.4, ~300ms dwell), once per section per page load.',
    question: 'Which sections visitors actually see before converting or leaving.',
    params: {
      section_id: { kind: 'enum', values: ['top', 'how_it_works', 'response_story', 'features', 'audience', 'pricing', 'use_cases', 'najd', 'start'], doc: 'Section DOM id, hyphens as underscores.', ga: 'dimension' },
    },
  },
  language_change: {
    trigger: 'User toggles the site language.',
    question: 'AR vs EN preference of prospects.',
    params: {
      app_language: { kind: 'enum', values: ['en', 'ar'], doc: 'Language switched TO.', ga: 'dimension' },
      change_source: { kind: 'enum', values: ['header', 'interests'], doc: 'Which control.', ga: 'dimension' },
    },
  },
  interest_form_engage: {
    trigger: 'First change in any /interests field (values never captured — the form collects a phone number).',
    question: 'Started-but-never-submitted rate of the interest form.',
    params: {},
  },
  interest_form_fail: {
    trigger: 'Interest-form validation or submit failure.',
    question: 'Where the interest form loses people.',
    params: {
      error_category: { kind: 'string', doc: 'required | invalid_branches | invalid_phone | http_error | network. Normalized via toErrorCategory().', ga: 'dimension' },
    },
  },
  interest_form_complete: {
    trigger: 'Interest-form POST succeeded.',
    question: 'Lead volume from the landing site.',
    params: {
      branch_count: { kind: 'number', doc: 'Branch count entered (non-PII integer; no other field is ever sent).', ga: 'metric' },
    },
  },
} as const satisfies Record<string, EventSpec>;

export type EventName = keyof typeof REGISTRY;

type ParamType<P> = P extends { kind: 'number' } ? number
  : P extends { kind: 'bool' } ? 'true' | 'false'
  : P extends { kind: 'enum'; values: readonly (infer V extends string)[] } ? V
  : string;

export type EventParams<N extends EventName> = {
  [K in keyof (typeof REGISTRY)[N]['params']]: ParamType<(typeof REGISTRY)[N]['params'][K]>;
};

/**
 * Normalize a raw identifier (error code, CMS tier id) into a safe
 * snake_case token — anything with whitespace is message text and becomes
 * 'unknown'. Identical to the console implementation.
 */
export const toErrorCategory = (raw: unknown): string => {
  if (typeof raw !== 'string' || raw.length === 0) return 'unknown';
  let s = raw.trim();
  const dot = s.lastIndexOf('.');
  if (dot >= 0) s = s.slice(dot + 1);
  if (/\s/.test(s)) return 'unknown';
  s = s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`).replace(/^_/, '');
  s = s.replace(/[^a-z0-9_]/g, '_').replace(/_{2,}/g, '_').replace(/^_+|_+$/g, '');
  if (!s) return 'unknown';
  return s.slice(0, 40);
};

/** snake_case a hyphenated/camelCase app value for enum params. */
export const toSnakeCase = (v: string): string =>
  v.replace(/-/g, '_').replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`).replace(/^_/, '');
