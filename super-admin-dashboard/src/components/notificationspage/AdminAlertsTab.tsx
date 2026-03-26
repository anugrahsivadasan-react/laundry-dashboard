import {
  Shield,
  AlertCircle,
  Users,
  Building2,
  UserCog,
  CircleAlert,
} from "lucide-react";

interface AdminAlert {
  title: string;
  message: string;
  priority: "Urgent" | "High" | "Normal";
  target: string;
  recipients: string;
  read: string;
  date: string;
  time: string;
  action: "Action Required" | "Info Only";
  due?: string;
  status: "Sent";
}

const alerts: AdminAlert[] = [
  {
    title: "New Pricing Update Required",
    message:
      "Please review and update pricing for dry cleaning services effective Feb 1, 2026.",
    priority: "Urgent",
    target: "All Branch Admins",
    recipients: "12",
    read: "75% read",
    date: "2026-01-19",
    time: "9:00 AM",
    action: "Action Required",
    due: "Due: 2026-01-31",
    status: "Sent",
  },
  {
    title: "Branch Performance Report Available",
    message:
      "Monthly performance reports are now available in the Reports section.",
    priority: "Normal",
    target: "All Branch Admins",
    recipients: "12",
    read: "100% read",
    date: "2026-01-15",
    time: "10:30 AM",
    action: "Info Only",
    status: "Sent",
  },
  {
    title: "Staff Training Mandatory",
    message:
      "All branch staff must complete the new customer service training module by Jan 31.",
    priority: "High",
    target: "All Branch Admins",
    recipients: "12",
    read: "67% read",
    date: "2026-01-17",
    time: "2:15 PM",
    action: "Action Required",
    due: "Due: 2026-01-31",
    status: "Sent",
  },
  {
    title: "New Admin Access Granted",
    message: "Sarah Johnson has been granted admin access to Westside Branch.",
    priority: "Normal",
    target: "Super Admin",
    recipients: "1",
    read: "100% read",
    date: "2026-01-22",
    time: "11:45 AM",
    action: "Info Only",
    status: "Sent",
  },
  {
    title: "Inventory Audit Required",
    message:
      "Quarterly inventory audit must be completed by all branches before month end.",
    priority: "High",
    target: "All Branch Admins",
    recipients: "12",
    read: "58% read",
    date: "2026-01-16",
    time: "8:30 AM",
    action: "Action Required",
    due: "Due: 2026-01-31",
    status: "Sent",
  },
  {
    title: "Customer Complaint Escalated",
    message:
      "High-priority customer complaint #CR-2456 requires immediate attention.",
    priority: "Urgent",
    target: "Downtown Branch Admin",
    recipients: "1",
    read: "100% read",
    date: "2026-01-23",
    time: "3:20 PM",
    action: "Action Required",
    due: "Due: 2026-01-24",
    status: "Sent",
  },
  {
    title: "Policy Update Notification",
    message:
      "Updated refund policy has been published. Please familiarize yourself with the changes.",
    priority: "Normal",
    target: "All Admins",
    recipients: "28",
    read: "89% read",
    date: "2026-01-14",
    time: "1:00 PM",
    action: "Info Only",
    status: "Sent",
  },
];

const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case "Urgent":
      return "bg-[#EF44441A] text-[#EF4444]";
    case "High":
      return "bg-[#FE9A001A] text-[#FE9A00]";
    case "Normal":
      return "bg-[#2B7FFF1A] text-[#2B7FFF]";
    default:
      return "";
  }
};

const getActionStyle = (action: string) => {
  if (action === "Action Required")
    return "bg-[#FE9A001A] text-[#FE9A00]";
  return "bg-[#262626] text-[#A1A1A1]";
};

const getTargetIcon = (target: string) => {
  if (target.includes("Branch")) return <Building2 size={16} />;
  if (target.includes("Admin")) return <UserCog size={16} />;
  return <Users size={16} />;
};

const AdminAlertsTab = () => {
  return (
    <div className="w-full bg-[#171717] border border-[#262626] rounded-[14px] p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-white font-semibold text-[16px] flex items-center gap-2">
            <Shield size={18} className="text-[#FACC15]" />
            Admin Alerts & Notifications
          </h2>

          <p className="text-[#A1A1A1] text-sm">
            Important notifications for administrators requiring attention or action
          </p>
        </div>

        <div className="flex gap-3">
          <span className="bg-[#FE9A001A] text-[#FE9A00] text-xs px-3 py-1 rounded-full">
            4 Action Required
          </span>

          <span className="bg-[#2B7FFF1A] text-[#2B7FFF] text-xs px-3 py-1 rounded-full">
            7 Total
          </span>
        </div>
      </div>

      {/* TABLE */}

      <table className="w-full text-sm text-left">

        <thead className="text-[#A1A1A1] border-b border-[#262626]">
          <tr>
            <th className="pb-3">Title & Message</th>
            <th className="pb-3">Priority</th>
            <th className="pb-3">Target</th>
            <th className="pb-3">Recipients</th>
            <th className="pb-3">Date & Time</th>
            <th className="pb-3">Action</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert, index) => (
            <tr
              key={index}
              className="border-b border-[#262626] hover:bg-[#1A1A1A]"
            >
              {/* TITLE */}

              <td className="py-5 pr-6">
                <div className="flex items-start gap-2">
                  <CircleAlert size={16} className="text-[#FE9A00]" />

                  <div>
                    <p className="text-white font-medium">{alert.title}</p>
                    <p className="text-[#A1A1A1] text-xs">{alert.message}</p>
                  </div>
                </div>
              </td>

              {/* PRIORITY */}

              <td className="py-5">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${getPriorityStyle(
                    alert.priority
                  )}`}
                >
                  {alert.priority}
                </span>
              </td>

              {/* TARGET */}

              <td className="py-5">
                <div className="flex items-center gap-2 text-[#A1A1A1]">
                  {getTargetIcon(alert.target)}
                  {alert.target}
                </div>
              </td>

              {/* RECIPIENTS */}

              <td className="py-5 text-white">
                <p>{alert.recipients}</p>
                <p className="text-xs text-[#777]">{alert.read}</p>
              </td>

              {/* DATE */}

              <td className="py-5 text-[#A1A1A1]">
                <p>{alert.date}</p>
                <p className="text-xs">{alert.time}</p>
              </td>

              {/* ACTION */}

              <td className="py-5">
                <div className="flex flex-col gap-1">
                  <span
                    className={`px-3 py-1 text-xs rounded-full w-fit ${getActionStyle(
                      alert.action
                    )}`}
                  >
                    {alert.action}
                  </span>

                  {alert.due && (
                    <span className="text-xs text-[#A1A1A1]">{alert.due}</span>
                  )}
                </div>
              </td>

              {/* STATUS */}

              <td className="py-5">
                <span className="bg-[#00C9501A] text-[#00C950] text-xs px-3 py-1 rounded-full">
                  Sent
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAlertsTab;