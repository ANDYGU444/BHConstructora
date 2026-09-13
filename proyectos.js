/* =========================================================
   BH CONSTRUCTORA
   PROYECTOS
   ========================================================= */

const proyectos = [

  {
    id: 1,
    nombre: "Hogar Contemporáneo",
    categoria: "Vivienda",
    ubicacion: "Costa Rica",
    imagen:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Proyecto residencial diseñado para combinar funcionalidad, iluminación y aprovechamiento del espacio.",
    area: "85 m²",
    habitaciones: "3",
    banos: "2"
  },

  {
    id: 2,
    nombre: "Espacios para Vivir",
    categoria: "Vivienda",
    ubicacion: "Costa Rica",
    imagen:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Vivienda pensada para ofrecer espacios cómodos y una distribución práctica para la familia.",
    area: "70 m²",
    habitaciones: "3",
    banos: "1"
  },

  {
    id: 3,
    nombre: "Arquitectura Funcional",
    categoria: "Diseño",
    ubicacion: "Costa Rica",
    imagen:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Propuesta arquitectónica enfocada en el uso eficiente de cada espacio.",
    area: "60 m²",
    habitaciones: "2",
    banos: "1"
  },

  {
    id: 4,
    nombre: "Casa Familiar",
    categoria: "Vivienda",
    ubicacion: "Costa Rica",
    imagen:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Proyecto residencial creado pensando en las necesidades cotidianas de una familia.",
    area: "90 m²",
    habitaciones: "3",
    banos: "2"
  },

  {
    id: 5,
    nombre: "Residencia Moderna",
    categoria: "Residencial",
    ubicacion: "Costa Rica",
    imagen:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Proyecto de vivienda con una estética moderna y espacios funcionales.",
    area: "100 m²",
    habitaciones: "3",
    banos: "2"
  },

  {
    id: 6,
    nombre: "Proyecto Familiar",
    categoria: "Vivienda",
    ubicacion: "Costa Rica",
    imagen:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Vivienda desarrollada para ofrecer comodidad y aprovechamiento del terreno.",
    area: "75 m²",
    habitaciones: "3",
    banos: "1"
  }

];


function crearProyectoCard(proyecto) {

  return `
    <article class="project-card reveal">

      <div class="project-card-image">

        <img
          src="${proyecto.imagen}"
          alt="${proyecto.nombre}"
          loading="lazy"
        >

      </div>

      <div class="project-card-content">

        <span class="project-category">
          ${proyecto.categoria.toUpperCase()}
        </span>

        <h3>
          ${proyecto.nombre}
        </h3>

        <p>
          ${proyecto.descripcion}
        </p>

        <a
          href="proyecto.html?id=${proyecto.id}"
          class="text-link"
        >
          Ver proyecto
          <span>→</span>
        </a>

      </div>

    </article>
  `;
}


function mostrarProyectos() {

  const container =
    document.querySelector("#projects-container");

  if (!container) {
    return;
  }

  container.innerHTML =
    proyectos
      .map(crearProyectoCard)
      .join("");
}


document.addEventListener(
  "DOMContentLoaded",
  mostrarProyectos
);