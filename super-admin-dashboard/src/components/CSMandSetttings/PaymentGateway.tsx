import React, { useState } from "react";
import { CreditCard } from "lucide-react";
const BASE_URL = "YOUR_BASE_URL_HERE";

interface Gateway {
  enabled: boolean;
  apiKey: string;
  secretKey: string;
}

const PaymentGateway: React.FC = () => {
  const [stripe, setStripe] = useState<Gateway>({
    enabled: true,
    apiKey: "sk_test_...",
    secretKey: "******",
  });

  const [paypal, setPaypal] = useState<Gateway>({
    enabled: true,
    apiKey: "sk_test_...",
    secretKey: "******",
  });

  const [squareEnabled, setSquareEnabled] = useState(false);
  const [razorpayEnabled, setRazorpayEnabled] = useState(false);

  const toggle = (setter: any, state: boolean) => {
    setter((prev: any) => ({ ...prev, enabled: !state }));
  };

  const testConnection = async (gateway: string) => {
    await axios.post(`${BASE_URL}/payment/test`, {
      gateway,
    });
  };

  const saveSettings = async () => {
    await axios.post(`${BASE_URL}/payment/settings`, {
      stripe,
      paypal,
      squareEnabled,
      razorpayEnabled,
    });
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

  const Input = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="flex flex-col w-full">
      <label className="text-xs text-gray-400 mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 bg-[#1a1b1e] border border-[#2a2a2a] rounded text-gray-300"
      />
    </div>
  );

  const GatewayCard = ({
    title,
    configured,
    state,
    setState,
  }: {
    title: string;
    configured: string;
    state: Gateway;
    setState: any;
  }) => (
    <div className="bg-[#151618] border border-[#2a2a2a] rounded-lg p-4 mb-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0b0b0c] text-blue-700 rounded flex items-center justify-center">
            <CreditCard/>
          </div>

          <div>
            <p className="text-sm">{title}</p>
            <p className="text-xs text-gray-400">{configured}</p>
          </div>
        </div>

        <Toggle
          enabled={state.enabled}
          onClick={() => toggle(setState, state.enabled)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <Input
          label="API Key"
          value={state.apiKey}
          onChange={(v) => setState({ ...state, apiKey: v })}
        />

        <Input
          label="Secret Key"
          value={state.secretKey}
          onChange={(v) => setState({ ...state, secretKey: v })}
        />
      </div>

      <button
        onClick={() => testConnection(title.toLowerCase())}
        className="bg-gray-200 text-black text-xs px-3 py-1 rounded"
      >
        Test Connection
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white p-6">
      <div className="bg-[#111214] border border-[#1e1e1e] rounded-xl p-6">

        {/* Header */}
        <div className="text-sm text-gray-300 mb-6 flex items-center gap-2">
          <span><CreditCard size={16}/></span> Payment Gateway Configuration
        </div>

        {/* Stripe */}
        <GatewayCard
          title="Stripe"
          configured="Configured"
          state={stripe}
          setState={setStripe}
        />

        {/* PayPal */}
        <GatewayCard
          title="PayPal"
          configured="Configured"
          state={paypal}
          setState={setPaypal}
        />

        {/* Square */}
        <div className="bg-[#151618] border border-[#2a2a2a] rounded-lg p-4 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0b0b0c] text-blue-700 rounded flex items-center justify-center">
                <CreditCard/>
              </div>

              <div>
                <p className="text-sm">Square</p>
                <p className="text-xs text-gray-400">Not configured</p>
              </div>
            </div>

            <Toggle
              enabled={squareEnabled}
              onClick={() => setSquareEnabled(!squareEnabled)}
            />
          </div>

          
        </div>

        {/* Razorpay */}
        <div className="bg-[#151618] border border-[#2a2a2a] rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 text-blue-700 bg-[#0b0b0c] rounded flex items-center justify-center">
                <CreditCard/>
              </div>

              <div>
                <p className="text-sm">Razorpay</p>
                <p className="text-xs text-gray-400">Not configured</p>
              </div>
            </div>

            <Toggle
              enabled={razorpayEnabled}
              onClick={() => setRazorpayEnabled(!razorpayEnabled)}
            />
          </div>
        </div>

        {/* Save */}
        <button
          onClick={saveSettings}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-sm"
        >
          Save Payment Settings
        </button>

      </div>
    </div>
  );
};

export default PaymentGateway;