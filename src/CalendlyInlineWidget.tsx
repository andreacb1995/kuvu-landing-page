/**
 * Contenedor mínimo para `initInlineWidget` (misma idea que el snippet oficial de Calendly).
 */

import { useEffect, useRef } from 'react';
import { getCalendlyInlineWidgetOptions, loadCalendlyScript } from './calendlyEmbed';

/** Debe coincidir con `height` del contenedor (placeholder en ThankYou). */
export const CALENDLY_EMBED_HEIGHT_PX = 700;

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
      style={{ height: '700px', minWidth: '320px' }}
    />
  );
}
