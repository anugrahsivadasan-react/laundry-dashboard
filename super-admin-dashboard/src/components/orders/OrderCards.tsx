import { Package, Clock4, CircleCheckBig, Truck } from "lucide-react";
import OrderStats from "./OrderStats";

const OrderCards = () => {
  const statsData = [
    {
      title: "Total Orders",
      value: 1247,
      icon: <Package className="w-4 h-4 text-blue-500" />,
      iconBg: "bg-[#2B7FFF1A]",
    },
    {
      title: "Pending",
      value: 145,
      icon: <Clock4 className="w-4 h-4 text-yellow-500" />,
      iconBg: "bg-yellow-500/10",
    },
    {
      title: "Completed",
      value: 542,
      icon: <CircleCheckBig className="w-4 h-4 text-green-400" />,
      iconBg: "bg-green-500/10",
    },
    {
      title: "In Transit",
      value: 87,
      icon: <Truck className="w-4 h-4 text-violet-600" />,
      iconBg: "bg-[#AD46FF1A]",
    },
  ];

  return <OrderStats stats={statsData} />;
};

export default OrderCards;
