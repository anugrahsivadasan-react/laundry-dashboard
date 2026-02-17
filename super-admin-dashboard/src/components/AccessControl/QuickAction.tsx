import React from "react";
import { Plus, ShieldCheck, Lock } from "lucide-react";

const QuickActions: React.FC = () => {
  const handleAddUser = () => {
    console.log("Add new user");
    // 🔌 connect to backend/modal later
  };

  const handleBulkPermission = () => {
    console.log("Bulk permission update");
  };

  const handleSecurityAudit = () => {
    console.log("Security audit");
  };

  return (
    <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5 w-full">
      {/* Title */}
      <h3 className="text-white text-sm font-semibold mb-4">
        Quick Actions
      </h3>

      {/* Buttons Row */}
      <div className="flex flex-col xl:flex-row gap-4">
        {/* Add New User */}
        <button
          onClick={handleAddUser}
          className="flex items-center justify-center gap-2 w-full xl:w-1/3
          h-[38px] rounded-md text-sm font-medium
          bg-gradient-to-r from-blue-600 to-blue-500
          hover:opacity-90 text-white transition"
        >
          <Plus className="w-4 h-4" />
          Add New User
        </button>

        {/* Bulk Permission Update */}
        <button
          onClick={handleBulkPermission}
          className="flex items-center justify-center gap-2 w-full xl:w-1/3
          h-[38px] rounded-md text-sm font-medium
          bg-gradient-to-r from-purple-600 to-fuchsia-500
          hover:opacity-90 text-white transition"
        >
          <ShieldCheck className="w-4 h-4" />
          Bulk Permission Update
        </button>

        {/* Security Audit */}
        <button
          onClick={handleSecurityAudit}
          className="flex items-center justify-center gap-2 w-full xl:w-1/3
          h-[38px] rounded-md text-sm font-medium
          bg-gradient-to-r from-orange-500 to-amber-500
          hover:opacity-90 text-white transition"
        >
          <Lock className="w-4 h-4" />
          Security Audit
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
