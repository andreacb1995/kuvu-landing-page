/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, type FormEvent } from 'react';
import {
  CheckCircle,
  Clock,
  MessageSquare,
  GraduationCap,
  UtensilsCrossed,
  Smartphone,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/34621038812?text=Hola%20Kuvu,%20nos%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20la%20plataforma%20para%20nuestro%20centro%20educativo.";

/** CTA amarillo premium — firma marca: ring-4 + ring-offset-2 (offset azul #1976d2 en hero) */
const ctaPrimaryClass =
  'inline-flex items-center justify-center text-center bg-[#ffc107] text-gray-900 font-extrabold text-base sm:text-lg uppercase tracking-wide px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border border-gray-900/10 shadow-md ring-4 ring-amber-300/70 ring-offset-2 ring-offset-[#1976d2] transition-all duration-200 hover:bg-amber-400 hover:shadow-lg hover:ring-amber-200/80';

/** Misma firma: ring-4 + ring-offset-2 (offset blanco en formulario / franjas claras) */
const ctaPrimaryOnLightClass =
  'inline-flex items-center justify-center text-center bg-[#ffc107] text-gray-900 font-extrabold text-base sm:text-lg uppercase tracking-wide px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border border-gray-900/10 shadow-md ring-4 ring-amber-300/70 ring-offset-2 ring-offset-white transition-all duration-200 hover:bg-amber-400 hover:shadow-lg hover:ring-amber-200/80';

/** CTA amarillo sobre franja azul oscuro (ring-offset alineado al fondo) */
const ctaPrimaryOnDarkStripClass =
  'inline-flex items-center justify-center text-center bg-[#ffc107] text-gray-900 font-extrabold text-base sm:text-lg uppercase tracking-wide px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border border-gray-900/10 shadow-md ring-4 ring-amber-300/70 ring-offset-2 ring-offset-[#0d47a1] transition-all duration-200 hover:bg-amber-400 hover:shadow-lg hover:ring-amber-200/80';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? 'TU_ID';
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const inputClass =
  'w-full min-w-0 max-w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-base text-gray-900 placeholder:text-gray-500 shadow-sm transition-[color,box-shadow,border-color] duration-200 focus:border-[#1976d2] focus:outline-none focus:ring-2 focus:ring-[#1976d2]/25 focus:ring-offset-2 focus:ring-offset-white';

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (FORMSPREE_ID === 'TU_ID') {
      setStatus('error');
      return;
    }
    const form = e.currentTarget;
    setStatus('loading');
    try {
      const body = new FormData(form);
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        console.error('Formspree:', data);
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="scroll-mt-6 py-16 md:py-24 bg-white border-t border-gray-100"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Hablamos?</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Cuéntanos las necesidades de tu centro y te mostraremos cómo Kuvu puede ayudarte.
          </p>
        </div>

        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center text-green-900"
          >
            <p className="text-lg font-semibold">¡Mensaje enviado con éxito!</p>
            <p className="mt-2 text-sm text-green-800">Te responderemos lo antes posible.</p>
            <button
              type="button"
              className={`${ctaPrimaryOnLightClass} mt-8 w-full max-w-full sm:max-w-md sm:mx-auto`}
              onClick={() => setStatus('idle')}
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <label htmlFor="centro" className="mb-1.5 block text-sm font-medium text-gray-700">
                Nombre del Centro o Empresa de Catering
              </label>
              <input
                id="centro"
                name="centro"
                type="text"
                required
                autoComplete="organization"
                className={inputClass}
                placeholder="Ej. Colegio San José"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                Email de contacto
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder="tu@centro.edu"
              />
            </div>
            <div>
              <label htmlFor="tel" className="mb-1.5 block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                id="tel"
                name="tel"
                type="tel"
                autoComplete="tel"
                className={inputClass}
                placeholder="+34 600 000 000"
              />
            </div>
            <div>
              <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                className={`${inputClass} resize-y min-h-[120px]`}
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            <div className="flex items-start gap-3 pt-1">
              <input
                id="privacidad"
                name="privacidad"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#1976d2] focus:ring-[#1976d2]"
              />
              <label htmlFor="privacidad" className="text-sm text-gray-600 leading-snug">
                He leído y acepto la{' '}
                <a href="#" className="font-medium text-[#1976d2] underline hover:text-blue-800">
                  política de privacidad
                </a>
                .
              </label>
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600" role="alert">
                {FORMSPREE_ID === 'TU_ID'
                  ? 'Configura VITE_FORMSPREE_ID en tu entorno con el ID de tu formulario Formspree.'
                  : 'No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.'}
              </p>
            )}

            <p className="text-center text-sm text-gray-600 leading-snug pt-1">
              O si lo prefieres, escríbenos ahora mismo por{' '}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#1976d2] underline hover:text-blue-800"
              >
                WhatsApp
              </a>{' '}
              para una respuesta inmediata.
            </p>

            <div className="flex justify-center pt-2 w-full">
              {/* Misma firma que Hero: rounded-2xl + ring-4 + ring-offset-2 (ctaPrimaryOnLightClass) */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`${ctaPrimaryOnLightClass} w-full max-w-full sm:max-w-xl sm:mx-auto disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:bg-[#ffc107] disabled:hover:shadow-md disabled:hover:ring-amber-300/70`}
              >
                {status === 'loading' ? 'ENVIANDO…' : 'ENVIAR SOLICITUD DE DIAGNÓSTICO'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen font-sans text-gray-900 relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 pt-3 sm:pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ajustamos el tamaño y usamos un margen negativo si la imagen tiene mucho espacio transparente */}
          <img src="/kuvu-app-logo.png" alt="KUVU Logo" className="h-16 sm:h-20 md:h-28 w-auto max-w-full object-contain mb-10 sm:-ml-2" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1976d2] text-white pt-32 pb-8 sm:pt-36 sm:pb-14 lg:pt-44 lg:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-center">
            {/* Columna contenido: orden móvil = título → subtítulo → lista → CTA (la imagen va después en el DOM) */}
            <div className="order-1 flex min-w-0 flex-col">
              <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
                <div className="w-full min-w-0">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-balance leading-tight sm:leading-tight">
                    Software de Gestión Integral para Comedores, Caterings y Centros Educativos
                  </h1>
                </div>
                <p className="text-base sm:text-xl text-blue-100 max-w-xl leading-normal md:leading-relaxed">
                  La plataforma todo en uno que elimina el caos administrativo y profesionaliza la comunicación entre familias, centros y cocina.
                </p>
                
                {/* Quick Benefits */}
                <div>
                  <ul className="space-y-4 sm:space-y-5">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#ffc107] flex-shrink-0" />
                      <span className="text-blue-50 font-medium text-base sm:text-lg">Adiós al caos de las listas de Excel y el papel</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#ffc107] flex-shrink-0" />
                      <span className="text-blue-50 font-medium text-base sm:text-lg">Comunicación en tiempo real sin errores</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#ffc107] flex-shrink-0" />
                      <span className="text-blue-50 font-medium text-base sm:text-lg">Facturación automática basada en el uso real</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 sm:mt-10">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={`${ctaPrimaryClass} w-full sm:w-auto`}>
                  RESERVA TU SESIÓN DE DIAGNÓSTICO (15 MIN)
                </a>
              </div>
            </div>
            
            {/* Imagen: siempre después del bloque de texto en móvil (order-2) */}
            <div className="order-2 relative mt-6 sm:mt-12 lg:mt-0 flex justify-center items-center w-full min-w-0">
              {/* Resplandor suave de fondo para resaltar los dispositivos */}
              <div className="absolute inset-0 bg-blue-300 blur-3xl rounded-full opacity-20 transform scale-75 pointer-events-none" aria-hidden />
              <img 
                src="/mockups-colegios.png" 
                alt="Kuvu: software de gestión para comedores escolares, caterings y centros educativos" 
                className="relative z-10 h-auto max-w-full w-full object-contain max-w-md lg:max-w-none max-h-[min(400px,70vh)] sm:max-h-[500px] lg:max-h-[600px] rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Convierte el caos administrativo en un proceso automatizado
            </h2>
            <p className="text-lg text-gray-600 leading-normal md:leading-relaxed">
              KUVU no es solo una herramienta, es tu aliado para recuperar el tiempo y el control de tu centro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Administración</h3>
              <p className="text-gray-600 leading-normal md:leading-relaxed">
                Genera facturas PDF basadas en el uso real. Controla pagos de comedor y madrugadores sin errores manuales.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sincronización</h3>
              <p className="text-gray-600 leading-normal md:leading-relaxed">
              Previsión precisa para cocina en tiempo real. Evita el desperdicio de comida, sea cual sea tu modelo de gestión.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">App Familias</h3>
              <p className="text-gray-600 leading-normal md:leading-relaxed">
                Tranquilidad y agilidad. Los padres gestionan ausencias, consultan menús y reciben avisos desde su móvil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciación: colegio vs catering */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10 md:mb-12 tracking-tight">
            ¿Eres Colegio o Catering?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Colegios</h3>
              <p className="text-gray-600 leading-normal md:leading-relaxed">
              Toma el control total de tu gestión. Centraliza inscripciones, bajas y facturación de forma independiente, trabajes con el catering que trabajes o tengas cocina propia.
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <UtensilsCrossed className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Caterings</h3>
              <p className="text-gray-600 leading-normal md:leading-relaxed">
                Digitaliza la relación con tus clientes. Recibe previsiones de menús exactas, reduce el desperdicio y ofrece menús digitales a las familias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué confiar en Kuvu */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100" aria-labelledby="confianza-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="confianza-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-10 text-center tracking-tight"
          >
            Por qué confiar en Kuvu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 lg:gap-12 items-stretch">
            <article className="flex h-full min-h-0 flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md max-sm:items-center max-sm:text-center md:items-stretch md:text-left">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 max-sm:mx-auto">
                <Sparkles className="h-[2.1rem] w-[2.1rem] shrink-0 text-[#1976d2]" aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Migración sin esfuerzo</h3>
              <p className="flex-1 text-gray-600 leading-normal md:leading-relaxed">
                Nosotros hacemos el trabajo sucio. Importamos tus listados de alumnos y configuramos tus menús para que empieces a trabajar sin mover un dedo.
              </p>
            </article>
            <article className="flex h-full min-h-0 flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md max-sm:items-center max-sm:text-center md:items-stretch md:text-left">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 max-sm:mx-auto">
                <MessageSquare className="h-[2.1rem] w-[2.1rem] shrink-0 text-[#1976d2]" aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Soporte Humano Directo</h3>
              <p className="flex-1 text-gray-600 leading-normal md:leading-relaxed">
                Olvídate de tickets fríos o bots. Tienes contacto directo con nosotros por WhatsApp o teléfono para resolver cualquier duda al instante.
              </p>
            </article>
            <article className="flex h-full min-h-0 flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md max-sm:items-center max-sm:text-center md:items-stretch md:text-left">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 max-sm:mx-auto">
                <ShieldCheck className="h-[2.1rem] w-[2.1rem] shrink-0 text-[#1976d2]" aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Control y Seguridad Total</h3>
              <p className="flex-1 text-gray-600 leading-normal md:leading-relaxed">
                Tus datos están cifrados y protegidos bajo la estricta normativa escolar. Gestiona con la tranquilidad de que tu centro cumple con toda la legalidad.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Franja CTA — fondo azul oscuro */}
      <section className="border-y border-blue-900/30 bg-gradient-to-b from-[#1565c0] to-[#0d47a1] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
            ¿Listo para dejar atrás el caos administrativo?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-normal md:leading-relaxed text-blue-100">
            En solo 15 minutos te mostraremos cómo Kuvu puede ayudarte a recuperar el control de tu tiempo y profesionalizar la gestión de tu centro o catering.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={`${ctaPrimaryOnDarkStripClass} w-full sm:inline-flex sm:w-auto`}>
            RESERVA TU SESIÓN DE DIAGNÓSTICO (15 MIN)
          </a>
        </div>
      </section>

      <ContactSection />

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-16 md:py-24 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-14 lg:gap-16 text-center md:text-left">
            {/* Brand */}
            <div>
              <img src="/kuvu-app-logo.png" alt="KUVU Logo" className="h-20 md:h-28 w-auto max-w-full object-contain mx-auto md:mx-0 mb-4" />
              <p className="text-sm text-gray-400 max-w-xs mx-auto md:mx-0 leading-normal md:leading-relaxed">
                La plataforma integral para Colegios y Caterings que elimina el caos administrativo.
              </p>
            </div>
            
            {/* Contact */}
            <div className="md:pt-14">
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="mailto:hola@kuvuapp.com" className="text-gray-400 hover:text-white transition-colors">hola@kuvuapp.com</a>
                </li>
                <li>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    +34 621 03 88 12
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="md:text-right md:pt-14">
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Aviso Legal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-10 text-sm text-center text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} KUVU. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
