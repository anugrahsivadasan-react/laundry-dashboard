import { createAsyncThunk } from "@reduxjs/toolkit"
import type { Branch } from "../interfaceType/branchType"
import { apiAxios } from "../../config/axios"

/* CREATE BRANCH */

export const createBranch = createAsyncThunk<
  Branch,
  Partial<Branch>,
  { rejectValue: string }
>("branch/createBranch", async (data, { rejectWithValue }) => {
  try {
    const res = await apiAxios.post("/super_admin/branches", data)
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* GET ALL BRANCHES */

export const getAllBranches = createAsyncThunk<
  { data: Branch[]; stats: any },
  void,
  { rejectValue: string }
>("branch/getAllBranches", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/branches")
    return res.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* GET BRANCH BY ID */

export const getBranchById = createAsyncThunk<
  Branch,
  number,
  { rejectValue: string }
>("branch/getBranchById", async (id, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get(`/super_admin/branches/${id}`)
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* UPDATE BRANCH */

export const updateBranch = createAsyncThunk<
  Branch,
  { id: number; data: Partial<Branch> },
  { rejectValue: string }
>("branch/updateBranch", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await apiAxios.put(`/super_admin/branches/${id}`, data)
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

/* DELETE BRANCH */

export const deleteBranch = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("branch/deleteBranch", async (id, { rejectWithValue }) => {
  try {
    await apiAxios.delete(`/super_admin/branches/${id}`)
    return id
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})
