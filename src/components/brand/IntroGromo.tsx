import { GromoSymbol } from "@/components/brand/GromoLogo";
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
  { espera: 80, dur: 100, d: "M 59 63.5 L 43 63.5" },
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

/** La escritura empieza cuando el brote ya está armado (ver globals.css). */
const INICIO = 950;

/** Convierte las esperas relativas en momento absoluto de cada trazo. */
function conTiempos(trazos: typeof TRAZOS_BASE, inicio: number) {
  let momento = inicio;
  return trazos.map((trazo) => {
    momento += trazo.espera;
    const comienzo = momento;
    momento += trazo.dur;
    return { ...trazo, comienzo };
  });
}

const TRAZOS = conTiempos(TRAZOS_BASE, INICIO);

function tiempos(trazo: { comienzo: number; dur: number }): React.CSSProperties {
  return {
    "--retraso": `${trazo.comienzo}ms`,
    "--dur": `${trazo.dur}ms`,
  } as React.CSSProperties;
}

/**
 * Intro de marca: pantalla completa en verde, el brote cae por partes (tallo
 * con rebote, después una hoja y luego la otra) y "Gromo" se escribe a mano.
 *
 * La escritura es una máscara sobre la tipografía real: el texto sigue
 * siendo Inter 800 vivo, y la máscara solo deja ver la parte por la que ya
 * pasó la pluma. Cada trazo se revela con `stroke-dashoffset`.
 *
 * Todo es CSS y SVG: sin estado, sin efectos y sin JavaScript, así que no
 * hay hidratación que pueda fallar y el telón se apaga solo con
 * `visibility: hidden`. Con prefers-reduced-motion no se muestra. Es
 * `aria-hidden`: decoración; el contenido real espera debajo y los lectores
 * de pantalla entran directos, sin esperar a que termine de escribirse.
 */
export function IntroGromo() {
  return (
    <div
      id="gromo-intro"
      aria-hidden="true"
      className="gromo-intro fixed inset-0 z-[100] grid place-items-center bg-gromo-verde"
    >
      <div className="gromo-intro__contenido flex flex-col items-center gap-4 text-white">
        <GromoSymbol
          tone="mono"
          className="gromo-intro__simbolo h-24 w-24 sm:h-32 sm:w-32"
        />
        <svg
          viewBox="0 20 333 84"
          className="gromo-intro__trazo h-10 w-auto sm:h-12"
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
    </div>
  );
}
