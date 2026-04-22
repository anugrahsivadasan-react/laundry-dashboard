import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authSlice"
import dashReducer from "./reducer/dashSlice"
import orderReducer from "./reducer/orderSlice"
import adminReducer from "./reducer/adminSlice"
import branchsReducer from "./reducer/branchSlice"
import customerReducer from "./reducer/customerSlice"
import notificationsReducer from "./reducer/notificationSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dash: dashReducer,
    order: orderReducer,
    admin: adminReducer,
    branchs: branchsReducer,
    customer: customerReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
