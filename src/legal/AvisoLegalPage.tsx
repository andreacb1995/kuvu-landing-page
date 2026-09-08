import { LegalPageLayout } from './LegalPageLayout';
import { LEGAL_SITE_DATA } from './legalSiteData';

export default function AvisoLegalPage() {
  const d = LEGAL_SITE_DATA;

  return (
    <LegalPageLayout title="Aviso legal">
      <section className="space-y-3">
        <h2>1. Identificación de la titular</h2>
        <p>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio
          electrónico, se informa de que el sitio web de KUVU es titularidad de:
        </p>
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-50 text-gray-800"><tr><th className="border border-gray-200 p-2">DATO</th><th className="border border-gray-200 p-2">INFORMACIÓN</th></tr></thead>
          <tbody>
            <tr><th className="border border-gray-200 p-2">Titular</th><td className="border border-gray-200 p-2">{d.razonSocial}</td></tr>
            <tr><th className="border border-gray-200 p-2">NIF</th><td className="border border-gray-200 p-2">{d.nif}</td></tr>
            <tr><th className="border border-gray-200 p-2">Domicilio</th><td className="border border-gray-200 p-2">{d.direccion}</td></tr>
            <tr><th className="border border-gray-200 p-2">Nombre comercial</th><td className="border border-gray-200 p-2">{d.nombreComercial}</td></tr>
            <tr><th className="border border-gray-200 p-2">Correo electrónico</th><td className="border border-gray-200 p-2"><a href="mailto:hola@kuvuapp.com">hola@kuvuapp.com</a></td></tr>
          </tbody>
        </table>
        <p>En adelante, la «titular».</p>
      </section>
      <section className="space-y-3"><h2>2. Objeto del sitio web</h2><p>El sitio web tiene carácter informativo y tiene por objeto dar a conocer KUVU y sus servicios relacionados con la gestión de comedores, centros educativos y empresas de catering, así como facilitar un medio de contacto para solicitar información o una sesión demostrativa.</p><p>La información publicada en el sitio web no constituye por sí misma una oferta contractual ni implica la contratación de los servicios de KUVU. Las condiciones aplicables a cada servicio serán las que, en su caso, se acuerden expresamente con el cliente.</p></section>
      <section className="space-y-3"><h2>3. Acceso y uso del sitio web</h2><p>El acceso al sitio web implica la aceptación del presente Aviso Legal. La persona usuaria se compromete a utilizarlo de forma lícita, diligente y respetuosa con los derechos e intereses de terceros.</p><p>Queda prohibido utilizar el sitio web con fines ilícitos, introducir programas o códigos maliciosos, intentar acceder sin autorización a sistemas o información, alterar su funcionamiento o realizar cualquier actuación que pueda causar daños a la titular o a terceros.</p></section>
      <section className="space-y-3"><h2>4. Información publicada</h2><p>KUVU procura que la información disponible en el sitio web sea clara, correcta y esté actualizada. No obstante, la información tiene carácter general y puede ser modificada, actualizada o retirada cuando resulte necesario.</p><p>Las descripciones de funcionalidades, características o servicios tienen finalidad informativa. Las condiciones concretas de prestación serán las que se establezcan en la correspondiente propuesta, presupuesto o contrato.</p></section>
      <section className="space-y-3"><h2>5. Propiedad intelectual e industrial</h2><p>Los contenidos del sitio web, incluidos textos, diseños, imágenes, logotipos, elementos gráficos, estructura, código y demás recursos, pertenecen a la titular o se utilizan con la autorización correspondiente y están protegidos por la normativa de propiedad intelectual e industrial.</p><p>No se permite su reproducción, distribución, transformación, comunicación pública o explotación con fines comerciales sin autorización previa de la titular, salvo en los casos expresamente permitidos por la ley.</p><p>Las marcas, nombres comerciales y signos distintivos que aparezcan en el sitio web pertenecen a sus respectivos titulares. El acceso al sitio web no confiere derecho alguno sobre ellos.</p></section>
      <section className="space-y-3"><h2>6. Responsabilidad</h2><p>La titular adopta medidas razonables para mantener el sitio web disponible y seguro, pero no puede garantizar la ausencia absoluta de interrupciones, errores, fallos técnicos o actuaciones de terceros.</p><p>La titular no será responsable de daños derivados de un uso ilícito o inadecuado del sitio web, de problemas imputables a los equipos o conexiones de la persona usuaria, ni de hechos ajenos a su control, sin perjuicio de las responsabilidades que legalmente le correspondan.</p></section>
      <section className="space-y-3"><h2>7. Enlaces a terceros</h2><p>Cuando el sitio web incluya enlaces a páginas, redes, servicios o recursos de terceros, estos se facilitarán únicamente para facilitar el acceso a información o servicios externos. KUVU no controla sus contenidos, disponibilidad, seguridad ni políticas y no será responsable de ellos, salvo en los supuestos legalmente previstos.</p></section>
      <section className="space-y-3"><h2>8. Protección de datos personales</h2><p>Los datos personales facilitados a través del sitio web serán tratados de conformidad con la normativa aplicable y con lo establecido en la Política de Privacidad, disponible de forma permanente en el sitio web.</p></section>
      <section className="space-y-3"><h2>9. Cookies</h2><p>La información sobre las cookies y tecnologías similares utilizadas por el sitio web, sus finalidades y las opciones disponibles para su gestión se recogerá en la correspondiente Política de Cookies.</p></section>
      <section className="space-y-3"><h2>10. Modificaciones</h2><p>La titular podrá modificar el presente Aviso Legal cuando resulte necesario para adaptarlo a cambios normativos, técnicos o relativos al contenido o funcionamiento del sitio web. La versión vigente será la publicada en cada momento.</p></section>
      <section className="space-y-3"><h2>11. Legislación aplicable y jurisdicción</h2><p>El presente Aviso Legal se rige por la legislación española. Cualquier controversia relacionada con el acceso o uso del sitio web se someterá a los juzgados y tribunales que resulten competentes conforme a la normativa aplicable.</p></section>
      <p><strong>Última actualización:</strong> septiembre de 2026.</p>
      <section className="space-y-3"><h2>12. Referencias normativas</h2><ul className="list-inside list-disc space-y-1.5"><li>Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico.</li><li>Reglamento (UE) 2016/679, General de Protección de Datos.</li><li>Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales.</li></ul></section>
    </LegalPageLayout>
  );
}
