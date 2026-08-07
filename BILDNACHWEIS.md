# Bildnachweis

Alle Fotos stammen von Unsplash und stehen unter der Unsplash-Lizenz
(https://unsplash.com/de/lizenz): kostenlose kommerzielle Nutzung,
keine Namensnennung erforderlich, kein Weiterverkauf unveraendert.

Die Fotos liegen nicht im Repo — die Workflows laden sie beim Build
direkt vom Unsplash-CDN (Schritt "Fotos laden").

| Datei | Motiv | Quelle (Unsplash-Foto-ID) |
|---|---|---|
| foto-hero-see.webp | Gartenterrasse am See | photo-1773806902883-8a65768c75f6 |
| foto-crevetten-grill.webp | Gegrillte Crevetten, dunkler Teller | photo-1684253193395-bb87ad32d4be |
| foto-fisch-ofen.webp | Ganze Fische auf Backblech | photo-1717465962264-517140fe69b1 |
| foto-terrasse.webp | Terrassentisch mit Seeblick | photo-1760546070850-a8a3531bb857 |
| foto-rohware.webp | Rohe Crevetten auf Eis | photo-1756364084889-9a8d9ece6112 |
| foto-tafel-kerzen.webp | Gedeckter Tisch, Kerzen und Wein am Abend | photo-1580929753530-ef52238116c5 |
| foto-fassade-abend.webp | Beleuchtete Restaurantfassade am Abend | photo-1726873800099-53f5496281e0 |
| foto-interieur.webp | Gastraum mit warmem Lampenlicht | photo-1552960226-639240203497 |

## KI-erzeugte Aufnahmen (Scroll-Film auf der Startseite)

Diese Dateien liegen als Binaerdatei im Repo, nicht auf Unsplash. Erzeugt am
07.08.2026 mit Higgsfield (Bilder: Nano Banana Pro, Film: FLUX 3 Video), Motiv
und Bildregie von uns. Keine Fremdrechte, keine Namensnennung noetig.

| Datei | Motiv |
|---|---|
| video/bt-film.mp4 | Eisblock schmilzt von der Crevette weg, 6 s, 1600 px |
| video/bt-film-mobil.mp4 | dasselbe, leichtere Fassung fuer schmale Viewports |
| img/bt-film-poster.jpg | erstes Vollbild des Films (Standbild) |
| img/bt-film-poster-mobil.jpg | erstes Vollbild der Mobil-Fassung |
| img/bt-hero.jpg | Hero der Startseite: rohe Black Tiger auf Schiefer, linke Bildhaelfte bewusst leer fuer die Ueberschrift |
| img/bt-eis.jpg | einzeln gefrostete Crevetten mit Reif (derzeit ungenutzt) |
| img/bt-bio.jpg | einzelne rohe Crevette auf dunklem Schiefer, Qualitaets-Sektion |
| img/bt-og.jpg | Standbild des Films als Teilen-Vorschau (og:image) |

Und fuer den Scroll-Film der Demo (`demo/index.html`), erzeugt gleich, aber in
der Demo-Anmutung (Nacht, Messing, Papier) statt in der SPT-CI:

| Datei | Motiv |
|---|---|
| video/d-film.mp4 | Fahrt entlang der gedeckten Terrassentafel, Abend kippt zu Kerzenlicht, 10 s, 1600 px |
| video/d-film-mobil.mp4 | dasselbe, leichtere Fassung fuer schmale Viewports |
| img/d-film-poster.jpg | erstes Vollbild des Films (Standbild) |
| img/d-film-poster-mobil.jpg | erstes Vollbild der Mobil-Fassung |

Merke fuer kuenftige Filme: Ein Storyboard-Bild NICHT als Bildreferenz an das
Videomodell geben. Es filmt dann das Raster ab, statt den Look zu uebernehmen.
Look ueber den Prompt beschreiben, Referenz weglassen.

Logo: Eigentum der Swiss Prime Taste AG.
demo-vorschau.jpg: eigener Screenshot der Demo-Startseite, aufgenommen am
07.08.2026 nach dem Umbau auf den Scroll-Film. Liegt als gewoehnliche
Binaerdatei im Repo, nicht mehr als `.b64`. Nach jedem groesseren Umbau der
Demo neu aufnehmen, sonst zeigt die Startseite einen veralteten Auftritt.
Eigene Produktfotos von SPT koennen jedes Unsplash-Bild ersetzen —
URL im Workflow-Schritt austauschen oder Datei direkt einchecken.
