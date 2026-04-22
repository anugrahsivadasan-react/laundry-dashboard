import React from "react"
import { Megaphone, Users, UserPlus, UserCheck, Crown } from "lucide-react"
import type { AdminNotification } from "../../redux/interfaceType/notificationTypes"

interface Campaign {
  id: number
  title: string
  message: string
  campaign: string
  target: string
  recipients: number
  date: string
  time: string
  clickRate: string
  convertRate: string
  revenue: string
  status: "Sent"
}

interface Props {
  data: AdminNotification[]
}

const getTargetIcon = (target: string) => {
  if (target === "All Users")
    return <Users className="w-4 h-4 mr-2 text-gray-400" />
  if (target === "New Customers")
    return <UserPlus className="w-4 h-4 mr-2 text-gray-400" />
  if (target === "Selected Users")
    return <UserCheck className="w-4 h-4 mr-2 text-gray-400" />
  return <Crown className="w-4 h-4 mr-2 text-gray-400" />
}

const PromotionalAlerts: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full  rounded-xl  shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <div className="flex items-start gap-3">
          <Megaphone className="w-5 h-5 text-purple-500 mt-0.5" />
          <div>
            <h2 className="text-white text-base font-semibold">
              Promotional Campaigns
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Marketing campaigns and promotional notifications sent to
              customers
            </p>
          </div>
        </div>

        <span className="bg-purple-500/10 text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-500/30">
          {data.length} Campaigns
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-10 px-6 py-3 text-xs text-gray-400 border-b border-gray-800">
        <div className="col-span-2">Title & Message</div>
        <div className="col-span-2">Campaign</div>
        <div className="col-span-2">Target</div>
        <div>Recipients</div>
        <div>Date & Time</div>
        <div>Performance</div>
        <div>Status</div>
      </div>

      {/* Table Body */}
      <div>
        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-10 px-6 py-4 border-b border-gray-800 hover:bg-white/5 transition"
          >
            {/* Title */}
            <div className="col-span-2 flex gap-3 items-start">
              <Megaphone className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <p className="text-white text-sm font-medium">{item.title}</p>
                <p className="text-gray-400 text-xs mt-1">{item.message}</p>
              </div>
            </div>

            {/* Campaign */}
            <div className="flex items-center col-span-2 text-gray-300 text-sm">
              {item.campaign}
            </div>

            {/* Target */}
            <div className="flex items-center col-span-2 text-gray-300 text-sm">
              {getTargetIcon(item.target)}
              {item.target}
            </div>

            {/* Recipients */}
            <div className="text-white text-sm">
              {item.recipients.toLocaleString()}
            </div>

            {/* Date */}
            <div className="text-sm text-gray-300">
              <div>{item.date}</div>
              <div className="text-gray-500 text-xs mt-1">{item.time}</div>
            </div>

            {/* Performance */}
            <div className="text-xs">
              <div className="text-gray-300">Click: {item.clickRate}</div>
              <div className="text-gray-400">Convert: {item.convertRate}</div>
              <div className="text-green-400 mt-1">{item.revenue}</div>
            </div>

            {/* Status */}
            <div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.status === "Sent"
                    ? "bg-green-600/20 text-green-400"
                    : item.status === "Scheduled"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-gray-600/20 text-gray-400"
                }`}
                title={!item?.scheduledAt ? "" : item?.scheduledAt}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="px-6 py-4 bg-[#111318] rounded-b-xl">
        <p className="text-gray-400 text-sm mb-4">
          Campaign Performance Summary
        </p>

        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-gray-500 text-xs">Total Sent</p>
            <p className="text-white text-lg font-semibold">10,707</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Avg Click Rate</p>
            <p className="text-white text-lg font-semibold">44.8%</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Avg Conversion</p>
            <p className="text-white text-lg font-semibold">22.7%</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Total Revenue</p>
            <p className="text-green-400 text-lg font-semibold">$40,000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromotionalAlerts
