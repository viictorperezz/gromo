import { cn } from "@/lib/utils";

/**
 * Primitivas de maquetación. Fijan el ritmo vertical y el ancho de línea de
 * toda la página para que las secciones no se inventen cada una lo suyo.
 */

export function Seccion({
  id,
  tono = "claro",
  className,
  children,
}: {
  id?: string;
  tono?: "claro" | "hueso" | "tinta";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28",
        tono === "claro" && "bg-white text-gromo-tinta",
        tono === "hueso" && "bg-gromo-hueso text-gromo-tinta",
        tono === "tinta" && "bg-gromo-tinta text-gromo-hueso",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/**
 * Antetítulo de sección.
 *
 * Caja baja y tracking normal a propósito: la etiqueta en mayúsculas con
 * letra muy espaciada ("EL PROBLEMA", "LAS AYUDAS") es el atajo tipográfico
 * más reconocible de una página generada, y no aporta nada que el tamaño y
 * el color no hagan ya.
 *
 * El motivo de identidad es el filete corto que la precede: es el tallo del
 * brote, tumbado, y se repite en todas las secciones.
 */
export function Antetitulo({
  children,
  tono = "claro",
}: {
  children: React.ReactNode;
  tono?: "claro" | "tinta";
}) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-3 text-[15px] font-semibold",
        tono === "tinta" ? "text-gromo-lima" : "text-gromo-verde-oscuro",
      )}
    >
      <span aria-hidden className="h-[3px] w-7 rounded-full bg-current" />
      {children}
    </p>
  );
}

export function Titulo({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "max-w-3xl text-[1.75rem] leading-[1.15] font-extrabold tracking-[-0.025em] text-balance sm:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Entrada({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-5 max-w-2xl text-base opacity-80 sm:text-lg", className)}>
      {children}
    </p>
  );
}
