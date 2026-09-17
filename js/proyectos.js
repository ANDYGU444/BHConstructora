/* =========================================================
   BH CONSTRUCTORA
   CATÁLOGO DE PROYECTOS
   ========================================================= */

const proyectos = [

  {
    id: 1,

    nombre: "Hogar Contemporáneo",

    categoria: "Vivienda",

    ubicacion:
      "San Isidro de El General",

    imagen:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90",

    descripcion:
      "Proyecto residencial diseñado para combinar funcionalidad, iluminación y aprovechamiento del espacio.",

    area: "85 m²",

    habitaciones: "3",

    banos: "2",

    caracteristicas: [
      "Diseño residencial",
      "Distribución funcional",
      "Espacios familiares",
      "Acabados según proyecto"
    ]
  },


  {
    id: 2,

    nombre: "Espacios para Vivir",

    categoria: "Vivienda",

    ubicacion:
      "Costa Rica",

    imagen:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",

    descripcion:
      "Vivienda pensada para ofrecer espacios cómodos y una distribución práctica para la familia.",

    area: "70 m²",

    habitaciones: "3",

    banos: "1",

    caracteristicas: [
      "Distribución práctica",
      "Diseño residencial",
      "Espacios funcionales",
      "Iluminación natural"
    ]
  },


  {
    id: 3,

    nombre: "Arquitectura Funcional",

    categoria: "Diseño",

    ubicacion:
      "Costa Rica",

    imagen:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=90",

    descripcion:
      "Propuesta arquitectónica enfocada en el uso eficiente de cada espacio.",

    area: "60 m²",

    habitaciones: "2",

    banos: "1",

    caracteristicas: [
      "Diseño arquitectónico",
      "Aprovechamiento del espacio",
      "Distribución funcional",
      "Propuesta personalizada"
    ]
  },


  {
    id: 4,

    nombre: "Casa Familiar",

    categoria: "Vivienda",

    ubicacion:
      "Costa Rica",

    imagen:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=90",

    descripcion:
      "Proyecto residencial creado pensando en las necesidades cotidianas de una familia.",

    area: "90 m²",

    habitaciones: "3",

    banos: "2",

    caracteristicas: [
      "Espacios familiares",
      "Diseño contemporáneo",
      "Distribución cómoda",
      "Acabados según proyecto"
    ]
  },


  {
    id: 5,

    nombre: "Residencia Moderna",

    categoria: "Residencial",

    ubicacion:
      "Costa Rica",

    imagen:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=90",

    descripcion:
      "Proyecto de vivienda con una estética moderna y espacios funcionales.",

    area: "100 m²",

    habitaciones: "3",

    banos: "2",

    caracteristicas: [
      "Arquitectura moderna",
      "Espacios amplios",
      "Diseño funcional",
      "Acabados contemporáneos"
    ]
  },


  {
    id: 6,

    nombre: "Proyecto Familiar",

    categoria: "Vivienda",

    ubicacion:
      "Costa Rica",

    imagen:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=90",

    descripcion:
      "Vivienda desarrollada para ofrecer comodidad y aprovechamiento del terreno.",

    area: "75 m²",

    habitaciones: "3",

    banos: "1",

    caracteristicas: [
      "Aprovechamiento del terreno",
      "Distribución funcional",
      "Diseño familiar",
      "Construcción residencial"
    ]
  }

];


/* =========================================================
   WHATSAPP
   ========================================================= */

const WHATSAPP_PROYECTOS =
  "50662005747";


function whatsappProyecto(proyecto) {

  const mensaje =
    "Hola BH Constructora. " +
    "Deseo información sobre el proyecto " +
    proyecto.nombre +
    ". Me gustaría conocer más detalles.";

  return (
    "https://wa.me/" +
    WHATSAPP_PROYECTOS +
    "?text=" +
    encodeURIComponent(mensaje)
  );

}


/* =========================================================
   TARJETA
   ========================================================= */

function crearProyectoCard(proyecto) {

  return `

    <article class="project-card reveal">

      <div class="project-card-image">

        <img
          src="${proyecto.imagen}"
          alt="${proyecto.nombre}"
          loading="lazy"
        >

        <span class="project-card-category">
          ${proyecto.categoria}
        </span>

      </div>


      <div class="project-card-content">

        <span class="project-location">
          ${proyecto.ubicacion}
        </span>

        <h3>
          ${proyecto.nombre}
        </h3>

        <p>
          ${proyecto.descripcion}
        </p>


        <div class="project-card-specs">

          <span>
            <strong>${proyecto.area}</strong>
            Área
          </span>

          <span>
            <strong>${proyecto.habitaciones}</strong>
            Habitaciones
          </span>

          <span>
            <strong>${proyecto.banos}</strong>
            Baño(s)
          </span>

        </div>


        <a
          href="proyecto.html?id=${proyecto.id}"
          class="btn btn-outline btn-small"
        >
          Ver proyecto
          <span>→</span>
        </a>

      </div>

    </article>

  `;

}


/* =========================================================
   MOSTRAR PROYECTOS
   ========================================================= */

function mostrarProyectos() {

  const container =
    document.querySelector(
      "#projects-container"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    proyectos
      .map(crearProyectoCard)
      .join("");

  activarReveal();

}


/* =========================================================
   DETALLE DEL PROYECTO
   ========================================================= */

function cargarProyectoDetalle() {

  const detail =
    document.querySelector(
      "#project-detail"
    );

  if (!detail) {
    return;
  }


  const params =
    new URLSearchParams(
      window.location.search
    );


  const id =
    Number(params.get("id")) || 1;


  const proyecto =
    proyectos.find(
      item => item.id === id
    );


  if (!proyecto) {

    detail.innerHTML = `

      <div class="not-found">

        <h2>
          Proyecto no encontrado
        </h2>

        <p>
          El proyecto solicitado no existe.
        </p>

        <a
          href="proyectos.html"
          class="btn btn-gold"
        >
          Ver proyectos
        </a>

      </div>

    `;

    return;

  }


  document.title =
    proyecto.nombre +
    " | BH Constructora";


  const breadcrumb =
    document.querySelector(
      "#project-breadcrumb"
    );


  if (breadcrumb) {
    breadcrumb.textContent =
      proyecto.nombre;
  }


  detail.innerHTML = `

    <div class="detail-image reveal">

      <img
        src="${proyecto.imagen}"
        alt="${proyecto.nombre}"
      >

    </div>


    <div class="detail-content reveal">

      <p class="eyebrow dark">

        <span></span>

        ${proyecto.categoria.toUpperCase()}

      </p>


      <h1>
        ${proyecto.nombre}
      </h1>


      <p class="detail-location">
        ${proyecto.ubicacion}
      </p>


      <p class="detail-description">
        ${proyecto.descripcion}
      </p>


      <div class="detail-specs">

        <div class="detail-spec">

          <strong>
            ${proyecto.area}
          </strong>

          <span>
            Área
          </span>

        </div>


        <div class="detail-spec">

          <strong>
            ${proyecto.habitaciones}
          </strong>

          <span>
            Habitaciones
          </span>

        </div>


        <div class="detail-spec">

          <strong>
            ${proyecto.banos}
          </strong>

          <span>
            Baños
          </span>

        </div>


        <div class="detail-spec">

          <strong>
            Consultar
          </strong>

          <span>
            Información
          </span>

        </div>

      </div>


      <a
        href="${whatsappProyecto(proyecto)}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-gold"
      >
        Consultar este proyecto
        <span>↗</span>
      </a>

    </div>

  `;


  const features =
    document.querySelector(
      "#project-features"
    );


  if (features) {

    features.innerHTML =
      proyecto.caracteristicas
        .map(item => `

          <div class="feature-item">

            <span>
              ✓
            </span>

            ${item}

          </div>

        `)
        .join("");

  }


  activarReveal();

}


/* =========================================================
   INICIO
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    mostrarProyectos();

    cargarProyectoDetalle();

  }
);