import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { apiAxios } from "../../config/axios"
import type {
  CustomerStats,
  UserOrderSummary,
} from "../interfaceType/customerTypes"

/* ================= CUSTOMER STATS ================= */

export const fetchCustomerStats = createAsyncThunk<
  CustomerStats,
  void,
  { rejectValue: string }
>("customer/fetchStats", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get(`/super_admin/customer_mangement/status`)
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Error fetching stats",
    )
  }
})

/* ================= USER ORDER SUMMARY ================= */

export const fetchUserOrderSummary = createAsyncThunk<
  UserOrderSummary[],
  void,
  { rejectValue: string }
>("customer/fetchUserSummary", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get(`/super_admin/customer_mangement/customer`)
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Error fetching user summary",
    )
  }
})
