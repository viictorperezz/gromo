/**
 * Comprueba la exportación estática tal y como la servirá GitHub Pages.
 *
 * El fallo clásico de una página de proyecto es que se publica sin estilos:
 * la web vive en usuario.github.io/NOMBRE pero los enlaces al CSS apuntan a la
 * raíz. Aquí se levanta un servidor que sirve `out/` bajo ese mismo prefijo y
 * se comprueba que no falla ninguna petición.
 *
 *   BASE_PATH=/mi-repo EXPORT_ESTATICO=1 npm run build
 *   node scripts/probar-export.mjs /mi-repo
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, resolve } from "node:path";
import { chromium } from "playwright-core";

const PREFIJO = process.argv[2] ?? "/gromo-web";
const RAIZ = resolve("out");
const PUERTO = 4321;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const servidor = createServer(async (req, res) => {
  try {
    let ruta = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (!ruta.startsWith(PREFIJO)) {
      res.writeHead(404).end("fuera del prefijo");
      return;
    }
    ruta = ruta.slice(PREFIJO.length) || "/";

    let archivo = join(RAIZ, ruta);
    try {
      if ((await stat(archivo)).isDirectory()) archivo = join(archivo, "index.html");
    } catch {
      // Sin extensión, Next exporta ruta.html
      if (!extname(archivo)) archivo += ".html";
    }

    const datos = await readFile(archivo);
    res.writeHead(200, { "content-type": TIPOS[extname(archivo)] ?? "application/octet-stream" });
    res.end(datos);
  } catch {
    res.writeHead(404).end("no encontrado");
  }
});

await new Promise((r) => servidor.listen(PUERTO, r));
const URL_BASE = `http://localhost:${PUERTO}${PREFIJO}/`;
console.log(`\nSirviendo out/ en ${URL_BASE}\n`);

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const fallos = [];
page.on("requestfailed", (r) => {
  // La precarga de rutas que hace el App Router pide una carga útil que la
  // exportación estática no genera, y Chrome la aborta. No afecta a lo que se
  // ve: la navegación cae en el enlace normal. Se anota aparte.
  const tipo = r.resourceType();
  const linea = `[${tipo}] ${r.url()} — ${r.failure()?.errorText}`;
  // Solo `fetch`: un aborto del documento sí sería un fallo de verdad.
  if (tipo === "fetch") {
    console.log(`   (precarga ignorada) ${linea}`);
    return;
  }
  fallos.push(linea);
});
page.on("response", (r) => {
  if (r.status() >= 400) fallos.push(`${r.status()} ${r.url()}`);
});
page.on("console", (m) => {
  if (m.type() === "error") fallos.push(`consola: ${m.text().slice(0, 120)}`);
});

await page.goto(URL_BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(3400);

// Si el CSS no cargó, el fondo del hero no sería el tinta de marca
const comprobacion = await page.evaluate(() => {
  const hero = document.querySelector("section");
  const nav = document.querySelector("header");
  return {
    fondoHero: hero ? getComputedStyle(hero).backgroundColor : "(sin section)",
    hayNav: Boolean(nav),
    titular: document.querySelector("h1")?.textContent?.slice(0, 45) ?? "(sin h1)",
    hojas: document.styleSheets.length,
    imagenes: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length,
  };
});

await page.screenshot({ path: "docs/design-references/web/export-pages.png", fullPage: false });
await browser.close();
servidor.close();

console.log("  hojas de estilo cargadas :", comprobacion.hojas);
console.log("  fondo del hero           :", comprobacion.fondoHero);
console.log("  cabecera presente        :", comprobacion.hayNav);
console.log("  titular                  :", comprobacion.titular);
console.log("  imagenes rotas           :", comprobacion.imagenes);
console.log("\n  peticiones fallidas      :", fallos.length);
for (const f of [...new Set(fallos)].slice(0, 8)) console.log("     " + f);

const ok =
  fallos.length === 0 &&
  comprobacion.hojas > 0 &&
  comprobacion.imagenes === 0 &&
  comprobacion.fondoHero.includes("16, 35, 26");

console.log("\n" + (ok ? "EXPORTACION CORRECTA" : "HAY PROBLEMAS, revisa lo de arriba"));
if (!ok) process.exitCode = 1;
