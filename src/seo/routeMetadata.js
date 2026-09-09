export const SITE_URL = 'https://kuvuapp.com';
export const SOCIAL_IMAGE = `${SITE_URL}/og-kuvu.png`;

export const pages = {
  '/': {
    title: 'Kuvu | Comedor escolar para ANPAs, centros y caterings',
    description:
      'Kuvu centraliza inscripciones, ausencias, consumos y facturación del comedor escolar para ANPAs, centros educativos y empresas de catering.',
    path: '/',
    robots: 'index, follow',
  },
  '/aviso-legal': {
    title: 'Aviso legal — Kuvu',
    description:
      'Consulta el aviso legal de Kuvu y la información sobre el uso de este sitio web.',
    path: '/aviso-legal',
    robots: 'index, follow',
  },
  '/politica-privacidad': {
    title: 'Política de privacidad — Kuvu',
    description:
      'Consulta cómo Kuvu trata los datos personales recogidos a través de su sitio web.',
    path: '/politica-privacidad',
    robots: 'index, follow',
  },
  '/gracias': {
    title: 'Solicitud recibida — Kuvu',
    description: 'Hemos recibido tu solicitud de información sobre Kuvu.',
    path: '/gracias',
    robots: 'noindex, nofollow',
  },
};

export function getRouteMetadata(pathname) {
  const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
  return pages[normalizedPath] ?? pages['/'];
}
