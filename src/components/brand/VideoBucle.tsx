"use client";

import { useEffect, useRef, useState } from "react";
import { VIDEO } from "@/lib/contenido";
import { rutaPublica } from "@/lib/rutas";
import { cn } from "@/lib/utils";

/**
 * Bucle del hero, con contención.
 *
 * Nota honesta de dial: un vídeo en bucle tensiona el MOTION 2 declarado
 * (nunca bucles perpetuos). Se integra de la forma más contenida posible:
 * solo se reproduce mientras está en pantalla, respeta
 * prefers-reduced-motion (entonces queda el póster hasta que el visitante
 * decida darle al play) y lleva control de pausa, porque un autoplay de más
 * de 5 s sin forma de pararlo incumple WCAG 2.2.2. El vídeo es decorativo
 * (el titular lleva el mensaje), así que va oculto a tecnologías de
 * asistencia.
 */
export function VideoBucle({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  // Pausa manual del visitante: manda sobre el autoplay por intersección.
  const manual = useRef(false);
  // Solo refleja lo que hace el vídeo (eventos), nunca se escribe en efectos.
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      // Sin movimiento permitido o sin observador: no se reproduce solo.
      // El póster queda visible y el play lo decide el visitante.
      return;
    }
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!video) return;
        if (entrada.isIntersecting && !manual.current) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  function alternar() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      manual.current = false;
      video.play().catch(() => {});
    } else {
      manual.current = true;
      video.pause();
    }
  }

  return (
    // Sin tarjeta ni borde. El negro del vídeo está aplastado a cero puro y el
    // screen lo funde, pero el decodificador YUV redondea ±1 nivel y en una
    // pantalla buena ese escalón se intuye. La sombra interior del color exacto
    // de la tinta disuelve el borde en ~14 px: ya no hay arista que detectar.
    <figure className={cn("group relative", className)}>
      <video
        ref={ref}
        className="block aspect-video w-full object-cover mix-blend-screen"
        muted
        loop
        playsInline
        // "auto" a propósito: con preload="metadata" Chrome pide solo un rango
        // y al llamar a play() cancela esa descarga (ERR_ABORTED en consola).
        // El archivo pesa 95 KB: descargarlo entero de entrada es lo correcto.
        preload="auto"
        poster={rutaPublica("/videos/gromo-bucle-poster.jpg")}
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        // Una sola fuente MP4 a propósito: con dos <source> Chrome cancela la
        // primera descarga especulativa y deja un ERR_ABORTED en consola.
        // El H.264 lo reproduce todo (Chrome, Safari, Firefox, Edge); el WebM
        // solo ahorraba 15 KB a cambio de ese aviso.
        src={rutaPublica("/videos/gromo-bucle.mp4")}
      />
      {/* Velo que disuelve el borde: la sombra interior tiene que ir en una
          capa por encima del vídeo (sobre un <video> no pinta, porque el
          fotograma es contenido reemplazado y queda por encima). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_18px_14px_#10231A]"
      />
      <button
        type="button"
        onClick={alternar}
        aria-pressed={pausado}
        aria-label={pausado ? VIDEO.reanudar : VIDEO.pausar}
        // Oculto hasta que se navega con teclado (mismo patrón que "Saltar al
        // contenido"): a la vista no hay ningún símbolo, pero quien lo necesita
        // lo encuentra. Quitarlo del todo rompería WCAG 2.2.2.
        className="sr-only focus:not-sr-only focus:absolute focus:right-3 focus:bottom-3 focus:rounded-full focus:bg-black/55 focus:p-2.5 focus:text-white"
      >
        {pausado ? (
          <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
            <path d="M4 2.5v11l9-5.5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
            <rect x="3" y="2.5" width="3.4" height="11" rx="1" />
            <rect x="9.6" y="2.5" width="3.4" height="11" rx="1" />
          </svg>
        )}
      </button>
    </figure>
  );
}
