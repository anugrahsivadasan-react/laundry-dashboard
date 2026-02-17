import React from "react";

type Tab = "Roles" | "Permission" | "Assign" | "Log";

interface StaffTabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { label: string; value: Tab }[] = [
  { label: "Roles Overview", value: "Roles" },
  { label: "Permission Matrix", value: "Permission" },
  { label: "User Assignments", value: "Assign" },
  { label: "Activity Log", value: "Log" },
];

const AccessTabs: React.FC<StaffTabsProps> = ({ activeTab, onChange }) => {
  return (
    <div className="flex gap-6 mt-8 mb-10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              w-[364.34px] h-[35.99px]
              rounded-[14px]
              border-[1.25px]
              text-sm font-semibold
              transition
              ${
                isActive
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 bg-gray-800 text-gray-200 hover:bg-gray-700"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default AccessTabs;
