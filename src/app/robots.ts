import type { MetadataRoute } from "next";
import { LEGAL } from "@/lib/contenido";

/** Necesario para la exportación estática: el fichero no depende de la petición. */
export const dynamic = "force-static";

/**
 * Mientras falten los datos identificativos del aviso legal, la web NO debe
 * indexarse: publicarla sin identificar al prestador incumple la LSSI-CE.
 * En cuanto se rellene LEGAL.titular, esto se abre solo.
 */
const BORRADOR = LEGAL.titular === "PENDIENTE";

export default function robots(): MetadataRoute.Robots {
  if (BORRADOR) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/aviso-legal", "/privacidad", "/cookies"] },
    ],
    sitemap: "https://gromo.es/sitemap.xml",
  };
}
