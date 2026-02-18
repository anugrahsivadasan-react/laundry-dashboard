import React, { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";

/* ================= TYPES ================= */

type Status = "Active" | "Inactive";

type UserRole = {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Branch Admin" | "Support Staff" | "Delivery Manager";
  branch: string;
  status: Status;
  lastActive: string;
};

/* ================= DUMMY DATA (BACKEND READY) ================= */

const dummyUsers: UserRole[] = [
  {
    id: "1",
    name: "John Anderson",
    email: "john.anderson@juggle.com",
    role: "Super Admin",
    branch: "All Branches",
    status: "Active",
    lastActive: "2 mins ago",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@juggle.com",
    role: "Branch Admin",
    branch: "Aluva",
    status: "Active",
    lastActive: "15 mins ago",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@juggle.com",
    role: "Branch Admin",
    branch: "Edappally",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@juggle.com",
    role: "Support Staff",
    branch: "Kalamassery",
    status: "Active",
    lastActive: "3 hours ago",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.w@juggle.com",
    role: "Delivery Manager",
    branch: "Perumbavoor",
    status: "Inactive",
    lastActive: "2 days ago",
  },
];

/* ================= HELPER UI ================= */

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const roleBadge = (role: UserRole["role"]) => {
  const base =
    "text-[10px] px-2 py-[2px] rounded-full border font-medium inline-block";

  switch (role) {
    case "Super Admin":
      return `${base} bg-red-500/10 text-red-400 border-red-500/20`;
    case "Branch Admin":
      return `${base} bg-blue-500/10 text-blue-400 border-blue-500/20`;
    case "Support Staff":
      return `${base} bg-green-500/10 text-green-400 border-green-500/20`;
    case "Delivery Manager":
      return `${base} bg-amber-500/10 text-amber-400 border-amber-500/20`;
  }
};

const statusBadge = (status: Status) => {
  return status === "Active"
    ? "text-[10px] px-2 py-[2px] rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
    : "text-[10px] px-2 py-[2px] rounded-full bg-gray-700 text-gray-300 border border-gray-600";
};

/* ================= COMPONENT ================= */

const UserAssignments: React.FC = () => {
  const [users] = useState<UserRole[]>(dummyUsers);

  /* 🔌 Backend-ready handlers */
  const handleEdit = (id: string) => {
    console.log("Edit user:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete user:", id);
  };

  return (
    <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-sm font-semibold">
          User Role Assignments
        </h2>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-[#151517] border border-gray-700 text-sm text-gray-300 pl-9 pr-3 py-2 rounded-md outline-none placeholder-gray-500 w-[220px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-500 border-b border-gray-800">
            <tr>
              <th className="pb-3 font-medium">User</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Branch</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Last Active</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-800 hover:bg-[#151517]"
              >
                {/* User */}
                <td className="py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                    {getInitials(user.name)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-200 text-sm">{user.name}</span>
                    <span className="text-[11px] text-gray-500">
                      {user.email}
                    </span>
                  </div>
                </td>

                {/* Role */}
                <td className="py-3">
                  <span className={roleBadge(user.role)}>{user.role}</span>
                </td>

                {/* Branch */}
                <td className="py-3 text-gray-300">{user.branch}</td>

                {/* Status */}
                <td className="py-3">
                  <span className={statusBadge(user.status)}>
                    {user.status}
                  </span>
                </td>

                {/* Last Active */}
                <td className="py-3 text-gray-400">{user.lastActive}</td>

                {/* Actions */}
                <td className="py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => handleEdit(user.id)}>
                      <Pencil className="w-4 h-4 text-blue-400 hover:text-blue-300" />
                    </button>
                    <button onClick={() => handleDelete(user.id)}>
                      <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAssignments;
