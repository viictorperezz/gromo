import { Seccion, Titulo } from "@/components/ui/seccion";
import { Boton } from "@/components/ui/boton";
import { FAQ } from "@/lib/contenido";

/**
 * Acordeón con <details>: abre y cierra sin una línea de JavaScript, funciona
 * con teclado por defecto y el buscador lee el contenido aunque esté plegado.
 */
export function Faq() {
  return (
    <Seccion id="faq" tono="hueso">
      {/* Título a un lado y preguntas al otro: la lista ocupaba media página y
          dejaba la otra media vacía. El título se queda fijo mientras se
          recorren las preguntas, así no se pierde de vista dónde estás. */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:gap-16">
        <div>
          <Titulo className="lg:sticky lg:top-28">{FAQ.titulo}</Titulo>
        </div>

        <div>
          {FAQ.items.map((f) => (
            <details
              key={f.p}
              name="faq"
              className="group border-b border-black/10 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold">
                {f.p}
                <svg
                  viewBox="0 0 20 20"
                  className="size-5 shrink-0 text-gromo-verde transition-transform duration-200 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </summary>
              {/* La respuesta no se estira a todo el ancho: pasada cierta
                  longitud de línea, el ojo pierde el renglón al volver. */}
              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-gromo-gris">
                {f.r}
              </p>
            </details>
          ))}

          {/* Salida al final de la página: quien resuelve aquí su duda no
              debería tener que volver arriba a buscar el botón. */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <p className="text-base leading-relaxed text-gromo-gris">
              {FAQ.cierre}
            </p>
            <Boton href="#contacto" variante="primario">
              {FAQ.cta}
            </Boton>
          </div>
        </div>
      </div>
    </Seccion>
  );
}
