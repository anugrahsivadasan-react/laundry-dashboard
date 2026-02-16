import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

/* ================= TYPES ================= */

export interface RevenueData {
  day: string;
  revenue: number;
  orders: number;
}

/* ================= SAMPLE DATA ================= */

const sampleData: RevenueData[] = [
  { day: "Mon", revenue: 2400, orders: 24 },
  { day: "Tue", revenue: 1400, orders: 18 },
  { day: "Wed", revenue: 9800, orders: 45 },
  { day: "Thu", revenue: 3900, orders: 32 },
  { day: "Fri", revenue: 4800, orders: 38 },
  { day: "Sat", revenue: 8200, orders: 52 },
  { day: "Sun", revenue: 6300, orders: 41 },
];

/* ================= FORMATTERS ================= */

const revenueFormatter = (value: number) => {
  return `$${(value / 1000).toFixed(1)}k`;
};

/* ================= TOOLTIP ================= */

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-3">
        <p className="text-sm font-semibold text-gray-700">
          {payload[0].payload.day}
        </p>

        <p className="text-sm text-[#3B82F6]">
          Revenue: {revenueFormatter(payload[0].value)}
        </p>

        <p className="text-sm text-[#9333EA]">
          Orders: {payload[1].value}
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
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm w-full max-w-[1018px]">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[18px] font-bold text-[#101828] leading-[28px]">
            Revenue Overview
          </h2>
          <p className="text-[14px] leading-[20px] font-normal text-[#6A7282] ">
            Weekly revenue and order trends
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="w-full h-[320px] lg:h-[340px] xl:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

              {/* REVENUE LINE */}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2B7FFF"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
              name="Revenue"
              label={{
                position: "top",
                formatter: revenueFormatter,
                fill: "#3B82F6",
                fontSize: 12,
              }}
            />

            {/* ORDERS LINE */}
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#AD46FF"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
              name="Orders"
              label={{
                position: "top",
                fill: "#9333EA",
                fontSize: 12,
              }}
            />
            
            {/* GRID */}
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={true}
              stroke="#E5E7EB"
            />

            {/* X AXIS */}
            <XAxis
              dataKey="day"
              tick={{ fill: "#9CA3AF", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y AXIS */}
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}`}
            />

            {/* TOOLTIP */}
            <Tooltip content={<CustomTooltip />} />

            {/* LEGEND */}
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: "14px" }}
            />

          
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueGraph;
