import { useState } from "react";
import { FiSearch, FiBell, FiCalendar } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import NotificationPanel from "./NotificationPanel";
 



const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  // Convert path to readable title
  const getPageTitle = () => {
    const path = pathname.split("/")[1];

    switch (path) {
      case "dashboard":
        return "Dashboard";
      case "admin-management":
        return "Admin Management";
      case "branches":
        return "Branches";
      case "offers":
        return "Offers & Coupons";
      case "reports":
        return "Reports & Analytics";
      default:
        return "Dashboard";
    }
  };

  const [isOpen, setIsOpen] = useState(false);
    

  return (
    <header className="h-[82px] w-full bg-[#000000]  pl-4 md:pl-10 flex items-center justify-between pr-6">
      
      {/* LEFT */}
      <div className="flex items-center gap-2 min-w-fit">
        <div className="leading-tight hidden sm:block">
          <p className="text-white text-[18px] font-[700]">
            {getPageTitle()}
          </p>
          <p className="text-[#A1A1A1] text-[14px] font-normal pt-1">
            Super Admin Panel
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex-1 max-w-[713px] mx-3 md:mx-6 hidden md:block">
        <div className="flex items-center border border-[#002F96] rounded-[5px] pl-4 pr-4 py-2 gap-2">
          <FiSearch size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search users, campaigns, tasks"
            className="w-full bg-transparent focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 min-w-fit">

        <button className="hidden lg:flex items-center border border-gray-700 rounded-md px-4 py-2 hover:bg-gray-800 transition">
          <FiCalendar size={18} className="text-gray-400 mr-2" />
          <span className="text-gray-400 text-sm">Today</span>
        </button>

        <div className="relative cursor-pointer"
        onClick={()=>setIsOpen(true)}> 
          <FiBell size={22} className="text-gray-400" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span> 


        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40?img=3"
            className="w-10 h-10 rounded object-cover"
            alt="User"
          />
          <div className="hidden sm:block">
            <p className="font-medium text-sm text-[#002F96]">
              Sarah Admin
            </p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>

      <NotificationPanel
      isOpen={isOpen}
      onClose={()=>setIsOpen(false)}/>
    </header>
  );
};

export default Navbar;
