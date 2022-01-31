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
  details?: AlertDetails
}

export type AlertDetails = {
  info: { category: string; event: string; senderName: string; description: string }[]
}
