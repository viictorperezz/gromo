"use server";

import type { EstadoContacto } from "@/lib/contacto";
import { MARCA } from "@/lib/contenido";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function texto(datos: FormData, campo: string): string {
  const v = datos.get(campo);
  return typeof v === "string" ? v.trim() : "";
}

export async function enviarContacto(
  _previo: EstadoContacto,
  datos: FormData,
): Promise<EstadoContacto> {
  // Trampa antispam: campo oculto que una persona nunca rellena.
  if (texto(datos, "web").length > 0) {
    return { ok: true, mensaje: "Recibido. Te contesto en menos de 24 h laborables.", errores: {} };
  }

  const empresa = texto(datos, "empresa");
  const nombre = texto(datos, "nombre");
  const email = texto(datos, "email");
  const telefono = texto(datos, "telefono");
  const proceso = texto(datos, "proceso");

  const errores: EstadoContacto["errores"] = {};
  if (empresa.length < 2) errores.empresa = "Dime el nombre de la empresa.";
  if (nombre.length < 2) errores.nombre = "Dime cómo te llamas.";
  if (!EMAIL.test(email)) errores.email = "Ese correo no parece válido.";
  if (telefono.length > 0 && telefono.replace(/\D/g, "").length < 9) {
    errores.telefono = "El teléfono parece incompleto.";
  }
  if (proceso.length < 15) {
    errores.proceso = "Cuéntame un poco más: qué proceso y cuánto tiempo os lleva.";
  }

  if (Object.keys(errores).length > 0) {
    return { ok: false, mensaje: "Revisa los campos marcados.", errores };
  }

  const cuerpo = [
    `Empresa:  ${empresa}`,
    `Nombre:   ${nombre}`,
    `Email:    ${email}`,
    `Teléfono: ${telefono || "(no indicado)"}`,
    "",
    "Proceso:",
    proceso,
  ].join("\n");

  const clave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_DESTINO ?? MARCA.email;

  // Sin clave configurada el formulario no puede entregar nada. Se dice claro
  // en vez de fingir un envío correcto.
  if (!clave) {
    console.warn("[contacto] Falta RESEND_API_KEY. Solicitud no enviada:\n" + cuerpo);
    return {
      ok: false,
      mensaje:
        "El formulario todavía no está conectado al correo. Escríbeme directamente a " +
        MARCA.email +
        " y te contesto igual.",
      errores: {},
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clave}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACTO_REMITENTE ?? `Gromo <web@${MARCA.dominio}>`,
        to: [destino],
        reply_to: email,
        subject: `Diagnóstico solicitado — ${empresa}`,
        text: cuerpo,
      }),
    });

    if (!res.ok) {
      console.error("[contacto] Resend respondió", res.status, await res.text());
      return {
        ok: false,
        mensaje:
          "No he podido enviar el mensaje. Prueba otra vez o escríbeme a " + MARCA.email + ".",
        errores: {},
      };
    }
  } catch (e) {
    console.error("[contacto] Fallo de red al enviar", e);
    return {
      ok: false,
      mensaje:
        "No he podido enviar el mensaje. Prueba otra vez o escríbeme a " + MARCA.email + ".",
      errores: {},
    };
  }

  return {
    ok: true,
    mensaje: "Recibido. Te contesto en menos de 24 h laborables.",
    errores: {},
  };
}
