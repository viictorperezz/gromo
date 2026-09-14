/**
 * Capturas de la web de Gromo para revisión visual, en escritorio y móvil.
 *
 *   node scripts/capturar-web.mjs
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SALIDA = "docs/design-references/web";

const VISTAS = [
  { nombre: "escritorio", width: 1440, height: 900, escala: 1 },
  { nombre: "movil", width: 390, height: 844, escala: 2 },
];

const SECCIONES = ["problema", "que-hago", "como", "ayudas", "por-que", "faq", "contacto"];

async function main() {
  await mkdir(SALIDA, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });

  for (const v of VISTAS) {
    const context = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: v.escala,
      locale: "es-ES",
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.fonts.ready.then(() => true));
    // La entrada del hero dura ~2,8 s. Capturar antes deja la composición a
    // medio dibujar y hace pensar que hay trazos sueltos.
    await page.waitForTimeout(3400);

    await page.screenshot({ path: `${SALIDA}/${v.nombre}-hero.png` });
    await page.screenshot({ path: `${SALIDA}/${v.nombre}-completa.png`, fullPage: true });

    // Comprueba que la página no se desborda a lo ancho
    const desborde = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    console.log(`  ${v.nombre}: capturada · desborde horizontal ${desborde}px`);

    if (v.nombre === "escritorio") {
      for (const s of SECCIONES) {
        const el = page.locator(`#${s}`);
        if (await el.count()) {
          await el.scrollIntoViewIfNeeded();
          await page.waitForTimeout(250);
          await el.screenshot({ path: `${SALIDA}/seccion-${s}.png` });
        }
      }
      console.log(`  secciones recortadas: ${SECCIONES.length}`);
    }

    await context.close();
  }

  await browser.close();
  console.log(`\nCapturas en ${SALIDA}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
