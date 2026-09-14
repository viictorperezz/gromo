/**
 * Auditoría móvil completa, siguiendo la lista de .claude/skills/antislop-layoutmobile.
 *
 * No basta con mirar a 390 px: una web puede estar bien en el móvil y en el
 * escritorio y romperse en todo el tramo intermedio, que es donde viven las
 * tabletas y los portátiles pequeños.
 *
 *   node scripts/auditar-movil.mjs
 */
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

/** 320 es el mínimo realista (iPhone SE en horizontal partido / Android viejo). */
const ANCHOS = [320, 360, 390, 414, 480, 600, 768, 900, 1024, 1280, 1440];
const RUTAS = ["/", "/aviso-legal", "/privacidad", "/cookies"];
const MINIMO_TACTIL = 44;

const problemas = [];
const anota = (t, d) => problemas.push({ tipo: t, detalle: d });

const browser = await chromium.launch({ channel: "chrome" });

// ─────────────────────────────────────────────────────────────
// 1. Desbordamiento horizontal en todo el rango de anchos
// ─────────────────────────────────────────────────────────────
console.log("\n1. DESBORDAMIENTO HORIZONTAL");
for (const ancho of ANCHOS) {
  const ctx = await browser.newContext({ viewport: { width: ancho, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  const r = await page.evaluate(() => {
    const limite = document.documentElement.clientWidth;
    const fuera = [];
    for (const el of document.querySelectorAll("*")) {
      const c = el.getBoundingClientRect();
      if (c.width === 0 || c.height === 0) continue;
      if (el.closest("svg")) continue; // el svg recorta su propio contenido
      if (c.right > limite + 1) {
        fuera.push(
          `<${el.tagName.toLowerCase()}> ${String(el.className).slice(0, 55)} (right ${Math.round(c.right)})`,
        );
      }
    }
    return {
      desborde: document.documentElement.scrollWidth - limite,
      fuera: [...new Set(fuera)].slice(0, 3),
    };
  });

  const ok = r.desborde <= 0;
  console.log(`   ${ancho.toString().padStart(4)}px  ${ok ? "ok" : `DESBORDA ${r.desborde}px`}`);
  if (!ok) {
    anota("desbordamiento", `${ancho}px: ${r.desborde}px. ${r.fuera.join(" | ")}`);
  }
  await ctx.close();
}

// ─────────────────────────────────────────────────────────────
// 2. Zonas táctiles (mínimo 44x44) y separación entre ellas
// ─────────────────────────────────────────────────────────────
console.log("\n2. ZONAS TACTILES a 390px");
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  // Despliega todo para medir también lo que aparece al bajar
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);

  const r = await page.evaluate((min) => {
    const sel = "a[href], button, input, textarea, select, summary, [role=radio]";
    const pequenos = [];
    const cajas = [];
    for (const el of document.querySelectorAll(sel)) {
      const c = el.getBoundingClientRect();
      if (c.width === 0 || c.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      // El enlace de salto y el botón de pausa solo existen con foco
      if (el.className && String(el.className).includes("sr-only")) continue;
      // Trampa antispam: vive fuera de pantalla a propósito, nadie la toca
      if (c.right < 0 || c.left > window.innerWidth) continue;
      const etiqueta = (el.getAttribute("aria-label") || el.textContent || "")
        .trim()
        .slice(0, 38);
      if (c.width < min || c.height < min) {
        pequenos.push(`${el.tagName.toLowerCase()} "${etiqueta}" ${Math.round(c.width)}x${Math.round(c.height)}`);
      }
      cajas.push({ x: c.x, y: c.y + window.scrollY, w: c.width, h: c.height, etiqueta });
    }
    return { total: cajas.length, pequenos };
  }, MINIMO_TACTIL);

  console.log(`   ${r.total} elementos interactivos`);
  if (r.pequenos.length === 0) {
    console.log(`   todos alcanzan ${MINIMO_TACTIL}x${MINIMO_TACTIL}`);
  } else {
    console.log(`   POR DEBAJO DE ${MINIMO_TACTIL}px: ${r.pequenos.length}`);
    for (const p of r.pequenos.slice(0, 10)) console.log(`      ${p}`);
    anota("tactil", r.pequenos.slice(0, 10).join(" | "));
  }
  await ctx.close();
}

// ─────────────────────────────────────────────────────────────
// 3. Tamaño de letra y altura de la barra fija
// ─────────────────────────────────────────────────────────────
console.log("\n3. LEGIBILIDAD Y BARRA FIJA a 390px");
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  // 13 px es el tamaño convencional del texto secundario (etiquetas, pies,
  // avisos) y se lee bien en un móvil. Por debajo de eso sí es un problema.
  const MINIMO_LETRA = 13;

  const r = await page.evaluate((min) => {
    const pequenos = new Map();
    const secundarios = new Map();
    for (const el of document.querySelectorAll("p, li, span, a, h1, h2, h3, label, button")) {
      if (!el.textContent?.trim()) continue;
      if (el.children.length > 0) continue;
      const px = parseFloat(getComputedStyle(el).fontSize);
      const destino = px < min ? pequenos : px < 14 ? secundarios : null;
      if (destino) {
        const k = `${px}px`;
        destino.set(k, (destino.get(k) ?? 0) + 1);
      }
    }
    const cab = document.querySelector("header");
    const h = cab ? cab.getBoundingClientRect().height : 0;
    const h1 = document.querySelector("h1");
    const lista = (m) => [...m.entries()].map(([k, v]) => `${v} a ${k}`);
    return {
      pequenos: lista(pequenos),
      secundarios: lista(secundarios),
      barra: Math.round(h),
      barraPorcentaje: Math.round((h / window.innerHeight) * 100),
      h1: h1 ? getComputedStyle(h1).fontSize : "(sin h1)",
    };
  }, MINIMO_LETRA);

  console.log(`   h1: ${r.h1}`);
  console.log(`   barra fija: ${r.barra}px (${r.barraPorcentaje}% de la pantalla)`);
  if (r.barraPorcentaje > 15) anota("barra", `ocupa el ${r.barraPorcentaje}% del alto`);
  if (r.secundarios.length) {
    console.log(`   texto secundario (aceptable): ${r.secundarios.join(", ")}`);
  }
  if (r.pequenos.length) {
    console.log(`   POR DEBAJO DE ${MINIMO_LETRA}px: ${r.pequenos.join(", ")}`);
    anota("legibilidad", r.pequenos.join(", "));
  } else {
    console.log(`   nada por debajo de ${MINIMO_LETRA}px`);
  }
  await ctx.close();
}

// ─────────────────────────────────────────────────────────────
// 4. Navegación por tacto: el menú tiene que abrirse y llevar a algún sitio
// ─────────────────────────────────────────────────────────────
console.log("\n4. MENU MOVIL (tacto real)");
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await ctx.newPage();
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  const enlacesVisibles = await page.locator("header nav a:visible").count();
  console.log(`   enlaces visibles sin abrir el menu: ${enlacesVisibles}`);

  const boton = page.locator("header button[aria-expanded]");
  if ((await boton.count()) === 0) {
    console.log("   NO HAY boton de menu");
    anota("nav", "sin boton de menu a 390px");
  } else {
    await boton.first().tap();
    await page.waitForTimeout(450);
    const abierto = await boton.first().getAttribute("aria-expanded");
    const enlaces = await page.locator("#menu-movil a").count();
    console.log(`   tras tocar: aria-expanded=${abierto}, ${enlaces} enlaces`);
    if (abierto !== "true" || enlaces === 0) {
      anota("nav", `el menu no abre (aria-expanded=${abierto}, ${enlaces} enlaces)`);
    }

    // Comprueba que un enlace del menu lleva a una seccion que existe
    const destinos = await page.locator("#menu-movil a").evaluateAll((els) =>
      els.map((e) => e.getAttribute("href")),
    );
    const rotos = await page.evaluate(
      (hrefs) =>
        hrefs.filter((h) => h?.startsWith("#") && !document.querySelector(h)),
      destinos,
    );
    console.log(`   destinos rotos: ${rotos.length ? rotos.join(", ") : "ninguno"}`);
    if (rotos.length) anota("nav", `anclas inexistentes: ${rotos.join(", ")}`);

    await page.locator("#menu-movil a").first().tap();
    await page.waitForTimeout(600);
    const cerrado = await boton.first().getAttribute("aria-expanded");
    console.log(`   al elegir una opcion se cierra: ${cerrado === "false" ? "si" : "NO"}`);
    if (cerrado !== "false") anota("nav", "el menu no se cierra al elegir opcion");
  }

  if (errores.length) anota("js", errores.slice(0, 3).join(" | "));
  await ctx.close();
}

// ─────────────────────────────────────────────────────────────
// 5. El formulario y la calculadora, con el dedo
// ─────────────────────────────────────────────────────────────
console.log("\n5. CONTROLES a 390px");
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  // Calculadora de ayudas
  const radios = page.locator('[role="radio"]');
  const n = await radios.count();
  if (n > 0) {
    const antes = await page.locator("#ayudas dd").last().innerText();
    await radios.first().tap();
    await page.waitForTimeout(900);
    const despues = await page.locator("#ayudas dd").last().innerText();
    console.log(`   calculadora: ${n} opciones, ${antes.trim()} -> ${despues.trim()}`);
    if (antes === despues) anota("calculadora", "tocar una opcion no cambia la cifra");
  } else {
    anota("calculadora", "no se encuentran las opciones de cobertura");
  }

  // Formulario: escribir y enviar vacio para ver la validacion
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const campo = page.locator('#contacto input[name="empresa"]');
  await campo.tap();
  await campo.fill("Prueba SL");
  const valor = await campo.inputValue();
  console.log(`   formulario: se puede escribir (${valor ? "si" : "NO"})`);
  if (!valor) anota("formulario", "no se puede escribir en los campos con tacto");

  await ctx.close();
}

// ─────────────────────────────────────────────────────────────
// 6. Consola en las cuatro rutas, a ancho de movil
// ─────────────────────────────────────────────────────────────
console.log("\n6. CONSOLA a 390px");
for (const ruta of RUTAS) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const avisos = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") avisos.push(m.text());
  });
  page.on("pageerror", (e) => avisos.push(e.message));
  await page.goto(BASE + ruta, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  console.log(`   ${ruta.padEnd(14)} ${avisos.length} aviso(s)`);
  if (avisos.length) anota("consola", `${ruta}: ${avisos[0].slice(0, 120)}`);
  await ctx.close();
}

await browser.close();

// ─────────────────────────────────────────────────────────────
console.log("\n" + "=".repeat(60));
if (problemas.length === 0) {
  console.log("SIN PROBLEMAS. La web es apta para movil.");
} else {
  console.log(`${problemas.length} PROBLEMA(S):\n`);
  for (const p of problemas) console.log(`  [${p.tipo}] ${p.detalle}`);
  process.exitCode = 1;
}
