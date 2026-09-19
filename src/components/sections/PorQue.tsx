import { GromoSymbol } from "@/components/brand/GromoLogo";
import { Entrada, Titulo } from "@/components/ui/seccion";
import { Revelar } from "@/components/ui/revelar";
import { PORQUE } from "@/lib/contenido";
import { cn } from "@/lib/utils";

/**
 * Comparación de dos modelos, fila a fila.
 *
 * La versión anterior era una rejilla de seis virtudes sueltas, y la mitad
 * repetía lo que ya decían el hero y los pasos. Aquí el formato ES el
 * argumento: cada fila enfrenta el mismo tema en las dos columnas, así que el
 * diferencial se ve sin tener que afirmarlo.
 *
 * La columna de Gromo va destacada (fondo hueso, símbolo, texto en tinta) y la
 * otra en gris: sin esa jerarquía, un lector que escanee no sabría cuál es
 * cuál. En móvil la tabla se rompe en tarjetas apiladas, porque dos columnas
 * de texto largo a 360 px no se leen.
 */
export function PorQue() {
  return (
    <section
      id="por-que"
      className="scroll-mt-28 bg-white px-5 py-16 text-gromo-tinta sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Revelar>
          <Titulo>{PORQUE.titulo}</Titulo>
          {PORQUE.entrada.map((p, i) => (
            <Entrada
              key={p}
              className={cn("text-gromo-gris", i > 0 && "mt-3")}
            >
              {p}
            </Entrada>
          ))}
        </Revelar>

        {/* Cabecera de columnas: solo desde sm, porque en móvil cada tarjeta
            lleva su propia etiqueta. */}
        <Revelar className="mt-10 hidden sm:grid sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] sm:gap-x-8">
          <span />
          <span className="text-[15px] font-semibold text-gromo-gris">
            {PORQUE.columnas.otros}
          </span>
          <span className="flex items-center gap-2 text-[15px] font-bold">
            <GromoSymbol decorative className="size-5" />
            {PORQUE.columnas.gromo}
          </span>
        </Revelar>

        <ul className="mt-4 grid gap-4 sm:gap-0">
          {PORQUE.filas.map((f, n) => (
            <Revelar
              as="li"
              key={f.tema}
              retraso={n * 80}
              className="grid gap-3 border-t border-gromo-tinta/10 pt-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-start sm:gap-x-8 sm:pb-5"
            >
              <h3 className="text-lg font-bold">{f.tema}</h3>

              <p className="text-[15px] leading-relaxed text-gromo-gris">
                <span className="mb-1 block font-semibold text-gromo-tinta/70 sm:hidden">
                  {PORQUE.columnas.otros}
                </span>
                {f.otros}
              </p>

              {/* El fondo hueso sube 12 px sobre la línea para que la columna
                  destacada parezca una tira continua a lo largo de la tabla. */}
              <p className="rounded-xl bg-gromo-hueso p-4 text-[15px] leading-relaxed sm:-mt-3">
                <span className="mb-1 block font-bold sm:hidden">
                  {PORQUE.columnas.gromo}
                </span>
                {f.gromo}
              </p>
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  );
}
