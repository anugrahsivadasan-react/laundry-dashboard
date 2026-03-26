import { useEffect, useState } from "react"
import ServiceStatsCard from "../../components/services&prices/ServiceStatsCard"
import activeIcon from "../../assets/servieicons/activeicon.svg"
import serviceIcon from "../../assets/servieicons/clothicon.svg"
import expressIcon from "../../assets/servieicons/expressicon.svg"
import avgIcon from "../../assets/servieicons/avgicon.svg"
import ServicePriceTabs from "../../components/services&prices/serivepricetabs/ServicePriceTabs"
import { apiAxios } from "../../config/axios"

type Tab = "Services" | "Pricing" | "Express"

type ServiceStats = {
  totalServices: number
  activeServices: number
  inactiveServices: number
  clothCategories: number
  expressAvailable: number
  avgOrderValue: number
}

const ServiceAndPrices = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Services")
  const [stats, setStats] = useState<ServiceStats | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadService = async () => {
      try {
        const res = await apiAxios.get<{ stats: ServiceStats }>(
          "/super_admin/service/stats",
        )
        setStats(res.data.stats)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadService()
  }, [])

  const statsData = [
    {
      title: "Active Services",
      value: stats?.activeServices ?? 0,
      icon: <img src={activeIcon} alt="active" className="w-5 h-5" />,
      iconBg: "bg-[#2B7FFF1A]",
    },
    {
      title: "Cloth Categories",
      value: stats?.clothCategories ?? 0,
      icon: <img src={serviceIcon} alt="service" className="w-5 h-5" />,
      iconBg: "bg-[#AD46FF1A]",
    },
    {
      title: "Express Available",
      value: stats?.expressAvailable ?? 0,
      icon: <img src={expressIcon} alt="express" className="w-5 h-5" />,
      iconBg: "bg-[#FE9A001A]",
    },
    {
      title: "Avg. Order Value",
      value: stats?.avgOrderValue ?? 0,
      icon: <img src={avgIcon} alt="average" className="w-5 h-5" />,
      iconBg: "bg-[#00C9501A]",
    },
  ]
  return (
    <div className="p-6 bg-[#0A0A0A] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Services & Pricing
          </h1>
          <p className="text-[14px] font-arimo text-[#A1A1A1]">
            Manage global pricing and service configurations
          </p>
        </div>
      </div>
      {/* Stats Cards */}
      <ServiceStatsCard stats={statsData} />
      {/* Tabs Section */}
      <section className="mt-8">
        <ServicePriceTabs activeTab={activeTab} onChange={setActiveTab} />
      </section>
      exist
    </div>
  )
}

export default ServiceAndPrices
