import { useState } from "react";
import { Plus } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import AddClothCategoryModal from "./AddClothCategoryModal";
import AddServiceModal from "./AddServiceModal";



const ServicesHeader = () => {
          const [open, setOpen] = useState(false);
          const [openService, setOpenService] = useState(false);

  return (
    <div className="flex items-center justify-between">
      
      {/* Left content */}
      <div>
        <h2 className="font-bold text-[24px] leading-[32px] text-[#101828]">
Services & Pricing     </h2>
        <p className="font-normal text-[14px] leading-[20px] text-[#6A7282] pt-2">
Manage cloth categories and service pricing        </p>
      </div>

      {/* Right button */}
      <div className="flex">
      <button
       onClick={() => setOpen(true)}
      className=" h-9 rounded-[10px] text-[14px] leading-[20px] font-normal bg-[#FFFFFF] text-[#0A0A0A] px-4 border">
  + Add Category      </button>
      <div className="pl-2">
      <button        
             onClick={() => setOpenService(true)}

 className="h-9 rounded-[10px] text-[14px] leading-[20px] font-normal  px-4 border bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] text-white">
      + Assign Services
      </button>
      </div>
      </div>
      <AddClothCategoryModal
        open={open}
        onClose={() => setOpen(false)}
        onAssign={(id) => console.log("Assign driver:", id)}
        orderId="ORD-001"
      />
      <AddServiceModal
        open={openService}
        onClose={() => setOpenService(false)}
        onAssign={(id) => console.log("Assign driver:", id)}
        orderId="ORD-001"
      />

    </div>
  );
};

export default ServicesHeader;
