export interface BranchAdmin {
  name: string
  email: string
}

export interface Branch {
  id?: string
  name: string
  code: string
  address: string
  state: string
  zipCode: string
  phone: string
  email: string
  status?: string
  Users?: BranchAdmin[]
  city: string
  pickup: boolean
  delivery: boolean
  express: boolean
  latitude?: number | undefined
  longitude?: number | undefined
}

export interface BranchTable {
  id: string
  name: string
  location: string
  status: string
  admins: number
  orders: number
  revenue: number
}
export interface BranchStats {
  totalBranches: number
  activeBranches: number
  inactiveBranches: number
  totalAdmins: number
}
export interface BranchName {
  id: string
  name: string
}

export interface BranchState {
  branches: BranchTable[]
  branch: Branch | null
  stats: BranchStats | null
  branchNames: BranchName[]
  loading: boolean
  error: string | null
}
