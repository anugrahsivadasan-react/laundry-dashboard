import { createSlice } from "@reduxjs/toolkit"
import {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
  getAllBranchesName,
  getAllBranchestatus,
} from "../action/branchThunks"
import type { BranchState } from "../interfaceType/branchType"

const initialState: BranchState = {
  branches: [],
  branch: null,
  stats: null,
  branchNames: [],
  loading: false,
  error: null,
}

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    clearBranch: (state) => {
      state.branch = null
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllBranches.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getAllBranches.fulfilled, (state, action) => {
      state.loading = false
      state.branches = action.payload.data
    })

    builder.addCase(getAllBranches.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Failed to fetch branches"
    })
    builder.addCase(getAllBranchestatus.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getAllBranchestatus.fulfilled, (state, action: any) => {
      state.loading = false
      state.stats = action.payload
    })

    builder.addCase(getAllBranchestatus.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Failed to fetch branches"
    })

    builder.addCase(getAllBranchesName.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getAllBranchesName.fulfilled, (state, action) => {
      state.loading = false
      state.branchNames = action.payload
    })

    builder.addCase(getAllBranchesName.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Failed to fetch branch names"
    })

    builder.addCase(createBranch.pending, (state) => {
      state.loading = true
    })

    builder.addCase(createBranch.fulfilled, (state) => {
      state.loading = false
      // state.branches.unshift(action.payload)
    })

    builder.addCase(createBranch.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Failed to fetch branches"
    })

    builder.addCase(getBranchById.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getBranchById.fulfilled, (state, action) => {
      state.loading = false
      state.branch = action.payload
    })

    builder.addCase(getBranchById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Failed to fetch branches"
    })

    builder.addCase(updateBranch.pending, (state) => {
      state.loading = true
    })

    builder.addCase(updateBranch.fulfilled, (state, action) => {
      state.loading = false
    })

    builder.addCase(updateBranch.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Failed to fetch branches"
    })

    builder.addCase(deleteBranch.pending, (state) => {
      state.loading = true
    })

    builder.addCase(deleteBranch.fulfilled, (state, action: any) => {
      state.branches = state.branches.filter((b) => b.id !== action.payload)
    })

    builder.addCase(deleteBranch.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Failed to fetch branches"
    })
  },
})

export const { clearBranch } = branchSlice.actions

export default branchSlice.reducer
