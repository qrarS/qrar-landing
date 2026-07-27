import { describe, expect, it } from 'vitest';
import { buildInternalCookie, parseInternalCookie, parseInternalParam } from '../internal';

describe('parseInternalParam', () => {
  it('parses set/clear and ignores everything else', () => {
    expect(parseInternalParam('?qrar_internal=1')).toBe('set');
    expect(parseInternalParam('?qrar_internal=0')).toBe('clear');
    expect(parseInternalParam('?utm_source=x')).toBeNull();
    expect(parseInternalParam('')).toBeNull();
  });
});

describe('internal cookie (shared with console.qrar.ai)', () => {
  it('parses presence', () => {
    expect(parseInternalCookie('qrar_internal=1')).toBe(true);
    expect(parseInternalCookie('a=b; qrar_internal=1')).toBe(true);
    expect(parseInternalCookie('qrar_internal=0')).toBe(false);
    expect(parseInternalCookie('')).toBe(false);
    expect(parseInternalCookie(null)).toBe(false);
  });

  it('builds set/clear strings with .qrar.ai scoping on qrar hosts', () => {
    const set = buildInternalCookie(true, 'qrar.ai');
    expect(set).toContain('qrar_internal=1');
    expect(set).toContain('domain=.qrar.ai');
    expect(set).toContain('Secure');
    const clear = buildInternalCookie(false, 'qrar.ai');
    expect(clear).toContain('max-age=0');
    const local = buildInternalCookie(true, 'localhost');
    expect(local).not.toContain('domain=');
  });

  it('round-trips', () => {
    expect(parseInternalCookie(buildInternalCookie(true, 'localhost').split(';')[0])).toBe(true);
  });
});
