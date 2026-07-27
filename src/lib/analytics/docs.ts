/**
 * Renders docs/analytics.md from the landing registry. docs.test.ts asserts
 * the committed file matches; regenerate with `npm run analytics:docs`.
 */
import { REGISTRY, type ParamSpec } from './registry';

const cell = (s: string): string => s.replace(/\|/g, '/').replace(/\n/g, ' ');

const paramSummary = (name: string, spec: ParamSpec): string => {
  if (spec.kind === 'number') return `${name}#`;
  if (spec.kind === 'bool') return `${name}: true/false`;
  if (spec.kind === 'enum') return `${name}: ${(spec.values ?? []).join(', ')}`;
  return `${name}: string`;
};

export function buildAnalyticsDocs(): string {
  const lines: string[] = [];
  lines.push('# Qrar Landing (qrar.ai) — GA4 Analytics Reference');
  lines.push('');
  lines.push('> GENERATED FILE — do not edit by hand. Source of truth: `src/lib/analytics/registry.ts`.');
  lines.push('> Regenerate with `npm run analytics:docs` (a vitest drift test fails when this file is stale).');
  lines.push('');
  lines.push('Both qrar.ai and console.qrar.ai send to the SAME GA4 measurement ID (one web stream): the `_ga` cookie scopes to `.qrar.ai`, so a visitor\'s session continues from the landing into the console and console signups attribute to their qrar.ai origin. The consent choice (`qrar_consent` cookie) and internal-traffic marking (`qrar_internal` cookie) are shared across both sites the same way. The full pipeline reference and GA console runbook live in the console repo\'s `docs/analytics.md`.');
  lines.push('');
  lines.push('## Events');
  lines.push('');
  lines.push('Every event automatically carries sanitized `page_location`, `page_referrer`, `page_title`, and `traffic_type: internal` when internal marking is active. `#` marks numeric custom metrics.');
  lines.push('');
  lines.push('| Event | Trigger | Question it answers | Params |');
  lines.push('|---|---|---|---|');
  for (const [name, spec] of Object.entries(REGISTRY)) {
    const params = Object.entries(spec.params).map(([p, ps]) => paramSummary(p, ps)).join('; ') || '—';
    lines.push(`| \`${name}\` | ${cell(spec.trigger)} | ${cell(spec.question)} | ${cell(params)} |`);
  }
  lines.push('');

  const dimensions = new Set<string>();
  const metrics = new Set<string>();
  for (const spec of Object.values(REGISTRY)) {
    for (const [p, ps] of Object.entries(spec.params)) {
      if (ps.ga === 'dimension') dimensions.add(p);
      if (ps.ga === 'metric') metrics.add(p);
    }
  }
  lines.push('## GA Admin — custom definitions used by landing events');
  lines.push('');
  lines.push('Most are already registered for the console. NEW dimensions introduced by the landing: `section_id`, `cta_kind`, `tier_id`.');
  lines.push('');
  lines.push(`Event-scoped dimensions (${dimensions.size}): ${[...dimensions].sort().map((d) => `\`${d}\``).join(', ')}`);
  lines.push('');
  lines.push(`Event-scoped metrics (${metrics.size}): ${[...metrics].sort().map((m) => `\`${m}\``).join(', ')}`);
  lines.push('');
  lines.push('## Operations');
  lines.push('');
  lines.push('- **Enablement**: presence of `VITE_GA4_MEASUREMENT_ID` at Vite server start (prod runs `vite dev`, so `import.meta.env.PROD` is never used as a gate). Prod: add the var to `/home/admin/factory/prod/qrar-landing/.env` and `systemctl --user restart qrar-landing-prod`.');
  lines.push('- **Consent**: Consent Mode v2, Basic. Shared cookie `qrar_consent` on `domain=.qrar.ai`; unset/denied ⇒ gtag.js never loads. The banner links to `/privacy#cookies-analytics`.');
  lines.push('- **Internal traffic**: `?qrar_internal=1` marks the browser via the shared `qrar_internal` cookie (`=0` clears); a fixed chip shows while excluded. The CMS preview iframe (`cms-preview=1`) is always hard-disabled.');
  lines.push('- **Kill switches / debug**: `navigator.webdriver` hard-disables; `localStorage[\'qrar.analyticsDisabled\']`; `localStorage[\'qrar.analyticsDebug\']=\'1\'` adds `debug_mode` (reload). Inspect with `window.qrarAnalytics.status()` / `.lastEvents()`.');
  lines.push('');
  return lines.join('\n');
}
