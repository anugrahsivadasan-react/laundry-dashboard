import { ChartColumnIcon, DollarSign, Package, User } from "lucide-react"
import ReportStats from "../../components/reportandanalytics/ReportStatsCard"
import ReportGeneratorCard from "../../components/reportandanalytics/ReportGeneratorCard"
import { useEffect, useMemo, useState } from "react"
import ReportAnalysisTabs from "../../components/reportandanalytics/ReportAnalysisTabs"
import { apiAxios } from "../../config/axios"

type AnalyticsResponse = {
  success: boolean
  data: {
    totalRevenue: number
    totalOrders: number
    newCustomers: number
    avgOrderValue: number
    growth: {
      revenueGrowth: string
      orderGrowth: string
      customerGrowth: string
    }
    appliedRange: {
      from: string
      to: string
    }
  }
}

const ReportAndAnalytics = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "branch" | "admin" | "trends"
  >("overview")

  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    newCustomers: 0,
    avgOrderValue: 0,
    growth: {
      revenueGrowth: "0.00%",
      orderGrowth: "0.00%",
      customerGrowth: "0.00%",
    },
  })

  const fetchAnalyticsStats = async () => {
    try {
      setLoading(true)

      const response = await apiAxios.get<AnalyticsResponse>(
        "/super_admin/report/stats",
      )

      if (response.data.success) {
        setStats(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch report analytics stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalyticsStats()
  }, [])

  const statsData = useMemo(
    () => [
      {
        title: "Total Revenue",
        value: `₹${Number(stats.totalRevenue || 0).toLocaleString("en-IN")}`,
        subValue: stats.growth.revenueGrowth,
        icon: <DollarSign className="w-5 h-5 text-[#AD46FF]" />,
        iconBg: "bg-[#AD46FF1A]",
      },
      {
        title: "Total Orders",
        value: stats.totalOrders,
        subValue: stats.growth.orderGrowth,
        icon: <Package className="w-5 h-5 text-[#00C950]" />,
        iconBg: "bg-[#00C9501A]",
      },
      {
        title: "New Customers",
        value: stats.newCustomers,
        subValue: stats.growth.customerGrowth,
        icon: <User className="w-5 h-5 text-[#2B7FFF]" />,
        iconBg: "bg-[#2B7FFF1A]",
      },
      {
        title: "Avg Order Value",
        value: `₹${Number(stats.avgOrderValue || 0).toLocaleString("en-IN")}`,
        subValue: "Per order",
        icon: <ChartColumnIcon className="w-5 h-5 text-[#FE9A00]" />,
        iconBg: "bg-[#FE9A001A]",
      },
    ],
    [stats],
  )

  return (
    <div className="p-6 bg-[#0A0A0A] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Reports & Analytics
          </h1>
          <p className="text-[14px] font-arimo text-[#A1A1A1]">
            Generate comprehensive business reports and analytics
          </p>
        </div>
      </div>

      <ReportStats stats={statsData} loading={loading} />

      <section className="mt-8 mb-8">
        <ReportGeneratorCard />
      </section>

      <section>
        <ReportAnalysisTabs activeTab={activeTab} onChange={setActiveTab} />
      </section>
    </div>
  )
}

export default ReportAndAnalytics
