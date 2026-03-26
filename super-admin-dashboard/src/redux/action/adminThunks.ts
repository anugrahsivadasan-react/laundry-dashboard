import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiAxios } from "../../config/axios"
import type {
  AdminStats,
  AdminUser,
  BranchUser,
} from "../interfaceType/adminType"

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
    branchId: string | number
  },
  { rejectValue: string }
>("admin/createAdmin", async (data, { rejectWithValue }) => {
  try {
    const res = await apiAxios.post("/super_admin/create-admin", data)
    return res.data.data
  } catch (err: any) {
    console.log(err)
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* update ADMINS */
export const updateAdmin = createAsyncThunk<
  string, // return message
  { id: string; data: { name: string; email: string; phone: string } },
  { rejectValue: string }
>("admin/updateAdmin", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await apiAxios.put(`/super_admin/admin/${id}/update`, data)

    return res.data.message
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Update failed")
  }
})

/* GET ADMINS stats*/

export const getAllAdminStats = createAsyncThunk<
  AdminStats,
  void,
  { rejectValue: string }
>("admin/getAllAdminStats", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/admin/stats")
    return res.data.stats
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

//get admin by id
export const getAdminById = createAsyncThunk<
  AdminUser,
  { id: string },
  { rejectValue: string }
>("admin/getAdminById", async ({ id }, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get(`/super_admin/admin/${id}`)
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* GET BRANCH USERS */

export const getBranchUsers = createAsyncThunk<
  BranchUser[],
  void,
  { rejectValue: string }
>("admin/getBranchUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/branch/admin_users")
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* ASSIGN BRANCH */

export const assignBranchToAdmin = createAsyncThunk<
  any,
  { adminId: number; branchId: number },
  { rejectValue: string }
>("admin/assignBranch", async (data, { rejectWithValue }) => {
  try {
    await apiAxios.post("/super_admin/assign-branch", data)
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})
