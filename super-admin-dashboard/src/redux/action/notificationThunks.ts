import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiAxios } from "../../config/axios"

// deliver pending notifications (login time)
export const deliverNotifications = createAsyncThunk(
  "notification/deliver",
  async (_, { rejectWithValue }) => {
    try {
      await apiAxios.patch("/notifications/deliver")
      return true
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  },
)

// mark read
export const markNotificationRead = createAsyncThunk(
  "notification/read",
  async (id: string, { rejectWithValue }) => {
    try {
      await apiAxios.patch(`/notifications/read/${id}`)
      return id
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  },
)

//  GET ALL USER NOTIFICATIONS
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiAxios.get("/notifications/")
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  },
)

export const fetchNotificationStats = createAsyncThunk(
  "notifications/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiAxios.get("/notifications/stats")
      return res.data.data
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch notification stats",
      )
    }
  },
)

export const fetchAdminNotifications = createAsyncThunk(
  "notifications/fetchAdminNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiAxios.get("/notifications/admin-list")
      return res.data.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  },
)
