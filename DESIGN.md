# DESIGN.md — Kurzfassung Regeln

Vollstaendige Regeln: siehe Abschnitte unten. Vor jeder UI-Aenderung lesen.

## Farben — shrimpshop.ch Corporate Design (Chris, 07.08.2026)

Palette = shrimpshop.ch CI. Alles ueber CSS-Variablen in `style.css` `:root`,
nie rohe Hex-Werte in Komponenten:

- Dominant Schwarz `--tief: #020202` (plus `--tief-2: #101010`, `--tief-3: #1b1b1b`)
- Akzent CI-Gold `--koralle: #d7b55d` / `--koralle-hell: #dfc876`
  (Variablennamen aus Kompatibilitaet behalten — Werte sind Gold)
- Lesbares Gold fuer Text auf hellem Grund `--akzent-tinte: #7a6023`
- Papier `--creme/-2`, Tinte `--text/--text-hell`, Linien `--linie/--linie-dunkel`
- BIO: CI-Gruen `--bio: #2e9e63` (hell abgedunkelt) / `--bio-hell: #60e098`
  (Original, nur auf dunklem Grund) · Hinweisrand `--gold: #b5964e`

**Goldflaechen und Gold-Buttons tragen dunkle Schrift (#020202), nie weiss —
exakt wie im Shop.** Gold-TEXT auf hellem Grund nutzt `--akzent-tinte`.

Verboten: Violett/Indigo in jeder Form · dritter Akzent · reines #000/#fff als
TEXT (CI-Flaechenschwarz #020202 und Dunkeltext auf Gold sind die kodifizierten
Ausnahmen). Erlaubte Verlaeufe: nur einfarbig schwarze Foto-Overlays
(`.hero__schleier`, `.emp__haupt-schleier`, `.d-hero__schleier`).

## Logo-Regel (Chris, 06.08.2026)

Jedes Deliverable traegt das SPT-Logo — `logo-hell.png` auf dunklem,
`logo-dunkel.png` auf hellem Grund. Wortmarke ist kein Ersatz. Einzige
Ausnahme: die Demo-Restaurant-Seiten (SPT nur im "Gebaut von"-Vermerk).

## Schrift

Display **Space Grotesk** · Body **Source Sans 3** · Mono **JetBrains Mono**
(Zahlen, Artikelnummern, Preise; `font-variant-numeric: tabular-nums`).
Nie: Inter, Roboto, Open Sans, Arial, system-ui, -apple-system, Segoe UI,
Lato, Montserrat, Poppins. Demo separat: Fraunces + Instrument Sans.

## Typografie und Raum

8px-Raster (`8/16/24/32/48/64/96`; 4px nur fuer optische Korrekturen).
Gewichte 200/400/800 (700 nur als Maximum von Space Grotesk und Mono).
4 Groessenstufen: `--t-hero` `clamp(2.75rem,6.5vw,5rem)` ·
`--t-sektion` `clamp(1.75rem,3.5vw,2.25rem)` · `--t-body` `1.0625rem` ·
`--t-meta` `.6875rem` (mono, uppercase, .22em). Zeilenhoehe 1.05/1.65,
Zeilenlaenge max. 68ch.

## Komponenten — wiederverwenden statt neu erfinden

Kein React/Tailwind/Build-Schritt — pures HTML/CSS/Vanilla-JS. Inhalte kommen
aus `public/daten/produkte.js` (Preise, Konditionen, Kontakt — nie in Markup
hart codieren; Bindung via `[data-kontakt]`, `[data-kondition]`,
`[data-etikett]`).

Struktur: `.wrap` · `.sek` `--creme/--dunkel/--deal` · `.sek__kopf` ·
`.kopf`/`.fuss`. Inhalt: `.liste`+`.liste-huelle` (Preistabelle = Hauptkomponente,
`tr.empfohlen` Goldkante) · `.emp` (1 Foto-Panel + 2 kleine) · `.etikett` ·
`.trust` · `.erklaerungen` · `.restposten` · `.preis-warnung` · `.deal`+
`.konditionen` (Goldband, dunkle Schrift) · `.merkmale` · `.kontakt`/
`.tel-gross` · `.demo-cta`+`.browser` · Hero-Ebenen `.hero__bild`+
`.hero__schleier`. Controls: `.btn` `--primaer/--geist/--dunkel` (primaer =
Gold mit Dunkeltext, Press `scale(.97)`) · `.label`/`--hell` · `.chip`/`--bio` ·
`.zeig` (Block-Reveal, IntersectionObserver + 1.2s-Sicherheitsnetz).

Scroll-Film (`assets/css/film.css` + `assets/js/film.js`, `.film*`, nur
`black-tiger.html`): Die Scrollposition steuert `video.currentTime`, kein
Autoplay. `.film__buehne` klebt, `.film__kapitel-liste` laeuft darueber.
Nutzt ausschliesslich Variablen aus `style.css`; der `.film__schleier` ist ein
einfarbig schwarzes Foto-Overlay. Bei `prefers-reduced-motion` wird kein Video
geladen, das Standbild traegt und die Kapitel sind normale Abschnitte.
Video liegt als Binaerdatei unter `assets/video/` (nicht als `.b64`).

Demo (`assets/css/demo.css`, `.d-*`): eigenes System (Nacht/Messing/Papier,
Fraunces) — bleibt auch nach dem CI-Wechsel eigenstaendig; sie muss wie die
Website eines Kunden aussehen, nicht wie shrimpshop.

Bilder: Fotos laedt der Workflow beim Build vom Unsplash-CDN (Schritt "Fotos
laden", Quellen in `BILDNACHWEIS.md`); `*.b64`-Dateien werden zu Binaerdateien
dekodiert.

## Bewegung

`--ease-out: cubic-bezier(.23,1,.32,1)`, nie `ease-in`, nie `transition: all`.
Unter 300ms (Buttons 160, Karten 200, Reveals 380). Nur transform/opacity.
Hover hinter `@media (hover:hover) and (pointer:fine)`.
`prefers-reduced-motion` respektieren.

## Verboten

Drei runde Karten nebeneinander (2+1 oder 1 breit + 2 schmal) · zentrierte
Heroes · 0.1-Schatten ueberall (2 Schatten sind das Maximum) · Rahmen um jede
Box · Lorem ipsum/Platzhalter (Demo-Restaurant ist die markierte Ausnahme) ·
Emoji als Icons · erfundene Preise/Mengen/Konditionen · neue Farbe/Schrift/
Groesse ohne Aenderung dieser Datei.

## Barrierefreiheit

Kontrast 4.5:1 (3:1 gross) · sichtbares `:focus-visible` (3px Gold, 3px
Offset) · Touchziele >= 44px · `alt`-Texte · Breakpoints 375/768/1024/1440 ·
`lang="de-CH"`, ss statt Eszett.

## Vor jedem Commit

- [ ] SPT-Logo drauf (hell auf dunkel, dunkel auf hell)
- [ ] CI-Palette: Schwarz #020202, Gold #d7b55d/#dfc876, Dunkeltext auf Gold
- [ ] Keine verbotene Schrift, kein Violett, kein dritter Akzent
- [ ] 8px-Raster, Gewichte 200/400/800 (700 = Grotesk/Mono-Max)
- [ ] Nur Variablen, kein rohes Hex
- [ ] Kein `transition: all`, kein `ease-in`
- [ ] Bestehende Klasse wiederverwendet
- [ ] Preise/Kontakt aus `produkte.js`
- [ ] HTML validiert, 375px geprueft
