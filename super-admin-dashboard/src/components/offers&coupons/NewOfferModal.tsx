import { X, Copy } from "lucide-react";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleCreateOffer: (data: any) => void;
};

const NewOfferModal = ({ isOpen, onClose,handleCreateOffer }: Props) => {
  const [coupon, setCoupon] = useState("NEWYEAR2026");
  
  const [offerName, setOfferName] = useState("");
  const [discount, setDiscount] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [usageLimit, setUsageLimit] = useState("");

  

  if (!isOpen) return null;


const handleCreate = () => {
  const today = new Date();

  const newOffer = {
    id: Date.now(),

    // ✅ match table fields
    name: offerName,
    code: coupon,
    discount: `${discount}%`,
    scope: "Global",

    validity: "Custom", // you can improve later with real dates
    usage: 0,
    maxUsage: Number(usageLimit) || 0,

    status: "Active", // default
  };

  handleCreateOffer(newOffer);
  onClose();
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      
      {/* MODAL CONTAINER */}
      <div
        className="
          relative w-[512px] max-w-[95%]
          rounded-[10px]
          border border-[#262626]
          bg-[#171717]
          p-6
          text-white
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold">Create New Offer</h2>
            <p className="text-sm text-white mt-1">
              Set up a new promotional offer or coupon code
            </p>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-white hover:text-white" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          {/* Offer Name */}
          <div>
            <label className="text-sm text-white">Offer Name</label>
            <input
              type="text"
              value={offerName}
              onChange={(e) => setOfferName(e.target.value)}
              placeholder="e.g., New Year Special"
              className="mt-1 w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
          </div>

          {/* Coupon + Discount Type */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Coupon */}
            <div>
              <label className="text-sm text-white">Coupon Code</label>
              <div className="flex items-center mt-1 gap-2">
                <input
                  placeholder={coupon}
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm outline-none"
                />
                <button className="p-2 bg-[#1f1f1f] border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a]">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Discount Type */}
            <div>
              <label className="text-sm text-white">Discount Type</label>
              <select className="mt-1 w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm outline-none">
                <option>Percentage (%)</option>
                <option>Flat ($)</option>
              </select>
            </div>

          </div>

          {/* Discount + Min Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                placeholder="20"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="mt-1 w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-white">
                Minimum Order Value ($)
              </label>
              <input
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                placeholder="50.00"
                className="mt-1 w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white">Valid From</label>
              <input
                type="date"
                className="mt-1 w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-white">Valid To</label>
              <input
                type="date"
                className="mt-1 w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Apply + Limit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white">Apply To</label>
              <select className="mt-1 w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm">
                <option>All Branches</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-white">Usage Limit</label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                placeholder="1000 (0 for unlimited)"
                className="mt-1 w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* CHECKBOXES */}
          <div className="space-y-2 pt-2">
            {[
              "New customers only",
              "One per customer",
              "Cannot combine with other offers",
            ].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm text-white">
                <input type="checkbox" className="accent-purple-500" />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#262626]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-black text-sm font-medium"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-md text-sm font-medium text-white"
            style={{
              background: "linear-gradient(90deg, #155DFC 0%, #9810FA 100%)",
            }}
            onClick={handleCreate}
          >
            Create Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOfferModal;