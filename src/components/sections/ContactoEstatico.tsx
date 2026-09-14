import { Antetitulo, Titulo } from "@/components/ui/seccion";
import { CONTACTO, MARCA } from "@/lib/contenido";

/**
 * Contacto para la exportación estática (GitHub Pages).
 *
 * Sustituye a `Contacto.tsx` solo cuando se compila con EXPORT_ESTATICO=1;
 * lo hace un alias de módulo en next.config.ts, para que el formulario real y
 * su Server Action ni siquiera entren en el paquete. Sin servidor no pueden
 * existir.
 *
 * Los campos se muestran deshabilitados y con un aviso encima que dice qué
 * pasa. Un formulario que parece funcionar y se traga lo que escribes es peor
 * que no tenerlo: el visitante cree que te ha escrito y se queda esperando.
 */
export function Contacto() {
  return (
    <section
      id="contacto"
      className="scroll-mt-28 bg-gromo-tinta px-5 py-20 text-gromo-hueso sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <Antetitulo tono="tinta">{CONTACTO.antetitulo}</Antetitulo>
          <Titulo>{CONTACTO.titulo}</Titulo>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-gromo-hueso/75 sm:text-lg">
            {CONTACTO.entrada}
          </p>

          <ul className="mt-9 grid gap-3.5">
            {CONTACTO.garantias.map((g) => (
              <li key={g} className="flex items-center gap-3 text-[15px]">
                <svg
                  viewBox="0 0 20 20"
                  className="size-4 shrink-0 text-gromo-lima"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                <span className="text-gromo-hueso/80">{g}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="rounded-xl border border-gromo-lima/40 bg-gromo-lima/10 p-4 text-[14px] leading-relaxed text-gromo-hueso/90">
            <strong className="font-bold text-gromo-lima">
              Vista previa.
            </strong>{" "}
            Esta versión está publicada solo para verla; el formulario todavía
            no envía. Para contactar de verdad, escribe a{" "}
            <a
              href={`mailto:${MARCA.email}`}
              className="font-semibold text-gromo-lima underline underline-offset-4"
            >
              {MARCA.email}
            </a>
            .
          </p>

          {/* Maqueta de los campos, deshabilitada y fuera del recorrido de
              teclado: enseña el diseño sin invitar a escribir en balde. */}
          <div className="mt-6 grid gap-5 opacity-45 sm:grid-cols-2" aria-hidden>
            {["Empresa", "Tu nombre", "Email", "Teléfono"].map((c) => (
              <div key={c}>
                <span className="mb-2 block text-[13px] font-semibold text-gromo-hueso/70">
                  {c}
                </span>
                <div className="h-[46px] rounded-xl border border-white/12 bg-white/[0.04]" />
              </div>
            ))}
          </div>
          <div className="mt-5 opacity-45" aria-hidden>
            <span className="mb-2 block text-[13px] font-semibold text-gromo-hueso/70">
              ¿Qué proceso te come las horas?
            </span>
            <div className="h-28 rounded-xl border border-white/12 bg-white/[0.04]" />
          </div>

          <a
            href={`mailto:${MARCA.email}`}
            className="mt-7 flex min-h-11 w-full items-center justify-center rounded-full bg-gromo-lima px-6 py-3.5 text-[15px] font-bold text-gromo-tinta transition hover:brightness-95"
          >
            Escríbeme por correo
          </a>
        </div>
      </div>
    </section>
  );
}
