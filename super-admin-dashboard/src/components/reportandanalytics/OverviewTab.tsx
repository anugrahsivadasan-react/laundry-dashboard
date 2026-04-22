import React, { useEffect, useMemo, useState } from "react"
import OrdersCustomersChart from "./graphs/OrdersCustomersChart"
import RevenueTrendChart from "../PaymentAndRevenue/RevenueTrend"
import type { RevenueTrend } from "../PaymentAndRevenue/RevenueTrend"
import { apiAxios } from "../../config/axios"

type RevenueTrendItem = {
  date: string
  revenue: number
}

type RevenueTrendResponse = {
  success: boolean
  year: number
  data: RevenueTrendItem[]
}

type OrdersCustomersItem = {
  month: string
  orders: number
  customers: number
}

type OrdersCustomersResponse = {
  success: boolean
  year: number
  data: OrdersCustomersItem[]
}

const OverviewTab: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const [revenueTrend, setRevenueTrend] = useState<RevenueTrend[]>([])
  const [ordersCustomersTrend, setOrdersCustomersTrend] = useState<
    OrdersCustomersItem[]
  >([])

  const [chartLoading, setChartLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number | "">("")

  // Dynamic year list (current year to last 5 years)
  const yearOptions = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => currentYear - 1 - index)
  }, [currentYear])

  // Revenue Trend API
  const fetchRevenueTrend = async (year?: number) => {
    try {
      const response = await apiAxios.get<RevenueTrendResponse>(
        "/super_admin/report/revenue-trend",
        {
          params: year ? { year } : {},
        },
      )

      setRevenueTrend(response.data.data || [])
    } catch (error) {
      console.error("Failed to fetch revenue trend:", error)
      setRevenueTrend([])
    }
  }

  // Orders & Customers Trend API
  const fetchOrdersCustomersTrend = async (year?: number) => {
    try {
      const response = await apiAxios.get<OrdersCustomersResponse>(
        "/super_admin/report/monthly-orders-customers-trend",
        {
          params: year ? { year } : {},
        },
      )

      setOrdersCustomersTrend(response.data.data || [])
    } catch (error) {
      console.error("Failed to fetch orders/customers trend:", error)
      setOrdersCustomersTrend([])
    }
  }

  useEffect(() => {
    const fetchAllCharts = async () => {
      try {
        setChartLoading(true)

        await Promise.all([
          fetchRevenueTrend(selectedYear === "" ? undefined : selectedYear),
          fetchOrdersCustomersTrend(
            selectedYear === "" ? undefined : selectedYear,
          ),
        ])
      } finally {
        setChartLoading(false)
      }
    }

    fetchAllCharts()
  }, [selectedYear])

  return (
    <div className="w-full">
      {/* Dynamic Year Filter */}
      <div className="flex justify-end mb-4">
        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="h-10 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition outline-none"
        >
          <option value="" className="text-black">
            Current Years
          </option>

          {yearOptions.map((year) => (
            <option key={year} value={year} className="text-black">
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Graph Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendChart data={revenueTrend} />
        <OrdersCustomersChart
          data={ordersCustomersTrend}
          loading={chartLoading}
        />
      </div>
    </div>
  )
}

export default OverviewTab
