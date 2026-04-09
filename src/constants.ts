/** Número WhatsApp: código país 34 (España) + número, sin espacios. Texto en URL: solo ASCII, sin tildes ni emoji. */
const WHATSAPP_PHONE = '34621038812';

/** Query `text` con %20 para espacios; sin signos que algunos clientes muestren mal. */
const WHATSAPP_TEXT_ASCII =
  'Hola%20Kuvu,%20me%20gustaria%20recibir%20mas%20informacion%20sobre%20vuestra%20plataforma%20de%20gestion%20de%20comedores.%20Muchas%20gracias.';

/** Enlace wa.me con mensaje predefinido. */
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_TEXT_ASCII}`;

/** Logo oscuro / a color para navbar sobre #1976d2. Coloca el PNG en /public (p. ej. kuvu-logo-navbar-dark.png). */
export const LOGO_NAVBAR_DARK_URL =
  import.meta.env.VITE_LOGO_NAVBAR_DARK?.trim() || '/kuvu-logo-navbar-dark.png';

export const LOGO_DEFAULT_URL = '/kuvu-app-logo.png';

/** Clave de sesión: solo tras envío correcto del formulario se permite ver /gracias. */
export const THANK_YOU_SESSION_KEY = 'kuvu_thank_you_ok';

/** Logo azul para fondos claros (minimal). */
export const LOGO_AZUL_URL = '/kuvu-app-logo-azul.png';

/** Logo claro para fondos azul corporativo (#1976d2); mismo asset que el navbar sobre el hero. */
export const LOGO_BLANCO_URL = '/kuvu-app-logo.png';

/** Evento Calendly por defecto en /gracias (sin cabecera de evento ni banner GDPR en el embed). */
export const DEFAULT_CALENDLY_URL =
  'https://calendly.com/andrea-kuvuapp/demo?hide_landing_page_details=1&hide_gdpr_banner=1';
