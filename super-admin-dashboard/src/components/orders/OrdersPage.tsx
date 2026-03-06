import React, { useState } from "react";
import { Search, Eye } from "lucide-react";

/* ================= TYPES ================= */

type OrderStatus = "Processing" | "Ready" | "Delivered" | "Pending";

interface Order {
  id: string;
  customer: string;
  branch: string;
  items: number;
  amount: string;
  status: OrderStatus;
  admin: string;
  datetime: string;
}

/* ================= DUMMY DATA (BACKEND READY) ================= */

const ordersData: Order[] = [
  {
    id: "ORD-2026-001",
    customer: "John Doe",
    branch: "Downtown",
    items: 12,
    amount: "$48.50",
    status: "Processing",
    admin: "Sarah J.",
    datetime: "2026-01-21 10:30 AM",
  },
  {
    id: "ORD-2026-002",
    customer: "Jane Smith",
    branch: "Westside",
    items: 8,
    amount: "$35.00",
    status: "Ready",
    admin: "Mike C.",
    datetime: "2026-01-21 09:15 AM",
  },
  {
    id: "ORD-2026-003",
    customer: "Bob Johnson",
    branch: "Downtown",
    items: 15,
    amount: "$67.50",
    status: "Delivered",
    admin: "Sarah J.",
    datetime: "2026-01-20 02:45 PM",
  },
  {
    id: "ORD-2026-004",
    customer: "Alice Brown",
    branch: "Eastside",
    items: 6,
    amount: "$28.00",
    status: "Pending",
    admin: "Emily D.",
    datetime: "2026-01-21 11:20 AM",
  },
];

/* ================= STATUS BADGE ================= */

const statusStyles: Record<OrderStatus, string> = {
  Processing: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Ready: "bg-green-500/10 text-green-400 border border-green-500/20",
  Delivered: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

/* ================= COMPONENT ================= */

const OrdersPage: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredOrders = ordersData.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-6 bg-[#0A0A0A] min-h-screen">
      {/* FILTER BAR */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between mb-4 bg-[#0F0F10] p-2">
        {/* SEARCH */}
        <div className="relative w-full lg:max-w-[1200px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-sm rounded-md bg-[#111214] border border-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none"
          />
        </div>

        {/* DROPDOWNS */}
        <div className="flex gap-2">
          <select className="h-9 px-3 text-sm rounded-md bg-[#111214] border border-gray-800 text-gray-300 focus:outline-none">
            <option>All Branches</option>
          </select>


          <select className="h-9 px-3 text-sm rounded-md bg-[#111214] border border-gray-800 text-gray-300 focus:outline-none">
            <option>All Status</option>
          </select>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-[#0F0F10] border border-gray-800 rounded-xl p-4">
        <h2 className="text-sm text-white font-semibold mb-4">All Orders</h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-xs text-gray-400">
            <thead className="border-b border-gray-800 text-gray-500">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Order ID</th>
                <th className="text-left px-4 py-2 font-medium">Customer</th>
                <th className="text-left px-4 py-2 font-medium">Branch</th>
                <th className="text-left px-4 py-2 font-medium">Items</th>
                <th className="text-left px-4 py-2 font-medium">Amount</th>
                <th className="text-left px-4 py-2 font-medium">Status</th>
                <th className="text-left px-4 py-2 font-medium">Admin</th>
                <th className="text-left px-4 py-2 font-medium">
                  Date & Time
                </th>
                <th className="text-center px-4 py-2 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-800 last:border-none"
                >
                  <td className="px-4 py-3 text-gray-300">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.branch}</td>
                  <td className="px-4 py-3">{order.items}</td>
                  <td className="px-4 py-3">{order.amount}</td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] rounded-full ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">{order.admin}</td>
                  <td className="px-4 py-3">{order.datetime}</td>

                  {/* ACTION */}
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY STATE (backend ready) */}
          {filteredOrders.length === 0 && (
            <div className="text-center text-gray-500 py-6 text-xs">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
