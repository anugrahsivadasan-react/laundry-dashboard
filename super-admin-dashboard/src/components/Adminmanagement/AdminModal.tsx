import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void; // 🔌 connect to backend later
};

const AdminModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    branch: "",
    role: "",
    permissions: [] as string[],
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePermission = (perm: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const handleSubmit = () => {
    onCreate(form); // 🔌 backend hook
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-2xl bg-[#0f0f10] border border-gray-800 rounded-xl p-6">
        {/* Header */}
        <h2 className="text-white text-lg font-semibold mb-1">Add New Admin</h2>
        <p className="text-sm text-gray-400 mb-6">
          Create a new admin user and assign permissions
        </p>

        {/* Form */}
        <div className="space-y-4">
          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="John"
              value={form.firstName}
              onChange={handleChange}
              className="bg-[#151517] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none placeholder-gray-500"
            />
            <input
              name="lastName"
              placeholder="Smith"
              value={form.lastName}
              onChange={handleChange}
              className="bg-[#151517] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none placeholder-gray-500"
            />
          </div>

          {/* Email */}
          <input
            name="email"
            placeholder="admin@juggle.com"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-[#151517] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none placeholder-gray-500"
          />

          {/* Phone */}
          <input
            name="phone"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-[#151517] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none placeholder-gray-500"
          />

          {/* Branch + Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="branch"
              value={form.branch}
              onChange={handleChange}
              className="bg-[#151517] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none"
            >
              <option value="">Select branch</option>
              <option>Downtown Branch</option>
              <option>Westside Branch</option>
              <option>Eastside Branch</option>
            </select>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="bg-[#151517] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none"
            >
              <option value="">Select role</option>
              <option>Branch Admin</option>
              <option>Support Staff</option>
              <option>Delivery Manager</option>
            </select>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-sm text-gray-300 mb-3">Permissions</h3>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
              {["Orders", "Customers", "Payments", "Reports", "Settings"].map(
                (perm) => (
                  <label key={perm} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.permissions.includes(perm)}
                      onChange={() => togglePermission(perm)}
                      className="accent-blue-500"
                    />
                    {perm}
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
          >
            Create Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
