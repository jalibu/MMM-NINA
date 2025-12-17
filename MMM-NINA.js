/*! *****************************************************************************
  mmm-nina
  Version 1.8.2

  Simple Client Implementierung für die NINA Warn App für die MagicMirror² Plattform.
  Please submit bugs at https://github.com/jalibu/MMM-NINA/issues

  (c) Jan.Litzenburger@gmail.com
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */
!function(e){"use strict";function t(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(i){if("default"!==i){var s=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:function(){return e[i]}})}})),t.default=e,Object.freeze(t)}var i=t(e);Module.register("MMM-NINA",{defaults:{ags:"110000000000",downgradeCancelSeverity:!0,downgradeLhpSeverity:!1,excludeProviders:[],hideCancelledWarnings:!1,maxAgeInHours:6,maxWidth:void 0,mergeAlertsById:!0,mergeAlertsByTitle:!0,orderBySeverity:!0,showCity:!0,showDate:!0,showNoWarning:!1,showIcon:!0,theme:"side",updateIntervalInSeconds:120},getStyles:()=>["font-awesome.css","MMM-NINA.css"],getScripts:()=>["moment.js"],getTranslations:()=>({en:"translations/en.json",de:"translations/de.json"}),getTemplate:()=>"templates/MMM-NINA.njk",getTemplateData(){return{config:this.config,alerts:this.alerts}},start(){this.alerts=[],"mergeAlerts"in this.config&&(i.warn('Die MMM-NINA Konfigurations-Einstellung "mergeAlerts" ist veraltet. Bitte durch "mergeAlertsById" ersetzen.'),this.config.mergeAlertsById=!!this.config.mergeAlerts),this.loadData(),this.scheduleUpdate(),this.updateDom()},scheduleUpdate(){setInterval((()=>{this.loadData()}),1e3*this.config.updateIntervalInSeconds)},loadData(){this.sendSocketNotification("NINA_ALERTS_REQUEST",{config:this.config,identifier:this.identifier})},socketNotificationReceived(e,t){if("NINA_ALERTS_RESPONSE"===e){const{alerts:e,identifier:s}=t;if(s!==this.identifier)return;this.alerts=e.map((e=>(e.date=moment(new Date(e.sent)).format("DD.MM.YYYY - HH:mm"),e))),this.updateDom(),i.log("Alerts",this.alerts)}}})}(Log);
