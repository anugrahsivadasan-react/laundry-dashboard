import Cards from "../../components/Branches/Cards"
import BranchesTable from "../../components/Branches/BranchesTable"
import AddBranchModal from "../../components/Branches/AddBranchModal"

import { useEffect, useState } from "react"
import type { Branch } from "../../redux/interfaceType/branchType"
import toast from "react-hot-toast"
import { useAppDispatch } from "../../redux/hooks"
import {
  createBranch,
  getAllBranches,
  getAllBranchestatus,
  updateBranch,
} from "../../redux/action/branchThunks"
import socket from "../../config/soket"
import DateRangeFilter from "../../utils/DateRangeFilter"

const Branches = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const fetchBranches = (from: string, to: string) => {
    dispatch(getAllBranches({ from, to }))
    dispatch(getAllBranchestatus())
  }

  useEffect(() => {
    if (!socket) return

    socket.on("order-created", () => fetchBranches("", ""))
    socket.on("branch-created", () => fetchBranches("", ""))
    socket.on("branch-status-updated", () => fetchBranches("", ""))
    socket.on("branch-updated", () => fetchBranches("", ""))

    return () => {
      socket.off("order-created")
      socket.off("branch-created")
      socket.off("branch-status-updated")
      socket.off("branch-updated")
    }
  }, [])

  const handleCreateBranch = async (data: Branch) => {
    try {
      await dispatch(createBranch(data)).unwrap()
      toast.success("Branch created successfully")
    } catch (error: any) {
      toast.error(error)
    }
  }

  const handleEditBranch = async (id: string, data: Branch) => {
    try {
      await dispatch(updateBranch({ id, data })).unwrap()
      toast.success("Branch updated successfully")
    } catch (error: any) {
      toast.error(error)
    }
  }

  return (
    <div className="p-6 bg-[#0A0A0A] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-semibold">Branch Management</h1>
          <p className="text-[14px] text-[#6A7282]">
            Manage All Your Laundry Branches
          </p>
        </div>

        <div className="flex items-center gap-4">
          <DateRangeFilter onChange={fetchBranches} />

          <button
            className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm"
            onClick={() => setOpen(true)}
          >
            + Add Branch
          </button>
        </div>
      </div>

      <Cards />

      <div className="pt-6">
        <BranchesTable onOpen={() => setOpen(true)} />
      </div>

      <AddBranchModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreateBranch}
        onEdit={handleEditBranch}
      />
    </div>
  )
}

export default Branches
