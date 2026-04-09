/**
 * Dispara evento personalizado de clic en WhatsApp para Meta Pixel.
 * Usa `position` para segmentar en Events Manager.
 */
export function handleWhatsAppClick(posicion: string): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'WhatsAppClick', { position: posicion });
  }
}

/** Tras envío exitoso del formulario de contacto (antes de ir a /gracias). */
export function trackLead(): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  }
}

/** Carga de la página de agradecimiento tras el envío del formulario. */
export function trackFormSubmittedPage(): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'FormSubmitted');
  }
}

/** Clic en WhatsApp con evento personalizado WhatsAppContact (p. ej. thank you). */
export function trackWhatsAppContact(position: string): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'WhatsAppContact', { position });
  }
}

/** Cita reservada vía Calendly (postMessage calendly.event_scheduled). */
export function trackSchedule(): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Schedule');
  }
}
