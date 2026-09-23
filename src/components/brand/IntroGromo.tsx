import { BROTE } from "@/components/brand/GromoLogo";
import { IntroVuelo } from "@/components/brand/IntroVuelo";
import { MARCA } from "@/lib/contenido";

/**
 * Los trazos, en orden de escritura humana: arco de la G y su barra; tallo
 * y brazo de la r; la o de un solo giro; tallo y dos arcos de la m; la o
 * final. La `espera` es la pausa con la pluma en el aire (levantarla para
 * empezar el trazo siguiente), como al escribir de verdad.
 *
 * Las coordenadas salen de medir la Inter 800 real a 100 px en el navegador
 * (avances: G 75,2 · r 42,0 · o 61,9 · m 92,7), así que la máscara cae
 * encima de las letras del texto que hay debajo.
 */
const TRAZOS_BASE: { espera: number; dur: number; d: string }[] = [
  // G — desde la punta del terminal (arriba a la derecha), arco en sentido
  // antihorario y barra
  { espera: 0, dur: 190, d: "M 62 33 C 59 36 55 38 50 39 A 22.5 29.4 0 1 0 60 66" },
  // La barra arranca desde abajo del palo derecho: sin ese tramo, la
  // esquina inferior derecha de la G se quedaba sin destapar (una muesca).
  { espera: 80, dur: 130, d: "M 63 90 L 60 63.5 L 43 63.5" },
  // r — tallo y brazo
  { espera: 50, dur: 130, d: "M 89.2 48 C 88.2 65 88.2 82 89.2 100" },
  { espera: 50, dur: 100, d: "M 89.2 56 C 97.2 47 108.2 45 113.2 54" },
  // o — un giro, de arriba hacia la izquierda
  { espera: 60, dur: 170, d: "M 148.2 52.4 A 17 20.3 0 1 0 148.2 93 A 17 20.3 0 1 0 148.2 52.4" },
  // m — tallo y dos arcos, que a la vez dibujan los tallos central y derecho
  { espera: 20, dur: 120, d: "M 189.4 52.4 C 188.6 66 188.6 80 189.4 93" },
  { espera: 15, dur: 130, d: "M 189.4 58 C 189.4 50 196 47.5 202.4 47.5 C 214.4 47.5 220.9 52 220.9 61 C 220.9 72 220.9 83 220.9 93" },
  { espera: 15, dur: 130, d: "M 220.9 61 C 220.9 52 227.4 47.5 233.9 47.5 C 245.9 47.5 252.4 52 252.4 61 C 252.4 72 252.4 83 252.4 93" },
  // o final
  { espera: 60, dur: 170, d: "M 300.1 52.4 A 17 20.3 0 1 0 300.1 93 A 17 20.3 0 1 0 300.1 52.4" },
];

/** La escritura empieza cuando las hojas ya se han abierto (ver globals.css). */
const INICIO = 1505;
/** La escritura va algo más ágil que en la intro anterior: aquí no es lo único que pasa. */
const RITMO = 0.6;

/** Convierte las esperas relativas en momento absoluto de cada trazo. */
function conTiempos(trazos: typeof TRAZOS_BASE, inicio: number) {
  let momento = inicio;
  return trazos.map((trazo) => {
    momento += trazo.espera * RITMO;
    const comienzo = momento;
    momento += trazo.dur * RITMO;
    return { ...trazo, comienzo, dur: trazo.dur * RITMO };
  });
}

const TRAZOS = conTiempos(TRAZOS_BASE, INICIO);

function tiempos(trazo: { comienzo: number; dur: number }): React.CSSProperties {
  return {
    "--retraso": `${Math.round(trazo.comienzo)}ms`,
    "--dur": `${Math.round(trazo.dur)}ms`,
  } as React.CSSProperties;
}

/**
 * El campo: brotes pequeños que nacen en ola desde el centro hacia los
 * bordes, a lo ancho de toda la pantalla. Pseudoaleatorio con semilla fija:
 * el servidor y el cliente pintan exactamente lo mismo y no hay desajuste de
 * hidratación. Los más pequeños van más apagados: se leen como más lejanos.
 */
function generarCampo() {
  let semilla = 7;
  const azar = () => {
    semilla = (semilla * 16807) % 2147483647;
    return (semilla - 1) / 2147483646;
  };
  const brotes: { x: number; talla: number; retraso: number; opacidad: number; salida: number }[] = [];
  const total = 26;
  for (let i = 0; i < total; i++) {
    const x = 1.5 + (i / (total - 1)) * 97 + (azar() - 0.5) * 2.6;
    // El brote principal ocupa el centro: ahí no nace nada.
    if (Math.abs(x - 50) < 12) continue;
    const lejania = azar();
    const talla = Math.round(40 + (1 - lejania) * 80);
    const distancia = Math.abs(x - 50);
    brotes.push({
      x: Math.round(x * 10) / 10,
      talla,
      retraso: Math.round(770 + distancia * 21 + azar() * 63),
      opacidad: Math.round((0.32 + (1 - lejania) * 0.5) * 100) / 100,
      // Se recogen en orden inverso: primero los de fuera.
      salida: Math.round(2520 + (50 - distancia) * 3),
    });
  }
  return brotes;
}

const CAMPO = generarCampo();

/** Raíces: salen de la semilla hacia abajo y se abren. En unidades de la caja de 96. */
const RAICES = [
  "M48 70.4 C47.6 76 46.2 81 43.4 86",
  "M48 70.4 C48.6 77 50.4 82 54.2 88",
  "M48 71 C47 74.5 44 77 39.6 78.4",
  "M48 71 C49.2 74 52.4 76.2 56.8 77",
];

/** Tallo en dos tramos: hasta el nudo de las hojas y, después, la guía. */
const EJE = BROTE.tallo.x + BROTE.tallo.ancho / 2;
const RADIO = BROTE.tallo.ancho / 2;
const BASE = BROTE.tallo.y + BROTE.tallo.alto - RADIO;
const CIMA = BROTE.tallo.y + RADIO;
const NUDO = 44.3;

function BroteMini({ talla, retraso, opacidad, salida, x }: (typeof CAMPO)[number]) {
  return (
    <svg
      viewBox="0 0 96 96"
      aria-hidden="true"
      focusable="false"
      className="gromo-mini absolute"
      style={
        {
          left: `${x}%`,
          // La talla está pensada para 1440 px de ancho y escala con la
          // pantalla: en móvil, a px fijos, el campo tapaba el brote central.
          "--talla": `max(14px, ${Math.round((talla / 14.4) * 100) / 100}vw)`,
          "--d": `${retraso}ms`,
          "--salida": `${salida}ms`,
          "--o": opacidad,
        } as React.CSSProperties
      }
    >
      <line
        className="gromo-mini__tallo"
        x1={EJE}
        y1={BASE}
        x2={EJE}
        y2={CIMA}
        stroke={BROTE.color.tallo}
        strokeWidth={BROTE.tallo.ancho}
        strokeLinecap="round"
        pathLength={1}
      />
      <path className="gromo-mini__hoja gromo-mini__hoja--lima" d={BROTE.hojaLima} fill={BROTE.color.lima} />
      <path className="gromo-mini__hoja gromo-mini__hoja--verde" d={BROTE.hojaVerde} fill={BROTE.color.verde} />
    </svg>
  );
}

/**
 * Intro de marca: el logo nace como un brote de verdad sobre la tinta de la
 * web. Se traza el suelo, asoma la semilla y echa raíces; el tallo sube con
 * las dos hojas plegadas en la punta, las hojas se abren y la guía sigue
 * creciendo hasta la forma exacta del logo. Mientras, un campo de brotes
 * pequeños nace en ola por todo el ancho. "Gromo" se escribe a mano, el
 * campo se recoge y el símbolo vuela a su sitio en la barra (ver IntroVuelo).
 *
 * El estado final es el símbolo al píxel: los dos tramos de tallo con punta
 * redonda suman la cápsula exacta, y las hojas acaban sin transformación.
 *
 * La coreografía es CSS: sin JavaScript se ve entera y se apaga sola con
 * `visibility: hidden`. El JS solo añade el aterrizaje en la barra; sin él,
 * el símbolo se desvanece con el telón. Con prefers-reduced-motion no se
 * muestra. Es `aria-hidden`: el contenido real espera debajo.
 */
export function IntroGromo() {
  return (
    <div
      id="gromo-intro"
      aria-hidden="true"
      className="gromo-intro fixed inset-0 z-[100] overflow-hidden bg-gromo-tinta"
    >
      <div className="gromo-intro__campo absolute inset-x-0">
        {CAMPO.map((b) => (
          <BroteMini key={b.x} {...b} />
        ))}
      </div>

      <div className="gromo-intro__suelo absolute inset-x-0 h-px" />

      <div className="gromo-intro__ancla absolute left-1/2">
        <div className="gromo-intro__simbolo size-full">
          <svg
            viewBox="0 0 96 96"
            overflow="visible"
            className="gromo-planta size-full"
            aria-hidden="true"
            focusable="false"
          >
            <g className="gromo-planta__raices" fill="none" stroke={BROTE.color.tallo} strokeWidth={0.9} strokeLinecap="round">
              {RAICES.map((d, i) => (
                <path key={d} d={d} pathLength={1} className="gromo-planta__raiz" style={{ "--i": i } as React.CSSProperties} />
              ))}
            </g>
            <ellipse className="gromo-planta__semilla" cx={EJE} cy={BASE + 1.6} rx={4.4} ry={3.2} fill={BROTE.color.lima} />

            <g className="gromo-planta__cuerpo">
              <line
                className="gromo-planta__tallo gromo-planta__tallo--bajo"
                x1={EJE}
                y1={BASE}
                x2={EJE}
                y2={NUDO}
                stroke={BROTE.color.tallo}
                strokeWidth={BROTE.tallo.ancho}
                strokeLinecap="round"
                pathLength={1}
              />
              <line
                className="gromo-planta__tallo gromo-planta__tallo--guia"
                x1={EJE}
                y1={NUDO}
                x2={EJE}
                y2={CIMA}
                stroke={BROTE.color.tallo}
                strokeWidth={BROTE.tallo.ancho}
                strokeLinecap="round"
                pathLength={1}
              />
              {/* Las hojas suben plegadas con la punta del tallo y se abren
                  en el nudo: el grupo viaja, cada hoja gira sobre su base. */}
              <g className="gromo-planta__yema">
                <path className="gromo-planta__hoja gromo-planta__hoja--lima" d={BROTE.hojaLima} fill={BROTE.color.lima} />
                <path className="gromo-planta__hoja gromo-planta__hoja--verde" d={BROTE.hojaVerde} fill={BROTE.color.verde} />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className="gromo-intro__palabra absolute inset-x-0 flex justify-center text-gromo-hueso">
        <svg
          viewBox="0 20 333 84"
          className="gromo-intro__trazo"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <mask
              id="gromo-mascara"
              maskUnits="userSpaceOnUse"
              x="-20"
              y="0"
              width="380"
              height="130"
            >
              {TRAZOS.map((trazo, indice) => (
                <path
                  key={indice}
                  className="gromo-trazo__linea"
                  pathLength={1}
                  d={trazo.d}
                  style={tiempos(trazo)}
                />
              ))}
            </mask>
          </defs>
          <text
            className="gromo-trazo__texto"
            x="0"
            y="100"
            mask="url(#gromo-mascara)"
          >
            {MARCA.nombre}
          </text>
        </svg>
      </div>

      <IntroVuelo />
    </div>
  );
}
