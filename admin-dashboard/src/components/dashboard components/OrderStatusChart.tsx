import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

/* ================= TYPES ================= */

export interface OrderStatusData {
  name: string;
  value: number;
  color: string;
}

/* ================= SAMPLE DATA ================= */
/* 👉 Replace later with backend API */

const sampleData: OrderStatusData[] = [
  { name: "Completed", value: 145, color: "#1BAA7A" },
  { name: "In Process", value: 67, color: "#F59E0B" },
  { name: "Pending", value: 43, color: "#3B82F6" },
  { name: "Cancelled", value: 12, color: "#EF4444" },
];

/* ================= MAIN COMPONENT ================= */

interface Props {
  data?: OrderStatusData[];
}

const OrderStatusChart: React.FC<Props> = ({ data = sampleData }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm w-full max-w-[498px] ">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-[18px] font-semibold text-[#1F2937]">
          Order Status
        </h2>
        <p className="text-sm text-gray-500">
          Current order distribution
        </p>
      </div>

      {/* CHART + LEGEND WRAPPER */}
      <div className=" lg:flex-row items-center justify-between gap-6">

        {/* DONUT CHART */}
        
        <div className="w-full max-w-[320px] h-[220px]  mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                stroke="white"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND */}
        <div className="w-full  lg:w-[450px] space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">
                  {item.name}
                </span>
              </div>

              {/* VALUE */}
              <span className="text-sm font-semibold  text-gray-800">
                {item.value}
              </span>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OrderStatusChart;
