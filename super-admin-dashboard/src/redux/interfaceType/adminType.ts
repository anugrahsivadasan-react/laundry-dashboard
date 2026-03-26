export interface AdminUser {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: string
  branch?: {
    id: number
    name: string
  }
}

export interface BranchUserStats {
  totalUsers: number
  activeUsers: number
  activeBranchAdmins: number
}

export interface BranchUserResponse {
  stats: BranchUserStats
  data: AdminUser[]
}

export interface AdminState {
  profile: AdminUser | null
  admins: AdminUser[]
  branchUsers: AdminUser[]
  stats: BranchUserStats | null
  loading: boolean
  error: string | null
}
