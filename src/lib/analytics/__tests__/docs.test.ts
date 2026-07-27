import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { buildAnalyticsDocs } from '../docs';

describe('docs/analytics.md drift guard', () => {
  it('is in sync with the registry — run `npm run analytics:docs` if this fails', () => {
    const committed = readFileSync(new URL('../../../../docs/analytics.md', import.meta.url), 'utf8');
    expect(
      committed === buildAnalyticsDocs(),
      'docs/analytics.md is stale — run `npm run analytics:docs` and commit the result',
    ).toBe(true);
  });
});
