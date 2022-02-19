# MMM-NINA

[![version](https://img.shields.io/github/package-json/v/jalibu/MMM-NINA)](https://github.com/jalibu/MMM-NINA/releases) [![Known Vulnerabilities](https://snyk.io/test/github/jalibu/MMM-NINA/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jalibu/MMM-NINA?targetFile=package.json)

Eine simple Client Implementierung der [NINA Warn App API](https://nina.api.bund.dev/) für die [MagicMirror²](https://magicmirror.builders/) Plattform.
Klicke hier für den [Forum Thread](https://forum.magicmirror.builders/topic/15429/mmm-nina)

Feedback und Mithilfe willkommen.

### Support

Wenn du meine Arbeit schätzt, dann freue ich mich über einen bescheidenen Beitrag zu meinem nächsten Feierabend-Bier.

<a href="https://www.buymeacoffee.com/jalibu" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Beer" style="height: 45px !important;width: 180px !important;" ></a>

## Features

- Das Modul ruft periodisch die NINA API auf und ermittelt Warnmeldungen für deinen Kreis.
  <img width="540" alt="Screenshot2" src="https://user-images.githubusercontent.com/25933231/132957121-e0fccb58-2a28-4989-b325-968013018df7.png">
- Es können Alarme mehrerer Städte/Gemeinden gleichzeitig abgerufen werden. Identische Warnungen können dabei zusammengefasst werden.
  <img width="540" alt="Screenshot2" src="https://user-images.githubusercontent.com/25933231/137167087-6db8464b-1202-4f1e-a34b-9d448b64f109.png">
- 2 unterschiedliche Themes

## Installation

1. Navigiere in das `MagicMirror/modules` Verzeichnis und führe folgendes Kommando aus, um das Projekt auf deine Festplatte zu klonen:

   ```bash
   git clone https://github.com/jalibu/MMM-NINA.git
   ```

2. Wechsle nun in das MMM-NINA Modul Verzeichnis und führe darin folgendes Kommando aus, um die Dependencies zu installieren:
   ```bash
   npm install --only=production
   ```
3. Ermittle den amtlichen Gemeindeschlüssel deines Ortes aus [dieser Liste](https://www.xrepository.de/api/xrepository/urn:de:bund:destatis:bevoelkerungsstatistik:schluessel:rs_2021-07-31/download/Regionalschl_ssel_2021-07-31.json).

4. Binde das Modul abschließend in die Magic Mirror Konfiguration `MagicMirror/config/config.js` ein (Beispiel Konfiguration).

   ```javascript
    {
        module: "MMM-NINA",
        position: "top_right",
        config: {
            ags: ["110000000000"], // Liste der Gemeinden, die abgefragt werden sollen
            downgradeLhpSeverity: false,
            downgradeCancelSeverity: true,
            hideCancelledWarnings: false,
            excludeProviders: [], // Mögliche Werte ["MOWAS", "DWD", "BIWAPP", "LHP"]
            maxAgeInHours: 6,
            maxWidth: "200px",
            mergeAlertsById: true,
            mergeAlertsByTitle: true,
            showIcon: true,
            showDate: true,
            showCity: true,
            showNoWarning: true,
            theme: "top", // Erlaubte Werte: top, side
            updateIntervalInSeconds: 120,

        }
    }
   ```

### Optionen

| Feld                    | Beschreibung                                                                                                                            | Default                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| ags                     | (Liste von Strings) Amtliche(r) Gemeindeschlüssel (AGS)<br>**Wichtig**: Werte unbedingt als String mit führenden Nullen angeben!        | `["110000000000"]` (Berlin) |
| downgradeLhpSeverity    | (Boolean) Reduziert die Severity von Meldungen des `Länderübergreifenden Hochwasser Portals (LHP)` auf "Minor"                          | `false`                     |
| downgradeCancelSeverity | (Boolean) Aufgehobene Warnungen sollen grün dargestellt werden und nicht in ihrer ursprünglichen Severity.                              | `true`                      |
| excludeProviders        | (Liste von Strings) Liste von Providern, dessen Meldungen nicht angezeigt werden sollen. Provider sind: "MOWAS", "DWD", "BIWAPP", "LHP" | `[]` (kein Filter)          |
| hideCancelledWarnings   | (Boolean) Verstecke aufgehobene Warnungen                                                                                               | `false`                     |
| maxAgeInHours           | (Integer) Maximales Alter der Warnmeldungen in Stunden, bevor sie ausgefiltert werden                                                   | `6`                         |
| maxWidth                | (String) CSS Style für maximale Breite des Moduls, z.B. `220px`. Weg lassen, zum Deaktivieren.                                          | `undefined` (deaktiviert)   |
| mergeAlerts         |  *Veraltet*. Bitte  stattdessen **mergeAlertsById** verwenden.                  | `-`                      |
| mergeAlertsById         | (Boolean) Sofern Alerts für mehrere Gemeinden abgefragt werden, wird versucht gleiche Meldungen zusammenzufassen                        | `true`                      |
| mergeAlertsByTitle      | (Boolean) Sofern Alerts mit gleichem Titel vorliegen, wird versucht die Meldungen zusammenzufassen                                      | `true`                     |
| showCity                | (Boolean) Soll der Name der Gemeinde angezeigt werden?                                                                                  | `true`                      |
| showDate                | (Boolean) Soll das Datum der Meldung angezeigt werden?                                                                                  | `true`                      |
| showIcon                | (Boolean) Soll ein Warn-Symbol vor den Warnungen angezeigt werden?                                                                      | `true`                      |
| showNoWarning           | (Boolean) Lässt eine Meldung "Keine Warnungen" erscheinen, falls keine Ereignisse vorliegen.                                            | `false`                     |
| updateIntervalInSeconds | (Integer) Abstand in Sekunden, in dem Warnmeldungen vom NINA Server abgerufen werden                                                    | `120` (2 Minuten)           |
| theme                   | (String) Welches Theme soll angewendet werden?<br> Verfügbare Themes: `top` und `side`                                                  | `side`                      |

## Contribution and Development

This module is written in TypeScript and compiled with Rollup.
The source files are located in the `/src` folder.
Compile target files with `npm run build`.

Contribution for this module is welcome!
