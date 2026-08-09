# Qrar Landing (qrar.ai) — GA4 Analytics Reference

> GENERATED FILE — do not edit by hand. Source of truth: `src/lib/analytics/registry.ts`.
> Regenerate with `npm run analytics:docs` (a vitest drift test fails when this file is stale).

Both qrar.ai and console.qrar.ai send to the SAME GA4 measurement ID (one web stream): the `_ga` cookie scopes to `.qrar.ai`, so a visitor's session continues from the landing into the console and console signups attribute to their qrar.ai origin. The consent choice (`qrar_consent` cookie) and internal-traffic marking (`qrar_internal` cookie) are shared across both sites the same way. The full pipeline reference and GA console runbook live in the console repo's `docs/analytics.md`.

## Events

Every event automatically carries sanitized `page_location`, `page_referrer`, `page_title`, and `traffic_type: internal` when internal marking is active. `#` marks numeric custom metrics.

| Event | Trigger | Question it answers | Params |
|---|---|---|---|
| `page_view` | Settled route change (AnalyticsListener: 50ms coalesce — absorbs the /Intersters typo-redirect — deduped on identical sanitized URL). | Which landing pages get traffic. | — |
| `consent_update` | Consent banner / qrarAnalytics seam. The choice is shared with console.qrar.ai via the qrar_consent cookie on .qrar.ai. | Consent grant/deny rate on the marketing site. | status: granted, denied |
| `app_crash` | window error / unhandledrejection listeners (cap 3 per session, deduped by error name; no message or stack ever). | Does the landing site crash anywhere. | error_name: string; source: window_error, unhandled_rejection |
| `cta_click` | Any SiteAction link click — the single choke point every console CTA renders through. | Which CTAs convert visitors toward console.qrar.ai (cta_kind signup/signin), and which nav/anchor links get used. | cta_kind: anchor, signup, signin, route, mailto, external; source: header, header_mobile, footer, hero, pricing, use_cases, najd, final_cta, about; tier_id: string |
| `section_view` | IntersectionObserver on landing-page sections (threshold 0.4, ~300ms dwell), once per section per page load. | Which sections visitors actually see before converting or leaving. | section_id: top, customers, how_it_works, response_story, features, audience, pricing, use_cases, najd, start |
| `language_change` | User toggles the site language. | AR vs EN preference of prospects. | app_language: en, ar; change_source: header, interests |
| `interest_form_engage` | First change in any /interests field (values never captured — the form collects a phone number). | Started-but-never-submitted rate of the interest form. | — |
| `interest_form_fail` | Interest-form validation or submit failure. | Where the interest form loses people. | error_category: string |
| `interest_form_complete` | Interest-form POST succeeded. | Lead volume from the landing site. | branch_count# |

## GA Admin — custom definitions used by landing events

Most are already registered for the console. NEW dimensions introduced by the landing: `section_id`, `cta_kind`, `tier_id`.

Event-scoped dimensions (9): `app_language`, `change_source`, `cta_kind`, `error_category`, `error_name`, `section_id`, `source`, `status`, `tier_id`

Event-scoped metrics (1): `branch_count`

## Operations

- **Enablement**: presence of `VITE_GA4_MEASUREMENT_ID` at Vite server start (prod runs `vite dev`, so `import.meta.env.PROD` is never used as a gate). Prod: add the var to `/home/admin/factory/prod/qrar-landing/.env` and `systemctl --user restart qrar-landing-prod`.
- **Consent**: Consent Mode v2, Basic. Shared cookie `qrar_consent` on `domain=.qrar.ai`; unset/denied ⇒ gtag.js never loads. The banner links to `/privacy#cookies-analytics`.
- **Internal traffic**: `?qrar_internal=1` marks the browser via the shared `qrar_internal` cookie (`=0` clears); a fixed chip shows while excluded. The CMS preview iframe (`cms-preview=1`) is always hard-disabled.
- **Kill switches / debug**: `navigator.webdriver` hard-disables; `localStorage['qrar.analyticsDisabled']`; `localStorage['qrar.analyticsDebug']='1'` adds `debug_mode` (reload). Inspect with `window.qrarAnalytics.status()` / `.lastEvents()`.
