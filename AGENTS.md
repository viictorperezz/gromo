<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Web de Gromo

Landing de un estudio de automatización de procesos e IA para pymes no
tecnológicas. **Lee `HANDOFF-AUDITORIA.md` antes de trabajar**: ahí están las
fuentes de verdad, las reglas que no se pueden romper y las trampas del entorno.

## Comandos

- `npm run dev` — servidor de desarrollo
- `npm run check` — lint, typecheck y build. Debe pasar limpio antes de entregar
- `node scripts/auditar-movil.mjs` — auditoría móvil completa, con el servidor levantado

## Estilo de código

- TypeScript estricto, sin `any`
- Exportaciones nombradas, componentes en PascalCase, utilidades en camelCase
- Clases de Tailwind, sin estilos en línea salvo para animaciones con retardo
- Dos espacios de indentación, primero móvil
- Los comentarios explican **por qué**, no qué hace la línea siguiente

## Lo que este proyecto da por sentado

1. **Los textos viven en `src/lib/contenido.ts`**, nunca dentro de los
   componentes. Si vas a cambiar una frase, es ahí.
2. **Nunca escribir «5.000 €» sin decir en la misma frase lo que queda con
   ayuda.** Es la regla de venta del titular.
3. **Cero prueba social inventada**: no hay clientes todavía, así que no hay
   casos, logotipos, testimonios ni cifras agregadas. El valor número uno de la
   marca es no vender humo.
4. **Sin nombre propio ni fotografía del titular**, por discreción laboral.
5. **La web no se indexa** mientras `LEGAL.titular` sea `PENDIENTE`;
   `src/app/robots.ts` lo gestiona solo.
6. El wordmark «Gromo» es texto en Inter 800, jamás una imagen.

## Movimiento

Dial declarado: **ENERGY 2 / RHYTHM 2 / MOTION 2**. Eso significa revelado al
entrar en pantalla y transiciones al interactuar. **Ningún bucle perpetuo.**
Todo se apaga con `prefers-reduced-motion`.

## Antes de dar algo por terminado

Verifícalo con un navegador, no de memoria. Los scripts de `scripts/` existen
para eso. Una captura tomada demasiado pronto enseña elementos a medio aparecer
que parecen fallos y no lo son: los tiempos de espera ya están ajustados.

@docs/brand/GROMO-BRIEF.md
