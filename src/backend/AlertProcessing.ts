import type { Alert } from '../types/Alert'
import type { Config } from '../types/Config'

/**
 * Transformiert NINA API Alerts und wendet Config-Filter an.
 * @param alerts - Rohes Alert-Array von der NINA API
 * @param config - Module-Konfiguration mit Filtern und Einstellungen
 * @param cityName - Gemeindename fuer den AGS-Code (oder null)
 * @returns Gefilterte und angereicherte Alerts mit Stadt-Namen
 */
export function transformNinaAlerts(alerts: Alert[], config: Config, cityName: string | null): Alert[] {
  const now = new Date(Date.now()).getTime()

  const filtered = alerts.filter((alert) => {
    if (config.hideCancelledWarnings && alert.payload.data.msgType === 'Cancel') {
      return false
    }

    return (
      (now - Date.parse(alert.sent)) / (1000 * 60 * 60) <= config.maxAgeInHours &&
      !config.excludeProviders.includes(alert?.payload?.data?.provider)
    )
  })

  return filtered.map((alert) => {
    if (alert?.payload?.data?.provider?.toLocaleLowerCase() === 'lhp' && config.downgradeLhpSeverity) {
      alert.payload.data.severity = 'Moderate'
    }

    if (alert.payload.data.msgType === 'Cancel' && config.downgradeCancelSeverity) {
      alert.payload.data.severity = 'Cancel'
    }

    alert.cityNames = cityName ? [cityName] : []

    return alert
  })
}

/**
 * Sortiert Alerts nach Schweregrad (falls konfiguriert).
 * @param alerts - Alert-Array
 * @param config - Konfiguration mit orderBySeverity-Flag
 * @returns Sortierte Alerts (Severe > Moderate > Minor > Cancel) oder unveränderte Liste
 */
export function orderBySeverity(alerts: Alert[], config: Config): Alert[] {
  if (config.orderBySeverity) {
    const severityOrder = ['Severe', 'Moderate', 'Minor', 'Cancel']

    return alerts.sort(
      (a, b) => severityOrder.indexOf(a.payload.data.severity) - severityOrder.indexOf(b.payload.data.severity)
    )
  }

  return alerts
}

/**
 * Prüft, ob zwei Alerts als Duplikat gelten (gleiche ID oder gleicher Titel).
 * @param alert - Das zu prüfende Alert
 * @param existing - Das bereits in der result-Liste vorhandene Alert
 * @param config - Konfiguration mit mergeAlertsById/Title-Flags
 * @returns true wenn die Alerts als Duplikat gelten, sonst false
 */
function isDuplicate(alert: Alert, existing: Alert, config: Config): boolean {
  const isSameId = config.mergeAlertsById && alert.id === existing.id
  const isSameTitle =
    config.mergeAlertsByTitle && !!(alert.i18nTitle.de && alert.i18nTitle.de === existing.i18nTitle.de)
  return !!(isSameId || isSameTitle)
}

/**
 * Dedupliziert Alerts basierend auf ID und/oder Titel.
 * @param alerts - Alert-Array
 * @param config - Konfiguration mit mergeAlertsById/Title-Flags
 * @returns Gefilterte Alerts mit zusammengefassten Stadt-Namen
 */
export function removeDuplicates(alerts: Alert[], config: Config): Alert[] {
  const result: Alert[] = []

  for (const alert of alerts) {
    const existing = result.find((a) => isDuplicate(alert, a, config))

    if (existing) {
      existing.cityNames = [...new Set([...existing.cityNames, ...alert.cityNames])]
    } else {
      result.push(alert)
    }
  }

  return result
}
