import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiAxios } from "../../config/axios"
import type { BranchReport, MonthRange } from "../interfaceType/dashType"

interface DashboardQuery {
  from?: string
  to?: string
}

interface ReportResponse {
  success: boolean
  data: BranchReport[]
  monthRange: MonthRange
}

export const getDashboardStats = createAsyncThunk(
  "dashboard/getStats",
  async ({ from, to }: DashboardQuery, { rejectWithValue }) => {
    try {
      const res = await apiAxios.get("/super_admin/dashboard/status", {
        params: {
          from,
          to,
        },
      })

      return res.data.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message)
    }
  },
)

export const getWeeklyRevenue = createAsyncThunk(
  "dashboard/getWeeklyRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiAxios.get("/super_admin/dashboard/weekly-revenue")
      return res.data.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message)
    }
  },
)

export const getMonthlyBranchReport = createAsyncThunk<
  ReportResponse,
  void,
  { rejectValue: string }
>("report/getMonthlyBranchReport", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/dashboard/report/monthly")

    return res.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})
