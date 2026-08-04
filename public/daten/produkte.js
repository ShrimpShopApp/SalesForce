/* ============================================================
   ZENTRALE DATEN- UND PREISDATEI für spoti.ch

   Nur hier ändern – Website und One-Pager-PDF lesen beide aus
   dieser Datei. Nach jeder Änderung:
   commit + push  ->  geht automatisch live.
   Für das PDF zusätzlich:  python3 sales/onepager_erstellen.py

   Preise und Artikelstamm aus SORTIMENTSÜBERSICHT BLACK TIGER
   EXTENSIVE (Stand 2025), Preise CHF pro kg.

   Bewusst nicht aufgenommen:
   - SPT4121XFC (PD 8/12, 18.90) – enthält E451/E452 und ist
     Frozen Count. Die Seite wirbt mit "ohne Zusatzstoffe" und
     "True Count", der Artikel würde beidem widersprechen.
   - SPT1117FC (HOSO 16/20, 4.00) und SPT3127TC (PTO 16/20, 5.50)
     – MHD-kritische Posten, wechseln laufend. Stehen als
     Restposten-Hinweis auf der Seite.

   "preise_freigegeben": false blendet alle Preise aus und zeigt
   einen internen Hinweisbalken. Notbremse, falls etwas nicht
   stimmt.
   ============================================================ */

window.SPOTI_DATEN = {

  "preise_freigegeben": true,

  "aktion": {
    "titel": "Gastro-Aktion 2026",
    "gueltig_bis": "30.09.2026",
    "mindestmenge_kg": 20,
    "deal_text": "Ab 20 kg Jahresabnahme bauen wir Ihnen Ihre neue Website – kostenlos."
  },

  "konditionen": {
    "eigentum": "Domain und Website gehören Ihnen. Ausnahmslos.",
    "hosting": "Hosting im ersten Jahr inklusive. Danach CHF 29 im Monat – aber nur, wenn Sie bei uns hosten möchten.",
    "bestehend": "Die meisten Betriebe bleiben bei ihrem Anbieter. Dann übernehmen wir einfach die bestehende Domain und den Webspace.",
    "glasur": "Alle Artikel roh, einzeln gefrostet (IQF), mit 20 % Glasur."
  },

  "erklaerungen": [
    {
      "titel": "True Count",
      "text": "Die angegebene Stückzahl gilt auf das Nettogewicht, nicht auf das Eis. Sie zählen den Beutel nach und bekommen, was draufsteht. Bei Frozen Count zählt der Lieferant die Glasur mit – der Teller wird dann teurer, als die Offerte aussieht."
    },
    {
      "titel": "BIO-Label",
      "text": "Die mit BIO gekennzeichneten Artikel stammen aus zertifizierter Bio-Aufzucht und dürfen als Bio auf der Karte ausgelobt werden. Das Zertifikat legen wir jeder Erstlieferung bei."
    }
  ],

  "restposten": {
    "aktiv": true,
    "titel": "Posten mit kurzem MHD",
    "text": "Ware mit knapper Restlaufzeit geben wir deutlich günstiger ab – gleiche Qualität, nur das Mindesthaltbarkeitsdatum liegt näher. Was gerade da ist, wechselt laufend. Fragen Sie danach, es lohnt sich."
  },

  "produkte": [
    {
      "id": "bt-pd-21-25",
      "art_nr": "SPT4177TC",
      "gruppe": "Standard",
      "label": null,
      "count": "True Count",
      "mhd": "08/2026",
      "name": "Black Tiger PD 21/25",
      "untertitel": "Geschält, sofort einsatzbereit",
      "kaliber": "21/25 pro lb · ca. 46–55 Stk./kg",
      "aufmachung": "PD – ohne Kopf und Schale, entdarmt",
      "gebinde": "1 kg Gastro-Beutel",
      "gastro_preis": 13.90,
      "einheit": "kg",
      "highlight": true,
      "beschreibung": "Null Rüstzeit. Auftauen, abtropfen, anbraten. Der Artikel, der in den meisten Küchen läuft."
    },
    {
      "id": "bt-8-12",
      "art_nr": "SPT2131TC",
      "gruppe": "Standard",
      "label": null,
      "count": "True Count",
      "mhd": "07/2027",
      "name": "Black Tiger 8/12",
      "untertitel": "Der Allrounder",
      "kaliber": "8/12 pro lb · ca. 18–26 Stk./kg",
      "aufmachung": "HLSO Easy Peel – ohne Kopf, mit Schale",
      "gebinde": "1 kg Gastro-Beutel",
      "gastro_preis": 18.30,
      "einheit": "kg",
      "highlight": true,
      "beschreibung": "Grill, Pfanne, Plateau. Die Schale gibt Geschmack und macht auf dem Teller etwas her."
    },
    {
      "id": "bt-pd-21-25-box",
      "art_nr": "SPT4173TC",
      "gruppe": "Standard",
      "label": null,
      "count": "True Count",
      "mhd": "",
      "name": "Black Tiger PD 21/25 – 350-g-Box",
      "untertitel": "Kleines Gebinde",
      "kaliber": "21/25 pro lb · ca. 46–55 Stk./kg",
      "aufmachung": "PD – ohne Kopf und Schale, pin deveined",
      "gebinde": "350-g-Box",
      "gastro_preis": 4.50,
      "einheit": "Box",
      "highlight": false,
      "beschreibung": "Für Betriebe mit kleinem Tiefkühler oder wechselnder Karte."
    },
    {
      "id": "bt-bio-13-15",
      "art_nr": "SPT2167BIO",
      "gruppe": "BIO",
      "label": "BIO",
      "count": "True Count",
      "mhd": "07/2027",
      "name": "BIO Black Tiger 13/15",
      "untertitel": "Bio, mit Schale",
      "kaliber": "13/15 pro lb · ca. 29–33 Stk./kg",
      "aufmachung": "HLSO Easy Peel – ohne Kopf, mit Schale",
      "gebinde": "1 kg Gastro-Beutel",
      "gastro_preis": 21.90,
      "einheit": "kg",
      "highlight": true,
      "beschreibung": "Bio-zertifiziert und trotzdem kalkulierbar. Für Betriebe, die Bio auf der Karte ausloben wollen."
    },
    {
      "id": "bt-bio-4-6",
      "art_nr": "SPT2111BIO",
      "gruppe": "BIO",
      "label": "BIO",
      "count": "True Count",
      "mhd": "07/2027",
      "name": "BIO Black Tiger 4/6",
      "untertitel": "Unsere Grössten",
      "kaliber": "4/6 pro lb · ca. 9–13 Stk./kg",
      "aufmachung": "HLSO Easy Peel – ohne Kopf, mit Schale",
      "gebinde": "1 kg Gastro-Beutel",
      "gastro_preis": 34.90,
      "einheit": "kg",
      "highlight": false,
      "beschreibung": "Der Showteller. Zwei Stück füllen einen Vorspeisenteller."
    },
    {
      "id": "bt-bio-6-8",
      "art_nr": "SPT2121BIO",
      "gruppe": "BIO",
      "label": "BIO",
      "count": "True Count",
      "mhd": "07/2027",
      "name": "BIO Black Tiger 6/8",
      "untertitel": "Gross, mit Schale",
      "kaliber": "6/8 pro lb · ca. 13–18 Stk./kg",
      "aufmachung": "HLSO Easy Peel – ohne Kopf, mit Schale",
      "gebinde": "1 kg Gastro-Beutel",
      "gastro_preis": 32.90,
      "einheit": "kg",
      "highlight": false,
      "beschreibung": "Grillgrösse. Mit Schale auf den Rost, mit den Fingern essen."
    },
    {
      "id": "bt-bio-pd-6-8",
      "art_nr": "SPT4111BIO",
      "gruppe": "BIO",
      "label": "BIO",
      "count": "True Count",
      "mhd": "07/2027",
      "name": "BIO Black Tiger PD 6/8",
      "untertitel": "Bio, gross, geschält",
      "kaliber": "6/8 pro lb · ca. 13–18 Stk./kg",
      "aufmachung": "PD – ohne Kopf und Schale, entdarmt",
      "gebinde": "1 kg Gastro-Beutel",
      "gastro_preis": 36.90,
      "einheit": "kg",
      "highlight": false,
      "beschreibung": "Grosse Crevette ohne Rüstaufwand. Für Menüs, die schnell raus müssen."
    },
    {
      "id": "bt-bio-pd-8-12",
      "art_nr": "SPT2131BIO",
      "gruppe": "BIO",
      "label": "BIO",
      "count": "True Count",
      "mhd": "07/2027",
      "name": "BIO Black Tiger PD 8/12",
      "untertitel": "Bio, geschält",
      "kaliber": "8/12 pro lb · ca. 18–26 Stk./kg",
      "aufmachung": "PD – ohne Kopf und Schale, entdarmt",
      "gebinde": "1 kg Gastro-Beutel",
      "gastro_preis": 22.40,
      "einheit": "kg",
      "highlight": false,
      "beschreibung": "Mittlere Grösse, keine Rüstzeit, Bio-Auslobung möglich."
    },
    {
      "id": "bt-bio-pd-21-25",
      "art_nr": "SPT4177BIO",
      "gruppe": "BIO",
      "label": "BIO",
      "count": "True Count",
      "mhd": "07/2027",
      "name": "BIO Black Tiger PD 21/25",
      "untertitel": "Bio, geschält, klein",
      "kaliber": "21/25 pro lb · ca. 46–55 Stk./kg",
      "aufmachung": "PD – ohne Kopf und Schale, entdarmt",
      "gebinde": "1 kg Gastro-Beutel",
      "gastro_preis": 18.80,
      "einheit": "kg",
      "highlight": false,
      "beschreibung": "Für Risotto, Pasta und Salat. Bio, ohne Rüstzeit."
    }
  ],

  "eigenschaften": [
    "True Count",
    "100 % naturbelassen",
    "ohne Antibiotika",
    "ohne Zusatzstoffe",
    "ohne Zufütterung",
    "ohne Chemikalien",
    "ohne E-Stoffe",
    "ohne Eye-Cutting",
    "von Hand entdarmt",
    "roh schockgefrostet",
    "rückverfolgbar bis zum Muttertier"
  ],

  "kontakt": {
    "firma": "Swiss Prime Taste AG",
    "strasse": "Wittenwilerstrasse 25",
    "ort": "CH-8355 Aadorf",
    "telefon": "+41 52 368 00 58",
    "telefon_link": "+41523680058",
    "email": "info@swissprimetaste.ch",
    "bestellung": "order@swissprimetaste.ch",
    "web": "www.swissprimetaste.ch"
  }
};
