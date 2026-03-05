import {
  Users,
  ShieldAlert,
  User,
  Building,
} from "lucide-react";

interface Notification {
  title: string;
  message: string;
  target: string;
  recipients: string;
  date: string;
  time: string;
  status: "Sent";
}

const notifications: Notification[] = [
  {
    title: "Customer Complaint Escalated",
    message:
      "High-priority customer complaint #CC-2456 requires immediate attention.",
    target: "Aluva Branch Admin",
    recipients: "1",
    date: "2026-01-23",
    time: "3:20 PM",
    status: "Sent",
  },
  {
    title: "Database Backup Completed",
    message:
      "Automated database backup completed successfully. All data is secure.",
    target: "All Admins",
    recipients: "28",
    date: "2026-01-23",
    time: "3:15 AM",
    status: "Sent",
  },
  {
    title: "High Server Load Detected",
    message:
      "Server experiencing high traffic. Performance may be affected.",
    target: "Tech Team",
    recipients: "8",
    date: "2026-01-22",
    time: "2:45 PM",
    status: "Sent",
  },
  {
    title: "Spring Cleaning Sale Coming Soon!",
    message:
      "Get ready! Our biggest sale starts March 20. Up to 35% off services.",
    target: "All Customers",
    recipients: "2,847",
    date: "2026-01-22",
    time: "12:00 PM",
    status: "Sent",
  },
];

const getTargetIcon = (target: string) => {
  if (target.includes("Admin")) return <ShieldAlert size={16} />;
  if (target.includes("Customers")) return <Users size={16} />;
  if (target.includes("Team")) return <User size={16} />;
  return <Building size={16} />;
};

const AllNotificationTab = () => {
  return (
    <div
      className="
      bg-[#171717]
      border border-[#262626]
      rounded-[14px]
      pt-[24px]
      pl-[24px]
      w-full
      "
    >
      {/* TITLE */}
      <h2 className="text-white text-[16px] font-semibold mb-6">
        All Notification History
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#A1A1A1]">

          {/* HEADER */}
          <thead className="border-b border-[#262626] text-xs uppercase">
            <tr>
              <th className="pb-4">Title & Message</th>
              <th className="pb-4">Target</th>
              <th className="pb-4">Recipients</th>
              <th className="pb-4">Date & Time</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {notifications.map((item, index) => (
              <tr
                key={index}
                className="border-b border-[#262626] hover:bg-[#1A1A1A]"
              >
                {/* TITLE */}
                <td className="py-5 pr-6">
                  <p className="text-white text-[14px] font-medium">
                    {item.title}
                  </p>
                  <p className="text-[#A1A1A1] text-[12px]">
                    {item.message}
                  </p>
                </td>

                {/* TARGET */}
                <td className="py-5 pr-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[#A1A1A1]">
                      {getTargetIcon(item.target)}
                    </span>
                    {item.target}
                  </div>
                </td>

                {/* RECIPIENTS */}
                <td className="py-5 pr-6 text-white">
                  {item.recipients}
                </td>

                {/* DATE */}
                <td className="py-5 pr-6">
                  <p>{item.date}</p>
                  <p className="text-xs text-[#777]">{item.time}</p>
                </td>

                {/* STATUS */}
                <td className="py-5">
                  <span
                    className="
                    text-[#00C950]
                    bg-[#00C9501A]
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    "
                  >
                    Sent
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

export default AllNotificationTab;