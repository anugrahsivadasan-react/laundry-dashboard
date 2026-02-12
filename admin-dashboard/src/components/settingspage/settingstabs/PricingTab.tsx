import React, { useState } from "react";

const PricingTab = () => {
  const [newCustomer, setNewCustomer] = useState(true); 
  const [bulkOrder, setBulkOrder] = useState(true);

  return (
    <div className="w-full space-y-6">
      {/* ---------------- Service Pricing ---------------- */}
      <div className="bg-white border border-gray-200 rounded-[14px] p-6">
        <h3 className="text-[16px] font-semibold text-gray-900 mb-6">
          Service Pricing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-4">
            <Input label="Wash & Iron (per kg)" value="50" />
            <Input label="Express Wash (per kg)" value="75" />
            <Input label="Wash & Fold (per kg)" value="45" />
          </div>

          {/* Right */}
          <div className="space-y-4">
            <Input label="Dry Clean (per item)" value="90" />
            <Input label="Iron Only (per item)" value="30" />
            <Input label="Delivery Charge" value="20" />
          </div>
        </div>
      </div>

      {/* ---------------- Discount & Offers ---------------- */}
      <div className="bg-white border border-gray-200 rounded-[14px] p-6">
        <h3 className="text-[16px] font-semibold text-gray-900 mb-6">
          Discount & Offers
        </h3>

        <div className="space-y-4">
          <ToggleCard
            title="New Customer Discount"
            desc="10% off on first order"
            enabled={newCustomer}
            setEnabled={setNewCustomer}
          />

          <ToggleCard
            title="Bulk Order Discount"
            desc="15% off on orders above $100"
            enabled={bulkOrder}
            setEnabled={setBulkOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingTab;

/* ---------------- Small Components ---------------- */

const Input = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-700">{label}</label>
    <input
      defaultValue={value}
      className="w-full h-[44px] px-4 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const ToggleCard = ({
  title,
  desc,
  enabled,
  setEnabled,
}: {
  title: string;
  desc: string;
  enabled: boolean;
  setEnabled: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between bg-gray-50 rounded-lg px-5 py-4">
    <div>
      <p className="font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>

    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
        enabled ? "bg-black" : "bg-gray-300"
      }`}
    >
      <span
        className={`bg-white w-4 h-4 rounded-full transition ${
          enabled ? "translate-x-6" : ""
        }`}
      />
    </button>
  </div>
);
