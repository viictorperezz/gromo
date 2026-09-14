"use client";

import { useActionState, useId } from "react";
import { enviarContacto } from "@/app/actions/contacto";
import { ESTADO_INICIAL } from "@/lib/contacto";
import { Antetitulo, Seccion, Titulo } from "@/components/ui/seccion";
import { CONTACTO } from "@/lib/contenido";
import { cn } from "@/lib/utils";

const CAMPO =
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-[15px] text-gromo-hueso placeholder:text-gromo-hueso/35 focus:outline-2 focus:outline-offset-2 focus:outline-gromo-lima";

export function Contacto() {
  const [estado, accion, pendiente] = useActionState(
    enviarContacto,
    ESTADO_INICIAL,
  );
  const id = useId();

  return (
    <Seccion id="contacto" tono="tinta">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <Antetitulo tono="tinta">{CONTACTO.antetitulo}</Antetitulo>
          <Titulo>{CONTACTO.titulo}</Titulo>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-gromo-hueso/75 sm:text-lg">
            {CONTACTO.entrada}
          </p>

          <ul className="mt-9 grid gap-3.5">
            {CONTACTO.garantias.map((g) => (
              <li key={g} className="flex items-center gap-3 text-[15px]">
                <svg
                  viewBox="0 0 20 20"
                  className="size-4 shrink-0 text-gromo-lima"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                <span className="text-gromo-hueso/80">{g}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          action={accion}
          noValidate
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          {/* Trampa antispam: invisible y fuera del recorrido de teclado */}
          <div aria-hidden className="absolute -left-[9999px]">
            <label htmlFor={`${id}-web`}>No rellenar</label>
            <input id={`${id}-web`} name="web" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Campo
              id={`${id}-empresa`}
              nombre="empresa"
              etiqueta="Empresa"
              error={estado.errores.empresa}
              autoComplete="organization"
            />
            <Campo
              id={`${id}-nombre`}
              nombre="nombre"
              etiqueta="Tu nombre"
              error={estado.errores.nombre}
              autoComplete="name"
            />
            <Campo
              id={`${id}-email`}
              nombre="email"
              etiqueta="Email"
              tipo="email"
              error={estado.errores.email}
              autoComplete="email"
            />
            <Campo
              id={`${id}-telefono`}
              nombre="telefono"
              etiqueta="Teléfono"
              opcional
              tipo="tel"
              error={estado.errores.telefono}
              autoComplete="tel"
            />
          </div>

          <div className="mt-5">
            <Etiqueta htmlFor={`${id}-proceso`}>
              ¿Qué proceso te come las horas?
            </Etiqueta>
            <textarea
              id={`${id}-proceso`}
              name="proceso"
              rows={4}
              placeholder="Por ejemplo: preparamos unos 40 presupuestos al mes y cada uno lleva casi una hora entre buscar precios y montar el PDF."
              aria-invalid={Boolean(estado.errores.proceso)}
              className={cn(
                CAMPO,
                "resize-y",
                estado.errores.proceso ? "border-red-400" : "border-white/12",
              )}
            />
            <Error>{estado.errores.proceso}</Error>
          </div>

          <button
            type="submit"
            disabled={pendiente}
            className="mt-7 w-full rounded-full bg-gromo-lima px-6 py-3.5 text-[15px] font-bold text-gromo-tinta transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pendiente ? "Enviando…" : "Pedir el diagnóstico"}
          </button>

          <p aria-live="polite" className="min-h-6">
            {estado.mensaje && (
              <span
                className={cn(
                  "mt-4 block text-[14px] leading-relaxed",
                  estado.ok ? "text-gromo-lima" : "text-red-300",
                )}
              >
                {estado.mensaje}
              </span>
            )}
          </p>

          <p className="mt-4 text-[13px] leading-relaxed text-gromo-hueso/55">
            Al enviar aceptas que trate tus datos para responderte. No los cedo a
            nadie ni te apunto a ninguna lista.
          </p>
        </form>
      </div>
    </Seccion>
  );
}

function Etiqueta({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[13px] font-semibold text-gromo-hueso/70"
    >
      {children}
    </label>
  );
}

function Error({ children }: { children?: string }) {
  if (!children) return null;
  return <span className="mt-1.5 block text-[13px] text-red-300">{children}</span>;
}

function Campo({
  id,
  nombre,
  etiqueta,
  tipo = "text",
  opcional = false,
  error,
  autoComplete,
}: {
  id: string;
  nombre: string;
  etiqueta: string;
  tipo?: string;
  opcional?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <Etiqueta htmlFor={id}>
        {etiqueta}
        {opcional && (
          <span className="font-normal text-gromo-hueso/40"> (opcional)</span>
        )}
      </Etiqueta>
      <input
        id={id}
        name={nombre}
        type={tipo}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(CAMPO, error ? "border-red-400" : "border-white/12")}
      />
      <Error>{error}</Error>
    </div>
  );
}
