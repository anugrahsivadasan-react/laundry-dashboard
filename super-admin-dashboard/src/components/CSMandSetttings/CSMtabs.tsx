import React, { useState } from "react";
import Advanced from "./Advanced";
import AppSettings from "./AppSettings";
import CSMpages from "./CSMpages";
import PaymentGateway from "./PaymentGateway";

const CSMtabs = () => {
  const [activeTab, setActiveTab] = useState("tax");

  return (
    <div className="w-full">

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("tax")}
          className={`px-4 py-1.5 rounded-full text-xs ${
            activeTab === "tax"
              ? "bg-white text-black"
              : "bg-[#1c1c1c] text-gray-300"
          }`}
        >
          Tax Settings
        </button>

        <button
          onClick={() => setActiveTab("invoice")}
          className={`px-4 py-1.5 rounded-full text-xs ${
            activeTab === "invoice"
              ? "bg-white text-black"
              : "bg-[#1c1c1c] text-gray-300"
          }`}
        >
          Invoice Settings
        </button>

        <button
          onClick={() => setActiveTab("payment")}
          className={`px-4 py-1.5 rounded-full text-xs ${
            activeTab === "payment"
              ? "bg-white text-black"
              : "bg-[#1c1c1c] text-gray-300"
          }`}
        >
          Payment Gateways
        </button>

        <button
          onClick={() => setActiveTab("Advanced")}
          className={`px-4 py-1.5 rounded-full text-xs ${
            activeTab === "Advanced"
              ? "bg-white text-black"
              : "bg-[#1c1c1c] text-gray-300"
          }`}
        >
          Advanced
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "tax" && <CSMpages />}
        {activeTab === "invoice" && <AppSettings />}
        {activeTab === "payment" && <PaymentGateway />}
        {activeTab === "Advanced" && <Advanced />}
      </div>

    </div>
  );
};

export default CSMtabs;