import React, { useState } from "react";
import { Shield } from "lucide-react";

/* ================= TYPES ================= */

type Activity = {
  id: string;
  title: string;
  action: string;
  description: string;
  time: string;
};

/* ================= DUMMY DATA (BACKEND READY) ================= */

const dummyLogs: Activity[] = [
  {
    id: "1",
    title: "Super Admin",
    action: "Created new role",
    description: 'Added "Customer Service" role',
    time: "2026-01-21 14:30:00",
  },
  {
    id: "2",
    title: "Super Admin",
    action: "Updated permissions",
    description: "Modified Branch Admin permissions",
    time: "2026-01-21 12:15:00",
  },
  {
    id: "3",
    title: "Super Admin",
    action: "Assigned role",
    description: "Assigned Support Staff role to Emily Davis",
    time: "2026-01-21 10:45:00",
  },
  {
    id: "4",
    title: "Super Admin",
    action: "Revoked access",
    description: "Removed delivery permissions from Robert Wilson",
    time: "2026-01-20 16:20:00",
  },
];

/* ================= COMPONENT ================= */

const ActivityLog: React.FC = () => {
  const [logs] = useState<Activity[]>(dummyLogs);

  return (
    <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5 w-full">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-white text-sm font-semibold">
          Role & Permission Activity Log
        </h2>
        <p className="text-xs text-gray-500">
          Track all changes to roles and permissions
        </p>
      </div>

      {/* Log List */}
      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between bg-[#151517] border border-gray-800 rounded-lg px-4 py-3"
          >
            {/* Left Content */}
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-400" />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-200 font-medium">
                    {log.title}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{log.action}</span>
                </div>

                <span className="text-xs text-gray-500">
                  {log.description}
                </span>
              </div>
            </div>

            {/* Time */}
            <div className="text-[11px] text-gray-500 whitespace-nowrap ml-4">
              {log.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
