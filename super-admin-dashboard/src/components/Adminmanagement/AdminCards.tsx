import { Shield, Power, UserPlus } from "lucide-react"
import AdminStats from "./AdminStats"
import { useAppSelector } from "../../redux/hooks"

const Cards = () => {
  const { stats } = useAppSelector((s) => s.admin)
  const statsData = [
    {
      title: "Total Admin",
      value: stats?.totalAdmins ?? 0,
      icon: <Shield className="w-4 h-4 text-violet-500" />,
      iconBg: "bg-[#AD46FF1A]",
    },
    {
      title: "Active",
      value: stats?.activeAdmins ?? 0,
      icon: <Power className="w-4 h-4 text-green-400" />,
      iconBg: "bg-green-500/10",
    },
    {
      title: "New This Month",
      value: stats?.newAdminsThisMonth ?? 0,
      icon: <UserPlus className="w-4 h-4 text-blue-400" />,
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Branch Staffs",
      value: stats?.branchUsers ?? 0,
      icon: <Shield className="w-4 h-4 text-yellow-400" />,
      iconBg: "bg-yellow-500/10",
    },
  ]

  return <AdminStats stats={statsData} />
}

export default Cards
