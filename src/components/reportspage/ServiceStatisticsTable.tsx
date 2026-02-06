import React from "react";

const serviceStats = [
  {
    type: "Wash & Iron",
    orders: 145,
    revenue: "$7,250",
    avgOrder: "$50.00",
    percent: "30.5%",
  },
  {
    type: "Dry Clean",
    orders: 98,
    revenue: "$8,820",
    avgOrder: "$90.00",
    percent: "20.6%",
  },
  {
    type: "Express Wash",
    orders: 67,
    revenue: "$3,350",
    avgOrder: "$50.00",
    percent: "14.1%",
  },
  {
    type: "Iron Only",
    orders: 54,
    revenue: "$1,620",
    avgOrder: "$30.00",
    percent: "11.3%",
  },
  {
    type: "Wash & Fold",
    orders: 112,
    revenue: "$5,600",
    avgOrder: "$50.00",
    percent: "23.5%",
  },
];

const ServiceStatisticsTable: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-[14px] opacity-100 max-w-[1708px] w-full h-[462px] px-6 py-6">
      {/* Header */}
      <h3 className="font-semibold text-gray-900 text-xl">Service Statistics</h3>
      <p className="text-sm text-gray-500 mb-6">Detailed breakdown of services</p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-600 text-sm border-b  border-gray-200">
              <th className="py-3 px-4">Service Type</th>
              <th className="py-3 px-4">Total Orders</th>
              <th className="py-3 px-4">Total Revenue</th>
              <th className="py-3 px-4">Avg. Order Value</th>
              <th className="py-3 px-4">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {serviceStats.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 text-gray-900 text-left">
                <td className="py-4 px-4 font-medium">{row.type}</td>
                <td className="py-4 px-4">{row.orders}</td>
                <td className="py-4 px-4 text-green-600 font-arimo">{row.revenue}</td>
                <td className="py-4 px-4">{row.avgOrder}</td>
                <td className="py-4 px-4">{row.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceStatisticsTable;