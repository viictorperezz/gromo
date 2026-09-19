/**
 * Comprueba la web ya publicada, no la copia local.
 *
 *   node scripts/probar-publicada.mjs https://usuario.github.io/repo/
 */
import { chromium } from "playwright-core";

const URL = process.argv[2] ?? "https://viictorperezz.github.io/gromo/";

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const fallos = [];
page.on("response", (r) => {
  if (r.status() >= 400) fallos.push(`${r.status()} ${r.url()}`);
});
page.on("requestfailed", (r) => {
  if (r.resourceType() !== "fetch") {
    fallos.push(`[${r.resourceType()}] ${r.url()} — ${r.failure()?.errorText}`);
  }
});

const resp = await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3500);

const estado = await page.evaluate(() => ({
  titulo: document.title,
  h1: document.querySelector("h1")?.textContent?.trim().slice(0, 50) ?? "(sin h1)",
  fondoHero: getComputedStyle(document.querySelector("section")).backgroundColor,
  hojas: document.styleSheets.length,
  video: Boolean(document.querySelector("video")),
  secciones: document.querySelectorAll("section[id]").length,
  imagenesRotas: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length,
}));

await page.screenshot({ path: "docs/design-references/web/publicada.png" });
await browser.close();

console.log(`\n  ${URL}`);
console.log(`  HTTP                 : ${resp?.status()}`);
console.log(`  titulo               : ${estado.titulo}`);
console.log(`  h1                   : ${estado.h1}`);
console.log(`  hojas de estilo      : ${estado.hojas}`);
console.log(`  fondo del hero       : ${estado.fondoHero}`);
console.log(`  video presente       : ${estado.video}`);
console.log(`  secciones            : ${estado.secciones}`);
console.log(`  imagenes rotas       : ${estado.imagenesRotas}`);
console.log(`  peticiones fallidas  : ${fallos.length}`);
for (const f of [...new Set(fallos)].slice(0, 8)) console.log("     " + f);

const ok =
  resp?.status() === 200 &&
  fallos.length === 0 &&
  estado.hojas > 0 &&
  estado.imagenesRotas === 0 &&
  estado.fondoHero.includes("16, 35, 26");
console.log("\n  " + (ok ? "PUBLICADA Y CORRECTA" : "REVISAR"));
if (!ok) process.exitCode = 1;
