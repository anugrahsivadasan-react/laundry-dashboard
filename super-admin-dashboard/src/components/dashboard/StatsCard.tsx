import React from "react"

const UpArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 10 L6 6 L9 9 L14 4"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 4 L14 8 M14 4 L10 4"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

const DownArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 4 L6 8 L9 5 L14 10"
      stroke="#EF4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 10 L14 6 M14 10 L10 10"
      stroke="#EF4444"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export interface StatsCardProps {
  title: string
  value: number | string | undefined
  changeText?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: string
  iconBgColor?: string
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
        : "text-gray-400"

  const ArrowIcon =
    changeType === "positive"
      ? UpArrow
      : changeType === "negative"
        ? DownArrow
        : null

  //  Convert light bg color → stronger glow color
  const glowColor = iconBgColor.replace("1A", "66") // stronger opacity

  return (
    <div
      className="
        group
        w-[329px]
        h-[120px]
        bg-[#171717]
        border border-[#262626]
        rounded-[14px]
        px-5 py-4
        flex justify-between
        transition-all duration-300
        hover:scale-[1.02]
      "
      style={{
        boxShadow: " 0 0 0px transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = ` 0 0 8px ${glowColor}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = " 0 0 0px transparent"
      }}
    >
      {/* LEFT */}
      <div className="flex flex-col justify-between h-full">
        {/* TITLE */}
        <p className="text-sm text-gray-400">{title}</p>

        {/* VALUE + CHANGE */}
        <div className="flex flex-col gap-[6px]">
          {/* VALUE */}
          <h3 className="text-[22px] font-semibold text-white leading-none">
            {value}
          </h3>

          {/* CHANGE TEXT */}
          {changeText && (
            <div className={`flex items-center gap-1 ${changeColor}`}>
              {ArrowIcon && (
                <div className="flex-shrink-0">
                  <ArrowIcon />
                </div>
              )}

              <span className="text-xs leading-tight truncate">
                {changeText}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ICON */}
      <div
        className="
          w-[46px] h-[46px]
          rounded-lg
          flex items-center justify-center
          transition-all duration-300
          group-hover:scale-110
        "
        style={{
          backgroundColor: iconBgColor,
          boxShadow: "0 0 0px transparent",
        }}
      >
        <img src={icon} alt={title} className="w-5 h-5 object-contain" />
      </div>
    </div>
  )
}

export default StatsCard
