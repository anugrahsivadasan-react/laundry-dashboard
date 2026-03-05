import { useState } from "react";
import { X, Eye } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const StripeConfigModal = ({ isOpen, onClose }: Props) => {
  const [form, setForm] = useState({
    enabled: true,
    testMode: true,
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
    currency: "USD - US Dollar",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggle = (key: "enabled" | "testMode") => {
    setForm({ ...form, [key]: !form[key] });
  };

  const handleSubmit = () => {
    console.log("Send to backend:", form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">

      {/* Modal */}
      <div className="w-[420px] h-[900px] bg-[#0f0f0f] border-l border-[#1e1e1e] p-6 ">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-white font-semibold text-lg">
              Stripe Configuration
            </h2>
            <p className="text-xs text-gray-400">
              Accept payments online with Stripe
            </p>
          </div>

          <button onClick={onClose}>
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Enable */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-white">Enable</p>
            <p className="text-xs text-gray-400">
              Activate this payment gateway for customers
            </p>
          </div>

          <button
            onClick={() => toggle("enabled")}
            className={`w-10 h-5 flex items-center rounded-full p-1 ${
              form.enabled ? "bg-white" : "bg-gray-600"
            }`}
          >
            <div
              className={`bg-black w-4 h-4 rounded-full transition ${
                form.enabled ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        {/* Test Mode */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-white">Test Mode</p>
            <p className="text-xs text-gray-400">
              Use test credentials for development
            </p>
          </div>

          <button
            onClick={() => toggle("testMode")}
            className={`w-10 h-5 flex items-center rounded-full p-1 ${
              form.testMode ? "bg-white" : "bg-gray-600"
            }`}
          >
            <div
              className={`bg-black w-4 h-4 rounded-full transition ${
                form.testMode ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        {/* API Credentials */}
        <h3 className="text-white text-sm font-medium mb-3">
          API Credentials
        </h3>

        <div className="space-y-4 mb-6">

          <input
            name="publishableKey"
            placeholder="pk_live_..."
            value={form.publishableKey}
            onChange={handleChange}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white"
          />

          <div className="relative">
            <input
              name="secretKey"
              placeholder="sk_live_..."
              value={form.secretKey}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white"
            />
            <Eye className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <div className="relative">
            <input
              name="webhookSecret"
              placeholder="whsec_..."
              value={form.webhookSecret}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white"
            />
            <Eye className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white"
          >
            <option>USD - US Dollar</option>
            <option>INR - Indian Rupee</option>
            <option>EUR - Euro</option>
          </select>

        </div>

        {/* Features */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg mb-6 text-sm text-gray-300">
          <p className="mb-2 text-white font-medium">Features & Benefits</p>
          <ul className="space-y-1">
            <li>✔ Accept credit and debit cards</li>
            <li>✔ Support for 135+ currencies</li>
            <li>✔ Built-in fraud prevention</li>
            <li>✔ PCI compliance included</li>
          </ul>
        </div>

        {/* Webhook */}
        <div className="mb-6">
          <p className="text-sm text-white mb-2">Webhook URL</p>

          <div className="flex gap-2">
            <input
              value="https://api.jugglelaundry.com/webhooks/stripe"
              readOnly
              className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-xs text-gray-400"
            />
            <button className="bg-white text-black text-xs px-3 rounded-md">
              Copy
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Add this URL to your Stripe webhook settings
          </p>
        </div>

        {/* Test */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md mb-4 text-sm">
          Test Connection
        </button>

        {/* Footer */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1 text-xs bg-gray-200 rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-1 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md"
          >
            Save Configuration
          </button>
        </div>

      </div>
    </div>
  );
};

export default StripeConfigModal;