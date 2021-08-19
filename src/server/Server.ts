import * as NodeHelper from 'node_helper'
import fetch from 'node-fetch'

module.exports = NodeHelper.create({
  start() {
    console.log(`${this.name} helper method started...`)
  },

  transformNinaAlerts(alerts: any[], config) {
    const now = new Date().getTime()

    const filtered = alerts.filter((alert) => (now - Date.parse(alert.sent)) / (1000 * 60 * 60) <= config.maxAgeInHours)
    return filtered
  },

  harmonizeAgs(ags: string): string {
    return ags.substring(0, ags.length - 7) + '0000000'
  },

  async socketNotificationReceived(notification, config) {
    if (notification === 'GET_NINA_ALERTS') {
      const response = await fetch(`https://warnung.bund.de/api31/dashboard/${this.harmonizeAgs(config.ags)}.json`)
      if (response.ok) {
        try {
          const alerts = await response.json()
          this.sendSocketNotification('NINA_ALERTS_RESPONSE', this.transformNinaAlerts(alerts, config))
        } catch (err) {
          console.warn(`There was a problem requesting the NINA API`, err)
        }
      } else {
        console.warn(`There was a problem ${response.status} requesting the NINA API:`, response.statusText)
      }
    } else {
      console.warn(`${notification} is invalid notification`)
    }
  }
})
