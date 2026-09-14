import type { NextConfig } from "next";

/**
 * Dos modos de compilación.
 *
 * Por defecto, servidor: es lo que necesita el formulario de contacto, que usa
 * una Server Action.
 *
 * Con EXPORT_ESTATICO=1 genera HTML suelto para GitHub Pages, que solo sirve
 * archivos. En ese modo el formulario no puede enviar nada (las Server Actions
 * no existen sin servidor), así que la página de contacto se sustituye por una
 * versión que lo dice y ofrece el correo directo. Es para enseñar la web, no
 * para recibir peticiones.
 *
 * BASE_PATH lo rellena el flujo de GitHub Actions con el nombre del repositorio,
 * porque una página de proyecto se sirve en usuario.github.io/NOMBRE y sin ese
 * prefijo no cargarían ni el CSS ni las imágenes.
 */
const estatico = process.env.EXPORT_ESTATICO === "1";
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: estatico ? "export" : "standalone",
  // Lo leen las rutas escritas a mano (vídeo, fondos en línea) a través de
  // src/lib/rutas.ts, porque Next solo reescribe next/image y Link.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  ...(estatico
    ? {
        images: { unoptimized: true },
        // Sustituye el contacto por la versión sin Server Action. Hace falta un
        // alias y no un `if` dentro del componente: con un import normal el
        // módulo de la acción entraría igual en el paquete y la exportación
        // fallaría antes de ejecutar nada.
        turbopack: {
          resolveAlias: {
            "@/components/sections/Contacto":
              "./src/components/sections/ContactoEstatico.tsx",
          },
        },
      }
    : {}),
};

export default nextConfig;
