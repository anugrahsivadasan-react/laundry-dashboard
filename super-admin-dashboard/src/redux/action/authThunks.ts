// authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiAxios } from "../../config/axios"

// LOGIN (OTP + optional password)
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const res = await apiAxios.post("/super_admin/auth/login", {
        email,
        password,
      })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("refreshToken", res.data.refreshToken)
      await dispatch(getProfile())
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  },
)

// PROFILE
export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiAxios.get("/super_admin/profile")

      return res.data.user
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.setItem("loggedOut", "true")
      }
      return rejectWithValue("Session expired")
    }
  },
)

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiAxios.post("/auth/logout")
      localStorage.setItem("loggedOut", "true")
      return res.data.msg
    } catch (err) {
      return rejectWithValue("Logout failed")
    }
  },
)
