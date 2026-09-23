"use client";

import { useEffect, useRef, useState } from "react";
import { BROTE } from "@/components/brand/GromoLogo";
import { VIDEO } from "@/lib/contenido";
import { cn } from "@/lib/utils";

/**
 * El bucle del hero, dibujado en código en vez de en vídeo.
 *
 * Recrea el guion del vídeo anterior sobre el símbolo vectorizado: el logo
 * quieto; pistas de circuito que suben por dentro del tallo con chispas de
 * luz; las hojas ganan volumen y abren su nervio; un brillo las recorre; y
 * vuelven a la tinta plana del logo, así que el bucle no tiene corte.
 *
 * El tallo NO se dobla, a diferencia del vídeo: decisión del fundador, el
 * tallo del logo es recto y se queda recto.
 *
 * Todo sale de una función `pintar(t)`: el fotograma depende solo del tiempo,
 * y va con requestAnimationFrame para poder pausarlo y congelarlo.
 *
 * Contención, igual que el vídeo: solo se mueve en pantalla, se pausa con el
 * botón oculto hasta el teclado (WCAG 2.2.2) y con prefers-reduced-motion
 * queda quieto en el logo hasta que el visitante decida darle al play.
 */

const CICLO = 10000;

/** Tramos del guion, en ms dentro del ciclo. */
const T = {
  circuitoEntra: [1100, 2300],
  chispas: [1700, 3500],
  circuitoSale: [3200, 3800],
  volumenEntra: [3800, 4900],
  nervioAbre: [4400, 5300],
  brillo: [5500, 7000],
  nervioCierra: [7500, 8100],
  volumenSale: [7900, 9000],
} as const;

const EJE = BROTE.tallo.x + BROTE.tallo.ancho / 2;
const RADIO = BROTE.tallo.ancho / 2;
const BASE = BROTE.tallo.y + BROTE.tallo.alto - RADIO;
const CIMA = BROTE.tallo.y + RADIO;

/** El tallo del logo, recto: una línea con punta redonda suma la cápsula exacta. */
const TALLO = `M${EJE} ${BASE} V${CIMA}`;

/** Nervios: cuñas del color del fondo que se abren desde la base de cada hoja. */
// El de la lima acaba dentro de la hoja, redondeado, sin tocar el borde que
// mira al tallo.
const NERVIO_LIMA = { d: "M29.4 34.1 L41.7 41.9 Q42.7 42.9 41.8 43.9 Z", base: [42, 42.9] };
// La cuña de la verde se come la esquina entera: si su borde pasa por dentro
// de la esquina, queda un triangulito de hoja suelto.
const NERVIO_VERDE = { d: "M66.9 33.9 L51.6 44.2 L51.2 48.6 Z", base: [51.6, 46.4] };

/** Pistas de circuito dentro del tallo: tramos rectos con quiebros a 45°. */
const PISTAS = [
  { d: "M46.6 70 V58 L47.8 56.8 V44 L46.7 42.9 V31", fin: [46.7, 31] },
  { d: "M49.4 70 V62 L48.4 61 V50 L49.6 48.8 V35", fin: [49.6, 35] },
  { d: "M47.3 70 V64.5 L46.3 63.5 V52 L47.1 51.2 V39", fin: [47.1, 39] },
  { d: "M50.3 70 V54.5 L49.3 53.5 V29.5", fin: [49.3, 29.5] },
];

const suave = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const enOut = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
/** Progreso 0..1 de `t` dentro del tramo [a, b]. */
const tramo = (t: number, [a, b]: readonly [number, number]) => Math.min(Math.max((t - a) / (b - a), 0), 1);

function escalarDesde([x, y]: number[], s: number) {
  return `translate(${x} ${y}) scale(${s.toFixed(4)}) translate(${-x} ${-y})`;
}

export function BroteBucle({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  // Parte quieto: arranca cuando el observador lo ve en pantalla. Con
  // movimiento reducido no arranca nunca solo, y el botón ya dice "reanudar".
  const [pausado, setPausado] = useState(true);
  const manual = useRef(false);
  const reloj = useRef({ t: 0, ultimo: 0, corriendo: false, raf: 0 });
  const controles = useRef<{ arrancar: () => void; parar: () => void } | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const $ = <E extends SVGElement>(sel: string) => svg.querySelector<E>(sel)!;
    const volumen = Array.from(svg.querySelectorAll<SVGElement>("[data-volumen]"));
    const nervioLima = $<SVGPathElement>("[data-nervio-lima]");
    const nervioVerde = $<SVGPathElement>("[data-nervio-verde]");
    const circuito = $<SVGGElement>("[data-circuito]");
    const pistas = Array.from(svg.querySelectorAll<SVGPathElement>("[data-pista]"));
    const chispas = Array.from(svg.querySelectorAll<SVGPathElement>("[data-chispa]"));
    const nodos = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-nodo]"));
    const brillos = Array.from(svg.querySelectorAll<SVGRectElement>("[data-brillo]"));

    const pintar = (t: number) => {
      // Volumen: los degradados de tallo y hojas entran y salen
      const v = (suave(tramo(t, T.volumenEntra)) * (1 - suave(tramo(t, T.volumenSale)))).toFixed(3);
      for (const capa of volumen) capa.style.opacity = v;

      // Nervios
      const nervio = enOut(tramo(t, T.nervioAbre)) * (1 - suave(tramo(t, T.nervioCierra)));
      nervioLima.setAttribute("transform", escalarDesde(NERVIO_LIMA.base, nervio));
      nervioVerde.setAttribute("transform", escalarDesde(NERVIO_VERDE.base, nervio));

      // Circuito: cada pista se traza de abajo arriba, escalonada
      const salida = 1 - tramo(t, T.circuitoSale);
      circuito.style.opacity = String(salida);
      pistas.forEach((p, i) => {
        const a = T.circuitoEntra[0] + i * 140;
        const avance = enOut(tramo(t, [a, a + 900]));
        p.style.strokeDashoffset = String(1 - avance);
        nodos[i].style.opacity = String(avance > 0.98 ? 1 : 0);
        // La chispa recorre la pista ya trazada, de abajo arriba
        const c = T.chispas[0] + i * 260;
        const viaje = tramo(t, [c, c + 1100]);
        chispas[i].style.strokeDashoffset = String(0.1 - viaje * 1.1);
        chispas[i].style.opacity = String(viaje > 0 && viaje < 1 ? 1 : 0);
      });

      // Brillo: una banda de luz cruza las hojas en diagonal
      const b = tramo(t, T.brillo);
      for (const brillo of brillos) {
        brillo.setAttribute("transform", `translate(${(-40 + b * 130).toFixed(2)} 0) rotate(24 48 48)`);
        brillo.style.opacity = String(b > 0 && b < 1 ? 1 : 0);
      }
    };

    // Gancho de revisión: congela el bucle en un instante (lo usan los
    // scripts de captura; no tiene interfaz).
    const irA = (e: Event) => {
      const r = reloj.current;
      r.corriendo = false;
      cancelAnimationFrame(r.raf);
      r.t = (e as CustomEvent<number>).detail;
      pintar(r.t);
    };
    svg.addEventListener("gromo-ir", irA);

    const bucle = (ahora: number) => {
      const r = reloj.current;
      if (!r.corriendo) return;
      r.t = (r.t + (r.ultimo ? ahora - r.ultimo : 0)) % CICLO;
      r.ultimo = ahora;
      pintar(r.t);
      r.raf = requestAnimationFrame(bucle);
    };
    const arrancar = () => {
      const r = reloj.current;
      if (r.corriendo) return;
      r.corriendo = true;
      r.ultimo = 0;
      r.raf = requestAnimationFrame(bucle);
      setPausado(false);
    };
    const parar = () => {
      const r = reloj.current;
      r.corriendo = false;
      cancelAnimationFrame(r.raf);
      setPausado(true);
    };
    controles.current = { arrancar, parar };

    pintar(0);
    const quieto =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined";
    if (quieto) {
      // Sin movimiento permitido: queda el logo; el play lo decide el visitante.
      manual.current = true;
      return () => svg.removeEventListener("gromo-ir", irA);
    }
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting && !manual.current) arrancar();
        else if (!entrada.isIntersecting) parar();
      },
      { threshold: 0.25 },
    );
    io.observe(svg);
    return () => {
      io.disconnect();
      parar();
      svg.removeEventListener("gromo-ir", irA);
    };
  }, []);

  function alternar() {
    if (reloj.current.corriendo) {
      manual.current = true;
      controles.current?.parar();
    } else {
      manual.current = false;
      controles.current?.arrancar();
    }
  }

  return (
    <figure className={cn("group relative aspect-video", className)}>
      <svg
        ref={svgRef}
        // Encuadre ajustado: el brote ocupa ~75 % del alto (antes ~60 %, se
        // veía pequeño en su columna). El margen deja sitio al brillo.
        viewBox="-5 18.1 106 59.7"
        className="block size-full"
        aria-hidden="true"
        focusable="false"
        data-brote-bucle=""
      >
        <defs>
          <mask id="bucle-nervio-lima" maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="96">
            <rect width="96" height="96" fill="#fff" />
            <path data-nervio-lima="" d={NERVIO_LIMA.d} fill="#000" />
          </mask>
          <mask id="bucle-nervio-verde" maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="96">
            <rect width="96" height="96" fill="#fff" />
            <path data-nervio-verde="" d={NERVIO_VERDE.d} fill="#000" />
          </mask>
          <clipPath id="bucle-caja-tallo">
            <rect
              x={BROTE.tallo.x}
              y={BROTE.tallo.y}
              width={BROTE.tallo.ancho}
              height={BROTE.tallo.alto}
              rx={RADIO}
            />
          </clipPath>
          <clipPath id="bucle-hoja-lima">
            <path d={BROTE.hojaLima} />
          </clipPath>
          <clipPath id="bucle-hoja-verde">
            <path d={BROTE.hojaVerde} />
          </clipPath>
          {/* Volumen del brote orgánico, como en el vídeo: el tallo oscurece
              hacia la tierra y cada hoja hacia su base. */}
          <linearGradient id="bucle-tallo" gradientUnits="userSpaceOnUse" x1="0" y1={BASE + RADIO} x2="0" y2="44">
            <stop offset="0" stopColor={BROTE.color.verde} />
            <stop offset="0.25" stopColor="#1F7A4D" />
            <stop offset="1" stopColor={BROTE.color.tallo} />
          </linearGradient>
          <linearGradient id="bucle-sombra-lima" gradientUnits="userSpaceOnUse" x1="26" y1="30" x2="43.4" y2="47.6">
            <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
            <stop offset="0.45" stopColor="#10231A" stopOpacity="0" />
            <stop offset="1" stopColor="#10231A" stopOpacity="0.34" />
          </linearGradient>
          <linearGradient id="bucle-sombra-verde" gradientUnits="userSpaceOnUse" x1="70" y1="30" x2="52.6" y2="47.6">
            <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
            <stop offset="0.45" stopColor="#10231A" stopOpacity="0" />
            <stop offset="1" stopColor="#10231A" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="bucle-luz" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.38" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* El nervio de la hoja lima también corta el tallo que entra en
            ella: por eso comparten máscara. */}
        <g mask="url(#bucle-nervio-lima)">
          <path
            d={TALLO}
            fill="none"
            stroke={BROTE.color.tallo}
            strokeWidth={BROTE.tallo.ancho}
            strokeLinecap="round"
          />
          <path
            d={TALLO}
            data-volumen=""
            fill="none"
            stroke="url(#bucle-tallo)"
            strokeWidth={BROTE.tallo.ancho}
            strokeLinecap="round"
            opacity={0}
          />
          <g data-circuito="" clipPath="url(#bucle-caja-tallo)">
            {PISTAS.map(({ d, fin }) => (
              <g key={d}>
                <path
                  data-pista=""
                  d={d}
                  pathLength={1}
                  fill="none"
                  stroke={BROTE.color.lima}
                  strokeOpacity={0.85}
                  strokeWidth={0.3}
                  strokeLinejoin="round"
                  strokeDasharray="1 1"
                  strokeDashoffset={1}
                />
                <path
                  data-chispa=""
                  d={d}
                  pathLength={1}
                  fill="none"
                  stroke="#EFFFD6"
                  strokeWidth={0.7}
                  strokeLinecap="round"
                  strokeDasharray="0.1 2"
                  opacity={0}
                />
                <circle
                  data-nodo=""
                  cx={fin[0]}
                  cy={fin[1]}
                  r={0.55}
                  fill={BROTE.color.lima}
                  opacity={0}
                />
              </g>
            ))}
          </g>
          <path d={BROTE.hojaLima} fill={BROTE.color.lima} />
          <path data-volumen="" d={BROTE.hojaLima} fill="url(#bucle-sombra-lima)" opacity={0} />
          {/* El brillo va dentro de cada máscara: por fuera pintaba de gris
              el hueco del nervio. */}
          <g clipPath="url(#bucle-hoja-lima)">
            <rect data-brillo="" x="-10" y="0" width="22" height="96" fill="url(#bucle-luz)" opacity={0} />
          </g>
        </g>
        <g mask="url(#bucle-nervio-verde)">
          <path d={BROTE.hojaVerde} fill={BROTE.color.verde} />
          <path data-volumen="" d={BROTE.hojaVerde} fill="url(#bucle-sombra-verde)" opacity={0} />
          <g clipPath="url(#bucle-hoja-verde)">
            <rect data-brillo="" x="-10" y="0" width="22" height="96" fill="url(#bucle-luz)" opacity={0} />
          </g>
        </g>
      </svg>

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
