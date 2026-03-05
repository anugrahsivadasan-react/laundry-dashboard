import React from 'react'

import { useEffect, useState } from "react"
import RevenueTrendChart from "../../components/PaymentAndRevenue/RevenueTrend"
import PaymentMethods from "../../components/PaymentAndRevenue/PaymentMethods"
import BranchRevenueChart from "../../components/PaymentAndRevenue/BranchRevenue"
import PendingPayments from "../../components/PaymentAndRevenue/PendingPayments"
import Tabs from '../../components/PaymentAndRevenue/Tabs'
import PaymentCards from '../../components/PaymentAndRevenue/PaymentCards'
const PaymentsAndRevenue = () => {

 const [revenue, setRevenue] = useState([])
  const [payments, setPayments] = useState([])
  const [branches, setBranches] = useState([])
  const [pending, setPending] = useState([])


  return (
  <div className='p-6'>

         {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Payments & Revenue
          </h1>
          <p className="text-[16px] font-arimo text-[#6A7282]">
Track revenue, payments, and financial analytics          </p>
        </div>

       
      </div>

    <PaymentCards />
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 pt-6 pb-6">

        <div className="xl:col-span-2 ">
          <RevenueTrendChart data={revenue}/>
        </div>

        <PaymentMethods data={payments}/>

        <div className="xl:col-span-2">
          <BranchRevenueChart data={branches}/>
        </div>

        <PendingPayments data={pending}/>

      </div>
      <Tabs />

    </div>  )
}

export default PaymentsAndRevenue