import React from "react";

type Branch = {
  id: number;
  name: string;
  revenue: string;
  orders: number;
  avgOrder: string;
};

const branches: Branch[] = [
  {
    id: 1,
    name: "Downtown",
    revenue: "$24,500",
    orders: 234,
    avgOrder: "$104.70",
  },
  {
    id: 2,
    name: "Westside",
    revenue: "$19,800",
    orders: 198,
    avgOrder: "$100.00",
  },
  {
    id: 3,
    name: "Eastside",
    revenue: "$17,200",
    orders: 176,
    avgOrder: "$97.73",
  },
  {
    id: 4,
    name: "Northside",
    revenue: "$15,400",
    orders: 156,
    avgOrder: "$98.72",
  },
  {
    id: 5,
    name: "Southside",
    revenue: "$10,600",
    orders: 142,
    avgOrder: "$74.65",
  },
];

const BranchPerformanceTab: React.FC = () => {
  return (
    <div
      className="w-full"
      style={{
        background: "#171717",
        borderRadius: "14px",
        border: "1.25px solid #262626",
        padding: "24px",
      }}
    >
      {/* Title */}
      <h2 className="text-white text-sm mb-6">
        Branch Performance Comparison
      </h2>

      <div className="flex flex-col gap-7">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="flex items-center justify-between"
            style={{
              background:
                "linear-gradient(90deg, rgba(38,38,38,0.6), rgba(23,23,23,0.6))",
              borderRadius: "10px",
              padding: "18px 20px",
            }}
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
                
              {/* Badge */}
              <div
                className="w-7 h-7 flex  items-center justify-center text-xs font-semibold text-white"
                style={{
                  borderRadius: "6px",
                  background:
                    "linear-gradient(135deg, #6366F1, #8B5CF6)",
                }}
              >
                {branch.id}
              </div>

              {/* Branch name */}
              <span className="text-white text-sm">
                {branch.name}
              </span>
            </div>

            {/* Revenue */}
            <div className="flex flex-col text-left">
              <span className="text-xs text-gray-400">
                Revenue
              </span>
              <span className="text-white text-sm font-medium">
                {branch.revenue}
              </span>
            </div>

            {/* Orders */}
            <div className="flex flex-col text-left">
              <span className="text-xs text-gray-400">
                Orders
              </span>
              <span className="text-white text-sm font-medium">
                {branch.orders}
              </span>
            </div>

            {/* Avg Order */}
            <div className="flex flex-col text-left">
              <span className="text-xs text-gray-400">
                Avg Order
              </span>
              <span className="text-white text-sm font-medium">
                {branch.avgOrder}
              </span>
            </div>

            {/* Button */}
            <button
              className="text-xs px-3 py-1"
              style={{
                background: "#E5E5E5",
                borderRadius: "6px",
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchPerformanceTab;