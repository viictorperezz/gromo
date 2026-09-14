import { GromoSymbol } from "@/components/brand/GromoLogo";
import { Antetitulo, Titulo } from "@/components/ui/seccion";
import { Revelar } from "@/components/ui/revelar";
import { PORQUE } from "@/lib/contenido";

/**
 * Dos columnas desfasadas: la derecha baja un poco respecto a la izquierda.
 * Ese desnivel evita la cuadrícula perfecta y hace que la vista recorra la
 * sección en zigzag en vez de leerla como una tabla.
 */
export function PorQue() {
  const izquierda = PORQUE.items.filter((_, i) => i % 2 === 0);
  const derecha = PORQUE.items.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="por-que"
      className="scroll-mt-28 bg-white px-5 py-20 text-gromo-tinta sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Revelar>
          <Antetitulo>{PORQUE.antetitulo}</Antetitulo>
          <Titulo>{PORQUE.titulo}</Titulo>
        </Revelar>

        <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
          <ul className="grid gap-12">
            {izquierda.map((i, n) => (
              <Punto key={i.titulo} {...i} retraso={n * 120} />
            ))}
          </ul>
          <ul className="grid gap-12 sm:mt-20">
            {derecha.map((i, n) => (
              <Punto key={i.titulo} {...i} retraso={n * 120 + 60} desde="derecha" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Punto({
  titulo,
  texto,
  retraso,
  desde = "abajo",
}: {
  titulo: string;
  texto: string;
  retraso: number;
  desde?: "abajo" | "derecha";
}) {
  return (
    <Revelar as="li" retraso={retraso} desde={desde} className="group">
      <GromoSymbol
        decorative
        className="size-7 transition-transform duration-500 group-hover:-translate-y-1"
      />
      <h3 className="mt-4 text-lg font-bold">{titulo}</h3>
      <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-gromo-gris">
        {texto}
      </p>
    </Revelar>
  );
}
