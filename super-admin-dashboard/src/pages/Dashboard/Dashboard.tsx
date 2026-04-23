import { useEffect } from "react"
import StatsCard from "../../components/dashboard/StatsCard"
import WeeklyRevenueGraph from "../../components/dashboard/WeeklyRevenueGraph"
import OrderStatusGraph from "../../components/dashboard/OrderStatsGraph"
import SuperAdminPerformanceChart from "../../components/dashboard/SuperAdminPerformanceChart"
import SuperAdminQuickActions from "../../components/dashboard/SuperAdminQuickActions"

import {
  getDashboardStats,
  getMonthlyBranchReport,
  getWeeklyRevenue,
} from "../../redux/action/dashThunks"
import { getOrderStats } from "../../redux/action/orderThunks"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import socket from "../../config/soket"
import { formatCurrency } from "../../utils/formatCurrency"

import ordersIcon from "../../assets/dahboardicons/ordersicon.svg"
import revenueIcon from "../../assets/dahboardicons/revenueicon.svg"
import branchesIcon from "../../assets/dahboardicons/branchesicon.svg"
import adminsIcon from "../../assets/dahboardicons/adminicon.svg"
import paymentsIcon from "../../assets/dahboardicons/paymenticon.svg"
import DateRangeFilter from "../../utils/DateRangeFilter"

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { stats } = useAppSelector((s) => s.dash)

  const fetchData = (from: string, to: string) => {
    dispatch(getDashboardStats({ from, to }))
    dispatch(getWeeklyRevenue())
    dispatch(getOrderStats())
    dispatch(getMonthlyBranchReport())
  }

  useEffect(() => {
    if (!socket) return

    socket.on("order-created", () => fetchData("", ""))
    socket.on("branch-created", () => fetchData("", ""))
    socket.on("admin-created", () => fetchData("", ""))

    return () => {
      socket.off("order-created")
      socket.off("branch-created")
      socket.off("admin-created")
    }
  }, [])

  const getChangeType = (value?: number) => {
    if (!value) return "neutral"
    return value > 0 ? "positive" : "negative"
  }

  const statsData = [
    {
      id: 1,
      title: "Total Orders",
      value: stats?.totalOrders,
      changeText: stats?.orderGrowth,
      changeType: getChangeType(Number(stats?.orderGrowth?.replace("%", ""))),
      icon: ordersIcon,
      iconBgColor: "#2B7FFF1A",
    },
    {
      id: 2,
      title: "Total Revenue",
      value: formatCurrency(Number(stats?.totalRevenue)),
      changeText: stats?.revenueGrowth,
      changeType: getChangeType(Number(stats?.revenueGrowth?.replace("%", ""))),
      icon: revenueIcon,
      iconBgColor: "#00C9501A",
    },
    {
      id: 3,
      title: "Active Branches",
      value: stats?.totalBranches,
      changeText: `${stats?.todayBranches || 0} new`,
      changeType: getChangeType(stats?.todayBranches),
      icon: branchesIcon,
      iconBgColor: "#AD46FF1A",
    },
    {
      id: 4,
      title: "Active Admins",
      value: stats?.totalActiveAdmins,
      changeText: `${stats?.todayAdmins || 0} new`,
      changeType: getChangeType(stats?.todayAdmins),
      icon: adminsIcon,
      iconBgColor: "#FE9A001A",
    },
    {
      id: 5,
      title: "Pending Payments",
      value: formatCurrency(Number(stats?.pendingAmount)),
      changeText: `${stats?.pendingOrders || 0} orders`,
      changeType: getChangeType(Number(stats?.pendingOrders)),
      icon: paymentsIcon,
      iconBgColor: "#FB2C361A",
    },
  ]

  return (
    <div className="p-8 bg-[#0A0A0A] min-h-screen text-white">
      <div className="flex justify-end mb-6">
        <DateRangeFilter onChange={fetchData} />
      </div>

      <div className="flex gap-4 mb-8">
        {statsData.map((stat) => (
          <StatsCard key={stat.id} {...stat} />
        ))}
      </div>

      <section className="flex gap-4 mb-8">
        <WeeklyRevenueGraph />
        <OrderStatusGraph />
      </section>

      <section className="flex gap-4 mb-8">
        <SuperAdminPerformanceChart />
        <SuperAdminQuickActions />
      </section>
    </div>
  )
}

export default Dashboard
