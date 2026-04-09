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

/** Añade parámetros oficiales del embed para menos cabecera y sin banner GDPR en el iframe. */
export function appendCalendlyEmbedQueryParams(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  try {
    const u = new URL(trimmed);
    u.searchParams.set('hide_landing_page_details', '1');
    u.searchParams.set('hide_gdpr_banner', '1');
    return u.toString();
  } catch {
    return trimmed;
  }
}

/**
 * `initInlineWidget`: el contenedor en React tiene `height: 700px`; el iframe llena con height/width 100%.
 */
export function getCalendlyInlineWidgetOptions(parentElement: HTMLElement, baseUrl: string) {
  return {
    url: appendCalendlyEmbedQueryParams(baseUrl),
    parentElement,
    styles: {
      height: '100%',
      width: '100%',
    },
    prefill: {} as Record<string, unknown>,
    utm: {} as Record<string, unknown>,
  };
}

/**
 * Inicializa el widget y, en un doble rAF, evita que el foco quede en el iframe al montar
 * (best effort: reduce scroll automático hacia el embed antes de interacción del usuario).
 */
export function initCalendlyInlineWidget(parentElement: HTMLElement, baseUrl: string): void {
  const calendly = typeof window !== 'undefined' ? window.Calendly : undefined;
  if (!calendly?.initInlineWidget) return;

  calendly.initInlineWidget(getCalendlyInlineWidgetOptions(parentElement, baseUrl));

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active instanceof HTMLIFrameElement && parentElement.contains(active)) {
        active.blur();
      }
    });
  });
}
