import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LANDING_CONTENT,
  LANDING_SCHEMA_VERSION,
  upgradeLandingContent,
  validateLandingContent,
  type LandingCustomer,
} from '../landing';

const customer = (overrides: Partial<LandingCustomer> = {}): LandingCustomer => ({
  id: 'riwaq-cafe',
  name: { en: 'Riwaq Café', ar: 'مقهى رِواق' },
  logoUrl: 'https://example.com/logos/riwaq.webp',
  ...overrides,
});

describe('landing content contract', () => {
  it('accepts the compiled bilingual default document', () => {
    expect(DEFAULT_LANDING_CONTENT.schemaVersion).toBe(LANDING_SCHEMA_VERSION);
    expect(validateLandingContent(DEFAULT_LANDING_CONTENT)).toEqual({ valid: true, errors: [] });
  });

  it('ships the customers strip disabled and empty in the offline fallback', () => {
    expect(DEFAULT_LANDING_CONTENT.customers.enabled).toBe(false);
    expect(DEFAULT_LANDING_CONTENT.customers.items).toEqual([]);
  });

  it('upgrades a v2 document by backfilling customers without mutating it', () => {
    const legacy = structuredClone(DEFAULT_LANDING_CONTENT) as unknown as Record<string, unknown>;
    legacy.schemaVersion = 2;
    delete legacy.customers;

    const upgraded = upgradeLandingContent(legacy);

    expect(legacy.schemaVersion).toBe(2);
    expect(legacy.customers).toBeUndefined();
    expect(upgraded?.schemaVersion).toBe(LANDING_SCHEMA_VERSION);
    expect(upgraded?.customers).toEqual(DEFAULT_LANDING_CONTENT.customers);
    expect(validateLandingContent(upgraded)).toEqual({ valid: true, errors: [] });
  });

  it('preserves populated customers through the upgrade path', () => {
    const content = structuredClone(DEFAULT_LANDING_CONTENT);
    content.customers.enabled = true;
    content.customers.items = [customer(), customer({ id: 'najd-retail' })];

    const upgraded = upgradeLandingContent(content);

    expect(upgraded?.customers.enabled).toBe(true);
    expect(upgraded?.customers.items.map((item) => item.id)).toEqual(['riwaq-cafe', 'najd-retail']);
  });

  it('rejects malformed customer entries', () => {
    const content = structuredClone(DEFAULT_LANDING_CONTENT);
    content.customers.items = [
      customer({ id: 'Bad Id!' }),
      customer({ logoUrl: `https://example.com/${'x'.repeat(3000)}` }),
    ];

    const result = validateLandingContent(content);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('customers.items[0].id is invalid');
    expect(result.errors).toContain('customers.items[1].logoUrl is invalid');
  });

  it('treats display settings as optional but rejects out-of-range values', () => {
    const content = structuredClone(DEFAULT_LANDING_CONTENT);
    delete (content.customers as { display?: unknown }).display;
    expect(validateLandingContent(content)).toEqual({ valid: true, errors: [] });

    content.customers.display = {
      logoHeight: 8,
      gap: 500,
      secondsPerLogo: 0.1,
      blendWhiteBackgrounds: 'yes' as unknown as boolean,
    };
    const result = validateLandingContent(content);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('customers.display.logoHeight is invalid');
    expect(result.errors).toContain('customers.display.gap is invalid');
    expect(result.errors).toContain('customers.display.secondsPerLogo is invalid');
    expect(result.errors).toContain('customers.display.blendWhiteBackgrounds is invalid');
  });

  it('caps the customer strip at 12 entries', () => {
    const content = structuredClone(DEFAULT_LANDING_CONTENT);
    content.customers.items = Array.from({ length: 13 }, (_, index) => customer({ id: `customer-${index}` }));

    const result = validateLandingContent(content);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('customers.items must contain at most 12 items');
  });
});
