import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiX } from "react-icons/fi";
import dashboard from "../assets/dashboard.svg";
import Branches from "../assets/branches.svg";
import admin from "../assets/admin.svg";
import customers from "../assets/acesscontrol.svg";
import services from "../assets/services.svg";
import orders from "../assets/orders.svg";
import payments from "../assets/payments.svg";  
import offers from "../assets/offers.svg";
import notification from "../assets/notification.svg";
import report from "../assets/report.svg";
import settings from "../assets/security.svg";
import logo from "../assets/logo.svg";



type MenuItem = {
  label: string;
  path: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: dashboard, path: "/" },
  { label: "Branches", icon: Branches, path: "/branches" },
  { label: "Admin Management", icon: admin, path: "/admin-management" },
  { label: "Access Control", icon: customers, path: "/access-control" },
  { label: "Services & Pricing", icon: services, path: "/services-pricing" },
  { label: "Orders", icon: orders, path: "/orders" },
  { label: "Customers", icon: customers, path: "/customers" },
  { label: "Payments & Revenue", icon: payments, path: "/payments-revenue" },
  { label: "Offers & Coupons", icon: offers, path: "/offers-coupons" },
  { label: "Notifications", icon: notification, path: "/notifications" },
  { label: "Report & Analytics", icon: report, path: "/report-analytics" },
  { label: "CMS & Setiings", icon: services, path: "/support" },
  { label: "Security & Logs", icon: settings, path: "/settings" },
];




const Sidebar:React.FC = () => {

    const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHovered(null);
    }, 100);
  };


  return (
     <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#000000] text-white p-2 rounded-md"
      >
        <FiMenu size={20} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-[340px] min-h-screen pb-20
          bg-[#000000] border-r border-[#A1A1A1] text-white
          flex flex-col justify-between
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-start justify-start px-6 py-4 border-b gap-3 border-white/50">
  <img src={logo} alt="logo" className="w-10 h-10" />

  <div className="leading-tight hidden sm:block">
    <p className="text-[20px] font-semibold bg-gradient-to-b from-[#002F96] to-[#A6C2FF] bg-clip-text text-transparent">
      Juggle <br /> Laundry
    </p>

   
  </div>
</div>

       

          {/* MENU */}
          <nav className="mt-10 flex flex-col gap-5 pl-[42px] flex-1 overflow-y-auto pr-3 no-scrollbar">
            {menuItems.map(({ label, icon, path }) => (
              <NavLink key={label} to={path} onClick={() => setOpen(false)}>
                {({ isActive }) => (
                  <div
                    onMouseEnter={() => handleMouseEnter(label)}
                    onMouseLeave={handleMouseLeave}
                    className={`
                      flex items-center gap-1 px-5 py-5
                      rounded-md text-[14px]
                      w-[294px]
                      transition-all duration-200
                      ${
                        isActive || hovered === label
                          ? "w-[260px] bg-gradient-to-r from-[#165DFC] to-[#9810FB] text-white font-medium"
                          : "text-white/90 hover:bg-white/30"
                      }
                    `}
                  >
                    <img
                      src={icon}
                      alt={label}
                      className={`
                        w-[20px] h-[20px] transition-all duration-200
                        ${isActive || hovered === label ? "filter-white" : ""}
                      `}
                    />
                    <span>{label}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* HELP CARD */}
       
      </aside>
    </>
  )
}

export default Sidebar
