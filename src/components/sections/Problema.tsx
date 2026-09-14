import { Antetitulo, Entrada, Seccion, Titulo } from "@/components/ui/seccion";
import { PROBLEMA } from "@/lib/contenido";

export function Problema() {
  return (
    <Seccion id="problema" tono="hueso">
      <Antetitulo>{PROBLEMA.antetitulo}</Antetitulo>
      <Titulo>{PROBLEMA.titulo}</Titulo>
      <Entrada>{PROBLEMA.entrada}</Entrada>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2">
        {PROBLEMA.puntos.map((p) => (
          <li key={p.titulo} className="bg-white p-7 sm:p-9">
            <h3 className="text-lg font-bold">{p.titulo}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gromo-gris">
              {p.texto}
            </p>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
