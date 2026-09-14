import { Antetitulo, Entrada, Seccion, Titulo } from "@/components/ui/seccion";
import { AYUDAS } from "@/lib/contenido";

export function Ayudas() {
  return (
    <Seccion id="ayudas" tono="hueso">
      <Antetitulo>{AYUDAS.antetitulo}</Antetitulo>
      <Titulo>{AYUDAS.titulo}</Titulo>
      <Entrada>{AYUDAS.entrada}</Entrada>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {/* La tabla es ancha por naturaleza: scroll propio antes que romper la página */}
        <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <caption className="sr-only">
              Coste neto de un proyecto de 5.000 € según la cobertura de la ayuda
            </caption>
            <thead>
              <tr className="border-b border-black/10">
                {AYUDAS.tabla.encabezados.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-5 py-4 text-[12px] font-semibold tracking-wide text-gromo-gris uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AYUDAS.tabla.filas.map((f, i) => (
                <tr
                  key={f[0]}
                  className={i > 0 ? "border-t border-black/[0.06]" : undefined}
                >
                  {/* La clave va por columna: en la fila del 50 % el valor se
                      repite (te devuelven y coste neto son ambos 2.500 €). */}
                  {f.map((celda, j) => (
                    <td
                      key={AYUDAS.tabla.encabezados[j]}
                      className={
                        j === 0
                          ? "px-5 py-4 text-[15px] font-bold"
                          : j === f.length - 1
                            ? "px-5 py-4 text-[15px] font-extrabold text-gromo-verde-oscuro"
                            : "px-5 py-4 text-[15px] text-gromo-gris"
                      }
                    >
                      {celda}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <ul className="grid gap-4">
            {AYUDAS.notas.map((n) => (
              <li key={n} className="flex gap-3 text-[15px] leading-relaxed">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-1 size-4 shrink-0 text-gromo-verde"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                <span className="text-gromo-gris">{n}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-2xl bg-gromo-tinta p-6 text-[15px] leading-relaxed text-gromo-hueso/85">
            {AYUDAS.territorio}
          </p>
        </div>
      </div>
    </Seccion>
  );
}
