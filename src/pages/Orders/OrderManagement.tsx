import React, { useEffect, useMemo, useState } from "react";
import OrderToolbar from "../../components/OrderManagement/OrderToolbar";
import editicon from '../../assets/icons/editicon.svg';

/* ---------------- TYPES ---------------- */
export interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  phone: string;
  items: string;
  serviceType: string;
  pickupTime: string;
  deliveryDate: string;
  status: string;
  paymentStatus: string;
  amount: number;
}

/* ---------------- API CONFIG ---------------- */
const API_URL = "http://localhost:5000/api/orders";

/* ---------------- MOCK DATA ---------------- */
const MOCK_ORDERS: Order[] = [
  {
    _id: "1",
    orderId: "ORD-1234",
    customerName: "John Doe",
    phone: "+1 234 567 8901",
    items: "5 items",
    serviceType: "Wash & Iron",
    pickupTime: "Jan 13, 2026 3:00 PM",
    deliveryDate: "Jan 15, 2026",
    status: "Ready",
    paymentStatus: "Paid",
    amount: 45,
  },
  {
    _id: "2",
    orderId: "ORD-1235",
    customerName: "Jane Smith",
    phone: "+1 234 567 8902",
    items: "8 items",
    serviceType: "Dry Clean",
    pickupTime: "Jan 13, 2026 4:30 PM",
    deliveryDate: "Jan 16, 2026",
    status: "Processing",
    paymentStatus: "Pending",
    amount: 89,
  },
  {
    _id: "3",
    orderId: "ORD-1236",
    customerName: "Mike Johnson",
    phone: "+1 234 567 8903",
    items: "3 items",
    serviceType: "Express Wash",
    pickupTime: "Jan 13, 2026 2:00 PM",
    deliveryDate: "Jan 14, 2026",
    status: "Delivered",
    paymentStatus: "Paid",
    amount: 32,
  },
  {
    _id: "4",
    orderId: "ORD-1237",
    customerName: "Sarah Williams",
    phone: "+1 234 567 8904",
    items: "12 items",
    serviceType: "Wash & Fold",
    pickupTime: "Jan 14, 2026 10:00 AM",
    deliveryDate: "Jan 16, 2026",
    status: "Pending",
    paymentStatus: "Pending",
    amount: 67,
  },
  {
    _id: "5",
    orderId: "ORD-1238",
    customerName: "David Brown",
    phone: "+1 234 567 8905",
    items: "6 items",
    serviceType: "Iron Only",
    pickupTime: "Jan 13, 2026 5:00 PM",
    deliveryDate: "Jan 15, 2026",
    status: "Ready",
    paymentStatus: "Paid",
    amount: 28,
  },
];

/* ---------------- COMPONENT ---------------- */
const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);

      if (!res.ok) throw new Error("API not ready");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.warn("Using mock data for now");
      setOrders(MOCK_ORDERS);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) =>
      `${o.orderId} ${o.customerName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [orders, search]);

  const badgeStyle = (value: string) => {
    switch (value) {
      case "Ready":
        return "bg-green-100 text-green-600";
      case "Processing":
        return "bg-orange-100 text-orange-600";
      case "Delivered":
        return "bg-blue-100 text-blue-600";
      case "Paid":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (


   <div className="p-6">
  {/* Header Row */}
  <div className="flex items-center justify-between mb-6">
    {/* Left */}
    <div>
      <h1 className="text-xl font-semibold text-gray-900">
        Orders Management
      </h1>
      <p className="text-sm text-gray-500">
        Manage and track all customer orders
      </p>
    </div>

    {/* Right */}
    <div className="flex items-center gap-2">
      <button className="h-10 px-4 rounded-lg border border-gray-200 text-sm hover:bg-gray-50">
        Export
      </button>

      <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] text-white text-sm hover:bg-blue-700">
        + New Order
      </button>
    </div>
  </div>


<div className="mb-5">
      <OrderToolbar/>
</div>

 {/* <div className="flex-1 max-w-md">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID or customer name..."
            className="w-full h-10 px-4 rounded-lg border border-gray-200 bg-gray-50 outline-none text-sm"
          />
        </div> */}

      <div
        className="bg-white rounded-[14px] border"
        style={{
          borderWidth: "1.25px",
          borderColor: "#E5E7EB",
          padding: "1.25px",
        }}
      >
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Service Type</th>
              <th className="px-4 py-3 text-left">Pickup Time</th>
              <th className="px-4 py-3 text-left">Delivery Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o._id} className="border-t">
                <td className="px-4 py-3 text-blue-600 font-medium">
                  {o.orderId}
                </td>

                <td className="px-4 py-3">
                  <p className="font-medium">{o.customerName}</p>
                  <p className="text-xs text-gray-400">{o.phone}</p>
                </td>

                <td className="px-4 py-3">{o.items}</td>
                <td className="px-4 py-3">{o.serviceType}</td>
                <td className="px-4 py-3">{o.pickupTime}</td>
                <td className="px-4 py-3">{o.deliveryDate}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${badgeStyle(
                      o.status
                    )}`}
                  >
                    {o.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${badgeStyle(
                      o.paymentStatus
                    )}`}
                  >
                    {o.paymentStatus}
                  </span>
                </td>

                <td className="px-4 py-3 font-medium">
                  ₹{o.amount.toFixed(2)}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button>👁</button>
                    <button><img src={editicon} alt="" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
