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
