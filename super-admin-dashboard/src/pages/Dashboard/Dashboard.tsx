import StatsCard from "../../components/dashboard/StatsCard"
import ordersIcon from "../../assets/dahboardicons/ordersicon.svg"
import revenueIcon from "../../assets/dahboardicons/revenueicon.svg"
import branchesIcon from "../../assets/dahboardicons/branchesicon.svg"
import adminsIcon from "../../assets/dahboardicons/adminicon.svg"
import paymentsIcon from "../../assets/dahboardicons/paymenticon.svg"
import WeeklyRevenueGraph from "../../components/dashboard/WeeklyRevenueGraph"
import OrderStatusGraph from "../../components/dashboard/OrderStatsGraph"
import SuperAdminPerformanceChart from "../../components/dashboard/SuperAdminPerformanceChart"
import SuperAdminQuickActions from "../../components/dashboard/SuperAdminQuickActions"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  getDashboardStats,
  getMonthlyBranchReport,
  getWeeklyRevenue,
} from "../../redux/action/dashThunks"
import socket from "../../config/soket"
import { getOrderStats } from "../../redux/action/orderThunks"

interface StatItem {
  id: number
  title: string
  value: number | string | undefined
  changeText: string | undefined
  changeType: "positive" | "negative" | "neutral"
  icon: string
  iconBgColor: string
}

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { stats, weeklyRevenue } = useAppSelector((s) => s.dash)
  console.log(stats)

  useEffect(() => {
    dispatch(getDashboardStats({}))
    dispatch(getWeeklyRevenue())
    dispatch(getOrderStats())
    dispatch(getMonthlyBranchReport())
  }, [dispatch])

  useEffect(() => {
    if (!socket) return

    socket.on("order-created", (data) => {
      console.log("Dashboard update:", data)

      // Example: update state
      dispatch(getDashboardStats({}))
    })

    return () => {
      socket.off("order-created")
    }
  }, [socket])

  const getChangeText = (value?: number) => {
    if (!value || value === 0) {
      return "No change"
    }
    return `+${value} new`
  }

  const getChangeType = (
    value?: number,
  ): "positive" | "negative" | "neutral" => {
    if (!value || value === 0) return "neutral"
    return value > 0 ? "positive" : "negative"
  }

  const parsePercent = (value?: string): number => {
    if (!value) return 0
    return Number(value.replace("%", ""))
  }
  const amount = 3240
  const statsData: StatItem[] = [
    {
      id: 1,
      title: "Total Orders",
      value: stats?.totalOrders,
      changeText: stats?.orderGrowth,
      changeType: getChangeType(parsePercent(stats?.orderGrowth)),
      icon: ordersIcon,
      iconBgColor: "#2B7FFF1A",
    },
    {
      id: 2,
      title: "Total Revenue",
      value: stats?.totalRevenue,
      changeText: stats?.revenueGrowth,
      changeType: getChangeType(parsePercent(stats?.revenueGrowth)),
      icon: revenueIcon,
      iconBgColor: "#00C9501A",
    },
    {
      id: 3,
      title: "Active Branches",
      value: stats?.totalBranches,
      changeText: getChangeText(stats?.todayBranches),
      changeType: getChangeType(stats?.todayBranches),
      icon: branchesIcon,
      iconBgColor: "#AD46FF1A",
    },
    {
      id: 4,
      title: "Active Admins",
      value: stats?.totalActiveAdmins,
      changeText: getChangeText(stats?.todayAdmins),
      changeType: getChangeType(stats?.todayAdmins),
      icon: adminsIcon,
      iconBgColor: "#FE9A001A",
    },
    {
      id: 5,
      title: "Pending Payments",
      value: amount?.toLocaleString("en-IN"),
      changeText: "-23 orders",
      changeType: "negative",
      icon: paymentsIcon,
      iconBgColor: "#FB2C361A",
    },
  ]
  return (
    <div className="p-8 bg-[#0A0A0A] min-h-screen ">
      {/* Stats Grid */}
      <div className="flex gap-4 mb-8">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            changeText={stat.changeText}
            changeType={stat.changeType}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
          />
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
