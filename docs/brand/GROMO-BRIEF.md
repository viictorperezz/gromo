# Brief de marca — Gromo

> **Léeme antes de construir nada.** Este archivo tiene prioridad sobre los defaults de
> `/clone-website` (que son "pixel-perfect, customization: none").
> Fuente: `../../../MARCA.md`, `../../../logo/HANDOFF-GROMO.md`, `../../../EMBUDO-VENTAS.md`.

---

## 0. Regla que gobierna todo el proyecto

De la web de referencia se toma **la estructura y el oficio**. De Gromo se toma **la identidad**.

| De la referencia (SÍ) | De Gromo (SÍ) | De la referencia (NO) |
|---|---|---|
| Orden y número de secciones | Paleta completa | Su paleta de color |
| Ritmo vertical, escala de espaciado | Tipografía (Inter) | Su tipografía |
| Sistema de rejilla y breakpoints | Logo y símbolo | Su logo y assets de marca |
| Jerarquía tipográfica (relaciones de tamaño) | **Todos los textos** | Sus textos, claims y copy |
| Patrones de interacción (scroll, hover, sticky) | Imágenes y fotos | Sus imágenes y fotos |
| Anatomía de componentes (card, nav, footer) | Nombres y casos | Sus casos y clientes |

**No se descarga ni un solo asset de la referencia.** Si una sección necesita imagen y Gromo
no la tiene, se deja un placeholder neutro con la paleta Gromo y se anota en el informe final.

---

## 1. Qué es Gromo

Estudio personal de un economista con máster en Business Intelligence que ayuda a **pymes
tradicionales** (industria, alimentación/vino, logística, servicios) de **La Rioja y Galicia**
a automatizar procesos y aplicar IA.

- **Promesa:** *"Automatizo tus procesos con IA y la ayuda te devuelve la mayor parte."*
- **Posicionamiento:** pocos clientes, muy bien cuidados; precio cerrado; resultado medible;
  el papeleo de la ayuda pública incluido.
- **Personalidad:** cercano y humano, pero moderno y con ambición. Cero humo, cero corporativo frío.
- **"Gromo"** = brote, yema, renuevo (gallego y español). Metáfora: hacer brotar el negocio.

---

## 2. Tokens de diseño (obligatorios)

Estos valores van en `src/app/globals.css` como tokens Tailwind v4. **No se sustituyen por
los de la referencia en ningún caso.**

| Rol | Hex | Uso |
|---|---|---|
| Tinta / fondo oscuro | `#10231A` | Fondo oscuro, texto sobre claro |
| Verde Gromo | `#35A06A` | Símbolo, enlaces, botones |
| Verde oscuro | `#1F7A4D` | Degradado del tallo, hover |
| Verde lima (acento) | `#A8E063` | Acento, highlights, nodo |
| Blanco | `#FFFFFF` | Texto sobre oscuro, fondos |
| Off-white | `#F6F8F6` | Fondo de web y documentos |
| Gris texto | `#5C6B63` | Texto secundario |

**Regla de contraste:** en claro → verde sobre off-white/blanco. En oscuro → verde lima + verde
sobre tinta. Verificar AA (4.5:1) en todo texto de cuerpo; `#A8E063` sobre blanco NO pasa, usarlo
solo sobre tinta o como elemento gráfico.

### Tipografía

**Inter** vía `next/font/google`. Fallback: `system-ui, 'Segoe UI', Arial, sans-serif`.

| Uso | Peso | Notas |
|---|---|---|
| Wordmark "Gromo" | 800 | `letter-spacing: -2%`, solo la G en mayúscula |
| Titulares | 700 | |
| Subtítulos / UI | 600 | |
| Cuerpo | 400 | `line-height: 1.5` |

Las **relaciones** de tamaño (ratio de escala tipográfica) pueden tomarse de la referencia;
la familia no.

---

## 3. Tono de los textos

Claro y directo, frases cortas. Habla de **resultados y euros**, no de tecnología.
Cercano pero profesional. Honesto hasta cuando duele.

**Prohibido:** "sinergias", "disrupción", "transformación digital 360", "soluciones holísticas",
"partner estratégico", anglicismos vanidosos, y vender IA como palabra mágica.

**Regla de oro del precio:** nunca escribir "5.000 €" sin escribir "~1.500 €" en la misma frase.

---

## 4. Secciones previstas (landing de 1 página)

El orden final lo marca la referencia, pero el contenido es este:

1. **Nav** — logo Gromo + 3-4 enlaces ancla + CTA "Diagnóstico gratis".
2. **Hero** — promesa + subtítulo con el número (5.000 € → ~1.500 €) + CTA primario.
3. **Problema** — el dolor en lenguaje de dueño de pyme: horas en presupuestos, pedidos,
   documentación, reporting; errores; Excel.
4. **Cómo funciona** — 3 pasos: diagnóstico 45 min → propuesta con métrica → proyecto
   60 h con el papeleo incluido.
5. **La ayuda** — cómo queda la cuenta. Ticket Innova 80 %, ADER 50 % (70 % ciber).
   Explicar el flujo: el cliente adelanta, la ayuda le devuelve.
6. **Qué automatizo** — presupuestos, pedidos, documentación, atención, reporting, trazabilidad.
7. **Por qué yo** — economista + BI, papeleo incluido, precio cerrado y pequeño, trato directo.
8. **FAQ / objeciones** — sacadas de `EMBUDO-VENTAS.md` §9.
9. **CTA final** — sesión de diagnóstico de 45 min, sin coste.
10. **Footer** — contacto, aviso legal, privacidad, cookies.

---

## 5. Restricciones honestas (no inventar)

La web NO debe afirmar nada que hoy no sea cierto:

- **Sin casos de éxito ni logos de clientes** — todavía no hay. Nada de "empresas que confían
  en nosotros" con logos de relleno.
- **Sin testimonios** inventados ni cifras agregadas ("+50 proyectos").
- **Sin equipo ficticio** — es una persona. Si hay sección "quién soy", en primera persona.
- **Sin "años de experiencia"** infladas.
- Plazos y precios: solo los de `EMBUDO-VENTAS.md`. Nada de prometer resultados garantizados.

Esto no es escrúpulo: contradecir el valor "sin humo" en la propia home es el error más caro
que puede cometer esta marca en un mercado pequeño.

---

## 6. Assets de marca

Los archivos de marca del fundador van en `public/brand/`. Inventario esperado:

- [ ] Símbolo (Brote) en SVG — horizontal, vertical, favicon
- [ ] Wordmark "Gromo" (Inter 800, no generado por IA)
- [ ] Versión monocroma (blanco y negro)
- [ ] Open Graph / redes
- [ ] Imágenes de apoyo (hero, secciones)

Si un asset falta, se deja placeholder y se anota. **No se rellena con assets de la referencia.**

---

## 7. Técnico

- Next.js 16 App Router, React 19, TypeScript **strict**, sin `any`.
- Tailwind v4, tokens oklch en `globals.css`. Sin estilos inline.
- Mobile-first. Breakpoints: 390 / 768 / 1440.
- Exports nombrados, componentes PascalCase, utils camelCase, indentación de 2 espacios.
- `npm run check` (lint + typecheck + build) debe pasar limpio antes de dar nada por terminado.
- Idioma: **español**. `<html lang="es">`.
- SEO: metadata por ruta, OG image, favicon desde el símbolo, sitemap y robots.
