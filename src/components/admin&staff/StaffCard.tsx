import React from "react";

export type StaffTabType = "admin" | "delivery" | "roles";

interface StaffCardProps {
  type: StaffTabType;

  // Common
  name: string;
  status?: string;
  phone?: string;

  // Admin / Staff
  role?: string;
  email?: string;
  branch?: string;
  lastLogin?: string;

  // Delivery Staff
  vehicle?: string;
  assigned?: number;
  completed?: number;

  // Roles & Permissions
  permissionsData?: {
    role: string;
    description: string;
    usersCount: number;
    badgeColor: "purple" | "blue" | "green";
    permissions: string[];
  }[];
}


const StaffCard: React.FC<StaffCardProps> = (props) => {
  const initials = props.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  /* ---------------- ADMIN & STAFF CARD ---------------- */
  if (props.type === "admin") {
    return (
      <div className="w-[1708.54px] h-[172.89px] bg-white border-[1.25px] border-gray-200 rounded-[14px] px-[23.98px] py-[23.98px] flex justify-between">
        {/* Left */}
        <div className="flex gap-6">
          <div className="w-[52px] h-[52px] rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
            {initials}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-[16px] font-semibold">{props.name}</h3>

              <span className="px-3 py-1 text-xs rounded-md bg-purple-100 text-purple-700">
                {props.role}
              </span>

              <span className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700">
                {props.status}
              </span>
            </div>

            <div className="flex gap-8 text-sm text-gray-500">
              <span>{props.email}</span>
              <span>{props.phone}</span>
              <span>Branch: {props.branch}</span>
            </div>

            <span className="text-xs text-green-600">
              Last login: {props.lastLogin}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="px-4 py-1.5 border rounded-md text-sm">Edit</button>
          <button className="px-4 py-1.5 border border-red-300 text-red-600 rounded-md">
            Remove
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- DELIVERY STAFF CARD ---------------- */
  if (props.type === "delivery") {
    return (

      <div className="w-full max-w-[842.27px]  h-[297.09px] bg-white border-[1.25px] border-gray-200 rounded-[14px] px-[23.98px] py-[23.98px] flex flex-col gap-[39.98px]">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-[48px] h-[48px] rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
              {initials}
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-[16px] font-semibold">{props.name}</h3>
              <span
                className={`text-xs px-3 py-1 rounded-full w-fit ${
                  props.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : props.status === "On Duty"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {props.status}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button>✏️</button>
            <button className="text-red-500">🗑️</button>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <span>📞 {props.phone}</span>
          <span>🚚 Vehicle: {props.vehicle}</span>
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Stats */}
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-gray-500">Currently Assigned</p>
            <p className="text-blue-600 font-semibold text-lg">
              {props.assigned}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Total Completed</p>
            <p className="text-green-600 font-semibold text-lg">
              {props.completed}
            </p>
          </div>
        </div>
      </div>
    );
  }

/* ---------------- ROLES & PERMISSIONS ---------------- */
if (props.type === "roles") {
  return (
    <div
      className="
        w-full
        max-w-[1708.54px]
        bg-white
        border-[1.25px]
        border-gray-200
        rounded-[14px]
        px-[23.98px]
        py-[23.98px]
        flex
        flex-col
        gap-[39.98px]
      "
    >
      <h2 className="text-[16px] font-semibold text-gray-900">
        Role-Based Access Control
      </h2>

      <div className="flex flex-col gap-[39.98px]">
        {props.permissionsData?.map((role, index) => (
          <div
            key={index}
            className="
              w-full
              max-w-[1658.07px]
              bg-white
              border-[1.25px]
              border-gray-200
              rounded-[10px]
              px-[17.25px]
              pt-[17.25px]
              pb-[1.25px]
              flex
              justify-between
              items-start
            "
          >
            {/* Left */}
            <div className="flex flex-col gap-[11.99px]">
              <div>
                <h3 className="text-[14px] font-semibold text-gray-900">
                  {role.role}
                </h3>
                <span className="text-[12px] text-blue-600">
                  {role.description}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                {role.permissions.map((perm, i) => (
                  <span
                    key={i}
                    className="
                      px-3
                      py-1
                      text-[11px]
                      rounded-md
                      border
                      border-gray-200
                      text-gray-700
                    "
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>

            {/* Users badge */}
            <span
              className={`text-[11px] px-3 py-1 rounded-full font-medium ${
                role.badgeColor === "purple"
                  ? "bg-purple-100 text-purple-700"
                  : role.badgeColor === "blue"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {role.usersCount} users
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

};

export default StaffCard;
