import React from 'react'
import OrderCards from '../../components/orders/OrderCards'
import OrdersPage from '../../components/orders/OrdersPage'
const Orders = () => {
  return (
    <div className='p-6'>

         {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Order Management
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
Monitor and manage orders across all branches          </p>
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