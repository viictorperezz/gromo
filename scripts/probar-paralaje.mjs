/**
 * Comprueba que la composición del hero responde al puntero.
 *
 * Una captura no demuestra esto: hay que mover el ratón y leer las variables
 * que el componente escribe.
 *
 *   node scripts/probar-paralaje.mjs
 */
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(3400);

const svg = page.locator("section svg").first();
const caja = await svg.boundingBox();
if (!caja) throw new Error("No se encuentra la composicion del hero");

const leer = () =>
  svg.evaluate((el) => ({
    px: getComputedStyle(el).getPropertyValue("--px").trim() || "(sin definir)",
    py: getComputedStyle(el).getPropertyValue("--py").trim() || "(sin definir)",
  }));

console.log("\n  al cargar        ", await leer());

// Esquina superior izquierda de la composicion
await page.mouse.move(caja.x + caja.width * 0.1, caja.y + caja.height * 0.1);
await page.waitForTimeout(250);
console.log("  raton arriba-izq ", await leer());

// Esquina inferior derecha
await page.mouse.move(caja.x + caja.width * 0.9, caja.y + caja.height * 0.9);
await page.waitForTimeout(250);
console.log("  raton abajo-der  ", await leer());

// Comprueba que la capa del brote se desplaza de verdad
const desplazamiento = await svg.evaluate((el) => {
  const capas = el.querySelectorAll(":scope > g");
  const ultima = capas[capas.length - 1];
  const m = new DOMMatrixReadOnly(getComputedStyle(ultima).transform);
  return { capas: capas.length, x: Math.round(m.e), y: Math.round(m.f) };
});
console.log("  capa del brote   ", desplazamiento);

await browser.close();
