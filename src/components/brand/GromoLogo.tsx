import { cn } from "@/lib/utils";

/**
 * Símbolo Brote de Gromo.
 *
 * Geometría medida sobre el original: tallo de puntas redondeadas y dos hojas
 * (cuadrados con dos esquinas opuestas redondeadas a radio completo). La punta
 * afilada de cada hoja apunta hacia fuera; la base se apoya en el tallo.
 *
 * Plano a propósito: sin degradados no hay `id` que colisione cuando se repite
 * en la página, y se lee nítido a 16 px. La versión con degradado vive en
 * `public/brand/gromo-simbolo-degradado.svg` para piezas grandes.
 */

type SymbolTone = "color" | "mono";

interface GromoSymbolProps {
  /** `color` usa la paleta de marca; `mono` hereda `currentColor`. */
  tone?: SymbolTone;
  className?: string;
  style?: React.CSSProperties;
  /** Si el símbolo va acompañado del wordmark, ocúltalo a lectores de pantalla. */
  decorative?: boolean;
}

export function GromoSymbol({
  tone = "color",
  className,
  style,
  decorative = false,
}: GromoSymbolProps) {
  const mono = tone === "mono";
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": "Gromo" } as const);

  return (
    <svg
      viewBox="0 0 96 96"
      className={cn("h-8 w-8 shrink-0", className)}
      style={style}
      fill={mono ? "currentColor" : undefined}
      {...a11y}
    >
      {/* Hoja izquierda — lima */}
      <path
        d="M24 28 A21 21 0 0 1 45 49 A21 21 0 0 1 24 28 Z"
        fill={mono ? undefined : "#A8E063"}
      />
      {/* Hoja derecha — verde */}
      <path
        d="M72 28 A21 21 0 0 0 51 49 A21 21 0 0 0 72 28 Z"
        fill={mono ? undefined : "#35A06A"}
      />
      {/* Tallo */}
      <rect
        x="45"
        y="25"
        width="6"
        height="46"
        rx="3"
        fill={mono ? undefined : "#1F7A4D"}
      />
    </svg>
  );
}

type LogoOrientation = "horizontal" | "vertical";

interface GromoLogoProps {
  orientation?: LogoOrientation;
  tone?: SymbolTone;
  className?: string;
}

/**
 * Lockup completo: símbolo + wordmark.
 *
 * El wordmark es texto real en Inter 800, NO una imagen. Así escala nítido,
 * cambia de color con el tema, lo indexa Google y lo leen los lectores de
 * pantalla. El área de respeto (gap) equivale a la altura de una hoja.
 */
export function GromoLogo({
  orientation = "horizontal",
  tone = "color",
  className,
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
      <span className="text-[1.75rem] leading-none font-extrabold tracking-[-0.02em]">
        Gromo
      </span>
    </span>
  );
}
