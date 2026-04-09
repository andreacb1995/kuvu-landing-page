/**
 * Banner de consentimiento cookies (LSSI / RGPD / criterios AEPD).
 * Franja inferior a ancho completo.
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadMarketingScripts } from './marketingScripts';

export const COOKIE_CONSENT_STORAGE_KEY = 'kuvu_cookie_consent';

/** Valores actuales: `all` | `essential`. Legacy: `accepted` → all, `rejected` → essential */
export type CookieConsentValue = 'all' | 'essential';

function normalizeStored(raw: string | null): CookieConsentValue | null {
  if (raw === 'all' || raw === 'accepted') return 'all';
  if (raw === 'essential' || raw === 'rejected') return 'essential';
  return null;
}

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const normalized = normalizeStored(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
      if (normalized === 'all') {
        loadMarketingScripts();
        setShowBanner(false);
        return;
      }
      if (normalized === 'essential') {
        setShowBanner(false);
        return;
      }
      setShowBanner(true);
    } catch {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    if (showBanner === true) {
      document.body.classList.add('cookie-banner-visible');
    } else {
      document.body.classList.remove('cookie-banner-visible');
    }
    return () => document.body.classList.remove('cookie-banner-visible');
  }, [showBanner]);

  function acceptAll(): void {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'all');
    } catch {
      /* ignore */
    }
    loadMarketingScripts();
    setShowBanner(false);
  }

  function essentialOnly(): void {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'essential');
    } catch {
      /* ignore */
    }
    setShowBanner(false);
  }

  if (showBanner !== true) {
    return null;
  }

  const btnBase =
    'min-h-[48px] w-full rounded-xl px-5 py-3 text-sm font-semibold leading-tight transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976d2]/50 md:min-h-[52px] md:w-auto md:min-w-[11rem]';

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[35] w-full"
      role="dialog"
      aria-label="Cookies y privacidad"
      aria-live="polite"
    >
      <div className="pointer-events-auto w-full border-t border-gray-200 bg-white shadow-[0_-6px_32px_-4px_rgba(0,0,0,0.1),0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:flex-row md:items-center md:justify-between md:gap-8 md:pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:px-8 lg:pt-5">
          <div className="min-w-0 flex-1 md:max-w-2xl">
            <p className="text-sm leading-relaxed text-gray-700 md:text-[15px]">
              Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el uso de nuestra
              plataforma. Puedes aceptar todas las cookies o continuar solo con las esenciales.
            </p>
            <Link
              to="/politica-cookies"
              className="mt-2 inline-block text-xs font-medium text-[#1976d2] underline decoration-[#1976d2]/35 underline-offset-2 transition hover:text-blue-800 hover:decoration-blue-800/40 md:mt-2.5"
            >
              Más información
            </Link>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row sm:justify-stretch md:w-auto md:flex-row md:justify-end md:gap-3">
            <button
              type="button"
              onClick={essentialOnly}
              className={`${btnBase} border-2 border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100`}
            >
              Solo esenciales
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className={`${btnBase} bg-[#1976d2] text-white shadow-sm hover:bg-[#1565c0]`}
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
