import React, { useState } from "react";
import { X } from "lucide-react";

/* ================= TYPES ================= */

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    roleName: string;
    description: string;
    roleLevel: string;
    template: string;
  }) => void;
};

/* ================= COMPONENT ================= */

const CreateRoleModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [roleLevel, setRoleLevel] = useState("");
  const [template, setTemplate] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {
    onCreate({ roleName, description, roleLevel, template });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      {/* Modal */}
      <div className="w-full max-w-md bg-[#0f0f10] border border-gray-800 rounded-xl p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-white text-sm font-semibold">
              Create New Role
            </h2>
            <p className="text-xs text-gray-500">
              Define a new role with specific permissions
            </p>
          </div>

          <button 
          title="x"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Name */}
        <div className="mb-3">
          <label className="text-xs text-gray-400">Role Name</label>
          <input
            type="text"
            placeholder="e.g., Customer Service Manager"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="mt-1 w-full bg-[#151517] border border-gray-700 text-sm text-gray-200 px-3 py-2 rounded-md outline-none placeholder-gray-500"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="text-xs text-gray-400">Description</label>
          <textarea
            placeholder="Describe the role and its responsibilities..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full bg-[#151517] border border-gray-700 text-sm text-gray-200 px-3 py-2 rounded-md outline-none placeholder-gray-500 resize-none h-20"
          />
        </div>

        {/* Role Level */}
        <div className="mb-4">
          <label className="text-xs text-gray-400">Role Level</label>
          <input
          title="role"
            type="text"
            value={roleLevel}
            onChange={(e) => setRoleLevel(e.target.value)}
            className="mt-1 w-full bg-[#151517] border border-gray-700 text-sm text-gray-200 px-3 py-2 rounded-md outline-none"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-4" />

        {/* Quick Permission Templates */}
        <div className="mb-5">
          <p className="text-xs text-gray-400 mb-2">
            Quick Permission Templates
          </p>

          <div className="grid grid-cols-2 gap-2">
            {[
              "Full Access",
              "Read Only",
              "Branch Management",
              "Order Management",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setTemplate(item)}
                className={`text-xs py-2 rounded-md border transition
                  ${
                    template === item
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="px-4 py-1.5 text-xs rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition"
          >
            Create Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoleModal;
