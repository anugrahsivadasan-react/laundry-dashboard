import { FiSearch, FiBell, FiCalendar } from "react-icons/fi";
import logo from "../assets/main-logo.svg";
import NotificationPanel from "../components/NotificationPanel";
import { useState } from "react";



const Navbar = () => {
  
const [isOpen, setIsOpen] = useState(false);



  return (
    <header className="h-[64px] w-full bg-white border-b border-gray-200 pl-4 md:pl-10 flex items-center justify-between pr-6">
      
      {/* LEFT */}
      <div className="flex items-center gap-[10px] min-w-fit">
        <img src={logo} alt="logo" className="w-10 h-10" />

        <div className="leading-tight hidden sm:block">
          <p className="text-[#002F96] text-[18px] font-semibold leading-[100%] tracking-normal">
            Juggle Laundry
          </p>
          <p className="text-[#002F96] text-[16px] font-normal leading-[100%] tracking-normal pt-[9px]">
            Aluva Branch
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex-1 max-w-[713px] mx-3 md:mx-6 hidden md:block">
        <div className="flex items-center border border-[#002F96] rounded-[5px] pl-10 pr-4 py-2 gap-2">
          <FiSearch size={24} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search users, campaigns, tasks"
            className="
              w-full
              bg-transparent
              focus:outline-none
              text-[12px]
              leading-[16px]
              tracking-[0.08em]
              pl-2
            "
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 lg:gap-[60px] min-w-fit pr-4 md:pr-6">
        
        {/* TODAY */}
        <button className="h-[50px] w-[130px] hidden lg:flex items-center border border-gray-300 rounded-md hover:bg-gray-50"
          >
          <div className="pl-[10px] text-[#595959]">
            <FiCalendar size={24} />
          </div>
          <div className="pl-[10px] text-[#595959] text-[20px] font-normal leading-[16px] tracking-[0.08em]">
            Today
          </div>
         
        </button>

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer"
        onClick={() => setIsOpen(true)}>
          <FiBell size={25} className="text-[#000000]" 
          />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </div>
  
        {/* PROFILE */}
        <div className="flex items-center gap-[10px] cursor-pointer">
          <img
            src="https://i.pravatar.cc/40?img=3"
            className="w-[45px] h-[45px] rounded-[4px] object-cover"
            alt="User"
          />
          <div className="leading-tight hidden sm:block">
            <p className="font-medium text-[14px] text-[#002F96]">
              Sarah Admin
            </p>
            <p className="font-normal text-[#545454] text-[12px]">
              Administrator
            </p>
          </div>
        </div>
      </div>
       <NotificationPanel
          isOpen={isOpen}
          onClose={()=> setIsOpen(false)}/>

      
    </header>

    

  );
};

export default Navbar;
