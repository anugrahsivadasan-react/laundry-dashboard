
import { SquarePen } from "lucide-react";


const services = [
  {
    name: "Wash & Fold",
    basePrice: "$2.50",
    express: "+$1.00",
    status: "Active",
  },
  {
    name: "Dry Clean",
    basePrice: "$8.00",
    express: "+$3.00",
    status: "Active",
  },
  {
    name: "Iron/Press",
    basePrice: "$3.00",
    express: "+$1.50",
    status: "Active",
  },
  {
    name: "Wash & Iron",
    basePrice: "$4.50",
    express: "+$2.00",
    status: "Active",
  },
];

const ServicesTab = () => {
  return (
    <div
      className="
        w-full
        bg-[#171717]
        border
        rounded-[14px]
        p-6
      "
      style={{
        borderColor: "#262626",
        borderWidth: "1.25px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">
          Service List
        </h2>

        <button
          className="
            px-4
            h-9
            rounded-lg
            text-sm
            text-white
            font-medium
          "
          style={{
            background:
              "linear-gradient(90deg, #155DFC 0%, #9810FA 100%)",
          }}
        >
          + Add Service
        </button>
      </div>

      {/* Table */}
      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-5 text-sm text-gray-400 border-b border-[#262626] pb-3">
          <span>Service</span>
          <span>Base Price</span>
          <span>Express Charge</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Table Rows */}
        <div className="mt-4 space-y-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="
                grid
                grid-cols-5
                items-center
                text-sm
                text-white
                border-b
                border-[#262626]
                pb-4
              "
            >
              <span>{service.name}</span>
              <span>{service.basePrice}</span>
              <span className="text-gray-300">
                {service.express}
              </span>

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
                  {service.status}
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
    </div>
  );
};

export default ServicesTab;
