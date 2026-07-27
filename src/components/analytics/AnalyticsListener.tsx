import { useEffect, useRef, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteLanguage } from '@/contexts/SiteLanguageContext';
import { analytics } from '@/lib/analytics';
import { sanitizeLocation, sanitizeReferrer } from '@/lib/analytics/sanitizeUrl';
import { parseInternalParam } from '@/lib/analytics/internal';
import type { PageFields } from '@/lib/analytics/core';
import ConsentBanner from './ConsentBanner';

/**
 * Router-scoped analytics orchestrator for the landing site (mounted inside
 * BrowserRouter, sibling of Routes — so it covers /interests too, outside
 * any .design-page container).
 *
 * page_view: one per SETTLED location — a 50ms coalesce absorbs the
 * /Intersters→/interests redirect; identical sanitized URLs dedupe; a
 * still-pending view fires on pagehide so short visits still count. The
 * sanitized page fields are pushed via gtag('set') so gtag's automatic hits
 * never carry a raw URL either.
 */
const SETTLE_MS = 50;

const CHIP_COPY = {
  en: 'Analytics: internal — excluded',
  ar: 'التحليلات: داخلي — مستبعد',
} as const;

const AnalyticsListener = () => {
  const location = useLocation();
  const { language } = useSiteLanguage();
  const statusKey = useSyncExternalStore(analytics.subscribe, analytics.statusKey, analytics.statusKey);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fireRef = useRef<(() => void) | null>(null);
  const lastFieldsRef = useRef<PageFields | null>(null);

  useEffect(() => {
    analytics.init();
    if (analytics.hasInternalFlag()) analytics.setInternal(true);
  }, []);

  useEffect(() => {
    const internalCmd = parseInternalParam(location.search);
    if (internalCmd === 'set') {
      analytics.persistInternalFlag();
      analytics.setInternal(true);
    } else if (internalCmd === 'clear') {
      analytics.removeInternalFlag();
      analytics.setInternal(false);
    }

    const sanitized = sanitizeLocation(window.location.origin, location.pathname, location.search);
    fireRef.current = () => {
      fireRef.current = null;
      const prev = lastFieldsRef.current;
      if (prev?.page_location === sanitized.url) return;
      const fields: PageFields = {
        page_location: sanitized.url,
        page_referrer: prev
          ? prev.page_location
          : sanitizeReferrer(window.location.origin, document.referrer),
        page_title: sanitized.label,
      };
      lastFieldsRef.current = fields;
      analytics.page(fields);
    };

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      fireRef.current?.();
    }, SETTLE_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [location]);

  // Replay the current page_view when consent flips to granted mid-session.
  const consentRef = useRef(analytics.consentStatus());
  useEffect(() => {
    const prev = consentRef.current;
    const next = analytics.consentStatus();
    consentRef.current = next;
    if (prev !== 'granted' && next === 'granted' && lastFieldsRef.current) {
      analytics.page(lastFieldsRef.current);
    }
  }, [statusKey]);

  useEffect(() => {
    const onPageHide = (): void => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      fireRef.current?.();
    };
    window.addEventListener('pagehide', onPageHide);
    return () => window.removeEventListener('pagehide', onPageHide);
  }, []);

  const showBanner =
    analytics.isConfigured() && !analytics.isHardDisabled() && analytics.consentStatus() === 'unset';
  const showChip = analytics.isConfigured() && analytics.isInternal();

  return (
    <>
      {showBanner && <ConsentBanner />}
      {showChip && <div className="qrar-internal-chip">{CHIP_COPY[language]}</div>}
    </>
  );
};

export default AnalyticsListener;
