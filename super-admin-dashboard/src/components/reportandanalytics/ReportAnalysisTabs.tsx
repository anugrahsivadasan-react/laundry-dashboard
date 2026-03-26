import React from "react";
import OverviewTab from "../reportandanalytics/OverviewTab";
import  BranchPerformanceTab  from "../reportandanalytics/BranchPerformanceTab";
import AdminPerformanceTab from "../reportandanalytics/AdminPerformanceTab";
import TrendsTab from "../reportandanalytics/TrendsTab";

type Tab = "overview" | "branch" | "admin" | "trends";

interface ReportAnalysisTabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { label: string; value: Tab }[] = [
  { label: "Overview", value: "overview" },
  { label: "Branch Performance", value: "branch" },
  { label: "Admin Performance", value: "admin" },
  { label: "Trends", value: "trends" },
];

const renderContent = (tab: Tab) => {
  switch (tab) {
    case "overview":
      return <OverviewTab />;
    case "branch":
      return <BranchPerformanceTab/>;
    case "admin":
      return <AdminPerformanceTab />;
    case "trends":
      return <TrendsTab />;
    default:
      return null;
  }
};

const ReportAnalysisTabs: React.FC<ReportAnalysisTabsProps> = ({
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

      {/* TAB CONTENT */}
      <div className="mt-6">{renderContent(activeTab)}</div>

    </div>
  );
};

export default ReportAnalysisTabs;