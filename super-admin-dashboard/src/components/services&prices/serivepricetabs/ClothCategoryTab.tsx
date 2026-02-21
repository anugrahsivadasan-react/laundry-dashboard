import { SquarePen } from "lucide-react";



const categories = [
  {
    category: "Shirt",
    wash: "$2.50",
    dryClean: "$8.00",
    iron: "$3.00",
    status: "Active",
  },
  {
    category: "Pants/Trousers",
    wash: "$3.00",
    dryClean: "$9.00",
    iron: "$3.50",
    status: "Active",
  },
  {
    category: "Dress",
    wash: "$5.00",
    dryClean: "$15.00",
    iron: "$5.00",
    status: "Active",
  },
  {
    category: "Suit (2pc)",
    wash: "$8.00",
    dryClean: "$25.00",
    iron: "$8.00",
    status: "Active",
  },
  {
    category: "Coat/Jacket",
    wash: "$6.00",
    dryClean: "$18.00",
    iron: "$6.00",
    status: "Active",
  },
  {
    category: "Blanket",
    wash: "$12.00",
    dryClean: "$30.00",
    iron: "N/A",
    status: "Active",
  },
];

const ClothCategoryTab = () => {
  return (
    <div
      className="w-full bg-[#171717] border rounded-[14px] p-6"
      style={{
        borderColor: "#262626",
        borderWidth: "1.25px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">
          Cloth Categories Pricing
        </h2>

        <button
          className="px-4 h-9 rounded-lg text-sm text-white font-medium"
          style={{
            background:
              "linear-gradient(90deg, #155DFC 0%, #9810FA 100%)",
          }}
        >
          + Add Category
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 text-sm text-gray-400 border-b border-[#262626] pb-3">
        <span>Category</span>
        <span>Wash</span>
        <span>Dry Clean</span>
        <span>Iron</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      {/* Table Rows */}
      <div className="mt-4 space-y-4">
        {categories.map((item, index) => (
          <div
            key={index}
            className="
              grid
              grid-cols-6
              items-center
              text-sm
              text-white
              border-b
              border-[#262626]
              pb-4
            "
          >
            <span>{item.category}</span>
            <span>{item.wash}</span>
            <span>{item.dryClean}</span>
            <span className="text-gray-300">{item.iron}</span>

            {/* Status */}
            <span>
              <span
                className="
                  px-3
                  py-1
                  text-xs
                  rounded-full
                  bg-green-900
                  text-green-400
                "
              >
                {item.status}
              </span>
            </span>

            {/* Actions */}
            <span className="flex justify-end">
             <SquarePen className="w-5 h-5 text-[#51A2FF]" strokeWidth={2} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothCategoryTab;
