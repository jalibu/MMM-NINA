/*! *****************************************************************************
  mmm-nina
  Version 1.7.0

  Simple Client Implementierung für die NINA Warn App für die MagicMirror² Plattform.
  Please submit bugs at https://github.com/jalibu/MMM-NINA/issues

  (c) Jan.Litzenburger@gmail.com
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */

!function(e){"use strict";function t(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(s){if("default"!==s){var a=Object.getOwnPropertyDescriptor(e,s);Object.defineProperty(t,s,a.get?a:{enumerable:!0,get:function(){return e[s]}})}})),t.default=e,Object.freeze(t)}var s=t(e);Module.register("MMM-NINA",{defaults:{ags:"110000000000",excludeProviders:[],mergeAlerts:!0,mergeAlertTitels:!1,maxAgeInHours:6,maxWidth:null,showIcon:!0,showNoWarning:!1,showCity:!0,showDate:!0,updateIntervalInSeconds:120,theme:"side",downgradeLhpSeverity:!1,downgradeCancelSeverity:!0,hideCancelledWarnings:!1},getStyles:()=>["font-awesome.css","MMM-NINA.css"],getScripts:()=>["moment.js"],getTranslations:()=>({en:"translations/en.json",de:"translations/de.json"}),getTemplate:()=>"templates/MMM-NINA.njk",getTemplateData(){return{config:this.config,alerts:this.alerts}},start(){this.loadData(),this.scheduleUpdate(),this.updateDom()},scheduleUpdate(){setInterval((()=>{this.loadData()}),1e3*this.config.updateIntervalInSeconds)},loadData(){this.sendSocketNotification("NINA_ALERTS_REQUEST",this.config)},socketNotificationReceived(e,t){if("NINA_ALERTS_RESPONSE"===e){const e=t;this.alerts=e.map((e=>(e.date=moment(new Date(e.sent)).format("DD.MM.YYYY - HH:mm"),e))),this.updateDom(),s.log("Alerts",this.alerts)}}})}(Log);
