/**
 * Tipos y estado inicial del formulario.
 *
 * Vive aquí y no junto a la acción porque un módulo "use server" solo puede
 * exportar funciones asíncronas: cualquier otro valor llega como `undefined`
 * al componente cliente.
 */

export type CampoContacto =
  | "cita"
  | "empresa"
  | "nombre"
  | "email"
  | "telefono"
  | "proceso";

export interface EstadoContacto {
  ok: boolean;
  mensaje: string;
  errores: Partial<Record<CampoContacto, string>>;
}

export const ESTADO_INICIAL: EstadoContacto = {
  ok: false,
  mensaje: "",
  errores: {},
};
