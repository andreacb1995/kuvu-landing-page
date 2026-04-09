/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { LegalPageLayout } from './LegalPageLayout';
import { LEGAL_SITE_DATA } from './legalSiteData';

export default function PoliticaCookiesPage() {
  const d = LEGAL_SITE_DATA;

  return (
    <LegalPageLayout title="Política de cookies">
      <p className="text-gray-600">
        <strong>Última actualización:</strong> {d.ultimaActualizacion}. Esta política describe las cookies y tecnologías
        similares utilizadas en el sitio web operado por {d.razonSocial} («{d.nombreComercial}»), de acuerdo con la Ley
        34/2002 (LSSI-CE) y la normativa de protección de datos.
      </p>

      <section className="space-y-3">
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos que se almacenan en el dispositivo del usuario. También pueden usarse
          tecnologías similares (píxeles, almacenamiento local). En este sitio, la aplicación cargada en el navegador
          puede usar <strong>sessionStorage</strong> (no es una cookie HTTP) para guardar una clave técnica tras el envío
          del formulario, con el fin de permitir mostrar la página de agradecimiento sin volver a enviar datos.
        </p>
      </section>

      <section className="space-y-3">
        <h2>2. Scripts y servicios cargados en el sitio (según el código actual)</h2>
        <p>
          En el documento HTML principal <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">index.html</code> se
          cargan los siguientes scripts de terceros en todas las páginas de la aplicación:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Meta Pixel (Facebook)</strong>: script <code className="text-xs">fbevents.js</code> desde{' '}
            <span className="break-all font-mono text-xs">connect.facebook.net</span>. Píxel ID:{' '}
            <span className="font-mono text-xs">406711755248824</span>. Sirve para medición y, según la configuración de
            campañas, publicidad. Puede establecer cookies propias o de terceros en el dominio del usuario o identificadores
            relacionados.
          </li>
          <li>
            <strong>LinkedIn Insight Tag</strong>: script <code className="text-xs">insight.min.js</code> desde{' '}
            <span className="break-all font-mono text-xs">snap.licdn.com</span>, con partner ID{' '}
            <span className="font-mono text-xs">9934705</span>. Permite analítica y remarketing en LinkedIn.
          </li>
        </ul>
        <p>
          Además, en modo sin JavaScript, <code className="text-xs">index.html</code> incluye imágenes de seguimiento
          (píxeles 1×1) para <strong>Facebook</strong> y <strong>LinkedIn</strong>, que pueden registrar la visita de
          forma similar a las cookies.
        </p>
      </section>

      <section className="space-y-3">
        <h2>3. Calendly (solo página de agradecimiento)</h2>
        <p>
          En la ruta <code className="text-xs">/gracias</code>, cuando el usuario se desplaza hasta el bloque del
          calendario, el sitio carga el script <code className="text-xs">widget.js</code> desde{' '}
          <span className="break-all font-mono text-xs">assets.calendly.com</span> e incrusta un iframe de{' '}
          <span className="break-all font-mono text-xs">calendly.com</span>. Calendly puede usar cookies propias para el
          funcionamiento del flujo de reserva. La URL del evento incluye parámetros de personalización del embed (
          <code className="text-xs">hide_landing_page_details</code>, <code className="text-xs">hide_gdpr_banner</code>).
        </p>
      </section>

      <section className="space-y-3">
        <h2>4. Finalidad y base legal</h2>
        <p>
          Las cookies o tecnologías similares de Meta y LinkedIn se utilizan para analítica y marketing digital; la base
          legal será, según el caso, su consentimiento (art. 6.1.a RGPD y art. 22 LSSI) o el interés legítimo
          (art. 6.1.f RGPD) cuando la normativa aplicable lo permita para cookies analíticas no invasivas.
        </p>
        <p>
          Los datos técnicos de la aplicación (sessionStorage para la página de gracias) tienen función estrictamente
          necesaria para la navegación solicitada y no sustituyen el consentimiento para cookies de terceros.
        </p>
      </section>

      <section className="space-y-3">
        <h2>5. Cómo gestionar o desactivar cookies</h2>
        <p>
          Puede configurar su navegador para bloquear o eliminar cookies. También puede usar las herramientas de
          configuración de anuncios de Meta y LinkedIn. Tenga en cuenta que desactivar cookies técnicas puede afectar al
          funcionamiento de ciertas partes del sitio.
        </p>
      </section>

      <section className="space-y-3">
        <h2>6. Más información</h2>
        <p>
          Para el tratamiento de datos personales asociado a la navegación, consulte la{' '}
          <Link to="/politica-privacidad" className="font-medium text-[#1976d2] underline hover:text-blue-800">
            Política de privacidad
          </Link>
          . Para contacto con el responsable:{' '}
          <a href={`mailto:${d.emailContacto}`}>{d.emailContacto}</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
