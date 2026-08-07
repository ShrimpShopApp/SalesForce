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

  /* ------------------------------------- Empfehlungen: 1 gross + 2 klein */
  var ziel = el("produkt-karten");
  if (ziel) {
    var tops = D.produkte.filter(function (p) { return p.highlight; });

    function preisHtml(p) {
      return hatPreis(p)
        ? '<div class="emp__preis"><b>' + chf(p.gastro_preis) + "</b>" +
          "<span>pro " + p.einheit + " &middot; exkl. MwSt.</span></div>"
        : '<div class="emp__preis"><b>Preis auf Anfrage</b>' +
          "<span>Wir rechnen Ihren Betriebspreis aus.</span></div>";
    }

    var haupt = tops[0];
    var html = "";

    if (haupt) {
      html +=
        '<article class="emp__haupt">' +
          '<img class="emp__haupt-bild" src="assets/img/foto-rohware.webp" ' +
            'alt="Rohe Black Tiger Crevetten auf Eis" width="938" height="704">' +
          '<div class="emp__haupt-schleier"></div>' +
          '<span class="emp__flagge">' +
            (haupt.label === "BIO" ? "Empfehlung &middot; BIO-Label" : "Empfehlung") +
          "</span>" +
          "<h3>" + haupt.name + "</h3>" +
          '<p class="emp__unter">' + haupt.untertitel + "</p>" +
          '<div class="emp__zahlen">' +
            "<span>" + haupt.kaliber + "</span>" +
            "<span>" + haupt.aufmachung + "</span>" +
            "<span>" + haupt.gebinde + "</span>" +
            "<span>Art. " + haupt.art_nr + "</span>" +
          "</div>" +
          preisHtml(haupt) +
        "</article>";
    }

    html += '<div class="emp__neben">' +
      tops.slice(1).map(function (p) {
        return (
          '<article class="emp__klein">' +
            '<span class="emp__flagge' + (p.label === "BIO" ? " emp__flagge--bio" : "") + '">' +
              (p.label === "BIO" ? "BIO-Label" : "Empfehlung") + "</span>" +
            "<h3>" + p.name + "</h3>" +
            "<p>" + p.beschreibung + "</p>" +
            '<div class="emp__zahlen" style="color:var(--text-hell)">' +
              "<span>" + p.kaliber + "</span>" +
              "<span>" + p.gebinde + "</span>" +
              "<span>Art. " + p.art_nr + "</span>" +
            "</div>" +
            preisHtml(p) +
          "</article>"
        );
      }).join("") +
    "</div>";

    ziel.innerHTML = html;
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
            "<tr" + (p.highlight ? ' class="empfohlen"' : "") + ">" +
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

  /* ----------------------------------------------------------- Deal ----- */
  var dealText = el("deal-text");
  if (dealText) { dealText.textContent = D.aktion.deal_text; }

  /* ------------------------------------------------------ Hero-Etikett -- */
  var bioAnzahl = D.produkte.filter(function (p) { return p.label === "BIO"; }).length;
  var etikettWerte = {
    gueltig_bis: D.aktion.gueltig_bis,
    mindestmenge: D.aktion.mindestmenge_kg + " kg / Jahr",
    artikel: D.produkte.length + " Artikel",
    bio: bioAnzahl + " Artikel"
  };
  document.querySelectorAll("[data-etikett]").forEach(function (n) {
    var feld = n.getAttribute("data-etikett");
    if (etikettWerte[feld]) { n.textContent = etikettWerte[feld]; }
  });

  var gueltig = el("aktion-gueltig");
  if (gueltig) {
    gueltig.textContent = D.aktion.titel +
      " · gültig bis " + D.aktion.gueltig_bis +
      " · ab " + D.aktion.mindestmenge_kg + " kg Jahresmenge";
  }

  /* ----------------------------------------------------- Konditionen ---- */
  var k = D.konditionen || {};
  document.querySelectorAll("[data-kondition]").forEach(function (n) {
    var feld = n.getAttribute("data-kondition");
    if (k[feld]) { n.textContent = k[feld]; }
  });

  /* -------------------------------------------------------- Kontakt ----- */
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
    // Block-Reveal, bewusst einfach gehalten. Sicherheitsnetz: was der
    // Observer nicht einblendet, wird nach 1,2 s hart sichtbar gemacht —
    // Inhalt darf auf einer Verkaufsseite niemals verborgen bleiben.
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("da");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.05 });
    zeigElemente.forEach(function (n) { io.observe(n); });
    setTimeout(function () {
      zeigElemente.forEach(function (n) { n.classList.add("da"); });
    }, 1200);
  }

  /* ------------------------------------------------------------ Jahr ---- */
  var jahr = el("jahr");
  if (jahr) { jahr.textContent = new Date().getFullYear(); }
})();
