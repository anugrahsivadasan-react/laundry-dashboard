import React from "react";

const customers = [
  { name: "David Brown", orders: 45, date: "Jan 13", amount: "$2,340" },
  { name: "Mike Johnson", orders: 32, date: "Jan 13", amount: "$1,680" },
  { name: "John Doe", orders: 24, date: "Jan 13", amount: "$1,240" },
  { name: "Jane Smith", orders: 18, date: "Jan 12", amount: "$890" },
  { name: "Sarah Williams", orders: 12, date: "Jan 10", amount: "$620" },
];

const TopCustomersCard = () => {
  return (
    <div className="bg-white border rounded-[14px] w-full max-w-[420px] h-[450px] p-6">
      <div>
        <h3 className="font-semibold text-gray-900">Top Customers</h3>
        <p className="text-sm text-gray-500">By total orders</p>
      </div>

      <div className="mt-6 space-y-4">
        {customers.map((c, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center">
                {i + 1}
              </div>

              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-gray-400">
                  {c.orders} orders · {c.date}
                </p>
              </div>
            </div>

            <span className="text-sm font-semibold text-green-600">
              {c.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCustomersCard;
