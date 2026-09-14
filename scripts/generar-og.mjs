/**
 * Genera la imagen de Open Graph (1200×630) con el símbolo y el wordmark de la
 * marca, usando el Chrome del sistema.
 *
 *   node scripts/generar-og.mjs
 *
 * Salida: public/brand/gromo-og.png
 */
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";

const SALIDA = "public/brand/gromo-og.png";
const ANCHO = 1200;
const ALTO = 630;

const simbolo = await readFile("public/brand/gromo-simbolo.svg", "utf8");

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${ANCHO}px; height: ${ALTO}px;
    background: #10231A;
    color: #F6F8F6;
    font-family: Inter, system-ui, sans-serif;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 26px;
    text-align: center;
  }
  .simbolo { width: 104px; height: 104px; }
  .simbolo svg { width: 100%; height: 100%; display: block; }
  .wordmark {
    font-size: 84px; font-weight: 800; letter-spacing: -0.03em; line-height: 1;
  }
  .claim { font-size: 30px; font-weight: 600; color: #A8E063; line-height: 1.2; }
  .detalle { font-size: 22px; font-weight: 400; color: rgba(246,248,246,0.62); }
</style>
</head>
<body>
  <div class="simbolo">${simbolo}</div>
  <div class="wordmark">Gromo</div>
  <div class="claim">Automatización e IA para pymes</div>
  <div class="detalle">Presupuestos, pedidos, documentación y reporting · Ayudas del 50 % al 80 %</div>
</body>
</html>`;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: ANCHO, height: ALTO }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.fonts.ready.then(() => true));
await page.waitForTimeout(300);
await page.screenshot({ path: SALIDA });
await browser.close();

console.log(`Imagen OG en ${SALIDA} (${ANCHO}×${ALTO})`);
