import React from "react";

interface ReportStatCardProps {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  icon: React.ReactNode;
  borderColor: string;
  changeType?: "up" | "down";
}

const ReportStatCard: React.FC<ReportStatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  icon,
  borderColor,
  changeType = "up",
}) => {
  return (
    <div
      className={`bg-white rounded-[14px] h-[258px] w-full max-w-[409px] p-6 border border-l-[3.75px] ${borderColor}`}
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>

        <span
          className={`text-sm font-medium ${
            changeType === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>

      <div className="mt-10">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-semibold mt-2">{value}</h2>
      </div>

      <p className="text-xs text-gray-400 mt-10">{subtitle}</p>
    </div>
  );
};

export default ReportStatCard;
