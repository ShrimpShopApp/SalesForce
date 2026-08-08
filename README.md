# spoti.ch — Gastro-Aktion Swiss Prime Taste AG

Kampagnen-Website. Zwei Aufgaben in einem Auftritt:

1. **Startseite** — Black-Tiger-Sortiment für Gastrobetriebe mit Preisen und dem
   Angebot „Sie kaufen Crevetten, wir bauen Ihre Website“.
2. **/demo** — eine komplette Restaurant-Website als Muster, das man am Telefon
   vorzeigen kann. „Restaurant Seeblick“ ist erfunden.

Reines HTML, CSS und etwas JavaScript. Kein Framework, kein Build-Schritt, keine
externen Abhängigkeiten, keine Tracker. Alle Grafiken sind selbst erstellte SVG.

---

## Preise und Texte ändern

Alles Inhaltliche steht in **einer** Datei: `public/daten/produkte.js`.
Website und One-Pager-PDF lesen beide daraus.

| Was | Wo in `produkte.js` |
|---|---|
| Preise, Artikel, Kaliber, Artikelnummern | `produkte` |
| Aktionsname, Enddatum, Mindestmenge | `aktion` |
| Hosting, Eigentum, Glasur-Angabe | `konditionen` |
| Restposten-Hinweis ein-/ausblenden | `restposten.aktiv` |
| True Count und BIO erklären | `erklaerungen` |
| Telefon, Adresse, E-Mail | `kontakt` |

Ändern, committen, pushen — nach zwei bis drei Minuten ist es live.

**Notbremse:** `"preise_freigegeben": false` blendet sämtliche Preise aus, setzt
überall „Preis auf Anfrage“ und einen Hinweisbalken auf die Seite. Für den Fall,
dass mit den Preisen etwas nicht stimmt und es schnell gehen muss.

Texte ausserhalb des Sortiments stehen direkt in `public/index.html`,
das Demo-Restaurant in `public/demo/*.html`, Farben und Schriften oben in
`public/assets/css/style.css` bzw. `demo.css`.

---

## Ordnerstruktur

```
public/                    ← alles hier drin geht auf den Webserver
├── index.html             Startseite
├── impressum.html         Impressum und Datenschutz
├── .htaccess              HTTPS, Kompression, Caching
├── CNAME                  Domain fuer GitHub Pages (www.spoti.ch)
├── robots.txt · sitemap.xml
├── daten/produkte.js      einzige Inhalts- und Preisquelle
├── assets/css · js · img · video
└── demo/                  Muster-Restaurant (auf noindex)

.github/workflows/
├── static.yml             Livegang auf GitHub Pages — das ist spoti.ch
└── deploy.yml             Kopie auf cyon per FTP, nur von Hand
```

---

## Deployment

Jeder Push auf `main` veröffentlicht die Seite über **GitHub Pages** — das ist
spoti.ch. Zuständig ist `.github/workflows/static.yml`, es läuft von selbst.
Ändern, committen, pushen, fertig. Kein FTP, kein FileZilla, keine Secrets.

Veröffentlicht wird ausschliesslich der Ordner `public/`, niemals die
Repo-Wurzel. Die Domain hängt an zwei Stellen: an `public/CNAME` und an
**Settings → Pages → Custom domain**. Beide sagen `www.spoti.ch`.

Vor dem Hochladen prüft der Workflow, ob die Pflichtdateien da sind und die
Unsplash-Fotos geladen werden konnten — sonst bricht er ab und lädt nichts hoch.
Steht `preise_freigegeben` auf `false`, läuft er durch und schreibt eine Warnung
ins Log.

### Die FTP-Kopie auf cyon

`.github/workflows/deploy.yml` legt dieselben Dateien zusätzlich in einem
cyon-Ordner ab. Das ist **nicht** das Deployment von spoti.ch und läuft
ausschliesslich von Hand: **Actions → „Kopie auf cyon per FTP“ → Run workflow**.

Unter **Settings → Secrets and variables → Actions**:

| Art | Name | Standard |
|---|---|---|
| Secret | `FTP_PASSWORD` | — muss gesetzt sein |
| Variable | `FTP_HOST` | `s039.cyon.net` |
| Variable | `FTP_USER` | `admin@spoti.ch` |
| Variable | `FTP_ZIEL` | `/salesforce/` |

Nur das Passwort ist Pflicht, der Rest hat Vorgabewerte. `FTP_ZIEL` ist der
häufigste Stolperstein: Das FTP-Konto startet in einem anderen Verzeichnis, der
Webroot liegt eine Ebene tiefer in `salesforce/`. Läuft der Workflow grün durch,
aber es ändert sich nichts, liegen die Dateien eine Ordnerebene daneben.

Es wird nur hochgeladen, was sich geändert hat — der Workflow merkt sich den
Stand auf dem Server.

---

## Lokal anschauen

`public/index.html` im Browser öffnen. Mehr braucht es nicht.

---

## Sicherheit

Das Repository ist **öffentlich**. Zugangsdaten gehören ausschliesslich in die
GitHub Secrets, niemals in eine Datei. Verkaufsunterlagen und interne Notizen
sind über `.gitignore` ausgeschlossen und bleiben lokal.

Falls doch einmal ein Passwort in einen Commit rutscht: zuerst beim Anbieter
ändern, dann erst aufräumen. Siehe `SICHERHEIT.md`.
