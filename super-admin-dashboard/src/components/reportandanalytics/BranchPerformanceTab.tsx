import React, { useEffect, useMemo, useState } from "react"
import { apiAxios } from "../../config/axios"

type BranchPerformanceItem = {
  id: string
  name: string
  revenue: number
  orders: number
  avgOrder: number
}

type BranchPerformanceResponse = {
  success: boolean
  year: number
  data: BranchPerformanceItem[]
}

type SortType = "revenue" | "orders" | "avgOrder"

const BranchPerformanceTab: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const [branchPerformance, setBranchPerformance] = useState<
    BranchPerformanceItem[]
  >([])
  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number | "">("")
  const [sortBy, setSortBy] = useState<SortType>("revenue")

  // Dynamic year list (current year to last 5 years)
  const yearOptions = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => currentYear - index)
  }, [currentYear])

  // Fetch branch performance
  const fetchBranchPerformanceReport = async (year?: number) => {
    try {
      setLoading(true)

      const response = await apiAxios.get<BranchPerformanceResponse>(
        "/super_admin/report/branch-performance-report",
        {
          params: year ? { year } : {},
        },
      )

      setBranchPerformance(response.data.data || [])
    } catch (error) {
      console.error("Failed to fetch branch performance:", error)
      setBranchPerformance([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBranchPerformanceReport(selectedYear === "" ? undefined : selectedYear)
  }, [selectedYear])

  // Performance label logic
  const getPerformanceLabel = (
    revenue: number,
    orders: number,
    avgOrder: number,
  ) => {
    if (revenue === 0 && orders === 0) {
      return {
        label: "Inactive",
        color: "text-red-400",
      }
    }

    const score = revenue + orders * 100 + avgOrder * 2

    if (score >= 1000) {
      return {
        label: "Top Performer",
        color: "text-green-400",
      }
    }

    if (score >= 500) {
      return {
        label: "Strong",
        color: "text-violet-400",
      }
    }

    if (score >= 200) {
      return {
        label: "Good",
        color: "text-amber-400",
      }
    }

    return {
      label: "Average",
      color: "text-gray-300",
    }
  }

  // Sorted data
  const sortedBranches = useMemo(() => {
    const copied = [...branchPerformance]

    return copied.sort((a, b) => {
      if (sortBy === "revenue") return b.revenue - a.revenue
      if (sortBy === "orders") return b.orders - a.orders
      return b.avgOrder - a.avgOrder
    })
  }, [branchPerformance, sortBy])

  const getRankBadgeBg = (index: number) => {
    if (index === 0) return "linear-gradient(135deg, #22C55E, #16A34A)"
    if (index === 1) return "linear-gradient(135deg, #6366F1, #8B5CF6)"
    if (index === 2) return "linear-gradient(135deg, #F59E0B, #D97706)"
    return "linear-gradient(135deg, #525252, #737373)"
  }

  return (
    <div
      className="w-full"
      style={{
        background: "#171717",
        borderRadius: "14px",
        border: "1.25px solid #262626",
        padding: "24px",
      }}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-white text-sm md:text-base font-medium">
          Branch Performance Comparison
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="h-10 px-4 rounded-lg text-white font-medium bg-[#262626] border border-[#3a3a3a] outline-none"
          >
            <option value="revenue" className="text-white bg-[#262626]">
              Sort by Revenue
            </option>
            <option value="orders" className="text-white bg-[#262626]">
              Sort by Orders
            </option>
            <option value="avgOrder" className="text-white bg-[#262626]">
              Sort by Avg Order
            </option>
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            className="h-10 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition outline-none"
          >
            <option value="" className="text-black">
              All Years
            </option>

            {yearOptions.map((year) => (
              <option key={year} value={year} className="text-black">
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse"
              style={{
                background:
                  "linear-gradient(90deg, rgba(38,38,38,0.6), rgba(23,23,23,0.6))",
                borderRadius: "10px",
                padding: "18px 20px",
                minHeight: "90px",
              }}
            />
          ))}
        </div>
      ) : sortedBranches.length === 0 ? (
        // Empty State
        <div className="text-center py-10 text-gray-400 text-sm">
          No branch performance data available
        </div>
      ) : (
        // Branch List
        <div className="flex flex-col gap-5">
          {sortedBranches.map((branch, index) => {
            const performance = getPerformanceLabel(
              branch.revenue,
              branch.orders,
              branch.avgOrder,
            )

            return (
              <div
                key={branch.id}
                className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(38,38,38,0.6), rgba(23,23,23,0.6))",
                  borderRadius: "10px",
                  padding: "18px 20px",
                }}
              >
                {/* Left */}
                <div className="flex items-center gap-4 min-w-[220px]">
                  <div
                    className="w-9 h-9 flex items-center justify-center text-xs font-semibold text-white"
                    style={{
                      borderRadius: "8px",
                      background: getRankBadgeBg(index),
                    }}
                  >
                    {index + 1}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">
                      {branch.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      Branch ID: #{branch.id.slice(0, 8)}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 flex-1">
                  {/* Revenue */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Revenue</span>
                    <span className="text-white text-sm font-medium">
                      ₹{branch.revenue.toLocaleString()}
                    </span>
                  </div>

                  {/* Orders */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Orders</span>
                    <span className="text-white text-sm font-medium">
                      {branch.orders}
                    </span>
                  </div>

                  {/* Avg Order */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Avg Order</span>
                    <span className="text-white text-sm font-medium">
                      ₹{branch.avgOrder.toFixed(2)}
                    </span>
                  </div>

                  {/* Performance */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Performance</span>
                    <span
                      className={`text-sm font-medium ${performance.color}`}
                    >
                      {performance.label}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <div className="flex justify-end">
                  <button
                    className="text-xs px-4 py-2 font-medium transition hover:opacity-90"
                    style={{
                      background: "#E5E5E5",
                      borderRadius: "6px",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BranchPerformanceTab
