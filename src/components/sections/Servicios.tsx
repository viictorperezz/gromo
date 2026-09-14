import { Antetitulo, Entrada, Seccion, Titulo } from "@/components/ui/seccion";
import { SERVICIOS } from "@/lib/contenido";

export function Servicios() {
  return (
    <Seccion id="que-hago" tono="claro">
      <Antetitulo>{SERVICIOS.antetitulo}</Antetitulo>
      <Titulo>{SERVICIOS.titulo}</Titulo>
      <Entrada>{SERVICIOS.entrada}</Entrada>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICIOS.items.map((s, i) => (
          <li
            key={s.titulo}
            className="group rounded-2xl border border-black/10 p-7 transition hover:border-gromo-verde/40 hover:shadow-[0_8px_30px_-12px_rgba(16,35,26,0.18)]"
          >
            <span
              aria-hidden
              className="font-mono text-[13px] font-semibold text-gromo-verde"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-lg font-bold">{s.titulo}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gromo-gris">
              {s.texto}
            </p>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
