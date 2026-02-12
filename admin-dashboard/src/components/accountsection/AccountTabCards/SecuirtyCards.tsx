import React, { useState } from "react";
import { LogOut, Shield  } from "lucide-react";
const SecurityTab: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const handleUpdatePassword = () => {
    // TODO: connect backend
    console.log({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  const handleEnable2FA = () => {
    setTwoFAEnabled(!twoFAEnabled);
    // TODO: connect backend
  };

  const handleLogoutAll = () => {
    // TODO: connect backend
    console.log("Logout from all devices");
  };

  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      {/* ---------------- CHANGE PASSWORD ---------------- */}
      <div className="bg-white rounded-[12px] p-6">
        <p className="text-arimo font-bold text-[18px] leading-[28px] mb-4">
          Change Password
        </p>

        <div className="max-w-[420px] flex flex-col gap-4">
          <div>
            <label className="text-arimo text-[14px] leading-[14px] text-[#0A0A0A]">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mt-1 h-[36px] rounded-md bg-gray-100 px-3 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-arimo text-[14px] leading-[14px] text-[#0A0A0A]">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 h-[36px] rounded-md bg-gray-100 px-3 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-arimo text-[14px] leading-[14px] text-[#0A0A0A]">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 h-[36px] rounded-md bg-gray-100 px-3 text-sm outline-none"
            />
          </div>

          <button
            onClick={handleUpdatePassword}
            className="w-fit mt-2 px-4 h-[32px] rounded-md bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] text-[#FFFFFF] font-arimo text-[14px] leading-[20px]"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* ---------------- TWO FACTOR AUTH ---------------- */}
      <div className="bg-white rounded-[12px] h-[200px] p-6  ">
        <p className="text-arimo font-bold text-[18px] leading-[28px]  mb-2">
          Two-Factor Authentication
        </p>
        <p className="text-xs text-gray-500 pt-8">
          Add an extra layer of security to your account by enabling 2FA
        </p>
         <div className="pt-8 pb-4">
        <button
          onClick={handleEnable2FA}
          className="w-full h-[36px] rounded-md border border-gray-200 flex items-center justify-center gap-2 text-sm text-[#0A0A0A] hover:bg-gray-50 "
        >
          <span className="text-xs">
                    <Shield className="w-4 h-4" />

          </span>
          Enable 2FA
        </button>
        </div>
      </div>

      {/* ---------------- DANGER ZONE ---------------- */}
      <div className="bg-white rounded-[12px] p-6 border border-red-300">
        <h2 className="text-arimo font-bold text-[18px] leading-[28px]  mb-2">
          Danger Zone
        </h2>
        <p className="text-xs text-gray-500 pt-8">
          Terminate all other sessions and force logout from all devices
        </p>
            <div className="pt-8 pb-4">
        <button
          onClick={handleLogoutAll}
          className="w-full h-[44px] rounded-md border border-red-400 text-red-600 text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-50"
        ><div className="">
        <LogOut className="w-4 h-4 text-red-600" />
        </div>
          Logout from All Devices
        </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
