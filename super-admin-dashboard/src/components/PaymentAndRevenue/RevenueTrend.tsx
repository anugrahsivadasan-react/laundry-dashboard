import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Download } from "lucide-react";

export interface RevenueTrend {
  date: string;
  revenue: number;
}

type Props = {
  data?: RevenueTrend[];
};

const defaultData: RevenueTrend[] = [
  { date: "Jan", revenue: 4200 },
  { date: "Feb", revenue: 5200 },
  { date: "Mar", revenue: 6100 },
  { date: "Apr", revenue: 5800 },
  { date: "May", revenue: 7200 },
  { date: "Jun", revenue: 8100 },
];

const RevenueTrendChart = ({ data = defaultData }: Props) => {
  return (
    <div
      className="w-full bg-[#171717] border rounded-[14px] p-6"
      style={{
        borderColor: "#262626",
        borderWidth: "1.25px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-sm font-semibold">Revenue Trend</h2>

        <button
          className="
          flex items-center gap-2
          px-3 h-8
          text-xs
          rounded-lg
          border border-[#262626]
          bg-[#111111]
          text-gray-300
          hover:bg-[#1A1A1A]
          transition
          "
        >
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Chart */}
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid stroke="#262626" vertical={false} />

            <XAxis
              dataKey="date"
              stroke="#737373"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#111111",
                border: "1px solid #262626",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2B7FFF"
              fill="#2B7FFF"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueTrendChart;