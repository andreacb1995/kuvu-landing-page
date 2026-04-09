/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { CalendlyInlineWidget, CALENDLY_EMBED_HEIGHT_PX } from './CalendlyInlineWidget';
import { DEFAULT_CALENDLY_URL, LOGO_BLANCO_URL, THANK_YOU_SESSION_KEY, WHATSAPP_LINK } from './constants';
import { trackFormSubmittedPage, trackLead, trackSchedule, trackWhatsAppContact } from './metaPixel';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL?.trim() || DEFAULT_CALENDLY_URL;

export default function ThankYou() {
  const navigate = useNavigate();
  const pixelFired = useRef(false);
  const calendlySectionRef = useRef<HTMLElement>(null);
  const [loadCalendlyIframe, setLoadCalendlyIframe] = useState(false);

  const [granted] = useState(() => {
    try {
      return sessionStorage.getItem(THANK_YOU_SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!granted) {
      navigate('/', { replace: true });
      return;
    }
    if (pixelFired.current) return;
    pixelFired.current = true;
    trackFormSubmittedPage();
    trackLead();
  }, [granted, navigate]);

  useEffect(() => {
    if (!granted || !CALENDLY_URL) return;
    const node = calendlySectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setLoadCalendlyIframe(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoadCalendlyIframe(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: '80px 0px 120px 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [granted]);

  useEffect(() => {
    if (!granted) return;

    function onMessage(e: MessageEvent) {
      if (typeof e.origin !== 'string' || !e.origin.startsWith('https://calendly.com')) {
        return;
      }
      const data = e.data as { event?: string } | null;
      if (!data || data.event !== 'calendly.event_scheduled') {
        return;
      }
      trackSchedule();
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [granted]);

  if (!granted) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-[#1976d2] font-sans text-white">
      <main className="mx-auto flex w-full max-w-[1100px] flex-col items-center pt-4 pb-0">
        <article className="w-full max-w-[1100px]">
          <div className="flex w-full justify-start px-6 pt-1 pb-1 sm:px-10 md:px-16">
            <img
              src={LOGO_BLANCO_URL}
              alt="KUVU"
              width={180}
              height={54}
              className="block h-auto max-w-[130px] shrink-0 object-contain object-left"
            />
          </div>

          <div className="flex flex-col items-center px-6 pb-0 text-center sm:px-10 md:px-16">
            <h1 className="mt-0 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ¡Todo listo!
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-pretty text-center text-base leading-relaxed text-white sm:text-lg">
              Tu solicitud ha llegado correctamente. Estamos deseando ayudarte a llevar la gestión de tu comedor al
              siguiente nivel.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-pretty text-center text-sm leading-relaxed text-white/95 mb-4">
              Si lo deseas, puedes elegir ahora un hueco para nuestra primera toma de contacto (Paso opcional):
            </p>
          </div>

          <section
            ref={calendlySectionRef}
            className="mt-2 w-full min-w-0 px-6 pb-10 sm:px-10 md:px-16"
          >
            <div className="rounded-3xl bg-white p-0 shadow-xl">
              {loadCalendlyIframe ? (
                <CalendlyInlineWidget calendlyUrl={CALENDLY_URL} active />
              ) : (
                <div
                  className="flex w-full flex-col items-center justify-center gap-3 bg-[#fafafa] p-0 text-sm text-gray-500"
                  style={{ minHeight: CALENDLY_EMBED_HEIGHT_PX }}
                  aria-hidden
                >
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                  <span className="text-gray-400">Cargando calendario…</span>
                </div>
              )}
            </div>
          </section>

          <footer className="mt-8 flex w-full flex-col items-center border-t border-white/25 px-6 pb-8 pt-6 text-center sm:px-10 md:px-16">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppContact('thank_you_footer')}
              className="mx-auto inline-flex w-full max-w-sm shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-md ring-2 ring-white/35 transition-colors hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
              Contactar por WhatsApp
            </a>

            <Link
              to="/"
              className="mx-auto mt-4 block text-center text-sm font-medium text-white underline decoration-white/50 underline-offset-4 transition hover:text-blue-50 hover:decoration-white"
            >
              Volver al inicio
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
