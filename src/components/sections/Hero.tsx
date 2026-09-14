import { Boton } from "@/components/ui/boton";
import { HERO } from "@/lib/contenido";

/**
 * Hero sobre tinta, con el fondo de marca a la derecha.
 * El titular se parte para poder resaltar una parte en lima sin romper el
 * equilibrio: en móvil el resalte cae en su propia línea.
 */
export function Hero() {
  const [antes, despues] = HERO.titulo.split(HERO.destacado);

  return (
    <section className="relative isolate overflow-hidden bg-gromo-tinta text-gromo-hueso">
      {/* Fondo de marca. Decorativo: no aporta información. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] bg-cover bg-right bg-no-repeat opacity-90 lg:block"
        style={{ backgroundImage: "url(/brand/hero-oscuro.png)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-gromo-tinta via-gromo-tinta/95 to-transparent lg:block"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-[132px] pb-20 sm:px-8 sm:pt-40 sm:pb-28">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gromo-lima/30 px-4 py-1.5 text-[13px] font-semibold tracking-[0.08em] text-gromo-lima uppercase">
          {HERO.antetitulo}
        </p>

        <h1 className="max-w-3xl text-[2.1rem] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance sm:text-[3.5rem]">
          {antes}
          <span className="text-gromo-lima">{HERO.destacado}</span>
          {despues}
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-gromo-hueso/75 sm:text-lg">
          {HERO.entrada}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Boton href="#contacto" variante="lima">
            {HERO.ctaPrincipal}
          </Boton>
          <Boton href="#como" variante="secundario" className="text-gromo-hueso">
            {HERO.ctaSecundario}
          </Boton>
        </div>

        <p className="mt-10 max-w-xl border-l-2 border-gromo-verde pl-4 text-sm leading-relaxed text-gromo-hueso/60">
          {HERO.apunte}
        </p>
      </div>
    </section>
  );
}
