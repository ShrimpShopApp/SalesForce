# Auto-Sync fuer D:\PROJEKTE\salesforce
# Holt alle Aenderungen von GitHub und pusht lokale Commits.
# Wird alle 5 Minuten von der Windows-Aufgabenplanung aufgerufen
# (Task "SalesforceAutoSync"). Jeder Push deployt automatisch auf spoti.ch.
$repo = "D:\PROJEKTE\salesforce"
git -C $repo pull --rebase --autostash --quiet
git -C $repo push --quiet
