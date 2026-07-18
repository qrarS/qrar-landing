import { useEffect, useRef, useState } from 'react';
import {
  DEFAULT_LANDING_CONTENT,
  DEFAULT_LANDING_TIERS,
  LANDING_SCHEMA_VERSION,
  upgradeLandingContent,
  type LandingPageContent,
  type LandingTierSnapshot,
  type LandingUsageMetrics,
} from '@/content/landing';

export interface PublishedLanding {
  schemaVersion: number;
  revision: number;
  publishedAt: string | null;
  content: LandingPageContent;
  tiers: LandingTierSnapshot[];
  usageMetrics: LandingUsageMetrics | null;
  signupDisabled: boolean;
  auth: { signupUrl: string; signinUrl: string };
}

export type LandingSource = 'published' | 'cache' | 'fallback' | 'preview';

const CONSOLE_URL = (import.meta.env.VITE_QRAR_CONSOLE_URL || 'https://console.qrar.ai').replace(/\/$/, '');
const CONTENT_ENDPOINT = import.meta.env.VITE_QRAR_CONTENT_ENDPOINT
  || 'https://ukskidcsercplsklvdar.supabase.co/functions/v1/public-landing';
const CACHE_KEY = 'qrar-landing-figma-publication-v2';
const LEGACY_CACHE_KEYS = [
  'qrar-landing-figma-publication-v1',
  'qrar-landing-publication-v1',
  'qrar-landing-home3-publication-v1',
];

const fallback: PublishedLanding = {
  schemaVersion: LANDING_SCHEMA_VERSION,
  revision: 0,
  publishedAt: null,
  content: DEFAULT_LANDING_CONTENT,
  tiers: DEFAULT_LANDING_TIERS,
  usageMetrics: null,
  signupDisabled: false,
  auth: {
    signupUrl: `${CONSOLE_URL}/signup`,
    signinUrl: `${CONSOLE_URL}/signin`,
  },
};

function isTier(value: unknown): value is LandingTierSnapshot {
  if (!value || typeof value !== 'object') return false;
  const tier = value as Partial<LandingTierSnapshot>;
  return typeof tier.id === 'string'
    && typeof tier.currency === 'string'
    && Number.isFinite(tier.priceMonthly)
    && Number.isFinite(tier.priceYearly)
    && Array.isArray(tier.features)
    && !!tier.name?.en
    && !!tier.name?.ar;
}

function parseUsageMetrics(value: unknown): LandingUsageMetrics | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<LandingUsageMetrics>;
  if (
    !Number.isSafeInteger(candidate.reviewsAnalyzed) || Number(candidate.reviewsAnalyzed) < 0
    || !Number.isSafeInteger(candidate.businessLocations) || Number(candidate.businessLocations) < 0
    || !Number.isSafeInteger(candidate.comparedLocations) || Number(candidate.comparedLocations) < 0
    || typeof candidate.updatedAt !== 'string'
  ) return null;
  return {
    reviewsAnalyzed: Number(candidate.reviewsAnalyzed),
    businessLocations: Number(candidate.businessLocations),
    comparedLocations: Number(candidate.comparedLocations),
    updatedAt: candidate.updatedAt,
  };
}

function parsePublication(value: unknown): PublishedLanding | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<PublishedLanding>;
  const content = upgradeLandingContent(candidate.content);
  if (!content) return null;
  if (!Array.isArray(candidate.tiers) || !candidate.tiers.every(isTier)) return null;
  if (!candidate.auth || typeof candidate.auth.signupUrl !== 'string' || typeof candidate.auth.signinUrl !== 'string') return null;
  return {
    schemaVersion: LANDING_SCHEMA_VERSION,
    revision: Number(candidate.revision) || 0,
    publishedAt: typeof candidate.publishedAt === 'string' ? candidate.publishedAt : null,
    content,
    tiers: candidate.tiers,
    usageMetrics: parseUsageMetrics(candidate.usageMetrics),
    signupDisabled: Boolean(candidate.signupDisabled),
    // Account destinations are deployment configuration, not editable CMS
    // content. Never let a publication redirect credentials off-console.
    auth: {
      signupUrl: `${CONSOLE_URL}/signup`,
      signinUrl: `${CONSOLE_URL}/signin`,
    },
  };
}

function isAllowedPreviewOrigin(origin: string): boolean {
  const configured = import.meta.env.VITE_QRAR_CONSOLE_ORIGIN;
  if (configured && origin === configured) return true;
  if (origin === 'https://console.qrar.ai') return true;
  try {
    const url = new URL(origin);
    return (url.hostname === 'localhost' || url.hostname === '127.0.0.1') && (url.protocol === 'http:' || url.protocol === 'https:');
  } catch {
    return false;
  }
}

export function useLandingContent() {
  const previewMode = new URLSearchParams(window.location.search).get('cms-preview') === '1';
  const [landing, setLanding] = useState<PublishedLanding>(() => {
    if (previewMode) return fallback;
    try {
      const cached = parsePublication(JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'));
      return cached ?? fallback;
    } catch {
      return fallback;
    }
  });
  const [source, setSource] = useState<LandingSource>(() => landing.revision > 0 ? 'cache' : 'fallback');
  const [loading, setLoading] = useState(!previewMode);
  const usageMetricsRef = useRef(landing.usageMetrics);

  useEffect(() => {
    usageMetricsRef.current = landing.usageMetrics;
  }, [landing.usageMetrics]);

  useEffect(() => {
    // This visual release has a different content density and card contract.
    // Clear incompatible cached documents before resolving the current source.
    for (const key of LEGACY_CACHE_KEYS) {
      try { localStorage.removeItem(key); } catch { /* storage may be unavailable */ }
    }

    if (previewMode) {
      setLoading(false);
      const receivePreview = (event: MessageEvent) => {
        if (!isAllowedPreviewOrigin(event.origin)) return;
        if (!event.data || event.data.type !== 'qrar:landing-preview') return;
        const parsed = parsePublication({
          ...event.data.payload,
          revision: 0,
          publishedAt: null,
        });
        if (!parsed) return;
        setLanding(parsed);
        setSource('preview');
      };
      window.addEventListener('message', receivePreview);
      window.parent?.postMessage({ type: 'qrar:landing-preview-ready' }, '*');
      return () => window.removeEventListener('message', receivePreview);
    }

    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch(CONTENT_ENDPOINT, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Landing publication returned ${response.status}`);
        const parsed = parsePublication(await response.json());
        if (!parsed) throw new Error('Landing publication did not match the supported schema');
        const resolved = parsed.usageMetrics
          ? parsed
          : { ...parsed, usageMetrics: usageMetricsRef.current };
        setLanding(resolved);
        setSource('published');
        localStorage.setItem(CACHE_KEY, JSON.stringify(resolved));
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          // The compiled/cached experience is intentionally complete. Public
          // visitors should not see an infrastructure error banner.
          console.info('Using resilient landing content fallback.');
        }
      } finally {
        setLoading(false);
      }
    };
    void load();
    return () => controller.abort();
  }, [previewMode]);

  return { landing, source, loading, previewMode };
}
