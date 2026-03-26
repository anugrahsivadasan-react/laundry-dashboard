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

type ChartData = {
  month: string;
  orders: number;
  customers: number;
};

const data: ChartData[] = [
  { month: "Jul", orders: 450, customers: 220 },
  { month: "Aug", orders: 480, customers: 240 },
  { month: "Sep", orders: 510, customers: 260 },
  { month: "Oct", orders: 540, customers: 280 },
  { month: "Nov", orders: 580, customers: 300 },
  { month: "Dec", orders: 640, customers: 330 },
  { month: "Jan", orders: 610, customers: 310 },
];

const OrdersCustomersChart: React.FC = () => {
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
        Orders & Customers Trend
      </h2>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} barGap={10}>
          <CartesianGrid
            stroke="#2a2a2a"
            strokeDasharray="3 3"
          />

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
              fontSize: "12px",
              color: "#fff",
            }}
          />

          {/* Orders */}
          <Bar
            dataKey="orders"
            fill="#3B82F6"
            radius={[6, 6, 0, 0]}
          />

          {/* Customers */}
          <Bar
            dataKey="customers"
            fill="#8B5CF6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersCustomersChart;