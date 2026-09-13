/* =========================================================
   BH CONSTRUCTORA
   JAVASCRIPT GENERAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MENÚ MÓVIL
     ======================================================= */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const open = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

      menuButton.setAttribute(
        "aria-label",
        open ? "Cerrar menú" : "Abrir menú"
      );

      document.body.classList.toggle("no-scroll", open);
    });

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.setAttribute(
          "aria-label",
          "Abrir menú"
        );

        document.body.classList.remove("no-scroll");
      });

    });
  }


  /* =======================================================
     HEADER AL HACER SCROLL
     ======================================================= */

  const header = document.querySelector(".site-header");

  if (header) {

    const updateHeader = () => {

      header.classList.toggle(
        "scrolled",
        window.scrollY > 30
      );

    };

    updateHeader();

    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );
  }


  /* =======================================================
     AÑO AUTOMÁTICO
     ======================================================= */

  document.querySelectorAll("[data-year]").forEach(element => {

    element.textContent = new Date().getFullYear();

  });


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     FORMULARIO DE CONTACTO
     ======================================================= */

  const contactForm =
    document.querySelector("#contact-form");

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const button =
          contactForm.querySelector("button[type='submit']");

        const message =
          contactForm.querySelector(".form-message");

        const originalText =
          button ? button.innerHTML : "";

        if (button) {

          button.disabled = true;

          button.innerHTML =
            "Preparando consulta...";
        }

        setTimeout(() => {

          if (message) {

            message.textContent =
              "Consulta preparada correctamente. En la siguiente etapa conectaremos este formulario con WhatsApp, correo o una base de datos.";

            message.classList.add("show");
          }

          if (button) {

            button.disabled = false;

            button.innerHTML =
              originalText;
          }

          contactForm.reset();

        }, 700);

      }
    );
  }


  /* =======================================================
     BOTONES "CONSULTAR BONO"
     ======================================================= */

  document
    .querySelectorAll("[data-bono]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const bono =
          button.getAttribute("data-bono");

        localStorage.setItem(
          "bh_bono_interes",
          bono
        );

      });

    });


  /* =======================================================
     CARGAR BONO SELECCIONADO EN CONTACTO
     ======================================================= */

  const bonoSelect =
    document.querySelector("#service");

  const savedBono =
    localStorage.getItem("bh_bono_interes");

  if (bonoSelect && savedBono) {

    const option =
      [...bonoSelect.options].find(
        item => item.value === savedBono
      );

    if (option) {

      bonoSelect.value =
        savedBono;
    }

    localStorage.removeItem(
      "bh_bono_interes"
    );
  }


  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });

      });

    });

});