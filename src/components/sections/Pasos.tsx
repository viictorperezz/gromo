import { Titulo } from "@/components/ui/seccion";
import { Revelar } from "@/components/ui/revelar";
import { PASOS } from "@/lib/contenido";

export function Pasos() {
  return (
    <section
      id="como"
      className="scroll-mt-28 bg-gromo-tinta px-5 py-16 text-gromo-hueso sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Revelar>
          <Titulo>{PASOS.titulo}</Titulo>
        </Revelar>

        <div className="relative mt-16">
          {/* Hilo que une los cuatro pasos. Solo en escritorio: en móvil las
              tarjetas van apiladas y la línea no diría nada. */}
          <div
            aria-hidden
            className="absolute top-[38px] right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-gromo-verde/40 to-transparent lg:block"
          />

          <ol className="grid gap-6 lg:grid-cols-4 lg:gap-5">
            {PASOS.items.map((p, i) => (
              <Revelar
                as="li"
                key={p.n}
                retraso={i * 130}
                className="group relative flex flex-col"
              >
                {/* Nudo sobre el hilo */}
                <span
                  aria-hidden
                  className="relative z-10 grid size-[76px] place-items-center rounded-full border border-gromo-lima/25 bg-gromo-tinta font-mono text-xl font-extrabold text-gromo-lima transition-colors duration-400 group-hover:border-gromo-lima/70"
                >
                  {p.n}
                </span>

                <div className="mt-6 flex-1 rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-colors duration-400 group-hover:border-white/20 group-hover:bg-white/[0.06]">
                  <span className="text-[13px] font-semibold text-gromo-lima">
                    {p.apunte}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{p.titulo}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-gromo-hueso/70">
                    {p.texto}
                  </p>
                </div>
              </Revelar>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
