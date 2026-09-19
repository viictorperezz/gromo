import { Titulo } from "@/components/ui/seccion";
import { Revelar } from "@/components/ui/revelar";
import { PROBLEMA } from "@/lib/contenido";

/**
 * Formato editorial, no rejilla: el título se queda fijo a la izquierda
 * mientras la lista pasa por delante. Rompe el ritmo de "título + tarjetas"
 * del resto de la página y hace que leer el problema se sienta como avanzar.
 */
export function Problema() {
  return (
    <section
      id="problema"
      className="scroll-mt-28 bg-gromo-hueso px-5 py-20 text-gromo-tinta sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Revelar desde="izquierda">
            <Titulo>{PROBLEMA.titulo}</Titulo>
            <p className="mt-5 max-w-md text-base leading-relaxed text-gromo-gris sm:text-lg">
              {PROBLEMA.entrada}
            </p>
          </Revelar>
        </div>

        <ol className="grid">
          {PROBLEMA.puntos.map((p, i) => (
            <Revelar
              as="li"
              key={p.titulo}
              retraso={i * 90}
              className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-gromo-tinta/12 py-8 first:border-t-0 first:pt-0 sm:gap-x-9"
            >
              <span
                aria-hidden
                className="font-mono text-[2.5rem] leading-none font-extrabold text-gromo-tinta/12 transition-colors duration-500 group-hover:text-gromo-verde/70 sm:text-[3.25rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-bold sm:text-[1.4rem]">{p.titulo}</h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gromo-gris sm:text-base">
                  {p.texto}
                </p>
              </div>
            </Revelar>
          ))}
        </ol>
      </div>
    </section>
  );
}
