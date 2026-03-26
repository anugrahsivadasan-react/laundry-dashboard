import { createSlice } from "@reduxjs/toolkit"
import {
  superAdminLogin,
  getSuperAdminProfile,
  createAdmin,
  getAllAdmins,
  getBranchUsers,
  getAllAdminStats,
  getAdminById,
  updateAdmin,
} from "../action/adminThunks"
import type { AdminState } from "../interfaceType/adminType"

const initialState: AdminState = {
  profile: null,
  admin: null,
  branchUsers: [],
  stats: null,
  loading: false,
  error: null,
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdmin: (state) => {
      state.admin = null
    },
  },

  extraReducers: (builder) => {
    /* LOGIN */

    builder.addCase(superAdminLogin.pending, (state) => {
      state.loading = true
      state.error = null
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
    builder.addCase(createAdmin.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(createAdmin.fulfilled, (state) => {
      state.loading = false
    })

    builder
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "somthing went wrong"
      })

      /* update ADMINS */
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(updateAdmin.fulfilled, (state) => {
        state.loading = false
      })

      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Update failed"
      })

    /* GET ADMINS */

    builder.addCase(getAllAdmins.fulfilled, (state) => {
      // state.admin = action?.payload
      state.loading = false
    })

    /* BRANCH USERS */
    builder.addCase(getBranchUsers.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(getBranchUsers.fulfilled, (state, action) => {
      state.branchUsers = action.payload
      state.loading = false
      // state.stats = action.payload.stats
    })
    builder.addCase(getBranchUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "somthing went wrong"
    })

    //get admin by id
    builder.addCase(getAdminById.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(getAdminById.fulfilled, (state, action) => {
      state.admin = action.payload
      state.loading = false
      // state.stats = action.payload.stats
    })
    builder.addCase(getAdminById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "somthing went wrong"
    })
    /* admin all user stats */

    builder.addCase(getAllAdminStats.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(getAllAdminStats.fulfilled, (state, action) => {
      state.loading = false
      state.stats = action.payload
    })

    builder.addCase(getAllAdminStats.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "somthing went wrong"
    })
  },
})
export const { clearAdmin } = adminSlice.actions

export default adminSlice.reducer
