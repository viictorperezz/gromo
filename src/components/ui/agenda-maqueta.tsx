"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CONTACTO } from "@/lib/contenido";
import { cn } from "@/lib/utils";

/**
 * Selector de día y hora. Va DENTRO del formulario de contacto: lo elegido
 * viaja en dos campos ocultos, así que el hueco llega en el mismo correo que
 * los datos de la empresa y no se queda en un adorno.
 *
 * TODO: cuando exista la cuenta de calendario (Cal.com o equivalente),
 * sustituir esto por el calendario real con los huecos libres de verdad.
 * Configurarlo a nombre de Gromo, sin nombre propio ni foto
 * (HANDOFF-TEXTOS-WEB.md §2.3), y comprobar qué nombre sale en la invitación
 * que recibe el cliente.
 *
 * Forma: los días caben en una fila y la hora va en un desplegable. Con las
 * horas a la vista, catorce huecos ocupaban cuatro filas y empujaban el
 * formulario fuera de pantalla; plegadas, el bloque entero son dos líneas y la
 * lista puede crecer sin que la tarjeta crezca.
 */
export function SelectorCita({ error }: { error?: string }) {
  const [dia, setDia] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);

  const { agenda } = CONTACTO;

  return (
    <div>
      <input type="hidden" name="dia" value={dia ?? ""} />
      <input type="hidden" name="hora" value={hora ?? ""} />

      <fieldset>
        <legend className="text-[13px] font-semibold text-gromo-hueso/70">
          Elige día
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {agenda.dias.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={d === dia}
              onClick={() => {
                setDia(d);
                setHora(null);
              }}
              className={cn(
                "min-h-11 flex-1 rounded-xl border px-3 text-[15px] font-semibold transition-colors sm:min-h-10 sm:flex-none sm:px-4",
                d === dia
                  ? "border-gromo-lima bg-gromo-lima text-gromo-tinta"
                  : "border-white/15 text-gromo-hueso/75 hover:border-white/35 hover:text-gromo-hueso",
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-[13px] font-semibold text-gromo-hueso/70">
          Elige hora
          <span className="font-normal text-gromo-hueso/45">
            {" "}
            ({agenda.duracion})
          </span>
        </span>
        {/* En móvil ocupa su propia línea: si el desplegable arranca a media
            fila, su lista de 256 px se sale de la pantalla por la derecha. */}
        <DesplegableHoras
          horas={agenda.horas}
          valor={hora}
          onCambio={setHora}
          desactivado={!dia}
        />
      </div>

      {error && (
        <span className="mt-2.5 block text-[13px] text-red-300">{error}</span>
      )}
    </div>
  );
}

/**
 * Desplegable propio y no un <select>: la lista de un select la pinta el
 * sistema operativo, así que llegaría en blanco sobre este fondo oscuro.
 */
function DesplegableHoras({
  horas,
  valor,
  onCambio,
  desactivado,
}: {
  horas: readonly string[];
  valor: string | null;
  onCambio: (h: string) => void;
  desactivado: boolean;
}) {
  const [abierto, setAbierto] = useState(false);
  const caja = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) setAbierto(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("pointerdown", fuera);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", fuera);
      document.removeEventListener("keydown", escape);
    };
  }, [abierto]);

  // Sin día no hay lista, aunque haya quedado abierta. Se deriva en vez de
  // apagarla con un efecto: así no se encadena un render de más.
  const visible = abierto && !desactivado;

  return (
    <div ref={caja} className="relative w-full sm:w-auto">
      <button
        type="button"
        disabled={desactivado}
        aria-expanded={visible}
        aria-controls={id}
        onClick={() => setAbierto((a) => !a)}
        className={cn(
          "flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border px-4 text-[15px] font-semibold tabular-nums transition-colors sm:min-h-10 sm:w-auto sm:justify-start",
          desactivado && "cursor-not-allowed opacity-40",
          valor
            ? "border-gromo-lima bg-gromo-lima text-gromo-tinta"
            : "border-white/15 text-gromo-hueso/75 enabled:hover:border-white/35",
        )}
      >
        {valor ?? "Ver horas"}
        <svg
          viewBox="0 0 20 20"
          aria-hidden
          className={cn("size-4 transition-transform", visible && "rotate-180")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {visible && (
        <div
          id={id}
          className="absolute top-[calc(100%+6px)] left-0 z-20 grid max-h-56 w-full grid-cols-3 gap-1.5 overflow-y-auto rounded-xl border border-white/15 bg-gromo-tinta p-2 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] sm:w-64"
        >
          {horas.map((h) => (
            <button
              key={h}
              type="button"
              aria-pressed={h === valor}
              onClick={() => {
                onCambio(h);
                setAbierto(false);
              }}
              className={cn(
                "min-h-10 rounded-lg text-[14px] font-semibold tabular-nums transition-colors",
                h === valor
                  ? "bg-gromo-lima text-gromo-tinta"
                  : "text-gromo-hueso/80 hover:bg-white/10 hover:text-gromo-hueso",
              )}
            >
              {h}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
