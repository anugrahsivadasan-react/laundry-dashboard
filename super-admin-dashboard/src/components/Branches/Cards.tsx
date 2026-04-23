import React from "react"
import { Building2, Power, PowerOff, Users } from "lucide-react"
import BranchStats from "./BranchStats"
import { useAppSelector } from "../../redux/hooks"

const Cards = () => {
  const { stats } = useAppSelector((s) => s.branchs)
  const statsData = [
    {
      title: "Total Branches",
      value: stats?.totalBranches ?? 0,
      icon: <Building2 className="w-4 h-4 text-blue-500" />,
      iconBg: "#2B7FFF1A",
    },
    {
      title: "Active",
      value: stats?.activeBranches ?? 0,
      icon: <Power className="w-4 h-4 text-green-400" />,
      iconBg: "#22C55E1A",
    },
    {
      title: "Disabled",
      value: stats?.inactiveBranches ?? 0,
      icon: <Power className="w-4 h-4 text-red-400" />,
      iconBg: "#EF44441A",
    },
    {
      title: "Total Admins",
      value: stats?.totalAdmins ?? 0,
      icon: <Users className="w-4 h-4 text-purple-400" />,
      iconBg: "#A855F71A",
    },
  ]

  return <BranchStats stats={statsData} />
}

export default Cards
