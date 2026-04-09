/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LegalPageLayout } from './LegalPageLayout';
import { LEGAL_SITE_DATA } from './legalSiteData';

export default function AvisoLegalPage() {
  const d = LEGAL_SITE_DATA;

  return (
    <LegalPageLayout title="Aviso legal">
      <p className="text-gray-600">
        <strong>Última actualización:</strong> {d.ultimaActualizacion}
      </p>

      <section className="space-y-3">
        <h2>1. Datos identificativos</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos:
        </p>
        <ul className="list-inside list-disc space-y-1.5 text-gray-700">
          <li>
            <strong>Denominación / titular:</strong> {d.razonSocial} (marca comercial «{d.nombreComercial}»)
          </li>
          <li>
            <strong>NIF:</strong> {d.nif}
          </li>
          <li>
            <strong>Domicilio social:</strong> {d.direccion} ({d.ciudad})
          </li>
          <li>
            <strong>Correo electrónico de contacto:</strong>{' '}
            <a href={`mailto:${d.emailContacto}`}>{d.emailContacto}</a>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>2. Objeto</h2>
        <p>
          El presente sitio web tiene por objeto informar sobre la plataforma de software {d.nombreComercial} para la
          gestión de comedores escolares, caterings y centros educativos, así como facilitar el contacto con el titular
          y, en su caso, la solicitud de información o demostraciones.
        </p>
      </section>

      <section className="space-y-3">
        <h2>3. Condiciones de uso</h2>
        <p>
          El acceso al sitio implica la condición de usuario y la aceptación del presente Aviso Legal, de la Política de
          Privacidad y de la Política de Cookies. El titular podrá modificar estos textos; la versión vigente será la
          publicada en cada momento en el sitio.
        </p>
      </section>

      <section className="space-y-3">
        <h2>4. Propiedad intelectual e industrial</h2>
        <p>
          Los contenidos del sitio (textos, imágenes, marcas, logotipos, diseño, código fuente de la aplicación web
          cliente salvo software de terceros integrado mediante licencia) son titularidad del responsable o de terceros
          que han autorizado su uso. Queda prohibida la reproducción, distribución, comunicación pública o
          transformación sin autorización previa y por escrito, salvo lo permitido por la ley o para uso privado.
        </p>
      </section>

      <section className="space-y-3">
        <h2>5. Responsabilidad</h2>
        <p>
          El titular procura mantener la información actualizada, sin garantía expresa o implícita sobre su exhaustividad.
          Los enlaces a sitios de terceros (incluidos proveedores de analítica, agendado o mensajería) se ofrecen a título
          informativo; el titular no se hace responsable de sus contenidos ni de sus políticas.
        </p>
      </section>

      <section className="space-y-3">
        <h2>6. Alojamiento y prestación técnica</h2>
        <p>
          El sitio web se sirve como aplicación de una sola página (SPA). El alojamiento del código y la entrega de
          contenidos pueden realizarse a través de un proveedor de hosting (por ejemplo, Vercel Inc. u otro proveedor
          contratado). Los datos personales tratados en ese contexto se describen en la Política de Privacidad.
        </p>
      </section>

      <section className="space-y-3">
        <h2>7. Legislación aplicable y jurisdicción</h2>
        <p>
          El presente Aviso Legal se rige por la legislación española. Para la resolución de controversias, serán
          competentes los juzgados y tribunales de {d.ciudad}, salvo normativa imperativa en contrario en materia de
          consumidores y usuarios.
        </p>
      </section>
    </LegalPageLayout>
  );
}
