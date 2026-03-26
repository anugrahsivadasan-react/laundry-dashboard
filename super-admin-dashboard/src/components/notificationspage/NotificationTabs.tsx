import React from "react";
import AllNotificationTab from "./AllNotifications";
import SystemAlertsTab from "./SystemAlertsTab";
import AdminAlertsTab from "./AdminAlertsTab";
import PromotionalTab from "./PromotionalTab";

type Tab = "all" | "system" | "admin" | "promotional";

interface NotificationTabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { label: string; value: Tab }[] = [
  { label: "All Notifications (19)", value: "all" },
  { label: "System Alerts (6)", value: "system" },
  { label: "Admin Alerts (7)", value: "admin" },
  { label: "Promotional (6)", value: "promotional" },
];

const renderContent = (tab: Tab) => {
    switch (tab) {
        case "all":
            return <AllNotificationTab />;
        case "system":
            return <SystemAlertsTab/>;
        case "admin":
            return <AdminAlertsTab/>;
        case "promotional":
            return <PromotionalTab/>;
        default:
            return null;
    }
};



const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onChange,
}) => {
  return (
    <div className="mb-6">
      {/* TAB CONTAINER */}
      <div className="flex gap-4 p-2 bg-[#111111] border border-[#262626] rounded-full w-fit">

        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={`
                px-5 py-2 text-sm font-medium rounded-full transition
                ${
                  isActive
                    ? "bg-white text-black"
                    : "text-[#A1A1A1] hover:text-white"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}

      </div>

<div className="mt-5">{renderContent(activeTab)}</div>

    </div>
  );
};

export default NotificationTabs;