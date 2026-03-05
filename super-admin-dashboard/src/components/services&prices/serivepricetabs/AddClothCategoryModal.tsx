import React, { useState } from "react";

interface AddClothCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (data: {
    category: string;
    wash: string;
    dryClean: string;
    iron: string;
  }) => void;
}

const AddClothCategoryModal: React.FC<AddClothCategoryModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [category, setCategory] = useState("");
  const [wash, setWash] = useState("");
  const [dryClean, setDryClean] = useState("");
  const [iron, setIron] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onCreate?.({ category, wash, dryClean, iron });
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
        "
      >
        {/* Header */}
        <div>
          <h2 className="text-[18px] font-semibold">
            Add Cloth Category
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Add a new clothing category with pricing
          </p>
        </div>

        {/* Form */}
        <div className="mt-5 space-y-4">
          {/* Category Name */}
          <div>
            <label className="text-sm text-gray-300">
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g., Shirt"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

          {/* Price Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-300">
                Wash Price
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={wash}
                onChange={(e) => setWash(e.target.value)}
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
                Dry Clean
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={dryClean}
                onChange={(e) => setDryClean(e.target.value)}
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
                Iron Price
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={iron}
                onChange={(e) => setIron(e.target.value)}
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
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClothCategoryModal; 