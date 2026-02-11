import { X, Tag, Percent, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateOfferModal = ({ open, onClose }: Props) => {
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(
    "percentage"
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[520px] bg-white rounded-xl shadow-lg overflow-hidden max-h-[92vh] flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
          <h2 className="text-white font-semibold text-lg">Create New Offer</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* BASIC */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium">
              <Tag size={16} className="text-indigo-500" />
              Basic Information
            </div>

            <input
              placeholder="Offer Title"
              className="input"
            />

            <textarea
              placeholder="Description"
              className="input h-20 resize-none"
            />

            <div className="flex gap-2">
              <input
                placeholder="Coupon Code"
                className="input flex-1"
              />
              <button className="px-4 rounded-md bg-gray-100 text-sm hover:bg-gray-200">
                Generate
              </button>
            </div>
          </div>

          {/* DISCOUNT */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium">
              <Percent size={16} className="text-indigo-500" />
              Discount Configuration
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDiscountType("percentage")}
                className={`p-3 rounded-lg border text-left ${
                  discountType === "percentage"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200"
                }`}
              >
                <Percent size={16} />
                <div className="text-sm font-medium mt-1">Percentage</div>
                <div className="text-xs text-gray-500">% off total</div>
              </button>

              <button
                onClick={() => setDiscountType("fixed")}
                className={`p-3 rounded-lg border text-left ${
                  discountType === "fixed"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200"
                }`}
              >
                <DollarSign size={16} />
                <div className="text-sm font-medium mt-1">Fixed Amount</div>
                <div className="text-xs text-gray-500">Flat discount</div>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Discount Value" className="input" />
              <input placeholder="Max Discount" className="input" />
            </div>
          </div>

          {/* USAGE */}
          <div className="space-y-4">
            <div className="font-medium">Usage Restrictions</div>

            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Min Order Value" className="input" />
              <input placeholder="Usage Limit" className="input" />
              <input placeholder="Per User Limit" className="input" />
              <input placeholder="Applicable On" className="input" />
            </div>
          </div>

          {/* VALIDITY */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium">
              <Calendar size={16} className="text-indigo-500" />
              Validity Period
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input type="date" className="input" />
              <input type="date" className="input" />
            </div>
          </div>

          {/* EXTRA */}
          <div className="border rounded-lg p-4 bg-indigo-50 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Auto apply this offer
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Activate immediately
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Notify customers
            </label>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>

          <button className="px-4 py-2 text-sm rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            Create Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOfferModal;
