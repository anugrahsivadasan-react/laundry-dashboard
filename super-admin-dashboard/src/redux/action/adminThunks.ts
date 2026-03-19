import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiAxios } from "../../config/axios"
import type { AdminUser, BranchUserResponse } from "../interfaceType/adminType"

/* LOGIN */

export const superAdminLogin = createAsyncThunk<
  { role: string },
  { email: string; password: string },
  { rejectValue: string }
>("admin/login", async (data, { rejectWithValue }) => {
  try {
    const res = await apiAxios.post("/super_admin/login", data)
    return res.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.msg)
  }
})

/* PROFILE */

export const getSuperAdminProfile = createAsyncThunk<
  AdminUser,
  void,
  { rejectValue: string }
>("admin/profile", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/profile")
    return res.data.user
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.msg)
  }
})

/* CREATE ADMIN */

export const createAdmin = createAsyncThunk<
  AdminUser,
  {
    name: string
    email: string
    password: string
    phone: string
    branchId: number
  },
  { rejectValue: string }
>("admin/createAdmin", async (data, { rejectWithValue }) => {
  try {
    const res = await apiAxios.post("/super_admin/create-admin", data)
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* GET ADMINS */

export const getAllAdmins = createAsyncThunk<
  AdminUser[],
  void,
  { rejectValue: string }
>("admin/getAllAdmins", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/admins")
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* GET BRANCH USERS */

export const getBranchUsers = createAsyncThunk<
  BranchUserResponse,
  void,
  { rejectValue: string }
>("admin/getBranchUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/branch-users")
    return res.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* ASSIGN BRANCH */

export const assignBranchToAdmin = createAsyncThunk<
  void,
  { adminId: number; branchId: number },
  { rejectValue: string }
>("admin/assignBranch", async (data, { rejectWithValue }) => {
  try {
    await apiAxios.post("/super_admin/assign-branch", data)
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})
