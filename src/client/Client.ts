Module.register('MMM-NINA', {
  defaults: {
    updateIntervalInSeconds: 120,
    maxAgeInHours: 6,
    ags: '110000000000',
    showNoWarning: false
  },

  getStyles() {
    return ['font-awesome.css', 'MMM-NINA.css']
  },

  getScripts: function () {
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
    const self = this
    setInterval(() => {
      self.loadData()
    }, this.config.updateIntervalInSeconds * 1000)
  },

  loadData() {
    this.sendSocketNotification('GET_NINA_ALERTS', this.config)
  },

  socketNotificationReceived(notificationIdentifier: string, payload: any) {
    if (notificationIdentifier === 'NINA_ALERTS_RESPONSE') {
      this.alerts = payload.map((alert) => {
        alert.date = moment(new Date(alert.sent)).format("DD.MM.YYYY - HH:mm")
        return alert
      })
      this.updateDom()
      console.debug('Alerts', this.alerts)
    }
  }
})
