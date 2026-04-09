/**
 * Widget inline Calendly: URL sin parámetros extra en código.
 * `data-hide-landing-page-details` oculta foto/nombre del evento en el iframe (solo días y horas).
 */

import { useEffect, useRef } from 'react';
import { getCalendlyInlineWidgetOptions, loadCalendlyScript } from './calendlyEmbed';

type Props = {
  calendlyUrl: string;
  active: boolean;
};

export function CalendlyInlineWidget({ calendlyUrl, active }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !calendlyUrl.trim() || !parentRef.current) return;

    const parent = parentRef.current;
    let cancelled = false;

    void (async () => {
      try {
        await loadCalendlyScript();
        if (cancelled || !parentRef.current) return;

        const calendly = window.Calendly;
        if (!calendly?.initInlineWidget) return;

        parent.innerHTML = '';
        calendly.initInlineWidget(getCalendlyInlineWidgetOptions(parent, calendlyUrl));
      } catch (e) {
        console.error('[Calendly]', e);
      }
    })();

    return () => {
      cancelled = true;
      parent.innerHTML = '';
    };
  }, [active, calendlyUrl]);

  return (
    <div
      ref={parentRef}
      className="w-full min-w-0 max-w-full min-h-[950px] bg-transparent [&_iframe]:block [&_iframe]:min-h-[950px] [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:border-0 [&_iframe]:bg-white [&_iframe]:shadow-none"
      style={{
        width: '100%',
        minWidth: 0,
        marginLeft: 0,
        marginRight: 0,
      }}
      data-hide-landing-page-details="1"
      data-hide-gdpr-banner="1"
    />
  );
}
