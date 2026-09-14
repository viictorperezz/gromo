/**
 * Captura las webs de referencia para estudiar SU ESTRUCTURA.
 *
 * Ojo: esto es reconocimiento, no extracción de material. De estas webs se toma
 * el esqueleto (qué secciones, en qué orden, con qué ritmo) — nunca sus textos,
 * imágenes, logos ni paleta. Ver docs/brand/GROMO-BRIEF.md §0.
 *
 *   node scripts/capturar-referencias.mjs
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const SALIDA = "docs/design-references/referencias";

const SITIOS = [
  ["ponteclick", "https://ponteclick.com/"],
  ["artenova", "https://artenova.es/"],
  ["visualpublinet", "https://visualpublinet.com/"],
  ["signum", "https://www.signumcomunicacion.com/agencia-de-diseno-web/"],
];

async function capturar(browser, clave, url) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: "es-ES",
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);

    // Baja despacio para disparar las animaciones de entrada y el lazy-load
    await page.evaluate(async () => {
      const paso = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += paso) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 220));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 600));
    });

    await page.screenshot({ path: `${SALIDA}/${clave}-completa.png`, fullPage: true });
    await page.screenshot({ path: `${SALIDA}/${clave}-hero.png` });

    // Inventario de estructura, sin copiar contenido
    const info = await page.evaluate(() => {
      const visible = (el) => {
        const r = el.getBoundingClientRect();
        return r.width > 200 && r.height > 80;
      };
      const secciones = [...document.querySelectorAll("section, main > div, .elementor-section")]
        .filter(visible)
        .slice(0, 40)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            alto: Math.round(r.height),
            fondo: getComputedStyle(el).backgroundColor,
          };
        });
      const fuentes = [...new Set(
        [...document.querySelectorAll("h1,h2,h3,p,a,button")]
          .slice(0, 120)
          .map((el) => getComputedStyle(el).fontFamily.split(",")[0].replace(/["']/g, "")),
      )];
      const h1 = document.querySelector("h1");
      return {
        titulo: document.title,
        alto: document.body.scrollHeight,
        nSecciones: secciones.length,
        secciones: secciones.slice(0, 15),
        fuentes: fuentes.slice(0, 6),
        h1Tam: h1 ? getComputedStyle(h1).fontSize : null,
        nImagenes: document.querySelectorAll("img").length,
        nVideos: document.querySelectorAll("video").length,
        canvas: document.querySelectorAll("canvas").length,
      };
    });

    console.log(`\n=== ${clave} ===`);
    console.log(`  ${info.titulo}`);
    console.log(`  alto ${info.alto}px · ${info.nSecciones} secciones · ${info.nImagenes} img · ${info.nVideos} video · ${info.canvas} canvas`);
    console.log(`  fuentes: ${info.fuentes.join(", ")}`);
    console.log(`  h1: ${info.h1Tam}`);
  } catch (e) {
    console.log(`\n=== ${clave} === FALLO: ${e.message.split("\n")[0]}`);
  } finally {
    await context.close();
  }
}

async function main() {
  await mkdir(SALIDA, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });
  for (const [clave, url] of SITIOS) await capturar(browser, clave, url);
  await browser.close();
  console.log(`\nCapturas en ${SALIDA}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
