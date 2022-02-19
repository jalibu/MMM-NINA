export type Alert = {
  id: string
  sent: string
  date: string
  cityNames: string[]
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
  details?: AlertDetails
  i18nTitle: {
    de?: string
  }
}

export type AlertDetails = {
  info: { category: string; event: string; senderName: string; description: string }[]
}
