/**
 * Todos los textos de la web, en un sitio.
 *
 * Reglas que NO se rompen (ver docs/brand/GROMO-BRIEF.md §3 y §5):
 *  - Nunca escribir "5.000 €" sin decir en la misma frase lo que queda con ayuda.
 *  - Nada de casos, testimonios, logos de clientes ni cifras agregadas: aún no los hay.
 *  - Sin nombre propio ni foto: la marca habla, la persona no.
 *  - Prohibido "sinergias", "disrupción", "transformación digital 360".
 */

export const MARCA = {
  nombre: "Gromo",
  promesa: "Automatización a medida para pymes que no son de tecnología",
  /** Única pincelada de la metáfora en el cuerpo de la web (ver MARCA.md §7). */
  significado:
    "Gromo significa brote: que tu negocio crezca sin que crezca el trabajo manual.",
  dominio: "gromo.es",
  email: "hola@gromo.es",
} as const;

/**
 * Botón de la barra fija. Dice «agendar» igual que el hero y que la propia
 * sección de contacto: antes la misma acción tenía cinco nombres distintos por
 * la página y parecían cosas diferentes.
 */
export const CTA_BARRA = "Agendar diagnóstico";

export const NAV = [
  { href: "#problema", texto: "El problema" },
  { href: "#que-hago", texto: "Qué automatizo" },
  { href: "#como", texto: "Cómo funciona" },
  { href: "#ayudas", texto: "Las ayudas" },
  { href: "#faq", texto: "Preguntas" },
] as const;

export const HERO = {
  titulo:
    "Automatizo el trabajo que te come las horas. A medida, hecho para ti y tus procesos.",
  /** Tiene que ser literal un trozo de `titulo`: Hero.tsx parte por él. */
  destacado: "hecho para ti y tus procesos",
  entrada:
    "Cuando empiezo tu proyecto no tengo otro abierto: lo llevo yo personalmente, de principio a fin, hasta que lo damos por cerrado. Lo adapto a tus procesos, con precio cerrado y una métrica antes y después para medir resultados.",
  ctaPrincipal: "Agenda tu diagnóstico gratis",
  ctaSecundario: "Ver cómo funciona",
  /**
   * Una frase por línea, todas de largo parecido para que la lista tenga ritmo.
   * El orden importa: primero lo que acabas pagando, después de dónde sale ese
   * número. El precio y la ayuda van en la MISMA frase, unidos por «pero»:
   * los 5.000 € no se enseñan nunca solos. La primera línea es el gancho y se
   * pinta distinta en Hero.tsx; si se reordena la lista, se rompe eso.
   */
  apunte: [
    // Espacios que no se parten entre cifra y €: si no, el «€.» caía solo
    // en la línea de abajo.
    "Un proyecto entero suele acabar costándote entre 1.000 € y 2.500 €.",
    "El precio son 5.000 € + IVA, pero las ayudas públicas a la digitalización subvencionan entre el 50 % y el 80 %, según tu comunidad.",
    "Los trámites de la ayuda van incluidos.",
    "Y si prefieres no depender de una ayuda, también se puede hacer como proyecto privado.",
  ],
} as const;

export const VIDEO = {
  pausar: "Pausar animación",
  reanudar: "Reanudar animación",
} as const;

export const PROBLEMA = {
  antetitulo: "El problema",
  titulo: "El cuello de botella no es la tecnología. Son las horas.",
  entrada:
    "En casi todas las pymes hay dos o tres procesos que se comen el día de alguien que debería estar en otra cosa. Se aguantan porque siempre se hicieron así y porque arreglarlos nunca llega a ser lo urgente: siempre hay algo que entregar antes.",
  puntos: [
    {
      titulo: "Se pasa todo a mano",
      texto:
        "Datos que viajan de un PDF a un Excel y del Excel al ERP. Cada salto cuesta una hora y abre la puerta a un error.",
    },
    {
      titulo: "El presupuesto tarda días",
      texto:
        "Y cuando sale, el cliente ya ha pedido otros dos. La velocidad de respuesta decide más ventas de las que parece.",
    },
    {
      titulo: "Las mismas preguntas, una y otra vez",
      texto:
        "Precios, plazos, disponibilidad: clientes y comerciales preguntan lo mismo cada día, y alguien lo contesta a mano.",
    },
    {
      titulo: "El papeleo que entra por la puerta",
      texto:
        "Facturas, albaranes, certificados. Alguien los revisa y los teclea en lugar de producir. Es trabajo real, aunque no se vea en la factura.",
    },
    {
      titulo: "Nadie sabe el número hasta fin de mes",
      texto:
        "El reporting se monta a mano, tarde, y para entonces la decisión ya se tomó a ojo.",
    },
    {
      titulo: "Tienes los datos, pero no te dicen nada",
      texto:
        "Todo queda registrado en algún sitio: albaranes, hojas de cálculo, correos. Pero nadie puede cruzarlo, así que no se sabe qué cliente deja margen de verdad, dónde se atasca cada pedido ni por qué este mes fue peor. Se decide con la intuición del que más tiempo lleva.",
    },
  ],
} as const;

export const SERVICIOS = {
  antetitulo: "Qué automatizo",
  titulo: "Procesos concretos, no promesas",
  entrada:
    "No vendo «IA»: vendo un proceso tuyo funcionando solo. Estos seis son ejemplos, no un catálogo. Los pongo porque los conozco por dentro y para que veas de qué tipo de trabajo hablamos, pero lo que se automatiza en tu empresa sale del diagnóstico, no de esta lista.",
  /** Cierra la sección para que la lista no se lea como un menú cerrado. */
  cierre:
    "¿No ves el tuyo aquí? Es lo normal: cada empresa se atasca en un sitio distinto. Cuéntamelo en el diagnóstico y te digo si compensa automatizarlo.",
  items: [
    {
      titulo: "Presupuestos y ofertas",
      texto:
        "Tu histórico de presupuestos, ordenado y trabajando: las ofertas nuevas se montan semiautomáticas a partir de lo que ya has hecho y de tus condiciones de siempre. Tú revisas, ajustas y envías.",
    },
    {
      titulo: "Pedidos y albaranes",
      texto:
        "Entrada automática de pedidos desde correo, PDF o portal del cliente al sistema, con validación de lo que no cuadra.",
    },
    {
      titulo: "Documentación técnica",
      texto:
        "Fichas, certificados, memorias y manuales que se generan solos a partir de los datos que ya tienes.",
    },
    {
      titulo: "Atención y consultas",
      texto:
        "Respuestas a las preguntas repetidas de clientes o comerciales, con la información real de tu catálogo, no inventada.",
    },
    {
      titulo: "Reporting y cuadros de mando",
      texto:
        "El número que necesitas, actualizado solo. Margen por producto, desvíos, cartera. Sin montar el Excel cada mes.",
    },
    {
      titulo: "Trazabilidad y control",
      texto:
        "Registro automático de lo que pasa en producción o en almacén, para que auditorías y reclamaciones dejen de doler.",
    },
  ],
} as const;

export const PASOS = {
  antetitulo: "Cómo funciona",
  titulo: "Cuatro pasos y sabes a qué atenerte desde el primero",
  items: [
    {
      n: "01",
      titulo: "Diagnóstico de 30 minutos",
      texto:
        "Sin coste y sin compromiso. Miramos dos o tres procesos, calculamos horas y euros, y te decimos si hay proyecto o no lo hay.",
      apunte: "Gratis",
    },
    {
      n: "02",
      titulo: "Propuesta de una página",
      texto:
        "En 48 horas te enviamos la propuesta: el problema con su número, qué vamos a hacer, cómo mediremos que funcionó, el precio cerrado y el calendario. Todo a la vista y en una página: no hay letra pequeña ni partidas que aparezcan después.",
      apunte: "En 48 horas",
    },
    {
      n: "03",
      titulo: "Ejecución del proyecto",
      texto:
        "Una vez todo firmado, empezamos a trabajar. Necesitamos una o dos horas tuyas y acceso a lo imprescindible. Las reuniones de seguimiento quedan fijadas desde el principio, así que siempre sabes por dónde va el proyecto.",
      apunte: "Normalmente 80 h",
    },
    {
      n: "04",
      titulo: "Entrega, medición y papeleo",
      texto:
        "Te lo entregamos funcionando y medimos con los mismos indicadores del principio: cómo iba antes y cómo va ahora. La documentación de la ayuda la preparamos nosotros entera. Tú solo firmas.",
      apunte: "Papeleo incluido",
    },
  ],
  /**
   * Del hero a «Las ayudas» había tres secciones seguidas sin un solo botón.
   * Aquí es donde el lector acaba de entender el proceso y piensa «¿y ahora?».
   */
  cierre: "Cuatro pasos, y el primero son 30 minutos que no cuestan nada.",
  cta: "Agenda tu diagnóstico",
} as const;

export const AYUDAS = {
  antetitulo: "Las ayudas",
  titulo: "La cuenta que importa",
  entrada:
    "Casi todas las comunidades tienen ayudas a la digitalización de pymes. Cambian el nombre, el porcentaje y el plazo, pero el mecanismo es el mismo: tú pagas el proyecto y la administración te devuelve una parte.",
  /** Precio del proyecto tipo, sin IVA. */
  base: 5000,
  /**
   * Los tramos de cobertura ya no viven aquí: dependen de la comunidad y los
   * sirve `lib/ayudas-mock.ts` (hoy datos de prueba, mañana el backend).
   */
  notas: [
    "Los importes son sin IVA. El IVA no suele ser subvencionable.",
    "El circuito habitual: el gasto tiene que estar hecho y pagado antes de solicitar. Por eso el calendario importa tanto como el precio.",
    "Preparo las tres ofertas, la memoria técnica y la justificación. Tú firmas y presentas.",
    "No todas las empresas encajan: hay exclusiones por actividad, por tamaño y por ayudas ya recibidas. Lo compruebo antes de que pierdas el tiempo.",
  ],
} as const;

/**
 * Esta sección era un resumen de la página (precio cerrado, papeleo, medición,
 * un proyecto cada vez): cuatro de seis puntos repetían cosas ya dichas en el
 * hero, en los pasos y en las ayudas. Ahora hace el único trabajo que no hacía
 * nadie: la comparación con la alternativa real, que son consultoras y
 * agencias de IA.
 *
 * Se comparan DOS MODELOS, no empresas concretas, y sin decir que el otro sea
 * malo: es más honesto, no se puede desmentir, y en una web que presume de no
 * vender humo, atacar al de al lado resta. El cierre reconoce en voz alta
 * cuándo el otro modelo es el bueno.
 */
export const PORQUE = {
  titulo: "Un proyecto cada vez. Ahora mismo, el tuyo.",
  /** Dos párrafos: la segunda frase es la que abre la tabla, y sola pesa más. */
  entrada: [
    "La alternativa suele ser una consultora o una agencia de IA. No son peores: son otra cosa, con otro tamaño y otra forma de trabajar.",
    "Esto es lo que cambia en el día a día.",
  ],
  columnas: {
    otros: "Una consultora o una agencia",
    gromo: "Gromo",
  },
  filas: [
    {
      tema: "Cuántos proyectos a la vez",
      otros:
        "Varios en paralelo. El tuyo avanza cuando le toca turno dentro de la carga del equipo.",
      gromo:
        "Uno. Si estoy acabando otro, te doy la fecha de inicio en el diagnóstico: puede ser en dos semanas o en un mes, pero es una fecha, no una lista de espera. Y cuando empieza el tuyo, no hay otro abierto.",
    },
    {
      tema: "Con quién hablas",
      otros:
        "Un comercial te vende, un jefe de proyecto te coordina y otra persona ejecuta. Lo que cuentas pasa por tres manos.",
      gromo:
        "Con quien lo hace. La misma persona que entiende tus procesos escribe el código, monta la IA donde hace falta, lo ajusta a vuestra forma de trabajar y coge el teléfono cuando llamas.",
    },
    {
      tema: "Cuándo se da por bueno",
      otros:
        "Cuando se entrega lo que ponía en el contrato. El alcance es el objetivo.",
      gromo:
        "Cuando el número se mueve. Fijamos horas, errores o días de ciclo antes de empezar, y al terminar se vuelve a medir.",
    },
    {
      tema: "Si el proyecto no compensa",
      otros:
        "Hay una propuesta que hacer y una facturación que cumplir, así que casi siempre hay algo que vender.",
      gromo:
        "Te lo digo en el diagnóstico y no cobro nada. Prefiero perder una reunión que entregar algo que no aporta.",
    },
  ],
} as const;

export const FAQ = {
  antetitulo: "Preguntas",
  titulo: "Lo que suelen preguntarme",
  /** El FAQ cierra la página: sin esta salida, quien resuelve su duda aquí se
   *  queda mirando el pie con el único botón de la barra fija. */
  cierre: "¿Tu duda no está aquí? Pregúntamela en el diagnóstico.",
  cta: "Agenda tu diagnóstico",
  items: [
    {
      p: "No tengo tiempo para meterme en esto.",
      r: "Justo por eso. El diagnóstico son 30 minutos, y durante el proyecto necesito poco de ti: un par de horas al principio para entender bien el proceso y alguna reunión corta de seguimiento, fijada de antemano, para enseñarte por dónde va y que me corrijas si me desvío. El resto lo ejecuto yo. Si ese proceso te come cuatro horas a la semana, el cálculo se hace solo.",
    },
    {
      p: "¿Cuánto acaba costándome a mí?",
      r: "Entre 1.000 € y 2.500 €. El proyecto son 5.000 € + IVA, pero las ayudas a la digitalización subvencionan entre el 50 % y el 80 % según tu comunidad, y los trámites los llevo yo. Si la administración no la concede con el proyecto ya hecho, la diferencia la asumo yo. Y en el diagnóstico calculamos cuántas horas al año te ahorra, para que lo compares con un número y no con una sensación.",
    },
    {
      p: "¿Y si en mi caso esto no sirve?",
      r: "Te lo digo y no hacemos nada. Por eso el diagnóstico es gratis: es tan útil cerrar un no rápido como abrir un sí. Prefiero perder una reunión que entregar un proyecto que no aporta.",
    },
    {
      p: "Ya tengo informático, o una asesoría.",
      r: "No vengo a sustituirlos. Me ocupo del proyecto técnico concreto y les dejo la documentación hecha. Trabajar con quien ya conoce tu casa hace el proyecto más rápido, no más lento.",
    },
    {
      p: "La IA me suena a humo.",
      r: "A mí también, tal y como se vende por ahí. Por eso aquí no se empieza por la tecnología, se empieza por tu proceso. A veces la solución lleva IA y a veces es ingeniería de datos pura y dura: conectar sistemas que no se hablan, ordenar la información y dejar el flujo trazable de principio a fin, de modo que puedas auditar qué pasó y cuándo. La herramienta se elige después, según lo que haga falta. Y no hay demos genéricas: en el diagnóstico miramos un proceso tuyo y, si hace falta, te enseño la pieza funcionando antes de que firmes nada.",
    },
    {
      p: "Mi empresa es pequeña para esto.",
      r: "Está pensado exactamente para ese tamaño. Proyectos de 80 horas, precio cerrado y un resultado medible en semanas, no programas de transformación a dos años.",
    },
    {
      p: "¿Quién está detrás de Gromo?",
      r: "Un proyecto personal, no una consultora: detrás hay una sola persona, y te pongo cara y nombre en el diagnóstico. Vengo del negocio y de los datos: grado en Economía y máster en Business Intelligence, y más de cinco proyectos de digitalización y automatización llevados a producción. En la práctica eso significa dos cosas: que cuando hablamos de márgenes, de horas o de por qué un proceso cuesta lo que cuesta, entiendo de qué va; y que quien se sienta contigo en el diagnóstico es quien va a montarlo y quien te va a coger el teléfono después.",
    },
    {
      p: "¿Y si ahora mismo estás con otro proyecto?",
      r: "Entonces te digo cuándo empieza el tuyo. A veces son dos semanas, a veces un mes. El diagnóstico lo hacemos igual y sales sabiendo qué se automatizaría, cuánto ahorra y qué día se arranca; así el calendario de la ayuda también cuadra. Prefiero darte una fecha antes que cogerte ya y atenderte a medias.",
    },
    {
      p: "¿Y si la ayuda no sale?",
      r: "Antes de la propuesta compruebo que encajas: actividad, tamaño, plazos y ayudas que ya hayas recibido. Si veo que no encaja, te lo digo antes de que gastes. Y si aun así la administración no la concede con el proyecto ya hecho, la parte no subvencionada la asumo yo: pagas el neto que figuraba en la propuesta y la diferencia la pongo yo. El riesgo de la convocatoria no es tuyo.",
    },
  ],
} as const;

export const CONTACTO = {
  antetitulo: "Siguiente paso",
  titulo: "Cuéntame qué proceso te come las horas",
  entrada:
    "Escríbeme y te propongo una sesión de 30 minutos sin coste. Miramos dos o tres procesos y sales sabiendo qué se puede automatizar, cuánto ahorrarías y si hay una ayuda que encaje. Si no la hay, también te lo digo.",
  /**
   * Hueco para el calendario (Cal.com o similar). Todavía NO está conectado:
   * se pinta como bloque desactivado y con la etiqueta a la vista, para no
   * enseñar un botón que no hace nada.
   *
   * Al conectarlo: incrustar el calendario donde está la marca en
   * Contacto.tsx, quitar `estado` y configurarlo a nombre de Gromo, SIN nombre
   * propio ni foto (ver HANDOFF-TEXTOS-WEB.md §2.3), revisando también el
   * nombre que sale en la invitación del calendario.
   */
  agenda: {
    titulo: "Agenda tu diagnóstico",
    texto: "Elige día y hora y te llega la invitación al correo.",
    /**
     * Maqueta: lunes a viernes con horario de oficina, como cualquier página
     * de reservas. Los huecos reales los marcará el calendario cuando se
     * conecte, no esta lista.
     */
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    horas: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
    ],
    duracion: "30 min",
  },
  garantias: [
    "Sin coste y sin compromiso",
    "30 minutos, por videollamada o teléfono",
    "Respondo en menos de 24 horas laborables",
  ],
} as const;

export const LEGAL = {
  /** Se rellena el día del alta como autónomo. Ver docs/brand/GROMO-BRIEF.md §5. */
  titular: "PENDIENTE",
  nif: "PENDIENTE",
  domicilio: "PENDIENTE",
  actualizado: "PENDIENTE",
} as const;
