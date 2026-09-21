/**
 * GENERADO por agencia-ia/scripts/ayudas_ia_ccaa.py — 2026-09-21. No editar a mano: los datos verificados viven en agencia-ia/datos/ayudas_ia_manual.json.
 * Antes de publicar: revisar agencia-ia/datos/ayudas_ia_bdns.csv y completar el manual.
 * Reglas (HANDOFF-TEXTOS-WEB.md §2): tramos siempre, nunca un porcentaje
 * suelto; `programa` solo si está verificado; nada inventado.
 */

export interface Comunidad {
  /** Identificador estable; será la clave en el backend. */
  id: string;
  nombre: string;
  /**
   * Cobertura en porcentaje sobre la base sin IVA. `típica` es la que se usa
   * para el ejemplo numérico; `min` y `max` son el tramo real de la
   * convocatoria y se enseñan siempre junto al número.
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
  { id: "asturias", nombre: "Asturias", cobertura: TRAMO_GENERICO, programa: null, nota: "Sin convocatoria de IA específica abierta: la vía son los programas de I+D de SEKUENS (45-60 %) y los cheques de innovación, con ediciones 2026 ya cerradas." },
  { id: "baleares", nombre: "Islas Baleares", cobertura: TRAMO_GENERICO, programa: "INNOBAL (innovación y digitalización de pymes)", nota: "Convocatoria anual con fondos FEDER para pymes (innovación y digitalización); la edición 2026 se cerró en abril y la siguiente ventana apunta a diciembre-enero." },
  { id: "canarias", nombre: "Canarias", cobertura: { min: 100, max: 100, tipica: 100 }, programa: "Digiempresas · digitalización de empresas", nota: "Hasta 25.000 € por solicitud (mínimo 5.000 €) e intensidad del 100 % del gasto elegible en la edición 2026, con la IA entre las categorías. Cerrada en abril; sin nueva edición publicada." },
  { id: "cantabria", nombre: "Cantabria", cobertura: TRAMO_GENERICO, programa: null },
  { id: "castilla-la-mancha", nombre: "Castilla-La Mancha", cobertura: TRAMO_GENERICO, programa: "Adelante Inversión (FIE)", nota: "Ayudas a la inversión y mejora de la productividad para pymes, abiertas hasta el 15 de marzo de 2027; software y aplicaciones informáticas elegibles; inversión desde 5.000 €." },
  { id: "castilla-y-leon", nombre: "Castilla y León", cobertura: TRAMO_GENERICO, programa: null },
  { id: "cataluna", nombre: "Cataluña", cobertura: TRAMO_GENERICO, programa: "Cupones IA (ACCIÓ)", nota: "Cupón de 8.000 € por proyecto. Edición 2026 cerrada por presupuesto agotado; pendiente de nueva convocatoria." },
  { id: "ceuta", nombre: "Ceuta", cobertura: TRAMO_GENERICO, programa: null },
  { id: "extremadura", nombre: "Extremadura", cobertura: { min: 85, max: 85, tipica: 85 }, programa: "Ayudas IA para pymes (Decreto 173/2025)", nota: "85 % de la inversión subvencionable, hasta 100.000 € por empresa; la consultoría de terceros se subvenciona hasta 15.000 €. Edición 2026 resuelta; pendiente nueva convocatoria." },
  { id: "galicia", nombre: "Galicia", cobertura: { min: 80, max: 80, tipica: 80 }, programa: "Reacciona (IG402A)", nota: "80 % del importe del servicio (el cliente paga el 20 % + IVA). Máximo dos servicios por empresa, sin repetir tipo, y exige plantilla media de al menos 3 trabajadores. Plazo ampliado hasta el 16 de noviembre de 2026." },
  { id: "la-rioja", nombre: "La Rioja", cobertura: { min: 50, max: 70, tipica: 50 }, programa: "Ayudas ADER a la digitalización", nota: "Hasta 20.000 €. El 70 % aplica a ciberseguridad. La justificación con facturas pagadas se presenta con la solicitud; plazo abierto hasta el 12 de febrero de 2027." },
  { id: "madrid", nombre: "Comunidad de Madrid", cobertura: { min: 50, max: 60, tipica: 60 }, programa: "Casos de uso de IA (Orden 145/2025)", nota: "50 % para mediana empresa y 60 % para pequeña o micro; hasta 200.000 € por empresa. Convocatoria 2025 dentro del PRTR; sin edición 2026 publicada." },
  { id: "melilla", nombre: "Melilla", cobertura: TRAMO_GENERICO, programa: null },
  { id: "murcia", nombre: "Región de Murcia", cobertura: TRAMO_GENERICO, programa: null },
  { id: "navarra", nombre: "Navarra", cobertura: { min: 35, max: 45, tipica: 35 }, programa: "Fomento de la Empresa Digital 2026", nota: "35-45 % para implantación (máximo 30.000 €; 80 % si es el plan de transformación digital, hasta 15.000 €). El gasto debe estar terminado y abonado antes de solicitar; plazo hasta el 6 de noviembre de 2026." },
  { id: "pais-vasco", nombre: "País Vasco", cobertura: { min: 60, max: 60, tipica: 60 }, programa: "SPRI · Inteligencia Artificial 2026", nota: "60 % del gasto elegible, máximo 100.000 € por empresa y año. Solicitud previa: se presenta antes del 2 de noviembre y la ejecución puede ir hasta 12 meses después." },
  { id: "valencia", nombre: "Comunidad Valenciana", cobertura: { min: 35, max: 60, tipica: 45 }, programa: "Desarrollo experimental en IA y espacios de datos", nota: "35-60 % según tamaño y modalidad (45 % en pequeña empresa; hasta 60 % con difusión o cooperación). Convocatoria 2024/2025 del PRTR; pendiente nueva edición." },
];

export const COMUNIDAD_POR_DEFECTO = "galicia";

export function buscarComunidad(id: string): Comunidad {
  return COMUNIDADES.find((c) => c.id === id) ?? COMUNIDADES[0];
}
