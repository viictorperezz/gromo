# Atribuciones

Este proyecto incorpora trabajo de terceros. Se detalla aquí para cumplir sus
licencias y para que quien lo herede sepa qué es propio y qué no.

---

## Base del proyecto

**ai-website-cloner-template** — https://github.com/JCodesMore/ai-website-cloner-template
Licencia MIT, © 2025 JCodesMore. Texto íntegro en `LICENSE-PLANTILLA`.

De ahí viene el andamiaje: la configuración de Next.js 16, Tailwind v4,
TypeScript y shadcn/ui, y la skill `.claude/skills/clone-website/`.

La web de Gromo (secciones, textos, identidad visual y componentes de marca)
está escrita para este proyecto y no procede de la plantilla.

---

## Skills de agente

**antislop** — https://github.com/miqdadbadjuber/anti-slop
Licencia MIT, © miqdadbadjuber.

Carpetas incorporadas sin modificar en `.claude/skills/`:

- `antislop/` (núcleo)
- `antislop-ui/`
- `antislop-copywriting/`
- `antislop-layoutmobile/`

Son reglas para agentes de codificación, no código que se ejecute en la web.
Se usaron para auditar y corregir la interfaz; el registro de lo que exigieron
está en `HANDOFF-AUDITORIA.md` §5.

---

## Tipografía

**Inter** — https://rsms.me/inter
SIL Open Font License 1.1. Se sirve a través de `next/font/google`.

---

## Herramientas de desarrollo

**playwright-core** (Apache 2.0) se usa solo en los scripts de `scripts/` para
verificación visual y de accesibilidad. No forma parte de lo que se publica:
es una dependencia de desarrollo.

---

## Webs consultadas como referencia de estructura

Durante el diseño se estudió la disposición de cuatro webs de agencias
españolas: ponteclick.com, artenova.es, visualpublinet.com y
signumcomunicacion.com.

De ellas se tomó **el esqueleto** (qué secciones, en qué orden, con qué ritmo).
No se tomó ni un texto, ni una imagen, ni un color, ni un logotipo.

Las capturas que se hicieron para estudiarlas **no se publican**: están
excluidas en `.gitignore`. Son páginas completas de sitios ajenos y
republicarlas no nos corresponde. Se regeneran en local con
`node scripts/capturar-referencias.mjs` si hacen falta.

---

## Lo propio

El código de la web, los textos, la identidad de Gromo y el símbolo Brote son
del titular del proyecto. **Este repositorio no declara todavía una licencia
propia**: mientras no se añada una, se aplica el derecho de autor por defecto,
es decir, todos los derechos reservados. Es una decisión pendiente del titular,
no un descuido.
