import { useEffect, useRef, useState } from "react"
import { FiSearch, FiBell, FiCalendar } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import NotificationPanel from "./NotificationPanel"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import toast from "react-hot-toast"
import { logoutUser } from "../redux/action/authThunks"

const Navbar: React.FC = () => {
  const { pathname } = useLocation()

  const { user } = useAppSelector((s) => s.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Convert path to readable title
  const getPageTitle = () => {
    const path = pathname.split("/")[1]

    switch (path) {
      case "dashboard":
        return "Dashboard"
      case "admin-management":
        return "Admin Management"
      case "branches":
        return "Branches"
      case "offers":
        return "Offers & Coupons"
      case "reports":
        return "Reports & Analytics"
      default:
        return "Dashboard"
    }
  }

  const [isOpen, setIsOpen] = useState(false)

  const [openDropdown, setOpenDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()

      toast.success("Logged out successfully")

      navigate("/login", { replace: true }) // redirect after logout
    } catch (err) {
      toast.error("Logout failed")
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return "U"

    const words = name.trim().split(" ")

    // If multiple words → take first letter of first 2 words
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }

    // Single word → take first 2 letters
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <header className="h-[82px] w-full bg-[#000000]  pl-4 md:pl-10 flex items-center justify-between pr-6">
      {/* LEFT */}
      <div className="flex items-center gap-2 min-w-fit">
        <div className="leading-tight hidden sm:block">
          <p className="text-white text-[18px] font-[700]">{getPageTitle()}</p>
          <p className="text-[#A1A1A1] text-[14px] font-normal pt-1">
            Super Admin Panel
          </p>
        </div>
      </div>

      {/* SEARCH */}
      {/* <div className="flex-1 max-w-[713px] mx-3 md:mx-6 hidden md:block">
        <div className="flex items-center border border-[#002F96] rounded-[5px] pl-4 pr-4 py-2 gap-2">
          <FiSearch size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search users, campaigns, tasks"
            className="w-full bg-transparent focus:outline-none text-sm text-gray-400"
          />
        </div>
      </div>*/}

      {/* RIGHT */}
      <div className="flex items-center gap-6 min-w-fit">
        {/*   <button className="hidden lg:flex items-center border border-gray-700 rounded-md px-4 py-2 hover:bg-gray-800 transition">
          <FiCalendar size={18} className="text-gray-400 mr-2" />
          <span className="text-gray-400 text-sm">Today</span>
        </button>

        <div
          className="relative cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <FiBell size={22} className="text-gray-400" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </div>
*/}
        <div className="relative" ref={dropdownRef}>
          {/* PROFILE CLICK */}
          <div
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="flex items-center gap-3 cursor-pointer  px-2 py-1 rounded"
          >
            {user?.image ? (
              <img
                src={user.image}
                className="w-10 h-10 rounded object-cover"
                alt="User"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #2B7FFF 0%, #9810FA 100%)",
                  fontFamily: "Arimo",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0px",
                  color: "#FFFFFF",
                }}
              >
                {getInitials(user?.name)}
              </div>
            )}

            <div className="hidden sm:block">
              <p
                style={{
                  fontFamily: "Arimo",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0px",
                  color: "#FFFFFF",
                }}
              >
                {user?.name || "User"}
              </p>

              <p
                style={{
                  fontFamily: "Arimo",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  letterSpacing: "0px",
                  color: "#A1A1A1",
                }}
              >
                {user?.email}
              </p>
            </div>
          </div>

          {/* DROPDOWN */}
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-[#262626] rounded-lg shadow-lg border z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <NotificationPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  )
}

export default Navbar
