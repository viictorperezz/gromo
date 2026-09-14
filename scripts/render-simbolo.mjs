/**
 * Renderiza el SVG del símbolo al mismo lienzo que el PNG original (1254×1254)
 * para poder medir los dos con la misma regla y comparar números, no impresiones.
 *
 *   node scripts/render-simbolo.mjs
 */
import { chromium } from "playwright-core";
import { readFile, mkdir } from "node:fs/promises";

const LADO = 1254;
const SALIDA = "docs/design-references/marca";

const HTML = (svg) => `<!doctype html>
<style>
  html,body{margin:0;padding:0;background:#fff}
  #caja{width:${LADO}px;height:${LADO}px;display:grid;place-items:center;background:#fff}
  svg{width:${LADO}px;height:${LADO}px;display:block}
</style>
<div id="caja">${svg}</div>`;

async function main() {
  await mkdir(SALIDA, { recursive: true });
  const svg = await readFile("public/brand/gromo-simbolo.svg", "utf8");

  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({
    viewport: { width: LADO, height: LADO },
    deviceScaleFactor: 1,
  });
  await page.setContent(HTML(svg));
  await page.locator("#caja").screenshot({
    path: `${SALIDA}/svg-a-escala-original.png`,
  });
  await browser.close();

  console.log(`SVG renderizado a ${LADO}×${LADO} en ${SALIDA}/svg-a-escala-original.png`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
