/**
 * DATOS DE PRUEBA — no publicar sin revisar.
 *
 * Mock de las convocatorias por comunidad para desarrollar el calculador. La
 * intención es sustituir este archivo por una llamada al backend sin tocar el
 * componente: `Ayudas.tsx` solo consume `COMUNIDADES` y el tipo `Comunidad`,
 * así que basta con que el backend devuelva esa misma forma.
 *
 * Reglas que el dato tiene que respetar venga de donde venga (ver
 * HANDOFF-TEXTOS-WEB.md §2):
 *
 *  - SIEMPRE un tramo (`min`–`max`), nunca un porcentaje único: la concesión la
 *    decide la administración y un número exacto se lee como promesa.
 *  - Nada de nombres de programa inventados. Aquí solo van los dos que están
 *    verificados en INDICE.md; el resto lleva `programa: null` y el copy cae en
 *    un texto genérico. Rellenar solo con convocatoria comprobada.
 *
 * Los tramos de abajo son PLACEHOLDER (50–80 % general). No son datos reales de
 * cada convocatoria.
 */

export interface Comunidad {
  /** Identificador estable; será la clave en el backend. */
  id: string;
  nombre: string;
  /**
   * Cobertura en porcentaje sobre la base sin IVA. `tipica` es la que se usa
   * para el ejemplo numérico; `min` y `max` son el tramo real de la
   * convocatoria y se enseñan siempre junto al número, para que el ejemplo no
   * se lea como una cifra garantizada.
   */
  cobertura: { min: number; max: number; tipica: number };
  /** Nombre de la convocatoria, SOLO si está verificada. */
  programa: string | null;
  /** Aviso corto y específico de esa comunidad, si lo hay. */
  nota?: string;
}

const TRAMO_GENERICO = { min: 50, max: 80, tipica: 70 } as const;

export const COMUNIDADES: readonly Comunidad[] = [
  { id: "andalucia", nombre: "Andalucía", cobertura: TRAMO_GENERICO, programa: null },
  { id: "aragon", nombre: "Aragón", cobertura: TRAMO_GENERICO, programa: null },
  { id: "asturias", nombre: "Asturias", cobertura: TRAMO_GENERICO, programa: null },
  { id: "baleares", nombre: "Islas Baleares", cobertura: TRAMO_GENERICO, programa: null },
  { id: "canarias", nombre: "Canarias", cobertura: TRAMO_GENERICO, programa: null },
  { id: "cantabria", nombre: "Cantabria", cobertura: TRAMO_GENERICO, programa: null },
  { id: "castilla-la-mancha", nombre: "Castilla-La Mancha", cobertura: TRAMO_GENERICO, programa: null },
  { id: "castilla-y-leon", nombre: "Castilla y León", cobertura: TRAMO_GENERICO, programa: null },
  { id: "cataluna", nombre: "Cataluña", cobertura: TRAMO_GENERICO, programa: null },
  { id: "ceuta", nombre: "Ceuta", cobertura: TRAMO_GENERICO, programa: null },
  { id: "extremadura", nombre: "Extremadura", cobertura: TRAMO_GENERICO, programa: null },
  {
    id: "galicia",
    nombre: "Galicia",
    cobertura: TRAMO_GENERICO,
    // Verificado en INDICE.md. El tramo sigue siendo placeholder.
    programa: "Reacciona (IG402A)",
    nota: "Máximo dos servicios por empresa y no se puede repetir tipo respecto a convocatorias anteriores.",
  },
  {
    id: "la-rioja",
    nombre: "La Rioja",
    cobertura: TRAMO_GENERICO,
    // Verificado en INDICE.md.
    programa: "Ayudas ADER a la digitalización",
  },
  { id: "madrid", nombre: "Comunidad de Madrid", cobertura: TRAMO_GENERICO, programa: null },
  { id: "melilla", nombre: "Melilla", cobertura: TRAMO_GENERICO, programa: null },
  { id: "murcia", nombre: "Región de Murcia", cobertura: TRAMO_GENERICO, programa: null },
  { id: "navarra", nombre: "Navarra", cobertura: TRAMO_GENERICO, programa: null },
  { id: "pais-vasco", nombre: "País Vasco", cobertura: TRAMO_GENERICO, programa: null },
  { id: "valencia", nombre: "Comunidad Valenciana", cobertura: TRAMO_GENERICO, programa: null },
];

export const COMUNIDAD_POR_DEFECTO = "galicia";

export function buscarComunidad(id: string): Comunidad {
  return COMUNIDADES.find((c) => c.id === id) ?? COMUNIDADES[0];
}
