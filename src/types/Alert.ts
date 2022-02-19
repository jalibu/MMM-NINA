export type Alert = {
  id: string
  sent: string
  date: string
  cityName: string
  payload: {
    data: {
      severity: string
      provider: string
      msgType: string
      transKeys?: {
        event: string
      }
    }
  }
  i18nTitle: {
    de?: string
  }
}
