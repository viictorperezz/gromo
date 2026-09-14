/**
 * Recoge errores y avisos de consola de cada ruta, para no dejar pasar
 * problemas de hidratación o accesibilidad que solo se ven en el navegador.
 *
 *   node scripts/revisar-consola.mjs
 */
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const RUTAS = ["/", "/aviso-legal", "/privacidad", "/cookies"];

async function main() {
  const browser = await chromium.launch({ channel: "chrome" });
  let total = 0;

  for (const ruta of RUTAS) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const avisos = [];

    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning") {
        avisos.push(`[${m.type()}] ${m.text()}`);
      }
    });
    page.on("pageerror", (e) => avisos.push(`[pageerror] ${e.message}`));
    page.on("requestfailed", (r) =>
      avisos.push(`[red] ${r.url()} — ${r.failure()?.errorText}`),
    );

    await page.goto(BASE + ruta, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    await context.close();

    console.log(`\n${ruta}  →  ${avisos.length} aviso(s)`);
    for (const a of [...new Set(avisos)]) console.log("   " + a.slice(0, 300));
    total += avisos.length;
  }

  await browser.close();
  console.log(`\nTotal: ${total}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
