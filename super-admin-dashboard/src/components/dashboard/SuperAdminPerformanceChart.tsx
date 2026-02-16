import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { branch: "Edappally", orders: 7200, revenue: 12000 },
  { branch: "Aluva", orders: 4200, revenue: 10000 },
  { branch: "Perumbavoor", orders: 3500, revenue: 9500 },
  { branch: "Kalamassery", orders: 2200, revenue: 8200 },
  { branch: "Palarivattam", orders: 1200, revenue: 7500 },
];

const SuperAdminPerformanceChart: React.FC = () => {
  return (
    <div
      className="
        w-[1131.02px]
        h-[450.84px]
        bg-[#171717]
        border-[1.25px]
        border-[#262626]
        rounded-[14px]
        p-6
        flex
        flex-col
      "
    >
      <h2 className="text-white text-sm font-medium mb-4">
        Branch Performance Snapshot
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} barGap={20}>
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff8c00" />
              <stop offset="100%" stopColor="#1a0f00" />
            </linearGradient>

            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5d061" />
              <stop offset="100%" stopColor="#5c4a1a" />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2a2a2a"
            vertical={false}
          />

          <XAxis
            dataKey="branch"
            stroke="#8a8a8a"
            tick={{ fill: "#8a8a8a", fontSize: 12 }}
          />

          <YAxis
            stroke="#8a8a8a"
            tick={{ fill: "#8a8a8a", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <Legend
            wrapperStyle={{
              color: "#fff",
              fontSize: "12px",
            }}
          />

          <Bar
            dataKey="orders"
            fill="url(#ordersGradient)"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="revenue"
            fill="url(#revenueGradient)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SuperAdminPerformanceChart;
