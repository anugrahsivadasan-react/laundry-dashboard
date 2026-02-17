import AdminCards from "../../components/Adminmanagement/AdminCards"
import AdminTable from "../../components/Adminmanagement/AdminTable" 
import { useState } from "react"
import AdminModal from "../../components/Adminmanagement/AdminModal"


const AdminManagement = () => {
  const [open, setOpen]=useState(false)
  return (
     <div className="p-6 bg-[#0A0A0A] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Admin Management
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            Manage afmin users across all branches
          </p>
        </div>

        <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
         onClick={() => setOpen(true)}
         >

           +  Add Admin
        </button>
      </div>
      <AdminCards />
      <div className="pt-6">
        <AdminTable />
      </div>

    <AdminModal
  isOpen={open}
  onClose={() => setOpen(false)}
  onCreate={(data) => {
    console.log("Send to backend:", data);
  }}
/>

        </div>
  )
}

export default AdminManagement
