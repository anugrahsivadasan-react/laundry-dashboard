import React from "react";
import AllOffers from "./AllOffers";

/* TYPES */
export type Tab = "all" | "active" | "expired" | "scheduled";

type Offer = {
  offerName: string;
  coupon: string;
  discount: string;
  minOrder: string;
  usageLimit: string;
  status?: "active" | "expired" | "scheduled";
};

interface OffersAndCouponsTabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
  offers?: Offer[]; // ✅ optional for safety
}

/* TAB CONFIG */
const tabs: { label: string; value: Tab }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Expired", value: "expired" },
  { label: "Scheduled", value: "scheduled" },
];

const OffersAndCouponsTabs: React.FC<OffersAndCouponsTabsProps> = ({
  activeTab,
  onChange,
  offers = [], // ✅ default empty array (prevents crash)
}) => {
  return (
    <div>
      {/* TABS */}
      <div className="flex flex-wrap gap-3 mb-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#2B7FFF] text-white shadow-md"
                  : "bg-[#1A1A1A] text-[#A1A1A1] hover:bg-[#262626]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TABLE / LIST */}
      <AllOffers filter={activeTab} offers={offers} />
    </div>
  );
};

export default OffersAndCouponsTabs;