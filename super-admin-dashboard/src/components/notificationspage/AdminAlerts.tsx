import React from "react";
import {
  Shield,
  AlertCircle,
  Users,
  UserCog,
  Building2,
} from "lucide-react";

type Priority = "Urgent" | "High" | "Normal";

interface AlertItem {
  id: number;
  title: string;
  message: string;
  priority: string;
  target: string;
  recipients: number;
  readPercent: number;
  date: string;
  time: string;
  action: "Action Required" | "Info Only";
  dueDate?: string;
  status: "Sent";
}

const normalizePriority = (p: string): Priority => {
  const map: Record<string, Priority> = {
    urgent: "Urgent",
    high: "High",
    normal: "Normal",
  };
  return map[p?.toLowerCase()] || "Normal";
};

const priorityStyles: Record<Priority, string> = {
  Urgent: "bg-red-500/10 text-red-400 border border-red-500/30",
  High: "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  Normal: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
};

const getTargetIcon = (target: string) => {
  if (target.includes("Branch"))
    return <Users className="w-4 h-4 mr-2 text-gray-400" />;
  if (target.includes("Admin"))
    return <UserCog className="w-4 h-4 mr-2 text-gray-400" />;
  return <Building2 className="w-4 h-4 mr-2 text-gray-400" />;
};

const AdminAlerts = () => {
  const data: AlertItem[] = [
    {
      id: 1,
      title: "New Pricing Update Required",
      message:
        "Please review and update pricing for dry cleaning services effective Feb 1, 2026.",
      priority: "urgent",
      target: "All Branch Admins",
      recipients: 12,
      readPercent: 75,
      date: "2026-01-19",
      time: "9:00 AM",
      action: "Action Required",
      dueDate: "2026-01-31",
      status: "Sent",
    },
    {
      id: 2,
      title: "Branch Performance Report Available",
      message:
        "Monthly performance reports are now available in the Reports section. Please review.",
      priority: "normal",
      target: "All Branch Admins",
      recipients: 12,
      readPercent: 100,
      date: "2026-01-15",
      time: "10:30 AM",
      action: "Info Only",
      status: "Sent",
    },
    {
      id: 3,
      title: "Staff Training Mandatory",
      message:
        "All branch staff must complete the new customer service training module by Jan 31.",
      priority: "high",
      target: "All Branch Admins",
      recipients: 12,
      readPercent: 67,
      date: "2026-01-17",
      time: "2:15 PM",
      action: "Action Required",
      dueDate: "2026-01-31",
      status: "Sent",
    },
    {
      id: 4,
      title: "New Admin Access Granted",
      message:
        "Sarah Johnson has been granted admin access to Westside Branch.",
      priority: "normal",
      target: "Super Admin",
      recipients: 1,
      readPercent: 100,
      date: "2026-01-22",
      time: "11:45 AM",
      action: "Info Only",
      status: "Sent",
    },
    {
      id: 5,
      title: "Inventory Audit Required",
      message:
        "Quarterly inventory audit must be completed by all branches before month end.",
      priority: "high",
      target: "All Branch Admins",
      recipients: 12,
      readPercent: 58,
      date: "2026-01-16",
      time: "8:30 AM",
      action: "Action Required",
      dueDate: "2026-01-31",
      status: "Sent",
    },
    {
      id: 6,
      title: "Customer Complaint Escalated",
      message:
        "High-priority customer complaint #CR-2456 requires immediate attention.",
      priority: "urgent",
      target: "Downtown Branch Admin",
      recipients: 1,
      readPercent: 100,
      date: "2026-01-23",
      time: "3:20 PM",
      action: "Action Required",
      dueDate: "2026-01-24",
      status: "Sent",
    },
    {
      id: 7,
      title: "Policy Update Notification",
      message:
        "Updated refund policy has been published. Please familiarize yourself with the changes.",
      priority: "normal",
      target: "All Admins",
      recipients: 28,
      readPercent: 89,
      date: "2026-01-14",
      time: "1:00 PM",
      action: "Info Only",
      status: "Sent",
    },
  ];

  const actionCount = data.filter((d) => d.action === "Action Required").length;

  return (
    <div className="w-full  rounded-xl shadow-xl">
      
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-500 mt-0.5" />
          <div>
            <h2 className="text-white text-base font-semibold">
              Admin Alerts & Notifications
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Important notifications for administrators requiring attention or action
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="bg-orange-500/10 text-orange-400 text-xs px-3 py-1 rounded-full border border-orange-500/30">
            {actionCount} Action Required
          </span>
          <span className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/30">
            {data.length} Total
          </span>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-8  px-6 py-3 text-xs text-gray-400 border-b border-gray-800">
        <div className="col-span-2">Title & Message</div>
        <div>Priority</div>
        <div>Target</div>
        <div>Recipients</div>
        <div>Date & Time</div>
        <div>Action</div>
        <div>Status</div>
      </div>

      {/* Table Body */}
      <div>
        {data.map((item) => {
          const priority = normalizePriority(item.priority);

          return (
            <div
              key={item.id}
              className="grid grid-cols-8 px-6 py-4 border-b border-gray-800 hover:bg-white/5 transition"
            >
              <div className="col-span-2 flex gap-3 items-start">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-1" />
                <div>
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.message}</p>
                </div>
              </div>

              <div className="flex items-center">
                <span className={`text-xs px-2 py-1 rounded-md ${priorityStyles[priority]}`}>
                  {priority}
                </span>
              </div>

              <div className="flex items-center text-gray-300 text-sm">
                {getTargetIcon(item.target)}
                {item.target}
              </div>

              <div className="flex flex-col text-sm">
                <span className="text-white">{item.recipients}</span>
                <span className="text-gray-400 text-xs">{item.readPercent}% read</span>
              </div>

              <div className="text-sm text-gray-300">
                <div>{item.date}</div>
                <div className="text-gray-500 text-xs mt-1">{item.time}</div>
              </div>

              <div className="flex flex-col">
                {item.action === "Action Required" ? (
                  <>
                    <span className="max-w-[120px] bg-orange-500/10 text-orange-400 text-xs px-2 py-1 rounded-md border border-orange-500/30">
                      Action Required
                    </span>
                    <span className="text-gray-500 text-xs mt-1">
                      Due: {item.dueDate}
                    </span>
                  </>
                ) : (
                  <span className="max-w-[120px] bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-md border border-gray-600">
                    Info Only
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/30">
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminAlerts;