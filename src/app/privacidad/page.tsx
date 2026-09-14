import type { Metadata } from "next";
import { PaginaLegal, Pendiente } from "@/components/sections/PaginaLegal";
import { LEGAL, MARCA } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Política de privacidad — Gromo",
  robots: { index: false, follow: false },
};

export default function Privacidad() {
  return (
    <PaginaLegal titulo="Política de privacidad">
      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          Responsable: <Pendiente>{LEGAL.titular}</Pendiente>
        </li>
        <li>
          NIF: <Pendiente>{LEGAL.nif}</Pendiente>
        </li>
        <li>Correo: {MARCA.email}</li>
      </ul>

      <h2>2. Qué datos se recogen y para qué</h2>
      <p>
        Solo se tratan los datos que se envían voluntariamente a través del
        formulario de contacto: empresa, nombre, correo electrónico, teléfono (si
        se facilita) y la descripción del proceso sobre el que se consulta.
      </p>
      <p>
        La finalidad es única: responder a la solicitud y, en su caso, preparar y
        mantener la relación comercial. No se elaboran perfiles, no se toman
        decisiones automatizadas y no se envían comunicaciones comerciales no
        solicitadas.
      </p>

      <h2>3. Base jurídica</h2>
      <p>
        El consentimiento de la persona interesada al enviar el formulario, y la
        aplicación de medidas precontractuales a petición suya (artículo 6.1.a y
        6.1.b del RGPD).
      </p>

      <h2>4. Conservación</h2>
      <p>
        Los datos se conservan el tiempo necesario para atender la solicitud y,
        si se inicia una relación comercial, durante los plazos legales de
        conservación fiscal y contable. Si no hay relación, se eliminan cuando
        dejan de ser útiles para el fin que los originó.
      </p>

      <h2>5. Destinatarios</h2>
      <p>
        Los datos no se ceden a terceros. El correo del formulario se entrega a
        través de un proveedor de envío de correo electrónico que actúa como
        encargado del tratamiento, con las garantías del artículo 28 del RGPD.
      </p>

      <h2>6. Derechos</h2>
      <p>
        Puede solicitar el acceso, la rectificación, la supresión, la limitación
        del tratamiento, la oposición y la portabilidad de sus datos escribiendo
        a {MARCA.email}. También puede presentar una reclamación ante la Agencia
        Española de Protección de Datos (www.aepd.es) si considera que el
        tratamiento no se ajusta a la normativa.
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Se aplican medidas técnicas y organizativas razonables para proteger los
        datos frente a accesos no autorizados, pérdida o alteración.
      </p>
    </PaginaLegal>
  );
}
