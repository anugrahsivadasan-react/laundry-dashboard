import { Shield, Users, Lock, Crown } from "lucide-react";
import AccessStats from "./AccessStats";

const AccessCards = () => {
  const statsData = [
    {
      title: "Total Roles",
      value: 12,
      icon: <Shield className="w-4 h-4 text-violet-500" />,
      iconBg: "bg-[#AD46FF1A]",
    },
    {
      title: "Total Users",
      value: 11,
      icon: <Users className="w-4 h-4 text-blue-500" />,
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Active Sessions",
      value: 1,
      icon: <Lock className="w-4 h-4 text-green-400" />,
      iconBg: "bg-green-500/10",
    },
    {
      title: "Super Admins",
      value: 28,
      icon: <Crown className="w-4 h-4 text-yellow-400" />,
      iconBg: "bg-yellow-500/10",
    },
  ];

  return <AccessStats stats={statsData} />;
};

export default AccessCards;
