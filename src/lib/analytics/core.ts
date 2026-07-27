// PORTED from the console repo (~/qrar-delovable-work/src/lib/analytics/core.ts).
// Keep in sync manually — the qrar_consent cookie contract is shared across
// qrar.ai and console.qrar.ai.
/**
 * The tracking pipeline: registry-validate → scrub → merge sanitized
 * location fields (+ traffic_type when internal) → gate → dispatch.
 *
 * Pure module: no window/import.meta access — the composition root
 * (index.ts) injects the dispatcher and flips the gates. Every call is
 * recorded in a small ring buffer with its disposition, so dev builds and
 * tests can assert instrumentation with zero network
 * (window.qrarAnalytics.lastEvents()).
 */
import { REGISTRY, type EventName } from './registry';
import { scrubEventParams, type ParamValue } from './scrub';
import type { ConsentStatus } from './consent';

export type Disposition = 'sent' | 'dropped_consent' | 'dropped_disabled' | 'dropped_invalid';

export interface BufferedEvent {
  ts: number;
  name: string;
  params: Record<string, ParamValue>;
  disposition: Disposition;
}

export interface PageFields {
  page_location: string;
  page_referrer: string;
  page_title: string;
}

export interface CoreStatus {
  configured: boolean;
  hardDisabled: boolean;
  consent: ConsentStatus;
  internal: boolean;
  location: PageFields | null;
}

const BUFFER_MAX = 100;

export interface AnalyticsCore {
  track(name: EventName, params: Record<string, unknown>): Disposition;
  setConfigured(v: boolean): void;
  setHardDisabled(v: boolean): void;
  setConsent(v: ConsentStatus): void;
  setInternal(v: boolean): void;
  setLocation(fields: PageFields): void;
  status(): CoreStatus;
  getBuffer(): readonly BufferedEvent[];
}

export function createCore(
  dispatcher: (name: string, params: Record<string, ParamValue>) => void,
  now: () => number = () => Date.now(),
  /**
   * Optional analysis-context provider (console only): its value is merged
   * into every event as `analysis_context` so journeys are segmentable by
   * analysis type. When absent (landing site), the param is omitted entirely.
   */
  contextProvider?: () => string,
): AnalyticsCore {
  const state: CoreStatus = {
    configured: false,
    hardDisabled: false,
    consent: 'unset',
    internal: false,
    location: null,
  };
  const buffer: BufferedEvent[] = [];

  const record = (name: string, params: Record<string, ParamValue>, disposition: Disposition): Disposition => {
    buffer.push({ ts: now(), name, params, disposition });
    if (buffer.length > BUFFER_MAX) buffer.splice(0, buffer.length - BUFFER_MAX);
    return disposition;
  };

  return {
    track(name, params) {
      if (!(name in REGISTRY)) return record(String(name), {}, 'dropped_invalid');
      const scrubbed = scrubEventParams(name, params ?? {});
      let context: Record<string, ParamValue> = {};
      if (contextProvider) {
        try {
          context = { analysis_context: contextProvider() };
        } catch {
          context = {};
        }
      }
      const merged: Record<string, ParamValue> = {
        ...scrubbed,
        ...state.location ?? {},
        ...(state.internal ? { traffic_type: 'internal' } : {}),
        ...context,
      };
      if (!state.configured || state.hardDisabled) return record(name, merged, 'dropped_disabled');
      if (state.consent !== 'granted') return record(name, merged, 'dropped_consent');
      try {
        dispatcher(name, merged);
      } catch {
        // Analytics must never throw into app code.
      }
      return record(name, merged, 'sent');
    },
    setConfigured(v) { state.configured = v; },
    setHardDisabled(v) { state.hardDisabled = v; },
    setConsent(v) { state.consent = v; },
    setInternal(v) { state.internal = v; },
    setLocation(fields) { state.location = fields; },
    status() {
      return { ...state, location: state.location ? { ...state.location } : null };
    },
    getBuffer() {
      return buffer.slice();
    },
  };
}
