import type { MetadataRoute } from "next";

/** Necesario para la exportación estática: el fichero no depende de la petición. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gromo.es",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
