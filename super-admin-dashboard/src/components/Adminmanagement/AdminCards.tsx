import { Shield, Power, UserPlus } from "lucide-react";
import AdminStats from "./AdminStats";

const Cards = () => {
  const statsData = [
    {
      title: "Total Admin",
      value: 12,
      icon: <Shield className="w-4 h-4 text-violet-500" />,
      iconBg: "bg-[#AD46FF1A]",
    },
    {
      title: "Active",
      value: 11,
      icon: <Power className="w-4 h-4 text-green-400" />,
      iconBg: "bg-green-500/10",
    },
    {
      title: "New This Month",
      value: 1,
      icon: <UserPlus className="w-4 h-4 text-blue-400" />,
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Branch Admins",
      value: 28,
      icon: <Shield className="w-4 h-4 text-yellow-400" />,
      iconBg: "bg-yellow-500/10",
    },
  ];

  return <AdminStats stats={statsData} />;
};

export default Cards;
