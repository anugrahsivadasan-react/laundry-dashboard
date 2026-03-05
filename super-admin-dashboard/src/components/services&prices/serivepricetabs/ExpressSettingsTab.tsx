import { Zap } from "lucide-react";
import { useState } from "react";


const ExpressSettingTab = () => {
  const [enabled, setEnabled] = useState(true);
  const [branchOverride, setBranchOverride] = useState(false);
  const [multiplier, setMultiplier] = useState("1.5");
  const [deliveryTime, setDeliveryTime] = useState("24");

  return (
    <div
      className="
        w-full
        bg-[#171717]
        border border-[#262626]
        rounded-[14px]
        p-6
        text-white
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
         <Zap className="w-5 h-5 text-[#FE9A00]" strokeWidth={2} />
        <h2 className="text-[16px] font-semibold">
          Express Service Configuration
        </h2>
      </div>

      {/* Enable Express Service */}
      <div className="flex items-center justify-between bg-[#1F1F1F] border border-[#262626] rounded-lg p-4 mb-6">
        <div>
          <p className="text-sm font-medium">Enable Express Service</p>
          <p className="text-xs text-gray-400 mt-1">
            Allow customers to request express delivery
          </p>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setEnabled(!enabled)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            enabled ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              enabled ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* Inputs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Express Multiplier */}
        <div>
          <label className="text-sm font-medium">
            Express Multiplier
          </label>
          <input
            type="number"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            className="
              w-full mt-2
              bg-[#1F1F1F]
              border border-[#262626]
              rounded-lg
              px-4 py-2
              text-sm
              outline-none
              focus:border-blue-500
            "
          />
          <p className="text-xs text-gray-400 mt-2">
            Base price multiplier for express orders
          </p>
        </div>

        {/* Delivery Time */}
        <div>
          <label className="text-sm font-medium">
            Delivery Time (hours)
          </label>
          <input
            type="number"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="
              w-full mt-2
              bg-[#1F1F1F]
              border border-[#262626]
              rounded-lg
              px-4 py-2
              text-sm
              outline-none
              focus:border-blue-500
            "
          />
          <p className="text-xs text-gray-400 mt-2">
            Standard express delivery time
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#262626] mb-6" />

      {/* Branch Override Settings */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">
            Branch Override Settings
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Allow individual branches to override global express pricing
          </p>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setBranchOverride(!branchOverride)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            branchOverride ? "bg-bluee-500" : "bg-gray-600"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              branchOverride ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ExpressSettingTab;