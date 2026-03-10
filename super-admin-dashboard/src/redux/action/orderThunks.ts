import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiAxios } from "../../config/axios"
import type { OrderItem, OrderStats } from "../interfaceType/orderType"

/* ---------- get order stats ---------- */

export const getOrderStats = createAsyncThunk<
  OrderStats,
  void,
  { rejectValue: string }
>("orders/getOrderStats", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/order_mangement/status")

    return res.data.data.stats
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* ---------- get all orders ---------- */

export const getAllOrders = createAsyncThunk<
  OrderItem[],
  void,
  { rejectValue: string }
>("orders/getAllOrders", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/order_mangement/orders")

    return res.data.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})
