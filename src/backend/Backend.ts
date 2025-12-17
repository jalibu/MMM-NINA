import * as NodeHelper from 'node_helper'
import * as Log from 'logger'
import { Config } from '../types/Config'
import { Alert } from '../types/Alert'
import { harmonizeAgs, transformNinaAlerts, orderBySeverity, removeDuplicates } from './Utils'

module.exports = NodeHelper.create({
  start() {
    Log.log(`${this.name} helper method started...`)
  },

  async socketNotificationReceived(notification: string, payload: unknown) {
    if (notification === 'NINA_ALERTS_REQUEST') {
      const alerts: Alert[] = []
      const config = payload as Config

      // Force ags to be an array
      const ags = Array.isArray(config.ags) ? config.ags : [config.ags]
      const promises = ags.map((url) =>
        fetch(`https://warnung.bund.de/api31/dashboard/${harmonizeAgs(url)}.json`).then((y) => y.json())
      )

      const apiResponses = await Promise.all(promises.map((p) => p.catch((e) => e)))
      for (const [index, response] of apiResponses.entries()) {
        if (response instanceof Error) {
          Log.warn(`API request for ${ags[index]} failed:`, response.message)
        } else {
          const cityAlerts = transformNinaAlerts(response, config, ags[index])
          alerts.push(...cityAlerts)
        }
      }

      this.sendSocketNotification('NINA_ALERTS_RESPONSE', removeDuplicates(orderBySeverity(alerts, config), config))
    } else {
      Log.warn(`${notification} is invalid notification`)
    }
  }
})
