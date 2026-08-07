/* ==========================================================================
   spoti.ch - Scroll-Film: die Scrollposition steuert die Abspielzeit.
   Kein Autoplay. Wer nicht scrollt, sieht ein Standbild.
   Gehoert zu .film in assets/css/film.css.
   ========================================================================== */
(function () {
  "use strict";

  var film = document.querySelector(".film");
  if (!film) { return; }

  var video = film.querySelector(".film__video");
  var balken = film.querySelector(".film__fortschritt span");
  if (!video) { return; }

  var reduziert = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Bei reduzierter Bewegung wird nichts geladen und nichts bewegt. */
  if (reduziert) { return; }

  /* Schmale Viewports bekommen die leichtere Fassung. */
  var schmal = window.matchMedia &&
    window.matchMedia("(max-width: 860px)").matches;
  var quelle = schmal
    ? video.getAttribute("data-quelle-schmal")
    : video.getAttribute("data-quelle-breit");
  if (!quelle) { return; }

  video.src = quelle;
  video.load();

  var dauer = 0;
  var ziel = 0;
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

    if (balken) {
      balken.style.transform = "scaleX(" + p + ")";
      balken.style.width = "100%";
    }

    if (!dauer) { return; }

    /* Letztes Vollbild nie ganz erreichen, sonst springt der Decoder ans Ende. */
    ziel = p * (dauer - 0.05);

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
})();
