// PORTED from the console repo (~/qrar-delovable-work/src/lib/analytics/gtagLoader.ts).
// Keep in sync manually — the qrar_consent cookie contract is shared across
// qrar.ai and console.qrar.ai.
/**
 * gtag.js adapter. Nothing here runs until the composition root decides the
 * session is configured and not hard-disabled, and the SCRIPT is injected
 * only after consent is granted (Consent Mode v2, Basic — zero requests to
 * Google before then).
 *
 * Ordering (correct for deferred injection): the consent `default`
 * (all denied) is pushed when the stub is created; on grant we push the
 * consent `update`, then `js`, then `config`, then inject the script —
 * gtag.js replays the dataLayer queue in order.
 *
 * gtag attaches page_location/page_referrer to EVERY hit (including its
 * automatic session_start/user_engagement), so setPageFields() must be
 * called with sanitized values on every route change BEFORE any event.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const DATALAYER_CAP = 500; // memory guard when the script is blocked and never drains the queue

let stubReady = false;
let booted = false;

const gtag = (...args: unknown[]): void => {
  try {
    window.gtag?.(...args);
  } catch {
    // never throw into app code
  }
};

export function ensureStub(): void {
  if (stubReady || typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function gtagStub() {
        // gtag.js requires the Arguments object, not an array
        // eslint-disable-next-line prefer-rest-params
        (window.dataLayer as unknown[]).push(arguments);
      };
    }
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
    stubReady = true;
  } catch {
    // ignore
  }
}

export function boot(
  measurementId: string,
  options: {
    debug: boolean;
    /** Sanitized page fields, seeded BEFORE config: gtag's automatic hits
     *  (session_start, enhanced-measurement events) fire with the current
     *  document.location otherwise — which can carry auth tokens on
     *  /auth/confirm. Never boot without them. */
    pageFields: { page_location: string; page_referrer: string; page_title: string };
  },
): void {
  if (booted || typeof window === 'undefined') return;
  ensureStub();
  gtag('consent', 'update', { analytics_storage: 'granted' });
  gtag('set', options.pageFields);
  gtag('js', new Date());
  gtag('config', measurementId, {
    send_page_view: false,
    ...options.pageFields,
    ...(options.debug ? { debug_mode: true } : {}),
  });
  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.onerror = () => {
      // Blocked by an ad-blocker or offline — the stub keeps swallowing calls.
    };
    document.head.appendChild(script);
    booted = true;
  } catch {
    // ignore
  }
}

export function isBooted(): boolean {
  return booted;
}

export function dispatch(name: string, params: Record<string, string | number>): void {
  if (typeof window === 'undefined') return;
  if ((window.dataLayer?.length ?? 0) > DATALAYER_CAP) return;
  gtag('event', name, params);
}

export function setPageFields(fields: { page_location: string; page_referrer: string; page_title: string }): void {
  gtag('set', fields);
}

export function setUserId(userId: string | null): void {
  gtag('set', { user_id: userId });
}

export function setUserProperties(props: Record<string, string>): void {
  gtag('set', 'user_properties', props);
}

export function setInternalTraffic(on: boolean): void {
  // Clearing applies fully after reload (gtag has no documented unset); the
  // core also stops merging traffic_type into event params immediately.
  gtag('set', { traffic_type: on ? 'internal' : null });
}

export function consentDenied(): void {
  gtag('consent', 'update', { analytics_storage: 'denied' });
}
