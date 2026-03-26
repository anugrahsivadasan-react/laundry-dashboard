import React, { useState } from "react"
import { Search, MapPin, SquarePen, Power, Building2 } from "lucide-react"
import type { Branch } from "../../redux/interfaceType/branchType"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  getBranchById,
  updateBranchStatus,
} from "../../redux/action/branchThunks"
import toast from "react-hot-toast"

/* ================= TYPES ================= */

interface BranchesTableProps {
  onOpen: () => void
}

/* ================= COMPONENT ================= */
const BranchesTable: React.FC<BranchesTableProps> = ({ onOpen }) => {
  /* 🔌 Replace this with backend data later */

  const dispatch = useAppDispatch()
  const { branches } = useAppSelector((s) => s.branchs)
  const [search, setSearch] = useState("")

  // const [branches, setBranches] = useState<TableBranch[]>([
  //   {
  //     id: "1",
  //     name: "Edappally Branch",
  //     location: "123 Main St, Ernakulam",
  //     status: "Active",
  //     admins: 3,
  //     orders: 234,
  //     revenue: "$12,400",
  //   },
  //   {
  //     id: "2",
  //     name: "Aluva Branch",
  //     location: "456 West Ave, Aluva",
  //     status: "Active",
  //     admins: 2,
  //     orders: 198,
  //     revenue: "$10,200",
  //   },
  //   {
  //     id: "3",
  //     name: "Kalamassery Branch",
  //     location: "789 East Blvd, Ernakulam",
  //     status: "Active",
  //     admins: 2,
  //     orders: 176,
  //     revenue: "$9,800",
  //   },
  //   {
  //     id: "4",
  //     name: "Perumbavoor Branch",
  //     location: "321 AM Rd, Perumbavoor",
  //     status: "Disabled",
  //     admins: 0,
  //     orders: 0,
  //     revenue: "$0",
  //   },
  // ])

  /* 🔌 Backend-ready handlers */
  const handleEdit = async (id: string) => {
    try {
      onOpen()
      await dispatch(getBranchById(id)).unwrap()
    } catch (error) {}

    console.log("Edit branch:", id)
  }

  const handleToggleStatus = async (id: string, status: string) => {
    try {
      await dispatch(
        updateBranchStatus({
          id,
          status: status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
        }),
      ).unwrap()
      toast.success("status update")
    } catch (error) {
      toast.error("failed to update")
    }
  }

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-sm font-semibold">All Branches</h2>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search branches..."
            className="bg-[#151517] border border-gray-700 text-sm text-gray-300 pl-9 pr-3 py-2 rounded-md outline-none placeholder-gray-500 w-[220px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400 pr-6">
          <thead className="text-xs text-gray-500 border-b border-gray-800">
            <tr>
              <th className="pb-3 font-medium">Branch Name</th>
              <th className="pb-3 font-medium">Location</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Admins</th>
              <th className="pb-3 font-medium">Orders</th>
              <th className="pb-3 font-medium">Revenue</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBranches.map((branch) => (
              <tr
                key={branch.id}
                className="border-b border-gray-800 hover:bg-[#151517]"
              >
                {/* Branch Name */}
                <td className="py-3 text-gray-200 flex gap-2">
                  <Building2 className="w-4 h-4 bg-[#2B7FFF1A] text-blue-400" />{" "}
                  {branch.name}
                </td>

                {/* Location */}
                <td className="py-3">
                  <div className="flex items-center gap-1 text-gray-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {branch.location}
                  </div>
                </td>

                {/* Status */}
                <td className="py-3">
                  {branch.status === "ACTIVE" ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      Active
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 border border-gray-600">
                      Disabled
                    </span>
                  )}
                </td>

                {/* Admins */}
                <td className="py-3 text-gray-300">{branch.admins}</td>

                {/* Orders */}
                <td className="py-3 text-gray-300">{branch.orders}</td>

                {/* Revenue */}
                <td className="py-3 text-gray-300">{branch.revenue}</td>

                {/* Actions */}
                <td className="py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => handleEdit(branch.id)}>
                      <SquarePen className="w-4 h-4 text-blue-400 hover:text-blue-300" />
                    </button>

                    <button
                      onClick={() =>
                        handleToggleStatus(branch.id, branch.status)
                      }
                    >
                      <Power
                        className={`w-4 h-4 ${
                          branch.status === "ACTIVE"
                            ? "text-red-400 hover:text-red-300"
                            : "text-green-400 hover:text-green-300"
                        }`}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BranchesTable
