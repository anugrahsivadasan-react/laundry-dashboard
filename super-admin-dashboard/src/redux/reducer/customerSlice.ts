import { createSlice } from "@reduxjs/toolkit"
import type { CustomerState } from "../interfaceType/customerTypes"
import {
  fetchCustomerStats,
  fetchUserOrderSummary,
} from "../action/customerThunks"

const initialState: CustomerState = {
  stats: null,
  users: [],
  loading: false,
  error: null,
}

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ================= STATS ================= */
      .addCase(fetchCustomerStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCustomerStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
      })
      .addCase(fetchCustomerStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch stats"
      })

      /* ================= USER SUMMARY ================= */
      .addCase(fetchUserOrderSummary.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserOrderSummary.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUserOrderSummary.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch users"
      })
  },
})

export default customerSlice.reducer
