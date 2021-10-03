/*! *****************************************************************************
  mmm-nina
  Version 1.2.0

  Simple Client Implementierung für die NINA Warn App für die MagicMirror² Plattform.
  Please submit bugs at https://github.com/jalibu/MMM-NINA/issues

  (c) Jan.Litzenburger@gmail.com
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */

!function(t){"use strict";function e(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(s){if("default"!==s){var a=Object.getOwnPropertyDescriptor(t,s);Object.defineProperty(e,s,a.get?a:{enumerable:!0,get:function(){return t[s]}})}})),e.default=t,Object.freeze(e)}var s=e(t);Module.register("MMM-NINA",{defaults:{ags:"110000000000",maxAgeInHours:6,maxWidth:null,showIcon:!0,showNoWarning:!1,updateIntervalInSeconds:120},getStyles:()=>["font-awesome.css","MMM-NINA.css"],getScripts:()=>["moment.js"],getTranslations:()=>({en:"translations/en.json",de:"translations/de.json"}),getTemplate:()=>"templates/MMM-NINA.njk",getTemplateData(){return{config:this.config,alerts:this.alerts}},start(){this.loadData(),this.scheduleUpdate(),this.updateDom()},scheduleUpdate(){setInterval((()=>{this.loadData()}),1e3*this.config.updateIntervalInSeconds)},loadData(){this.sendSocketNotification("NINA_ALERTS_REQUEST",this.config)},socketNotificationReceived(t,e){if("NINA_ALERTS_RESPONSE"===t){const t=e;this.alerts=t.map((t=>(t.date=moment(new Date(t.sent)).format("DD.MM.YYYY - HH:mm"),t))),this.updateDom(),s.log("Alerts",this.alerts)}}})}(Log);
