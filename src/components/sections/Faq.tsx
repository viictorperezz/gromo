import { Antetitulo, Seccion, Titulo } from "@/components/ui/seccion";
import { FAQ } from "@/lib/contenido";

/**
 * Acordeón con <details>: abre y cierra sin una línea de JavaScript, funciona
 * con teclado por defecto y el buscador lee el contenido aunque esté plegado.
 */
export function Faq() {
  return (
    <Seccion id="faq" tono="hueso">
      <Antetitulo>{FAQ.antetitulo}</Antetitulo>
      <Titulo>{FAQ.titulo}</Titulo>

      <div className="mt-12 max-w-3xl">
        {FAQ.items.map((f) => (
          <details
            key={f.p}
            name="faq"
            className="group border-b border-black/10 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold">
              {f.p}
              <svg
                viewBox="0 0 20 20"
                className="size-5 shrink-0 text-gromo-verde transition-transform duration-200 group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M10 4v12M4 10h12" />
              </svg>
            </summary>
            <p className="pb-6 text-[15px] leading-relaxed text-gromo-gris">
              {f.r}
            </p>
          </details>
        ))}
      </div>
    </Seccion>
  );
}
