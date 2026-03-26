import { useEffect, useState } from "react";
import { Lock, Download, User, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const BASE_URL = "YOUR_BASE_URL_HERE";

type LoginLog = {
  user: string;
  timestamp: string;
  ip: string;
  device: string;
  status: "Success" | "Failed";
};

const LoginHistory = () => {
  const [logs, setLogs] = useState<LoginLog[]>([]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/login-history`);
      setLogs(res.data);
    } catch {
      // fallback demo data
      setLogs([
        {
          user: "Super Admin",
          timestamp: "2026-01-21 08:30:00",
          ip: "192.168.1.100",
          device: "Chrome on Windows",
          status: "Success",
        },
        {
          user: "Sarah Johnson",
          timestamp: "2026-01-21 09:15:00",
          ip: "192.168.1.105",
          device: "Safari on MacOS",
          status: "Success",
        },
        {
          user: "Mike Chen",
          timestamp: "2026-01-20 23:45:00",
          ip: "203.45.67.89",
          device: "Firefox on Linux",
          status: "Failed",
        },
      ]);
    }
  };

  const exportLogs = async () => {
    const res = await axios.get(`${BASE_URL}/login-history/export`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "login_history.csv");
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
          <Lock className="w-4 h-4 text-gray-400" />
          Login History
        </div>

        <button
          onClick={exportLogs}
          className="flex items-center gap-2 text-xs bg-white text-black border border-gray-700 px-3 py-1.5 rounded-md hover:bg-[#242425]"
        >
          <Download className="w-3 h-3" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="text-gray-400 border-b border-gray-800">
            <tr>
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Timestamp</th>
              <th className="text-left py-2">IP Address</th>
              <th className="text-left py-2">Device</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className="border-b border-gray-900 hover:bg-[#161616]"
              >
                {/* User */}
              <td className="py-3">
  <div className="flex items-center gap-2">
    <User className="w-3 h-3 text-gray-500" />
    {log.user}
  </div>
</td>

<td className="py-3 text-gray-400">
  <div className="flex items-center gap-1">
    <Clock className="w-3 h-3" />
    {log.timestamp}
  </div>
</td>

                {/* IP */}
                <td className="text-gray-400">{log.ip}</td>

                {/* Device */}
                <td className="text-gray-400">{log.device}</td>

                {/* Status */}
                <td>
                  {log.status === "Success" ? (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 w-fit">
                      <CheckCircle className="w-3 h-3" />
                      Success
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 w-fit">
                      <AlertTriangle className="w-3 h-3" />
                      Failed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default LoginHistory;