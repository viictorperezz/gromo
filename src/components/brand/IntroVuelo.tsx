"use client";

import { useEffect } from "react";

/**
 * Calcula a dónde vuela el símbolo de la intro al terminar: encima del
 * símbolo de la barra, al mismo tamaño, para que el relevo no se note.
 *
 * Solo escribe variables CSS; la animación la lleva globals.css. Sin
 * JavaScript las variables no existen y el símbolo se desvanece con el
 * telón, así que la intro nunca depende de esto para terminar.
 */
export function IntroVuelo() {
  useEffect(() => {
    const intro = document.getElementById("gromo-intro");
    if (!intro) return;

    const medir = () => {
      const destino = document.querySelector("header [data-gromo-simbolo]");
      // El ancla no se anima nunca (el vuelo va en su hijo), así que su caja
      // es la de partida aunque se mida con la intro ya terminada.
      const origen = intro.querySelector(".gromo-intro__ancla");
      if (!destino || !origen) return;
      const a = origen.getBoundingClientRect();
      const b = destino.getBoundingClientRect();
      if (!a.width || !b.width) return;
      intro.style.setProperty("--volar-x", `${b.left + b.width / 2 - (a.left + a.width / 2)}px`);
      intro.style.setProperty("--volar-y", `${b.top + b.height / 2 - (a.top + a.height / 2)}px`);
      intro.style.setProperty("--volar-s", `${b.width / a.width}`);
      intro.style.setProperty("--volar-o", "1");
    };

    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  return null;
}
