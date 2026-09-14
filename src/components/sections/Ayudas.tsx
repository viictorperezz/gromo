"use client";

import { useEffect, useRef, useState } from "react";
import { Antetitulo, Entrada, Titulo } from "@/components/ui/seccion";
import { Revelar } from "@/components/ui/revelar";
import { AYUDAS } from "@/lib/contenido";
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
  const [cobertura, setCobertura] = useState<number>(AYUDAS.coberturaPorDefecto);

  const devuelven = Math.round((AYUDAS.base * cobertura) / 100);
  const neto = AYUDAS.base - devuelven;

  const devuelvenAnim = useNumero(devuelven);
  const netoAnim = useNumero(neto);

  return (
    <section
      id="ayudas"
      className="scroll-mt-28 bg-gromo-hueso px-5 py-20 text-gromo-tinta sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Revelar>
          <Antetitulo>{AYUDAS.antetitulo}</Antetitulo>
          <Titulo>{AYUDAS.titulo}</Titulo>
          <Entrada className="text-gromo-gris">{AYUDAS.entrada}</Entrada>
        </Revelar>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Revelar className="rounded-3xl bg-gromo-tinta p-7 text-gromo-hueso sm:p-10">
            <fieldset>
              <legend className="text-[15px] font-semibold text-gromo-hueso/60">
                Cobertura de la ayuda en tu comunidad
              </legend>
              <div
                role="radiogroup"
                aria-label="Cobertura de la ayuda"
                className="mt-4 grid grid-cols-4 gap-2 rounded-full bg-white/[0.06] p-1.5"
              >
                {AYUDAS.coberturas.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={c === cobertura}
                    onClick={() => setCobertura(c)}
                    className={cn(
                      "rounded-full py-2.5 text-[15px] font-bold transition-colors duration-300",
                      c === cobertura
                        ? "bg-gromo-lima text-gromo-tinta"
                        : "text-gromo-hueso/60 hover:text-gromo-hueso",
                    )}
                  >
                    {c} %
                  </button>
                ))}
              </div>
            </fieldset>

            <dl className="mt-10 grid gap-5">
              <Linea etiqueta="Precio del proyecto" valor={EUROS.format(AYUDAS.base)} />
              <Linea
                etiqueta="Te devuelve la administración"
                valor={`− ${EUROS.format(devuelvenAnim)}`}
                acento
              />
            </dl>

            <div className="mt-8 border-t border-white/12 pt-8">
              <dt className="text-[15px] font-semibold text-gromo-hueso/60">
                Te cuesta de verdad
              </dt>
              <dd className="mt-2 flex items-baseline gap-3">
                <span className="text-[3rem] leading-none font-extrabold tracking-[-0.03em] text-gromo-lima tabular-nums sm:text-[4rem]">
                  {EUROS.format(netoAnim)}
                </span>
                <span className="text-sm text-gromo-hueso/45">+ IVA</span>
              </dd>
              <p className="mt-4 text-[14px] leading-relaxed text-gromo-hueso/55">
                Por un proyecto de 60 horas con el papeleo incluido. Mueve el
                porcentaje para ver cómo queda según tu convocatoria.
              </p>
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

            <Revelar retraso={320}>
              <p className="mt-8 rounded-2xl border border-gromo-verde/25 bg-white p-6 text-[15px] leading-relaxed text-gromo-gris">
                {AYUDAS.territorio}
              </p>
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
