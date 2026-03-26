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

const Branches = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(getAllBranchestatus())
    dispatch(getAllBranches({}))
  }, [dispatch])

  useEffect(() => {
    if (!socket) return

    socket.on("order-created", (data) => {
      console.log("Dashboard update:", data)

      // Example: update state
      dispatch(getAllBranchestatus())
      dispatch(getAllBranches({}))
    })
    socket.on("branch-created", (data) => {
      console.log("Branch created:", data)

      dispatch(getAllBranchestatus())
      dispatch(getAllBranches({}))
    })
    socket.on("branch-status-updated", (data) => {
      console.log("Branch created:", data)

      dispatch(getAllBranches({}))
    })
    socket.on("branch-updated", () => {
      dispatch(getAllBranches({}))
    })

    return () => {
      socket.off("order-created")
      socket.off("branch-created")
    }
  }, [dispatch])

  const handleCreateBranch = async (data: Branch) => {
    try {
      const result = await dispatch(createBranch(data)).unwrap()

      toast.success("Branch created successfully")

      console.log(result)

      // setBranchOpen(false)
    } catch (error: any) {
      toast.error(error || "Failed to create branch")
      throw error
    }
  }
  const handleEditBranch = async (id: string, data: Branch) => {
    try {
      const result = await dispatch(updateBranch({ id, data })).unwrap()

      toast.success("Branch update successfully")

      console.log(result)

      // setBranchOpen(false)
    } catch (error: any) {
      toast.error(error || "Failed to update branch")
      throw error
    }
  }
  return (
    <div className="p-6 bg-[#0A0A0A] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Branch Management
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            Manage All Your Laundry Branches
          </p>
        </div>

        <button
          className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
          onClick={() => setOpen(true)}
        >
          + Add Branch
        </button>
      </div>
      <Cards />
      <div className="pt-6">
        <BranchesTable onOpen={() => setOpen(true)} />
      </div>

      <AddBranchModal
        isOpen={open}
        onClose={() => {
          setOpen(false)
        }}
        onCreate={handleCreateBranch}
        onEdit={handleEditBranch}
      />
    </div>
  )
}

export default Branches
