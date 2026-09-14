import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { GromoLogo } from "@/components/brand/GromoLogo";
import { LEGAL } from "@/lib/contenido";

/** Marca visualmente los datos que faltan hasta el alta como autónomo. */
export function Pendiente({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-gromo-lima/40 px-1.5 py-0.5 font-semibold text-gromo-tinta">
      {children}
    </mark>
  );
}

export function PaginaLegal({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  const faltan = LEGAL.titular === "PENDIENTE";

  return (
    <>
      <header className="border-b border-black/10 bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <Link href="/" aria-label="Gromo, inicio">
            <GromoLogo className="text-gromo-tinta" />
          </Link>
        </div>
      </header>

      <main className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <article className="mx-auto w-full max-w-3xl">
          <h1 className="text-[2rem] font-extrabold tracking-[-0.03em] sm:text-[2.5rem]">
            {titulo}
          </h1>

          {faltan && (
            <div
              role="note"
              className="mt-8 rounded-xl border border-gromo-lima bg-gromo-lima/15 p-5 text-[14px] leading-relaxed"
            >
              <strong className="font-bold">Borrador sin publicar.</strong> Los
              datos identificativos se rellenan el día del alta como autónomo.
              Hasta entonces esta web no debe hacerse pública ni indexarse: la
              LSSI-CE exige identificar al prestador del servicio.
            </div>
          )}

          <div className="mt-10 grid gap-6 text-[15px] leading-relaxed text-gromo-tinta/85 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-gromo-tinta [&_li]:ml-5 [&_li]:list-disc [&_ul]:grid [&_ul]:gap-2">
            {children}
          </div>

          <p className="mt-12 border-t border-black/10 pt-6 text-[13px] text-gromo-gris">
            Última actualización: <Pendiente>{LEGAL.actualizado}</Pendiente>
          </p>
        </article>
      </main>

      <Footer />
    </>
  );
}
