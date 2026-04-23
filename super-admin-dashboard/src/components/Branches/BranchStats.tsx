import React from "react"

type StatCard = {
  title: string
  value: number
  icon: React.ReactNode
  iconBg: string // should be hex like #2B7FFF1A
}

type StatsCardsProps = {
  stats: StatCard[]
}

const BranchStats: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        //  Convert light bg color → stronger glow color
        const glowColor = stat?.iconBg.replace("1A", "66") // stronger opacity

        return (
          <div
            key={index}
            className="
              group
              bg-[#0f0f10]
              border border-gray-800
              rounded-xl
              px-5 py-4
              flex items-center justify-between
              transition-all duration-300
              hover:scale-[1.02]
            "
            style={{ boxShadow: "0 0 0px transparent" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 10px ${glowColor}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0px transparent"
            }}
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: stat.iconBg }}
              >
                {stat.icon}
              </div>

              <div>
                <p className="text-xs text-gray-400">{stat.title}</p>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BranchStats
