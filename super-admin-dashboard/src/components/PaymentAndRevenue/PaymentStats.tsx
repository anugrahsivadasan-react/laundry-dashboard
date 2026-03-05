import React from "react";
import { TrendingUp } from "lucide-react";

type PaymentCard = {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  per: string;
  odr: string;
  pending: string;
  up: string;
};

type PaymentsCardsProps = {
  Payments: PaymentCard[];
};

const PaymentPayments: React.FC<PaymentsCardsProps> = ({ Payments }) => {
  return (
   
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
     {Payments.map((Payment, index) => (
  <div
    key={index}
    className="bg-[#0f0f10] border border-gray-800 rounded-xl px-5 py-4 flex flex-col gap-3"
  >
    {/* Top Row */}
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 flex items-center justify-center rounded-lg ${Payment.iconBg}`}
      >
        {Payment.icon}
      </div>

      <div>
        <p className="text-xs text-gray-400">{Payment.title}</p>
        <p className="text-lg font-semibold text-white">
          {Payment.value}
        </p>
      </div>
    </div>

    {/* Bottom Row (Next Line) */}
   {Payment.per && (
  <p className="flex text-xs text-gray-400">
  <p className="flex text-[#00C950] gap-2"> <TrendingUp size={14}/> +{Payment.per}%</p> vs last month
  </p>
)}

{Payment.odr && (
  <p className="text-xs text-gray-400">
    {Payment.odr} orders today
  </p>
)}

{Payment.pending && (
  <p className="text-xs text-gray-400">
    {Payment.pending} payments pending
  </p>
)}

{Payment.up && (
  <p className="text-xs text-gray-400">
   Up from ${Payment.up}
  </p>
)}





  
  </div>
))}
    </div>
   
  );
};

export default PaymentPayments;
