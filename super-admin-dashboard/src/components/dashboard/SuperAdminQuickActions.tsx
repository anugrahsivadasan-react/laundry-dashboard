import React from "react";

const SuperAdminQuickActions: React.FC = () => {
  return (
    <div
      className="
        w-full
        xl:max-w-[420px]
        bg-[#171717]
        border border-[#262626]
        rounded-2xl
        p-6
        flex
        flex-col
        justify-between
      "
    >
      {/* Top Section */}
      <div>
        <h2 className="text-white text-lg font-medium mb-6">
          Quick Actions
        </h2>

        <div className="flex flex-col gap-4">
          {/* Primary Button */}
          <button
            className="
              h-14
              rounded-xl
              text-white
              font-medium
              text-sm
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              flex
              items-center
              justify-center
              gap-3
              hover:opacity-90
              transition
            "
          >
            <span className="text-lg">+</span>
            Add New Branch
          </button>

          {/* Secondary Buttons */}
          <button
            className="
              h-14
              rounded-xl
              text-gray-300
              border border-[#2a2a2a]
              bg-[#1e1e1e]
              flex
              items-center
              justify-center
              gap-3
              hover:bg-[#232323]
              transition
            "
          >
            <span className="text-lg">+</span>
            Add Admin
          </button>

          <button
            className="
              h-14
              rounded-xl
              text-gray-300
              border border-[#2a2a2a]
              bg-[#1e1e1e]
              flex
              items-center
              justify-center
              gap-3
              hover:bg-[#232323]
              transition
            "
          >
            <span className="text-lg">+</span>
            Create Offer
          </button>

          <button
            className="
              h-14
              rounded-xl
              text-gray-300
              border border-[#2a2a2a]
              bg-[#1e1e1e]
              flex
              items-center
              justify-center
              hover:bg-[#232323]
              transition
            "
          >
            View Reports
          </button>
        </div>
      </div>

      {/* System Health Section */}
      <div
        className="
          mt-8
          p-5
          rounded-xl
          border border-[#1f3a8a]
          bg-gradient-to-br
          from-[#1e293b]
          via-[#1a1a2e]
          to-[#2e1065]
        "
      >
        <h3 className="text-white text-lg font-medium mb-4">
          System Health
        </h3>

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
    </div>
  );
};

export default SuperAdminQuickActions;
