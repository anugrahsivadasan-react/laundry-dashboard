import { Activity, TriangleAlert, Shield, Database } from "lucide-react"
import { apiAxios } from "../../config/axios"
import { useEffect, useState } from "react"
import { data } from "react-router-dom"

type StatCard = {
  title: string
  value: string | number | undefined
  icon: React.ReactNode
  iconBg: string
}

const SecuirityStats = () => {
  const [stats, setStats] = useState<any>([])
  const fetchStats = async () => {
    try {
      const res = await apiAxios.get(`/super_admin/sessions/stats`)
      setStats(res.data.data)
    } catch (err: any) {
      console.log(err.response?.data.message || err.message)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const statsData: StatCard[] = [
    {
      title: "System Status",
      value: "Secure",
      icon: <Shield className="w-4 h-4 text-green-400" />,
      iconBg: "bg-green-500/10",
    },
    {
      title: "Active Sessions",
      value: stats?.activeSessions ?? 0,
      icon: <Activity className="w-4 h-4 text-blue-500" />,
      iconBg: "bg-[#2B7FFF1A]",
    },

    {
      title: "Last Backup",
      value: "2",
      icon: <Database className="w-4 h-4 text-violet-600" />,
      iconBg: "bg-[#AD46FF1A]",
    },
    {
      title: "Logout sessions",
      value: stats?.inactiveSessions ?? 0,
      icon: <TriangleAlert className="w-4 h-4 text-red-500" />,
      iconBg: "bg-red-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-[#0f0f10] border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-lg ${stat.iconBg}`}
            >
              {stat.icon}
            </div>

            <div>
              <p className="text-xs text-gray-400">{stat.title}</p>
              <p className="text-lg font-semibold text-white">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SecuirityStats
