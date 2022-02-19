export type Config = {
  ags: string | string[]
  downgradeLhpSeverity: boolean
  downgradeCancelSeverity: boolean
  excludeProviders: string[]
  hideCancelledWarnings: boolean
  mergeAlertTitels: boolean
  maxAgeInHours: number
  maxWidth?: string
  mergeAlerts: boolean
  showCity: boolean
  showDate: boolean
  showIcon: boolean
  showNoWarning: boolean
  theme: string
  updateIntervalInSeconds: number
}
