/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle, Clock, MessageSquare, CreditCard, Star, ShieldCheck, TrendingUp, Users } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/34621038812?text=Hola%20Kuvu,%20nos%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20la%20plataforma%20para%20nuestro%20centro%20educativo.";

export default function App() {
  return (
    <div className="min-h-screen font-sans text-gray-900 relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ajustamos el tamaño y usamos un margen negativo si la imagen tiene mucho espacio transparente */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1976d2] text-white pt-32 pb-16 lg:pt-44 lg:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                TOMA EL CONTROL DE TU CENTRO CON KUVU
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl">
                La plataforma todo en uno para centros educativos que elimina la carga administrativa y simplifica la comunicación con las familias.
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
                  SOLICITA TU DEMO GRATIS
                </a>
              </div>
            </div>
            
            {/* Right Column (Image/Illustration) */}
            <div className="relative mt-12 lg:mt-0 flex justify-center items-center">
              {/* Resplandor suave de fondo para resaltar los dispositivos */}
              <div className="absolute inset-0 bg-blue-300 blur-3xl rounded-full opacity-20 transform scale-75"></div>
              <img 
                src="/mockups.png" 
                alt="Plataforma KUVU en dispositivos" 
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

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Adiós al caos de las listas manuales</h3>
              <p className="text-gray-600 leading-relaxed">
                Elimina las horas perdidas cruzando asistencias, correos y recibos. KUVU centraliza todo en un clic.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comunicación en tiempo real sin errores</h3>
              <p className="text-gray-600 leading-relaxed">
                Los cambios de última hora de las familias llegan directamente a la cocina y a los monitores. Sin malentendidos, sin fallos.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-7 h-7 text-[#1976d2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Facturación y cobros sin fricción</h3>
              <p className="text-gray-600 leading-relaxed">
                Genera facturas individuales automáticamente y controla los pagos de servicios ocasionales sin esfuerzo bancario.
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
              SOLICITA TU DEMO GRATIS
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
            Da el paso definitivo para automatizar la gestión de tu centro y mejorar la comunicación con las familias.
          </p>
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block sm:inline-block w-full sm:w-auto text-center bg-[#ffc107] text-gray-900 font-bold text-lg sm:text-xl py-4 sm:py-5 px-8 sm:px-10 rounded-full hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            SOLICITA TU DEMO GRATIS
          </a>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Brand */}
            <div>
              <img src="/kuvu-logo.png" alt="KUVU Logo" className="h-20 md:h-28 object-contain mx-auto md:mx-0 mb-4" />
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
