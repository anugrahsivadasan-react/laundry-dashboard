import React, { useState } from "react"
import { Send, Bell, Save, ChevronDown } from "lucide-react"

const CreateNotificationCard = () => {
  const [notificationType, setNotificationType] = useState("System Alert")
  const [audience, setAudience] = useState("All Users")
  const [priority, setPriority] = useState("Normal")

  return (
    <div
      className="
        w-full
        bg-[#171717]
        border border-[#262626]
        rounded-[14px]
        p-6
        text-white
      "
      style={{ minHeight: "565px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Bell size={18} className="text-blue-400" />
        <h2 className="text-lg font-semibold">Create New Notification</h2>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-6">
          {/* Notification Type */}
          <div>
            <label className="text-sm text-gray-400">Notification Type</label>
            <div className="relative mt-2">
              <select
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
                className="
                  w-full
                  bg-[#1F1F1F]
                  border border-[#262626]
                  rounded-lg
                  px-4 py-2
                  text-sm
                  appearance-none
                  outline-none
                "
              >
                <option>System Alert</option>
                <option>Promotion</option>
                <option>Reminder</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="text-sm text-gray-400">Target Audience</label>
            <div className="relative mt-2">
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="
                  w-full
                  bg-[#1F1F1F]
                  border border-[#262626]
                  rounded-lg
                  px-4 py-2
                  text-sm
                  appearance-none
                  outline-none
                "
              >
                <option>All Users</option>
                <option>Active Users</option>
                <option>Inactive Users</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Notification Title */}
        <div>
          <label className="text-sm text-gray-400">Notification Title</label>
          <input
            type="text"
            placeholder="Enter notification title"
            className="
              w-full
              mt-2
              bg-[#1F1F1F]
              border border-[#262626]
              rounded-lg
              px-4 py-2
              text-sm
              outline-none
              focus:border-blue-500
            "
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-sm text-gray-400">Message</label>
          <textarea
            rows={4}
            placeholder="Enter your message here..."
            className="
              w-full
              mt-2
              bg-[#1F1F1F]
              border border-[#262626]
              rounded-lg
              px-4 py-2
              text-sm
              outline-none
              focus:border-blue-500
              resize-none
            "
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-6">
          {/* Priority */}
          <div>
            <label className="text-sm text-gray-400">Priority</label>
            <div className="relative mt-2">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="
                  w-full
                  bg-[#1F1F1F]
                  border border-[#262626]
                  rounded-lg
                  px-4 py-2
                  text-sm
                  appearance-none
                  outline-none
                "
              >
                <option>Normal</option>
                <option>High</option>
                <option>Critical</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="text-sm text-gray-400">Schedule (Optional)</label>
            <input
              type="datetime-local"
              onChange={(e) => console.log(e.target.value)}
              className="
                w-full
                mt-2
                bg-[#1F1F1F]
                border border-[#262626]
                rounded-lg
                px-4 py-2
                text-sm
                outline-none
              "
            />
          </div>
        </div>

        {/* Delivery Channels */}
        <div>
          <label className="text-sm text-gray-400">Delivery Channels</label>

          <div className="flex gap-10 mt-3 text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              In-App
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Email
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              SMS
            </label>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          className="
            flex items-center gap-2
            px-4 py-2
            bg-gray-200
            text-black
            rounded-lg
            text-sm
            font-medium
            hover:opacity-90
          "
        >
          <Save size={16} />
          Save as Draft
        </button>

        <button
          className="
            flex items-center gap-2
            px-5 py-2
            rounded-lg
            text-sm
            font-medium
            text-white
            bg-gradient-to-r
            from-[#155DFC]
            to-[#9810FA]
            hover:opacity-90
          "
        >
          <Send size={16} />
          Send Notification
        </button>
      </div>
    </div>
  )
}

export default CreateNotificationCard
