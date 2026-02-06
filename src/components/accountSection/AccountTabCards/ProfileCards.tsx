import React, { useState } from "react";
import created from "../../../assets/account/created.svg"
import login from "../../../assets/account/login.svg"
import status from "../../../assets/account/status.svg"

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

const ProfileTab: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "Sarah Admin",
    email: "sarah@juggielaundry.com",
    phone: "+1 234 567 8900",
    role: "Admin",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: Connect to backend API
    console.log("Profile Saved:", profile);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* ---------------- PROFILE INFORMATION ---------------- */}
      <div className="w-full bg-white rounded-[12px] p-6 flex gap-6 items-start">
        {/* Avatar */}
        <div className="w-[56px] h-[56px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
          SA
        </div>

        {/* Form */}
        <div className="flex-1">
          <h2 className="font-arimo font-bold text-[18px] leading-[28px] text-[#101828]">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="font-arimo text-[14px] leading-[14px] text-[#0A0A0A]">Full Name</label>
              <input
               title="fullName"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full mt-1 h-[36px] rounded-md bg-gray-100 px-3 text-sm outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-arimo text-[14px] leading-[14px] text-[#0A0A0A]">Email Address</label>
              <input
              title="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full mt-1 h-[36px] rounded-md bg-gray-100 px-3 text-sm text-gray-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-arimo text-[14px] leading-[14px] text-[#0A0A0A]">Phone Number</label>
              <input
              title="email"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full mt-1 h-[36px] rounded-md bg-gray-100 px-3 text-sm outline-none"
              />
            </div>

            {/* Role */}
            <div>
              <label className="font-arimo text-[14px] leading-[14px] text-[#0A0A0A]">Role</label>
              <input
              title="role"
                name="role"
                value={profile.role}
                disabled
                className="w-full mt-1 h-[36px] rounded-md bg-gray-100 px-3 text-sm text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              className="px-4 h-[32px] rounded-md bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] text-white text-sm font-medium"
            >
              Save Changes
            </button>
            <button className="px-4 h-[32px] rounded-md border text-sm text-gray-600">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- ACCOUNT DETAILS ---------------- */}
      <div className="w-full bg-white rounded-[12px] p-6">
        <h2 className="font-arimo font-bold text-[18px] leading-[28px] mb-4">
          Account Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Account Created */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-[10px] p-4">
            <div className="w-11">
              <img src={created} alt="" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Account Created</p>
              <p className="text-sm font-semibold text-gray-900">
                Jan 1, 2025
              </p>
            </div>
          </div>

          {/* Last Login */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-[10px] p-4">
          <div className="w-11">
              <img src={login} alt="" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Login</p>
              <p className="text-sm font-semibold text-gray-900">
                2 hours ago
              </p>
            </div>
          </div>

          {/* 2FA Status */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-[10px] p-4">
            <div className="w-11">
              <img src={status} alt="" />
            </div>
            <div>
              <p className="text-xs text-gray-500">2FA Status</p>
              <p className="text-sm font-semibold text-gray-900">
                Disabled
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
