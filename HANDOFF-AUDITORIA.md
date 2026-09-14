# Handoff para auditoría — web de Gromo

> Para el agente que audite este proyecto. Todo lo de aquí está verificado contra
> el repositorio; si algo no cuadra con lo que encuentres, manda el código.
>
> Estado: **funcionalmente terminada, sin publicar a propósito.**
> Última sesión: 10 commits, desde `8351380` hasta `8c4ac4f`.

---

## 1. Qué es esto

Landing de una página para **Gromo**, estudio unipersonal de automatización de
procesos e IA para pymes no tecnológicas en España. El fundador es economista con
máster en Business Intelligence, trabaja por cuenta ajena y montará esto como
autónomo en pluriactividad. Aún **no tiene clientes ni alta fiscal**.

Producto que vende la web: proyecto de 60 horas tope por 5.000 € + IVA, del que
las ayudas autonómicas a la digitalización cubren entre el 50 % y el 80 %.

**Pila:** Next.js 16 (App Router), React 19, TypeScript estricto, Tailwind v4.
Node >= 24. Sin dependencias de animación ni de UI más allá de shadcn.

---

## 2. Arranque

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # lint + typecheck + build. Debe pasar limpio.
```

Rutas: `/` (landing), `/aviso-legal`, `/privacidad`, `/cookies`, `/marca`
(página interna de comprobación de marca, no forma parte de la web pública).

---

## 3. Fuentes de verdad (leer antes de tocar nada)

| Archivo | Qué manda |
|---|---|
| `docs/brand/GROMO-BRIEF.md` | Paleta, tipografía, restricciones honestas. **Tiene prioridad sobre cualquier default.** |
| `src/lib/contenido.ts` | **Todos** los textos de la web, centralizados. Editar aquí, nunca en los componentes. |
| `../MARCA.md` | Valores, ICP, propuesta de valor, tono. |
| `../EMBUDO-VENTAS.md` | Guion de venta, objeciones (origen de la sección de preguntas), números. |
| `../logo/HANDOFF-GROMO.md` | Especificación del símbolo y la tipografía. |
| `../INDICE.md` | Estado global del negocio y pendientes del fundador. |

---

## 4. Reglas que no se pueden romper

Estas no son preferencias de estilo. Romper cualquiera es un fallo de entrega.

1. **Nunca escribir "5.000 €" sin decir en la misma frase lo que queda con
   ayuda.** Es la regla de oro del embudo de venta del fundador.
2. **Cero prueba social fabricada.** No hay clientes todavía: nada de casos de
   éxito, logos, testimonios, cifras agregadas ("+50 proyectos") ni años de
   experiencia inflados. El valor número uno de la marca es no vender humo;
   contradecirlo en la propia home sería el error más caro posible.
3. **Sin nombre propio ni foto del fundador.** Decisión suya por discreción
   laboral: su empresa actual no debe encontrarle. La marca habla, la persona no.
   Las preguntas frecuentes ya responden a "¿quién está detrás?" sin identificarle.
4. **La web no debe indexarse** mientras `LEGAL.titular === "PENDIENTE"` en
   `contenido.ts`. `src/app/robots.ts` lo bloquea automáticamente. Publicar una
   web comercial española sin identificar al prestador incumple la LSSI-CE.
5. **Ámbito nacional.** El gancho de las ayudas va por tramos (50-80 %), nunca
   prometiendo un porcentaje concreto, porque ADER e IGAPE son autonómicas.
6. **El wordmark "Gromo" es texto vivo en Inter 800**, jamás una imagen.

---

## 5. La pasada de antislop (lo más relevante para auditar)

El fundador dijo que la web "cantaba demasiado a IA". Se instalaron las skills de
**[anti-slop](https://github.com/miqdadbadjuber/anti-slop)** (MIT) copiando las
carpetas a `.claude/skills/`:

```
.claude/skills/antislop/              núcleo: 38 reglas, tres niveles, Delivery Gate
.claude/skills/antislop-ui/           color, layout, componentes, decoración, movimiento
.claude/skills/antislop-copywriting/  titulares, CTA, tono, patrones de texto generado
.claude/skills/antislop-layoutmobile/ reflujo, breakpoints, desbordamiento
```

Son skills del estándar abierto de Agent Skills (`<nombre>/SKILL.md`), así que
las lee cualquier agente compatible. **Léelas antes de auditar**, en especial
`antislop-ui/SKILL.md` y el Delivery Gate del núcleo (`antislop/SKILL.md`, busca
"Delivery Gate (Mandatory)").

### Design Read declarado

> Landing de servicio B2B para dueños de pyme no técnicos, lenguaje visual
> sobrio-orgánico derivado del motivo Brote, dial **ENERGY 2 / RHYTHM 2 / MOTION 2**.

La coherencia con estos diales es auditable: MOTION 2 significa revelado al hacer
scroll y transiciones, **nunca bucles perpetuos**. Si encuentras un bucle
infinito, es un fallo contra el dial declarado.

### Correcciones que ya exigió (no reintroducirlas)

| Regla | Qué se quitó |
|---|---|
| R-06 | Antetítulos en mayúsculas con tracking ancho ("EL PROBLEMA") |
| R-01 | Dos orbes desenfocados de fondo |
| R-19, R-31 | Punto pulsante en el hero que no marcaba ningún estado |
| R-19 | Cinta de procesos en bucle infinito |
| R-09 | Cápsula decorativa del hero |
| R-08 | Flecha en el botón principal |
| R-14 | Seis tarjetas de servicios idénticas, sin jerarquía |
| R-02 | Rayas largas en texto visible |
| R-03 | Revelado lateral que sacaba 12 px por el borde en móvil |

También se retiró un filete corto que precedía a cada antetítulo: repetido ocho
veces dejaba de leerse como motivo de marca y pasaba a leerse como tic.

---

## 6. Referencias de contenido y estructura

El fundador aportó cuatro webs de agencias españolas **como inspiración de
estructura, no de contenido**:

- `https://ponteclick.com/`
- `https://artenova.es/`
- `https://visualpublinet.com/`
- `https://www.signumcomunicacion.com/agencia-de-diseno-web/`

Capturas en `docs/design-references/referencias/`, generadas con
`node scripts/capturar-referencias.mjs`.

**Lo que se tomó de ellas:** el patrón de titular grande que dice qué haces, para
quién y dónde; el uso de un color ácido como acento sobre fondo neutro; y páginas
largas alternando bloques claros y oscuros.

**Lo que no se tomó, y no debe tomarse:** ni un texto, ni una imagen, ni un
color, ni un logo, ni un caso. La paleta y la tipografía salen del handoff de
marca del fundador; los textos salen de sus propios documentos de venta.

Regla operativa en `docs/brand/GROMO-BRIEF.md` §0: de la referencia, el
esqueleto; de Gromo, la identidad.

### Sobre hyperframes

Se evaluó `https://github.com/heygen-com/hyperframes` a petición del fundador
creyendo que daba dinamismo a la web. **No sirve para eso:** convierte HTML en
vídeos MP4. No se instaló. Encaja, en cambio, con la "demo de 60 segundos"
pendiente en el kit de venta (`../INDICE.md`, pendiente 4).

---

## 7. Herramientas de verificación ya escritas

Todas usan `playwright-core` contra el Chrome del sistema (no descargan
navegador). Requieren el servidor de desarrollo levantado.

| Script | Para qué |
|---|---|
| `capturar-web.mjs` | Capturas a 1440 y 390, más recorte de cada sección. Informa del desbordamiento horizontal. |
| `buscar-desborde.mjs [ancho]` | Localiza **qué elemento concreto** se sale de pantalla. |
| `revisar-consola.mjs` | Errores y avisos de consola en las cuatro rutas públicas. |
| `probar-paralaje.mjs` | Comprueba que el hero responde al puntero de verdad. |
| `auditar-antetitulos.mjs` | Localiza y recorta un motivo repetido para juzgarlo en conjunto. |
| `capturar-referencias.mjs` | Reconocimiento de las webs de referencia. |
| `capturar-marca.mjs`, `render-simbolo.mjs`, `identificar-tipografia.mjs` | Verificación del logo y la tipografía. |

**Nota sobre las capturas:** la entrada del hero dura ~2,8 s y el revelado de
sección 700 ms más escalonado. Los scripts ya esperan lo suficiente. Si capturas
por tu cuenta antes de tiempo verás elementos a medio aparecer y parecerán fallos
de opacidad que no existen.

---

## 8. Estado verificado en el último commit

- `npm run check` pasa limpio: lint, TypeScript estricto y build de 9 rutas.
- **Cero** errores y avisos de consola en `/`, `/aviso-legal`, `/privacidad`, `/cookies`.
- **Cero** desbordamiento horizontal a 1440 px y a 390 px.
- Paralaje del hero medido: las variables recorren −0,8 a +0,8 y la capa del
  brote se desplaza 12 px.

---

## 9. Qué merece la pena auditar

Por orden de valor:

1. **Delivery Gate completo de antislop** (los cuatro bloques). Es lo que el
   fundador pidió y lo que ninguna de mis pasadas ha ejecutado de forma
   exhaustiva: yo apliqué `antislop-ui` y partes del núcleo, no el gate entero.
2. **`antislop-copywriting` sobre `src/lib/contenido.ts`.** Los textos no han
   pasado por esa skill. Es donde más probable es que quede tono de IA.
3. **Contraste WCAG AA** en los bloques sobre tinta `#10231A`. El verde
   `#35A06A` no alcanza AA para texto pequeño sobre ese fondo, por eso en oscuro
   manda el lima `#A8E063`. Conviene comprobar que no se coló ningún texto
   pequeño en verde sobre oscuro.
4. **Navegación por teclado completa**: foco visible, enlace de salto, menú
   móvil, acordeón de preguntas, selector de cobertura de la calculadora.
5. **El formulario sin clave configurada.** Comprobar que dice honestamente que
   no está conectado en vez de fingir un envío correcto
   (`src/app/actions/contacto.ts`).

---

## 10. Trampas del entorno (me costaron tiempo)

1. **PowerShell 5.1 destroza los acentos.** `Get-Content` lee UTF-8 como
   Windows-1252 y `Set-Content -Encoding utf8` añade BOM. Un reemplazo masivo así
   corrompió seis archivos ("administración" → "administraciÃ³n") y hubo que
   repararlos convirtiendo los bytes de vuelta y quitando un byte suelto.
   **No edites archivos con acentos desde PowerShell.** Usa las herramientas de
   edición del agente.
2. **Un módulo `"use server"` solo puede exportar funciones asíncronas.**
   Exportar una constante desde ahí la deja en `undefined` en el cliente y el
   build revienta en el prerenderizado. Por eso el estado inicial del formulario
   vive en `src/lib/contacto.ts` y no junto a la acción.
3. **Los here-strings de PowerShell se rompen** con comillas dobles dentro. Para
   los mensajes de commit, usa `git commit -F fichero`.
4. Este Next.js trae cambios de API respecto a lo memorizado. La documentación
   está en `node_modules/next/dist/docs/`; consúltala antes de escribir.

---

## 11. Pendiente, y por qué no lo puedo cerrar yo

Depende de decisiones y cuentas del fundador:

1. Registrar `gromo.es` y crear `hola@gromo.es`.
2. Rellenar `LEGAL` en `src/lib/contenido.ts` el día del alta como autónomo.
   Eso desbloquea la indexación automáticamente.
3. Clave de Resend en `.env.local` (`RESEND_API_KEY`, opcionalmente
   `CONTACTO_DESTINO` y `CONTACTO_REMITENTE`).
4. Imagen de Open Graph 1200×630. Se puede generar desde
   `public/brand/gromo-simbolo.svg`.
5. Desplegar (Vercel encaja).

---

## 12 bis. Addendum: vídeo en bucle del hero (14-sep-2026, otro agente)

El fundador aportó un vídeo de marca de 10 s (brote con líneas de datos,
`gemini_generated_video_*.mov`, HEVC, que Chrome no reproduce). Se convirtió a
`public/videos/gromo-bucle.mp4` (H.264, ~95 KB) + `.webm` + póster JPG, y
sustituye a `BroteAnimado` en el hero (`VideoBucle.tsx`). Solo MP4
(H.264, ~95 KB): con dos `<source>` Chrome abortaba la primera descarga
(ERR_ABORTED); y con `preload="metadata"` + `play()` abortaba el rango de
metadatos. Con `preload="auto"` y una sola fuente, cero avisos (verificado).

Aviso de dial: un bucle tensiona el MOTION 2 declarado. Contención aplicada:
solo reproduce visible (IO ≥ 25 %), con `prefers-reduced-motion` no arranca
solo, y el control de pausa existe pero oculto hasta foco de teclado
(WCAG 2.2.2 sin símbolo visible). Sin tarjeta ni borde: el negro del vídeo
está aplastado a cero puro (medido por zonas: era 16/31/24), así que el
`mix-blend-screen` lo funde de forma exacta en cualquier pantalla. Se probó
antes una máscara radial, pero dejaba parche visible. Quedaba un escalón de
±1 nivel por redondeo YUV del decodificador (medido en página: 36 vs 35 en
verde): se disuelve con un velo de sombra interior del color tinta en una
capa superpuesta (la sombra sobre el propio <video> no pinta, porque el
fotograma es contenido reemplazado y queda por encima).
Los textos del botón viven en `VIDEO` dentro de `contenido.ts`.

## 12. Contexto de negocio que condiciona decisiones

- El fundador dispone de **7,5 h/semana**. Toda propuesta de mantenimiento debe
  caber ahí.
- La web **no es el canal de captación**: vende por llamada y email uno a uno.
  La web sirve para que, cuando le googleen después de la llamada, encuentren
  algo serio. No optimices para tráfico frío.
- Hay una convocatoria con fecha límite cercana (Ticket Innova Galicia, cierre
  30-sep-2026). Si hay que priorizar, prioriza lo que desbloquea publicar.
