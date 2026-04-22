import { createSlice } from "@reduxjs/toolkit"
import type { AuthState } from "../interfaceType/authTypes"

import { getProfile, loginUser, logoutUser } from "../action/authThunks"

const initialState: AuthState = {
  user: null,
  addresses: [],
  defaultAddress: null,
  loading: false,
  error: null,

  isVerified: false,
  authChecked: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAddresses: (state) => {
      state.addresses = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        localStorage.removeItem("loggedOut")
      })

      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.msg || "Login failed"
      })

      .addCase(getProfile.pending, (state) => {
        state.loading = true
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isVerified = true
        state.authChecked = true
      })

      .addCase(getProfile.rejected, (state) => {
        state.loading = false
        state.user = null
        state.authChecked = true
        state.isVerified = false
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isVerified = false
        state.authChecked = true
      })

      .addCase(logoutUser.rejected, (state) => {
        state.user = null
        state.isVerified = false
      })
  },
})

export const {} = authSlice.actions
export default authSlice.reducer
