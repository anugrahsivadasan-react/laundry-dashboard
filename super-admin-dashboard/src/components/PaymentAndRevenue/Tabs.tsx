import { useState } from "react";
import TaxSettingsSection from "./TaxSettingsSection";
import InvoiceSettingsSection from "./InvoiceSettingsSection";
import PaymentGatewaySection from "./PaymentGatewaySection";

const Tabs = () => {
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
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "tax" && <TaxSettingsSection />}

        {activeTab === "invoice" && <InvoiceSettingsSection /> }

        {activeTab === "payment" && <PaymentGatewaySection />}
      </div>

    </div>
  );
};

export default Tabs;