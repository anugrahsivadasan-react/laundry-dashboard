import { useEffect, useState } from "react"
import {
  Lock,
  Download,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { apiAxios } from "../../config/axios"
import toast from "react-hot-toast"

const BASE_URL = "YOUR_BASE_URL_HERE"

type LoginLog = {
  user: string
  timestamp: string
  ip: string
  device: string
  status: "Login" | "Logout"
}

const LoginHistory = () => {
  const [logs, setLogs] = useState<LoginLog[]>([])
  const [disabled, setDisabled] = useState(false)

  const fetchLogs = async () => {
    try {
      const res = await apiAxios.get(`/super_admin/sessions/all/logins`)
      setLogs(res.data.data)
    } catch {
      // fallback demo data
      setLogs([
        {
          user: "Super Admin",
          timestamp: "2026-01-21 08:30:00",
          ip: "192.168.1.100",
          device: "Chrome on Windows",
          status: "Login",
        },
        {
          user: "Sarah Johnson",
          timestamp: "2026-01-21 09:15:00",
          ip: "192.168.1.105",
          device: "Safari on MacOS",
          status: "Login",
        },
        {
          user: "Mike Chen",
          timestamp: "2026-01-20 23:45:00",
          ip: "203.45.67.89",
          device: "Firefox on Linux",
          status: "Logout",
        },
      ])
    }
  }

  const exportLogs = async () => {
    const lastDownload = localStorage.getItem("lastExportTime")
    const now = Date.now()

    //  10 minutes = 600000 ms
    if (lastDownload && now - Number(lastDownload) < 600000) {
      toast("You can download again after 10 minutes", {
        icon: "⚠️",
        style: {
          border: "1px solid orange",
          padding: "10px",
          color: "#f59e0b",
        },
      })
      return
    }

    try {
      const res = await apiAxios.get(`/super_admin/sessions/export`, {
        responseType: "blob",
      })

      const url = window.URL.createObjectURL(new Blob([res.data]))

      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "login_history.xlsx")

      document.body.appendChild(link)
      link.click()

      link.remove()
      window.URL.revokeObjectURL(url)

      //  Save time AFTER successful download
      localStorage.setItem("lastExportTime", now.toString())
    } catch (error) {
      console.error("Download failed", error)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  useEffect(() => {
    const lastDownload = localStorage.getItem("lastExportTime")
    if (!lastDownload) return

    const now = Date.now()
    if (now - Number(lastDownload) < 600000) {
      setDisabled(true)

      setTimeout(
        () => {
          setDisabled(false)
        },
        600000 - (now - Number(lastDownload)),
      )
    }
  }, [])

  return (
    <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Lock className="w-4 h-4 text-gray-400" />
          Login History
        </div>

        <button
          onClick={exportLogs}
          disabled={disabled}
          className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md
    ${
      disabled
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-white text-black hover:bg-[#242425]"
    }
  `}
        >
          <Download className="w-3 h-3" />
          {disabled ? "Wait 10 min" : "Export"}
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="text-gray-400 border-b border-gray-800">
            <tr>
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Timestamp</th>
              <th className="text-left py-2">IP Address</th>
              <th className="text-left py-2">Device</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className="border-b border-gray-900 hover:bg-[#161616]"
              >
                {/* User */}
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-gray-500" />
                    {log.user}
                  </div>
                </td>

                <td className="py-3 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {log.timestamp}
                  </div>
                </td>

                {/* IP */}
                <td className="text-gray-400">{log.ip}</td>

                {/* Device */}
                <td className="text-gray-400">{log.device}</td>

                {/* Status */}
                <td>
                  {log.status === "Login" ? (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 w-fit">
                      <CheckCircle className="w-3 h-3" />
                      Login
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 w-fit">
                      <AlertTriangle className="w-3 h-3" />
                      Logout
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LoginHistory
