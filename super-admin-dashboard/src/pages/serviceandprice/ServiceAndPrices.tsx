import { useState } from "react";
import ServiceStatsCard from "../../components/services&prices/ServiceStatsCard";
import activeIcon from "../../assets/servieicons/activeicon.svg";
import serviceIcon from "../../assets/servieicons/clothicon.svg";
import expressIcon from "../../assets/servieicons/expressicon.svg";
import avgIcon from "../../assets/servieicons/avgicon.svg";
import ServicePriceTabs from "../../components/services&prices/serivepricetabs/ServicePriceTabs";

type Tab = "Services" | "Pricing" | "Express";

const statsData = [
  {
    title: "Active Services",
    value: 120,
    icon: <img src={activeIcon} alt="active" className="w-5 h-5" />,
    iconBg: "bg-[#2B7FFF1A]",
  },
  {
    title: "Cloth Categories",
    value: 45,
    icon: <img src={serviceIcon} alt="service" className="w-5 h-5" />,
    iconBg: "bg-[#AD46FF1A]",
  },
  {
    title: "Express Available",
    value: 12500,
    icon: <img src={expressIcon} alt="express" className="w-5 h-5" />,
    iconBg: "bg-[#FE9A001A]",
  },
  {
    title: "Avg. Order Value",
    value: 89,
    icon: <img src={avgIcon} alt="average" className="w-5 h-5" />,
    iconBg: "bg-[#00C9501A]",
  },
];

const ServiceAndPrices = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Services");

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

        <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90">
          + Add Service
        </button>
      </div>

      {/* Stats Cards */}
      <ServiceStatsCard stats={statsData} />

      {/* Tabs Section */}
      <section className="mt-8">
        <ServicePriceTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </section>

    </div>
  );
};

export default ServiceAndPrices;