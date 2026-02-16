import React from "react";

type OrderStatus = "Ready" | "Processing" | "Delivered" | "Pending";

interface Order {
  id: string;
  customer: string;
  items: string;
  service: string;
  pickupTime: string;
  status: OrderStatus;
  amount: string;
}

interface Props {
  orders?: Order[];
}

const statusStyles: Record<OrderStatus, string> = {
  Ready: "bg-green-100 text-green-700",
  Processing: "bg-orange-100 text-orange-700",
  Delivered: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const RecentOrdersTable: React.FC<Props> = ({ orders }) => {
  // Dummy data (replace with backend later)
  const defaultOrders: Order[] = [
    {
      id: "#ORD-1234",
      customer: "John Doe",
      items: "5 items",
      service: "Wash & Iron",
      pickupTime: "Today, 3:00 PM",
      status: "Ready",
      amount: "$45.00",
    },
    {
      id: "#ORD-1235",
      customer: "Jane Smith",
      items: "8 items",
      service: "Dry Clean",
      pickupTime: "Today, 4:30 PM",
      status: "Processing",
      amount: "$89.00",
    },
    {
      id: "#ORD-1236",
      customer: "Mike Johnson",
      items: "3 items",
      service: "Express Wash",
      pickupTime: "Today, 2:00 PM",
      status: "Delivered",
      amount: "$32.00",
    },
    {
      id: "#ORD-1237",
      customer: "Sarah Williams",
      items: "12 items",
      service: "Wash & Fold",
      pickupTime: "Tomorrow, 10:00 AM",
      status: "Pending",
      amount: "$67.00",
    },
    {
      id: "#ORD-1238",
      customer: "David Brown",
      items: "6 items",
      service: "Iron Only",
      pickupTime: "Today, 5:00 PM",
      status: "Ready",
      amount: "$28.00",
    },
  ];

  const orderList = orders || defaultOrders;

  return (
    <div className="w-full max-w-[1570px] bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[18px] leading-[28px] font-bold text-[#101828]">
            Recent Orders
          </h2>
          <p className="text-[14px] text-[#6A7282]">
            Latest order activities
          </p>
        </div>

        <button className="text-[14px] px-4 py-2 border border-[#0A0A0A] leading-[20px] rounded-lg hover:bg-gray-100 transition">
          View All
        </button>
      </div>

      {/* Table Wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="text-left text-[14px] font-bold text-[#002F96] border-b">
              <th className="py-3 ">Order ID</th>
              <th className="py-3 ">Customer</th>
              <th className="py-3 ">Items</th>
              <th className="py-3 ">Service</th>
              <th className="py-3 ">Pickup Time</th>
              <th className="py-3 ">Status</th>
              <th className="py-3 ">Amount</th>
              <th className="py-3 ">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orderList.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-4 text-[#155DFC] font-normal text-[14px] leading-[20px] cursor-pointer">
                  {order.id}
                </td>

                <td className="py-4 text-[#101828] font-normal text-[14px] leading-[20px]">{order.customer}</td>

                <td className="py-4 text-[#4A5565] font-normal text-[14px] leading-[20px]">{order.items}</td>

                <td className="py-4 text-[#4A5565] font-normal text-[14px] leading-[20px]">{order.service}</td>

                <td className="py-4 text-[#4A5565] font-normal text-[14px] leading-[20px]">{order.pickupTime}</td>

                {/* Status Badge */}
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="py-4 font-bold text-[#101828] text-[14px] leading-[20px]">
                  {order.amount}
                </td>

                {/* Action */}
                <td className="py-4">
                  <button className="text-[#002F96] border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
