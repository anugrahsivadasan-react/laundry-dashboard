import React, { useEffect, useState } from "react"
import AllNotifications from "./AllNotifications"
import SystemAlerts from "./SystemAlerts"
import AdminAlerts from "./AdminAlerts"
import PromotionalAlerts from "./PromotionalAlerts"
import { type Notification } from "./types"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchAdminNotifications } from "../../redux/action/notificationThunks"
import socket from "../../config/soket"

const dummyData: Notification[] = [
  {
    id: 1,
    title: "Customer Complaint Escalated",
    message: "High-priority complaint #CR-2456 requires immediate attention.",
    target: "Aluva Branch Admin",
    recipients: 1,
    date: "2026-01-23",
    time: "3:20 PM",
    status: "Sent",
    type: "admin",
  },
  {
    id: 2,
    title: "Database Backup Completed",
    message: "Automated database backup completed successfully.",
    target: "All Admins",
    recipients: 28,
    date: "2026-01-23",
    time: "3:15 AM",
    status: "Sent",
    type: "system",
  },
  {
    id: 3,
    title: "High Server Load Detected",
    message: "Performance may be affected.",
    target: "Tech Team",
    recipients: 8,
    date: "2026-01-22",
    time: "2:45 PM",
    status: "Sent",
    type: "system",
  },
  {
    id: 4,
    title: "Spring Cleaning Sale",
    message: "Up to 35% off!",
    target: "All Customers",
    recipients: 2847,
    date: "2026-01-22",
    time: "12:00 PM",
    status: "Sent",
    type: "promo",
  },
]

const NotificationsPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState("all")
  const { notifications } = useAppSelector((s) => s.notifications)

  useEffect(() => {
    dispatch(fetchAdminNotifications())
  }, [dispatch])

  useEffect(() => {
    if (!socket) return

    socket.on("notification-change", (data) => {
      dispatch(fetchAdminNotifications())
    })

    return () => {
      socket.off("notification-change")
    }
  }, [socket])
  console.log(notifications)

  const filleredSystemNotification = notifications.filter(
    (d) => d.type === "system",
  )
  const filleredAdminNotification = notifications.filter(
    (d) => d.type === "system",
  )
  const filleredPermoNotification = notifications.filter(
    (d) => d.type === "promo",
  )

  const tabs = [
    { key: "all", label: `All Notifications (${notifications.length})` },
    {
      key: "system",
      label: `System Alerts (${filleredSystemNotification.length})`,
    },
    {
      key: "admin",
      label: `Admin Alerts (${filleredAdminNotification.length})`,
    },
    {
      key: "promo",
      label: `Promotional (${filleredPermoNotification.length})`,
    },
  ]
  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white p-6">
      {/* Tabs */}
      <div className="flex gap-2 bg-[#1A1A1A] p-1 rounded-full w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1.5 text-sm rounded-full ${
              activeTab === tab.key
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#111111] rounded-xl p-4 border border-white/10">
        <div className="flex flex-col gap-4">
          {activeTab === "all" && <AllNotifications data={notifications} />}
          {activeTab === "system" && (
            <SystemAlerts data={filleredSystemNotification} />
          )}
          {activeTab === "admin" && (
            <AdminAlerts data={filleredAdminNotification} />
          )}
          {activeTab === "promo" && (
            <PromotionalAlerts data={filleredPermoNotification} />
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationsPanel
