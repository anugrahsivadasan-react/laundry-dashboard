export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  orderGrowth: string
  revenueGrowth: string
  totalBranches: number
  totalActiveAdmins: number
  todayBranches: number
  todayAdmins: number
  pendingAmount: number
  pendingOrders: number
}

export interface WeeklyRevenue {
  day: string
  revenue: number
}
export interface BranchReport {
  branchId: number
  branchName: string
  totalOrders: number
  totalRevenue: number
}

export interface MonthRange {
  from: string
  to: string
}

export interface DashboardState {
  stats: DashboardStats | null
  weeklyRevenue: WeeklyRevenue[] | null
  reports: BranchReport[]
  monthRange: MonthRange | null
  loading: boolean
  error: string | null
}
