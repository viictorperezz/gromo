import { GromoSymbol } from "@/components/brand/GromoLogo";
import { Antetitulo, Titulo } from "@/components/ui/seccion";
import { Revelar } from "@/components/ui/revelar";
import { PORQUE } from "@/lib/contenido";

/**
 * Rejilla alineada, de una sola lista.
 *
 * Hubo una versión con las dos columnas desfasadas buscando asimetría, pero el
 * desnivel hacía que ninguna fila casara con la de al lado y se leía como un
 * fallo de maquetación, no como una decisión. La variación de ritmo de la
 * página ya la aportan el problema (editorial), los servicios (destacado más
 * lista) y las ayudas (calculadora); esta sección gana estando ordenada.
 *
 * Con un único <ul> en rejilla, las filas se alinean solas aunque los textos
 * tengan distinta longitud.
 */
export function PorQue() {
  return (
    <section
      id="por-que"
      className="scroll-mt-28 bg-white px-5 py-20 text-gromo-tinta sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Revelar>
          <Antetitulo>{PORQUE.antetitulo}</Antetitulo>
          <Titulo>{PORQUE.titulo}</Titulo>
        </Revelar>

        <ul className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PORQUE.items.map((i, n) => (
            <Revelar
              as="li"
              key={i.titulo}
              retraso={(n % 3) * 100}
              className="group"
            >
              <GromoSymbol
                decorative
                className="size-7 transition-transform duration-500 group-hover:-translate-y-1"
              />
              <h3 className="mt-4 text-lg font-bold">{i.titulo}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-gromo-gris">
                {i.texto}
              </p>
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  );
}
