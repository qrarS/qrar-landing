// Regenerates docs/analytics.md from the analytics registry.
// Run with: npm run analytics:docs   (vite-node — ships with vitest)
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildAnalyticsDocs } from '../src/lib/analytics/docs';

const target = fileURLToPath(new URL('../docs/analytics.md', import.meta.url));
writeFileSync(target, buildAnalyticsDocs());
console.log(`Wrote ${target}`);
