import { useState } from "react";

const TaxSettingsSection = () => {
  const [activeTab, setActiveTab] = useState("tax");

  const [form, setForm] = useState({
    taxRate: "8.5",
    taxLabel: "Sales Tax",
    applyToAll: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggle = () => {
    setForm({
      ...form,
      applyToAll: !form.applyToAll,
    });
  };

  const handleSubmit = () => {
    console.log("Send to backend:", form);
  };

  return (
    <div className="w-full text-white">

    

      {/* Card */}
      {activeTab === "tax" && (
        <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-6">

          {/* Title */}
          <h2 className="text-sm text-gray-300 mb-6 flex items-center gap-2">
            ⚙ Global Tax Configuration
          </h2>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

            {/* Tax Rate */}
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Default Tax Rate (%)
              </label>

              <input
                name="taxRate"
                value={form.taxRate}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* Tax Label */}
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Tax Label
              </label>

              <input
                name="taxLabel"
                value={form.taxLabel}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>

          </div>

          {/* Toggle Section */}
          <div className="bg-[#1a1a1a] rounded-md px-4 py-3 flex items-center justify-between mb-5">

            <div>
              <p className="text-sm text-gray-300">
                Apply Tax to All Orders
              </p>
              <p className="text-xs text-gray-500">
                Automatically calculate tax on all transactions
              </p>
            </div>

            {/* Toggle */}
            <button
              onClick={handleToggle}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                form.applyToAll ? "bg-indigo-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transform transition ${
                  form.applyToAll ? "translate-x-5" : ""
                }`}
              />
            </button>

          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-xs px-4 py-2 rounded-md"
          >
            Save Tax Settings
          </button>

        </div>
      )}
    </div>
  );
};

export default TaxSettingsSection;