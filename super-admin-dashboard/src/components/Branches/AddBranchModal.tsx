import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: BranchForm) => void; // 🔌 backend ready
};

type BranchForm = {
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  pickup: boolean;
  delivery: boolean;
  express: boolean;
};

const AddBranchModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState<BranchForm>({
    name: "",
    code: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    pickup: false,
    delivery: false,
    express: false,
  });

  if (!isOpen) return null;

  const handleChange = (key: keyof BranchForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Branch Data:", form);
    onSubmit?.(form); // 🔌 connect API here
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-[#0f0f10] border border-gray-800 rounded-xl p-6 shadow-xl">
        {/* Header */}
        <h2 className="text-white text-lg font-semibold mb-1">
          Add New Branch
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Create a new branch location for your laundry service
        </p>

        {/* Form */}
        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Branch Name"
              placeholder="Enter branch name"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
            />
            <Input
              label="Branch Code"
              placeholder="e.g., DT001"
              value={form.code}
              onChange={(v) => handleChange("code", v)}
            />
          </div>

          {/* Address */}
          <Input
            label="Address"
            placeholder="Street address"
            value={form.address}
            onChange={(v) => handleChange("address", v)}
          />

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              placeholder="City"
              value={form.city}
              onChange={(v) => handleChange("city", v)}
            />
            <Input
              label="State"
              placeholder="State"
              value={form.state}
              onChange={(v) => handleChange("state", v)}
            />
            <Input
              label="ZIP Code"
              placeholder="ZIP"
              value={form.zip}
              onChange={(v) => handleChange("zip", v)}
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(v) => handleChange("phone", v)}
            />
            <Input
              label="Email"
              placeholder="branch@juggle.com"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
            />
          </div>

          {/* Service Availability */}
          <div className="pt-2">
            <h3 className="text-white text-sm font-medium mb-3">
              Service Availability
            </h3>

            <ToggleRow
              label="Pickup Service"
              checked={form.pickup}
              onChange={(v) => handleChange("pickup", v)}
            />
            <ToggleRow
              label="Delivery Service"
              checked={form.delivery}
              onChange={(v) => handleChange("delivery", v)}
            />
            <ToggleRow
              label="Express Service"
              checked={form.express}
              onChange={(v) => handleChange("express", v)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
          >
            Create Branch
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBranchModal;

/* ================= INPUT ================= */
type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
};

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => (
  <div>
    <label className="text-gray-400 text-xs mb-1 block">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#151517] border border-gray-700 text-sm text-gray-200 px-3 py-2 rounded-md outline-none placeholder-gray-500 focus:border-gray-500"
    />
  </div>
);

/* ================= TOGGLE ================= */
type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
};

const ToggleRow: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-gray-300 text-sm">{label}</span>

    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 flex items-center rounded-full transition ${
        checked ? "bg-green-500" : "bg-gray-600"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);
