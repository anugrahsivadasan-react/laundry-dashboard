import React from "react";

export interface StatsCardProps {
  title: string;
  value: string;
  changeText?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: string; // local image path
  iconBgColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  changeText,
  changeType = "neutral",
  icon,
  iconBgColor = "#1F1F1F",
}) => {
  const changeColor =
    changeType === "positive"
      ? "text-emerald-500"
      : changeType === "negative"
      ? "text-red-500"
      : "text-gray-400";

  return (
    <div
      className="
        w-[329px]
        h-[134px]
        bg-[#171717]
        border
        border-[#262626]
        rounded-[14px]
        p-6
        flex
        justify-between
        transition-all
        duration-200
        hover:border-[#303030]
      "
    >
      {/* LEFT CONTENT */}
      <div className="flex flex-col justify-between">
        <p className="text-sm text-gray-400">
          {title}
        </p>

        <div>
          <h3 className="text-[24px] font-semibold text-white tracking-tight">
            {value}
          </h3>

          {changeText && (
            <p className={`text-xs mt-1 ${changeColor}`}>
              {changeText}
            </p>
          )}
        </div>
      </div>

      {/* ICON BOX */}
      <div
        className="w-[47.99px] h-[47.99px] rounded-lg flex items-center justify-center"
        style={{ backgroundColor: iconBgColor }}
      >
        <img
          src={icon}
          alt={title}
          className="w-5 h-5 object-contain"
        />
      </div>
    </div>
  );
};

export default StatsCard;
