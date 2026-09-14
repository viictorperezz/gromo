"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * El símbolo Brote creciendo, con la línea ascendente dibujándose.
 *
 * Sustituye al PNG del hero: mismo motivo (crecimiento + datos) pero vivo,
 * vectorial y unas cuarenta veces más ligero. La secuencia es deliberada:
 * primero brota el tallo, luego se abren las hojas, después la línea recorre
 * y van cayendo los nodos, porque cuenta lo que hace la marca (de un proceso
 * sale un dato).
 *
 * La profundidad la da el puntero, no una escena 3D. Las tres capas se
 * desplazan a distinta velocidad según dónde esté el ratón, que es el efecto
 * que buscaríamos con WebGL a cambio de 150 KB de librería. Aquí cuesta cero:
 * se escribe en variables CSS y el compositor del navegador hace el resto,
 * sin provocar un solo reflow.
 *
 * Se desactiva en pantallas táctiles (no hay puntero que seguir) y con
 * prefers-reduced-motion.
 */

/** Nodos de la línea, con el momento en que aparece cada uno. */
const NODOS = [
  { cx: 34, cy: 250, r: 7, color: "#A8E063", retraso: 1500 },
  { cx: 150, cy: 214, r: 8, color: "#35A06A", retraso: 1750 },
  { cx: 268, cy: 148, r: 7, color: "#F6F8F6", retraso: 2000 },
  { cx: 372, cy: 64, r: 9, color: "#A8E063", retraso: 2250 },
] as const;

/** Cuánto se mueve cada capa. Lo que está delante se mueve más. */
const PROFUNDIDAD = { fondo: 4, linea: 10, brote: 16 } as const;

export function BroteAnimado({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finoYQuieto =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finoYQuieto) return;

    let pendiente = 0;

    const alMover = (e: PointerEvent) => {
      if (pendiente) return;
      // Una escritura por fotograma: mover el ratón dispara muchos más
      // eventos de los que el navegador puede pintar.
      pendiente = requestAnimationFrame(() => {
        pendiente = 0;
        const caja = el.getBoundingClientRect();
        // -1 a 1 desde el centro de la composición
        const x = (e.clientX - caja.left) / caja.width - 0.5;
        const y = (e.clientY - caja.top) / caja.height - 0.5;
        el.style.setProperty("--px", String(x * 2));
        el.style.setProperty("--py", String(y * 2));
      });
    };

    const alSalir = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };

    window.addEventListener("pointermove", alMover, { passive: true });
    window.addEventListener("pointerleave", alSalir);
    return () => {
      if (pendiente) cancelAnimationFrame(pendiente);
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("pointerleave", alSalir);
    };
  }, []);

  /** Transform de una capa, en unidades del viewBox. */
  const capa = (px: number): React.CSSProperties => ({
    transform: `translate(calc(var(--px, 0) * ${px}px), calc(var(--py, 0) * ${px}px))`,
    transition: "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)",
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 300"
      className={cn("h-auto w-full", className)}
      aria-hidden
      focusable="false"
    >
      {/* Colinas de fondo. Dan profundidad sin robar atención. */}
      <g opacity="0.5" style={capa(PROFUNDIDAD.fondo)}>
        <ellipse cx="150" cy="330" rx="130" ry="95" fill="#1F7A4D" opacity="0.5" />
        <ellipse cx="310" cy="345" rx="110" ry="105" fill="#35A06A" opacity="0.35" />
        <ellipse cx="392" cy="330" rx="70" ry="90" fill="#A8E063" opacity="0.22" />
      </g>

      <g style={capa(PROFUNDIDAD.linea)}>
        {/* pathLength="1" normaliza el trazo: el guion y el desplazamiento
            valen 1 sin importar lo larga que sea la curva. */}
        <path
          d="M34 250 C90 244 110 224 150 214 C205 200 220 176 268 148 C316 120 336 96 372 64"
          fill="none"
          stroke="#35A06A"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "gromo-trazar 1.6s cubic-bezier(0.4, 0, 0.2, 1) 1.15s forwards",
          }}
        />
        {NODOS.map((n) => (
          <circle
            key={n.cx}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={n.color}
            style={{
              opacity: 0,
              transformBox: "fill-box",
              transformOrigin: "center",
              animation: `gromo-nodo 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) ${n.retraso}ms forwards`,
            }}
          />
        ))}
      </g>

      {/* El brote, a escala 3 sobre la geometría de marca de 96×96 */}
      <g style={capa(PROFUNDIDAD.brote)}>
        <g transform="translate(52 30) scale(3)">
          <rect
            x="45"
            y="26"
            width="6"
            height="44"
            rx="3"
            fill="#35A06A"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              animation: "gromo-brotar 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          />
          <path
            d="M24 28 A21 20 0 0 1 45 48 A21 20 0 0 1 24 28 Z"
            fill="#A8E063"
            style={{
              opacity: 0,
              transformBox: "fill-box",
              transformOrigin: "right bottom",
              animation:
                "gromo-hoja 0.7s cubic-bezier(0.34, 1.35, 0.64, 1) 0.65s forwards",
            }}
          />
          <path
            d="M72 28 A21 20 0 0 0 51 48 A21 20 0 0 0 72 28 Z"
            fill="#2E9763"
            style={{
              opacity: 0,
              transformBox: "fill-box",
              transformOrigin: "left bottom",
              animation:
                "gromo-hoja 0.7s cubic-bezier(0.34, 1.35, 0.64, 1) 0.85s forwards",
            }}
          />
        </g>
      </g>
    </svg>
  );
}
