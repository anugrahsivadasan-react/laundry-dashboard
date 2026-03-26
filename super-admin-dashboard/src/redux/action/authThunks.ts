// authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiAxios } from "../../config/axios"

// LOGIN (OTP + optional password)
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { phone, password }: { phone: string; password?: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await apiAxios.post("/auth/login", { phone, password })
      console.log(res.data)
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  },
)

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await apiAxios.post("/auth/register", data)
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.msg)
    }
  },
)

// RESEND OTP
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (phone: string, { rejectWithValue }) => {
    try {
      const res = await apiAxios.post("/auth/resend-otp", { phone })
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  },
)

// VERIFY OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    { otp, phone }: { otp: string; phone: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await apiAxios.post("/auth/verify-otp", { otp, phone })
      return res.data.user
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.msg)
    }
  },
)

// PROFILE
export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiAxios.get("/auth/profile")
      return res.data.user
    } catch {
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

// addressThunks

// GET ADDRESSES
export const getAddresses = createAsyncThunk(
  "address/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiAxios.get("/auth/address")
      return res.data.addresses
    } catch {
      return rejectWithValue("Failed to load addresses")
    }
  },
)

// ADD / UPDATE ADDRESS
export const updateProfileAddress = createAsyncThunk(
  "address/update",
  async (
    { addressId, data }: { addressId?: string; data: any },
    { rejectWithValue },
  ) => {
    try {
      const res = await apiAxios.put(
        addressId
          ? `/auth/update-profile/${addressId}`
          : "/auth/update-profile",
        data,
      )
      return res.data
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Address update failed",
      )
    }
  },
)

// DELETE ADDRESS
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await apiAxios.delete(`/auth/address/${id}/delete`)
      return id
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message)
    }
  },
)

// SET DEFAULT ADDRESS
export const setDefaultAddress = createAsyncThunk(
  "address/default",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiAxios.patch(`/auth/address/${id}/default`)
      return res.data.address
    } catch {
      return rejectWithValue("Failed to set default")
    }
  },
)
