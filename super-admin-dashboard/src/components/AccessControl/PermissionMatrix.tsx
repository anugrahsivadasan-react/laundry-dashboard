import React, { useState } from "react";
import { Check, Shield } from "lucide-react";

/* ================= TYPES ================= */

type Role = "superAdmin" | "branchAdmin" | "support" | "delivery";

type PermissionRow = {
  key: string;
  label: string;
};

type Section = {
  title: string;
  permissions: PermissionRow[];
};

/* ================= DUMMY CONFIG ================= */

const sections: Section[] = [
  {
    title: "Branch Management",
    permissions: [
      { key: "viewBranches", label: "View Branches" },
      { key: "createBranches", label: "Create Branches" },
      { key: "editBranches", label: "Edit Branches" },
      { key: "deleteBranches", label: "Delete Branches" },
    ],
  },
  {
    title: "User Management",
    permissions: [
      { key: "viewUsers", label: "View Users" },
      { key: "createUsers", label: "Create Users" },
      { key: "editUsers", label: "Edit Users" },
      { key: "deleteUsers", label: "Delete Users" },
    ],
  },
  {
    title: "Order Management",
    permissions: [
      { key: "viewOrders", label: "View Orders" },
      { key: "createOrders", label: "Create Orders" },
      { key: "editOrders", label: "Edit Orders" },
      { key: "cancelOrders", label: "Cancel Orders" },
      { key: "updateStatus", label: "Update Status" },
    ],
  },
  {
    title: "Payment & Pricing",
    permissions: [
      { key: "viewPayments", label: "View Payments" },
      { key: "processRefunds", label: "Process Refunds" },
      { key: "viewPricing", label: "View Pricing" },
      { key: "editPricing", label: "Edit Pricing" },
    ],
  },
  {
    title: "Reports & Analytics",
    permissions: [
      { key: "viewReports", label: "View Reports" },
      { key: "exportReports", label: "Export Reports" },
      { key: "viewAnalytics", label: "View Analytics" },
    ],
  },
  {
    title: "System Settings",
    permissions: [
      { key: "viewSettings", label: "View Settings" },
      { key: "editSettings", label: "Edit Settings" },
      { key: "manageSecurity", label: "Manage Security" },
    ],
  },
];

/* ================= COMPONENT ================= */

const PermissionMatrix: React.FC = () => {
  const [permissions, setPermissions] = useState<
    Record<string, Record<Role, boolean>>
  >({});

  const togglePermission = (permKey: string, role: Role) => {
    if (role === "superAdmin") return;

    setPermissions((prev) => ({
      ...prev,
      [permKey]: {
        ...prev[permKey],
        [role]: !prev[permKey]?.[role],
      },
    }));
  };

  const renderToggle = (permKey: string, role: Role) => {
    if (role === "superAdmin") {
      return (
        <div className="flex justify-center">
          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-green-400" />
          </div>
        </div>
      );
    }

    const enabled = permissions[permKey]?.[role];

    return (
      <div className="flex justify-center">
        <button
          onClick={() => togglePermission(permKey, role)}
          className={`relative w-9 h-5 rounded-full transition ${
            enabled ? "bg-white" : "bg-gray-600"
          }`}
        >
          <span
            className={`absolute top-[2px] w-4 h-4 rounded-full bg-black transition ${
              enabled ? "left-[18px]" : "left-[2px]"
            }`}
          />
        </button>
      </div>
    );
  };

  const handleReset = () => {
    setPermissions({});
  };

  const handleSave = () => {
    console.log("Save permissions:", permissions);
  };

  return (
    <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-white text-sm font-semibold">Permission Matrix</h2>
        <p className="text-xs text-gray-500">
          Configure access permissions for each role
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            {/* Section Title */}
            <div className="flex items-center gap-2 mb-3">
              <Shield className="text-blue-500 w-4" />
              <h3 className="text-xs text-white font-medium">
                {section.title}
              </h3>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto border border-gray-800 rounded-lg">
              <table className="w-full table-fixed text-xs text-gray-400">
                <thead className="border-b border-gray-800 text-gray-500">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium w-[40%]">
                      Permission
                    </th>
                    <th className="px-4 py-2 font-medium w-[15%]">
                      Super Admin
                    </th>
                    <th className="px-4 py-2 font-medium w-[15%]">
                      Branch Admin
                    </th>
                    <th className="px-4 py-2 font-medium w-[15%]">Support</th>
                    <th className="px-4 py-2 font-medium w-[15%]">Delivery</th>
                  </tr>
                </thead>

                <tbody>
                  {section.permissions.map((perm) => (
                    <tr
                      key={perm.key}
                      className="border-b border-gray-800 last:border-none"
                    >
                      <td className="px-4 py-2 text-gray-300 truncate">
                        {perm.label}
                      </td>

                      <td className="px-4 py-2">
                        {renderToggle(perm.key, "superAdmin")}
                      </td>

                      <td className="px-4 py-2">
                        {renderToggle(perm.key, "branchAdmin")}
                      </td>

                      <td className="px-4 py-2">
                        {renderToggle(perm.key, "support")}
                      </td>

                      <td className="px-4 py-2">
                        {renderToggle(perm.key, "delivery")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleReset}
          className="px-4 py-1.5 text-xs rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
        >
          Reset to Defaults
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-1.5 text-xs rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition"
        >
          Save All Permissions
        </button>
      </div>
    </div>
  );
};

export default PermissionMatrix;
