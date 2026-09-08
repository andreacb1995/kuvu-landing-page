import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { CalendlyInlineWidget } from './CalendlyInlineWidget';
import { DEFAULT_CALENDLY_URL, LOGO_BLANCO_URL, THANK_YOU_SESSION_KEY, WHATSAPP_LINK } from './constants';
import { WhatsAppPrivacyDialog } from './components/WhatsAppPrivacyDialog';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL?.trim() || DEFAULT_CALENDLY_URL;

export default function ThankYou() {
  const navigate = useNavigate();
  const [loadCalendlyIframe, setLoadCalendlyIframe] = useState(false);
  const [whatsAppDialogOpen, setWhatsAppDialogOpen] = useState(false);
  const whatsAppTriggerRef = useRef<HTMLButtonElement>(null);
  const [granted] = useState(() => {
    try { return sessionStorage.getItem(THANK_YOU_SESSION_KEY) === '1'; } catch { return false; }
  });

  useEffect(() => {
    if (!granted) navigate('/', { replace: true });
  }, [granted, navigate]);

  if (!granted) return null;

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#1976d2] font-sans text-white">
      <main className="mx-auto flex w-full max-w-[1100px] flex-col items-center pt-4 pb-0">
        <article className="w-full max-w-[1100px]">
          <div className="flex w-full justify-start px-6 pt-1 pb-1 sm:px-10 md:px-16"><img src={LOGO_BLANCO_URL} alt="KUVU" width={180} height={54} className="block h-auto max-w-[130px] shrink-0 object-contain object-left" /></div>
          <div className="flex flex-col items-center px-6 pb-0 text-center sm:px-10 md:px-16">
            <h1 className="mt-0 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">¡Solicitud recibida!</h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-base leading-relaxed text-white/95 sm:text-lg mb-4">El equipo de Kuvu se pondrá en contacto contigo pronto. Para tu comodidad, también puedes elegir directamente un hueco en nuestra agenda para que veamos juntos cómo el sistema puede ayudarte:</p>
          </div>
          <section className="mt-2 w-full min-w-0 px-6 pb-10 sm:px-10 md:px-16">
            <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-xl">
              {loadCalendlyIframe ? <CalendlyInlineWidget calendlyUrl={CALENDLY_URL} active /> : <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center text-gray-700"><p className="max-w-xl text-sm leading-relaxed">Al cargar el calendario se conectará con Calendly, que puede utilizar sus propias cookies para gestionar la reserva. Consulta su <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-[#1976d2] underline">política de privacidad</a>.</p><button type="button" onClick={() => setLoadCalendlyIframe(true)} className="rounded-2xl bg-[#1976d2] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#1565c0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976d2]">Cargar calendario de Calendly</button></div>}
            </div>
          </section>
          <footer className="mt-8 flex w-full flex-col items-center border-t border-white/25 px-6 pb-8 pt-6 text-center sm:px-10 md:px-16">
            <button ref={whatsAppTriggerRef} type="button" onClick={() => setWhatsAppDialogOpen(true)} className="mx-auto inline-flex w-full max-w-sm shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-md ring-2 ring-white/35 transition-colors hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"><MessageCircle className="h-5 w-5 shrink-0" aria-hidden />Contactar por WhatsApp</button>
            <nav aria-label="Enlaces legales" className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm"><Link to="/aviso-legal" className="underline decoration-white/50 underline-offset-4 hover:text-blue-50">Aviso legal</Link><Link to="/politica-privacidad" className="underline decoration-white/50 underline-offset-4 hover:text-blue-50">Política de privacidad</Link></nav>
            <Link to="/" className="mx-auto mt-4 block text-center text-sm font-medium text-white underline decoration-white/50 underline-offset-4 transition hover:text-blue-50 hover:decoration-white">Volver al inicio</Link>
          </footer>
        </article>
      </main>
      <WhatsAppPrivacyDialog open={whatsAppDialogOpen} onClose={() => setWhatsAppDialogOpen(false)} returnFocusRef={whatsAppTriggerRef} whatsappUrl={WHATSAPP_LINK} />
    </div>
  );
}
