import { Antetitulo, Seccion, Titulo } from "@/components/ui/seccion";
import { PASOS } from "@/lib/contenido";

export function Pasos() {
  return (
    <Seccion id="como" tono="tinta">
      <Antetitulo tono="tinta">{PASOS.antetitulo}</Antetitulo>
      <Titulo>{PASOS.titulo}</Titulo>

      <ol className="mt-14 grid gap-5 lg:grid-cols-4">
        {PASOS.items.map((p) => (
          <li
            key={p.n}
            className="relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span
                aria-hidden
                className="font-mono text-2xl font-extrabold text-gromo-lima"
              >
                {p.n}
              </span>
              <span className="rounded-full bg-gromo-lima/12 px-3 py-1 text-[11px] font-semibold tracking-wide text-gromo-lima uppercase">
                {p.apunte}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold">{p.titulo}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-gromo-hueso/70">
              {p.texto}
            </p>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}
