/**
 * Datos identificativos del titular para textos legales.
 * Completar NIF, dirección y ciudad antes de publicación definitiva.
 */
export const LEGAL_SITE_DATA = {
  nombreComercial: 'KUVU',
  /** Razón social o nombre legal de la empresa titular del sitio */
  razonSocial: 'Andrea Carballido Ballesteros',
  nif: '39450942P',
  direccion: 'Camiño da calima 11',
  ciudad: 'Redondela',
  /** Correo de contacto publicado en el sitio */
  emailContacto: 'hola@kuvuapp.com',
  /** Fecha de última revisión de los textos legales (YYYY-MM-DD) */
  ultimaActualizacion: '09-04-2026',
} as const;
