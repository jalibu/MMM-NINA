import NodeHelper from 'node_helper'
import * as Log from 'logger'
import { Config } from '../types/Config'
import { Alert } from '../types/Alert'
import { normalizeAgs, toDashboardAgs } from './Ags'
import { orderBySeverity, removeDuplicates, transformNinaAlerts } from './AlertProcessing'
import { daten } from './Regionalschluessel_2026-03-31.json'

declare const module: { exports: unknown }

// Einmaliger Aufbau der Lookup-Map statt linearer Suche bei jedem Aufruf.
const cityNamesByAgs = new Map(daten.map((row) => [row[0], row[1]]))

/**
 * Validiert AGS-Eingaben und liefert nur gueltige 12-stellige Werte.
 * @param rawAgs - Urspruengliche AGS-Eingaben aus der Konfiguration
 * @returns Liste aus Originalwert und validiertem 12-stelligen AGS
 */
function getValidAgsEntries(rawAgs: string[]): { raw: string; normalized: string }[] {
  const validAgs: { raw: string; normalized: string }[] = []

  for (const raw of rawAgs) {
    if (raw.trim().length === 8) {
      Log.warn(
        `AGS '${raw}' ist 8-stellig und wird nicht mehr unterstützt. ` +
          `Bitte den 12-stelligen Regionalschlüssel verwenden.`
      )
      continue
    }

    const normalized = normalizeAgs(raw)
    if (!normalized) {
      Log.warn(`Ungültiger AGS '${raw}'. Erlaubt sind nur 12-stellige numerische Werte als String.`)
      continue
    }

    validAgs.push({ raw, normalized })
  }

  return validAgs
}

module.exports = NodeHelper.create({
  start() {
    Log.log(`${this.name} helper method started...`)
  },

  async socketNotificationReceived(notification: string, payload: unknown) {
    if (notification === 'NINA_ALERTS_REQUEST') {
      const alerts: Alert[] = []
      const { config, identifier } = payload as { config: Config; identifier: string }

      const rawAgs = Array.isArray(config.ags) ? config.ags : [config.ags]
      const validAgs = getValidAgsEntries(rawAgs)

      const responses = await Promise.allSettled(
        validAgs.map(async ({ normalized }) => {
          const response = await fetch(`https://warnung.bund.de/api31/dashboard/${toDashboardAgs(normalized)}.json`)
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          return await response.json()
        })
      )

      for (const [i, result] of responses.entries()) {
        if (result.status === 'rejected') {
          Log.warn(`API request for ${validAgs[i].raw} failed:`, result.reason)
        } else {
          const cityName = cityNamesByAgs.get(validAgs[i].normalized) ?? null
          if (!cityName) {
            Log.warn(`AGS '${validAgs[i].normalized}' konnte keiner Gemeinde zugeordnet werden.`)
          }
          alerts.push(...transformNinaAlerts(result.value, config, cityName))
        }
      }

      this.sendSocketNotification('NINA_ALERTS_RESPONSE', {
        alerts: removeDuplicates(orderBySeverity(alerts, config), config),
        identifier
      })
    } else {
      Log.warn(`${notification} is invalid notification`)
    }
  }
})
