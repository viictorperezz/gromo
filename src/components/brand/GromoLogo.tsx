import { cn } from "@/lib/utils";

/**
 * Símbolo Brote de Gromo.
 *
 * Vectorizado sobre `lockup-vertical-oscuro.png` (1254 px): bordes medidos con
 * cobertura subpíxel y arcos ajustados por mínimos cuadrados. Renderizado en
 * Chrome y restado del PNG coincide en el 98,8 % de los píxeles; lo que queda
 * es el antialiasing del borde. Pasado a la caja de 96 con la misma escala y
 * el mismo aire que tenía la versión anterior, para no mover ningún tamaño.
 *
 * Cada hoja es un cuadrado con dos esquinas vivas (arriba-fuera y abajo-dentro)
 * y dos arcos de cuarto de elipse: el de arriba, más cerrado, mira al tallo; el
 * de abajo, más abierto, mira afuera. El tallo es una cápsula de radio completo.
 *
 * El degradado vive en <GromoGradients />, que se monta UNA vez en el layout
 * raíz. Así cada instancia del símbolo referencia los mismos `id` sin duplicarlos
 * en el documento, y el componente sigue siendo de servidor (cero JS al cliente).
 * Si usas el símbolo fuera de esta app, monta también <GromoGradients />.
 */
export const BROTE = {
  hojaLima:
    "M24 28.79 H30.848 A12.537 12.284 0 0 1 43.385 41.073 V47.581 H39.023 A15.023 14.761 0 0 1 24 32.82 Z",
  hojaVerde:
    "M72 28.79 H65.152 A12.537 12.284 0 0 0 52.615 41.073 V47.581 H56.977 A15.023 14.761 0 0 0 72 32.82 Z",
  tallo: { x: 44.938, y: 25.614, ancho: 6.177, alto: 44.772 },
  /** Colores del PNG original: la paleta de marca, con el tallo algo más
   *  luminoso que la hoja derecha, como en el archivo del fundador. */
  color: { lima: "#A8E063", verde: "#35A06A", tallo: "#35AB72" },
} as const;

type SymbolTone = "original" | "degradado" | "plano" | "mono";

/**
 * Definiciones de degradado compartidas. Va una sola vez, en el layout raíz.
 * No pinta nada por sí misma.
 */
export function GromoGradients() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" className="absolute">
      <defs>
        <linearGradient
          id="gromo-tallo"
          x1="48"
          y1="26"
          x2="48"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1F7A4D" />
          <stop offset="1" stopColor="#35A06A" />
        </linearGradient>
        <linearGradient
          id="gromo-hoja-verde"
          x1="51"
          y1="48"
          x2="72"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2E9763" />
          <stop offset="1" stopColor="#3DAE73" />
        </linearGradient>
        <linearGradient
          id="gromo-hoja-lima"
          x1="45"
          y1="48"
          x2="24"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#9FD855" />
          <stop offset="1" stopColor="#B4E86E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface GromoSymbolProps {
  /**
   * `original` son los colores planos del PNG del fundador (por defecto).
   * `degradado`, la variante con profundidad.
   * `plano` para favicon, tamaños mínimos e impresión a tintas planas.
   * `mono` hereda `currentColor`.
   */
  tone?: SymbolTone;
  className?: string;
  style?: React.CSSProperties;
  /** Si el símbolo va acompañado del wordmark, ocúltalo a lectores de pantalla. */
  decorative?: boolean;
}

export function GromoSymbol({
  tone = "original",
  className,
  style,
  decorative = false,
}: GromoSymbolProps) {
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": "Gromo" } as const);

  const relleno: Record<SymbolTone, { lima: string; verde: string; tallo: string }> =
    {
      original: BROTE.color,
      degradado: {
        lima: "url(#gromo-hoja-lima)",
        verde: "url(#gromo-hoja-verde)",
        tallo: "url(#gromo-tallo)",
      },
      plano: { lima: "#A8E063", verde: "#35A06A", tallo: "#1F7A4D" },
      mono: { lima: "currentColor", verde: "currentColor", tallo: "currentColor" },
    };
  const f = relleno[tone];

  return (
    <svg
      viewBox="0 0 96 96"
      className={cn("h-8 w-8 shrink-0", className)}
      style={style}
      // La intro busca este símbolo en la barra para aterrizar encima.
      data-gromo-simbolo=""
      {...a11y}
    >
      <path d={BROTE.hojaLima} fill={f.lima} />
      <path d={BROTE.hojaVerde} fill={f.verde} />
      <rect
        x={BROTE.tallo.x}
        y={BROTE.tallo.y}
        width={BROTE.tallo.ancho}
        height={BROTE.tallo.alto}
        rx={BROTE.tallo.ancho / 2}
        fill={f.tallo}
      />
    </svg>
  );
}

type LogoOrientation = "horizontal" | "vertical";

interface GromoLogoProps {
  orientation?: LogoOrientation;
  tone?: SymbolTone;
  className?: string;
  /** Clases para el wordmark; sirve para probar tipografías distintas. */
  wordmarkClassName?: string;
}

/**
 * Lockup completo: símbolo + wordmark.
 *
 * El wordmark es texto real, NO una imagen. Así escala nítido, cambia de color
 * con el tema, lo indexa Google y lo leen los lectores de pantalla. El área de
 * respeto (gap) equivale a la altura de una hoja.
 */
export function GromoLogo({
  orientation = "horizontal",
  tone = "degradado",
  className,
  wordmarkClassName,
}: GromoLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        orientation === "horizontal" ? "gap-2.5" : "flex-col gap-1.5",
        className,
      )}
    >
      <GromoSymbol tone={tone} decorative className="h-9 w-9" />
      <span
        className={cn(
          // Inter 800, confirmado por el fundador (es lo que eligió en Canva).
          // La medición sobre el PNG apuntaba a 700, pero el umbral descartaba
          // el borde antialiasado y adelgazaba el trazo medido.
          "text-[1.75rem] leading-none font-extrabold tracking-[-0.02em]",
          wordmarkClassName,
        )}
      >
        Gromo
      </span>
    </span>
  );
}
