import type { Metadata } from "next";
import Image from "next/image";
import { GromoLogo, GromoSymbol } from "@/components/brand/GromoLogo";

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
  titulo,
  nota,
  children,
}: {
  titulo: string;
  nota?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-7">
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
          titulo="Original (PNG) frente a vector (SVG)"
          nota="Izquierda: el PNG generado, 1254×1254 y ~960 KB. Derecha: el SVG redibujado, menos de 1 KB. Deberían ser indistinguibles; si ves diferencia de forma, dímelo y ajusto la geometría."
        >
          <div className="flex flex-wrap items-center gap-10">
            <figure className="flex flex-col items-center gap-3">
              <Image
                src="/brand/isotipo-claro.png"
                alt="Símbolo original en PNG"
                width={160}
                height={160}
                className="rounded-xl border border-border bg-white"
              />
              <figcaption className="text-[11px] text-muted-foreground">
                PNG original
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center gap-3">
              <div className="rounded-xl border border-border bg-white p-6">
                <GromoSymbol className="h-28 w-28" />
              </div>
              <figcaption className="text-[11px] text-muted-foreground">
                SVG redibujado
              </figcaption>
            </figure>
          </div>
        </Bloque>

        <Bloque
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
