import { describe, expect, it } from 'vitest';
import { createCore, type PageFields } from '../core';

const LOCATION: PageFields = {
  page_location: 'https://qrar.ai/',
  page_referrer: '',
  page_title: 'Landing',
};

const setup = () => {
  const dispatched: Array<{ name: string; params: Record<string, unknown> }> = [];
  const core = createCore((name, params) => dispatched.push({ name, params }), () => 123);
  return { core, dispatched };
};

describe('core gating (landing)', () => {
  it('nothing dispatches before configuration + consent', () => {
    const { core, dispatched } = setup();
    expect(core.track('consent_update', { status: 'granted' })).toBe('dropped_disabled');
    core.setConfigured(true);
    expect(core.track('cta_click', { cta_kind: 'signup', source: 'hero', tier_id: 'none' })).toBe('dropped_consent');
    expect(dispatched).toHaveLength(0);
    core.setConsent('granted');
    expect(core.track('cta_click', { cta_kind: 'signup', source: 'hero', tier_id: 'none' })).toBe('sent');
    expect(dispatched).toHaveLength(1);
  });

  it('merges location fields + traffic_type and validates enums', () => {
    const { core, dispatched } = setup();
    core.setConfigured(true);
    core.setConsent('granted');
    core.setLocation(LOCATION);
    core.setInternal(true);
    core.track('section_view', { section_id: 'pricing' });
    expect(dispatched[0].params).toMatchObject({ ...LOCATION, traffic_type: 'internal', section_id: 'pricing' });
    core.track('section_view', { section_id: 'made-up!' as never });
    expect(dispatched[1].params.section_id).toBe('_invalid');
  });

  it('unknown events are rejected and the buffer caps at 100', () => {
    const { core } = setup();
    expect(core.track('nope' as never, {})).toBe('dropped_invalid');
    for (let i = 0; i < 150; i++) core.track('consent_update', { status: 'granted' });
    expect(core.getBuffer()).toHaveLength(100);
  });

  it('analysis_context is absent on landing events (no provider is wired)', () => {
    const { core } = setup();
    core.setConfigured(true);
    core.setConsent('granted');
    core.track('consent_update', { status: 'granted' });
    expect(core.getBuffer()[0].params).not.toHaveProperty('analysis_context');
  });
});
