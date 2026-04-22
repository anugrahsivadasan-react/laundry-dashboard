// export interface UserNotification {
//   id: string
//   title: string
//   message: string
//   createdAt: string
//   isRead?: boolean
//   isDelivered?: boolean
// }

export interface AdminNotification {
  id: string
  title: string
  message: string
  campaign: string
  priority: string
  target: string
  recipients: number
  readCount: number
  readPercentage: number
  date: string
  time: string
  scheduledAt: string
  status: "Sent" | "Scheduled"
  action: string
  dueDate: string
  type: "system" | "admin" | "promo"
}

export interface NotificationStats {
  totalSentNotifications: number
  thisMonthSentNotifications: number
  totalRecipients: number
  systemAlertCount: number
}

export interface NotificationState {
  notifications: AdminNotification[]
  stats: NotificationStats | null
  unreadCount: number
  loading: boolean
  error: string | null
}
