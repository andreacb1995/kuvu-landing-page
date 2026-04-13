/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LegalPageLayout } from './LegalPageLayout';
import { LEGAL_SITE_DATA } from './legalSiteData';

export default function PoliticaPrivacidadPage() {
  const d = LEGAL_SITE_DATA;

  return (
    <LegalPageLayout title="Política de privacidad">
      <p className="text-gray-600">
        <strong>Última actualización:</strong> {d.ultimaActualizacion}. Tratamiento de datos personales conforme al
        Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los
        derechos digitales (LOPDGDD).
      </p>

      <section className="space-y-3">
        <h2>1. Responsable del tratamiento</h2>
        <ul className="list-inside list-disc space-y-1.5">
          <li>
            <strong>Identidad:</strong> {d.razonSocial} (en adelante, «{d.nombreComercial}» o el «responsable»)
          </li>
          <li>
            <strong>NIF:</strong> {d.nif}
          </li>
          <li>
            <strong>Domicilio:</strong> {d.direccion}, {d.ciudad}
          </li>
          <li>
            <strong>Correo electrónico:</strong> <a href={`mailto:${d.emailContacto}`}>{d.emailContacto}</a>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>2. Origen y categorías de datos</h2>
        <p>
          Tratamos los datos que nos facilite directamente a través del sitio web, así como los generados por el uso de
          herramientas de terceros descritas más adelante.
        </p>
        <p>
          <strong>Formulario de contacto</strong> (sección «¿Hablamos?» en la página principal): mediante envío a través
          del servicio Formspree, recabamos los siguientes campos tal como están definidos en la aplicación web:
        </p>
        <ul className="list-inside list-disc space-y-1.5">
          <li>
            <strong>centro</strong> (obligatorio): nombre del centro educativo o empresa de catering.
          </li>
          <li>
            <strong>email</strong> (obligatorio): dirección de correo electrónico de contacto profesional.
          </li>
          <li>
            <strong>tel</strong> (opcional): número de teléfono, si lo indica.
          </li>
          <li>
            <strong>mensaje</strong> (opcional): texto libre con la consulta o comentario.
          </li>
        </ul>
        <p>
          El envío del formulario solo es posible si marca la casilla de aceptación de esta política de privacidad
          (consentimiento informado).
        </p>
        <p>
          <strong>Página de agradecimiento (/gracias):</strong> tras un envío correcto del formulario, el navegador puede
          almacenar en <strong>sessionStorage</strong> (clave técnica <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">kuvu_thank_you_ok</code>) un
          valor que solo indica que puede mostrarse la página de confirmación; no incluye datos personales identificativos
          en ese almacenamiento.
        </p>
        <p>
          <strong>Agendado de demostraciones (Calendly):</strong> en la página de agradecimiento puede mostrarse un
          widget incrustado de Calendly, LLC (Estados Unidos). Si reserva una cita, los datos necesarios para la reserva
          (nombre, correo, franja horaria, etc.) son tratados por Calendly como responsable o encargado según la
          configuración de su cuenta; le aplican la{' '}
          <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">
            política de privacidad de Calendly
          </a>
          . {d.nombreComercial} utiliza el embed para facilitar la concertación de demos; puede recibir notificaciones
          de la cita según la configuración de Calendly.
        </p>
        <p>
          <strong>WhatsApp:</strong> los enlaces a WhatsApp (Meta Platforms Ireland Ltd. / WhatsApp LLC) abren la
          aplicación o web de WhatsApp con un mensaje predefinido; al usarlo, se aplican las condiciones y privacidad de
          WhatsApp.
        </p>
      </section>

      <section className="space-y-3">
        <h2>3. Finalidades y bases legales</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Atender solicitudes de información y contacto comercial</strong> (base: art. 6.1.b RGPD — medidas
            precontractuales o interés legítimo en responder consultas B2B; o 6.1.a si se solicita consentimiento
            explícito para comunicaciones comerciales).
          </li>
          <li>
            <strong>Organizar demostraciones del software</strong> (incluida la reserva mediante Calendly): base 6.1.b RGPD
            o 6.1.a según el caso.
          </li>
          <li>
            <strong>Medición de audiencia y campañas</strong> mediante Meta Pixel (Facebook) y LinkedIn Insight Tag (base:
            6.1.a RGPD — consentimiento cuando las cookies o identificadores no sean estrictamente necesarios; o 6.1.f RGPD
            interés legítimo si se limita a mediciones agregadas con garantías, según configuración).
          </li>
          <li>
            <strong>Cumplimiento de obligaciones legales</strong> (art. 6.1.c RGPD).
          </li>
        </ul>
        <p>
          El sitio incorpora un <strong>banner de cookies</strong>: los proveedores Meta (Pixel) y LinkedIn (Insight Tag)
          solo reciben datos derivados de su visita si usted acepta; la preferencia se guarda en{' '}
          <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs">localStorage</code> (clave{' '}
          <code className="text-xs">kuvu_cookie_consent</code>; valores <code className="text-xs">all</code> o{' '}
          <code className="text-xs">essential</code>). Si elige solo esenciales, esos scripts no se ejecutan.
        </p>
      </section>

      <section className="space-y-3">
        <h2>4. Destinatarios y encargos del tratamiento</h2>
        <p>Para la prestación del servicio web se utilizan, entre otros, los siguientes proveedores:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Formspree, Inc.</strong> (Estados Unidos): recepción y reenvío del formulario de contacto a la cuenta
            de correo configurada.{' '}
            <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
              Política de privacidad de Formspree
            </a>
            . Pueden aplicarse transferencias internacionales con garantías adecuadas (cláusulas tipo de la Comisión
            Europea u otras).
          </li>
          <li>
            <strong>Calendly, LLC</strong> (Estados Unidos): widget de reserva de citas en la página /gracias.{' '}
            <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">
              Privacidad de Calendly
            </a>
            .
          </li>
          <li>
            <strong>Meta Platforms Ireland Ltd.</strong> (Meta Pixel): medición y publicidad en función de la
            configuración del píxel. Identificador de píxel instalado en el sitio:{' '}
            <span className="whitespace-nowrap font-mono text-xs">406711755248824</span>.{' '}
            <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">
              Política de privacidad de Meta
            </a>
            .
          </li>
          <li>
            <strong>LinkedIn Corporation / LinkedIn Ireland</strong> (Insight Tag, partner ID{' '}
            <span className="font-mono text-xs">6699001</span>): analítica y remarketing según la configuración de la
            campaña.{' '}
            <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacidad de LinkedIn
            </a>
            .
          </li>
          <li>
            <strong>Proveedor de hosting</strong> (p. ej. Vercel u otro): alojamiento del código estático de la SPA y
            entrega de contenidos. Los datos de tráfico y de acceso se tratarán según la política del proveedor
            contratado.
          </li>
        </ul>
        <p>
          No vendemos sus datos personales. Solo cederemos información cuando exista obligación legal o contrato de
          encargo del tratamiento (art. 28 RGPD) con los proveedores indicados.
        </p>
      </section>

      <section className="space-y-3">
        <h2>5. Plazos de conservación</h2>
        <p>
          Los datos del formulario se conservarán el tiempo necesario para atender la solicitud y para la relación
          comercial posterior, y en todo caso durante los plazos legales aplicables. Los registros derivados de
          herramientas de analítica (Meta, LinkedIn) se regirán por los plazos de cada plataforma y por la configuración
          de su cuenta publicitaria.
        </p>
      </section>

      <section className="space-y-3">
        <h2>6. Derechos del interesado</h2>
        <p>
          Puede ejercer los derechos de acceso, rectificación, supresión, limitación, oposición, portabilidad y retirada
          del consentimiento escribiendo a{' '}
          <a href={`mailto:${d.emailContacto}`}>{d.emailContacto}</a>, indicando el derecho que ejerce y acreditando su
          identidad. También puede presentar reclamación ante la Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            www.aepd.es
          </a>
          ).
        </p>
      </section>

      <section className="space-y-3">
        <h2>7. Centros educativos y datos de menores</h2>
        <p>
          Cuando el interesado sea un centro educativo o representante de una empresa de catering, los datos tratados
          son de carácter profesional. Si en el mensaje o en el proceso de demo se incluyeran datos de menores o
          categorías especiales, el tratamiento deberá cumplir la normativa educativa y de protección de datos aplicable;
          {d.nombreComercial} actúa como responsable de los datos recabados a través de este sitio web en la medida en
          que corresponda.
        </p>
      </section>

      <section className="space-y-3">
        <h2>8. Medidas de seguridad</h2>
        <p>
          Se aplican medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al
          riesgo (art. 32 RGPD), incluido el uso de conexión cifrada (HTTPS) cuando el proveedor de hosting lo permita.
        </p>
      </section>
    </LegalPageLayout>
  );
}
