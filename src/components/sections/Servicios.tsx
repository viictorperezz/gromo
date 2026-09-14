import { Antetitulo, Entrada, Titulo } from "@/components/ui/seccion";
import { Revelar } from "@/components/ui/revelar";
import { SERVICIOS } from "@/lib/contenido";

/**
 * Jerarquía deliberada, no seis tarjetas iguales.
 *
 * El primero (presupuestos) va destacado y ancho porque es el proceso con el
 * que se abre casi toda conversación de venta: es el dolor que el dueño
 * reconoce antes de que termines la frase. Los otros cinco van como lista, sin
 * caja, porque son alternativas a elegir, no seis productos del mismo peso.
 */
export function Servicios() {
  const [destacado, ...resto] = SERVICIOS.items;

  return (
    <section
      id="que-hago"
      className="scroll-mt-28 bg-white px-5 py-20 text-gromo-tinta sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Revelar>
          <Antetitulo>{SERVICIOS.antetitulo}</Antetitulo>
          <Titulo>{SERVICIOS.titulo}</Titulo>
          <Entrada className="text-gromo-gris">{SERVICIOS.entrada}</Entrada>
        </Revelar>

        <Revelar className="mt-14">
          <article className="grid gap-6 rounded-2xl bg-gromo-hueso p-8 sm:grid-cols-[1fr_1.3fr] sm:items-center sm:gap-12 sm:p-12">
            <div>
              <p className="text-[15px] font-semibold text-gromo-verde-oscuro">
                Por donde se suele empezar
              </p>
              <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] sm:text-[2rem]">
                {destacado.titulo}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-gromo-gris sm:text-lg">
              {destacado.texto}
            </p>
          </article>
        </Revelar>

        <ul className="mt-4 grid sm:grid-cols-2 sm:gap-x-12">
          {resto.map((s, i) => (
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
      </div>
    </section>
  );
}
