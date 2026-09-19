import { cn } from "@/lib/utils";

/**
 * Símbolo Brote de Gromo.
 *
 * Geometría medida sobre el original: tallo de puntas redondeadas y dos hojas
 * (cuadrados con dos esquinas opuestas redondeadas a radio completo). La punta
 * afilada de cada hoja apunta hacia fuera; la base se apoya en el tallo.
 *
 * El degradado vive en <GromoGradients />, que se monta UNA vez en el layout
 * raíz. Así cada instancia del símbolo referencia los mismos `id` sin duplicarlos
 * en el documento, y el componente sigue siendo de servidor (cero JS al cliente).
 * Si usas el símbolo fuera de esta app, monta también <GromoGradients />.
 */

type SymbolTone = "degradado" | "plano" | "mono";

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
   * `degradado` reproduce el original (por defecto).
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
  tone = "degradado",
  className,
  style,
  decorative = false,
}: GromoSymbolProps) {
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": "Gromo" } as const);

  const relleno: Record<SymbolTone, { lima: string; verde: string; tallo: string }> =
    {
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
      {...a11y}
    >
      {/* Hoja izquierda — lima. Arco elíptico: el original es algo más ancho
          que alto (262×252 px sobre lienzo de 1254), no cuadrado. Las clases
          `gromo-parte` las usa la intro para animar el brote por partes. */}
      <path
        d="M24 28 A21 20 0 0 1 45 48 A21 20 0 0 1 24 28 Z"
        fill={f.lima}
        className="gromo-parte gromo-parte--lima"
      />
      {/* Hoja derecha — verde */}
      <path
        d="M72 28 A21 20 0 0 0 51 48 A21 20 0 0 0 72 28 Z"
        fill={f.verde}
        className="gromo-parte gromo-parte--verde"
      />
      {/* Tallo */}
      <rect
        x="45"
        y="26"
        width="6"
        height="44"
        rx="3"
        fill={f.tallo}
        className="gromo-parte gromo-parte--tallo"
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
