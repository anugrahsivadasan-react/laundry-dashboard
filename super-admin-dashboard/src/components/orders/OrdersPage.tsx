import React, { useState } from "react"
import { Search, Eye } from "lucide-react"
import { useAppSelector } from "../../redux/hooks"

/* ================= TYPES ================= */

type OrderStatus =
  | "Processing"
  | "Ready"
  | "Delivered"
  | "Pending"
  | "Cancelled"

/* ================= STATUS MAPPING ================= */

const mapOrderStatus = (status: string): OrderStatus => {
  switch (status) {
    case "SCHEDULED":
      return "Processing"

    case "PICKUP":
    case "WASHING":
    case "DRYING":
    case "IRONING":
      return "Pending"

    case "OUT_FOR_DELIVERY":
      return "Ready"

    case "DELIVERED":
      return "Delivered"

    case "CANCELLED":
      return "Cancelled"

    default:
      return "Pending"
  }
}

interface Order {
  orderID: string
  customer: string
  branchName: string
  itemsCount: number
  amount: string
  paidAmount: string
  payableAmount: string
  status: string
  branchAdmin: string
  orderPlacedDate: string
}

/* ================= STATUS BADGE ================= */

const statusStyles: Record<OrderStatus, string> = {
  Processing: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Ready: "bg-green-500/10 text-green-400 border border-green-500/20",
  Delivered: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border border-red-500/20",
}

/* ================= COMPONENT ================= */

const OrdersPage: React.FC = () => {
  const { orders } = useAppSelector((s) => s.order)
  console.log(orders)
  const [search, setSearch] = useState("")
  const [selectBranch, setSelectBranch] = useState("")
  const [selectStatus, setSelectStatus] = useState("")

  const filterBranch = [
    ...new Set(
      orders
        .map((o) => o.branchName?.trim())
        .filter((b) => b && b.toLowerCase() !== "n/a"),
    ),
  ]

  const filteredOrders = orders.filter((o) => {
    const searchText = search.toLowerCase()

    const orderId = String(o.orderID || "")
      .replace(/[-_]/g, "")
      .toLowerCase()

    const customer = String(o.customer || "").toLowerCase()
    const branch = String(o.branchName || "").toLowerCase()

    const uiStatus = mapOrderStatus(o.status)

    const matchesSearch =
      !search || orderId.includes(searchText) || customer.includes(searchText)

    const matchesBranch =
      !selectBranch || branch.includes(selectBranch.toLowerCase())

    const matchesStatus = !selectStatus || uiStatus === selectStatus
    console.log(matchesSearch, matchesBranch, matchesStatus)
    return matchesSearch && matchesBranch && matchesStatus
  })

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
          <select
            onChange={(e) => setSelectBranch(e.target.value)}
            className="h-9 px-3 text-sm rounded-md bg-[#111214] border border-gray-800 text-gray-300 focus:outline-none"
          >
            <option value=""> All Branches </option>
            {filterBranch.map((o, i) => (
              <option key={i} value={o}>
                {o}
              </option>
            ))}
          </select>

          <select
            value={selectStatus}
            onChange={(e) => setSelectStatus(e.target.value)}
            className="h-9 px-3 text-sm rounded-md bg-[#111214] border border-gray-800 text-gray-300 focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
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
                <th className="text-left px-4 py-2 font-medium">paid Amount</th>
                <th className="text-left px-4 py-2 font-medium">
                  payable Amount
                </th>
                <th className="text-left px-4 py-2 font-medium">Status</th>
                <th className="text-left px-4 py-2 font-medium">Admin</th>
                <th className="text-left px-4 py-2 font-medium">Date & Time</th>
                <th className="text-center px-4 py-2 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => {
                const uiStatus = mapOrderStatus(order.status)
                return (
                  <tr
                    key={order.orderID}
                    className="border-b border-gray-800 last:border-none"
                  >
                    <td className="px-4 py-3 text-gray-300">{order.orderID}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">{order.branchName}</td>
                    <td className="px-4 py-3">{order.itemsCount}</td>
                    <td className="px-4 py-3">{order.amount}</td>
                    <td className="px-4 py-3">{order.paidAmount}</td>
                    <td className="px-4 py-3">{order.payableAmount}</td>

                    {/* STATUS */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] rounded-full ${statusStyles[uiStatus]}`}
                      >
                        {uiStatus}
                      </span>
                    </td>

                    <td className="px-4 py-3">{order.branchAdmin}</td>
                    <td className="px-4 py-3">{order.orderPlacedDate}</td>

                    {/* ACTION */}
                    <td className="px-4 py-3 text-center">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
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
  )
}

export default OrdersPage
