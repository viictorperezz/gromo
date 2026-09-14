# Gromo — web

Landing de **Gromo**, estudio de automatización de procesos e inteligencia
artificial aplicada para pymes que no son tecnológicas.

> **Estado: terminada y sin publicar, a propósito.**
> La indexación está bloqueada mientras falten los datos identificativos del
> aviso legal. Ver «Antes de publicar».

---

## Arranque

Requiere Node 24 o superior.

```bash
npm install
npm run dev      # http://localhost:3000
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sin emitir |
| `npm run check` | Los tres anteriores. Debe pasar limpio antes de dar nada por hecho |

---

## Rutas

| Ruta | Qué es |
|---|---|
| `/` | La landing completa |
| `/aviso-legal`, `/privacidad`, `/cookies` | Páginas legales |
| `/marca` | Página interna de comprobación de identidad visual. No forma parte de la web pública |

---

## Dónde se cambian las cosas

**Los textos no están en los componentes.** Viven todos en
[`src/lib/contenido.ts`](src/lib/contenido.ts), así que se puede reescribir
cualquier frase de la web sin tocar código.

| Archivo | Qué gobierna |
|---|---|
| `src/lib/contenido.ts` | Todos los textos y las cifras |
| `docs/brand/GROMO-BRIEF.md` | Paleta, tipografía y las restricciones de honestidad |
| `src/app/globals.css` | Tokens de color y animaciones |
| `src/components/sections/` | Una sección por archivo |
| `src/components/brand/` | Logotipo, símbolo y composición del hero |

---

## Pila

Next.js 16 con App Router, React 19, TypeScript estricto y Tailwind v4.
Tipografía Inter servida desde el propio dominio. Sin librerías de animación:
el movimiento es CSS y un `IntersectionObserver` de treinta líneas.

---

## Reglas que el código da por sentadas

No son manías de estilo. Están explicadas en `docs/brand/GROMO-BRIEF.md` y en
`HANDOFF-AUDITORIA.md`:

1. Nunca aparece «5.000 €» sin decir en la misma frase lo que queda con ayuda.
2. Cero prueba social inventada: no hay clientes todavía, así que no hay casos,
   ni logotipos, ni testimonios, ni cifras agregadas.
3. Sin nombre propio ni fotografía del titular.
4. El wordmark «Gromo» es texto en Inter 800, nunca una imagen.

---

## Verificación

Los scripts de `scripts/` comprueban con un navegador real lo que una captura
no demuestra. Necesitan el servidor de desarrollo levantado y usan el Chrome
del sistema, sin descargar nada.

```bash
node scripts/auditar-movil.mjs      # la comprobación más completa
node scripts/revisar-consola.mjs    # errores de consola en las cuatro rutas
node scripts/buscar-desborde.mjs    # qué elemento se sale de la pantalla
node scripts/capturar-web.mjs       # capturas de escritorio y móvil
```

`auditar-movil.mjs` recorre once anchos, mide todas las zonas táctiles, abre el
menú con tacto real y revisa la consola. Es el que conviene ejecutar antes de
dar por buena cualquier tanda de cambios.

---

## Antes de publicar

1. Registrar el dominio y crear el buzón de correo.
2. Rellenar `LEGAL` en `src/lib/contenido.ts` con los datos identificativos.
   Mientras pongan `PENDIENTE`, `src/app/robots.ts` bloquea la indexación:
   publicar una web comercial española sin identificar al prestador incumple
   la LSSI-CE.
3. Configurar el envío del formulario en `.env.local`:

   ```
   RESEND_API_KEY=...
   CONTACTO_DESTINO=...        # opcional
   CONTACTO_REMITENTE=...      # opcional
   ```

   Sin la clave el formulario **no finge** que envía: avisa de que todavía no
   está conectado y ofrece el correo directo.
4. Desplegar. Vercel encaja sin configuración adicional.

---

## Documentación

- [`HANDOFF-AUDITORIA.md`](HANDOFF-AUDITORIA.md) — para quien continúe o audite:
  fuentes de verdad, reglas, herramientas y trampas del entorno.
- [`docs/brand/GROMO-BRIEF.md`](docs/brand/GROMO-BRIEF.md) — identidad visual.
- [`ATRIBUCIONES.md`](ATRIBUCIONES.md) — qué es de terceros y bajo qué licencia.
