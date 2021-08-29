# MMM-NINA - Ein NINA Warn-App Client für den Magic Mirror
Dies ist eine simple Client Implementierung der NINA Warn-App für den [Magic Mirror](https://magicmirror.builders/).   
Feedback willkommen.

### Support
Wenn du meine Arbeit schätzt, dann freue ich mich über einen bescheidenen Beitrag zu meinem nächsten Feierabend-Bier.

<a href="https://www.buymeacoffee.com/jalibu" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Beer" style="height: 45px !important;width: 180px !important;" ></a>

## Features
* Das Modul ruft periodisch die NINA API auf und ermittelt Warnmeldungen für deinen Kreis.


## Installation
1. Navigiere in das `MagicMirror/modules` Verzeichnis und führe folgendes Kommando aus, um das Projekt auf deine Festplatte zu klonen:
    ```bash
    git clone https://github.com/jalibu/MMM-NINA.git
    ```

2. Wechsle nun in das MMM-NINA Modul Verzeichnis und führe darin folgendes Kommando aus, um die Dependencies zu installieren:
    ```bash
    npm install
    ```
3. Binde das Modul abschließend in die Magic Mirror Konfiguration `MagicMirror/config/config.js` ein.
    ### Beispiel
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
| Feld    						| Beschreibung 																		    |  Default 		    |
| -------- 						| -------- 																			    | -------- 		    |
| updateIntervalInSeconds 	  	| (Integer) Abstand in Sekunden, in dem Warnmeldungen vom NINA Server abgerufen werden  | `120` (2 Minuten)   |
| maxAgeInHours          	  	| (Integer) Maximales Alter der Warnmeldungen in Stunden, bevor sie ausgefiltert werden | `6`   	        	|
| showNoWarning          	  	| (Boolean) Lässt eine Meldung "Keine Warnungen" erscheinen, falls keine Ereignisse vorliegen. | false   	        	|
| ags                     	  	| (String) Amtlicher Gemeindeschlüssel (AGS) deines Ortes, welcher [hier](https://www.xrepository.de/api/xrepository/urn:de:bund:destatis:bevoelkerungsstatistik:schluessel:rs_2021-07-31/download/Regionalschl_ssel_2021-07-31.json) ermittelt werden kann.<br>**Wichtig**: Unbedingt als String und mit führenden Nullen angeben! | `"110000000000"` (Berlin)   	        	|
