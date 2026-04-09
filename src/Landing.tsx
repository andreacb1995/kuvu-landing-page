/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Clock,
  MessageSquare,
  GraduationCap,
  UtensilsCrossed,
  Smartphone,
  Sparkles,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { THANK_YOU_SESSION_KEY, WHATSAPP_LINK } from './constants';
import { handleWhatsAppClick, trackLead } from './metaPixel';

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

const navWhatsAppClass =
  'inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md ring-2 ring-white/30 transition-colors hover:bg-[#20bd5a] sm:px-5 sm:text-base';

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  useEffect(() => {
    if (status === 'error') {
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
        trackLead();
        sessionStorage.setItem(THANK_YOU_SESSION_KEY, '1');
        form.reset();
        navigate('/gracias');
      } else {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        console.error('Formspree:', data);
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setStatus((s) => (s === 'loading' ? 'idle' : s));
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
              <Link to="/politica-privacidad" className="font-medium text-[#1976d2] underline hover:text-blue-800">
                política de privacidad
              </Link>
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
              onClick={() => handleWhatsAppClick('contact_inline')}
              className="font-medium text-[#1976d2] underline hover:text-blue-800"
            >
              WhatsApp
            </a>{' '}
            para una respuesta inmediata.
          </p>

          <div className="flex justify-center pt-2 w-full">
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`${ctaPrimaryOnLightClass} w-full max-w-full sm:max-w-xl sm:mx-auto disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:bg-[#ffc107] disabled:hover:shadow-md disabled:hover:ring-amber-300/70`}
            >
              {status === 'loading' ? 'ENVIANDO…' : 'Solicitar información y sesión gratuita'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen font-sans text-gray-900 relative">
      {/* Header / Navbar */}
      <header className="absolute top-0 left-0 right-0 z-20 pt-3 sm:pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-start justify-between gap-4">
          <img
            src="/kuvu-app-logo.png"
            alt="KUVU Logo"
            className="h-16 sm:h-20 md:h-28 w-auto max-w-[min(100%,12rem)] object-contain mb-10 sm:-ml-2 sm:max-w-none shrink-0"
          />
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick('navbar')}
            className={`${navWhatsAppClass} mt-1 shrink-0`}
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            WhatsApp
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1976d2] text-white pt-32 pb-8 sm:pt-36 sm:pb-14 lg:pt-44 lg:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-center">
            <div className="order-1 flex min-w-0 flex-col">
              <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
                <div className="w-full min-w-0">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-balance leading-tight sm:leading-tight">
                    Software de Gestión Integral para Comedores, Caterings y Centros Educativos
                  </h1>
                </div>
                <p className="text-base sm:text-xl text-blue-100 max-w-xl leading-normal md:leading-relaxed">
                  La plataforma todo en uno que elimina el caos administrativo y profesionaliza la comunicación entre
                  familias, centros y cocina.
                </p>

                <div>
                  <ul className="space-y-4 sm:space-y-5">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#ffc107] flex-shrink-0" />
                      <span className="text-blue-50 font-medium text-base sm:text-lg">
                        Adiós al caos de las listas de Excel y el papel
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#ffc107] flex-shrink-0" />
                      <span className="text-blue-50 font-medium text-base sm:text-lg">
                        Comunicación en tiempo real sin errores
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#ffc107] flex-shrink-0" />
                      <span className="text-blue-50 font-medium text-base sm:text-lg">
                        Facturación automática basada en el consumo real                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 sm:mt-10">
                <a href="#contacto" className={`${ctaPrimaryClass} normal-case w-full sm:w-auto`}>
                  Solicitar información y sesión gratuita
                </a>
              </div>
            </div>

            <div className="order-2 relative mt-6 sm:mt-12 lg:mt-0 flex justify-center items-center w-full min-w-0">
              <div
                className="absolute inset-0 bg-blue-300 blur-3xl rounded-full opacity-20 transform scale-75 pointer-events-none"
                aria-hidden
              />
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
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md md:text-left">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 md:mx-0">
                <Clock className="h-7 w-7 text-[#1976d2]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Administración</h3>
              <p className="text-gray-600 leading-normal md:leading-relaxed">
                Genera facturas PDF basadas en el consumo real. Controla pagos de comedor y madrugadores sin errores
                manuales.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md md:text-left">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 md:mx-0">
                <MessageSquare className="h-7 w-7 text-[#1976d2]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Sincronización</h3>
              <p className="text-gray-600 leading-normal md:leading-relaxed">
                Previsión precisa para cocina en tiempo real. Evita el desperdicio de comida, sea cual sea tu modelo de
                gestión.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md md:text-left">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 md:mx-0">
                <Smartphone className="h-7 w-7 text-[#1976d2]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">App Familias</h3>
              <p className="text-gray-600 leading-normal md:leading-relaxed">
                Tranquilidad y agilidad. Las familias gestionan ausencias, consultan menús y reciben avisos desde su móvil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciación: colegio vs catering — cápsulas horizontales, distintas del grid de 3 columnas */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:mb-12 md:text-4xl">
            ¿Eres Colegio o Catering?
          </h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:max-w-6xl md:grid-cols-2 md:gap-8 lg:gap-10">
            <article className="flex flex-row items-start gap-4 rounded-[2rem] border border-gray-100/90 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:gap-5 sm:p-5 md:gap-6 md:p-6">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 sm:h-12 sm:w-12"
                aria-hidden
              >
                <GraduationCap className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="mb-1.5 text-lg font-bold leading-tight text-gray-900 sm:mb-2 sm:text-xl">Colegios</h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-[15px] md:text-base md:leading-relaxed">
                  Toma el control total de tu gestión. Centraliza inscripciones, bajas y facturación de forma
                  independiente, trabajes con el catering que trabajes o tengas cocina propia.
                </p>
              </div>
            </article>
            <article className="flex flex-row items-start gap-4 rounded-[2rem] border border-gray-100/90 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:gap-5 sm:p-5 md:gap-6 md:p-6">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 sm:h-12 sm:w-12"
                aria-hidden
              >
                <UtensilsCrossed className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="mb-1.5 text-lg font-bold leading-tight text-gray-900 sm:mb-2 sm:text-xl">Caterings</h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-[15px] md:text-base md:leading-relaxed">
                  Digitaliza la relación con tus clientes. Recibe previsiones de menús exactas, reduce el desperdicio y
                  ofrece menús digitales a las familias.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 1. Por qué confiar en Kuvu — generador de confianza */}
      <section className="border-t border-gray-100 bg-white py-16 md:py-24" aria-labelledby="confianza-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="confianza-heading"
            className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900 md:mb-10 md:text-4xl"
          >
            Por qué confiar en Kuvu
          </h2>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-10 lg:gap-12">
            <article className="flex h-full min-h-0 flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md md:items-stretch md:text-left">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 mx-auto md:mx-0">
                <Sparkles className="h-[2.1rem] w-[2.1rem] shrink-0 text-[#1976d2]" aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Migración sin esfuerzo</h3>
              <p className="flex-1 text-gray-600 leading-normal md:leading-relaxed">
                Nosotros nos encargamos del trabajo pesado. Importamos tus listados de alumnos y configuramos tus menús
                para que empieces a trabajar sin complicaciones.
              </p>
            </article>
            <article className="flex h-full min-h-0 flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md md:items-stretch md:text-left">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 mx-auto md:mx-0">
                <MessageSquare className="h-[2.1rem] w-[2.1rem] shrink-0 text-[#1976d2]" aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Soporte Humano Directo</h3>
              <p className="flex-1 text-gray-600 leading-normal md:leading-relaxed">
                Olvídate de tickets fríos o bots. Tienes contacto directo con nosotros por WhatsApp o teléfono para
                resolver cualquier duda al instante.
              </p>
            </article>
            <article className="flex h-full min-h-0 flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md md:items-stretch md:text-left">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 mx-auto md:mx-0">
                <ShieldCheck className="h-[2.1rem] w-[2.1rem] shrink-0 text-[#1976d2]" aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Control y Seguridad Total</h3>
              <p className="flex-1 text-gray-600 leading-normal md:leading-relaxed">
                Tus datos están cifrados y protegidos bajo la normativa escolar vigente y la RGPD. Gestiona con la
                tranquilidad de cumplir toda la legalidad.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 2. Cierre — empujón final hacia el formulario */}
      <section className="border-y border-blue-900/30 bg-gradient-to-b from-[#1565c0] to-[#0d47a1] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Simplifica la gestión de tu centro hoy mismo
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-normal text-blue-100 sm:text-lg md:leading-relaxed">
            Descubre cómo Kuvu digitaliza tus procesos para que recuperes el control de tu tiempo y profesionalices la
            gestión de tu catering o comedor.
          </p>
          <a
            href="#contacto"
            className={`${ctaPrimaryOnDarkStripClass} normal-case w-full sm:inline-flex sm:w-auto`}
          >
            Solicitar información y sesión gratuita
          </a>
        </div>
      </section>

      {/* 3. Formulario de contacto */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-16 md:py-24 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-14 lg:gap-16 text-center md:text-left">
            <div>
              <img
                src="/kuvu-app-logo.png"
                alt="KUVU Logo"
                className="h-20 md:h-28 w-auto max-w-full object-contain mx-auto md:mx-0 mb-4"
              />
              <p className="text-sm text-gray-400 max-w-xs mx-auto md:mx-0 leading-normal md:leading-relaxed">
                La plataforma integral para centros educativos y caterings que elimina el caos administrativo.
              </p>
            </div>

            <div className="md:pt-14">
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="mailto:hola@kuvuapp.com" className="text-gray-400 hover:text-white transition-colors">
                    hola@kuvuapp.com
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleWhatsAppClick('footer')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +34 621 03 88 12
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:text-right md:pt-14">
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Legal</h4>
              <ul className="space-y-2.5 text-xs text-gray-500">
                <li>
                  <Link to="/aviso-legal" className="transition-colors hover:text-gray-300">
                    Aviso legal
                  </Link>
                </li>
                <li>
                  <Link to="/politica-privacidad" className="transition-colors hover:text-gray-300">
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link to="/politica-cookies" className="transition-colors hover:text-gray-300">
                    Política de cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-10 text-sm text-center text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} KUVU. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botón flotante WhatsApp */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleWhatsAppClick('floating')}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-white/90 hover:bg-[#20bd5a] transition-colors sm:bottom-8 sm:right-8"
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle className="h-7 w-7" aria-hidden />
      </a>
    </div>
  );
}
