import React from "react";

/* ---------- Types (Backend-ready) ---------- */
export type LoginHistoryItem = {
  id: string;
  device: string;
  location: string;
  ip: string;
  time: string;
  status: "success" | "failed";
};

type LoginHistoryProps = {
  data?: LoginHistoryItem[];
};

/* ---------- Dummy Data ---------- */
const dummyLoginHistory: LoginHistoryItem[] = [
  {
    id: "1",
    device: "Chrome on Windows",
    location: "Aluva",
    ip: "192.168.1.100",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "Edappally",
    ip: "192.168.1.101",
    time: "1 day ago",
    status: "success",
  },
  {
    id: "3",
    device: "Chrome on Windows",
    location: "Aluva",
    ip: "192.168.2.50",
    time: "2 days ago",
    status: "failed",
  },
  {
    id: "4",
    device: "Edge on Windows",
    location: "Perumbavoor",
    ip: "192.168.1.100",
    time: "3 days ago",
    status: "success",
  },
];

/* ---------- Component ---------- */
const LoginHistoryTab: React.FC<LoginHistoryProps> = ({
  data = dummyLoginHistory, // fallback for UI
}) => {
  return (
    <div className="p-6">
    <div className="bg-white rounded-xl p-6">
      {/* Title */}
      <p className="text-[18px] font-bold text-[18px] leading-[28px] mb-4">
        Recent Login Activity
      </p>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr className="font-bold text-[14px] leading-[20px] text-[#4A5565] bg-gray-50">
              <th className="text-left  px-4 py-3">
                Device
              </th>
              <th className="text-left px-4 py-3">
                Location
              </th>
              <th className="text-left px-4 py-3">
                IP Address
              </th>
              <th className="text-left px-4 py-3">
                Time
              </th>
              <th className="text-left px-4 py-3">
                Status
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t font-arimo text-[14px] leading-[20px] text-[#101828]"
              >
                <td className="px-4 py-6 ">
                  {item.device}
                </td>
                <td className="px-4 py-3">
                  {item.location}
                </td>
                <td className="px-4 py-3 font-mono text-xs">
                  {item.ip}
                </td>
                <td className="px-4 py-3">
                  {item.time}
                </td>
                <td className="px-4 py-3">
                  {item.status === "success" ? (
                    <span className=" text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      Success
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full">
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
    </div>
  );
};

export default LoginHistoryTab;
