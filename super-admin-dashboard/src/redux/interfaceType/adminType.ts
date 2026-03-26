export interface AdminUser {
  id: string
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
export interface BranchUser {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  branch: string
  role: string
  status: string
  lastLogin: string
  isOnline?: boolean
}

export interface AdminStats {
  totalAdmins: number
  activeAdmins: number
  newAdminsThisMonth: number
  branchUsers: number
}

export interface AdminState {
  profile: AdminUser | null
  admin: AdminUser | null
  branchUsers: BranchUser[]
  stats: AdminStats | null
  loading: boolean
  error: string | null
}
