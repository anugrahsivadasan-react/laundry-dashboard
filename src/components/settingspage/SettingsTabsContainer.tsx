import React, { useState } from "react";

import GeneralTab from "./settingstabs/GeneralTab";
import PricingTab from "./settingstabs/PricingTab";
import ScheduleTab from "./settingstabs/ScheduleTab";
import NotificationsTab from "./settingstabs/NotificationsTab";
import SecurityTab from "./settingstabs/SecurityTab";

const tabs = [
  { key: "general", label: "General" },  
  { key: "pricing", label: "Pricing" },
  { key: "schedule", label: "Schedule" },
  { key: "notifications", label: "Notifications" },
  { key: "security", label: "Security" },
];

const SettingsTabsContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderTab = () => {
    switch (activeTab) {
      case "pricing":
        return <PricingTab />;
      case "schedule":
        return <ScheduleTab />;
      case "notifications":
        return <NotificationsTab />;
      case "security":
        return <SecurityTab />;
      default:
        return <GeneralTab />;
    }
  };

  return (
    <div className="w-full">
      {/* ---------- Tabs Header ---------- */}
      <div className="flex flex-wrap gap-2 bg-white border rounded-xl p-2 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                activeTab === tab.key
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ---------- Content ---------- */}
      <div className="mt-8">{renderTab()}</div>
    </div>
  );
};

export default SettingsTabsContainer;
