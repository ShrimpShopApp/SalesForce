/* ==========================================================================
   spoti.ch - rendert Sortiment, Preise, Merkmale und Kontakt
   aus daten/produkte.js
   ========================================================================== */
(function () {
  "use strict";

  var D = window.SPOTI_DATEN;
  if (!D) { return; }

  var frei = D.preise_freigegeben === true;

  function chf(n) {
    return "CHF " + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  }

  function el(id) { return document.getElementById(id); }

  function hatPreis(p) {
    return frei && typeof p.gastro_preis === "number";
  }

  function preisText(p) {
    return hatPreis(p) ? chf(p.gastro_preis) : "auf Anfrage";
  }

  /* ---------------------------------------------------- Preishinweis ---- */
  var warnung = el("preis-warnung");
  if (warnung && !frei) {
    warnung.innerHTML =
      "<strong>Preise noch nicht freigegeben</strong>" +
      "Diese Seite ist noch nicht verkaufsbereit. Preise in " +
      "<code>public/daten/produkte.js</code> eintragen und " +
      "<code>preise_freigegeben</code> auf <code>true</code> setzen.";
    warnung.hidden = false;
  }

  /* ------------------------------------------------- Empfehlungskarten -- */
  var ziel = el("produkt-karten");
  if (ziel) {
    ziel.innerHTML = D.produkte.filter(function (p) {
      return p.highlight;
    }).map(function (p) {

      var preisBlock = hatPreis(p)
        ? '<div class="karte__preis"><b>' + chf(p.gastro_preis) + "</b>" +
          "<span>pro " + p.einheit + " &middot; exkl. MwSt.</span></div>"
        : '<div class="karte__preis karte__preis--offen"><b>Preis auf Anfrage</b>' +
          "<span>Wir rechnen Ihnen Ihren Betriebspreis aus.</span></div>";

      return (
        '<article class="karte karte--top">' +
          '<span class="karte__flagge' + (p.label === "BIO" ? " karte__flagge--bio" : "") + '">' +
            (p.label === "BIO" ? "BIO-Label" : "Empfehlung") + "</span>" +
          '<span class="karte__kaliber">' + p.kaliber + "</span>" +
          "<h3>" + p.name + "</h3>" +
          '<p class="karte__unter">' + p.untertitel + "</p>" +
          '<p class="karte__text">' + p.beschreibung + "</p>" +
          '<ul class="karte__meta">' +
            "<li><strong>Aufmachung:</strong> " + p.aufmachung + "</li>" +
            "<li><strong>Gebinde:</strong> " + p.gebinde + "</li>" +
            "<li><strong>Zählweise:</strong> " + (p.count || "-") +
              ' <a class="karte__info" href="#erklaerungen">was ist das?</a></li>' +
            "<li><strong>Artikel-Nr.:</strong> " + p.art_nr + "</li>" +
          "</ul>" +
          preisBlock +
        "</article>"
      );
    }).join("");
  }

  /* ------------------------------------------------- Vollständige Liste -- */
  var tab = el("preisliste");
  if (tab) {
    var gruppen = [];
    D.produkte.forEach(function (p) {
      if (gruppen.indexOf(p.gruppe) === -1) { gruppen.push(p.gruppe); }
    });

    var html =
      "<thead><tr>" +
        "<th>Artikel</th>" +
        '<th class="nur-breit">Aufmachung</th>' +
        '<th class="nur-breit">Gebinde</th>' +
        '<th class="rechts">Preis</th>' +
      "</tr></thead>";

    gruppen.forEach(function (g) {
      html += '<tbody><tr class="liste__gruppe"><th colspan="4">' +
              (g === "BIO" ? "Bio-Sortiment" : "Standard-Sortiment") +
              "</th></tr>";

      D.produkte.filter(function (p) { return p.gruppe === g; })
        .forEach(function (p) {
          html +=
            "<tr>" +
              "<td><strong>" + p.name + "</strong>" +
                (p.label === "BIO" ? ' <span class="chip chip--bio">BIO</span>' : "") +
                (p.count ? ' <span class="chip">' + p.count + "</span>" : "") +
                '<span class="liste__klein">' + p.kaliber +
                " &middot; Art. " + p.art_nr + "</span>" +
                '<span class="liste__klein nur-schmal">' + p.aufmachung +
                " &middot; " + p.gebinde + "</span></td>" +
              '<td class="nur-breit">' + p.aufmachung + "</td>" +
              '<td class="nur-breit">' + p.gebinde + "</td>" +
              '<td class="rechts' + (hatPreis(p) ? " liste__preis" : " liste__offen") + '">' +
                preisText(p) +
                (hatPreis(p) ? '<span class="liste__klein">pro ' + p.einheit + "</span>" : "") +
              "</td>" +
            "</tr>";
        });

      html += "</tbody>";
    });

    tab.innerHTML = html;
  }

  /* ----------------------------------------------------- Erklärungen ---- */
  var erk = el("erklaerungen-inhalt");
  if (erk && D.erklaerungen) {
    erk.innerHTML = D.erklaerungen.map(function (e) {
      return "<div><h3>" + e.titel + "</h3><p>" + e.text + "</p></div>";
    }).join("");
  }

  /* ------------------------------------------------------- Restposten --- */
  var rest = el("restposten");
  if (rest && D.restposten && D.restposten.aktiv) {
    rest.innerHTML =
      "<h3>" + D.restposten.titel + "</h3><p>" + D.restposten.text + "</p>";
    rest.hidden = false;
  }

  /* -------------------------------------------------------- Merkmale ---- */
  var merk = el("merkmale");
  if (merk) {
    merk.innerHTML = D.eigenschaften.map(function (e) {
      return "<li>" + e + "</li>";
    }).join("");
  }

  /* ------------------------------------------------------------ Deal ----- */
  var dealText = el("deal-text");
  if (dealText) { dealText.textContent = D.aktion.deal_text; }

  var gueltig = el("aktion-gueltig");
  if (gueltig) {
    gueltig.textContent = D.aktion.titel +
      " · gültig bis " + D.aktion.gueltig_bis +
      " · ab " + D.aktion.mindestmenge_kg + " kg Jahresabnahme";
  }

  /* ----------------------------------------------------- Konditionen ---- */
  var k = D.konditionen || {};
  document.querySelectorAll("[data-kondition]").forEach(function (n) {
    var feld = n.getAttribute("data-kondition");
    if (k[feld]) { n.textContent = k[feld]; }
  });

  /* ------------------------------------------------------- Kontakt ----- */
  var ko = D.kontakt;
  document.querySelectorAll("[data-kontakt]").forEach(function (n) {
    var feld = n.getAttribute("data-kontakt");
    if (feld === "telefon") {
      n.textContent = ko.telefon;
      if (n.tagName === "A") { n.href = "tel:" + ko.telefon_link; }
    } else if (feld === "email" || feld === "bestellung") {
      n.textContent = ko[feld];
      if (n.tagName === "A") {
        n.href = "mailto:" + ko[feld] + "?subject=Gastro-Aktion%202026%20Black%20Tiger";
      }
    } else if (feld === "adresse") {
      n.innerHTML = ko.firma + "<br>" + ko.strasse + "<br>" + ko.ort;
    } else if (ko[feld]) {
      n.textContent = ko[feld];
    }
  });

  /* ---------------------------------------------------- Scroll-Reveal ---- */
  var reduziert = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var zeigElemente = document.querySelectorAll(".zeig");
  if (!("IntersectionObserver" in window) || reduziert) {
    zeigElemente.forEach(function (n) { n.classList.add("da"); });
  } else {
    zeigElemente.forEach(function (n) {
      // Kinder von Rastern gestaffelt einblenden (30-80ms Abstand)
      Array.prototype.forEach.call(n.children, function (kind, i) {
        kind.style.setProperty("--verz", Math.min(i * 60, 360) + "ms");
        kind.classList.add("zeig");
      });
    });
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("da");
          e.target.querySelectorAll(".zeig").forEach(function (k) {
            k.classList.add("da");
          });
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -60px 0px", threshold: 0.05 });
    zeigElemente.forEach(function (n) {
      if (!n.closest(".zeig") || n.closest(".zeig") === n) { io.observe(n); }
    });
  }

  /* ------------------------------------------------------------ Jahr ---- */
  var jahr = el("jahr");
  if (jahr) { jahr.textContent = new Date().getFullYear(); }
})();
