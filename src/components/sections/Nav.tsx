"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GromoLogo } from "@/components/brand/GromoLogo";
import { NAV } from "@/lib/contenido";
import { cn } from "@/lib/utils";

export function Nav() {
  const [desplazado, setDesplazado] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const alScrollear = () => setDesplazado(window.scrollY > 24);
    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  // Con el menú móvil abierto, el fondo no debe poder desplazarse.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  // Arriba del todo la barra flota sobre el hero oscuro, así que va en claro.
  // Al desplazarse gana fondo blanco y pasa a tinta.
  const sobreOscuro = !desplazado && !abierto;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        sobreOscuro
          ? "bg-transparent"
          : "border-b border-black/5 bg-white/85 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Gromo, inicio" className="shrink-0">
          <GromoLogo
            className={sobreOscuro ? "text-gromo-hueso" : "text-gromo-tinta"}
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {NAV.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className={cn(
                "text-[15px] font-medium transition",
                sobreOscuro
                  ? "text-gromo-hueso/70 hover:text-gromo-hueso"
                  : "text-gromo-tinta/75 hover:text-gromo-tinta",
              )}
            >
              {i.texto}
            </a>
          ))}
          <a
            href="#contacto"
            className={cn(
              "rounded-full px-5 py-2.5 text-[15px] font-semibold transition",
              sobreOscuro
                ? "bg-gromo-lima text-gromo-tinta hover:brightness-95"
                : "bg-gromo-verde-oscuro text-white hover:bg-gromo-verde",
            )}
          >
            Diagnóstico gratis
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          className={cn(
            "-mr-2 grid size-11 place-items-center rounded-lg lg:hidden",
            sobreOscuro ? "text-gromo-hueso" : "text-gromo-tinta",
          )}
        >
          <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {abierto ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {abierto && (
        <div
          id="menu-movil"
          className="border-t border-black/5 bg-white px-5 pt-2 pb-8 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Principal móvil">
            {NAV.map((i) => (
              <a
                key={i.href}
                href={i.href}
                onClick={() => setAbierto(false)}
                className="border-b border-black/5 py-4 text-lg font-semibold text-gromo-tinta"
              >
                {i.texto}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setAbierto(false)}
              className="mt-6 rounded-full bg-gromo-verde-oscuro px-6 py-3.5 text-center text-[15px] font-semibold text-white"
            >
              Diagnóstico gratis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
