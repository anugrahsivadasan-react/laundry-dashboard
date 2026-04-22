import React, { useState } from "react"
import { Download, Calendar } from "lucide-react"
import { apiAxios } from "../../config/axios"

const ReportGeneratorCard: React.FC = () => {
  const [reportType, setReportType] = useState("revenue")
  const [dateRange, setDateRange] = useState("30days")
  const [format, setFormat] = useState("pdf")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split("T")[0]

  const handleDownload = async () => {
    try {
      if (dateRange === "custom") {
        if (!fromDate || !toDate) {
          return alert("Please select both From Date and To Date")
        }

        if (new Date(fromDate) > new Date(toDate)) {
          return alert("From Date cannot be greater than To Date")
        }
      }

      setLoading(true)

      const params: any = {
        reportType,
        dateRange,
        format,
      }

      if (dateRange === "custom") {
        params.from = fromDate
        params.to = toDate
      }

      const response = await apiAxios.get("/super_admin/report/export", {
        params,
        responseType: "blob",
      })

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${reportType}-report.${format}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
      alert("Failed to generate report")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full bg-[#171717] border border-[#262626] rounded-[14px] p-6 flex items-end justify-between gap-8">
      {/* LEFT SECTION */}
      <div className="flex flex-col gap-6 flex-1">
        <h2 className="text-white text-lg font-semibold">
          Generate Custom Report
        </h2>

        <div className="flex gap-6 flex-wrap">
          {/* Report Type */}
          <div className="flex flex-col gap-2 w-[240px]">
            <label className="text-sm text-gray-400">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="h-10 bg-[#262626] border border-[#333] text-gray-200 px-3 rounded-lg focus:outline-none"
            >
              <option value="revenue">Revenue Report</option>
              <option value="users">User Report</option>
              <option value="performance">Performance Report</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex flex-col gap-2 w-[240px]">
            <label className="text-sm text-gray-400">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="h-10 bg-[#262626] border border-[#333] text-gray-200 px-3 rounded-lg focus:outline-none"
            >
              <option value="30days">Last 30 Days</option>
              <option value="7days">Last 7 Days</option>
              <option value="12months">Last 12 Months</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Custom From Date */}
          {dateRange === "custom" && (
            <div className="flex flex-col gap-2 w-[240px]">
              <label className="text-sm text-gray-400">From Date</label>
              <input
                type="date"
                value={fromDate}
                max={toDate || today}
                onChange={(e) => {
                  const value = e.target.value
                  setFromDate(value)

                  // reset toDate if it becomes invalid
                  if (toDate && value > toDate) {
                    setToDate("")
                  }
                }}
                className="h-10 bg-[#262626] border border-[#333] text-gray-200 px-3 rounded-lg focus:outline-none"
              />
            </div>
          )}

          {/* Custom To Date */}
          {dateRange === "custom" && (
            <div className="flex flex-col gap-2 w-[240px]">
              <label className="text-sm text-gray-400">To Date</label>
              <input
                type="date"
                value={toDate}
                min={fromDate || ""}
                max={today}
                onChange={(e) => setToDate(e.target.value)}
                className="h-10 bg-[#262626] border border-[#333] text-gray-200 px-3 rounded-lg focus:outline-none"
              />
            </div>
          )}
          {/* Export Format */}
          <div className="flex flex-col gap-2 w-[240px]">
            <label className="text-sm text-gray-400">Export Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="h-10 bg-[#262626] border border-[#333] text-gray-200 px-3 rounded-lg focus:outline-none"
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
              <option value="xlsx">XLSX</option>
            </select>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          disabled={loading}
          className="h-10 px-5 flex items-center gap-2 rounded-lg text-white font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition disabled:opacity-50"
        >
          <Download size={16} />
          {loading ? "Generating..." : "Generate & Download"}
        </button>
      </div>
    </div>
  )
}

export default ReportGeneratorCard
