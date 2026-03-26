import React, { useEffect } from "react"
import OrderCards from "../../components/orders/OrderCards"
import OrdersPage from "../../components/orders/OrdersPage"
import { useAppDispatch } from "../../redux/hooks"
import { getAllOrders, getOrderStats } from "../../redux/action/orderThunks"
const Orders = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getOrderStats())
    dispatch(getAllOrders())
  }, [dispatch])
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Order Management
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            Monitor and manage orders across all branches{" "}
          </p>
        </div>
      </div>

      <OrderCards />
      <div className="">
        <OrdersPage />
      </div>
    </div>
  )
}

export default Orders
