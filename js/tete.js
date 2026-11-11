/* =========================================================
   TETE VIDEOS  (tete.html)
   Filtros por tema y reproductor en ventana emergente.
   ========================================================= */

(function () {
  "use strict";

  var chips = document.querySelectorAll(".tv-chip");
  var cards = document.querySelectorAll(".tv-card");
  var modal = document.getElementById("tv-modal");

  if (!modal || !cards.length) return;

  var player = modal.querySelector(".tv-player");
  var title = modal.querySelector("#tv-modal-title");
  var closeBtn = modal.querySelector(".tv-close");
  var lastCard = null;

  /* ---- Filtros ---- */
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.getAttribute("data-filter");

      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle("is-on", on);
        c.setAttribute("aria-pressed", on ? "true" : "false");
      });

      cards.forEach(function (card) {
        var show = filter === "all" || card.getAttribute("data-cat") === filter;
        card.hidden = !show;
      });
    });
  });

  /* ---- Reproductor ---- */
  function openVideo(card) {
    lastCard = card;
    title.textContent = card.getAttribute("data-title");
    player.src = card.getAttribute("data-video");
    modal.hidden = false;
    document.body.classList.add("tv-noscroll");
    closeBtn.focus();
    var p = player.play();
    if (p && p.catch) p.catch(function () {});
  }

  function closeVideo() {
    player.pause();
    player.removeAttribute("src");
    player.load();
    modal.hidden = true;
    document.body.classList.remove("tv-noscroll");
    if (lastCard) lastCard.focus();
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      openVideo(card);
    });
  });

  closeBtn.addEventListener("click", closeVideo);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeVideo();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeVideo();
  });
})();


/* =========================================================
   TETE INTERACTIVA
   Al tocarla cambia de gesto, rebota y suelta destellos.
   Solo es un detalle visual: no envía ni guarda nada.
   ========================================================= */

(function () {
  "use strict";

  var btn = document.querySelector(".tt-btn");
  if (!btn) return;

  var faces = Array.prototype.slice.call(btn.querySelectorAll(".tt-face"));
  var fx = btn.querySelector(".tt-fx");
  var hint = document.querySelector(".tt-hint");
  var gestures = ["feliz", "guino", "risa", "amor", "sorpresa", "estrellas", "guino2"];
  var last = "";
  var backTimer = null;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var PARTICLES = {
    amor: ["💛", "❤️", "💛"],
    estrellas: ["⭐", "✨", "⭐"],
    risa: ["😄", "✨", "💛"],
    sorpresa: ["❗", "✨"],
    def: ["✨", "💛", "⭐"]
  };

  function show(name) {
    faces.forEach(function (f) {
      f.style.display = f.getAttribute("data-face") === name ? "" : "none";
    });
  }

  function burst(name) {
    if (reduce || !fx) return;
    var set = PARTICLES[name] || PARTICLES.def;
    for (var i = 0; i < 6; i++) {
      var p = document.createElement("span");
      p.className = "tt-p";
      p.textContent = set[i % set.length];
      var ang = (-160 + Math.random() * 140) * Math.PI / 180;
      var dist = 90 + Math.random() * 70;
      p.style.setProperty("--dx", Math.round(Math.cos(ang) * dist) + "px");
      p.style.setProperty("--dy", Math.round(Math.sin(ang) * dist) + "px");
      p.style.setProperty("--rot", Math.round(Math.random() * 60 - 30) + "deg");
      p.style.animationDelay = (i * 40) + "ms";
      fx.appendChild(p);
      setTimeout(function (el) { el.remove(); }, 1400, p);
    }
  }

  btn.addEventListener("click", function () {
    var options = gestures.filter(function (g) { return g !== last; });
    var name = options[Math.floor(Math.random() * options.length)];
    last = name;
    show(name);

    btn.classList.remove("is-boing");
    void btn.offsetWidth;            // reinicia la animación si tocan seguido
    btn.classList.add("is-boing");
    burst(name);

    if (hint) hint.classList.add("is-gone");

    clearTimeout(backTimer);
    backTimer = setTimeout(function () { show("normal"); }, 1800);
  });

  /* Parpadeo natural cada pocos segundos */
  function blink() {
    var eyes = btn.querySelectorAll(".tt-eyes");
    Array.prototype.forEach.call(eyes, function (e) {
      e.classList.remove("is-blink");
      void e.getBoundingClientRect();
      e.classList.add("is-blink");
    });
    setTimeout(blink, 2500 + Math.random() * 3500);
  }
  if (!reduce) setTimeout(blink, 2000);
})();
