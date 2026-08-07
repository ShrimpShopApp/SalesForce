/* ==========================================================================
   spoti.ch - Scroll-Film: die Scrollposition steuert die Abspielzeit.
   Kein Autoplay. Wer nicht scrollt, sieht ein Standbild.

   Bewusst ueber data-Attribute statt Klassen angebunden, damit die Demo mit
   ihrem eigenen Klassensystem (.d-*) dasselbe Skript nutzen kann:

     <section data-film>
       <video data-film-video
              data-quelle-breit="..." data-quelle-schmal="..."></video>
       <div data-film-fortschritt><span></span></div>
     </section>
   ========================================================================== */
(function () {
  "use strict";

  var reduziert = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Bei reduzierter Bewegung wird kein Video geladen und nichts bewegt. */
  if (reduziert) { return; }

  var schmal = window.matchMedia &&
    window.matchMedia("(max-width: 860px)").matches;

  document.querySelectorAll("[data-film]").forEach(function (film) {
    var video = film.querySelector("[data-film-video]");
    if (!video) { return; }

    var balkenHuelle = film.querySelector("[data-film-fortschritt]");
    var balken = balkenHuelle ? balkenHuelle.querySelector("span") : null;

    var quelle = schmal
      ? video.getAttribute("data-quelle-schmal")
      : video.getAttribute("data-quelle-breit");
    if (!quelle) { return; }

    /* Als Blob laden statt direkt zu verlinken.
       Ein per <video src="datei.mp4"> geladenes Video ist nur springbar, wenn
       der Server HTTP-Range beantwortet. Ein Blob ist es immer, und das
       Springen kostet danach keinen Netzwerkzugriff mehr. Klappt der Abruf
       nicht, bleibt das Standbild stehen: Die Seite bleibt vollstaendig
       lesbar, sie bewegt sich nur nicht. */
    var objektUrl = null;
    fetch(quelle)
      .then(function (a) {
        if (!a.ok) { throw new Error("Film nicht ladbar: " + a.status); }
        return a.blob();
      })
      .then(function (blob) {
        objektUrl = URL.createObjectURL(blob);
        video.src = objektUrl;
        video.load();
      })
      .catch(function () { /* Standbild traegt */ });

    window.addEventListener("pagehide", function () {
      if (objektUrl) { URL.revokeObjectURL(objektUrl); }
    });

    var dauer = 0;
    var gesetzt = -1;
    var laeuft = false;

    video.addEventListener("loadedmetadata", function () {
      dauer = video.duration || 0;
      zeichnen();
    });

    /* iOS laedt Videos ohne Geste teils nicht. Einmal kurz anspielen und
       sofort anhalten macht das Element seekbar, ohne dass etwas abspielt. */
    var gezuendet = false;
    function zuenden() {
      if (gezuendet) { return; }
      gezuendet = true;
      var p = video.play();
      if (p && typeof p.then === "function") {
        p.then(function () { video.pause(); }).catch(function () { /* egal */ });
      } else {
        video.pause();
      }
    }
    window.addEventListener("touchstart", zuenden, { once: true, passive: true });
    window.addEventListener("pointerdown", zuenden, { once: true, passive: true });

    function fortschritt() {
      var box = film.getBoundingClientRect();
      var weg = film.offsetHeight - window.innerHeight;
      if (weg <= 0) { return 0; }
      var p = -box.top / weg;
      return p < 0 ? 0 : (p > 1 ? 1 : p);
    }

    function zeichnen() {
      laeuft = false;
      var p = fortschritt();

      if (balken) { balken.style.transform = "scaleX(" + p + ")"; }

      if (!dauer) { return; }

      /* Das letzte Vollbild nie ganz treffen, sonst springt der Decoder ans Ende. */
      var ziel = p * (dauer - 0.05);

      /* Nur suchen, wenn es sich lohnt und der Decoder frei ist. */
      if (Math.abs(ziel - gesetzt) < 0.02) { return; }
      if (video.seeking) { return; }

      gesetzt = ziel;
      try { video.currentTime = ziel; } catch (e) { /* noch nicht bereit */ }
    }

    function anstossen() {
      if (laeuft) { return; }
      laeuft = true;
      window.requestAnimationFrame(zeichnen);
    }

    window.addEventListener("scroll", anstossen, { passive: true });
    window.addEventListener("resize", anstossen, { passive: true });
    video.addEventListener("seeked", anstossen);

    zeichnen();
  });
})();
