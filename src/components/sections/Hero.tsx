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
          <p
            style={entrar(80)}
            className="mb-4 text-[15px] font-bold text-gromo-lima"
          >
            {HERO.antetitulo}
          </p>

          <h1
            style={entrar(180)}
            className="text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-[3.25rem]"
          >
            {antes}
            {/* El color ya destaca las palabras. Un subrayado encima seria
                decoracion repetida, y ademas chocaba con la linea siguiente. */}
            <span className="text-gromo-lima">{HERO.destacado}</span>
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
