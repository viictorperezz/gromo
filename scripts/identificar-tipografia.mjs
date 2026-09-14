/**
 * Identifica la tipografía del wordmark comparando proporciones medibles
 * en vez de a ojo.
 *
 * Dos discriminantes:
 *   - ancho / altura-de-mayúscula  (cuánto se ensancha la palabra)
 *   - grosor de asta / altura-de-mayúscula  (el peso real)
 *
 * Referencia del PNG de Canva: caja 570×135 px → ratio 4,22; asta ~27-30 px → 0,20-0,22.
 *
 *   node scripts/identificar-tipografia.mjs
 */
import { chromium } from "playwright-core";

const OBJETIVO = { ratio: 570 / 135, asta: 28.5 / 135 };

const FAMILIAS = [
  ["Inter", 600],
  ["Inter", 700],
  ["Inter", 800],
  ["Inter", 900],
  ["Poppins", 600],
  ["Poppins", 700],
  ["Montserrat", 700],
  ["Montserrat", 800],
  ["Manrope", 800],
  ["DM Sans", 700],
  ["Outfit", 600],
  ["Outfit", 700],
  ["Nunito Sans", 800],
];

const PAGINA = `<!doctype html>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900&family=Poppins:wght@600;700&family=Montserrat:wght@700;800&family=Manrope:wght@800&family=DM+Sans:wght@700&family=Outfit:wght@600;700&family=Nunito+Sans:wght@800&display=block" rel="stylesheet">
<canvas id="c" width="1600" height="400"></canvas>`;

async function main() {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage();
  await page.setContent(PAGINA);
  await page.waitForFunction(() => document.fonts.ready.then(() => true));
  await page.waitForTimeout(1500);

  const filas = await page.evaluate(async (familias) => {
    const c = document.getElementById("c");
    const ctx = c.getContext("2d", { willReadFrequently: true });
    const CUERPO = 200;
    const salida = [];

    for (const [familia, peso] of familias) {
      await document.fonts.load(`${peso} ${CUERPO}px "${familia}"`, "Gromo");
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#000";
      ctx.font = `${peso} ${CUERPO}px "${familia}", sans-serif`;
      ctx.textBaseline = "alphabetic";
      ctx.fillText("Gromo", 40, 300);

      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1;
      for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
          if (d[(y * c.width + x) * 4 + 3] > 128) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      const ancho = maxX - minX + 1;
      const alto = maxY - minY + 1; // altura de mayúscula: "Gromo" no tiene descendentes

      // Grosor de asta: rachas horizontales a media altura
      const yMid = Math.round((minY + maxY) / 2);
      const rachas = [];
      let run = 0;
      for (let x = minX; x <= maxX; x++) {
        if (d[(yMid * c.width + x) * 4 + 3] > 128) run++;
        else if (run > 0) { rachas.push(run); run = 0; }
      }
      if (run > 0) rachas.push(run);
      rachas.sort((a, b) => a - b);
      const mediana = rachas.length ? rachas[Math.floor(rachas.length / 2)] : 0;

      salida.push({
        familia, peso,
        ratio: ancho / alto,
        asta: mediana / alto,
      });
    }
    return salida;
  }, FAMILIAS);

  await browser.close();

  const dist = (f) =>
    Math.abs(f.ratio - OBJETIVO.ratio) / OBJETIVO.ratio +
    Math.abs(f.asta - OBJETIVO.asta) / OBJETIVO.asta;

  filas.sort((a, b) => dist(a) - dist(b));

  console.log(`\nObjetivo (PNG de Canva):  ancho/mayuscula ${OBJETIVO.ratio.toFixed(3)}   asta/mayuscula ${OBJETIVO.asta.toFixed(3)}\n`);
  console.log("  familia            ancho/may   asta/may   desvio");
  console.log("  " + "-".repeat(52));
  for (const f of filas) {
    console.log(
      `  ${(f.familia + " " + f.peso).padEnd(18)} ${f.ratio.toFixed(3).padStart(8)} ${f.asta.toFixed(3).padStart(10)} ${(dist(f) * 100).toFixed(1).padStart(8)}%`,
    );
  }
  console.log("");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
