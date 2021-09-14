# MMM-NINA

[![version](https://img.shields.io/github/package-json/v/jalibu/MMM-NINA)](https://github.com/jalibu/MMM-NINA/releases) [![dependencies Status](https://status.david-dm.org/gh/jalibu/MMM-NINA.svg)](https://david-dm.org/jalibu/MMM-NINA) [![Known Vulnerabilities](https://snyk.io/test/github/jalibu/MMM-NINA/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jalibu/MMM-NINA?targetFile=package.json)

EIne simple Client Implementierung der NINA Warn App API für die [MagicMirror²](https://magicmirror.builders/) Plattform.  
Klicke hier für den [Forum Thread](https://forum.magicmirror.builders/topic/15429/mmm-nina)

Feedback und Mithilfe willkommen.

### Support

Wenn du meine Arbeit schätzt, dann freue ich mich über einen bescheidenen Beitrag zu meinem nächsten Feierabend-Bier.

<a href="https://www.buymeacoffee.com/jalibu" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Beer" style="height: 45px !important;width: 180px !important;" ></a>

## Features

- Das Modul ruft periodisch die NINA API auf und ermittelt Warnmeldungen für deinen Kreis.

![1630239555179-7ba390e3-ede1-4947-be9e-7129eb3bc876-image](https://user-images.githubusercontent.com/25933231/132957121-e0fccb58-2a28-4989-b325-968013018df7.png)

## Installation

1. Navigiere in das `MagicMirror/modules` Verzeichnis und führe folgendes Kommando aus, um das Projekt auf deine Festplatte zu klonen:

   ```bash
   git clone https://github.com/jalibu/MMM-NINA.git
   ```

2. Wechsle nun in das MMM-NINA Modul Verzeichnis und führe darin folgendes Kommando aus, um die Dependencies zu installieren:
   ```bash
   npm install --only=production
   ```
3. Binde das Modul abschließend in die Magic Mirror Konfiguration `MagicMirror/config/config.js` ein (Beispiel Konfiguration).
   ```javascript
    {
        module: "MMM-NINA",
        position: "top_right",
        config: {
            updateIntervalInSeconds: 120,
            maxAgeInHours: 6,
            showNoWarning: true,
            ags: "110000000000",
        }
    }
   ```

### Optionen

| Feld                    | Beschreibung                                                                                                                                                                                                                                                                                                                      | Default                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| updateIntervalInSeconds | (Integer) Abstand in Sekunden, in dem Warnmeldungen vom NINA Server abgerufen werden                                                                                                                                                                                                                                              | `120` (2 Minuten)         |
| maxAgeInHours           | (Integer) Maximales Alter der Warnmeldungen in Stunden, bevor sie ausgefiltert werden                                                                                                                                                                                                                                             | `6`                       |
| showNoWarning           | (Boolean) Lässt eine Meldung "Keine Warnungen" erscheinen, falls keine Ereignisse vorliegen.                                                                                                                                                                                                                                      | false                     |
| ags                     | (String) Amtlicher Gemeindeschlüssel (AGS) deines Ortes, welcher [hier](https://www.xrepository.de/api/xrepository/urn:de:bund:destatis:bevoelkerungsstatistik:schluessel:rs_2021-07-31/download/Regionalschl_ssel_2021-07-31.json) ermittelt werden kann.<br>**Wichtig**: Unbedingt als String und mit führenden Nullen angeben! | `"110000000000"` (Berlin) |

## Contribution and Development

This module is written in TypeScript and compiled with Rollup.  
The source files are located in the `/src` folder.
Compile target files with `npm run build`.

Contribution for this module is welcome!
