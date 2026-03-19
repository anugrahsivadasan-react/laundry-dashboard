import React from "react";
import {
  Megaphone,
  Users,
  UserPlus,
  UserCheck,
  Crown,
} from "lucide-react";

interface Campaign {
  id: number;
  title: string;
  message: string;
  campaign: string;
  target: string;
  recipients: number;
  date: string;
  time: string;
  clickRate: string;
  convertRate: string;
  revenue: string;
  status: "Sent";
}

const getTargetIcon = (target: string) => {
  if (target === "All Customers")
    return <Users className="w-4 h-4 mr-2 text-gray-400" />;
  if (target === "New Customers")
    return <UserPlus className="w-4 h-4 mr-2 text-gray-400" />;
  if (target === "Active Customers")
    return <UserCheck className="w-4 h-4 mr-2 text-gray-400" />;
  return <Crown className="w-4 h-4 mr-2 text-gray-400" />;
};

const PromotionalAlerts = () => {
  const data: Campaign[] = [
    {
      id: 1,
      title: "Valentine's Day Special - 25% OFF",
      message:
        "Show some love! Get 25% off on all dry cleaning services from Feb 10-20. Use code: VALENTINE2026",
      campaign: "Valentine's Day 2026",
      target: "All Customers",
      recipients: 2847,
      date: "2026-01-18",
      time: "10:00 AM",
      clickRate: "34%",
      convertRate: "12%",
      revenue: "$6,450",
      status: "Sent",
    },
    {
      id: 2,
      title: "Welcome Bonus Extended!",
      message:
        "New customer? Your 15% welcome offer is now valid until Feb 28! Start saving today.",
      campaign: "Welcome Offer Extension",
      target: "New Customers",
      recipients: 456,
      date: "2026-01-18",
      time: "9:30 AM",
      clickRate: "45%",
      convertRate: "28%",
      revenue: "$3,240",
      status: "Sent",
    },
    {
      id: 3,
      title: "Weekend Super Sale - Limited Time",
      message:
        "48-hour flash sale! 20% off all wash & fold orders this weekend only. Don't miss out!",
      campaign: "Weekend Flash Sale",
      target: "Active Customers",
      recipients: 1523,
      date: "2026-01-20",
      time: "8:00 AM",
      clickRate: "52%",
      convertRate: "31%",
      revenue: "$12,680",
      status: "Sent",
    },
    {
      id: 4,
      title: "VIP Exclusive: 30% OFF Premium Services",
      message:
        "As our valued VIP member, enjoy exclusive 30% discount on all premium services this month!",
      campaign: "VIP Exclusive",
      target: "VIP Customers",
      recipients: 187,
      date: "2026-01-15",
      time: "11:00 AM",
      clickRate: "68%",
      convertRate: "42%",
      revenue: "$9,870",
      status: "Sent",
    },
    {
      id: 5,
      title: "Refer a Friend - Both Get $10!",
      message:
        "Share the love! Refer a friend and you both get $10 credit. Unlimited referrals!",
      campaign: "Referral Program",
      target: "All Customers",
      recipients: 2847,
      date: "2026-01-21",
      time: "2:00 PM",
      clickRate: "29%",
      convertRate: "15%",
      revenue: "$4,560",
      status: "Sent",
    },
    {
      id: 6,
      title: "Spring Cleaning Sale Coming Soon!",
      message:
        "Get ready! Our biggest sale of the year starts March 20. Up to 35% off on all services!",
      campaign: "Spring Preview",
      target: "All Customers",
      recipients: 2847,
      date: "2026-01-22",
      time: "12:00 PM",
      clickRate: "41%",
      convertRate: "8%",
      revenue: "$1,200",
      status: "Sent",
    },
  ];

  return (
    <div className="w-full  rounded-xl  shadow-xl">
      
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <div className="flex items-start gap-3">
          <Megaphone className="w-5 h-5 text-purple-500 mt-0.5" />
          <div>
            <h2 className="text-white text-base font-semibold">
              Promotional Campaigns
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Marketing campaigns and promotional notifications sent to customers
            </p>
          </div>
        </div>

        <span className="bg-purple-500/10 text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-500/30">
          {data.length} Campaigns
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-8 px-6 py-3 text-xs text-gray-400 border-b border-gray-800">
        <div className="col-span-2">Title & Message</div>
        <div>Campaign</div>
        <div>Target</div>
        <div>Recipients</div>
        <div>Date & Time</div>
        <div>Performance</div>
        <div>Status</div>
      </div>

      {/* Table Body */}
      <div>
        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-8 px-6 py-4 border-b border-gray-800 hover:bg-white/5 transition"
          >
            {/* Title */}
            <div className="col-span-2 flex gap-3 items-start">
              <Megaphone className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <p className="text-white text-sm font-medium">
                  {item.title}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {item.message}
                </p>
              </div>
            </div>

            {/* Campaign */}
            <div className="flex items-center text-gray-300 text-sm">
              {item.campaign}
            </div>

            {/* Target */}
            <div className="flex items-center text-gray-300 text-sm">
              {getTargetIcon(item.target)}
              {item.target}
            </div>

            {/* Recipients */}
            <div className="text-white text-sm">
              {item.recipients.toLocaleString()}
            </div>

            {/* Date */}
            <div className="text-sm text-gray-300">
              <div>{item.date}</div>
              <div className="text-gray-500 text-xs mt-1">{item.time}</div>
            </div>

            {/* Performance */}
            <div className="text-xs">
              <div className="text-gray-300">Click: {item.clickRate}</div>
              <div className="text-gray-400">Convert: {item.convertRate}</div>
              <div className="text-green-400 mt-1">{item.revenue}</div>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/30">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="px-6 py-4 bg-[#111318] rounded-b-xl">
        <p className="text-gray-400 text-sm mb-4">
          Campaign Performance Summary
        </p>

        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-gray-500 text-xs">Total Sent</p>
            <p className="text-white text-lg font-semibold">10,707</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Avg Click Rate</p>
            <p className="text-white text-lg font-semibold">44.8%</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Avg Conversion</p>
            <p className="text-white text-lg font-semibold">22.7%</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Total Revenue</p>
            <p className="text-green-400 text-lg font-semibold">$40,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalAlerts;