/* =========================================================
   BH CONSTRUCTORA
   SCRIPT GENERAL
   ========================================================= */


/* =========================================================
   MENÚ MÓVIL
   ========================================================= */

const menuButton =
  document.querySelector(".menu-toggle");

const nav =
  document.querySelector(".main-nav");


menuButton?.addEventListener(
  "click",
  () => {

    const abierto =
      nav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      abierto
    );

    menuButton.setAttribute(
      "aria-label",
      abierto
        ? "Cerrar menú"
        : "Abrir menú"
    );

  }
);


/* =========================================================
   CERRAR MENÚ AL SELECCIONAR
   ========================================================= */

document
  .querySelectorAll(".main-nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        nav?.classList.remove("open");

        menuButton?.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  });


/* =========================================================
   HEADER
   ========================================================= */

const header =
  document.querySelector(".site-header");


function actualizarHeader() {

  if (!header) {
    return;
  }

  if (window.scrollY > 30) {

    header.classList.add(
      "scrolled"
    );

  } else {

    header.classList.remove(
      "scrolled"
    );

  }

}


window.addEventListener(
  "scroll",
  actualizarHeader,
  {
    passive: true
  }
);


actualizarHeader();


/* =========================================================
   AÑO AUTOMÁTICO
   ========================================================= */

document
  .querySelectorAll("[data-year]")
  .forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function activarReveal() {

  const elementos =
    document.querySelectorAll(
      ".reveal:not(.reveal-ready)"
    );


  if (!elementos.length) {
    return;
  }


  elementos.forEach(elemento => {

    elemento.classList.add(
      "reveal-ready"
    );

  });


  if (
    !("IntersectionObserver" in window)
  ) {

    elementos.forEach(
      elemento =>
        elemento.classList.add(
          "visible"
        )
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      entradas => {

        entradas.forEach(
          entrada => {

            if (
              entrada.isIntersecting
            ) {

              entrada.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entrada.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  elementos.forEach(
    elemento =>
      observer.observe(elemento)
  );

}


document.addEventListener(
  "DOMContentLoaded",
  activarReveal
);


/* =========================================================
   FORMULARIO DE CONTACTO
   ========================================================= */

const contactForm =
  document.querySelector(
    "#contact-form"
  );


contactForm?.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const button =
      contactForm.querySelector(
        "button[type='submit']"
      );


    const message =
      contactForm.querySelector(
        ".form-message"
      );


    if (button) {

      const original =
        button.innerHTML;

      button.innerHTML =
        "Consulta preparada ✓";

      button.disabled = true;


      setTimeout(
        () => {

          button.innerHTML =
            original;

          button.disabled =
            false;

        },
        2500
      );

    }


    if (message) {

      message.textContent =
        "Gracias. Puedes continuar la conversación directamente por WhatsApp.";

      message.classList.add(
        "show"
      );

    }

  }
);


/* =========================================================
   WHATSAPP GENERAL
   ========================================================= */

function abrirWhatsApp(mensaje) {

  const numero =
    "50662005747";


  const url =
    "https://wa.me/" +
    numero +
    "?text=" +
    encodeURIComponent(mensaje);


  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}