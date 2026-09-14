import Link from "next/link";
import { GromoLogo } from "@/components/brand/GromoLogo";
import { MARCA, NAV } from "@/lib/contenido";

const LEGALES = [
  { href: "/aviso-legal", texto: "Aviso legal" },
  { href: "/privacidad", texto: "Privacidad" },
  { href: "/cookies", texto: "Cookies" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white px-5 py-14 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <GromoLogo className="text-gromo-tinta" />
            <p className="mt-4 text-[14px] leading-relaxed text-gromo-gris">
              {MARCA.promesa}. Automatización de procesos con precio cerrado y
              resultado medible. Toda España.
            </p>
          </div>

          <div className="flex gap-14">
            <nav aria-label="Secciones">
              <h2 className="mb-4 text-[14px] font-bold text-gromo-tinta">
                Secciones
              </h2>
              <ul className="grid gap-2.5">
                {NAV.map((i) => (
                  <li key={i.href}>
                    <a
                      href={i.href}
                      className="text-[14px] text-gromo-tinta/75 transition hover:text-gromo-tinta"
                    >
                      {i.texto}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Legal">
              <h2 className="mb-4 text-[14px] font-bold text-gromo-tinta">
                Legal
              </h2>
              <ul className="grid gap-2.5">
                {LEGALES.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-gromo-tinta/75 transition hover:text-gromo-tinta"
                    >
                      {l.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-black/10 pt-6 text-[13px] text-gromo-gris sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {MARCA.nombre}
          </p>
          <a
            href={`mailto:${MARCA.email}`}
            className="transition hover:text-gromo-tinta"
          >
            {MARCA.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
