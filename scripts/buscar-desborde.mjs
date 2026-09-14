/**
 * Localiza qué elemento concreto se sale de la pantalla.
 *
 * Saber que hay 12 px de desbordamiento no sirve de nada; hay que saber quién
 * los provoca. Esto recorre el DOM y lista los que cruzan el borde.
 *
 *   node scripts/buscar-desborde.mjs [ancho]
 */
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const ANCHO = Number(process.argv[2] ?? 390);

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: ANCHO, height: 844 } });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(700);

const r = await page.evaluate(() => {
  const limite = document.documentElement.clientWidth;
  const salida = [];
  for (const el of document.querySelectorAll("*")) {
    const c = el.getBoundingClientRect();
    if (c.width === 0 || c.height === 0) continue;
    if (c.right > limite + 0.5 || c.left < -0.5) {
      salida.push({
        tag: el.tagName.toLowerCase(),
        clases: String(el.className).slice(0, 100),
        left: Math.round(c.left),
        right: Math.round(c.right),
        ancho: Math.round(c.width),
        texto: (el.textContent || "").trim().slice(0, 45),
      });
    }
  }
  return { limite, total: salida.length, lista: salida.slice(0, 12) };
});

console.log(`\nVentana ${r.limite}px · elementos fuera de cuadro: ${r.total}\n`);
for (const c of r.lista) {
  console.log(`  <${c.tag}>  left ${c.left}  right ${c.right}  (ancho ${c.ancho})`);
  console.log(`     clases: ${c.clases}`);
  if (c.texto) console.log(`     texto:  ${c.texto}`);
  console.log("");
}

await browser.close();
