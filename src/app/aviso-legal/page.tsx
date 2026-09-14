import type { Metadata } from "next";
import { PaginaLegal, Pendiente } from "@/components/sections/PaginaLegal";
import { LEGAL, MARCA } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Aviso legal",
  robots: { index: false, follow: false },
};

export default function AvisoLegal() {
  return (
    <PaginaLegal titulo="Aviso legal">
      <h2>1. Datos identificativos</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la
        información y de comercio electrónico (LSSI-CE), se informa de que el
        titular de este sitio web es:
      </p>
      <ul>
        <li>
          Titular: <Pendiente>{LEGAL.titular}</Pendiente>
        </li>
        <li>
          NIF: <Pendiente>{LEGAL.nif}</Pendiente>
        </li>
        <li>
          Domicilio: <Pendiente>{LEGAL.domicilio}</Pendiente>
        </li>
        <li>Correo de contacto: {MARCA.email}</li>
        <li>Nombre comercial: {MARCA.nombre}</li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        Este sitio ofrece información sobre servicios de automatización de
        procesos e inteligencia artificial aplicada para pequeñas y medianas
        empresas. El acceso es gratuito y no requiere registro.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El usuario se compromete a hacer un uso adecuado de los contenidos y a no
        emplearlos para actividades ilícitas, ni para dañar el sitio o impedir su
        normal funcionamiento.
      </p>

      <h2>4. Propiedad intelectual</h2>
      <p>
        Los textos, el diseño, el logotipo y el resto de elementos de este sitio
        son titularidad del prestador o cuenta con licencia para su uso. Queda
        prohibida su reproducción o distribución sin autorización expresa.
      </p>

      <h2>5. Exactitud de la información sobre ayudas públicas</h2>
      <p>
        La información sobre subvenciones y ayudas a la digitalización es
        orientativa y depende de cada convocatoria, que puede modificarse o
        cerrarse sin previo aviso. La concesión corresponde en exclusiva a la
        administración competente. Nada de lo publicado aquí constituye una
        garantía de obtención de una ayuda.
      </p>

      <h2>6. Responsabilidad</h2>
      <p>
        El prestador no se responsabiliza de los daños derivados del uso de este
        sitio ni de la indisponibilidad temporal por causas técnicas.
      </p>

      <h2>7. Legislación aplicable</h2>
      <p>
        Esta relación se rige por la legislación española. Para cualquier
        controversia, las partes se someten a los juzgados y tribunales que
        correspondan conforme a derecho.
      </p>
    </PaginaLegal>
  );
}
