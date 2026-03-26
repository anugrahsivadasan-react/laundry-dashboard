import React, { useState } from "react"
import { FiSearch, FiMail, FiPhone, FiEye } from "react-icons/fi"
import { useAppSelector } from "../../redux/hooks"

type Customer = {
  id: string
  initials: string
  name: string
  joined: string
  email: string
  phone: string
  orders: number
  totalSpent: number
  complaints: number
  status: "ACTIVE" | "BLOCKED" | "VIP"
}

const statusStyles = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400",
  BLOCKED: "bg-red-500/10 text-red-400",
  VIP: "bg-purple-500/10 text-purple-400",
}

const CustomersTable: React.FC = () => {
  const { users } = useAppSelector((s) => s.customer)

  const [search, setSearch] = useState("")
  const filterUser = users.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase())
  })
  console.log(users)
  return (
    <div className="w-full  py-6">
      <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-semibold">All Customers</h2>

          {/* Search */}
          <div className="relative w-[280px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-full bg-[#0b0b0b] border border-white/10 rounded-md pl-10 pr-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm text-left text-white/70">
            <thead className="text-white/40 border-b border-white/10">
              <tr>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Contact</th>
                <th className="pb-3 font-medium">Orders</th>
                <th className="pb-3 font-medium">Total Spent</th>
                <th className="pb-3 font-medium">Complaints</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filterUser?.map((customer, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition"
                >
                  {/* Customer */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-semibold text-white">
                        {customer.initials}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {customer.name}
                        </p>
                        <p className="text-white/40 text-xs">
                          {customer.joined}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FiMail className="text-white/40 text-xs" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiPhone className="text-white/40 text-xs" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* Orders */}
                  <td className="py-4">{customer.totalOrders}</td>

                  {/* Total Spent */}
                  <td className="py-4">{`$ ${customer.totalAmount}`}</td>

                  {/* Complaints */}
                  <td className="py-4">
                    {customer.complaints === 0 ? (
                      <span className="text-white/40">None</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/10 text-red-400">
                        {customer.complaints}
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[customer.status]}`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4">
                    <button className="text-blue-400 hover:text-blue-300">
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CustomersTable
