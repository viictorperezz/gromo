import { Entrada, Titulo } from "@/components/ui/seccion";
import { Revelar } from "@/components/ui/revelar";
import { SERVICIOS } from "@/lib/contenido";

/**
 * Seis ejemplos del mismo peso, a propósito.
 *
 * Hubo una versión con «Presupuestos y ofertas» destacado en una caja ancha,
 * por ser el dolor que el dueño reconoce antes de que termines la frase. Se
 * retiró: destacar uno leía «esto es lo que vendo» y dejaba los otros cinco
 * como accesorios, justo lo contrario del diferencial (a medida, me adapto a
 * lo que te esté comiendo las horas). Además dejaba cinco elementos en dos
 * columnas, con un hueco suelto en la última fila.
 *
 * Seis en dos columnas cierran tres filas exactas. Si se añade o quita un
 * ejemplo, hay que volver a mirar esto.
 */
export function Servicios() {
  return (
    <section
      id="que-hago"
      className="scroll-mt-28 bg-white px-5 py-20 text-gromo-tinta sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Revelar>
          <Titulo>{SERVICIOS.titulo}</Titulo>
          <Entrada className="text-gromo-gris">{SERVICIOS.entrada}</Entrada>
        </Revelar>

        <ul className="mt-10 grid border-t border-gromo-tinta/10 sm:grid-cols-2 sm:gap-x-12">
          {SERVICIOS.items.map((s, i) => (
            <Revelar
              as="li"
              key={s.titulo}
              retraso={(i % 2) * 90}
              className="group border-b border-gromo-tinta/10 py-7"
            >
              <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-gromo-verde-oscuro">
                {s.titulo}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-gromo-gris">
                {s.texto}
              </p>
            </Revelar>
          ))}
        </ul>

        {/* Sin esta línea la rejilla se lee como un menú de seis platos. */}
        <Revelar className="mt-12">
          <p className="max-w-2xl text-base leading-relaxed text-gromo-gris sm:text-lg">
            {SERVICIOS.cierre}
          </p>
        </Revelar>
      </div>
    </section>
  );
}
