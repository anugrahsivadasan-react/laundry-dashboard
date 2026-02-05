import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

const AddClothCategoryModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [clothTypes, setClothTypes] = useState<string[]>(["Shirt", "Trouser"]);
  const [clothInput, setClothInput] = useState("");

  if (!open) return null;

  const addClothType = () => {
    if (!clothInput.trim()) return;
    setClothTypes([...clothTypes, clothInput.trim()]);
    setClothInput("");
  };

  const removeClothType = (type: string) => {
    setClothTypes(clothTypes.filter((t) => t !== type));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl border border-[#EAECF0] bg-white shadow-xl">
        {/* Header */}
        <div className="rounded-t-xl bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] px-4 py-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            Add Cloth Category
          </h2>
          <button onClick={onClose}>
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[80vh] overflow-y-auto px-4 py-4 space-y-5">
          {/* Category Details */}
          <div>
            <p className="text-[18px] font-arimo font-bold text-[#101828] mb-2">
              Category Details
            </p>

            <div className="space-y-2">
                <p className="font-arimo text-[14px] leading-[14px]">Catagory name *</p>
              <input
                placeholder="e.g., Formal Wear"
                className="w-full rounded-md border border-[#EAECF0] bg-[#F3F3F5] px-3 py-2 text-xs outline-none"
              />
              <p className="font-arimo text-[14px] leading-[14px]" >Description</p>

              <textarea
                placeholder="Brief description of this category"
                className="w-full rounded-md border border-[#EAECF0] bg-[#E5E7EB] px-3 py-2 text-xs outline-none"
              />

                            <p className="font-arimo text-[14px] leading-[14px]" >Category Code</p>


              <input
                placeholder="FW-001"
                className="w-full rounded-md border border-[#EAECF0] bg-[#F3F3F5] px-3 py-2 text-xs outline-none"
              />
              <p className="text-[10px] text-[#667085]">
                Unique identifier for this category
              </p>
            </div>
          </div>

          {/* Cloth Items */}
          <div>

            <div className="rounded-md border border-[#D1E0FF] bg-[#F5F8FF] p-3">
            <p className="text-xs font-semibold text-[#101828] mb-1">
              Cloth Items in Category
            </p>
            <p className="text-[10px] text-[#667085] mb-2">
              Add specific cloth types that belong to this category
            </p>
              <div className="flex gap-2 mb-2">
                <input
                  value={clothInput}
                  onChange={(e) => setClothInput(e.target.value)}
                  placeholder="e.g., Shirt"
                  className="flex-1 rounded-md border border-[#EAECF0] bg-white px-2 py-1.5 text-xs outline-none"
                />
                <button
                  onClick={addClothType}
                  className="rounded-md text-black bg-white px-3 text-xs text-white"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {clothTypes.map((type) => (
                  <span
                    key={type}
                    className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] text-[#101828] border"
                  >
                    {type}
                    <button
                      onClick={() => removeClothType(type)}
                      className="text-[#667085]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Default Pricing */}
          <div>
            <p className="text-xs font-semibold text-[#101828] mb-1">
              Default Pricing (Optional)
            </p>
            <p className="text-[10px] text-[#667085] mb-3">
              Set base prices for all items in this category. These can be
              customized individually later.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["Wash & Iron ($)", 50],
                ["Dry Clean ($)", 90],
                ["Iron Only ($)", 25],
                ["Express ($)", 75],
              ].map(([label, value]) => (
                <div key={label}>
                  <label className="text-[10px] text-[#667085]">
                    {label}
                  </label>
                  <input
                    defaultValue={value}
                    className="mt-1 w-full rounded-md border border-[#EAECF0] bg-[#F3F3F5] px-2 py-1.5 text-xs outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Additional Settings */}
          <div>
            <p className="text-xs font-semibold text-[#101828] mb-2">
              Additional Settings
            </p>

            <div className="space-y-3">
              {[
                "Active Status",
                "Popular Category",
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs text-[#101828]">{label}</p>
                    <p className="text-[10px] text-[#667085]">
                      {label === "Active Status"
                        ? "Make this category available immediately"
                        : "Show in featured categories"}
                    </p>
                  </div>

                  <button className="relative h-5 w-9 rounded-full bg-black">
                    <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
                  </button>
                </div>
              ))}

              <div>
                <p className="text-xs text-[#101828] mb-1">
                  Display Order
                </p>
                <input
                  defaultValue={1}
                  className="w-full rounded-md border border-[#EAECF0] bg-[#F3F3F5] px-2 py-1.5 text-xs outline-none"
                />
                <p className="text-[10px] text-[#667085]">
                  Lower numbers appear first in lists
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-[#EAECF0] px-4 py-3">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-1.5 text-xs"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit?.({})}
            className="rounded-md bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] px-4 py-1.5 text-xs text-white"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClothCategoryModal;
