/**
 * Capturas de la página /marca para revisión visual.
 *
 * Usa el Chrome ya instalado en el sistema (canal "chrome"), así que no
 * descarga ningún navegador. Requiere el dev server levantado en :3000.
 *
 *   node scripts/capturar-marca.mjs
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SALIDA = "docs/design-references/marca";

/** Secciones a recortar, con el factor de escala para poder ampliar sin pixelar. */
const OBJETIVOS = [
  { sel: "#png-vs-svg", nombre: "01-png-vs-svg", escala: 3 },
  { sel: "#wordmark", nombre: "02-wordmark", escala: 3 },
  { sel: "#candidatas", nombre: "03-candidatas", escala: 2 },
  { sel: "#tamanos", nombre: "04-tamanos", escala: 4 },
];

async function main() {
  await mkdir(SALIDA, { recursive: true });

  const browser = await chromium.launch({ channel: "chrome" });

  for (const { sel, nombre, escala } of OBJETIVOS) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: escala,
    });
    const page = await context.newPage();
    await page.goto(`${BASE}/marca`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.fonts.ready.then(() => true));

    const el = page.locator(sel);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await el.screenshot({ path: `${SALIDA}/${nombre}.png` });
    console.log(`  ${nombre}.png  (x${escala})`);

    await context.close();
  }

  // Página completa, escala normal, para tener la vista de conjunto
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/marca`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.fonts.ready.then(() => true));
  await page.screenshot({ path: `${SALIDA}/00-pagina-completa.png`, fullPage: true });
  console.log("  00-pagina-completa.png  (x2)");
  await context.close();

  await browser.close();
  console.log(`\nCapturas en ${SALIDA}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
