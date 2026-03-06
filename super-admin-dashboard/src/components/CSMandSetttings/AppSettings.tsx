import React, { useState } from "react";
import { Image, Smartphone, Save } from "lucide-react";
const BASE_URL = "YOUR_BASE_URL_HERE";

type Settings = {
  appName: string;
  companyName: string;
  supportEmail: string;
  supportPhone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  enablePayments: boolean;
  enablePickup: boolean;
  enableExpress: boolean;
  enableLoyalty: boolean;
};

const AppSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    appName: "Juggle Laundry",
    companyName: "Juggle Laundry Services Inc.",
    supportEmail: "support@juggle.com",
    supportPhone: "+1 (555) 123-4567",
    street: "123 Business Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    enablePayments: true,
    enablePickup: true,
    enableExpress: true,
    enableLoyalty: false,
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);

  const handleChange = (field: keyof Settings, value: string | boolean) => {
    setSettings({ ...settings, [field]: value });
  };

  const saveSettings = async () => {
    const formData = new FormData();

    Object.entries(settings).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (logo) formData.append("logo", logo);
    if (favicon) formData.append("favicon", favicon);

    await axios.post(`${BASE_URL}/settings`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white p-6">
      <div className="bg-[#111214] border border-[#1e1e1e] rounded-xl p-6">

        {/* Header */}
        <div className="text-sm text-gray-300 mb-6 flex items-center gap-2">
          <span className="text-gray-400"><Smartphone size={16}/></span> Application Settings
        </div>

        {/* BASIC INFO */}
        <div className="mb-8">
          <h2 className="text-sm text-gray-300 mb-4">Basic Information</h2>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="text-xs text-gray-400">Application Name</label>
              <input
                value={settings.appName}
                onChange={(e) => handleChange("appName", e.target.value)}
                className="w-full mt-1 p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400">Company Name</label>
              <input
                value={settings.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="w-full mt-1 p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-gray-400">Support Email</label>
              <input
                value={settings.supportEmail}
                onChange={(e) => handleChange("supportEmail", e.target.value)}
                className="w-full mt-1 p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400">Support Phone</label>
              <input
                value={settings.supportPhone}
                onChange={(e) => handleChange("supportPhone", e.target.value)}
                className="w-full mt-1 p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded"
              />
            </div>
          </div>
        </div>

        {/* LOGO BRANDING */}
        <div className="mb-8">
          <h2 className="text-sm text-gray-300 mb-4">Logo & Branding</h2>

          <div className="grid grid-cols-2 gap-10">

            {/* LOGO */}
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                App Logo
              </label>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span><Image/></span>
                </div>

                <label className="bg-gray-200 text-black text-xs px-3 py-1 rounded cursor-pointer">
                  Upload New Logo
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      setLogo(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </label>
              </div>
            </div>

            {/* FAVICON */}
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Favicon
              </label>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1a1b1e] rounded-lg flex items-center justify-center border border-[#2a2a2a]">
                  <Image/>
                </div>

                <label className="bg-gray-200 text-black text-xs px-3 py-1 rounded cursor-pointer">
                  Upload Favicon
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      setFavicon(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="mb-8">
          <h2 className="text-sm text-gray-300 mb-4">Business Address</h2>

          <input
            value={settings.street}
            onChange={(e) => handleChange("street", e.target.value)}
            className="w-full mb-4 p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded text-gray-300"
          />

          <div className="grid grid-cols-3 gap-4">
            <input
              value={settings.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded text-gray-300"
            />

            <input
              value={settings.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded text-gray-300"
            />

            <input
              value={settings.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
              className="p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded text-gray-300"
            />
          </div>
        </div>

        {/* FEATURE TOGGLES */}
        <div className="mb-8">
          <h2 className="text-sm text-gray-300 mb-4">Feature Toggles</h2>

          {[
            {
              key: "enablePayments",
              title: "Enable Online Payments",
              desc: "Allow customers to pay online",
            },
            {
              key: "enablePickup",
              title: "Enable Pickup Service",
              desc: "Offer pickup and delivery",
            },
            {
              key: "enableExpress",
              title: "Enable Express Service",
              desc: "Offer express laundry service",
            },
            {
              key: "enableLoyalty",
              title: "Enable Loyalty Program",
              desc: "Reward repeat customers",
            },
          ].map((feature: any) => (
            <div
              key={feature.key}
              className="flex items-center justify-between bg-[#1a1b1e] border border-[#2a2a2a] rounded-lg p-4 mb-3"
            >
              <div>
                <p className="text-sm">{feature.title}</p>
                <p className="text-xs text-gray-400">{feature.desc}</p>
              </div>

              <button
                onClick={() =>
                  handleChange(
                    feature.key,
                    !settings[feature.key as keyof Settings]
                  )
                }
                className={`w-10 h-5 rounded-full flex items-center p-1 transition ${
                  settings[feature.key as keyof Settings]
                    ? "bg-white"
                    : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-black rounded-full transition ${
                    settings[feature.key as keyof Settings]
                      ? "ml-auto"
                      : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          className="flex justify-center gap-3 w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-sm"
        >
            <Save/>
          Save All Settings
        </button>

      </div>
    </div>
  );
};

export default AppSettings;