import React from 'react'
import AccessCards from '../../components/AccessControl/AccessCard'
import AccessTabs from '../../components/AccessControl/AccessTabs'
import RolesOverview from '../../components/AccessControl/RolesOverview'
import PermissionMatrix from '../../components/AccessControl/PermissionMatrix'
import UserAssignments from '../../components/AccessControl/UserAssignments'
import AcivityLog from '../../components/AccessControl/AcivityLog'
import { useState } from 'react'
import QuickActions from '../../components/AccessControl/QuickAction'

const AccessControl = () => {
      const [activeTab, setActiveTab] = useState<"Roles" | "Permission" | "Assign" | "Log">("Roles");

  return (
 <div className="p-6 bg-[#0A0A0A] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Access Control & roles
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            Manage user roles and system permissions
          </p>
        </div>

        <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
        //  onClick={() => setOpen(true)}
         >

           +  Add Admin
        </button>
      </div>
            <AccessCards />
      <div className="pt-6">
 {/* Tabs */}
      <AccessTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "Roles" && <RolesOverview />}
      {activeTab === "Permission" && <PermissionMatrix />}
      {activeTab === "Assign" && <UserAssignments />}
      {activeTab === "Log" && <AcivityLog />}    
        </div>


        <div className="pt-6">
            <QuickActions />
        </div>

  

        </div>  )
}

export default AccessControl