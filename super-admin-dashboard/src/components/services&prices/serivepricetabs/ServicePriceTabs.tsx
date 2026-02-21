import React from "react";
import ServicesTab from "./ServiceTabs";
import ClothCategoryTab from "./ClothCategoryTab";
import ExpressSettingTab from "./ExpressSettingsTab";

type Tab = "Services" | "Pricing" | "Express";

interface ServicePriceTabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { label: string; value: Tab }[] = [
  { label: "Services", value: "Services" },
  { label: "Cloth Categories", value: "Pricing" },
  { label: "Express Settings", value: "Express" },
];

const renderContent = (tab: Tab) => {
  switch (tab) {
    case "Services":
      return <ServicesTab />;
    case "Pricing":
      return <ClothCategoryTab />;
    case "Express":
      return <ExpressSettingTab/>;
    default:
      return null;
  }
};

const ServicePriceTabs: React.FC<ServicePriceTabsProps> = ({
  activeTab,
  onChange,
}) => {
  return (
    <div>
      
      {/* TAB BUTTONS */}
      <div className="flex gap-6 mb-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={`
                px-6 h-9 rounded-[14px] border text-sm font-semibold transition
                ${
                  isActive
                    ? "border-[#262626] bg-[#6F6F6F] text-black"
                    : "border-gray-600 bg-[#262626] text-gray-200 hover:bg-gray-700"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      <div>{renderContent(activeTab)}</div>

    </div>
  );
};

export default ServicePriceTabs;