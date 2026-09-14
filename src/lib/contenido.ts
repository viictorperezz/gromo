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
  promesa: "IA aplicada para pymes que no son de tecnología",
  dominio: "gromo.es",
  email: "hola@gromo.es",
} as const;

export const NAV = [
  { href: "#problema", texto: "El problema" },
  { href: "#que-hago", texto: "Qué automatizo" },
  { href: "#como", texto: "Cómo funciona" },
  { href: "#ayudas", texto: "Las ayudas" },
  { href: "#faq", texto: "Preguntas" },
] as const;

export const HERO = {
  antetitulo: "Automatización e IA para pymes",
  titulo: "Te quito de encima el trabajo manual que no deja margen",
  destacado: "trabajo manual",
  entrada:
    "Presupuestos, pedidos, documentación, reporting. Automatizo el proceso que más horas te come, con precio cerrado y una métrica antes y después. Si no veo ahorro claro, te lo digo y no hacemos nada.",
  ctaPrincipal: "Pide tu diagnóstico gratis",
  ctaSecundario: "Ver cómo funciona",
  apunte:
    "Proyecto tipo: 60 horas tope, 5.000 € + IVA. Según tu comunidad, las ayudas públicas a la digitalización cubren entre el 50 % y el 80 %, así que el coste neto suele quedar entre 1.000 € y 2.500 €.",
} as const;

export const VIDEO = {
  pausar: "Pausar vídeo",
  reanudar: "Reanudar vídeo",
} as const;

export const PROBLEMA = {
  antetitulo: "El problema",
  titulo: "El cuello de botella no es la tecnología. Son las horas.",
  entrada:
    "En la mayoría de pymes industriales y de servicios hay dos o tres procesos que se comen el día de alguien con mejores cosas que hacer. Se aguantan porque siempre se hicieron así.",
  puntos: [
    {
      titulo: "Se pasa a mano lo que ya está escrito",
      texto:
        "Datos que viajan de un PDF a un Excel y del Excel al ERP. Cada salto es una hora y una ocasión de equivocarse.",
    },
    {
      titulo: "El presupuesto tarda días",
      texto:
        "Y cuando sale, el cliente ya ha pedido otros dos. La velocidad de respuesta decide más ventas de las que parece.",
    },
    {
      titulo: "Nadie sabe el número hasta fin de mes",
      texto:
        "El reporting se monta a mano, tarde, y para entonces la decisión ya se tomó a ojo.",
    },
    {
      titulo: "Todo depende de una persona",
      texto:
        "Si esa persona se va de vacaciones, el proceso se para. Eso no es un equipo, es un riesgo.",
    },
  ],
} as const;

export const SERVICIOS = {
  antetitulo: "Qué automatizo",
  titulo: "Procesos concretos, no promesas",
  entrada:
    "No vendo «IA». Vendo un proceso tuyo funcionando solo. Estos son los que mejor salen en una pyme que no es tecnológica.",
  items: [
    {
      titulo: "Presupuestos y ofertas",
      texto:
        "De la petición del cliente al presupuesto listo para revisar. Lees el correo o el pliego, sale el documento con tus precios y tus condiciones.",
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
      titulo: "Diagnóstico de 45 minutos",
      texto:
        "Sin coste y sin compromiso. Miramos dos o tres procesos, calculamos horas y euros, y te digo si hay proyecto o no lo hay.",
      apunte: "Gratis",
    },
    {
      n: "02",
      titulo: "Propuesta de una página",
      texto:
        "El problema con su número, qué voy a hacer, cómo mediremos que funcionó, el precio cerrado y el calendario. Una página, sin letra pequeña.",
      apunte: "En 48 horas",
    },
    {
      n: "03",
      titulo: "Ejecución con tope de horas",
      texto:
        "60 horas tope por escrito. Necesito una o dos horas tuyas y acceso a lo imprescindible; el resto lo hago yo. Si me paso de horas, es mi problema, no tu factura.",
      apunte: "60 h tope",
    },
    {
      n: "04",
      titulo: "Entrega, medición y papeleo",
      texto:
        "Te lo dejo funcionando, medimos contra el número de partida y preparo la documentación de la ayuda. Tú firmas.",
      apunte: "Papeleo incluido",
    },
  ],
} as const;

export const AYUDAS = {
  antetitulo: "Las ayudas",
  titulo: "La cuenta que importa",
  entrada:
    "Casi todas las comunidades tienen ayudas a la digitalización de pymes. Cambian el nombre, el porcentaje y el plazo, pero el mecanismo es el mismo: tú pagas el proyecto y la administración te devuelve una parte.",
  /** Precio del proyecto tipo, sin IVA. */
  base: 5000,
  /** Tramos habituales de cobertura en las convocatorias autonómicas. */
  coberturas: [50, 60, 70, 80],
  coberturaPorDefecto: 70,
  notas: [
    "Los importes son sin IVA. El IVA no suele ser subvencionable.",
    "El circuito habitual: el gasto tiene que estar hecho y pagado antes de solicitar. Por eso el calendario importa tanto como el precio.",
    "Preparo las tres ofertas, la memoria técnica y la justificación. Tú firmas y presentas.",
    "No todas las empresas encajan: hay exclusiones por actividad, por tamaño y por ayudas ya recibidas. Lo compruebo antes de que pierdas el tiempo.",
  ],
  territorio:
    "Trabajo en toda España. En Galicia y La Rioja conozco las convocatorias al detalle porque llevo tiempo siguiéndolas; en el resto de comunidades reviso la tuya antes de la reunión.",
} as const;

export const PORQUE = {
  antetitulo: "Por qué Gromo",
  titulo: "Pocos clientes, muy bien cuidados",
  items: [
    {
      titulo: "Hablo de margen, no de algoritmos",
      texto:
        "Formación en economía y en business intelligence. La conversación va de horas, errores y euros. La tecnología es el medio, no el tema.",
    },
    {
      titulo: "Precio cerrado, y pequeño",
      texto:
        "5.000 € con tope de horas por escrito; con la ayuda se queda entre 1.000 € y 2.500 €. Sin presupuestos sorpresa a mitad de proyecto: es el tamaño que las consultoras grandes no quieren coger.",
    },
    {
      titulo: "El papeleo va incluido",
      texto:
        "Las tres ofertas, la memoria y la justificación las preparo yo. De ellas depende que cobres la ayuda, así que no se dejan a medias.",
    },
    {
      titulo: "Hablas siempre con quien lo hace",
      texto:
        "La persona que te hace el diagnóstico es la que escribe el código y la que te responde el teléfono. Sin juniors ni capas.",
    },
    {
      titulo: "Se mide o no es un proyecto",
      texto:
        "Antes de empezar fijamos el número: horas al mes, errores, días de ciclo. Al terminar se vuelve a medir. Si no se puede medir, te lo digo.",
    },
    {
      titulo: "Un proyecto cada vez",
      texto:
        "No cojo cinco a la vez para ir regular en todos. Cuando trabajo contigo, trabajo contigo.",
    },
  ],
} as const;

export const FAQ = {
  antetitulo: "Preguntas",
  titulo: "Lo que suelen preguntarme",
  items: [
    {
      p: "No tengo tiempo para meterme en esto.",
      r: "Justo por eso. El diagnóstico son 45 minutos y el proyecto sale con una o dos horas tuyas en total; el resto lo ejecuto yo. Si el proceso te come cuatro horas a la semana, el cálculo se hace solo.",
    },
    {
      p: "5.000 € me parece caro.",
      r: "Sería caro si lo pagaras entero. Con una ayuda del 50 % al 80 % el coste neto queda entre 1.000 € y 2.500 €. Y en el diagnóstico calculamos cuántas horas al año ahorra, para que compares con un número y no con una sensación.",
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
      r: "A mí también, tal y como se vende. Por eso aquí no hay demos genéricas: en el diagnóstico miramos un proceso tuyo y, si hace falta, te enseño la pieza funcionando antes de que firmes nada.",
    },
    {
      p: "Mi empresa es pequeña para esto.",
      r: "Está pensado exactamente para ese tamaño. Proyectos de 60 horas, precio cerrado y un resultado medible en semanas, no programas de transformación a dos años.",
    },
    {
      p: "¿Quién está detrás de Gromo?",
      r: "Un proyecto pequeño y personal, no una consultora. Formación en economía y business intelligence, y experiencia en el sector. Verás la cara y el nombre en el diagnóstico; en la web prefiero que hablen las condiciones.",
    },
    {
      p: "¿Y si la ayuda no sale?",
      r: "Antes de la propuesta compruebo que encajas: actividad, tamaño, plazos y ayudas que ya hayas recibido. Si veo que no encaja, te lo digo antes de que gastes. Aun así, la concesión la decide la administración, no yo.",
    },
  ],
} as const;

export const CONTACTO = {
  antetitulo: "Siguiente paso",
  titulo: "Cuéntame qué proceso te come las horas",
  entrada:
    "Escríbeme y te propongo una sesión de 45 minutos sin coste. Miramos dos o tres procesos y sales sabiendo qué se puede automatizar, cuánto ahorrarías y si hay una ayuda que encaje. Si no la hay, también te lo digo.",
  garantias: [
    "Sin coste y sin compromiso",
    "45 minutos, por videollamada o teléfono",
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
