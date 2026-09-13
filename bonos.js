/* =========================================================
   BH CONSTRUCTORA
   CATÁLOGO DE BONOS
   ========================================================= */

const bonos = [

  {
    id: 1,
    nombre: "Bono Modelo Familiar",
    categoria: "Familiar",
    imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Modelo de vivienda pensado para familias que buscan una distribución práctica, funcional y cómoda.",
    metros: "45 m²",
    habitaciones: "2",
    banos: "1",
    precio: "Consultar",
    materiales: [
      "Bloques de concreto",
      "Estructura de acero",
      "Cubierta de techo",
      "Piso cerámico",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ]
  },

  {
    id: 2,
    nombre: "Bono Modelo Ampliado",
    categoria: "Familiar",
    imagen: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Una alternativa con mayor espacio interior para familias que requieren una distribución más amplia.",
    metros: "60 m²",
    habitaciones: "3",
    banos: "1",
    precio: "Consultar",
    materiales: [
      "Bloques de concreto",
      "Estructura metálica",
      "Techo",
      "Piso cerámico",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ]
  },

  {
    id: 3,
    nombre: "Bono Modelo Esencial",
    categoria: "Esencial",
    imagen: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Modelo compacto diseñado para aprovechar eficientemente cada espacio de la vivienda.",
    metros: "42 m²",
    habitaciones: "2",
    banos: "1",
    precio: "Consultar",
    materiales: [
      "Bloques de concreto",
      "Estructura metálica",
      "Cubierta de techo",
      "Piso",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ]
  },

  {
    id: 4,
    nombre: "Bono Modelo Confort",
    categoria: "Confort",
    imagen: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Una propuesta residencial con espacios adicionales y una distribución orientada a la comodidad.",
    metros: "70 m²",
    habitaciones: "3",
    banos: "2",
    precio: "Consultar",
    materiales: [
      "Bloques de concreto",
      "Estructura de acero",
      "Techo",
      "Piso cerámico",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ]
  },

  {
    id: 5,
    nombre: "Bono Modelo Pareja",
    categoria: "Compacto",
    imagen: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Modelo compacto que busca equilibrar comodidad, funcionalidad y aprovechamiento del terreno.",
    metros: "40 m²",
    habitaciones: "2",
    banos: "1",
    precio: "Consultar",
    materiales: [
      "Bloques",
      "Estructura metálica",
      "Techo",
      "Piso",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ]
  },

  {
    id: 6,
    nombre: "Bono Modelo Especial",
    categoria: "Especial",
    imagen: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
    descripcion:
      "Una opción residencial adaptable a diferentes necesidades y características del proyecto.",
    metros: "55 m²",
    habitaciones: "3",
    banos: "1",
    precio: "Consultar",
    materiales: [
      "Bloques de concreto",
      "Estructura",
      "Techo",
      "Piso cerámico",
      "Puertas",
      "Ventanas",
      "Instalación eléctrica",
      "Instalación sanitaria"
    ]
  }

];


/* =========================================================
   CREAR TARJETA
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
          ${bono.categoria.toUpperCase()}
        </span>

      </div>

      <div class="bono-content">

        <h3>${bono.nombre}</h3>

        <p>
          ${bono.descripcion}
        </p>

        <div class="bono-specs">

          <div class="bono-spec">
            <strong>${bono.metros}</strong>
            <span>Área</span>
          </div>

          <div class="bono-spec">
            <strong>${bono.habitaciones}</strong>
            <span>Habitaciones</span>
          </div>

          <div class="bono-spec">
            <strong>${bono.banos}</strong>
            <span>Baño(s)</span>
          </div>

        </div>

        <a
          class="btn btn-outline btn-small"
          href="bono.html?id=${bono.id}"
          data-bono="${bono.nombre}"
        >
          Ver especificaciones
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

  if (lista.length === 0) {

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

}


/* =========================================================
   FILTROS
   ========================================================= */

function inicializarFiltros() {

  const search =
    document.querySelector("#bono-search");

  const category =
    document.querySelector("#bono-category");

  function filtrar() {

    const text =
      search
        ? search.value.toLowerCase().trim()
        : "";

    const selectedCategory =
      category
        ? category.value
        : "todos";

    const resultado =
      bonos.filter(bono => {

        const matchText =
          bono.nombre
            .toLowerCase()
            .includes(text);

        const matchCategory =
          selectedCategory === "todos" ||
          bono.categoria === selectedCategory;

        return matchText && matchCategory;
      });

    mostrarBonos(resultado);
  }

  search?.addEventListener("input", filtrar);

  category?.addEventListener("change", filtrar);

  mostrarBonos(bonos);
}


/* =========================================================
   INICIAR
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  inicializarFiltros
);