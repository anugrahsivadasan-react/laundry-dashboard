import React, { useState } from "react";
import { X } from "lucide-react";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (data: {
    serviceName: string;
    basePrice: string;
    expressCharge: string;
  }) => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [expressCharge, setExpressCharge] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onCreate?.({ serviceName, basePrice, expressCharge });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div
        className="
          w-[511.99px]
          h-[328.41px]
          bg-[#171717]
          border border-[#262626]
          rounded-[10px]
          p-6
          text-white
          flex flex-col justify-between
          relative
        "
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div>
          <h2 className="text-[18px] font-semibold">
            Add New Service
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Create a new laundry service
          </p>
        </div>

        {/* Form */}
        <div className="mt-5 space-y-4">
          {/* Service Name */}
          <div>
            <label className="text-sm text-gray-300">
              Service Name
            </label>
            <input
              type="text"
              placeholder="e.g., Wash & Fold"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
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
          </div>

          {/* Price Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300">
                Base Price
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="
                  w-full mt-2
                  bg-[#1F1F1F]
                  border border-[#262626]
                  rounded-lg
                  px-3 py-2
                  text-sm
                  outline-none
                  focus:border-blue-500
                "
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Express Charge
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={expressCharge}
                onChange={(e) => setExpressCharge(e.target.value)}
                className="
                  w-full mt-2
                  bg-[#1F1F1F]
                  border border-[#262626]
                  rounded-lg
                  px-3 py-2
                  text-sm
                  outline-none
                  focus:border-blue-500
                "
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="
              px-5 py-2
              rounded-lg
              bg-gray-200
              text-black
              text-sm
              font-medium
              hover:opacity-90
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-5 py-2
              rounded-lg
              text-sm
              font-medium
              text-white
              bg-gradient-to-r
              from-[#155DFC]
              to-[#9810FA]
              hover:opacity-90
            "
          >
            Create Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;