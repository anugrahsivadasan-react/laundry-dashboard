import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  Users,
  UserCog,
  Server,
} from "lucide-react";

type Severity = "High" | "Info" | "Warning" | "Critical";

const normalizeSeverity = (s: string): Severity => {
  const map: Record<string, Severity> = {
    high: "High",
    info: "Info",
    warning: "Warning",
    critical: "Critical",
  };
  return map[s?.toLowerCase()] || "Info";
};

interface AlertItem {
  id: number;
  title: string;
  message: string;
  severity: string;
  target: "All Users" | "All Admins" | "Tech Team";
  recipients: number;
  readPercent: number;
  date: string;
  time: string;
  status: "Sent";
}

interface Props {
  data: AlertItem[];
}

const severityStyles: Record<Severity, string> = {
  High: "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  Info: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  Warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
  Critical: "bg-red-500/10 text-red-400 border border-red-500/30",
};

const getLeftIcon = (title: string) => {
  if (title.includes("Maintenance"))
    return <AlertCircle className="w-4 h-4 text-orange-400" />;
  if (title.includes("Backup Completed"))
    return <CheckCircle2 className="w-4 h-4 text-green-400" />;
  if (title.includes("Load"))
    return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
  if (title.includes("Payment"))
    return <Info className="w-4 h-4 text-blue-400" />;
  if (title.includes("Security"))
    return <ShieldAlert className="w-4 h-4 text-red-400" />;
  return <CheckCircle2 className="w-4 h-4 text-green-400" />;
};

const getTargetIcon = (target: string) => {
  if (target === "All Users")
    return <Users className="w-4 h-4 mr-2 text-gray-400" />;
  if (target === "All Admins")
    return <UserCog className="w-4 h-4 mr-2 text-gray-400" />;
  return <Server className="w-4 h-4 mr-2 text-gray-400" />;
};

const SystemAlerts: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full  rounded-xl  shadow-xl">
      
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <h2 className="text-white text-base font-semibold">
              System Alerts & Notifications
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              System-generated alerts for maintenance, security, and operational updates
            </p>
          </div>
        </div>

        <span className="bg-red-500/10 text-red-400 text-xs px-3 py-1 rounded-full border border-red-500/30">
          {data.length} Alerts
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 px-6 py-3 text-xs text-gray-400 border-b border-gray-800">
        <div className="col-span-2">Title & Message</div>
        <div>Severity</div>
        <div>Target</div>
        <div>Recipients</div>
        <div>Date & Time</div>
        <div>Status</div>
      </div>

      {/* Table Body */}
      <div>
        {data.map((item) => {
          const severity = normalizeSeverity(item.severity);

          return (
            <div
              key={item.id}
              className="grid grid-cols-7 px-6 py-4 border-b border-gray-800 hover:bg-white/5 transition"
            >
              {/* Title */}
              <div className="col-span-2 flex gap-3 items-start">
                <div className="mt-1">{getLeftIcon(item.title)}</div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {item.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>

              {/* Severity */}
              <div className="flex items-center">
                <span
                  className={`text-xs px-2 py-1 rounded-md ${severityStyles[severity]}`}
                >
                  {severity}
                </span>
              </div>

              {/* Target */}
              <div className="flex items-center text-gray-300 text-sm">
                {getTargetIcon(item.target)}
                {item.target}
              </div>

              {/* Recipients */}
              <div className="flex flex-col text-sm">
                <span className="text-white">
                  {item.recipients.toLocaleString()}
                </span>
                <span className="text-gray-400 text-xs">
                  {item.readPercent}% read
                </span>
              </div>

              {/* Date */}
              <div className="text-sm text-gray-300 leading-tight">
                <div>{item.date}</div>
                <div className="text-gray-500 text-xs mt-1">
                  {item.time}
                </div>
              </div>

              {/* Status */}
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

export default SystemAlerts;