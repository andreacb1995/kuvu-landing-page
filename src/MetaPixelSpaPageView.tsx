/**
 * El Pixel en index.html solo envía PageView en la carga inicial.
 * En SPA hay que reenviar PageView al cambiar de ruta (p. ej. / → /gracias).
 * El primer PageView lo cubre index.html; aquí se omiten duplicados en la primera pintura.
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function MetaPixelSpaPageView() {
  const location = useLocation();
  const isFirstPaint = useRef(true);

  useEffect(() => {
    if (isFirstPaint.current) {
      isFirstPaint.current = false;
      return;
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);

  return null;
}
