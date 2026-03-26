import { useState } from "react";
import { Shield } from "lucide-react";

const BASE_URL = "YOUR_BASE_URL_HERE";

type SecuritySettings = {
  twoFactor: boolean;
  sessionTimeout: number;
  loginAttempts: number;
  passwordExpiry: number;
  ipWhitelist: boolean;
  minLength: boolean;
  uppercase: boolean;
  numbers: boolean;
  specialChars: boolean;
};

const SecuiritySettings = () => {
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactor: true,
    sessionTimeout: 30,
    loginAttempts: 3,
    passwordExpiry: 90,
    ipWhitelist: false,
    minLength: true,
    uppercase: true,
    numbers: true,
    specialChars: false,
  });

  const toggle = (key: keyof SecuritySettings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const updateValue = (key: keyof SecuritySettings, value: number) => {
    setSettings({ ...settings, [key]: value });
  };

  const saveSettings = async () => {
    await axios.post(`${BASE_URL}/security-settings`, settings);
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

  const InputRow = ({
    title,
    desc,
    value,
    suffix,
    onChange,
  }: {
    title: string;
    desc: string;
    value: number;
    suffix: string;
    onChange: (v: number) => void;
  }) => (
    <div className="flex items-center justify-between bg-[#161616] border border-gray-800 rounded-lg p-4 mb-3">
      <div>
        <p className="text-sm text-white">{title}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-16 bg-[#0f0f10] border border-gray-700 rounded px-2 py-1 text-xs text-white"
        />
        <span className="text-xs text-gray-400">{suffix}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-5 text-white">

      {/* Header */}
      <div className="flex items-center gap-2 text-sm mb-4">
        <Shield className="w-4 h-4 text-gray-400" />
        Security Configuration
      </div>

      {/* Two Factor */}
      <div className="flex items-center justify-between bg-[#161616] border border-gray-800 rounded-lg p-4 mb-3">
        <div>
          <p className="text-sm">Two-Factor Authentication</p>
          <p className="text-xs text-gray-400">
            Require 2FA for all admin logins
          </p>
        </div>

        <Toggle
          enabled={settings.twoFactor}
          onClick={() => toggle("twoFactor")}
        />
      </div>

      {/* Session Timeout */}
      <InputRow
        title="Session Timeout"
        desc="Auto logout after inactivity"
        value={settings.sessionTimeout}
        suffix="minutes"
        onChange={(v) => updateValue("sessionTimeout", v)}
      />

      {/* Login Attempt Limit */}
      <InputRow
        title="Login Attempt Limit"
        desc="Lock account after failed attempts"
        value={settings.loginAttempts}
        suffix="attempts"
        onChange={(v) => updateValue("loginAttempts", v)}
      />

      {/* Password Expiry */}
      <InputRow
        title="Password Expiry"
        desc="Force password change periodically"
        value={settings.passwordExpiry}
        suffix="days"
        onChange={(v) => updateValue("passwordExpiry", v)}
      />

      {/* IP Whitelist */}
      <div className="flex items-center justify-between bg-[#161616] border border-gray-800 rounded-lg p-4 mb-4">
        <div>
          <p className="text-sm">IP Whitelist</p>
          <p className="text-xs text-gray-400">
            Restrict access to specific IP addresses
          </p>
        </div>

        <Toggle
          enabled={settings.ipWhitelist}
          onClick={() => toggle("ipWhitelist")}
        />
      </div>

      {/* Password Requirements */}
      <div className="border-t border-gray-800 pt-4 mb-4">
        <p className="text-sm mb-3">Password Requirements</p>

        <div className="space-y-2 text-xs text-gray-400">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.minLength}
              onChange={() => toggle("minLength")}
            />
            Minimum 8 characters
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.uppercase}
              onChange={() => toggle("uppercase")}
            />
            Require uppercase letters
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.numbers}
              onChange={() => toggle("numbers")}
            />
            Require numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.specialChars}
              onChange={() => toggle("specialChars")}
            />
            Require special characters
          </label>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={saveSettings}
        className="w-full py-2 rounded-lg text-sm bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
      >
        Save Security Settings
      </button>

    </div>
  );
};

export default SecuiritySettings;