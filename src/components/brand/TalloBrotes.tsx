import { cn } from "@/lib/utils";

/**
 * Enredadera: filete vertical orgánico para acompañar un bloque de texto
 * (sustituye a un `border-l`).
 *
 * NO reproduce la geometría del logo, y es a propósito. El símbolo es macizo:
 * hojas de arco elíptico que a 18-20 px de ancho se deshacen en manchas y, con
 * el brote grande del vídeo al lado, competían con él. Aquí la pieza es de
 * TRAZO, que es lo que aguanta el tamaño pequeño, y solo tiene que sugerir
 * "algo que crece", no repetir la marca.
 *
 * El degradado va en `objectBoundingBox` (el modo por defecto) para que escale
 * con la pieza; el de <GromoGradients /> no sirve aquí porque está en
 * `userSpaceOnUse` sobre el lienzo de 96×96 del símbolo.
 *
 * Escalado: `preserveAspectRatio` por defecto ("meet"), así que entra entera y
 * sin deformarse en la caja que le des, sea cual sea la altura del párrafo.
 */
export function TalloBrotes({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 200"
      className={cn("shrink-0", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="gromo-enredadera" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A8E063" />
          <stop offset="0.35" stopColor="#35A06A" />
          <stop offset="1" stopColor="#1F7A4D" />
        </linearGradient>
      </defs>

      {/* El tallo: una sola curva continua que serpentea. Trazo redondeado y
          sin relleno — es lo que mantiene la pieza legible en miniatura. */}
      <path
        d="M12 198 C 4 172 20 152 12 126 C 4 100 20 80 12 54 C 7 36 14 26 12 14"
        fill="none"
        stroke="url(#gromo-enredadera)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Zarcillo: el rizo del extremo, lo que hace que se lea como
          enredadera y no como un palo torcido. */}
      <path
        d="M12 14 C 12 8 16 5 19 7 C 21 8.5 20 12 17 11.5"
        fill="none"
        stroke="#A8E063"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Hojas: elipses inclinadas, alternando lado. Una forma simple a
          propósito: a este tamaño cualquier silueta con punta se ensucia. */}
      <ellipse cx="5" cy="168" rx="5" ry="2.8" transform="rotate(-32 5 168)" fill="#35A06A" />
      <ellipse cx="19" cy="146" rx="5" ry="2.8" transform="rotate(32 19 146)" fill="#A8E063" />
      <ellipse cx="5" cy="96" rx="4.7" ry="2.6" transform="rotate(-32 5 96)" fill="#A8E063" />
      <ellipse cx="19" cy="74" rx="4.7" ry="2.6" transform="rotate(32 19 74)" fill="#35A06A" />
      <ellipse cx="5.5" cy="40" rx="4.2" ry="2.3" transform="rotate(-32 5.5 40)" fill="#A8E063" />
    </svg>
  );
}
