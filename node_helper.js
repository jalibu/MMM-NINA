/*! *****************************************************************************
  mmm-nina
  Version 1.0.0

  Simple Client Implementierung für die NINA Warn App für die MagicMirror² Plattform.
  Please submit bugs at https://github.com/jalibu/MMM-NINA/issues

  (c) Jan.Litzenburger@gmail.com
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */

"use strict";var e=require("node_helper"),t=require("node-fetch");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function r(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}var o=r(e),i=n(t);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function a(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))}module.exports=o.create({start(){console.log(`${this.name} helper method started...`)},transformNinaAlerts(e,t){const n=(new Date).getTime();return e.filter((e=>(n-Date.parse(e.sent))/36e5<=t.maxAgeInHours))},harmonizeAgs:e=>e.substring(0,e.length-7)+"0000000",socketNotificationReceived(e,t){return a(this,void 0,void 0,(function*(){if("GET_NINA_ALERTS"===e){const e=yield i.default(`https://warnung.bund.de/api31/dashboard/${this.harmonizeAgs(t.ags)}.json`);if(e.ok)try{const n=yield e.json();this.sendSocketNotification("NINA_ALERTS_RESPONSE",this.transformNinaAlerts(n,t))}catch(e){console.warn("There was a problem requesting the NINA API",e)}else console.warn(`There was a problem ${e.status} requesting the NINA API:`,e.statusText)}else console.warn(`${e} is invalid notification`)}))}});
