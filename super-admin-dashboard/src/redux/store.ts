import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authSlice"
import dashReducer from "./reducer/dashSlice"
import orderReducer from "./reducer/orderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dash: dashReducer,
    order: orderReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
