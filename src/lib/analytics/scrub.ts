// PORTED from the console repo (~/qrar-delovable-work/src/lib/analytics/scrub.ts).
// Keep in sync manually — the qrar_consent cookie contract is shared across
// qrar.ai and console.qrar.ai.
/**
 * Defense-in-depth value scrubber. The registry's closed enums are the
 * primary guarantee that no free text reaches GA; this layer catches
 * anything that slips through a `string`-kind param: email-like values,
 * URLs, long token runs. BigQuery receives events exactly as sent, so this
 * runs client-side before dispatch — there is no server-side cleanup.
 */
import { REGISTRY, type EventName } from './registry';

export const REDACTED = '[redacted]';
export const INVALID_ENUM = '_invalid';

const MAX_STRING = 100;
const EMAIL_RE = /\S+@\S+/;
const URL_RE = /(https?:\/\/|www\.)/i;
// No underscore in the class: our own snake_case ids are underscore-joined
// SHORT segments (reviews_queue_toggle) and must pass, while real secrets
// (hex/base64/UUID/JWT) are unbroken runs of 20+ word chars or hyphens.
const TOKEN_RUN_RE = /[A-Za-z0-9-]{20,}/;

export function scrubString(value: string): string {
  const v = value.slice(0, MAX_STRING);
  if (EMAIL_RE.test(v) || URL_RE.test(v) || TOKEN_RUN_RE.test(v)) return REDACTED;
  return v;
}

export type ParamValue = string | number;

/**
 * Validate + scrub an event's params against its registry spec.
 * - unknown params are dropped;
 * - enum params not in the declared set become '_invalid' (never free text);
 * - bool params must be 'true'/'false';
 * - numbers are clamped finite;
 * - string params go through scrubString.
 * Never throws.
 */
export function scrubEventParams(name: EventName, params: Record<string, unknown>): Record<string, ParamValue> {
  const spec = REGISTRY[name];
  const out: Record<string, ParamValue> = {};
  for (const [key, paramSpec] of Object.entries(spec.params)) {
    const raw = (params as Record<string, unknown>)[key];
    try {
      if (paramSpec.kind === 'number') {
        const n = typeof raw === 'number' ? raw : Number(raw);
        out[key] = Number.isFinite(n) ? Math.round(n) : 0;
      } else if (paramSpec.kind === 'bool') {
        out[key] = raw === 'true' || raw === true ? 'true' : 'false';
      } else if (paramSpec.kind === 'enum') {
        const v = typeof raw === 'string' ? raw : String(raw ?? '');
        out[key] = paramSpec.values && (paramSpec.values as readonly string[]).includes(v) ? v : INVALID_ENUM;
      } else {
        const v = typeof raw === 'string' ? raw : String(raw ?? '');
        out[key] = scrubString(v);
      }
    } catch {
      out[key] = paramSpec.kind === 'number' ? 0 : INVALID_ENUM;
    }
  }
  return out;
}
