import { useEffect, useState } from "react";
import { Activity, RefreshCw, Download, User, Clock } from "lucide-react";

const BASE_URL = "YOUR_BASE_URL_HERE";

type Log = {
  user: string;
  action: string;
  details: string;
  timestamp: string;
  ip: string;
  type: "Create" | "Update" | "Delete" | "System" | "Security";
};

const badgeStyles: Record<string, string> = {
  Create: "bg-blue-500/10 text-blue-400",
  Update: "bg-blue-500/10 text-blue-400",
  Delete: "bg-yellow-500/10 text-yellow-400",
  System: "bg-purple-500/10 text-purple-400",
  Security: "bg-red-500/10 text-red-400",
};

const ActivityLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/logs`);
      setLogs(res.data);
    } catch {
      setLogs([
        {
          user: "Super Admin",
          action: "Created new branch",
          details: "Added Aluva Branch",
          timestamp: "2026-01-21 14:32:15",
          ip: "192.168.1.100",
          type: "Create",
        },
        {
          user: "Sarah Johnson",
          action: "Updated pricing",
          details: "Modified dry cleaning prices",
          timestamp: "2026-01-21 13:15:42",
          ip: "192.168.1.105",
          type: "Update",
        },
        {
          user: "John Smith",
          action: "Deleted customer",
          details: "Removed inactive customer #1234",
          timestamp: "2026-01-21 11:28:33",
          ip: "192.168.1.102",
          type: "Delete",
        },
        {
          user: "System",
          action: "Auto backup completed",
          details: "Database backup successful",
          timestamp: "2026-01-21 02:00:00",
          ip: "System",
          type: "System",
        },
        {
          user: "Mike Chen",
          action: "Login attempt failed",
          details: "Invalid password - Account locked",
          timestamp: "2026-01-20 23:45:12",
          ip: "203.45.67.89",
          type: "Security",
        },
      ]);
    }
  };

  const exportLogs = async () => {
    const res = await axios.get(`${BASE_URL}/logs/export`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "activity_logs.csv");
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5 text-white">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Activity className="w-4 h-4 text-gray-400" />
          System Activity Logs
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchLogs}
            className="flex items-center gap-2 text-xs bg-white text-black border border-gray-700 px-3 py-1.5 rounded-md hover:bg-[#242425]"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>

          <button
            onClick={exportLogs}
            className="flex items-center gap-2 text-xs bg-white text-black border border-gray-700 px-3 py-1.5 rounded-md hover:bg-[#242425]"
          >
            <Download className="w-3 h-3" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="text-gray-400 border-b border-gray-800">
            <tr>
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Action</th>
              <th className="text-left py-2">Details</th>
              <th className="text-left py-2">Timestamp</th>
              <th className="text-left py-2">IP Address</th>
              <th className="text-left py-2">Type</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className="border-b border-gray-900 hover:bg-[#161616]"
              >
                <td className="py-3 flex items-center gap-2">
                  <User className="w-3 h-3 text-gray-500" />
                  {log.user}
                </td>

                <td>{log.action}</td>

                <td className="text-gray-400">{log.details}</td>

                <td className="flex items-center gap-1 text-gray-400 py-3">
                  <Clock className="w-3 h-3" />
                  {log.timestamp}
                </td>

                <td className="text-gray-400">{log.ip}</td>

                <td>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      badgeStyles[log.type]
                    }`}
                  >
                    {log.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogs;