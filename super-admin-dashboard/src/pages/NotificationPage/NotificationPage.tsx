import { AlertCircle, Bell, MessageSquare, User } from "lucide-react"
import NotificationStats from "../../components/notificationspage/NotificationStats"
import CreateNotificationCard from "../../components/notificationspage/CreateNotificationCard"
import { useEffect, useState } from "react"

import NotificationsPanel from "../../components/notificationspage/NotificationsPanel"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchNotificationStats } from "../../redux/action/notificationThunks"
import socket from "../../config/soket"

export interface NotificationStatCard {
  title: string
  value: number
  icon: React.ReactNode
  iconBg: string
}

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "system" | "admin" | "promotional"
  >("all")
  const dispatch = useAppDispatch()
  const { stats, loading } = useAppSelector((state) => state.notifications)

  useEffect(() => {
    dispatch(fetchNotificationStats())
  }, [dispatch])

  useEffect(() => {
    if (!socket) return

    socket.on("notification-change", (data) => {
      // Example: update state
      dispatch(fetchNotificationStats())
    })

    return () => {
      socket.off("notification-change")
    }
  }, [socket])

  console.log(stats)

  const statsDatas: NotificationStatCard[] = [
    {
      title: "Total sent",
      value: stats?.totalSentNotifications ?? 0,
      icon: <Bell className="w-5 h-5 text-[#AD46FF]" />,
      iconBg: "bg-[#AD46FF1A]",
    },
    {
      title: "This Month",
      value: stats?.thisMonthSentNotifications ?? 0,
      icon: <MessageSquare className="w-5 h-5 text-[#00C950]" />,
      iconBg: "bg-[#00C9501A]",
    },
    {
      title: "Total Recipients",
      value: stats?.totalRecipients ?? 0,
      icon: <User className="w-5 h-5 text-[#2B7FFF]" />,
      iconBg: "bg-[#2B7FFF1A]",
    },
    {
      title: "System Alerts",
      value: stats?.systemAlertCount ?? 0,
      icon: <AlertCircle className="w-5 h-5 text-[#FE9A00]" />,
      iconBg: "bg-[#FE9A001A]",
    },
  ]

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
      <NotificationStats stats={statsDatas} />

      <section className="mt-8">
        <CreateNotificationCard />
      </section>

      <section className="mt-8">
        <NotificationsPanel />
      </section>
    </div>
  )
}

export default NotificationPage
