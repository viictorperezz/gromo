"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Desde = "abajo" | "izquierda" | "derecha";

/**
 * En móvil todo entra desde abajo.
 *
 * Un desplazamiento lateral de 32 px no cabe en 390 px de ancho con 20 px de
 * margen: el elemento asoma por el borde mientras espera a revelarse y provoca
 * scroll horizontal. A partir de `sm` sí hay hueco para absorberlo.
 */
const OCULTO: Record<Desde, string> = {
  abajo: "translate-y-8",
  izquierda: "translate-y-8 sm:translate-y-0 sm:-translate-x-8",
  derecha: "translate-y-8 sm:translate-y-0 sm:translate-x-8",
};

/**
 * Revela su contenido al entrar en pantalla.
 *
 * IntersectionObserver en vez de escuchar el scroll: el navegador avisa solo,
 * sin recalcular en cada píxel. Una vez revelado deja de observar, porque al
 * volver a subir nadie quiere ver la página montarse otra vez.
 *
 * Con prefers-reduced-motion el contenido aparece ya colocado (lo apaga el CSS
 * global), así que nunca queda nada invisible.
 */
export function Revelar({
  children,
  desde = "abajo",
  retraso = 0,
  className,
  as: Etiqueta = "div",
}: {
  children: React.ReactNode;
  desde?: Desde;
  /** Milisegundos de retraso, para escalonar hermanos. */
  retraso?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sin IntersectionObserver no hay forma de saber cuándo entra en pantalla:
    // se deja visible por estilo directo, sin pasar por el estado. El revelado
    // es una mejora, nunca el interruptor que decide si se puede leer la página.
    if (typeof IntersectionObserver === "undefined") {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <Etiqueta
      ref={ref as React.Ref<never>}
      data-revelar=""
      style={{ transitionDelay: `${retraso}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:opacity-100 motion-reduce:transform-none",
        visible ? "translate-x-0 translate-y-0 opacity-100" : cn("opacity-0", OCULTO[desde]),
        className,
      )}
    >
      {children}
    </Etiqueta>
  );
}
