import React from "react";
import { Crown, Shield, Users, Truck,  SquarePen, Lock } from "lucide-react";

type Role = {
  id: string;
  name: string;
  tag: string;
  description: string;
  users: number;
  icon: React.ReactNode;
  gradient: string;
};

const roles: Role[] = [
  {
    id: "super_admin",
    name: "Super Admin",
    tag: "System",
    description: "Full system access and control",
    users: 2,
    icon: <Crown className="w-5 h-5 text-white" />,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "branch_admin",
    name: "Branch Admin",
    tag: "Branch",
    description: "Manage specific branch operations",
    users: 12,
    icon: <Shield className="w-5 h-5 text-white" />,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "support_staff",
    name: "Support Staff",
    tag: "Staff",
    description: "Customer support and order management",
    users: 8,
    icon: <Users className="w-5 h-5 text-white" />,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "delivery_manager",
    name: "Delivery Manager",
    tag: "Operations",
    description: "Manage delivery and logistics",
    users: 6,
    icon: <Truck className="w-5 h-5 text-white" />,
    gradient: "from-yellow-500 to-orange-500",
  },
];

const RolesOverview: React.FC = () => {
  const handleManagePermissions = (roleId: string) => {
    console.log("Manage permissions:", roleId);
    // 🔌 Connect to backend later
  };

  const handleEditRole = (roleId: string) => {
    console.log("Edit role:", roleId);
    // 🔌 Connect to backend later
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {roles.map((role) => (
        <div
          key={role.id}
          className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5 w-full"
        >
          {/* Top Row */}
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${role.gradient} flex items-center justify-center`}
              >
                {role.icon}
              </div>

              {/* Title */}
              <div>
                <h3 className="text-white text-sm font-semibold">
                  {role.name}
                </h3>

                <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-800 text-gray-400 border border-gray-700">
                  {role.tag}
                </span>
              </div>
            </div>

            {/* Edit Icon */}
            <button onClick={() => handleEditRole(role.id)}>
              <SquarePen className="w-4 h-4 text-blue-400 hover:text-blue-300" />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-xs mt-3">{role.description}</p>

          {/* Divider */}
          <div className="border-t border-gray-800 my-4" />

          {/* Bottom Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Users className="w-3.5 h-3.5" />
              {role.users} users
            </div>

            <button
              onClick={() => handleManagePermissions(role.id)}
              className="flex items-center gap-2 text-xs bg-gray-100 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-200"
            >
              <Lock className="w-4 h-4 text-gray-500"/> Manage Permissions
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RolesOverview;
