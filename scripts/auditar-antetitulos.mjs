/**
 * Localiza cada aparición del filete que precede a los antetítulos y recorta
 * una captura de cada una, para poder juzgar el motivo en conjunto y no de uno
 * en uno.
 *
 *   node scripts/auditar-antetitulos.mjs
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SALIDA = "docs/design-references/antetitulos";

await mkdir(SALIDA, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.fonts.ready.then(() => true));
await page.waitForTimeout(3400);

// Los filetes son los <span aria-hidden> de 3px de alto dentro de un <p> flex
const marcas = page.locator('p:has(> span[aria-hidden][class*="h-[3px]"])');
const total = await marcas.count();

console.log(`\nApariciones del filete: ${total}\n`);

for (let i = 0; i < total; i++) {
  const el = marcas.nth(i);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);

  const texto = (await el.innerText()).trim();
  const caja = await el.boundingBox();

  // Recorta con aire alrededor para ver cómo convive con el titular
  if (caja) {
    await page.screenshot({
      path: `${SALIDA}/${String(i + 1).padStart(2, "0")}.png`,
      clip: {
        x: Math.max(0, caja.x - 20),
        y: Math.max(0, caja.y - 20),
        width: Math.min(700, 1440 - caja.x + 20),
        height: 190,
      },
    });
  }

  console.log(`  ${String(i + 1).padStart(2, "0")}. "${texto}"`);
}

await browser.close();
console.log(`\nRecortes en ${SALIDA}/`);
