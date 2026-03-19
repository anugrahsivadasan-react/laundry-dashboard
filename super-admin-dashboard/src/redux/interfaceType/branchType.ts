export interface BranchAdmin {
  name: string
  email: string
}

export interface Branch {
  id: number
  name: string
  code: string
  address: string
  state: string
  zipCode: string
  phone: string
  email: string
  status: string
  Users?: BranchAdmin[]
}

export interface BranchStats {
  totalBranches: number
  activeBranches: number
  inactiveBranches: number
  totalAdmins: number
}

export interface BranchState {
  branches: Branch[]
  branch: Branch | null
  stats: BranchStats | null
  loading: boolean
  error: string | null
}
