import React from "react";

const SecurityTab: React.FC = () => {
  return (
    <div className="w-full  bg-[#F3F6F9] ">
      <div className="max-w-[1760px] mx-auto space-y-6">
        {/* Account Security */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-arimo text-[18px] font-bold text[#101828] leading-[28px] mb-6">
            Account Security
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-[14px] text-[#0A0A0A] leading-[14px] font-arimo mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full h-10 px-3 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
              />
            </div>

            <div>
              <label className="text-[14px] text-[#0A0A0A] leading-[14px] font-arimo mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full h-10 px-3 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
              />
            </div>

            <div>
              <label className="text-[14px] text-[#0A0A0A] leading-[14px] font-arimo mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full h-10 px-3 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
              />
            </div>

            <button className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Change Password
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-arimo text-[18px] font-bold text[#101828] leading-[28px] mb-6">
            Two-Factor Authentication
          </h2>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Enable 2FA
              </p>
              <p className="text-xs text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors" />
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
          </div>
        </div>

        {/* Session Management */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-arimo text-[18px] font-bold text[#101828] leading-[28px] mb-6">
            Session Management
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-[14px] text-[#0A0A0A] leading-[14px] font-arimo mb-1">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                defaultValue={30}
                className="w-full h-10 px-3 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
              />
            </div>

            <button className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50">
              Sign Out All Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
