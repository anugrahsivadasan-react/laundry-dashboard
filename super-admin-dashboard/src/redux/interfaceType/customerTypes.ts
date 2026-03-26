export interface CustomerStats {
  totalUsers: number
  activeUsers: number
  blockedUsers: number
}

export interface UserOrderSummary {
  id: number
  name: string
  email: string
  phone: string
  initials: string
  joined: string
  complaints: number
  status: "ACTIVE" | "BLOCKED" | "VIP"
  totalOrders: number
  totalAmount: number
}

export interface CustomerState {
  stats: CustomerStats | null
  users: UserOrderSummary[]
  loading: boolean
  error: string | null
}
