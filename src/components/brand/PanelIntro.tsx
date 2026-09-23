"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Lo que dura la intro entera, telón incluido (ver globals.css). */
const DURACION = 3360;
const VELOCIDADES = [0.25, 0.5, 1] as const;

function animacionesIntro() {
  const intro = document.getElementById("gromo-intro");
  return intro ? intro.getAnimations({ subtree: true }) : [];
}

/**
 * Mesa de revisión de la intro, solo en desarrollo: repetirla, verla a
 * cámara lenta, pausarla y moverse por la línea de tiempo. Mueve las
 * animaciones CSS reales con la Web Animations API, así que lo que se ve
 * aquí es exactamente lo que verá el visitante.
 */
export function PanelIntro() {
  const [velocidad, setVelocidad] = useState<number>(1);
  const [pausada, setPausada] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const velocidadRef = useRef(velocidad);
  const saltarRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    velocidadRef.current = velocidad;
  }, [velocidad]);

  // El reloj del panel: la animación más larga es la del telón.
  useEffect(() => {
    let id = 0;
    const leer = () => {
      const t = Math.max(0, ...animacionesIntro().map((a) => Number(a.currentTime ?? 0)));
      setTiempo(Math.min(t, DURACION));
      id = requestAnimationFrame(leer);
    };
    id = requestAnimationFrame(leer);
    return () => cancelAnimationFrame(id);
  }, []);

  const repetir = useCallback(() => {
    const intro = document.getElementById("gromo-intro");
    if (!intro) return;
    document.documentElement.classList.remove("gromo-intro-vista");
    intro.classList.remove("gromo-intro--saltada");
    // Tras quitar las clases, getAnimations fuerza el recálculo de estilos y
    // devuelve también las que acaban de nacer; cancel + play las reinicia
    // todas desde cero, con su retraso.
    for (const a of animacionesIntro()) {
      a.cancel();
      a.playbackRate = velocidadRef.current;
      a.play();
    }
    setPausada(false);
    // El script del layout solo escucha el primer toque de la pestaña; aquí
    // se vuelve a poder saltar como la vería un visitante nuevo.
    // Los clics en el propio panel no cuentan, por eso no vale `once`.
    saltarRef.current?.();
    const saltar = (e: PointerEvent) => {
      if (!intro.contains(e.target as Node)) return;
      intro.classList.add("gromo-intro--saltada");
      quitar();
    };
    const quitar = () => document.removeEventListener("pointerdown", saltar);
    document.addEventListener("pointerdown", saltar);
    saltarRef.current = quitar;
  }, []);

  useEffect(() => () => saltarRef.current?.(), []);

  const cambiarVelocidad = (v: number) => {
    setVelocidad(v);
    for (const a of animacionesIntro()) a.playbackRate = v;
  };

  const alternarPausa = () => {
    const anims = animacionesIntro();
    if (pausada) anims.forEach((a) => a.play());
    else anims.forEach((a) => a.pause());
    setPausada(!pausada);
  };

  const irA = (t: number) => {
    const anims = animacionesIntro();
    if (!anims.length) repetir();
    for (const a of animacionesIntro()) {
      a.pause();
      a.currentTime = t;
    }
    setPausada(true);
  };

  return (
    <div className="fixed right-3 bottom-3 z-[120] flex w-[min(360px,calc(100vw-24px))] flex-col gap-2 rounded-xl border border-white/10 bg-black/80 p-3 font-mono text-xs text-white shadow-lg backdrop-blur">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={repetir}
          className="rounded-md bg-gromo-lima px-3 py-1.5 font-semibold whitespace-nowrap text-gromo-tinta"
        >
          ▶ Repetir intro
        </button>
        <button
          type="button"
          onClick={alternarPausa}
          className="rounded-md border border-white/20 px-2.5 py-1.5"
        >
          {pausada ? "Seguir" : "Pausa"}
        </button>
        <div className="ml-auto flex gap-1">
          {VELOCIDADES.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => cambiarVelocidad(v)}
              className={
                v === velocidad
                  ? "rounded-md bg-white px-2 py-1.5 text-black"
                  : "rounded-md border border-white/20 px-2 py-1.5"
              }
            >
              {v}×
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={DURACION}
          step={10}
          value={Math.round(tiempo)}
          onChange={(e) => irA(Number(e.target.value))}
          className="w-full accent-[#A8E063]"
          aria-label="Momento de la intro"
        />
        <span className="w-16 text-right tabular-nums">{(tiempo / 1000).toFixed(2)} s</span>
      </label>
    </div>
  );
}
