import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import StripeConfigModal from "./StripeConfigModal";

type Gateway = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};



const mockGateways: Gateway[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Configure Stripe payment gateway",
    enabled: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Configure PayPal payment gateway",
    enabled: false,
  },
  {
    id: "square",
    name: "Square",
    description: "Configure Square payment gateway",
    enabled: false,
  },
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Configure Razorpay payment gateway",
    enabled: false,
  },
];

const PaymentGatewaySection = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [openModal, setOpenModal] = useState(false);

const handleConfigure = (id: string) => {
  setOpenModal(true);
};

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = async () => {
    // Replace with real API
    // const res = await api.get("/payment-gateways")
    setGateways(mockGateways);
  };

  const toggleGateway = (id: string) => {
    const updated = gateways.map((g) =>
      g.id === id ? { ...g, enabled: !g.enabled } : g
    );

    setGateways(updated);

    // Backend ready
    // await api.patch(`/payment-gateways/${id}`, { enabled: !enabled })
  };

//   const handleConfigure = (id: string) => {
//     console.log("Configure gateway:", id);

//     // navigate(`/settings/payment/${id}`)
//   };

  return (
    <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-6 w-full">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-4 h-4 text-gray-400" />
        <h2 className="text-sm text-gray-200 font-medium">
          Payment Gateway Setup
        </h2>
      </div>

      {/* Gateway List */}
      <div className="space-y-4">
        {gateways.map((gateway) => (
          <div
            key={gateway.id}
            className="flex items-center justify-between bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-4"
          >
            {/* Left */}
            <div className="flex items-start gap-3">
              <div className="mt-1 text-blue-500">  <CreditCard size={18}/> </div>

              <div>
                <p className="text-sm text-white">{gateway.name}</p>
                <p className="text-xs text-gray-400">
                  {gateway.description}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

              {/* Toggle */}
              <button
                onClick={() => toggleGateway(gateway.id)}
                className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                  gateway.enabled ? "bg-white" : "bg-gray-500"
                }`}
              >
                <div
                  className={`bg-black w-4 h-4 rounded-full shadow-md transform transition ${
                    gateway.enabled ? "translate-x-5" : ""
                  }`}
                />
              </button>

              {/* Configure */}
             <button
  onClick={() => handleConfigure(gateway.id)}
  className="text-xs bg-white text-black px-3 py-1 rounded-md"
>
  Configure
</button>

            </div>
          </div>
        ))}
      </div>
      <StripeConfigModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
/>
    </div>
    
  );
};

export default PaymentGatewaySection;