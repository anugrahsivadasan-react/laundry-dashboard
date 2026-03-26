import { createAsyncThunk } from "@reduxjs/toolkit"
import type {
  Branch,
  BranchName,
  BranchTable,
} from "../interfaceType/branchType"
import { apiAxios } from "../../config/axios"

/* CREATE BRANCH */

export const createBranch = createAsyncThunk<
  Branch,
  Partial<Branch>,
  { rejectValue: string }
>("branch/createBranch", async (data, { rejectWithValue }) => {
  try {
    const res = await apiAxios.post("/super_admin/branches/create", data)
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Something went wrong",
    )
  }
})

/* GET ALL BRANCHES */

export const getAllBranches = createAsyncThunk<
  {
    success: boolean
    range: { from: string; to: string }
    data: BranchTable[]
  },
  { from?: string; to?: string } | void,
  { rejectValue: string }
>("branch/getAllBranches", async (params, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/branches/all", {
      params,
    })

    return res.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

//stats of branch
export const getAllBranchestatus = createAsyncThunk<
  { stats: any },
  void,
  { rejectValue: string }
>("branch/getAllBranchestats", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/branches/stats")
    return res.data.stats
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

export const getAllBranchesName = createAsyncThunk<
  BranchName[],
  void,
  { rejectValue: string }
>("branch/getAllBranchesName", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get("/super_admin/branches/names")

    return res.data.data
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Failed to fetch branch names",
    )
  }
})

/* GET BRANCH BY ID */

export const getBranchById = createAsyncThunk<
  Branch,
  string,
  { rejectValue: string }
>("branch/getBranchById", async (id, { rejectWithValue }) => {
  try {
    const res = await apiAxios.get(`/super_admin/branches/${id}/single`)
    return res.data.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message)
  }
})

export const updateBranchStatus = createAsyncThunk<
  Branch,
  { id: string; status: string },
  { rejectValue: string }
>("branch/updateBranchStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await apiAxios.patch(`/super_admin/branches/status/${id}`, {
      status,
    })

    return res.data.data
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Failed to update status",
    )
  }
})

/* UPDATE BRANCH */

export const updateBranch = createAsyncThunk<
  Branch,
  { id: string; data: Partial<Branch> },
  { rejectValue: string }
>("branch/updateBranch", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await apiAxios.put(`/super_admin/branches/${id}/upadate`, data)
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
