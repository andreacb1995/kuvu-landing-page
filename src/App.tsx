/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, type FormEvent } from 'react';
import {
  CheckCircle,
  Clock,
  MessageSquare,
  Star,
  ShieldCheck,
  TrendingUp,
  Users,
  GraduationCap,
  UtensilsCrossed,
  Smartphone,
} from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/34621038812?text=Hola%20Kuvu,%20nos%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20la%20plataforma%20para%20nuestro%20centro%20educativo.";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? 'TU_ID';
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:border-[#1976d2] focus:outline-none focus:ring-2 focus:ring-[#1976d2]/35';

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
      className="scroll-mt-6 py-20 bg-white border-t border-gray-100"
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
              className="mt-6 text-sm font-medium text-[#1976d2] underline hover:text-blue-900"
              onClick={() => setStatus('idle')}
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="centro" className="mb-1.5 block text-sm font-medium text-gray-700">
                Nombre del Centro Escolar / Empresa
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

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto min-w-[200px] rounded-full bg-[#ffc107] px-8 py-4 text-center text-base font-bold text-gray-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {status === 'loading' ? 'Enviando…' : 'Enviar solicitud'}
            </button>
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
      <header className="absolute top-0 left-0 right-0 z-20 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ajustamos el tamaño y usamos un margen negativo si la imagen tiene mucho espacio transparente */}
          <img src="/kuvu-app-logo.png" alt="KUVU Logo" className="h-20 md:h-28 w-auto object-contain -ml-2" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1976d2] text-white pt-32 pb-16 lg:pt-44 lg:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Software de Gestión Integral para Comedores, Caterings y Centros Educativos
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl">
                La plataforma todo en uno que elimina el caos administrativo y profesionaliza la comunicación entre familias, centros y cocina.
              </p>
              
              {/* Quick Benefits */}
              <div className="pt-2">
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#ffc107] flex-shrink-0" />
                    <span className="text-blue-50 font-medium text-base sm:text-lg">Adiós al caos de las listas manuales</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#ffc107] flex-shrink-0" />
                    <span className="text-blue-50 font-medium text-base sm:text-lg">Comunicación en tiempo real sin errores</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#ffc107] flex-shrink-0" />
                    <span className="text-blue-50 font-medium text-base sm:text-lg">Facturación y cobros sin fricción</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <a 
                  href={WHATSAPP_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block sm:inline-block w-full sm:w-auto text-center bg-[#ffc107] text-gray-900 font-bold text-lg sm:text-xl py-4 px-8 sm:px-10 rounded-full hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  RESERVA TU SESIÓN DE DIAGNÓSTICO (15 MIN)
                </a>
              </div>
            </div>
            
            {/* Right Column (Image/Illustration) */}
            <div className="relative mt-12 lg:mt-0 flex justify-center items-center">
              {/* Resplandor suave de fondo para resaltar los dispositivos */}
              <div className="absolute inset-0 bg-blue-300 blur-3xl rounded-full opacity-20 transform scale-75"></div>
              <img 
                src="/mockups-colegios.png" 
                alt="Kuvu: software de gestión para comedores escolares, caterings y centros educativos" 
                className="relative z-10 object-contain w-full max-w-md lg:max-w-none max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
            La solución definitiva para eliminar el trabajo manual y los errores humanos
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#1976d2]" />
              <span className="font-bold text-gray-900 text-sm sm:text-base">Máxima seguridad</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <Clock className="w-8 h-8 text-[#1976d2]" />
              <span className="font-bold text-gray-900 text-sm sm:text-base">Ahorro de tiempo</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <Users className="w-8 h-8 text-[#1976d2]" />
              <span className="font-bold text-gray-900 text-sm sm:text-base">Comunicación fluida</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="w-8 h-8 text-[#1976d2]" />
              <span className="font-bold text-gray-900 text-sm sm:text-base">Gestión simplificada</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modelo de negocio: centros vs catering */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 md:mb-16 tracking-tight">
            DISEÑADO PARA TU MODELO DE NEGOCIO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Centros Educativos</h3>
              <p className="text-gray-600 leading-relaxed">
                Toma el control total de tu centro. Gestiona inscripciones, bajas, alergias y facturación de forma autónoma, sin importar quién sea tu proveedor de catering.
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <UtensilsCrossed className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Empresas de Catering</h3>
              <p className="text-gray-600 leading-relaxed">
                Digitaliza la relación con tus clientes. Recibe previsiones de menús exactas de todos tus colegios, reduce el desperdicio y ofrece menús digitales a las familias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Convierte el caos administrativo en un proceso automatizado
            </h2>
            <p className="text-lg text-gray-600">
              KUVU no es solo una herramienta, es tu aliado para recuperar el tiempo y el control de tu centro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Administración y Facturación</h3>
              <p className="text-gray-600 leading-relaxed">
                Genera facturas PDF basadas en el uso real. Controla pagos de comedor, madrugadores y extraescolares sin errores manuales.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sincronización Centro-Cocina</h3>
              <p className="text-gray-600 leading-relaxed">
                Los cambios de las familias llegan en tiempo real al catering. Previsión precisa para que nunca falte ni sobre comida.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">App para Familias</h3>
              <p className="text-gray-600 leading-relaxed">
                Ofrece tranquilidad y agilidad. Los padres gestionan ausencias, consultan menús y reciben avisos desde su móvil.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#ffc107] text-gray-900 font-bold text-lg py-4 px-8 rounded-full hover:bg-yellow-400 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              RESERVA TU SESIÓN DE DIAGNÓSTICO (15 MIN)
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof Section (Comentado hasta tener opiniones reales) */}
      {false && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Lo que dicen los centros que ya usan KUVU
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Testimonial 1 */}
              <div className="bg-gray-50 p-8 rounded-2xl relative">
                <div className="flex text-[#ffc107] mb-4">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-gray-700 text-lg italic mb-6">
                  "KUVU ha transformado por completo la gestión de nuestra escuela infantil. Lo que antes nos tomaba días a final de mes, ahora se hace en minutos. Las familias están encantadas con la transparencia."
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
                    alt="María Fernández" 
                    className="w-14 h-14 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">María Fernández</h4>
                    <p className="text-sm text-gray-500">Directora de Centro Educativo</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-50 p-8 rounded-2xl relative">
                <div className="flex text-[#ffc107] mb-4">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-gray-700 text-lg italic mb-6">
                  "La comunicación con los padres y la gestión del comedor nunca ha sido tan fácil. Cero errores desde que implementamos KUVU. Los monitores y la cocina están siempre sincronizados."
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150" 
                    alt="Carlos Ruiz" 
                    className="w-14 h-14 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Carlos Ruiz</h4>
                    <p className="text-sm text-gray-500">Coordinador Administrativo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final Section (Last Call) */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para dejar atrás el caos administrativo?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            En solo 15 minutos te mostraremos cómo Kuvu puede ayudarte a recuperar el control de tu tiempo y profesionalizar tu gestión.
          </p>
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block sm:inline-block w-full sm:w-auto text-center bg-[#ffc107] text-gray-900 font-bold text-lg sm:text-xl py-4 sm:py-5 px-8 sm:px-10 rounded-full hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            RESERVA TU SESIÓN DE DIAGNÓSTICO (15 MIN)
          </a>
        </div>
      </section>

      <ContactSection />

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Brand */}
            <div>
              <img src="/kuvu-app-logo.png" alt="KUVU Logo" className="h-20 md:h-28 object-contain mx-auto md:mx-0 mb-4" />
              <p className="text-sm max-w-xs mx-auto md:mx-0">
                La plataforma todo en uno para centros educativos que elimina la carga administrativa.
              </p>
            </div>
            
            {/* Contact */}
            <div className="md:pt-14">
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:hola@kuvuapp.com" className="hover:text-white transition-colors">hola@kuvuapp.com</a>
                </li>
                <li>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    +34 621 03 88 12
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="md:text-right md:pt-14">
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Aviso Legal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} KUVU. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
