import { BroteAnimado } from "@/components/brand/BroteAnimado";
import { Boton } from "@/components/ui/boton";
import { HERO } from "@/lib/contenido";

/** Entrada escalonada del texto. Sin JS: se reproduce al cargar. */
function entrar(retraso: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `gromo-entrar 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${retraso}ms forwards`,
  };
}

export function Hero() {
  const [antes, despues] = HERO.titulo.split(HERO.destacado);

  return (
    <section className="relative isolate overflow-hidden bg-gromo-tinta text-gromo-hueso">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pt-[124px] pb-20 sm:px-8 sm:pt-36 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-40">
        <div>
          {/* Mismo filete que los antetítulos de sección: es el motivo de
              identidad, no una cápsula decorativa. */}
          <p
            style={entrar(80)}
            className="mb-6 flex items-center gap-3 text-[15px] font-semibold text-gromo-lima"
          >
            <span aria-hidden className="h-[3px] w-7 rounded-full bg-current" />
            {HERO.antetitulo}
          </p>

          <h1
            style={entrar(180)}
            className="text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-[3.25rem]"
          >
            {antes}
            <span className="relative inline-block text-gromo-lima">
              {HERO.destacado}
              {/* Subrayado que se dibuja después del titular */}
              <svg
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-2.5 w-full"
              >
                <path
                  d="M2 7 C50 2 150 2 198 6"
                  fill="none"
                  stroke="#A8E063"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.55"
                  pathLength="1"
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: 1,
                    animation:
                      "gromo-trazar 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.95s forwards",
                  }}
                />
              </svg>
            </span>
            {despues}
          </h1>

          <p
            style={entrar(320)}
            className="mt-7 max-w-xl text-base leading-relaxed text-gromo-hueso/75 sm:text-lg"
          >
            {HERO.entrada}
          </p>

          <div
            style={entrar(440)}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Boton href="#contacto" variante="lima">
              {HERO.ctaPrincipal}
            </Boton>
            <Boton href="#como" variante="secundario" className="text-gromo-hueso">
              {HERO.ctaSecundario}
            </Boton>
          </div>

          <p
            style={entrar(560)}
            className="mt-10 max-w-xl border-l-2 border-gromo-verde pl-4 text-sm leading-relaxed text-gromo-hueso/55"
          >
            {HERO.apunte}
          </p>
        </div>

        <div className="relative -order-1 lg:order-none">
          <BroteAnimado className="mx-auto max-w-[420px] lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
