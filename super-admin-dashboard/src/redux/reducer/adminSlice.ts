import { createSlice } from "@reduxjs/toolkit"
import {
  superAdminLogin,
  getSuperAdminProfile,
  createAdmin,
  getAllAdmins,
  getBranchUsers,
} from "../action/adminThunks"
import type { AdminState } from "../interfaceType/adminType"

const initialState: AdminState = {
  profile: null,
  admins: [],
  branchUsers: [],
  stats: null,
  loading: false,
  error: null,
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    /* LOGIN */

    builder.addCase(superAdminLogin.pending, (state) => {
      state.loading = true
    })

    builder.addCase(superAdminLogin.fulfilled, (state) => {
      state.loading = false
    })

    builder.addCase(superAdminLogin.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Login failed"
    })

    /* PROFILE */

    builder.addCase(getSuperAdminProfile.fulfilled, (state, action) => {
      state.profile = action.payload
    })

    /* CREATE ADMIN */

    builder.addCase(createAdmin.fulfilled, (state, action) => {
      state.admins.unshift(action.payload)
    })

    /* GET ADMINS */

    builder.addCase(getAllAdmins.fulfilled, (state, action) => {
      state.admins = action.payload
    })

    /* BRANCH USERS */

    builder.addCase(getBranchUsers.fulfilled, (state, action) => {
      state.branchUsers = action.payload.data
      state.stats = action.payload.stats
    })
  },
})

export default adminSlice.reducer
