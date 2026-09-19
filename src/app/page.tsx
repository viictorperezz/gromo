import { Ayudas } from "@/components/sections/Ayudas";
import { Contacto } from "@/components/sections/Contacto";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Pasos } from "@/components/sections/Pasos";
import { PorQue } from "@/components/sections/PorQue";
import { Problema } from "@/components/sections/Problema";
import { Servicios } from "@/components/sections/Servicios";
import { FAQ, MARCA } from "@/lib/contenido";

/**
 * Datos estructurados para que el buscador entienda qué es esto y pueda mostrar
 * las preguntas frecuentes directamente en resultados.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: MARCA.nombre,
      description: `${MARCA.promesa}. Precio cerrado, resultado medible y el papeleo de la ayuda incluido.`,
      areaServed: { "@type": "Country", name: "España" },
      email: MARCA.email,
      knowsLanguage: ["es"],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.items.map((f) => ({
        "@type": "Question",
        name: f.p,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Nav />
      <main id="contenido">
        <Hero />
        <Problema />
        <Servicios />
        <Pasos />
        <Ayudas />
        <PorQue />
        {/* El formulario va antes que las preguntas: quien ya está convencido
            no tiene que atravesar ocho objeciones para escribir. Las preguntas
            cierran la página para quien todavía duda. */}
        <Contacto />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
