import { cn } from "@/lib/utils";

/**
 * El símbolo Brote creciendo, con la línea ascendente dibujándose.
 *
 * Sustituye al PNG del hero: mismo motivo (crecimiento + datos) pero vivo,
 * vectorial y 40 veces más ligero. La secuencia es deliberada — primero brota
 * el tallo, luego se abren las hojas, después la línea recorre y van cayendo
 * los nodos — porque cuenta lo que hace la marca: de un proceso sale un dato.
 *
 * Todo son animaciones CSS puras: se reproducen al cargar, sin JavaScript, y
 * quedan congeladas si el visitante pide menos movimiento.
 */

/** Nodos de la línea, con el momento en que aparece cada uno. */
const NODOS = [
  { cx: 34, cy: 250, r: 7, color: "#A8E063", retraso: 1500 },
  { cx: 150, cy: 214, r: 8, color: "#35A06A", retraso: 1750 },
  { cx: 268, cy: 148, r: 7, color: "#F6F8F6", retraso: 2000 },
  { cx: 372, cy: 64, r: 9, color: "#A8E063", retraso: 2250 },
] as const;

export function BroteAnimado({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={cn("h-auto w-full", className)}
      aria-hidden
      focusable="false"
    >
      {/* Colinas de fondo. Dan profundidad sin robar atención. */}
      <g opacity="0.5">
        <ellipse cx="150" cy="330" rx="130" ry="95" fill="#1F7A4D" opacity="0.5" />
        <ellipse cx="310" cy="345" rx="110" ry="105" fill="#35A06A" opacity="0.35" />
        <ellipse cx="392" cy="330" rx="70" ry="90" fill="#A8E063" opacity="0.22" />
      </g>

      {/* Línea de datos: pathLength="1" normaliza el trazo, así el guion y el
          desplazamiento valen 1 sin importar lo larga que sea la curva. */}
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

      {/* El brote, a escala 3 sobre la geometría de marca de 96×96 */}
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
    </svg>
  );
}
