import { GromoSymbol } from "@/components/brand/GromoLogo";
import { Antetitulo, Seccion, Titulo } from "@/components/ui/seccion";
import { PORQUE } from "@/lib/contenido";

export function PorQue() {
  return (
    <Seccion id="por-que" tono="claro">
      <Antetitulo>{PORQUE.antetitulo}</Antetitulo>
      <Titulo>{PORQUE.titulo}</Titulo>

      <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {PORQUE.items.map((i) => (
          <li key={i.titulo}>
            <GromoSymbol decorative className="size-7" />
            <h3 className="mt-4 text-lg font-bold">{i.titulo}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-gromo-gris">
              {i.texto}
            </p>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
