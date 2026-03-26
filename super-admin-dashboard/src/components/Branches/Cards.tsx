import React from "react"
import { Building2, Power, PowerOff, Users } from "lucide-react"
import BranchStats from "./BranchStats"
import { useAppSelector } from "../../redux/hooks"

const Cards = () => {
  const { stats } = useAppSelector((s) => s.branchs)
  const statsData = [
    {
      title: "Total Branches",
      value: stats?.totalBranches,
      icon: <Building2 className="w-4 h-4 text-blue-500" />,
      iconBg: "bg-[#2B7FFF1A]",
    },
    {
      title: "Active",
      value: stats?.activeBranches,
      icon: <Power className="w-4 h-4 text-green-400" />,
      iconBg: "bg-green-500/10",
    },
    {
      title: "Disabled",
      value: stats?.inactiveBranches,
      icon: <Power className="w-4 h-4 text-red-400" />,
      iconBg: "bg-red-500/10",
    },
    {
      title: "Total Admins",
      value: stats?.totalAdmins,
      icon: <Users className="w-4 h-4 text-purple-400" />,
      iconBg: "bg-purple-500/10",
    },
  ]

  return <BranchStats stats={statsData} />
}

export default Cards
