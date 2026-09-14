import type { Metadata } from "next";
import { PaginaLegal } from "@/components/sections/PaginaLegal";
import { MARCA } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Política de cookies — Gromo",
  robots: { index: false, follow: false },
};

export default function Cookies() {
  return (
    <PaginaLegal titulo="Política de cookies">
      <h2>1. Situación actual</h2>
      <p>
        Este sitio <strong>no utiliza cookies</strong> propias ni de terceros. No
        hay analítica, ni píxeles publicitarios, ni botones de redes sociales que
        rastreen la navegación.
      </p>
      <p>
        Por ese motivo no se muestra ningún aviso de consentimiento: el artículo
        22.2 de la LSSI solo lo exige cuando se almacenan o recuperan datos en el
        dispositivo del usuario, y aquí no ocurre.
      </p>

      <h2>2. Tipografías</h2>
      <p>
        La tipografía Inter se sirve desde el propio dominio, no desde un tercero,
        de modo que la navegación no genera peticiones externas que puedan
        registrar la dirección IP.
      </p>

      <h2>3. Formulario de contacto</h2>
      <p>
        El formulario no instala cookies. Los datos que se envían se tratan
        conforme a la política de privacidad.
      </p>

      <h2>4. Si esto cambia</h2>
      <p>
        Si en el futuro se incorpora analítica o cualquier tecnología que sí
        requiera consentimiento, se publicará el aviso correspondiente antes de
        activarla y se actualizará esta página. Para cualquier duda:{" "}
        {MARCA.email}.
      </p>
    </PaginaLegal>
  );
}
