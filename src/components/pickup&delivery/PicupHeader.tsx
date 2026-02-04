import { useState } from "react";
// import CreateOrderModal from "./CreateOrderModal";

const PickupHeader = () => {
        //   const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      
      {/* Left content */}
      <div>
        <h2 className="font-bold text-[24px] leading-[32px] text-[#101828]">
Pickup & Delivery Schedule        </h2>
        <p className="font-normal text-[14px] leading-[20px] text-[#6A7282] pt-2">
Manage pickup and delivery schedules        </p>
      </div>

      {/* Right button */}
      <div className="flex">
      <button className="h-9 rounded-[10px] text-[14px] leading-[20px] font-normal bg-[#FFFFFF] text-[#0A0A0A] px-4 border">
        Selected Date
      </button>
      <div className="pl-2">
      <button        
    //    onClick={() => setOpen(true)}
 className="h-9 rounded-[10px] text-[14px] leading-[20px] font-normal  px-4 border bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] text-white">
       Assign Driver
      </button>
      </div>
      </div>
       {/* <CreateOrderModal
        isOpen={open}
        onClose={() => setOpen(false)}
      /> */}

    </div>
  );
};

export default PickupHeader;
