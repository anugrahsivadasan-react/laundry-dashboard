import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

type RevenueData = {
  month: string;
  revenue: number;
};

const data: RevenueData[] = [
  { month: "Jul", revenue: 42000 },
  { month: "Aug", revenue: 45000 },
  { month: "Sep", revenue: 48000 },
  { month: "Oct", revenue: 52000 },
  { month: "Nov", revenue: 55000 },
  { month: "Dec", revenue: 61000 },
  { month: "Jan", revenue: 58000 },
];

const RevenueTrendChart: React.FC = () => {
  return (
    <div
      className="w-full p-6"
      style={{
        background: "#171717",
        borderRadius: "14px",
        border: "1.25px solid #262626",
        height: "380px",
      }}
    >
      {/* Title */}
      <h2 className="text-white text-sm mb-6">
        Revenue Trend (Last 7 Months)
      </h2>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            stroke="#6b7280"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <YAxis
            stroke="#6b7280"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #2f2f2f",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <Legend
            wrapperStyle={{
              color: "#10b981",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueTrendChart;