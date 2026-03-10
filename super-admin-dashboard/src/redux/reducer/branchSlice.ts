import { createSlice } from "@reduxjs/toolkit"
import {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "../action/branchThunks"
import type { BranchState } from "../interfaceType/branchType"

const initialState: BranchState = {
  branches: [],
  branch: null,
  stats: null,
  loading: false,
  error: null,
}

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllBranches.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getAllBranches.fulfilled, (state, action) => {
      state.loading = false
      state.branches = action.payload.data
      state.stats = action.payload.stats
    })

    builder.addCase(getAllBranches.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Failed to fetch branches"
    })

    builder.addCase(createBranch.fulfilled, (state, action) => {
      state.branches.unshift(action.payload)
    })

    builder.addCase(getBranchById.fulfilled, (state, action) => {
      state.branch = action.payload
    })

    builder.addCase(updateBranch.fulfilled, (state, action) => {
      const index = state.branches.findIndex((b) => b.id === action.payload.id)
      if (index !== -1) {
        state.branches[index] = action.payload
      }
    })

    builder.addCase(deleteBranch.fulfilled, (state, action) => {
      state.branches = state.branches.filter((b) => b.id !== action.payload)
    })
  },
})

export default branchSlice.reducer
