import * as NodeHelper from 'node_helper'
import * as Log from 'logger'
import fetch from 'node-fetch'
import { Config } from '../types/Config'
import { Alert } from '../types/Alert'
import Utils from './Utils'

module.exports = NodeHelper.create({
  start() {
    Log.log(`${this.name} helper method started...`)
  },

  bla() {
    return 5
  },

  async socketNotificationReceived(notification: string, payload: unknown) {
    if (notification === 'NINA_ALERTS_REQUEST') {
      const config = payload as Config
      const response = await fetch(`https://warnung.bund.de/api31/dashboard/${Utils.harmonizeAgs(config.ags)}.json`)
      if (response.ok) {
        try {
          const alerts: Alert[] = await response.json()
          this.sendSocketNotification('NINA_ALERTS_RESPONSE', Utils.transformNinaAlerts(alerts, config))
        } catch (err) {
          Log.warn(`There was a problem requesting the NINA API`, err)
        }
      } else {
        Log.warn(`Error ${response.status} requesting the NINA API:`, response.statusText)
      }
    } else {
      Log.warn(`${notification} is invalid notification`)
    }
  }
})
