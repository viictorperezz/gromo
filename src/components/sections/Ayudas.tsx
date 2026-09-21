"use client";

import { useEffect, useRef, useState } from "react";
import { Entrada, Titulo } from "@/components/ui/seccion";
import { Revelar } from "@/components/ui/revelar";
import { Boton } from "@/components/ui/boton";
import { AYUDAS } from "@/lib/contenido";
import { COMUNIDAD_POR_DEFECTO, buscarComunidad } from "@/lib/ayudas-mock";
import { SelectorComunidad } from "@/components/ui/selector-comunidad";
import { cn } from "@/lib/utils";

/**
 * useGrouping en true a propósito.
 *
 * En español los números de cuatro cifras no llevan punto de millar, así que
 * por defecto Intl escribe "5000 €". Es correcto, pero el resto de la web y
 * los materiales de venta escriben "5.000 €", y aquí manda la coherencia:
 * estas cifras son la comparación que el visitante se lleva en la cabeza.
 */
const EUROS = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  useGrouping: true,
});

/**
 * Interpola un número hasta su valor destino.
 *
 * Con requestAnimationFrame en vez de un intervalo, para que el navegador
 * marque el ritmo y no se acumulen fotogramas. Si el visitante pide menos
 * movimiento, salta directamente al valor final.
 */
function useNumero(destino: number, ms = 550): number {
  const [valor, setValor] = useState(destino);
  const anterior = useRef(destino);

  useEffect(() => {
    const desde = anterior.current;
    anterior.current = destino;
    if (desde === destino) return;

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // El salto al valor final también pasa por requestAnimationFrame: escribir
    // el estado en el cuerpo del efecto encadena renders de más.
    let id = 0;
    const inicio = performance.now();
    const paso = (ahora: number) => {
      const t = quieto ? 1 : Math.min(1, (ahora - inicio) / ms);
      const suave = 1 - Math.pow(1 - t, 3);
      setValor(Math.round(desde + (destino - desde) * suave));
      if (t < 1) id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [destino, ms]);

  return valor;
}

export function Ayudas() {
  const [id, setId] = useState<string>(COMUNIDAD_POR_DEFECTO);
  const comunidad = buscarComunidad(id);

  // El ejemplo se calcula con la cobertura típica de la comunidad, pero el
  // tramo (min-max) viaja siempre al lado: la concesión la decide la
  // administración, así que la cifra es un ejemplo, nunca una garantía.
  const { min, max, tipica } = comunidad.cobertura;
  const subvencion = Math.round((AYUDAS.base * tipica) / 100);
  const neto = AYUDAS.base - subvencion;

  const subvencionAnim = useNumero(subvencion);
  const netoAnim = useNumero(neto);

  return (
    <section
      id="ayudas"
      className="scroll-mt-28 bg-gromo-hueso px-5 py-16 text-gromo-tinta sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Revelar>
          {/* Sin antetítulo: lo decía tres veces seguidas (el enlace del menú,
              el antetítulo y el título). */}
          <Titulo>{AYUDAS.titulo}</Titulo>
          <Entrada className="text-gromo-gris">{AYUDAS.entrada}</Entrada>
        </Revelar>

        {/* items-center: las notas se alinean con el centro de la calculadora
            en vez de colgar del borde de arriba. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
          <Revelar className="rounded-3xl bg-gromo-tinta p-7 text-gromo-hueso sm:p-10">
            <p className="text-[15px] font-semibold text-gromo-hueso/70">
              ¿Dónde está tu empresa?
            </p>
            <div className="mt-3">
              <SelectorComunidad valor={comunidad} onCambio={setId} />
            </div>

            <dl className="mt-8 grid gap-5">
              <Linea
                etiqueta="Coste del proyecto de ejemplo"
                valor={EUROS.format(AYUDAS.base)}
              />
              <Linea
                etiqueta={`Subvención (${tipica} %)`}
                valor={`− ${EUROS.format(subvencionAnim)}`}
                acento
              />
            </dl>

            <div className="mt-8 border-t border-white/12 pt-8">
              <dt className="text-[15px] font-semibold text-gromo-hueso/70">
                Coste neto para ti
              </dt>
              <dd className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[2.75rem] leading-none font-extrabold tracking-[-0.03em] text-gromo-lima tabular-nums sm:text-[3.5rem]">
                  {EUROS.format(netoAnim)}
                </span>
                <span className="text-sm text-gromo-hueso/60">+ IVA</span>
              </dd>
              {/* El tramo va pegado al número: sin él, el ejemplo se leería
                  como una cifra garantizada, y la concede la administración.
                  Con intensidad fija (min === max) se dice «hasta», que es
                  como se lee una convocatoria de porcentaje único. */}
              <p className="mt-4 text-[14px] leading-relaxed text-gromo-hueso/60">
                {min === max
                  ? `Ejemplo con el ${tipica} % de cobertura. Según la convocatoria y tu perfil, en ${comunidad.nombre} la intensidad prevista llega hasta el ${min} %, así que el neto varía. La concesión la decide la administración.`
                  : `Ejemplo con el ${tipica} % de cobertura. Según la convocatoria y tu perfil, en ${comunidad.nombre} suele moverse entre el ${min} % y el ${max} %, así que el neto varía. La concesión la decide la administración.`}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-gromo-hueso/60">
                {comunidad.programa
                  ? `Convocatoria de referencia: ${comunidad.programa}.`
                  : "Reviso la convocatoria de tu comunidad antes de la reunión."}
              </p>
              {comunidad.nota && (
                <p className="mt-3 text-[14px] leading-relaxed text-gromo-hueso/60">
                  {comunidad.nota}
                </p>
              )}
            </div>
          </Revelar>

          <div>
            <ul className="grid gap-4">
              {AYUDAS.notas.map((n, i) => (
                <Revelar
                  as="li"
                  key={n}
                  retraso={i * 80}
                  className="flex gap-3 text-[15px] leading-relaxed"
                >
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
                </Revelar>
              ))}
            </ul>

            {/* La duda que deja la sección es «¿yo encajo?», y solo se
                responde mirando el caso. El botón lleva al formulario. */}
            <Revelar retraso={320} className="mt-8">
              <Boton href="#contacto" variante="primario">
                Comprueba si encajas en una ayuda
              </Boton>
            </Revelar>
          </div>
        </div>
      </div>
    </section>
  );
}

function Linea({
  etiqueta,
  valor,
  acento = false,
}: {
  etiqueta: string;
  valor: string;
  acento?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/8 pb-4">
      <dt className="text-[15px] text-gromo-hueso/65">{etiqueta}</dt>
      <dd
        className={cn(
          "text-xl font-bold tabular-nums",
          acento ? "text-gromo-verde" : "text-gromo-hueso",
        )}
      >
        {valor}
      </dd>
    </div>
  );
}
