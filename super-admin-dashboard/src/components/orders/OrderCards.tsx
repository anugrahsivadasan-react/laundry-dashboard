import { Package, Clock4, CircleCheckBig, Truck } from "lucide-react"
import OrderStats from "./OrderStats"
import { useAppSelector } from "../../redux/hooks"

const OrderCards = () => {
  const { stats } = useAppSelector((s) => s.order)

  const statsData = [
    {
      title: "Total Orders",
      value: stats?.total ?? 0,
      icon: <Package className="w-4 h-4 text-blue-500" />,
      iconBg: "bg-[#2B7FFF1A]",
    },
    {
      title: "Pending",
      value: stats?.pending ?? 0,
      icon: <Clock4 className="w-4 h-4 text-yellow-500" />,
      iconBg: "bg-yellow-500/10",
    },
    {
      title: "Completed",
      value: stats?.completed ?? 0,
      icon: <CircleCheckBig className="w-4 h-4 text-green-400" />,
      iconBg: "bg-green-500/10",
    },
    {
      title: "In Transit",
      value: stats?.inTransition ?? 0,
      icon: <Truck className="w-4 h-4 text-violet-600" />,
      iconBg: "bg-[#AD46FF1A]",
    },
  ]

  return <OrderStats stats={statsData} />
}

export default OrderCards
