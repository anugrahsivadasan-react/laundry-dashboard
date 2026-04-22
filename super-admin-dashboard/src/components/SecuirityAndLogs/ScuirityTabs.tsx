import React, { useState } from "react"
import ActivityLogs from "./ActivityLogs"
import LoginHistory from "./LoginHistory"
import BackupAndREstore from "./BackupAndREstore"
import SecuiritySettings from "./SecuiritySettings"

const SecuirityTabs = () => {
  const [activeTab, setActiveTab] = useState("ActivityLogs")

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-6">
        {/* Security Settings */}

        {/* Activity Logs */}
        <button
          onClick={() => setActiveTab("ActivityLogs")}
          className={`px-4 py-1.5 rounded-full text-xs ${
            activeTab === "ActivityLogs"
              ? "bg-white text-black"
              : "bg-[#1c1c1c] text-gray-300"
          }`}
        >
          Activity Logs{" "}
        </button>

        {/* Login History */}
        <button
          onClick={() => setActiveTab("LoginHistory")}
          className={`px-4 py-1.5 rounded-full text-xs ${
            activeTab === "LoginHistory"
              ? "bg-white text-black"
              : "bg-[#1c1c1c] text-gray-300"
          }`}
        >
          Login History{" "}
        </button>

        {/* Backup & Restore */}
        <button
          onClick={() => setActiveTab("BackupAndRestore")}
          className={`px-4 py-1.5 rounded-full text-xs ${
            activeTab === "BackupAndRestore"
              ? "bg-white text-black"
              : "bg-[#1c1c1c] text-gray-300"
          }`}
        >
          Backup & Restore
        </button>

        <button
          onClick={() => setActiveTab("SecuiritySettings")}
          className={`px-4 py-1.5 rounded-full text-xs ${
            activeTab === "SecuiritySettings"
              ? "bg-white text-black"
              : "bg-[#1c1c1c] text-gray-300"
          }`}
        >
          Security Settings
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "ActivityLogs" && <ActivityLogs />}
        {activeTab === "LoginHistory" && <LoginHistory />}
        {activeTab === "BackupAndRestore" && <BackupAndREstore />}
        {activeTab === "SecuiritySettings" && <SecuiritySettings />}
      </div>
    </div>
  )
}

export default SecuirityTabs
