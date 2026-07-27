/**
 * Landing URL sanitization. The marketing site's URLs carry no secrets, but
 * the same discipline applies as on the console: only route templates and an
 * empty query ever reach GA (gtag attaches page_location to every hit).
 * Hash fragments (anchor scrolling) are always dropped — section_view covers
 * in-page interest. routeSync.test.ts keeps templates in lockstep with
 * SiteApp.tsx.
 */

export interface RouteTemplate {
  readonly template: string;
  readonly label: string;
}

export const NOT_FOUND_TEMPLATE = '/_not_found';

export const ROUTE_TEMPLATES: readonly RouteTemplate[] = [
  { template: '/', label: 'Landing' },
  { template: '/about', label: 'About' },
  { template: '/privacy', label: 'Privacy Policy' },
  { template: '/terms', label: 'Terms of Service' },
  { template: '/interests', label: 'Register Interest' },
  { template: NOT_FOUND_TEMPLATE, label: 'Not Found' },
];

/** Marker param consumed by the analytics layer itself — never forwarded. */
export const INTERNAL_QUERY_PARAM = 'qrar_internal';

const normalizePath = (pathname: string): string => {
  let p = pathname || '/';
  if (!p.startsWith('/')) p = `/${p}`;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
};

export function sanitizePath(pathname: string): RouteTemplate {
  const path = normalizePath(pathname);
  for (const route of ROUTE_TEMPLATES) {
    if (route.template === path) return route;
  }
  return ROUTE_TEMPLATES[ROUTE_TEMPLATES.length - 1];
}

export interface SanitizedLocation {
  url: string;
  template: string;
  label: string;
}

/** No query param survives on the landing site (cms-preview, qrar_internal, UTM noise all dropped). */
export function sanitizeLocation(origin: string, pathname: string, _search: string): SanitizedLocation {
  const route = sanitizePath(pathname);
  return { url: `${origin}${route.template}`, template: route.template, label: route.label };
}

const REFERRER_MAX = 420;

export function sanitizeReferrer(origin: string, referrer: string): string {
  if (!referrer) return '';
  let parsed: URL;
  try {
    parsed = new URL(referrer);
  } catch {
    return '';
  }
  if (parsed.origin === origin) {
    return sanitizeLocation(origin, parsed.pathname, parsed.search).url;
  }
  return referrer.slice(0, REFERRER_MAX);
}
