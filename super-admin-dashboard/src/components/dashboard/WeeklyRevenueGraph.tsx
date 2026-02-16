import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ================= TYPES ================= */

export interface RevenueData {
  day: string;
  revenue: number;
}

/* ================= SAMPLE DATA ================= */

const sampleData: RevenueData[] = [
  { day: "Mon", revenue: 4200 },
  { day: "Tue", revenue: 5100 },
  { day: "Wed", revenue: 4800 },
  { day: "Thu", revenue: 6200 },
  { day: "Fri", revenue: 7400 },
  { day: "Sat", revenue: 9100 },
  { day: "Sun", revenue: 6700 },
];

/* ================= TOOLTIP ================= */

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111111] border border-[#262626] px-4 py-2 rounded-lg shadow-lg">
        <p className="text-sm text-gray-400">
          {payload[0].payload.day}
        </p>
        <p className="text-sm font-semibold text-[#2B7FFF]">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

/* ================= MAIN COMPONENT ================= */

interface Props {
  data?: RevenueData[];
}

const RevenueGraph: React.FC<Props> = ({ data = sampleData }) => {
  return (
    <div className="bg-[#111111] rounded-2xl border border-[#262626] p-6 w-full">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-[16px] font-medium">
          Weekly Revenue
        </h2>

        <button className="text-gray-400 text-sm hover:text-white transition flex items-center gap-1">
          View Details
          <span className="text-xs">↗</span>
        </button>
      </div>

      {/* CHART */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            {/* GRID */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1F1F1F"
              vertical={false}
            />

            {/* X AXIS */}
            <XAxis
              dataKey="day"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y AXIS */}
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            {/* TOOLTIP */}
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#2B7FFF", strokeWidth: 1 }} />

            {/* REVENUE LINE */}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2B7FFF"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2B7FFF" }}
              activeDot={{ r: 6 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueGraph;
