/**
 * Analytics composition root (landing) — the only module app code imports.
 *
 *   import { analytics, toErrorCategory } from '@/lib/analytics';
 *   analytics.track('cta_click', { cta_kind: 'signup', source: 'hero', tier_id: 'none' });
 *
 * Gates (all must pass before anything is dispatched):
 *   configured    — VITE_GA4_MEASUREMENT_ID present at Vite server start
 *                   (same measurement ID as console.qrar.ai — one web stream,
 *                   so sessions continue across the .qrar.ai subdomains).
 *   !hardDisabled — navigator.webdriver (automation), the localStorage kill
 *                   switch, or a `cms-preview=1` URL (the AdminLanding iframe
 *                   preview is not a visit).
 *   consent       — 'granted' via the shared qrar_consent cookie.
 *
 * Gated calls are still recorded in a local ring buffer with a dropped_*
 * disposition (window.qrarAnalytics.lastEvents()).
 */
import { createCore, type PageFields } from './core';
import * as loader from './gtagLoader';
import { sanitizeLocation, sanitizeReferrer } from './sanitizeUrl';
import { buildConsentCookie, parseConsentCookie, type ConsentStatus } from './consent';
import { buildInternalCookie, parseInternalCookie } from './internal';
import { type EventName, type EventParams } from './registry';

export { toErrorCategory, toSnakeCase } from './registry';
export type { EventName, EventParams } from './registry';

const DISABLED_KEY = 'qrar.analyticsDisabled';
const DEBUG_KEY = 'qrar.analyticsDebug';

const isBrowser = typeof window !== 'undefined';

const storageGet = (key: string): string | null => {
  try {
    return isBrowser ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
};
const storageSet = (key: string, value: string): void => {
  try {
    if (isBrowser) window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
};
const storageRemove = (key: string): void => {
  try {
    if (isBrowser) window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
};

const MEASUREMENT_ID = String(import.meta.env.VITE_GA4_MEASUREMENT_ID ?? '').trim();
const configured = MEASUREMENT_ID.length > 0;
const inCmsPreview = isBrowser && window.location.search.includes('cms-preview=1');
const hardDisabled =
  isBrowser &&
  (window.navigator?.webdriver === true || storageGet(DISABLED_KEY) !== null || inCmsPreview);
const debugEnabled = storageGet(DEBUG_KEY) === '1';

const core = createCore((name, params) => loader.dispatch(name, params));
core.setConfigured(configured);
core.setHardDisabled(hardDisabled);

const subscribers = new Set<() => void>();
const notify = (): void => {
  for (const cb of subscribers) {
    try {
      cb();
    } catch {
      // ignore
    }
  }
};

const currentSanitizedFields = (): PageFields => {
  const origin = window.location.origin;
  const loc = sanitizeLocation(origin, window.location.pathname, window.location.search);
  return {
    page_location: loc.url,
    page_referrer: sanitizeReferrer(origin, document.referrer),
    page_title: loc.label,
  };
};

const bootIfEligible = (): void => {
  if (configured && !hardDisabled && core.status().consent === 'granted' && isBrowser) {
    loader.boot(MEASUREMENT_ID, { debug: debugEnabled, pageFields: currentSanitizedFields() });
  }
};

// Initialize consent from the shared cookie; re-write it on every load to
// extend the iOS ITP window when a choice already exists.
if (isBrowser) {
  const initial = parseConsentCookie(document.cookie);
  core.setConsent(initial);
  if (configured && !hardDisabled) {
    loader.ensureStub();
    if (initial !== 'unset') {
      try {
        document.cookie = buildConsentCookie(initial, window.location.hostname);
      } catch {
        // ignore
      }
    }
    bootIfEligible();
  }
}

function track<N extends EventName>(name: N, params: EventParams<N>): void {
  core.track(name, params as Record<string, unknown>);
}

function page(fields: PageFields): void {
  core.setLocation(fields);
  loader.setPageFields(fields);
  track('page_view', {} as EventParams<'page_view'>);
}

function grantConsent(): void {
  if (core.status().consent === 'granted') return;
  if (isBrowser) {
    try {
      document.cookie = buildConsentCookie('granted', window.location.hostname);
    } catch {
      // ignore
    }
  }
  core.setConsent('granted');
  bootIfEligible();
  track('consent_update', { status: 'granted' });
  notify();
}

function denyConsent(): void {
  const was = core.status().consent;
  if (was === 'granted') {
    track('consent_update', { status: 'denied' });
    loader.consentDenied();
  }
  if (isBrowser) {
    try {
      document.cookie = buildConsentCookie('denied', window.location.hostname);
    } catch {
      // ignore
    }
  }
  core.setConsent('denied');
  if (was !== 'granted') track('consent_update', { status: 'denied' });
  notify();
}

const readInternalFlag = (): boolean => {
  try {
    return isBrowser && parseInternalCookie(document.cookie);
  } catch {
    return false;
  }
};

const writeInternalFlag = (on: boolean): void => {
  try {
    if (isBrowser) document.cookie = buildInternalCookie(on, window.location.hostname);
  } catch {
    // ignore
  }
};

function setInternal(on: boolean): void {
  if (core.status().internal === on) return;
  core.setInternal(on);
  loader.setInternalTraffic(on);
  notify();
}

let crashCount = 0;
const crashNames = new Set<string>();
const reportCrash = (errorName: string, source: 'window_error' | 'unhandled_rejection'): void => {
  if (crashCount >= 3 || crashNames.has(errorName)) return;
  crashCount += 1;
  crashNames.add(errorName);
  track('app_crash', { error_name: errorName, source });
};

let initialized = false;
function init(): void {
  if (initialized || !isBrowser) return;
  initialized = true;
  window.addEventListener('error', (event) => {
    try {
      const name =
        event?.error && typeof event.error === 'object' && 'name' in event.error
          ? String((event.error as { name?: unknown }).name || 'Error')
          : 'Error';
      reportCrash(name, 'window_error');
    } catch {
      // ignore
    }
  });
  window.addEventListener('unhandledrejection', (event) => {
    try {
      const reason = (event as PromiseRejectionEvent).reason;
      const name =
        reason && typeof reason === 'object' && 'name' in reason
          ? String((reason as { name?: unknown }).name || 'UnhandledRejection')
          : 'UnhandledRejection';
      reportCrash(name, 'unhandled_rejection');
    } catch {
      // ignore
    }
  });
  (window as unknown as Record<string, unknown>).qrarAnalytics = {
    status: () => ({
      ...core.status(),
      measurementId: MEASUREMENT_ID || null,
      booted: loader.isBooted(),
      internalFlag: readInternalFlag(),
    }),
    lastEvents: () => core.getBuffer(),
    grantConsent,
    denyConsent,
    markInternal: () => {
      writeInternalFlag(true);
      setInternal(true);
    },
    clearInternal: () => {
      writeInternalFlag(false);
      setInternal(false);
    },
    debug: (on: boolean) => {
      if (on) storageSet(DEBUG_KEY, '1');
      else storageRemove(DEBUG_KEY);
      return 'debug_mode applies after reload';
    },
  };
}

export const analytics = {
  track,
  page,
  init,
  grantConsent,
  denyConsent,
  consentStatus: (): ConsentStatus => core.status().consent,
  isConfigured: (): boolean => configured,
  isHardDisabled: (): boolean => hardDisabled,
  isInternal: (): boolean => core.status().internal,
  setInternal,
  hasInternalFlag: readInternalFlag,
  persistInternalFlag: (): void => writeInternalFlag(true),
  removeInternalFlag: (): void => writeInternalFlag(false),
  subscribe: (cb: () => void): (() => void) => {
    subscribers.add(cb);
    return () => subscribers.delete(cb);
  },
  statusKey: (): string => {
    const s = core.status();
    return `${s.consent}|${s.internal}|${s.configured}|${s.hardDisabled}`;
  },
};
