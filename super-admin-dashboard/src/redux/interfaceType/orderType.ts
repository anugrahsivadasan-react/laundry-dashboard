export interface OrderStats {
  total: number
  pending: number
  completed: number
  inTransition: number
  cancelled: number
}

export interface OrderItem {
  id: number
  orderID: string
  customer: string
  branchName: string
  branchAdmin: string
  itemsCount: number
  amount: number
  paidAmount: string
  payableAmount: string
  status: string
  orderPlacedDate: string
}

export interface OrderState {
  stats: OrderStats | null
  orders: OrderItem[]
  loading: boolean
  error: string | null
}
