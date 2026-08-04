# Sicherheitshinweis

Dieses Repository ist **oeffentlich**. Jeder kann den Inhalt lesen.

## Was hier niemals hinein darf

- FTP-Benutzername und -Passwort
- Datenbank-Zugangsdaten
- API-Schluessel
- Kundendaten, Preislisten mit Kundennamen, Leadlisten mit Telefonnummern

Zugangsdaten gehoeren ausschliesslich in
**Settings -> Secrets and variables -> Actions**.

## Falls doch einmal etwas hineingerutscht ist

Ein `git revert` reicht nicht - der alte Stand bleibt in der Historie lesbar.
Richtige Reihenfolge:

1. Passwort beim Anbieter (mycyon.ch) sofort aendern
2. Erst danach die Datei aus dem Repo entfernen
3. Bei Bedarf Historie bereinigen (`git filter-repo`) und force-pushen

Schritt 1 ist der wichtige. Ein einmal veroeffentlichtes Passwort gilt als
kompromittiert, egal wie schnell der Commit geloescht wurde.
