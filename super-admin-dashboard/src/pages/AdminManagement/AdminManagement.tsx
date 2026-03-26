import AdminCards from "../../components/Adminmanagement/AdminCards"
import AdminTable from "../../components/Adminmanagement/AdminTable"
import { useEffect, useState } from "react"
import AdminModal, {
  type AdminForm,
  type UpdateAdminForm,
} from "../../components/Adminmanagement/AdminModal"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  createAdmin,
  getAllAdminStats,
  getBranchUsers,
  updateAdmin,
} from "../../redux/action/adminThunks"
import socket from "../../config/soket"
import toast from "react-hot-toast"

const AdminManagement = () => {
  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllAdminStats())
    dispatch(getBranchUsers())
  }, [dispatch])

  useEffect(() => {
    if (!socket) return

    socket.on("admin-created", (data) => {
      console.log("admin created:", data)

      dispatch(getAllAdminStats())
      dispatch(getBranchUsers())
    })

    socket.on("admin-updated", (data) => {
      console.log("admin update:", data)

      dispatch(getBranchUsers())
    })

    return () => {
      socket.off("admin-created")
      socket.off("admin-updated")
    }
  }, [dispatch])

  const handleCreateAdmin = async (data: AdminForm) => {
    try {
      const result = await dispatch(createAdmin(data)).unwrap()

      toast.success("Branch created successfully")

      console.log(result)

      // setBranchOpen(false)
    } catch (error: any) {
      toast.error(error || "Failed to create branch")
      throw error
    }
  }

  const handleEditAdmin = async (id: string, data: UpdateAdminForm) => {
    try {
      console.log(id, data)
      const result = await dispatch(updateAdmin({ id, data })).unwrap()

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
            Admin Management
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            Manage admin users across all branches
          </p>
        </div>

        <button
          className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
          onClick={() => setOpen(true)}
        >
          + Add Admin
        </button>
      </div>
      <AdminCards />
      <div className="pt-6">
        <AdminTable onOpen={() => setOpen(true)} />
      </div>

      <AdminModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreateAdmin}
        onEdit={handleEditAdmin}
      />
    </div>
  )
}

export default AdminManagement
