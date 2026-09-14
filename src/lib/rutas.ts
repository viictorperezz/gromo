/**
 * Prefija una ruta de `public/` con el basePath del despliegue.
 *
 * Next.js reescribe solo lo que pasa por `next/image` y `Link`. Una cadena
 * suelta en `src`, `poster` o `url(...)` se queda como está, y en una página
 * de proyecto de GitHub Pages (usuario.github.io/NOMBRE) eso es un 404.
 *
 * El valor se inyecta en tiempo de compilación desde next.config.ts, así que
 * en el despliegue normal queda en cadena vacía y la ruta no cambia.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function rutaPublica(ruta: string): string {
  return `${BASE}${ruta}`;
}
