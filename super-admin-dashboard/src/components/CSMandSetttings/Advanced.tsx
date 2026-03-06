import React, { useState } from "react";
import { Settings } from "lucide-react";

const BASE_URL = "YOUR_BASE_URL_HERE";

interface ConfigState {
  maintenanceMode: boolean;
  debugMode: boolean;
  autoBackup: boolean;
  emailNotifications: boolean;
  apiUrl: string;
  apiVersion: string;
}

const Advanced: React.FC = () => {
  const [config, setConfig] = useState<ConfigState>({
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    emailNotifications: true,
    apiUrl: "https://api.juggle.com",
    apiVersion: "v1",
  });

  const handleToggle = (key: keyof ConfigState) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  const handleInput = (key: keyof ConfigState, value: string) => {
    setConfig({ ...config, [key]: value });
  };

  const saveConfig = async () => {
    await axios.post(`${BASE_URL}/advanced-config`, config);
  };

  const Toggle = ({
    enabled,
    onClick,
  }: {
    enabled: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-10 h-5 rounded-full flex items-center p-1 ${
        enabled ? "bg-white" : "bg-gray-600"
      }`}
    >
      <div
        className={`w-4 h-4 bg-black rounded-full transition ${
          enabled ? "ml-auto" : ""
        }`}
      />
    </button>
  );

  const ToggleItem = ({
    title,
    description,
    enabled,
    onToggle,
  }: {
    title: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <div className="flex items-center justify-between bg-[#1a1b1e] border border-[#2a2a2a] rounded-lg p-4 mb-3">
      <div>
        <p className="text-sm text-white">{title}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>

      <Toggle enabled={enabled} onClick={onToggle} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white p-6">
      <div className="bg-[#111214] border border-[#1e1e1e] rounded-xl p-6">

        {/* Header */}
        <div className="text-sm text-gray-300 mb-6 flex items-center gap-2">
         <Settings/>  Advanced Configuration
        </div>

        {/* Toggles */}
        <ToggleItem
          title="Maintenance Mode"
          description="Temporarily disable customer access"
          enabled={config.maintenanceMode}
          onToggle={() => handleToggle("maintenanceMode")}
        />

        <ToggleItem
          title="Debug Mode"
          description="Enable detailed error logging"
          enabled={config.debugMode}
          onToggle={() => handleToggle("debugMode")}
        />

        <ToggleItem
          title="Auto Backup"
          description="Automatic daily database backups"
          enabled={config.autoBackup}
          onToggle={() => handleToggle("autoBackup")}
        />

        <ToggleItem
          title="Email Notifications"
          description="Send email alerts for important events"
          enabled={config.emailNotifications}
          onToggle={() => handleToggle("emailNotifications")}
        />

        {/* API CONFIG */}
        <div className="mt-6">

          <p className="text-xs text-gray-400 mb-2">API Configuration</p>

          <div className="mb-4">
            <label className="text-xs text-gray-400 block mb-1">
              API URL
            </label>

            <input
              value={config.apiUrl}
              onChange={(e) => handleInput("apiUrl", e.target.value)}
              className="w-full p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded text-gray-300"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">
              API Version
            </label>

            <input
              value={config.apiVersion}
              onChange={(e) => handleInput("apiVersion", e.target.value)}
              className="w-full p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded text-gray-300"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Advanced;