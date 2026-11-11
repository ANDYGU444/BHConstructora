/* =========================================================
   SOLICITUD EN 5 PASOS + PDF DE COLOR  (contacto.html)
   Requiere jsPDF 2.5.1 (se carga antes de este archivo).
   ========================================================= */

(function () {
  "use strict";

  /* -------------------------------------------------------
     CONFIGURACIÓN: cambie aquí el número y los montos
     ------------------------------------------------------- */
  var CONFIG = {
    telefono: "6286-7675",            // número que se muestra
    whatsapp: "50662867675",          // mismo número, formato internacional sin "+"
    empresa: "BH Constructora – Zona Caribe",
    logo: "img/bh-logo-pdf.jpg",
    ingresoMinimo: 60000,             // mínimo aproximado
    topeArt59: 480000,                // tope aproximado del Art. 59 (lote buscado)
    guardarProgreso: true
  };

  var form = document.getElementById("sol-form");
  if (!form) return;

  var TOTAL = 5;
  var step = 1;
  var lastPdf = null;
  var STORE = "bh_solicitud_v1";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var steps = $$(".sol-step", form);
  var bar = $("[data-sol-bar]");
  var labels = $$(".sol-progress-labels span");
  var btnNext = $("[data-sol-next]", form);
  var btnBack = $("[data-sol-back]", form);
  var errorBox = $("[data-sol-error]", form);
  var nav = $("[data-sol-nav]", form);
  var done = $("[data-sol-done]", form);
  var card = $(".sol-card");

  /* -------------------------------------------------------
     UTILIDADES
     ------------------------------------------------------- */
  function val(name) {
    var els = form.elements[name];
    if (!els) return "";
    if (els.length !== undefined && !els.tagName) {
      for (var i = 0; i < els.length; i++) if (els[i].checked) return els[i].value;
      return "";
    }
    if (els.type === "checkbox") return els.checked ? "1" : "";
    return (els.value || "").trim();
  }

  function digits(s) { return (s || "").replace(/\D/g, ""); }

  function money(s) { return parseInt(digits(s), 10) || 0; }

  function fmtMoney(n) {
    return "¢" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function matches(rule) {
    // rule: "campo:valor1,valor2"
    var p = rule.split(":");
    var v = val(p[0]);
    return p[1].split(",").indexOf(v) !== -1;
  }

  function toast(msg) {
    var t = document.createElement("div");
    t.className = "sol-toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2200);
  }

  /* -------------------------------------------------------
     MOSTRAR / OCULTAR PREGUNTAS SEGÚN RESPUESTAS
     ------------------------------------------------------- */
  function refreshConditional() {
    $$("[data-show-if]", form).forEach(function (el) {
      el.hidden = !matches(el.getAttribute("data-show-if"));
    });
  }

  /* -------------------------------------------------------
     FORMATO AUTOMÁTICO
     ------------------------------------------------------- */
  $$("[data-money]", form).forEach(function (inp) {
    inp.addEventListener("input", function () {
      var n = digits(inp.value).slice(0, 9);
      inp.value = n ? String(parseInt(n, 10)).replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
    });
  });

  $$("[data-phone]", form).forEach(function (inp) {
    inp.addEventListener("input", function () {
      var d = digits(inp.value).slice(0, 8);
      inp.value = d.length > 4 ? d.slice(0, 4) + "-" + d.slice(4) : d;
    });
  });

  $$("[data-cedula]", form).forEach(function (inp) {
    inp.addEventListener("blur", function () {
      var d = digits(inp.value);
      if (d.length === 9) inp.value = d[0] + "-" + d.slice(1, 5) + "-" + d.slice(5);
    });
  });

  var personas = form.elements.personas;
  $("[data-step-up]", form).addEventListener("click", function () {
    personas.value = Math.min(15, (parseInt(personas.value, 10) || 1) + 1); save();
  });
  $("[data-step-dn]", form).addEventListener("click", function () {
    personas.value = Math.max(1, (parseInt(personas.value, 10) || 1) - 1); save();
  });

  /* -------------------------------------------------------
     VALIDACIÓN DEL PASO ACTUAL
     ------------------------------------------------------- */
  var NAMES = {
    lote: "si tiene lote", lote_ubicacion: "dónde está el lote", nombre: "su nombre completo",
    cedula: "su número de cédula", telefono: "su teléfono", vive: "dónde vive", civil: "su estado civil",
    pareja_nombre: "el nombre de su pareja", pareja_cedula: "la cédula de su pareja",
    discapacidad: "si hay alguna persona con discapacidad", adulto_mayor: "si vive con un adulto mayor",
    indigena: "si es territorio indígena", fuente: "de dónde vienen sus ingresos", ingreso: "cuánto gana al mes",
    bono_previo: "si ha recibido un bono antes", propiedades: "si tiene propiedades", consent: "la autorización al final"
  };

  function validate() {
    var fs = steps[step - 1];
    var bad = [];
    $$(".is-bad", fs).forEach(function (e) { e.classList.remove("is-bad"); });

    $$("[data-req]", fs).forEach(function (el) {
      var rule = el.getAttribute("data-req");
      if (rule && !matches(rule)) return;
      var name = el.name;
      var v = val(name);
      var ok = !!v;
      if (ok && el.hasAttribute("data-cedula")) ok = digits(v).length >= 9 && digits(v).length <= 12;
      if (ok && el.hasAttribute("data-phone")) ok = digits(v).length === 8;
      if (ok && el.hasAttribute("data-money")) ok = money(v) > 0;
      if (!ok) {
        bad.push(name);
        if (el.type === "text" || el.type === "tel") el.classList.add("is-bad");
      }
    });

    if (bad.length) {
      var n = bad[0];
      var msg = "Por favor indique " + (NAMES[n] || "la respuesta que falta") + ".";
      if (n === "cedula" || n === "pareja_cedula") msg = "Revise la cédula: debe tener 9 números (ej: 7-0123-0456).";
      if (n === "telefono") msg = "Revise el teléfono: debe tener 8 números (ej: 8888-1234).";
      if (n === "consent") msg = "Para continuar, marque la casilla de autorización.";
      showError(msg);
      var first = form.elements[n];
      if (first && first.length && !first.tagName) first = first[0];
      if (first && first.focus) first.focus({ preventScroll: false });
      return false;
    }
    showError("");
    return true;
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = !msg;
  }

  /* -------------------------------------------------------
     NAVEGACIÓN ENTRE PASOS
     ------------------------------------------------------- */
  function go(n, scroll) {
    step = n;
    steps.forEach(function (fs, i) {
      fs.hidden = i !== n - 1;
      fs.classList.toggle("is-active", i === n - 1);
    });
    bar.style.width = (n / TOTAL * 100) + "%";
    labels.forEach(function (l, i) { l.classList.toggle("is-on", i < n); });
    btnBack.hidden = n === 1;
    btnNext.textContent = n === TOTAL ? "Crear mi PDF ✓" : "Siguiente →";
    if (n === TOTAL) buildReview();
    showError("");
    if (scroll !== false && card) {
      var top = card.getBoundingClientRect().top + window.pageYOffset - 110;
      if (window.pageYOffset > top) window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  btnNext.addEventListener("click", function () {
    if (!validate()) return;
    if (step < TOTAL) { go(step + 1); save(); }
    else finish();
  });

  btnBack.addEventListener("click", function () { if (step > 1) go(step - 1); });

  form.addEventListener("change", function () { refreshConditional(); save(); if (!errorBox.hidden) showError(""); });
  form.addEventListener("input", function () { save(); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });

  /* -------------------------------------------------------
     GUARDAR PROGRESO (por si la persona sale y vuelve)
     ------------------------------------------------------- */
  function save() {
    if (!CONFIG.guardarProgreso) return;
    try {
      var data = { step: step };
      $$("input", form).forEach(function (el) {
        if (!el.name || el.name === "consent") return;
        if (el.type === "radio") { if (el.checked) data[el.name] = el.value; }
        else data[el.name] = el.value;
      });
      localStorage.setItem(STORE, JSON.stringify(data));
    } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }

  function restore() {
    try {
      var data = JSON.parse(localStorage.getItem(STORE) || "null");
      if (!data) return;
      $$("input", form).forEach(function (el) {
        if (!(el.name in data)) return;
        if (el.type === "radio") el.checked = el.value === data[el.name];
        else if (el.type !== "checkbox") el.value = data[el.name];
      });
      if (data.step > 1 && data.step <= TOTAL) step = data.step;
    } catch (e) { /* ignorar */ }
  }

  function clearSaved() {
    try { localStorage.removeItem(STORE); } catch (e) { /* ignorar */ }
  }

  /* -------------------------------------------------------
     DATOS FINALES + ALERTAS
     ------------------------------------------------------- */
  var LOTE_TXT = {
    propio: "Lote propio",
    buscado: "Lote buscado (por comprar)",
    ninguno: "Todavía no tiene lote"
  };

  function collect() {
    var d = {};
    ["lote", "lote_ubicacion", "plano", "agua", "calle", "nombre", "cedula", "telefono", "vive", "civil",
      "pareja_nombre", "pareja_cedula", "discapacidad", "adulto_mayor", "indigena", "fuente", "patrono",
      "actividad", "bono_previo", "propiedades"].forEach(function (k) { d[k] = val(k); });
    d.personas = Math.max(1, parseInt(val("personas"), 10) || 1);
    d.ingreso = money(val("ingreso"));
    d.ingresoOtros = money(val("ingreso_otros"));
    d.ingresoTotal = d.ingreso + d.ingresoOtros;
    d.tieneLote = d.lote === "propio" || d.lote === "buscado";
    d.conPareja = matches("civil:Casado(a),Unión libre");
    if (!d.tieneLote) { d.lote_ubicacion = ""; d.plano = ""; d.agua = ""; d.calle = ""; }
    if (d.fuente !== "Asalariado(a)") d.patrono = "";
    if (d.fuente !== "Independiente") d.actividad = "";
    if (!d.conPareja) { d.pareja_nombre = ""; d.pareja_cedula = ""; }

    var a = [];
    if (!d.tieneLote) a.push("Sin lote: orientar sobre cómo buscar un lote que califique.");
    if (d.tieneLote && d.plano !== "Sí") a.push("Plano catastrado: " + (d.plano || "sin respuesta") + ". Confirmar.");
    if (d.tieneLote && d.agua !== "Sí") a.push("Agua potable: " + (d.agua || "sin respuesta") + ". Verificar disponibilidad.");
    if (d.tieneLote && d.calle !== "Sí") a.push("Frente a calle pública: " + (d.calle || "sin respuesta") + ". Verificar acceso.");
    if (d.ingresoTotal < CONFIG.ingresoMinimo) a.push("Ingreso del hogar menor al mínimo aproximado (" + fmtMoney(CONFIG.ingresoMinimo) + ").");
    if (d.lote === "buscado" && d.ingresoTotal > CONFIG.topeArt59) a.push("Ingreso mayor al tope aproximado del Art. 59 (" + fmtMoney(CONFIG.topeArt59) + ").");
    if (d.bono_previo === "Sí") a.push("Indica que recibió un bono antes: verificar en el BANHVI.");
    if (d.bono_previo === "No estoy seguro(a)") a.push("No está seguro(a) de un bono previo: verificar en el BANHVI.");
    if (d.propiedades === "Sí") a.push("Indica otra propiedad a su nombre: verificar en el Registro Nacional.");
    if (d.discapacidad === "Sí") a.push("Persona con discapacidad en el hogar: revisar opción de Bono Especial.");
    if (d.indigena === "Sí") a.push("Territorio indígena: revisar requisitos de Bono Indígena.");
    d.alertas = a;

    var now = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    d.codigo = "BH-" + String(now.getFullYear()).slice(2) + pad(now.getMonth() + 1) + pad(now.getDate()) +
      "-" + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
    var h = now.getHours(), ampm = h < 12 ? "a. m." : "p. m.";
    d.fecha = pad(now.getDate()) + "/" + pad(now.getMonth() + 1) + "/" + now.getFullYear() +
      " · " + ((h % 12) || 12) + ":" + pad(now.getMinutes()) + " " + ampm;

    var limpio = d.nombre.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z ]/g, "").trim().split(/\s+/);
    var corto = (limpio.slice(0, 2).join("-") || "Solicitante");
    var tipo = d.lote === "propio" ? "Lote-propio" : d.lote === "buscado" ? "Lote-buscado" : "Sin-lote";
    d.archivo = (d.tieneLote ? "VERDE_" : "GRIS_") + tipo + "_" + corto + ".pdf";
    return d;
  }

  /* -------------------------------------------------------
     RESUMEN ANTES DE CREAR EL PDF
     ------------------------------------------------------- */
  function buildReview() {
    var d = collect();
    var box = $("[data-sol-review]", form);
    var color = d.tieneLote ? "#1E8A4C" : "#7D838C";
    var rows = [
      ["Lote", LOTE_TXT[d.lote] + (d.lote_ubicacion ? " · " + d.lote_ubicacion : "")],
      ["Nombre", d.nombre],
      ["Cédula", d.cedula],
      ["Teléfono", d.telefono],
      ["Personas", String(d.personas)],
      ["Ingreso del hogar", fmtMoney(d.ingresoTotal)]
    ];
    var html = '<div class="sol-review-head" style="background:' + color + '"><i></i>' +
      (d.tieneLote ? "CON LOTE" : "SIN LOTE") + " · Revise sus datos</div><dl>";
    rows.forEach(function (r) {
      html += "<dt>" + r[0] + "</dt><dd>" + escapeHtml(r[1] || "—") + "</dd>";
    });
    html += '</dl><button type="button" class="sol-edit" data-go="1">✎ Corregir algo</button>';
    box.innerHTML = html;
    $("[data-go]", box).addEventListener("click", function () { go(1); });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* -------------------------------------------------------
     PDF
     ------------------------------------------------------- */
  function loadLogo() {
    return fetch(CONFIG.logo).then(function (r) {
      if (!r.ok) throw new Error("logo");
      return r.blob();
    }).then(function (b) {
      return new Promise(function (res) {
        var fr = new FileReader();
        fr.onload = function () { res(fr.result); };
        fr.onerror = function () { res(null); };
        fr.readAsDataURL(b);
      });
    }).catch(function () { return null; });
  }

  function buildPdf(d, logo) {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: "mm", format: "letter" });
    var W = 215.9, H = 279.4, M = 14, CW = W - 2 * M;
    var NAVY = [11, 33, 71], GOLD = [201, 162, 74], YEL = [255, 210, 63], GRAY = [91, 101, 119];
    var C = d.tieneLote ? [30, 138, 76] : [125, 131, 140];
    var CI = d.tieneLote ? [45, 182, 101] : [167, 173, 181];

    // Franja de estado
    doc.setFillColor.apply(doc, C); doc.rect(0, 0, W, 27, "F");
    doc.setFillColor(255, 255, 255); doc.circle(M + 7, 13.5, 6.5, "F");
    doc.setFillColor.apply(doc, CI); doc.circle(M + 7, 13.5, 4, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold"); doc.setFontSize(24);
    doc.text(d.tieneLote ? "CON LOTE" : "SIN LOTE", M + 17, 13.2);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10.5);
    var sub = LOTE_TXT[d.lote] + (d.lote_ubicacion ? " · " + d.lote_ubicacion : (d.vive ? " · Vive en " + d.vive : ""));
    doc.text(doc.splitTextToSize(sub, 115)[0], M + 17, 20);
    doc.setFont("helvetica", "bold"); doc.setFontSize(11.5);
    doc.text(d.codigo, W - M, 12, { align: "right" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
    doc.text("Recibida: " + d.fecha, W - M, 18, { align: "right" });

    // Encabezado
    var y = 31;
    if (logo) { try { doc.addImage(logo, "JPEG", M, y, 19.6, 16); } catch (e) { /* sin logo */ } }
    doc.setTextColor.apply(doc, NAVY); doc.setFont("helvetica", "bold"); doc.setFontSize(14);
    doc.text("Solicitud y preanálisis corto", W - M, y + 7, { align: "right" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor.apply(doc, GRAY);
    doc.text("Bono de Vivienda · Uso interno de BH Constructora", W - M, y + 12.5, { align: "right" });
    y += 19;
    doc.setDrawColor.apply(doc, GOLD); doc.setLineWidth(0.7); doc.line(M, y, W - M, y);

    // Resumen rápido
    y += 5;
    var quick = [
      ["LOTE", d.lote === "propio" ? "Propio" : d.lote === "buscado" ? "Buscado" : "No tiene"],
      ["INGRESO DEL HOGAR", fmtMoney(d.ingresoTotal)],
      ["PERSONAS", String(d.personas)],
      ["BONO PREVIO", d.bono_previo === "No estoy seguro(a)" ? "No sabe" : d.bono_previo]
    ];
    var qw = (CW - 9) / 4;
    quick.forEach(function (q, i) {
      var x = M + i * (qw + 3);
      doc.setFillColor(244, 241, 232); doc.roundedRect(x, y, qw, 14, 2.5, 2.5, "F");
      doc.setFont("helvetica", "bold"); doc.setFontSize(6.6); doc.setTextColor.apply(doc, GRAY);
      doc.text(q[0], x + 3.5, y + 5);
      doc.setFontSize(12); doc.setTextColor.apply(doc, NAVY);
      doc.text(q[1] || "—", x + 3.5, y + 11);
    });
    y += 18;

    // Alertas
    doc.setFontSize(8.6);
    if (d.alertas.length) {
      var lines = [];
      d.alertas.forEach(function (t) { lines = lines.concat(doc.splitTextToSize("•  " + t, CW - 8)); });
      var ah = 9 + lines.length * 4;
      doc.setFillColor(255, 244, 214); doc.setDrawColor(240, 198, 74); doc.setLineWidth(0.3);
      doc.roundedRect(M, y, CW, ah, 2.5, 2.5, "FD");
      doc.setFont("helvetica", "bold"); doc.setFontSize(7.6); doc.setTextColor(122, 84, 0);
      doc.text("PUNTOS A REVISAR POR BH", M + 4, y + 5.5);
      doc.setFont("helvetica", "normal"); doc.setFontSize(8.6); doc.setTextColor(60, 52, 30);
      doc.text(lines, M + 4, y + 10);
      y += ah + 3;
    } else {
      doc.setFillColor(232, 245, 236); doc.setDrawColor.apply(doc, CI); doc.setLineWidth(0.3);
      doc.roundedRect(M, y, CW, 10, 2.5, 2.5, "FD");
      doc.setFont("helvetica", "bold"); doc.setFontSize(8.6); doc.setTextColor.apply(doc, C);
      doc.text("SIN ALERTAS AUTOMÁTICAS", M + 4, y + 6.3);
      doc.setFont("helvetica", "normal"); doc.setTextColor(60, 70, 80);
      doc.text("La información básica no muestra puntos a revisar.", M + 52, y + 6.3);
      y += 13;
    }

    // Secciones
    function section(title, fields, right) {
      doc.setFillColor.apply(doc, NAVY); doc.roundedRect(M, y, CW, 7, 1.5, 1.5, "F");
      doc.rect(M, y + 4, CW, 3, "F");
      doc.setFont("helvetica", "bold"); doc.setFontSize(8.4); doc.setTextColor(255, 255, 255);
      doc.text(title.toUpperCase(), M + 3.5, y + 4.8);
      if (right) { doc.setTextColor.apply(doc, YEL); doc.text(right, W - M - 3.5, y + 4.8, { align: "right" }); }
      y += 7;
      var cw = CW / 3, col = 0, rowTop = y, rowH = 10.5;
      doc.setDrawColor(217, 221, 229); doc.setLineWidth(0.25);
      var startY = y;
      fields.forEach(function (f) {
        var span = f[2] || 1;
        if (col + span > 3) { col = 0; rowTop += rowH; }
        var x = M + col * cw, w = cw * span;
        if (!f[0]) { col += span; if (col >= 3) { col = 0; rowTop += rowH; } return; }
        doc.setFont("helvetica", "normal"); doc.setFontSize(6.6); doc.setTextColor(107, 115, 133);
        doc.text(f[0].toUpperCase(), x + 3, rowTop + 3.8);
        doc.setFont("helvetica", "bold"); doc.setFontSize(9.6); doc.setTextColor(27, 35, 51);
        doc.text(doc.splitTextToSize(f[1] || "—", w - 5)[0], x + 3, rowTop + 8.4);
        if (col > 0) doc.line(x, rowTop, x, rowTop + rowH);
        col += span;
        if (col >= 3) { col = 0; rowTop += rowH; }
      });
      if (col > 0) rowTop += rowH;
      for (var ly = startY + rowH; ly < rowTop - 0.1; ly += rowH) doc.line(M, ly, W - M, ly);
      doc.rect(M, startY, CW, rowTop - startY, "S");
      y = rowTop + 4;
    }

    var sol = [["Nombre completo", d.nombre, 2], ["Cédula", d.cedula], ["Estado civil", d.civil],
      ["Teléfono (WhatsApp)", d.telefono], ["Vive en", d.vive]];
    if (d.conPareja) sol.push(["Pareja", d.pareja_nombre, 2], ["Cédula de la pareja", d.pareja_cedula]);
    section("1 · Solicitante", sol);

    section("2 · Ingresos del hogar", [
      ["Fuente de ingreso", d.fuente],
      [d.fuente === "Asalariado(a)" ? "Patrono" : d.fuente === "Independiente" ? "Actividad" : "Detalle",
        d.patrono || d.actividad || (d.fuente === "Pensionado(a)" ? "Pensión" : "")],
      ["Ingreso mensual (bruto)", fmtMoney(d.ingreso)],
      ["Otros ingresos del hogar", d.ingresoOtros ? fmtMoney(d.ingresoOtros) : "Ninguno"],
      ["Ingreso total del hogar", fmtMoney(d.ingresoTotal), 2]
    ]);

    section("3 · Hogar y antecedentes", [
      ["Personas en el hogar", String(d.personas)], ["Persona con discapacidad", d.discapacidad],
      ["Adulto mayor (65+)", d.adulto_mayor], ["Territorio indígena", d.indigena],
      ["Bono de vivienda previo", d.bono_previo], ["Otras propiedades", d.propiedades]
    ], d.personas + (d.personas === 1 ? " persona" : " personas"));

    if (d.tieneLote) {
      section("4 · Lote", [
        ["Tipo de lote", LOTE_TXT[d.lote]], ["Ubicación", d.lote_ubicacion], ["Plano catastrado", d.plano],
        ["Agua potable", d.agua], ["Frente a calle pública", d.calle], ["", ""]
      ]);
    } else {
      section("4 · Lote", [["Tipo de lote", "Todavía no tiene lote. Los datos se completan cuando lo encuentre.", 3]]);
    }

    // Declaración y firma
    y += 1;
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(75, 85, 104);
    var decl = doc.splitTextToSize("Declaro que la información anterior es verdadera y autorizo a BH Constructora a utilizarla " +
      "de forma confidencial, únicamente para evaluar mi trámite de Bono de Vivienda (Ley 8968). Este preanálisis es " +
      "orientativo: no garantiza la aprobación del bono; BH verifica cada dato con los documentos.", 118);
    doc.text(decl, M, y + 3);
    doc.setDrawColor(27, 35, 51); doc.setLineWidth(0.3);
    doc.line(W - M - 58, y + 12, W - M, y + 12);
    doc.text("Firma del solicitante", W - M - 29, y + 16, { align: "center" });

    // Pie
    doc.setFillColor.apply(doc, NAVY); doc.rect(0, H - 11, W, 11, "F");
    doc.setFontSize(8); doc.setTextColor(255, 255, 255);
    doc.text(CONFIG.empresa + " · WhatsApp " + CONFIG.telefono, M, H - 4.3);
    doc.text(d.codigo + " · Autorizado por el solicitante", W - M, H - 4.3, { align: "right" });

    return doc;
  }

  /* -------------------------------------------------------
     FINALIZAR: crear PDF y mostrar pantalla de envío
     ------------------------------------------------------- */
  function finish() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      showError("No se pudo cargar el generador de PDF. Revise su conexión a Internet e inténtelo de nuevo.");
      return;
    }
    btnNext.disabled = true;
    btnNext.textContent = "Creando su PDF…";
    var d = collect();
    loadLogo().then(function (logo) {
      var doc = buildPdf(d, logo);
      var blob = doc.output("blob");
      lastPdf = { blob: blob, name: d.archivo, data: d };
      var color = d.tieneLote ? "#1E8A4C" : "#7D838C";
      var fileBox = $("[data-sol-file]", form);
      fileBox.style.background = color;
      fileBox.innerHTML = '<span class="sol-file-ic">PDF</span><span>' + escapeHtml(d.archivo) +
        "<small>" + (d.tieneLote ? "Solicitud CON LOTE" : "Solicitud SIN LOTE") + " · " + d.codigo + "</small></span>";
      steps.forEach(function (fs) { fs.hidden = true; });
      nav.hidden = true;
      $(".sol-progress").hidden = true;
      done.hidden = false;
      clearSaved();
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }).catch(function () {
      showError("Ocurrió un problema al crear el PDF. Inténtelo de nuevo.");
    }).then(function () {
      btnNext.disabled = false;
      btnNext.textContent = "Crear mi PDF ✓";
    });
  }

  function download() {
    if (!lastPdf) return;
    var url = URL.createObjectURL(lastPdf.blob);
    var a = document.createElement("a");
    a.href = url; a.download = lastPdf.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function waText(d) {
    return (d.tieneLote ? "🟢 CON LOTE" : "⚪ SIN LOTE") + " – " + d.nombre + " (" + d.codigo + ")\n" +
      "Hola BH Constructora, les envío mi solicitud de Bono de Vivienda.";
  }

  $("[data-sol-share]", form).addEventListener("click", function () {
    if (!lastPdf) return;
    var file = new File([lastPdf.blob], lastPdf.name, { type: "application/pdf" });
    var payload = { files: [file], title: "Solicitud BH Constructora", text: waText(lastPdf.data) };
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share(payload).catch(function () { /* la persona canceló */ });
      return;
    }
    // Computadora: descargar y abrir WhatsApp con el mensaje listo
    download();
    window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(waText(lastPdf.data) +
      "\n(Adjunto el PDF " + lastPdf.name + ")"), "_blank", "noopener");
  });

  $("[data-sol-download]", form).addEventListener("click", download);

  $("[data-sol-restart]", form).addEventListener("click", function () {
    form.reset();
    clearSaved();
    lastPdf = null;
    done.hidden = true;
    nav.hidden = false;
    $(".sol-progress").hidden = false;
    refreshConditional();
    go(1);
  });

  /* -------------------------------------------------------
     NÚMERO: copiar y guardar contacto
     ------------------------------------------------------- */
  $$("[data-sol-phone]").forEach(function (el) { el.textContent = CONFIG.telefono; });

  var copyBtn = $("[data-sol-copy]");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    var txt = CONFIG.telefono;
    var ok = function () { toast("Número copiado: " + txt); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(ok, function () { toast(txt); });
    else toast(txt);
  });

  var vcardBtn = $("[data-sol-vcard]");
  if (vcardBtn) vcardBtn.addEventListener("click", function () {
    var vcf = "BEGIN:VCARD\r\nVERSION:3.0\r\nFN:BH Constructora\r\nORG:BH Constructora – Zona Caribe\r\n" +
      "TEL;TYPE=CELL:+" + CONFIG.whatsapp + "\r\nEND:VCARD\r\n";
    var url = URL.createObjectURL(new Blob([vcf], { type: "text/vcard" }));
    var a = document.createElement("a");
    a.href = url; a.download = "BH-Constructora.vcf";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  });

  /* -------------------------------------------------------
     INICIO
     ------------------------------------------------------- */
  restore();
  refreshConditional();
  go(step, false);
})();
