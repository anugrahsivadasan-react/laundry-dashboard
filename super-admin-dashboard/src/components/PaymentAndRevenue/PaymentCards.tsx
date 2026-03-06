import { DollarSign, Wallet, CreditCard, TrendingUp } from "lucide-react";
import PaymentPayments from "./PaymentStats";


const PaymentCards = () => {
  const PaymentsData = [
    {
      title: "Total Revemue",
      value: "$1247",
      icon: <DollarSign className="w-4 h-4 text-green-500" />,
      iconBg: "bg-[#2B7FFF1A]",
      per:"18",
    },
    {
      title: "Todays Revenue",
      value: "$145",
      icon: <Wallet className="w-4 h-4 text-blue-500" />,
      iconBg: "bg-blue-500/10",
      odr:"58",
    },
    {
      title: "Pending Payments",
      value: "$542",
      icon: <CreditCard className="w-4 h-4 text-yellow-400" />,
      iconBg: "bg-[#FE9A001A]",
      pending:"2",
    },
    {
      title: "Avg Order Value",
      value: "$87",
      icon: <TrendingUp className="w-4 h-4 text-violet-600" />,
      iconBg: "bg-[#AD46FF1A]",
      up:"22",
    },
  ];

  return <PaymentPayments Payments={PaymentsData} />;
};

export default PaymentCards;
