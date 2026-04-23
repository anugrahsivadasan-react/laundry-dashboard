import React, { useState } from "react"
import AdminModal, { type AdminForm } from "../Adminmanagement/AdminModal"
import { useAppDispatch } from "../../redux/hooks"
import toast from "react-hot-toast"
import type { Branch } from "../../redux/interfaceType/branchType"
import { createBranch } from "../../redux/action/branchThunks"
import AddBranchModal from "../Branches/AddBranchModal"
import { createAdmin } from "../../redux/action/adminThunks"
import CouponModal from "../offers&coupons/CouponModal"
import { apiAxios } from "../../config/axios"
import { useNavigate } from "react-router-dom"

const SuperAdminQuickActions: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [adminOpen, setAdminOpen] = useState(false)
  const [branchOpen, setBranchOpen] = useState(false)
  const [couponOpen, setCouponOpen] = useState(false)

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

  const handleCreateCoupon = async (formData: FormData) => {
    try {
      const response = await apiAxios.post(
        "/super_admin/coupons/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )

      toast.success(response.data?.message || "Coupon created successfully")
      return response.data
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0] ||
        "Failed to create coupon"

      toast.error(errorMessage)
      throw error
    }
  }
  return (
    <div className=" w-full xl:max-w-[420px] bg-[#171717] border border-[#262626] rounded-2xl p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <h2 className="text-white text-lg font-medium mb-6">Quick Actions</h2>

        <div className="flex flex-col gap-4">
          {/* Primary Button */}
          <button
            className=" h-14 rounded-xl text-white font-medium text-sm bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center gap-3 hover:opacity-90 transition"
            onClick={() => setBranchOpen(true)}
          >
            <span className="text-lg">+</span>
            Add New Branch
          </button>

          {/* Secondary Buttons */}
          <button
            className="h-14 rounded-xl text-gray-300 border border-[#2a2a2a] bg-[#1e1e1e] flex items-center justify-center gap-3 hover:bg-[#232323] transition"
            onClick={() => setAdminOpen(true)}
          >
            <span className="text-lg">+</span>
            Add Admin
          </button>

          <button
            className=" h-14 rounded-xl text-gray-300 border border-[#2a2a2a] bg-[#1e1e1e] flex items-center justify-center gap-3 hover:bg-[#232323] transition"
            onClick={() => setCouponOpen(true)}
          >
            <span className="text-lg">+</span>
            Create Offer
          </button>

          <button
            onClick={() => navigate("/report-analytics")}
            className="h-14 rounded-xl text-gray-300 border border-[#2a2a2a] bg-[#1e1e1e] flex items-center justify-center hover:bg-[#232323] transition"
          >
            View Reports
          </button>
        </div>
      </div>

      {/* System Health Section */}
      <div className=" mt-8 p-5 rounded-xlborder border-[#1f3a8a] bg-gradient-to-br from-[#1e293b] via-[#1a1a2e]  to-[#2e1065] ">
        <h3 className="text-white text-lg font-medium mb-4">System Health</h3>

        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Server Status</span>
          <span className="text-green-400 font-medium">Online</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Database</span>
          <span className="text-green-400 font-medium">Healthy</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Last Backup</span>
          <span className="text-gray-300">2h ago</span>
        </div>
      </div>
      <AddBranchModal
        isOpen={branchOpen}
        onClose={() => setBranchOpen(false)}
        onCreate={handleCreateBranch}
      />
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onCreate={handleCreateAdmin}
      />
      <CouponModal
        isOpen={couponOpen}
        onClose={() => setCouponOpen(false)}
        onCreate={handleCreateCoupon}
      />
    </div>
  )
}

export default SuperAdminQuickActions
