import * as Log from 'logger'
import { Config } from '../types/Config'
import { Alert } from '../types/Alert'

// Global or injected variable declarations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const moment: any

Module.register<Config>('MMM-NINA', {
  defaults: {
    ags: '110000000000',
    excludeProviders: [],
    mergeAlerts: true,    
    mergeAlertTitels: false,
    maxAgeInHours: 6,
    maxWidth: null,
    showIcon: true,
    showNoWarning: false,
    showCity: true,
    showDate: true,
    updateIntervalInSeconds: 120,
    theme: 'side',
    downgradeLhpSeverity: false,
    downgradeCancelSeverity: true,
    hideCancelledWarnings: false
  },

  getStyles() {
    return ['font-awesome.css', 'MMM-NINA.css']
  },

  getScripts: () => {
    return ['moment.js']
  },

  getTranslations() {
    return {
      en: 'translations/en.json',
      de: 'translations/de.json'
    }
  },

  getTemplate() {
    return 'templates/MMM-NINA.njk'
  },

  getTemplateData() {
    return {
      config: this.config,
      alerts: this.alerts
    }
  },

  start() {
    this.loadData()
    this.scheduleUpdate()
    this.updateDom()
  },

  scheduleUpdate() {
    setInterval(() => {
      this.loadData()
    }, this.config.updateIntervalInSeconds * 1000)
  },

  loadData() {
    this.sendSocketNotification('NINA_ALERTS_REQUEST', this.config)
  },

  socketNotificationReceived(notificationIdentifier: string, payload: unknown) {
    if (notificationIdentifier === 'NINA_ALERTS_RESPONSE') {
      const alerts = payload as Alert[]
      this.alerts = alerts.map((alert: Alert) => {
        // eslint-disable-next-line no-param-reassign
        alert.date = moment(new Date(alert.sent)).format('DD.MM.YYYY - HH:mm')

        return alert
      })
      this.updateDom()

      Log.log('Alerts', this.alerts)
    }
  }
})
