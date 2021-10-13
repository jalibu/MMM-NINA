export type Config = {
  ags: string | string[]
  mergeAlerts: boolean
  maxAgeInHours: number
  maxWidth?: string
  showNoWarning: boolean
  showIcon: boolean
  showDate: boolean
  showCity: boolean
  theme: string
  updateIntervalInSeconds: number
}
