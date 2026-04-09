/** Referencia legada; alturas reales del iframe en /gracias están en `CalendlyInlineWidget` (p. ej. min ~520px móvil / ~720px sm+). */
export const CALENDLY_IFRAME_HEIGHT_PX = 720;

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

/** Carga el script oficial de Calendly una sola vez. */
export function loadCalendlyScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Calendly?.initInlineWidget) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT_SRC}"]`);
    if (existing) {
      const done = () => {
        if (window.Calendly?.initInlineWidget) resolve();
        else reject(new Error('Calendly no disponible tras cargar el script'));
      };
      if (window.Calendly?.initInlineWidget) {
        resolve();
        return;
      }
      existing.addEventListener('load', done);
      existing.addEventListener('error', () => reject(new Error('Error al cargar Calendly')));
      return;
    }

    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      if (window.Calendly?.initInlineWidget) resolve();
      else reject(new Error('Calendly no disponible tras cargar el script'));
    };
    script.onerror = () => reject(new Error('Error al cargar el script de Calendly'));
    document.body.appendChild(script);
  });
}

/**
 * `initInlineWidget` con la URL tal cual (sin parámetros de color ni personalización en código).
 */
export function getCalendlyInlineWidgetOptions(parentElement: HTMLElement, baseUrl: string) {
  return {
    url: baseUrl.trim(),
    parentElement,
    prefill: {} as Record<string, unknown>,
    utm: {} as Record<string, unknown>,
  };
}
