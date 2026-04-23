export interface Address {
  id: number
  type: "HOME" | "OFFICE"
  addressLine: string
  city: string
  state: string
  pincode: string
  landmark?: string
  isDefault?: boolean
}

export interface User {
  id: string
  name: string
  email?: string | null
  phone: string
  addresses?: Address[]
  role: string
  image: string
}

export interface AuthState {
  user: User | null
  addresses: Address[]
  defaultAddress: Address | null
  loading: boolean
  error: string | null

  isVerified: boolean
  authChecked: boolean
}
