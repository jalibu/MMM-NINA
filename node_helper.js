/*! *****************************************************************************
  mmm-nina
  Version 1.2.0

  Simple Client Implementierung für die NINA Warn App für die MagicMirror² Plattform.
  Please submit bugs at https://github.com/jalibu/MMM-NINA/issues

  (c) Jan.Litzenburger@gmail.com
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */

"use strict";var e=require("node_helper"),t=require("logger"),n=require("node-fetch");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function i(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}var a=i(e),o=i(t),s=r(n);
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
function c(e,t,n,r){return new(n||(n=Promise))((function(i,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,s)}c((r=r.apply(e,t||[])).next())}))}class u{static transformNinaAlerts(e,t){const n=(new Date).getTime();return e.filter((e=>(n-Date.parse(e.sent))/36e5<=t.maxAgeInHours))}static harmonizeAgs(e){return`${e.substring(0,e.length-7)}0000000`}}module.exports=a.create({start(){o.log(`${this.name} helper method started...`)},bla:()=>5,socketNotificationReceived(e,t){return c(this,void 0,void 0,(function*(){if("NINA_ALERTS_REQUEST"===e){const e=t,n=yield s.default(`https://warnung.bund.de/api31/dashboard/${u.harmonizeAgs(e.ags)}.json`);if(n.ok)try{const t=yield n.json();this.sendSocketNotification("NINA_ALERTS_RESPONSE",u.transformNinaAlerts(t,e))}catch(e){o.warn("There was a problem requesting the NINA API",e)}else o.warn(`Error ${n.status} requesting the NINA API:`,n.statusText)}else o.warn(`${e} is invalid notification`)}))}});
