"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { COMUNIDADES, type Comunidad } from "@/lib/ayudas-mock";
import { cn } from "@/lib/utils";

/**
 * Combobox de comunidad: se escribe para filtrar y se elige de la lista.
 *
 * Por qué no un <select> nativo: la lista desplegable la pinta el sistema
 * operativo, así que no admite ni los colores de marca ni buscar escribiendo.
 * Con veinte comunidades, teclear tres letras es más rápido que recorrer la
 * lista, sobre todo en el móvil.
 *
 * Por qué a mano y no una librería: el patrón combobox de ARIA son cuatro
 * teclas y un aria-activedescendant. Traerse un paquete entero para esto
 * pesaría más que el componente.
 */

/** Sin acentos ni mayúsculas: quien escribe "cataluna" busca Cataluña. */
function normalizar(t: string): string {
  return t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function SelectorComunidad({
  valor,
  onCambio,
}: {
  valor: Comunidad;
  onCambio: (id: string) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const [consulta, setConsulta] = useState("");
  const [activo, setActivo] = useState(0);

  const caja = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const idLista = useId();

  const resultados = useMemo(() => {
    const q = normalizar(consulta.trim());
    if (!q) return COMUNIDADES;
    return COMUNIDADES.filter((c) => normalizar(c.nombre).includes(q));
  }, [consulta]);

  // Clic fuera: cerrar y devolver el texto a la comunidad elegida, para que
  // nunca quede una búsqueda a medias en la caja.
  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) {
        setAbierto(false);
        setConsulta("");
      }
    };
    document.addEventListener("pointerdown", fuera);
    return () => document.removeEventListener("pointerdown", fuera);
  }, [abierto]);

  // La opción activa tiene que verse aunque se llegue con el teclado.
  useEffect(() => {
    if (!abierto) return;
    lista.current
      ?.querySelector('[data-activo="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [abierto, activo]);

  function elegir(c: Comunidad) {
    onCambio(c.id);
    setAbierto(false);
    setConsulta("");
  }

  function teclado(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!abierto) {
        setAbierto(true);
        setActivo(0);
        return;
      }
      const paso = e.key === "ArrowDown" ? 1 : -1;
      setActivo((i) => {
        if (resultados.length === 0) return 0;
        return (i + paso + resultados.length) % resultados.length;
      });
      return;
    }
    if (e.key === "Enter" && abierto) {
      e.preventDefault();
      const elegida = resultados[activo];
      if (elegida) elegir(elegida);
      return;
    }
    if (e.key === "Escape" && abierto) {
      e.preventDefault();
      setAbierto(false);
      setConsulta("");
    }
  }

  return (
    <div ref={caja} className="relative">
      <input
        type="text"
        role="combobox"
        aria-expanded={abierto}
        aria-controls={idLista}
        aria-autocomplete="list"
        aria-activedescendant={
          abierto && resultados[activo] ? `${idLista}-${activo}` : undefined
        }
        value={abierto ? consulta : valor.nombre}
        placeholder={abierto ? "Escribe para buscar…" : undefined}
        onChange={(e) => {
          setConsulta(e.target.value);
          setActivo(0);
          setAbierto(true);
        }}
        onFocus={() => setAbierto(true)}
        onKeyDown={teclado}
        className="min-h-11 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-[15px] font-bold text-gromo-hueso transition-colors placeholder:font-normal placeholder:text-gromo-hueso/40 hover:border-white/30 focus:border-gromo-lima focus:outline-none"
      />

      {/* Punta de flecha: marca que la caja despliega, y gira al abrirse
          para que el estado se vea sin leer nada. */}
      <svg
        viewBox="0 0 20 20"
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-gromo-lima transition-transform duration-200",
          abierto && "rotate-180",
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 8l5 5 5-5" />
      </svg>

      {abierto && (
        <ul
          ref={lista}
          id={idLista}
          role="listbox"
          aria-label="Comunidad autónoma"
          className="absolute top-[calc(100%+6px)] right-0 left-0 z-20 max-h-64 overflow-y-auto rounded-xl border border-white/15 bg-gromo-tinta p-1.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]"
        >
          {resultados.length === 0 && (
            <li className="px-3 py-3 text-[15px] text-gromo-hueso/70">
              Ahí no llego todavía. Escríbeme y lo miramos.
            </li>
          )}

          {resultados.map((c, i) => {
            const elegida = c.id === valor.id;
            return (
              <li
                key={c.id}
                id={`${idLista}-${i}`}
                role="option"
                aria-selected={elegida}
                data-activo={i === activo}
                onPointerEnter={() => setActivo(i)}
                onClick={() => elegir(c)}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 text-[15px] transition-colors",
                  i === activo
                    ? "bg-gromo-lima font-bold text-gromo-tinta"
                    : "text-gromo-hueso/80",
                )}
              >
                {c.nombre}
                {elegida && (
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden
                    className="size-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
