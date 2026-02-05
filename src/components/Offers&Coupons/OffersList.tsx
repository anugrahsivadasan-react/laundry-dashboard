import React from "react";

const OffersList = () => {
  const offers = [
    {
      code: "FIRST10",
      title: "First Order Discount",
      desc: "10% off on first order",
      status: "Active",
      type: "Percentage",
      value: "10%",
      min: "$50",
      max: "$20",
      usage: "125/500",
      period: "Jan 1, 2026 - Dec 31, 2026",
    },
    {
      code: "BULK15",
      title: "Bulk Order Discount",
      desc: "15% off on orders above $100",
      status: "Active",
      type: "Percentage",
      value: "15%",
      min: "$100",
      max: "$50",
      usage: "89/200",
      period: "Jan 1, 2026 - Jun 30, 2026",
    },
    {
      code: "FLAT50",
      title: "Flat Discount",
      desc: "$50 off on orders above $200",
      status: "Active",
      type: "Fixed",
      value: "$50",
      min: "$200",
      max: "$50",
      usage: "45/100",
      period: "Feb 1, 2026 - Feb 28, 2026",
    },
    {
      code: "SUMMER20",
      title: "Summer Special",
      desc: "20% off on all services",
      status: "Scheduled",
      type: "Percentage",
      value: "20%",
      min: "$75",
      max: "$100",
      usage: "234/1000",
      period: "May 1, 2026 - Jul 31, 2026",
    },
    {
      code: "FRIEND25",
      title: "Refer a Friend",
      desc: "25% off for referrals",
      status: "Active",
      type: "Percentage",
      value: "25%",
      min: "$30",
      max: "$30",
      usage: "156/500",
      period: "Jan 1, 2026 - Dec 31, 2026",
    },
  ];

  return (
    <div className="space-y-4">
      {offers.map((item, i) => (
        <div
          key={i}
          className="bg-white border rounded-[14px] px-6 py-4 flex justify-between items-start"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                {item.code}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  item.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {item.status}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-600">
                {item.type}
              </span>
            </div>

            <h3 className="font-semibold mt-2">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>

            <div className="grid grid-cols-5 gap-6 mt-4 text-sm">
              <div>
                <p className="text-gray-400">Discount Value</p>
                <p className="font-medium text-green-600">{item.value}</p>
              </div>
              <div>
                <p className="text-gray-400">Min Order</p>
                <p className="font-medium">{item.min}</p>
              </div>
              <div>
                <p className="text-gray-400">Max Discount</p>
                <p className="font-medium">{item.max}</p>
              </div>
              <div>
                <p className="text-gray-400">Usage</p>
                <p className="font-medium text-blue-600">{item.usage}</p>
              </div>
              <div>
                <p className="text-gray-400">Valid Period</p>
                <p className="font-medium">{item.period}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="border px-3 py-1 rounded text-sm hover:bg-gray-50">
              Edit
            </button>
            <button className="border px-3 py-1 rounded text-sm text-red-500 hover:bg-red-50">
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Quick Create */}
      <div className="bg-white border rounded-[14px] p-6">
        <h3 className="font-semibold mb-4">Quick Create Coupon</h3>

        <div className="grid grid-cols-4 gap-4">
          <input
            className="border rounded px-3 py-2 text-sm"
            placeholder="Coupon Code"
          />
          <input
            className="border rounded px-3 py-2 text-sm"
            placeholder="Discount Type"
          />
          <input
            className="border rounded px-3 py-2 text-sm"
            placeholder="Discount Value"
          />

          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded px-4 py-2">
            Create Coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffersList;
