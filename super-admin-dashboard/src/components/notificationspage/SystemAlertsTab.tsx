import {
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Info,
  Users,
  UserCog,
  Server,
} from "lucide-react";

interface Alert {
  title: string;
  message: string;
  severity: "High" | "Info" | "Warning" | "Critical";
  target: string;
  recipients: string;
  read: string;
  date: string;
  time: string;
  status: "Sent";
}

const alerts: Alert[] = [
  {
    title: "Server Maintenance Scheduled",
    message:
      "Scheduled maintenance on Jan 25, 2026 from 2:00 AM to 4:00 AM EST. Services will be temporarily unavailable.",
    severity: "High",
    target: "All Users",
    recipients: "3,247",
    read: "87% read",
    date: "2026-01-20",
    time: "10:30 AM",
    status: "Sent",
  },
  {
    title: "Database Backup Completed",
    message:
      "Automated database backup completed successfully. All data is secure.",
    severity: "Info",
    target: "All Admins",
    recipients: "28",
    read: "100% read",
    date: "2026-01-23",
    time: "3:15 AM",
    status: "Sent",
  },
  {
    title: "High Server Load Detected",
    message:
      "Server experiencing high traffic. Performance may be affected. Auto-scaling initiated.",
    severity: "Warning",
    target: "Tech Team",
    recipients: "8",
    read: "100% read",
    date: "2026-01-22",
    time: "2:45 PM",
    status: "Sent",
  },
  {
    title: "Payment Gateway Update",
    message:
      "Stripe payment gateway has been updated to the latest version.",
    severity: "Info",
    target: "All Admins",
    recipients: "28",
    read: "92% read",
    date: "2026-01-21",
    time: "11:20 AM",
    status: "Sent",
  },
  {
    title: "Security Patch Applied",
    message:
      "Critical security patch has been successfully applied to all systems.",
    severity: "Critical",
    target: "All Users",
    recipients: "3,247",
    read: "95% read",
    date: "2026-01-19",
    time: "4:00 AM",
    status: "Sent",
  },
  {
    title: "Backup System Online",
    message:
      "Secondary backup systems are now online and operational.",
    severity: "Info",
    target: "Tech Team",
    recipients: "8",
    read: "100% read",
    date: "2026-01-18",
    time: "9:30 AM",
    status: "Sent",
  },
];

const getSeverityStyle = (severity: string) => {
  switch (severity) {
    case "High":
      return "bg-[#FE9A001A] text-[#FE9A00]";
    case "Info":
      return "bg-[#2B7FFF1A] text-[#2B7FFF]";
    case "Warning":
      return "bg-[#FACC151A] text-[#FACC15]";
    case "Critical":
      return "bg-[#EF44441A] text-[#EF4444]";
    default:
      return "";
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "High":
      return <AlertTriangle size={16} className="text-[#FE9A00]" />;
    case "Info":
      return <Info size={16} className="text-[#2B7FFF]" />;
    case "Warning":
      return <AlertTriangle size={16} className="text-[#FACC15]" />;
    case "Critical":
      return <ShieldAlert size={16} className="text-[#EF4444]" />;
    default:
      return null;
  }
};

const getTargetIcon = (target: string) => {
  if (target.includes("Users")) return <Users size={16} />;
  if (target.includes("Admins")) return <UserCog size={16} />;
  if (target.includes("Tech")) return <Server size={16} />;
  return <Users size={16} />;
};

const SystemAlertsTab = () => {
  return (
    <div
      className="
      w-full
      bg-[#171717]
      border border-[#262626]
      rounded-[14px]
      p-6
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-white font-semibold text-[16px] flex items-center gap-2">
            <ShieldAlert size={18} className="text-red-500" />
            System Alerts & Notifications
          </h2>
          <p className="text-[#A1A1A1] text-sm">
            System-generated alerts for maintenance, security, and operational updates
          </p>
        </div>

        <span className="bg-[#EF44441A] text-[#EF4444] text-xs px-3 py-1 rounded-full">
          6 Alerts
        </span>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm text-left">
        <thead className="text-[#A1A1A1] border-b border-[#262626]">
          <tr>
            <th className="pb-3">Title & Message</th>
            <th className="pb-3">Severity</th>
            <th className="pb-3">Target</th>
            <th className="pb-3">Recipients</th>
            <th className="pb-3">Date & Time</th>
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
                  {getSeverityIcon(alert.severity)}

                  <div>
                    <p className="text-white font-medium">{alert.title}</p>
                    <p className="text-[#A1A1A1] text-xs">{alert.message}</p>
                  </div>
                </div>
              </td>

              {/* SEVERITY */}
              <td className="py-5">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${getSeverityStyle(
                    alert.severity
                  )}`}
                >
                  {alert.severity}
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

export default SystemAlertsTab;