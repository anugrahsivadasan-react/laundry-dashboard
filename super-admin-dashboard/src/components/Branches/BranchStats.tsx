import React from "react";
import { Building2, Power, PowerOff, Users } from "lucide-react";

type StatCard = {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
};

type StatsCardsProps = {
  stats: StatCard[];
};

const BranchStats: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#0f0f10] border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between"
        >
          {/* Left Content */}
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-lg ${stat.iconBg}`}
            >
              {stat.icon}
            </div>

            <div>
              <p className="text-xs text-gray-400">{stat.title}</p>
              <p className="text-lg font-semibold text-white">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchStats;
