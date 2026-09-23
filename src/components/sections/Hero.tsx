import { BroteBucle } from "@/components/brand/BroteBucle";
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
          {/* Sin antetítulo a propósito: el que había («Automatización a
              medida para pymes») repetía «a medida», que ya está en el titular.
              La promesa sigue viva en el footer y en los metadatos. */}
          <h1
            style={entrar(80)}
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

          {/* Sin enredadera: competía con el brote de la derecha, que es el
              único motivo de marca del hero. Queda un filete fino en lima. */}
          <div
            style={entrar(560)}
            className="mt-10 max-w-xl border-l-2 border-gromo-lima/35 pl-5"
          >
            {/* La primera línea es el gancho (lo que acaba pagando), así que
                sale del gris del resto: el ojo tiene que caer en el número
                antes de leer de dónde sale. */}
            <div className="grid gap-2 text-sm leading-relaxed text-gromo-hueso/55">
              {HERO.apunte.map((linea, i) => (
                <p
                  key={linea}
                  className={
                    i === 0 ? "text-base font-semibold text-gromo-hueso" : undefined
                  }
                >
                  {linea}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* En escritorio arriba, a la altura del titular: centrado con toda
            la columna de texto caía 200 px por debajo y dejaba vacío encima. */}
        <div className="relative -order-1 lg:order-none lg:self-start">
          <BroteBucle className="mx-auto w-full max-w-[560px] lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
