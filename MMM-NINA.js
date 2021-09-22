/*! *****************************************************************************
  mmm-nina
  Version 1.1.1

  Simple Client Implementierung für die NINA Warn App für die MagicMirror² Plattform.
  Please submit bugs at https://github.com/jalibu/MMM-NINA/issues

  (c) Jan.Litzenburger@gmail.com
  Licence: MIT

  This file is auto-generated. Do not edit.
***************************************************************************** */

!function(){"use strict";Module.register("MMM-NINA",{defaults:{ags:"110000000000",maxAgeInHours:6,maxWidth:null,showIcon:!0,showNoWarning:!1,updateIntervalInSeconds:120},getStyles:()=>["font-awesome.css","MMM-NINA.css"],getScripts:()=>["moment.js"],getTranslations:()=>({en:"translations/en.json",de:"translations/de.json"}),getTemplate:()=>"templates/MMM-NINA.njk",getTemplateData(){return{config:this.config,alerts:this.alerts}},start(){this.loadData(),this.scheduleUpdate(),this.updateDom()},scheduleUpdate(){setInterval((()=>{this.loadData()}),1e3*this.config.updateIntervalInSeconds)},loadData(){this.sendSocketNotification("GET_NINA_ALERTS",this.config)},socketNotificationReceived(t,e){"NINA_ALERTS_RESPONSE"===t&&(this.alerts=e.map((t=>(t.date=moment(new Date(t.sent)).format("DD.MM.YYYY - HH:mm"),t))),this.updateDom(),console.debug("Alerts",this.alerts))}})}();
