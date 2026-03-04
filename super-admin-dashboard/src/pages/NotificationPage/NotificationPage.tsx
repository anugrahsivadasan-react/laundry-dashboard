import { AlertCircle, Bell, MessageSquare, User } from "lucide-react";
import NotificationStats from "../../components/notificationspage/NotificationStats";
import CreateNotificationCard from "../../components/notificationspage/CreateNotificationCard";

const statsData = [
  {
    title: "Total sent",
    value: 1247,
    icon: <Bell className="w-5 h-5 text-[#AD46FF]" />,
    iconBg: "bg-[#AD46FF1A]",
  },
  {
    title: "This Month",
    value: 89,
    icon: <MessageSquare className="w-5 h-5 text-[#00C950]" />,
    iconBg: "bg-[#00C9501A]",
  },
  {
    title: "Total Recipients",
    value: 4187,
    icon: <User className="w-5 h-5 text-[#2B7FFF]" />,
    iconBg: "bg-[#2B7FFF1A]",
  },
  {
    title: "System Alerts",
    value: 23,
    icon: <AlertCircle className="w-5 h-5 text-[#FE9A00]" />,
    iconBg: "bg-[#FE9A001A]",
  },
];

const NotificationPage = () => {
  return (
    <div className="p-6 bg-[#0A0A0A] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Notifications & Communication
          </h1>
          <p className="text-[14px] text-[#A1A1A1]">
            Send notifications and communicate with users
          </p>
        </div>
      </div>

      {/* STATS */}
      <NotificationStats stats={statsData} />

<section className="mt-8">
    <CreateNotificationCard />
</section>

    </div>
  );
};

export default NotificationPage;