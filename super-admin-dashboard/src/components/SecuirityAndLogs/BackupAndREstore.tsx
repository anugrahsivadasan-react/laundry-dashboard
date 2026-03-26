import { useEffect, useState } from "react";
import {
  Database,
  Download,
  RefreshCcw,
  HardDrive,
  CheckCircle
} from "lucide-react";

const BASE_URL = "YOUR_BASE_URL_HERE";

type Backup = {
  name: string;
  size: string;
  date: string;
  type: "Automatic" | "Manual";
  status: "Success";
};

const BackupAndREstore = () => {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backups, setBackups] = useState<Backup[]>([]);

  const fetchBackups = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/backups`);
      setBackups(res.data);
    } catch {
      setBackups([
        {
          name: "auto_backup_2026_01_21.sql",
          size: "245 MB",
          date: "2026-01-21 02:00:00",
          type: "Automatic",
          status: "Success",
        },
        {
          name: "manual_backup_2026_01_20.sql",
          size: "242 MB",
          date: "2026-01-20 18:30:00",
          type: "Manual",
          status: "Success",
        },
        {
          name: "auto_backup_2026_01_20.sql",
          size: "241 MB",
          date: "2026-01-20 02:00:00",
          type: "Automatic",
          status: "Success",
        },
      ]);
    }
  };

  const toggleAutoBackup = async () => {
    const newState = !autoBackup;
    setAutoBackup(newState);
    await axios.post(`${BASE_URL}/backup/auto-toggle`, { enabled: newState });
  };

  const createBackup = async () => {
    await axios.post(`${BASE_URL}/backup/create`);
    fetchBackups();
  };

  const restoreBackup = async (name: string) => {
    await axios.post(`${BASE_URL}/backup/restore`, { name });
  };

  const downloadBackup = async (name: string) => {
    const res = await axios.get(`${BASE_URL}/backup/download/${name}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  return (
    <div className="space-y-6 text-white">

      {/* Backup Controls */}
      <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5">

        <div className="flex items-center gap-2 text-sm mb-4">
          <Database className="w-4 h-4 text-gray-400" />
          Backup Controls
        </div>

        {/* Auto Backup */}
        <div className="flex items-center justify-between bg-[#161616] border border-gray-800 rounded-lg p-4 mb-4">
          <div>
            <p className="text-sm">Automatic Daily Backup</p>
            <p className="text-xs text-gray-400">
              Scheduled at 2:00 AM daily
            </p>
          </div>

          <button
            onClick={toggleAutoBackup}
            className={`w-10 h-5 rounded-full flex items-center p-1 ${
              autoBackup ? "bg-white" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-4 h-4 bg-black rounded-full transition ${
                autoBackup ? "ml-auto" : ""
              }`}
            />
          </button>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={createBackup}
            className="flex items-center justify-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
          >
            <HardDrive className="w-4 h-4" />
            Create Manual Backup
          </button>

          <button
            onClick={() => restoreBackup("")}
            className="flex items-center justify-center gap-2 text-sm bg-gray-200 text-black py-2 rounded-lg"
          >
            <RefreshCcw className="w-4 h-4" />
            Restore from Backup
          </button>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5">

        <div className="text-sm mb-4">Backup History</div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">

            <thead className="text-gray-400 border-b border-gray-800">
              <tr>
                <th className="text-left py-2">Backup Name</th>
                <th className="text-left py-2">Size</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {backups.map((backup, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-900 hover:bg-[#161616]"
                >
                  <td className="py-3">{backup.name}</td>

                  <td className="text-gray-400">{backup.size}</td>

                  <td className="text-gray-400">{backup.date}</td>

                  <td>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        backup.type === "Automatic"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-purple-500/10 text-purple-400"
                      }`}
                    >
                      {backup.type}
                    </span>
                  </td>

                  <td>
                    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 w-fit">
                      <CheckCircle className="w-3 h-3" />
                      Success
                    </span>
                  </td>

                  <td className="flex items-center gap-6 ">
                    <Download
                      className="w-4 h-4 cursor-pointer text-blue-500"
                      onClick={() => downloadBackup(backup.name)}
                    />

                    <RefreshCcw
                      className="w-4 h-4 cursor-pointer text-green-400"
                      onClick={() => restoreBackup(backup.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default BackupAndREstore;