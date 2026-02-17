import React, { useState } from "react";
import { Search, Mail, Phone, Power, SquarePen } from "lucide-react";

/* ================= TYPES ================= */
type Admin = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  branch: string;
  role: "Branch Admin" | "Support Staff" | "Delivery Manager";
  status: "Active" | "Disabled";
  lastLogin: string;
};

/* ================= COMPONENT ================= */
const AdminTable: React.FC = () => {
  /* 🔌 Replace with backend data later */
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      name: "John Smith",
      initials: "JS",
      email: "john.smith@juggle.com",
      phone: "+1 (555) 123-4567",
      branch: "Downtown Branch",
      role: "Branch Admin",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      initials: "SJ",
      email: "sarah.j@juggle.com",
      phone: "+1 (555) 234-5678",
      branch: "Westside Branch",
      role: "Branch Admin",
      status: "Active",
      lastLogin: "5 hours ago",
    },
    {
      id: "3",
      name: "Mike Chen",
      initials: "MC",
      email: "mike.chen@juggle.com",
      phone: "+1 (555) 345-6789",
      branch: "Downtown Branch",
      role: "Support Staff",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: "4",
      name: "Emily Davis",
      initials: "ED",
      email: "emily.d@juggle.com",
      phone: "+1 (555) 456-7890",
      branch: "Eastside Branch",
      role: "Delivery Manager",
      status: "Active",
      lastLogin: "3 hours ago",
    },
    {
      id: "5",
      name: "Robert Wilson",
      initials: "RW",
      email: "robert.w@juggle.com",
      phone: "+1 (555) 567-8901",
      branch: "Northside Branch",
      role: "Branch Admin",
      status: "Disabled",
      lastLogin: "2 weeks ago",
    },
  ]);

  /* 🔌 Backend-ready handlers */
  const handleEdit = (id: string) => {
    console.log("Edit admin:", id);
  };

  const handleToggleStatus = (id: string) => {
    console.log("Toggle status:", id);

    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Disabled" : "Active" }
          : a
      )
    );
  };

  return (
    <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-sm font-semibold">All Admins</h2>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search admins..."
            className="bg-[#151517] border border-gray-700 text-sm text-gray-300 pl-9 pr-3 py-2 rounded-md outline-none placeholder-gray-500 w-[220px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-500 border-b border-gray-800">
            <tr>
              <th className="pb-3 font-medium">Admin</th>
              <th className="pb-3 font-medium">Contact</th>
              <th className="pb-3 font-medium">Branch</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Last Login</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b border-gray-800 hover:bg-[#151517]"
              >
                {/* Admin */}
                <td className="py-3 flex items-center gap-3 text-gray-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-semibold text-white">
                    {admin.initials}
                  </div>
                  {admin.name}
                </td>

                {/* Contact */}
                <td className="py-3">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {admin.email}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Phone className="w-3.5 h-3.5" />
                    {admin.phone}
                  </div>
                </td>

                {/* Branch */}
                <td className="py-3 text-gray-300">{admin.branch}</td>

                {/* Role */}
                <td className="py-3">
                  {admin.role === "Branch Admin" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Branch Admin
                    </span>
                  )}
                  {admin.role === "Support Staff" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Support Staff
                    </span>
                  )}
                  {admin.role === "Delivery Manager" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                      Delivery Manager
                    </span>
                  )}
                </td>

                {/* Status */}
                <td className="py-3">
                  {admin.status === "Active" ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      Active
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 border border-gray-600">
                      Disabled
                    </span>
                  )}
                </td>

                {/* Last Login */}
                <td className="py-3 text-gray-300">{admin.lastLogin}</td>

                {/* Actions */}
                <td className="py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => handleEdit(admin.id)}>
                      <SquarePen className="w-4 h-4 text-blue-400 hover:text-blue-300" />
                    </button>

                    <button onClick={() => handleToggleStatus(admin.id)}>
                      <Power
                        className={`w-4 h-4 ${
                          admin.status === "Active"
                            ? "text-red-400 hover:text-red-300"
                            : "text-green-400 hover:text-green-300"
                        }`}
                      />
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

export default AdminTable;
