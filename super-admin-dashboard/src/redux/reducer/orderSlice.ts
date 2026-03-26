import { createSlice } from "@reduxjs/toolkit"
import type { OrderState } from "../interfaceType/orderType"
import { getAllOrders, getOrderStats } from "../action/orderThunks"

const initialState: OrderState = {
  stats: null,
  orders: [],
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    /* -------- stats -------- */

    builder.addCase(getOrderStats.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getOrderStats.fulfilled, (state, action) => {
      state.loading = false
      state.stats = action.payload
    })

    builder.addCase(getOrderStats.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Something went wrong"
    })

    /* -------- orders -------- */

    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false
      state.orders = action.payload
    })

    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || "Something went wrong"
    })
  },
})

export default orderSlice.reducer
