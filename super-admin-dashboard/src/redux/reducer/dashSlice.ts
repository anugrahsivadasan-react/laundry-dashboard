import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { DashboardState } from "../interfaceType/dashType"
import {
  getDashboardStats,
  getMonthlyBranchReport,
  getWeeklyRevenue,
} from "../action/dashThunks"

const initialState: DashboardState = {
  stats: null,
  weeklyRevenue: [],
  reports: [],
  monthRange: null,
  loading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateDashboardStats: (
      state,
      action: PayloadAction<Partial<DashboardState["stats"]>>,
    ) => {
      if (state.stats) {
        state.stats = {
          ...state.stats,
          ...action.payload,
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true
      })

      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
      })

      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error"
      })

      .addCase(getWeeklyRevenue.fulfilled, (state, action) => {
        state.weeklyRevenue = action.payload.revenue
      })
      .addCase(getMonthlyBranchReport.pending, (state) => {
        state.loading = true
      })
      .addCase(getMonthlyBranchReport.fulfilled, (state, action) => {
        state.loading = false
        state.reports = action.payload.data
        state.monthRange = action.payload.monthRange
      })
      .addCase(getMonthlyBranchReport.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch report"
      })
  },
})

export default dashboardSlice.reducer
