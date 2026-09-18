import type { Alert } from '../types/Alert'
import { toDashboardAgs } from './Ags'

/**
 * Fetches dashboard alerts while preserving independent request failures.
 * @param ags - Normalized 12-digit municipality keys.
 * @param fetcher - Fetch implementation used for the requests.
 * @returns Settled results for each municipality request.
 */
export async function fetchDashboardAlerts(ags: string[], fetcher: typeof fetch = fetch) {
  return Promise.allSettled(
    ags.map(async (agsCode) => {
      const response = await fetcher(`https://warnung.bund.de/api31/dashboard/${toDashboardAgs(agsCode)}.json`)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return (await response.json()) as Alert[]
    })
  )
}
