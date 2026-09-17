/* =========================================================
   BH CONSTRUCTORA
   SISTEMA DE BONOS DE VIVIENDA
   ========================================================= */

/*
   IMPORTANTE:

   Este archivo funciona como la base de datos local
   del catálogo de bonos.

   Para agregar un nuevo bono solamente debes agregar
   otro objeto dentro del arreglo "bonos".
*/

const bonos = [

  /* =====================================================
     1. BONO ORDINARIO
     ===================================================== */

  {
    id: 1,

    nombre: "Bono Ordinario",

    categoria: "Bono de vivienda",

    situacion:
      "Tengo un lote y quiero construir mi vivienda.",

    paraQuien:
      "Personas que ya cuentan con un lote y desean desarrollar su vivienda en él.",

    descripcion:
      "El Bono Ordinario está pensado para personas que cuentan con su propio lote y desean construir una vivienda en ese terreno. BH Constructora puede orientarte durante las diferentes etapas del proyecto.",

    imagen:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90",

    metros: "Consultar",

    habitaciones: "Según modelo",

    banos: "Según modelo",

    espacios: [
      "Sala",
      "Comedor",
      "Cocina",
      "Dormitorios",
      "Baño",
      "Área de lavandería"
    ],

    materiales: [
      "Bloques de concreto",
      "Estructura según diseño",
      "Cubierta de techo",
      "Piso cerámico según modelo",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ],

    caracteristicas: [
      "Construcción en lote propio",
      "Orientación durante el proceso",
      "Modelos de vivienda disponibles",
      "Distribución según proyecto"
    ],

    promocion: "cero-gastos",

    observaciones:
      "Las características finales, modelo, dimensiones y especificaciones deben confirmarse según las condiciones particulares del proyecto.",

    requisitos: [
      "Contar con un lote.",
      "Cumplir con las condiciones correspondientes al programa.",
      "Presentar la documentación requerida para el análisis del caso."
    ]
  },


  /* =====================================================
     2. BONO CRÉDITO
     ===================================================== */

  {
    id: 2,

    nombre: "Bono Crédito",

    categoria: "Financiamiento",

    situacion:
      "Necesito complementar el bono mediante financiamiento.",

    paraQuien:
      "Personas que requieren combinar el bono con un esquema de financiamiento y están sujetas al análisis crediticio correspondiente.",

    descripcion:
      "El Bono Crédito combina el beneficio de vivienda con un esquema de financiamiento. La posibilidad y condiciones del financiamiento dependen del análisis correspondiente.",

    imagen:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",

    metros: "Consultar",

    habitaciones: "Según modelo",

    banos: "Según modelo",

    espacios: [
      "Sala",
      "Comedor",
      "Cocina",
      "Dormitorios",
      "Baño",
      "Lavandería"
    ],

    materiales: [
      "Bloques de concreto",
      "Estructura según proyecto",
      "Cubierta de techo",
      "Piso cerámico",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ],

    caracteristicas: [
      "Posibilidad de complementar mediante financiamiento",
      "Análisis crediticio",
      "Asesoría sobre el proceso",
      "Opciones de vivienda según proyecto"
    ],

    promocion: "cero-gastos",

    observaciones:
      "El financiamiento y sus condiciones están sujetos al análisis y aprobación correspondiente.",

    requisitos: [
      "Cumplir con las condiciones correspondientes.",
      "Someterse al análisis crediticio cuando corresponda.",
      "Presentar la documentación requerida."
    ]
  },


  /* =====================================================
     3. BONO CLASE MEDIA
     ===================================================== */

  {
    id: 3,

    nombre: "Bono Clase Media",

    categoria: "Clase media",

    situacion:
      "Puedo complementar el bono con mis propios recursos o financiamiento.",

    paraQuien:
      "Personas que pueden complementar el bono mediante recursos propios o financiamiento, de acuerdo con las condiciones correspondientes.",

    descripcion:
      "Esta modalidad está orientada a personas que pueden complementar el beneficio de vivienda mediante recursos propios o financiamiento, según los requisitos y condiciones aplicables a cada caso.",

    imagen:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=90",

    metros: "Consultar",

    habitaciones: "Según modelo",

    banos: "Según modelo",

    espacios: [
      "Sala",
      "Comedor",
      "Cocina",
      "Dormitorios",
      "Baño",
      "Lavandería"
    ],

    materiales: [
      "Bloques de concreto",
      "Estructura según proyecto",
      "Techo",
      "Piso",
      "Puertas",
      "Ventanas",
      "Sistema eléctrico",
      "Sistema sanitario"
    ],

    caracteristicas: [
      "Complemento mediante recursos propios",
      "Posibilidad de financiamiento",
      "Opciones de vivienda",
      "Orientación personalizada"
    ],

    promocion: "cero-gastos",

    observaciones:
      "Las condiciones pueden variar según el perfil del solicitante y el proyecto.",

    requisitos: [
      "Cumplir con las condiciones correspondientes.",
      "Contar con los recursos o financiamiento necesarios.",
      "Presentar la documentación solicitada."
    ]
  },


  /* =====================================================
     4. BONO PATIO
     ===================================================== */

  {
    id: 4,

    nombre: "Bono Patio",

    categoria: "Bono de vivienda",

    situacion:
      "Quiero construir en el terreno de un familiar.",

    paraQuien:
      "Personas que desean desarrollar una vivienda en una parte del terreno perteneciente a un familiar, cumpliendo las condiciones correspondientes.",

    descripcion:
      "El Bono Patio contempla situaciones en las que una persona puede desarrollar su vivienda dentro del terreno de un familiar, siempre que se cumplan las condiciones correspondientes.",

    imagen:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=90",

    metros: "Consultar",

    habitaciones: "Según modelo",

    banos: "Según modelo",

    espacios: [
      "Sala",
      "Comedor",
      "Cocina",
      "Dormitorios",
      "Baño",
      "Área de lavandería"
    ],

    materiales: [
      "Bloques de concreto",
      "Estructura según diseño",
      "Cubierta de techo",
      "Piso cerámico",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ],

    caracteristicas: [
      "Construcción en terreno familiar",
      "Orientación durante el proceso",
      "Diseños funcionales",
      "Análisis de las condiciones del terreno"
    ],

    promocion: "cero-gastos",

    observaciones:
      "La posibilidad de desarrollar la solución habitacional debe revisarse según las condiciones particulares del terreno y del caso.",

    requisitos: [
      "Contar con la posibilidad de utilizar el terreno familiar.",
      "Cumplir con las condiciones correspondientes.",
      "Presentar la documentación necesaria."
    ]
  },


  /* =====================================================
     5. BONO ARTÍCULO 59
     ===================================================== */

  {
    id: 5,

    nombre: "Bono Art. 59",

    categoria: "Alta necesidad habitacional",

    situacion:
      "No tengo lote ni vivienda y necesito una solución habitacional.",

    paraQuien:
      "Personas y familias en condición de alta necesidad habitacional que requieren una solución de lote y vivienda, de acuerdo con las condiciones correspondientes.",

    descripcion:
      "El Bono Artículo 59 está orientado a personas en condición de alta necesidad habitacional que no cuentan con lote ni vivienda. En los casos correspondientes, la solución puede contemplar lote y vivienda.",

    imagen:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=90",

    metros: "Según solución",

    habitaciones: "Según modelo",

    banos: "Según modelo",

    espacios: [
      "Sala",
      "Comedor",
      "Cocina",
      "Dormitorios",
      "Baño",
      "Área de lavandería"
    ],

    materiales: [
      "Bloques de concreto",
      "Estructura según proyecto",
      "Cubierta de techo",
      "Piso cerámico",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ],

    caracteristicas: [
      "Solución habitacional",
      "Posibilidad de lote + vivienda según el caso",
      "Asesoría durante el proceso",
      "Promoción de regalías"
    ],

    promocion: "regalias",

    observaciones:
      "Los requisitos y condiciones deben verificarse para cada caso. Aplican restricciones.",

    requisitos: [

      "Contar con un lote buscado.",

      "El lote debe tener una medida entre 150 m² y 300 m².",

      "Valor del lote entre ¢4.000.000 y ¢10.000.000, dependiendo del sitio.",

      "Tener núcleo familiar conformado.",

      "No haber recibido bono de vivienda anteriormente.",

      "No poseer propiedades inscritas a su nombre.",

      "Ingreso familiar mensual máximo de ¢470.000.",

      "Disponibilidad para cubrir gastos administrativos aproximados entre ¢350.000 y ¢400.000.",

      "Los gastos administrativos indicados pueden incluir avalúo, traspaso, trabajo social, formalización y pólizas.",

      "Asesoría gratuita durante todo el proceso."
    ],

    gastos: [
      "Avalúo",
      "Traspaso",
      "Trabajo social",
      "Formalización",
      "Pólizas"
    ]
  },


  /* =====================================================
     6. BONO ADULTO MAYOR
     ===================================================== */

  {
    id: 6,

    nombre: "Bono Adulto Mayor",

    categoria: "Adulto mayor",

    situacion:
      "Soy una persona adulta mayor y necesito una solución de vivienda.",

    paraQuien:
      "Personas mayores de 65 años que cumplan con los requisitos correspondientes y no hayan recibido anteriormente un bono.",

    descripcion:
      "Esta modalidad está orientada a personas adultas mayores que necesitan una solución habitacional y cumplen con las condiciones correspondientes.",

    imagen:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=90",

    metros: "Consultar",

    habitaciones: "Según modelo",

    banos: "Según modelo",

    espacios: [
      "Sala",
      "Comedor",
      "Cocina",
      "Dormitorios",
      "Baño",
      "Lavandería"
    ],

    materiales: [
      "Bloques de concreto",
      "Estructura según proyecto",
      "Cubierta de techo",
      "Piso",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ],

    caracteristicas: [
      "Orientado a personas mayores de 65 años",
      "Diseños funcionales",
      "Orientación durante el proceso",
      "Promoción ₡0 gastos"
    ],

    promocion: "cero-gastos",

    observaciones:
      "La aplicación de esta modalidad depende del cumplimiento de los requisitos correspondientes.",

    requisitos: [
      "Ser mayor de 65 años.",
      "Cumplir con los requisitos correspondientes.",
      "No haber recibido anteriormente un bono de vivienda.",
      "Presentar la documentación requerida."
    ]
  },


  /* =====================================================
     7. BONO DE REPARACIÓN / RAMT
     ===================================================== */

  {
    id: 7,

    nombre: "Bono de Reparación / RAMT",

    categoria: "Reparación",

    situacion:
      "Ya tengo una casa, pero necesita reparación, ampliación o terminación.",

    paraQuien:
      "Personas que cuentan con una vivienda propia y necesitan realizar trabajos de reparación, ampliación, modificación o terminación, según las condiciones del programa.",

    descripcion:
      "El Bono de Reparación / RAMT está orientado a intervenir una vivienda existente mediante trabajos de reparación, ampliación, modificación o terminación, según las condiciones correspondientes.",

    imagen:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=90",

    metros: "Según vivienda",

    habitaciones: "Existentes",

    banos: "Según proyecto",

    espacios: [
      "Reparación",
      "Ampliación",
      "Modificación",
      "Terminación",
      "Mejoramiento de espacios"
    ],

    materiales: [
      "Materiales según intervención",
      "Bloques de concreto",
      "Estructura según proyecto",
      "Cubierta de techo",
      "Piso",
      "Puertas",
      "Ventanas",
      "Instalaciones según necesidad"
    ],

    caracteristicas: [
      "Reparación de vivienda",
      "Ampliación",
      "Modificación",
      "Terminación",
      "Evaluación de las necesidades del inmueble"
    ],

    promocion: "cero-gastos",

    observaciones:
      "El tipo de intervención y sus condiciones deben determinarse de acuerdo con las características de la vivienda y del proyecto.",

    requisitos: [
      "Contar con una vivienda propia.",
      "Determinar las necesidades de reparación, ampliación, modificación o terminación.",
      "Cumplir con las condiciones correspondientes.",
      "Presentar la documentación requerida."
    ]
  }

];


/* =========================================================
   CONFIGURACIÓN WHATSAPP
   ========================================================= */

const WHATSAPP_BH = "50662005747";


/* =========================================================
   GENERAR ENLACE WHATSAPP
   ========================================================= */

function whatsappBono(bono) {

  const mensaje =
    "Hola BH Constructora. " +
    "Deseo información sobre el " +
    bono.nombre +
    ". " +
    "Me gustaría conocer si puedo aplicar y cuáles serían los siguientes pasos.";

  return (
    "https://wa.me/" +
    WHATSAPP_BH +
    "?text=" +
    encodeURIComponent(mensaje)
  );
}


/* =========================================================
   CREAR TARJETA DE BONO
   ========================================================= */

function crearBonoCard(bono) {

  return `

    <article class="bono-card reveal">

      <div class="bono-image">

        <img
          src="${bono.imagen}"
          alt="${bono.nombre}"
          loading="lazy"
        >

        <span class="bono-tag">
          ${bono.categoria}
        </span>

      </div>


      <div class="bono-content">

        <span class="bono-card-label">
          ¿PARA QUIÉN ES?
        </span>

        <h3>
          ${bono.nombre}
        </h3>

        <p class="bono-situation">
          ${bono.situacion}
        </p>

        <p>
          ${bono.paraQuien}
        </p>


        <div class="bono-promo-mini ${bono.promocion}">

          ${
            bono.promocion === "regalias"

              ? `
                <strong>🎁 REGALÍAS</strong>
                <span>Beneficios promocionales para este bono</span>
              `

              : `
                <strong>₡0 GASTOS*</strong>
                <span>Promoción sujeta a condiciones</span>
              `
          }

        </div>


        <a
          class="btn btn-outline btn-small"
          href="bono.html?id=${bono.id}"
        >
          Conocer este bono
          <span>→</span>
        </a>

      </div>

    </article>

  `;
}


/* =========================================================
   MOSTRAR BONOS
   ========================================================= */

function mostrarBonos(lista) {

  const container =
    document.querySelector("#bonos-container");

  const empty =
    document.querySelector("#bonos-empty");

  if (!container) {
    return;
  }

  if (!lista.length) {

    container.innerHTML = "";

    if (empty) {
      empty.style.display = "block";
    }

    return;
  }

  if (empty) {
    empty.style.display = "none";
  }

  container.innerHTML =
    lista.map(crearBonoCard).join("");

  activarReveal();

}


/* =========================================================
   FILTROS
   ========================================================= */

function inicializarFiltrosBonos() {

  const search =
    document.querySelector("#bono-search");

  const category =
    document.querySelector("#bono-category");


  function filtrar() {

    const texto =
      search
        ? search.value.toLowerCase().trim()
        : "";


    const categoria =
      category
        ? category.value
        : "todos";


    const resultado =
      bonos.filter(bono => {

        const contenido = (

          bono.nombre +
          " " +
          bono.categoria +
          " " +
          bono.situacion +
          " " +
          bono.paraQuien

        ).toLowerCase();


        const coincideTexto =
          contenido.includes(texto);


        const coincideCategoria =
          categoria === "todos" ||
          bono.categoria === categoria;


        return coincideTexto && coincideCategoria;

      });


    mostrarBonos(resultado);

  }


  search?.addEventListener(
    "input",
    filtrar
  );


  category?.addEventListener(
    "change",
    filtrar
  );


  mostrarBonos(bonos);

}


/* =========================================================
   DETALLE DE BONO
   ========================================================= */

function cargarDetalleBono() {

  const detail =
    document.querySelector("#bono-detail");

  if (!detail) {
    return;
  }


  const params =
    new URLSearchParams(
      window.location.search
    );


  const id =
    Number(params.get("id")) || 1;


  const bono =
    bonos.find(
      item => item.id === id
    );


  if (!bono) {

    detail.innerHTML = `

      <div class="not-found">

        <h2>
          Bono no encontrado
        </h2>

        <p>
          El bono solicitado no existe.
        </p>

        <a
          href="bonos.html"
          class="btn btn-gold"
        >
          Ver bonos
        </a>

      </div>

    `;

    return;

  }


  document.title =
    bono.nombre +
    " | BH Constructora";


  const breadcrumb =
    document.querySelector(
      "#breadcrumb-name"
    );


  if (breadcrumb) {
    breadcrumb.textContent =
      bono.nombre;
  }


  detail.innerHTML = `

    <div class="detail-image reveal">

      <img
        src="${bono.imagen}"
        alt="${bono.nombre}"
      >

    </div>


    <div class="detail-content reveal">

      <p class="eyebrow dark">

        <span></span>

        ${bono.categoria.toUpperCase()}

      </p>


      <h1>
        ${bono.nombre}
      </h1>


      <p class="detail-situation">
        ${bono.situacion}
      </p>


      <p class="detail-description">
        ${bono.descripcion}
      </p>


      <div class="detail-specs">

        <div class="detail-spec">

          <strong>
            ${bono.metros}
          </strong>

          <span>
            Área
          </span>

        </div>


        <div class="detail-spec">

          <strong>
            ${bono.habitaciones}
          </strong>

          <span>
            Habitaciones
          </span>

        </div>


        <div class="detail-spec">

          <strong>
            ${bono.banos}
          </strong>

          <span>
            Baño(s)
          </span>

        </div>


        <div class="detail-spec">

          <strong>
            Consultar
          </strong>

          <span>
            Disponibilidad
          </span>

        </div>

      </div>


      <div class="detail-promo ${bono.promocion}">

        ${
          bono.promocion === "regalias"

            ? `

              <span class="promo-icon">
                🎁
              </span>

              <div>

                <strong>
                  PROMOCIÓN REGALÍAS
                </strong>

                <p>
                  Para este bono se contempla una promoción
                  que puede incluir beneficios como:
                </p>

                <ul>

                  <li>
                    Medidor eléctrico
                  </li>

                  <li>
                    Piso cerámico
                  </li>

                  <li>
                    Cielo raso PVC
                  </li>

                  <li>
                    Avalúo*
                  </li>

                </ul>

                <small>
                  *El avalúo está sujeto a las condiciones
                  específicas del caso.
                </small>

              </div>

            `

            : `

              <span class="promo-icon">
                ₡
              </span>

              <div>

                <strong>
                  ₡0 GASTOS*
                </strong>

                <p>
                  La promoción contempla determinados gastos
                  asociados al proceso, entre ellos:
                </p>

                <ul>

                  <li>
                    Avalúo
                  </li>

                  <li>
                    Formalización
                  </li>

                  <li>
                    Pólizas del INS
                  </li>

                  <li>
                    Permisos de construcción
                  </li>

                  <li>
                    Otros documentos o gastos según el caso
                  </li>

                </ul>

                <small>
                  *Promoción sujeta a condiciones y restricciones.
                  No significa que cualquier gasto imaginable
                  sea cubierto.
                </small>

              </div>

            `
        }

      </div>


      <a
        href="${whatsappBono(bono)}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-gold whatsapp-bono"
      >

        Quiero saber si califico

        <span>
          ↗
        </span>

      </a>

    </div>

  `;


  /* =====================================================
     ESPACIOS
     ===================================================== */

  const spaces =
    document.querySelector(
      "#spaces"
    );


  if (spaces) {

    spaces.innerHTML =
      bono.espacios
        .map(item => `

          <div class="feature-item">
            <span>✓</span>
            ${item}
          </div>

        `)
        .join("");

  }


  /* =====================================================
     MATERIALES
     ===================================================== */

  const materials =
    document.querySelector(
      "#materials"
    );


  if (materials) {

    materials.innerHTML =
      bono.materiales
        .map(material => `

          <div class="material-item">

            <span>
              ✓
            </span>

            ${material}

          </div>

        `)
        .join("");

  }


  /* =====================================================
     CARACTERÍSTICAS
     ===================================================== */

  const features =
    document.querySelector(
      "#features"
    );


  if (features) {

    features.innerHTML =
      bono.caracteristicas
        .map(caracteristica => `

          <div class="feature-item">

            <span>
              ✓
            </span>

            ${caracteristica}

          </div>

        `)
        .join("");

  }


  /* =====================================================
     REQUISITOS
     ===================================================== */

  const requirements =
    document.querySelector(
      "#requirements"
    );


  if (requirements) {

    requirements.innerHTML =
      bono.requisitos
        .map((requisito, index) => `

          <div class="requirement-item">

            <strong>
              ${String(index + 1).padStart(2, "0")}
            </strong>

            <span>
              ${requisito}
            </span>

          </div>

        `)
        .join("");

  }


  /* =====================================================
     GASTOS ARTÍCULO 59
     ===================================================== */

  const expenses =
    document.querySelector(
      "#expenses"
    );


  if (
    expenses &&
    bono.gastos
  ) {

    expenses.innerHTML =
      bono.gastos
        .map(gasto => `

          <div class="expense-item">
            ✓ ${gasto}
          </div>

        `)
        .join("");

  }


  activarReveal();

}


/* =========================================================
   INICIAR
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    inicializarFiltrosBonos();

    cargarDetalleBono();

  }
);