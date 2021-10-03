import { Alert } from '../types/Alert'
import { Config } from '../types/Config'

export default class Utils {
  static transformNinaAlerts(alerts: Alert[], config: Config): Alert[] {
    const now = new Date().getTime()

    const filtered = alerts.filter((alert) => (now - Date.parse(alert.sent)) / (1000 * 60 * 60) <= config.maxAgeInHours)

    return filtered
  }

  static harmonizeAgs(ags: string): string {
    return `${ags.substring(0, ags.length - 7)}0000000`
  }
}
