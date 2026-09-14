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

/**
 * Recorre la página hasta abajo para que se disparen los revelados.
 *
 * `fullPage: true` no hace scroll: compone la captura sin que ningún bloque
 * llegue a entrar en pantalla, así que las secciones que esperan al
 * IntersectionObserver salen invisibles y parece que la web está rota.
 */
async function revelarTodo(page) {
  await page.evaluate(async () => {
    const paso = Math.max(200, Math.round(window.innerHeight * 0.7));
    const alto = document.documentElement.scrollHeight;
    for (let y = 0; y < alto; y += paso) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
  // De vuelta arriba, deja terminar la transición de 700 ms y los escalonados.
  await page.waitForTimeout(1400);
}

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
    // Antes de la captura completa, revela lo que espera al scroll.
    await revelarTodo(page);
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
          // El revelado dura 700 ms y se escalona hasta ~320 ms: menos espera
          // y las capturas salen con elementos a medio aparecer.
          await page.waitForTimeout(1400);
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
