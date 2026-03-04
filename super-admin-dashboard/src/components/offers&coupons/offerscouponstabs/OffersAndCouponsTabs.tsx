import React from "react";
import AllOffers from "./AllOffers";

type Tab = "all" | "active" | "expired" | "scheduled";

interface OffersAndCouponsTabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { label: string; value: Tab }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Expired", value: "expired" },
  { label: "Scheduled", value: "scheduled" },
];

const OffersAndCouponsTabs: React.FC<OffersAndCouponsTabsProps> = ({
  activeTab,
  onChange,
}) => {
  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#2B7FFF] text-white"
                  : "bg-[#1A1A1A] text-[#A1A1A1]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Single Table Component */}
      <AllOffers filter={activeTab} />
    </div>
  );
};

export default OffersAndCouponsTabs;