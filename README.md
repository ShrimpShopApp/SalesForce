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
├── robots.txt · sitemap.xml
├── daten/produkte.js      einzige Inhalts- und Preisquelle
├── assets/css · js · img
└── demo/                  Muster-Restaurant (auf noindex)

.github/workflows/
├── static.yml             Vorschau auf GitHub Pages
└── deploy.yml             Livegang per FTP auf mycyon.ch
```

---

## Deployment

Jeder Push auf `main` lädt die Seite automatisch per FTP auf mycyon.ch — das ist
spoti.ch. Kein manueller Upload, kein FileZilla. Ändern, committen, pushen, fertig.

Dafür braucht der Workflow drei Secrets unter
**Settings → Secrets and variables → Actions**:

| Name | Wert |
|---|---|
| `FTP_SERVER` | FTP-Host, z. B. `ftp.spoti.ch` |
| `FTP_USERNAME` | FTP-Benutzername |
| `FTP_PASSWORD` | FTP-Passwort |

Fehlt eines davon, bricht der Workflow im ersten Schritt ab und schreibt ins
Log, welches. Er lädt in dem Fall nichts hoch.

Optional unter *Variables*, falls abweichend:

| Name | Standard | Wann ändern |
|---|---|---|
| `FTP_PROTOCOL` | `ftps` | auf `ftp`, wenn der Server kein FTPS kann |
| `FTP_PORT` | `21` | bei abweichendem Port |
| `FTP_SERVER_DIR` | `/` | z. B. `/httpdocs/` oder `/public_html/` |

`FTP_SERVER_DIR` ist der häufigste Stolperstein. Läuft der Workflow grün durch,
aber auf spoti.ch ändert sich nichts, liegen die Dateien eine Ordnerebene daneben.
Im FTP-Programm nachsehen, wo die Website liegt, und den Pfad eintragen.

Es wird nur hochgeladen, was sich geändert hat — der Workflow merkt sich den
Stand auf dem Server.

### Vorschau vor dem Livegang

Wer eine Änderung erst anschauen will, ohne spoti.ch anzufassen:
**Actions → „Vorschau auf GitHub Pages“ → Run workflow**. Läuft ausschliesslich
von Hand, damit keine zweite öffentliche Kopie der Seite entsteht, die spoti.ch
bei Google Konkurrenz macht.

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
