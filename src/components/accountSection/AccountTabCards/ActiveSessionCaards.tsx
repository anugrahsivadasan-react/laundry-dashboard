import React from "react";
import {
  Monitor,
  Smartphone,
  Laptop,
  LogOut,
} from "lucide-react";

/* ---------- Types (Backend-ready) ---------- */
export type Session = {
  id: string;
  device: "windows" | "iphone" | "mac";
  title: string;
  browser: string;
  os: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
};

type ActiveSessionsProps = {
  sessions?: Session[];
  onEndSession?: (sessionId: string) => void;
  onEndAllSessions?: () => void;
};

/* ---------- Dummy Data (UI only) ---------- */
const dummySessions: Session[] = [
  {
    id: "1",
    device: "windows",
    title: "Chrome on Windows",
    browser: "Chrome 120.0",
    os: "Windows 11",
    location: "Aluva",
    ip: "192.168.1.100",
    lastActive: "Active now",
    isCurrent: true,
  },
  {
    id: "2",
    device: "iphone",
    title: "Safari on iPhone",
    browser: "Safari 17.2",
    os: "iOS 17",
    location: "Edappally",
    ip: "192.168.1.101",
    lastActive: "5 minutes ago",
    isCurrent: false,
  },
  {
    id: "3",
    device: "mac",
    title: "Chrome on MacBook",
    browser: "Chrome 119.0",
    os: "macOS 14",
    location: "Aluva",
    ip: "192.168.1.102",
    lastActive: "2 hours ago",
    isCurrent: false,
  },
];

/* ---------- Helper ---------- */
const getDeviceIcon = (device: Session["device"]) => {
  switch (device) {
    case "iphone":
      return <Smartphone className="w-4 h-4 text-blue-600" />;
    case "mac":
      return <Laptop className="w-4 h-4 text-blue-600" />;
    default:
      return <Monitor className="w-4 h-4 text-blue-600" />;
  }
};

/* ---------- Component ---------- */
const ActiveSessions: React.FC<ActiveSessionsProps> = ({
  sessions = dummySessions, // ✅ Dummy data fallback
  onEndSession,
  onEndAllSessions,
}) => {
  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          You have {sessions.length} active sessions
        </p>

        <button
          onClick={onEndAllSessions}
          className="flex items-center gap-1 text-[14px] font-medium text-[#E7000B] border border-red-200 rounded-md px-3 py-1.5 hover:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4" />
          End All Sessions
        </button>
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`rounded-xl border bg-[#FFFFFF] p-4 flex items-start justify-between ${
              session.isCurrent
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            {/* Left */}
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                {getDeviceIcon(session.device)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">
                    {session.title}
                  </p>
                  {session.isCurrent && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  Browser: {session.browser}
                </p>
                <p className="text-xs text-gray-500">
                  OS: {session.os}
                </p>
                <p className="text-xs text-gray-500">
                  {session.location} • {session.ip}
                </p>
                <p className="text-xs text-gray-500">
                  {session.lastActive}
                </p>
              </div>
            </div>

            {/* Right */}
            {!session.isCurrent && (
              <button
                onClick={() => onEndSession?.(session.id)}
                className="text-[14px] font-medium text-[#E7000B] border border-red-200 px-3 py-1.5 rounded-md hover:bg-red-50 transition"
              >
                End Session
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveSessions;
