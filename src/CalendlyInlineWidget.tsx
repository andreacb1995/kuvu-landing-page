/**
 * Contenedor para `initInlineWidget`: altura fija 700px (estándar móvil) sin min-h Tailwind.
 */

import { useEffect, useRef } from 'react';
import { initCalendlyInlineWidget, loadCalendlyScript } from './calendlyEmbed';

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

        if (!window.Calendly?.initInlineWidget) return;

        parent.innerHTML = '';
        initCalendlyInlineWidget(parent, calendlyUrl);
      } catch (e) {
        console.error('[Calendly]', e);
      }
    })();

    return () => {
      cancelled = true;
      parent.innerHTML = '';
    };
  }, [active, calendlyUrl]);

  return <div ref={parentRef} style={{ minWidth: '320px', height: '700px' }} />;
}
