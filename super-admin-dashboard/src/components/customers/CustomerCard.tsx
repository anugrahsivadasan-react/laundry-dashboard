import { CircleUser, Package, Flag, TriangleAlert } from "lucide-react";
import CustomerStats from "./CustomerStats";

const CustomerCards = () => {
  const statsData = [
    {
      title: "Total Customers",
      value: 12,
      icon: <CircleUser className="w-4 h-4 text-blue-500" />,
      iconBg: "bg-[#2B7FFF1A]",
    },
    {
      title: "Active Customers",
      value: 11,
      icon: <Package className="w-4 h-4 text-green-500" />,
      iconBg: "bg-green-500/10",
    },
    {
      title: "Vip Customers",
      value: 1,
      icon: <Flag className="w-4 h-4 text-violet-500" />,
      iconBg: "bg-violet-500/10",
    },
    {
      title: "Complaints",
      value: 28,
      icon: <TriangleAlert className="w-4 h-4 text-red-600" />,
      iconBg: "bg-red-500/10",
    },
  ];

  return <CustomerStats stats={statsData} />;
};

export default CustomerCards;
