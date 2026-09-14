import type { Metadata } from "next";
import Image from "next/image";
import {
  DM_Sans,
  Manrope,
  Montserrat,
  Nunito_Sans,
  Outfit,
  Poppins,
} from "next/font/google";
import { GromoLogo, GromoSymbol } from "@/components/brand/GromoLogo";

/* Candidatas para identificar la tipografía del lockup de Canva.
   Se cargan solo en esta ruta interna, no en la web pública. */
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["600"] });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["800"] });

/* El wordmark del PNG mide 570×135 px (altura de mayúscula = 135).
   A 0,37 queda en ~50 px de mayúscula, que es lo que da un cuerpo de 68 px
   en la mayoría de estas familias. Así se comparan a tamaño parejo. */
const ESCALA = 0.37;
const CUERPO = 68;

const CANDIDATAS = [
  { nombre: "Inter 800", clase: "font-sans font-extrabold", tracking: "-0.02em" },
  { nombre: "Poppins 600", clase: poppins.className, peso: 600 },
  { nombre: "Poppins 700", clase: poppins.className, peso: 700 },
  { nombre: "Montserrat 700", clase: montserrat.className, peso: 700 },
  { nombre: "Manrope 800", clase: manrope.className, peso: 800 },
  { nombre: "DM Sans 700", clase: dmSans.className, peso: 700 },
  { nombre: "Outfit 600", clase: outfit.className, peso: 600 },
  { nombre: "Nunito Sans 800", clase: nunito.className, peso: 800 },
] as const;

export const metadata: Metadata = {
  title: "Gromo — comprobación de marca",
  description: "Página interna para validar el símbolo vectorial y la paleta.",
};

const PALETA = [
  { nombre: "Tinta", hex: "#10231A", uso: "Fondo oscuro, texto sobre claro" },
  { nombre: "Verde Gromo", hex: "#35A06A", uso: "Símbolo, enlaces, botones" },
  { nombre: "Verde oscuro", hex: "#1F7A4D", uso: "Tallo, hover" },
  { nombre: "Lima", hex: "#A8E063", uso: "Acento, highlights" },
  { nombre: "Hueso", hex: "#F6F8F6", uso: "Fondo claro" },
  { nombre: "Gris texto", hex: "#5C6B63", uso: "Texto secundario" },
] as const;

const TAMANOS = [16, 24, 32, 48, 96] as const;

function Bloque({
  id,
  titulo,
  nota,
  children,
}: {
  id?: string;
  titulo: string;
  nota?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rounded-2xl border border-border bg-card p-7">
      <h2 className="text-lg font-bold">{titulo}</h2>
      {nota ? (
        <p className="mt-1 mb-6 max-w-2xl text-[13px] text-muted-foreground">
          {nota}
        </p>
      ) : (
        <div className="mb-6" />
      )}
      {children}
    </section>
  );
}

export default function MarcaPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-8">
      <h1 className="text-3xl font-extrabold tracking-[-0.02em]">
        Comprobación de marca
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Página interna, no forma parte de la web pública. Sirve para validar que
        el símbolo vectorial es fiel al original y que la paleta se comporta en
        claro y en oscuro.
      </p>

      <div className="mt-8 grid gap-7">
        <Bloque
          id="png-vs-svg"
          titulo="Original (PNG) frente a vector (SVG)"
          nota="Izquierda: el PNG generado, 1254×1254 y ~960 KB. Derecha: el SVG redibujado, menos de 1 KB. Deberían ser indistinguibles; si ves diferencia de forma, dímelo y ajusto la geometría."
        >
          <div className="flex flex-wrap items-center gap-10">
            <figure className="flex flex-col items-center gap-3">
              <Image
                src="/brand/isotipo-claro.png"
                alt="Símbolo original en PNG"
                width={200}
                height={200}
                className="rounded-xl border border-border bg-white"
              />
              <figcaption className="text-[11px] text-muted-foreground">
                PNG original
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center gap-3">
              <div className="grid size-[200px] place-items-center rounded-xl border border-border bg-white">
                {/* Mismo tamaño de caja que el PNG: el símbolo ocupa el 50 % de
                    su lienzo en ambos, así que cualquier diferencia que veas
                    aquí es de forma, no de encuadre. */}
                <GromoSymbol className="size-[200px]" />
              </div>
              <figcaption className="text-[11px] text-muted-foreground">
                SVG con degradado
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center gap-3">
              <div className="grid size-[200px] place-items-center rounded-xl border border-border bg-white">
                <GromoSymbol tone="plano" className="size-[200px]" />
              </div>
              <figcaption className="text-[11px] text-muted-foreground">
                SVG plano
              </figcaption>
            </figure>
          </div>
        </Bloque>

        <Bloque
          id="wordmark"
          titulo="El wordmark: tu lockup frente al texto vivo"
          nota="Arriba tu PNG de Canva, con las letras incrustadas. Abajo el mismo lockup renderizado en Inter 700 con tracking −2 %. Medido: tu wordmark tiene una proporción ancho/altura de mayúscula de 4,222 y un grosor de asta de 0,211; Inter 700 desvía un 5,9 % y es la más cercana de trece candidatas. Ya están unificados."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-white p-6">
              <Image
                src="/brand/lockup-vertical-claro.png"
                alt="Lockup vertical de Gromo sobre fondo claro"
                width={220}
                height={220}
              />
              <span className="text-[11px] text-muted-foreground">
                PNG — letras incrustadas
              </span>
              <hr className="w-full border-border" />
              <GromoLogo orientation="vertical" className="text-gromo-tinta" />
              <span className="text-[11px] text-muted-foreground">
                Vivo — Inter 700
              </span>
            </div>

            <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-gromo-tinta p-6">
              <Image
                src="/brand/lockup-vertical-oscuro.png"
                alt="Lockup vertical de Gromo sobre fondo oscuro"
                width={220}
                height={220}
              />
              <span className="text-[11px] text-white/60">
                PNG — letras incrustadas
              </span>
              <hr className="w-full border-white/15" />
              <GromoLogo orientation="vertical" className="text-gromo-hueso" />
              <span className="text-[11px] text-white/60">Vivo — Inter 700</span>
            </div>
          </div>
        </Bloque>

        <Bloque
          id="candidatas"
          titulo="¿Qué tipografía usaste en Canva?"
          nota="Arriba tu wordmark recortado del PNG. Debajo, la misma palabra en las candidatas más probables, todas al mismo cuerpo. Busca la que case: fíjate en la G (¿tiene espolón vertical?), en lo redondas que son las dos o, y en el ancho total de la palabra. Dime el número y unifico la marca con esa."
        >
          {/* Recorte del wordmark dentro del PNG de 1254 px: caja x 342-912,
              y 952-1086. Se escala a ESCALA para que la altura de mayúscula
              (135 px en el original) case con el cuerpo de las candidatas. */}
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-white py-6">
            <div
              role="img"
              aria-label="Wordmark original recortado del lockup de Canva"
              style={{
                width: 570 * ESCALA,
                height: 135 * ESCALA,
                backgroundImage: "url(/brand/lockup-vertical-claro.png)",
                backgroundSize: `${1254 * ESCALA}px ${1254 * ESCALA}px`,
                backgroundPosition: `${-342 * ESCALA}px ${-952 * ESCALA}px`,
                backgroundRepeat: "no-repeat",
              }}
            />
            <span className="text-[11px] text-muted-foreground">
              tu PNG de Canva
            </span>
          </div>

          <ol className="mt-6 grid gap-3">
            {CANDIDATAS.map((c, i) => (
              <li
                key={c.nombre}
                className="flex items-center gap-5 rounded-xl border border-border px-5 py-3"
              >
                <span className="w-6 shrink-0 text-sm font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                <span
                  className={c.clase}
                  style={{
                    fontSize: CUERPO,
                    lineHeight: 1.1,
                    fontWeight: "peso" in c ? c.peso : undefined,
                    letterSpacing: "tracking" in c ? c.tracking : undefined,
                  }}
                >
                  Gromo
                </span>
                <span className="ml-auto text-[11px] text-muted-foreground">
                  {c.nombre}
                </span>
              </li>
            ))}
          </ol>
        </Bloque>

        <Bloque
          id="tamanos"
          titulo="Legibilidad por tamaño"
          nota="El mínimo del handoff es 16 px. A ese tamaño el símbolo tiene que seguir leyéndose como un brote, no como una mancha."
        >
          <div className="flex flex-wrap items-end gap-8">
            {TAMANOS.map((px) => (
              <div key={px} className="flex flex-col items-center gap-2">
                <GromoSymbol style={{ width: px, height: px }} />
                <span className="text-[11px] text-muted-foreground">
                  {px} px
                </span>
              </div>
            ))}
          </div>
        </Bloque>

        <Bloque
          titulo="Lockups — el wordmark es texto, no imagen"
          nota='"Gromo" se renderiza en Inter 800 con tracking −2 %. Por eso escala nítido, cambia de color con el tema, lo indexa Google y lo leen los lectores de pantalla. No hace falta Canva para la web.'
        >
          <div className="flex flex-wrap items-center gap-14">
            <div className="flex flex-col items-center gap-3">
              <GromoLogo />
              <span className="text-[11px] text-muted-foreground">
                horizontal
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <GromoLogo orientation="vertical" />
              <span className="text-[11px] text-muted-foreground">vertical</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <GromoLogo tone="mono" className="text-gromo-tinta" />
              <span className="text-[11px] text-muted-foreground">
                monocromo
              </span>
            </div>
          </div>
        </Bloque>

        <Bloque
          titulo="Sobre tinta"
          nota="En oscuro manda el lima: #35A06A sobre #10231A no alcanza el contraste AA para texto pequeño, así que el verde queda para elementos gráficos y el lima para lo que hay que leer."
        >
          <div className="flex flex-wrap items-center gap-14 rounded-xl bg-gromo-tinta p-10 text-gromo-hueso">
            <GromoLogo />
            <GromoLogo orientation="vertical" />
            <GromoLogo tone="mono" className="text-gromo-lima" />
          </div>
        </Bloque>

        <Bloque titulo="Paleta">
          <div className="flex flex-wrap gap-4">
            {PALETA.map((c) => (
              <div
                key={c.hex}
                className="w-40 overflow-hidden rounded-xl border border-border"
              >
                <div className="h-16" style={{ background: c.hex }} />
                <div className="p-3">
                  <p className="text-[13px] font-semibold">{c.nombre}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {c.hex}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {c.uso}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Bloque>

        <Bloque
          titulo="Fondos disponibles"
          nota="Los cuatro fondos que subiste, ya renombrados. La línea de nodos ascendente es un buen activo: dice crecimiento y datos sin tener que escribir la palabra IA."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["fondo-claro.png", "Fondo claro 16:9"],
              ["fondo-oscuro.png", "Fondo oscuro 16:9"],
              ["hero-oscuro.png", "Hero oscuro 16:9"],
              ["banner-panoramico.png", "Panorámico 2,5:1"],
            ].map(([archivo, etiqueta]) => (
              <figure key={archivo} className="flex flex-col gap-2">
                <Image
                  src={`/brand/${archivo}`}
                  alt={etiqueta}
                  width={800}
                  height={450}
                  className="w-full rounded-xl border border-border"
                />
                <figcaption className="text-[11px] text-muted-foreground">
                  {etiqueta} — <span className="font-mono">{archivo}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Bloque>
      </div>
    </main>
  );
}
