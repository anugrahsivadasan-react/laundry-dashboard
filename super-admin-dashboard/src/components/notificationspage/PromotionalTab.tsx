import {
  Megaphone,
  Users,
  UserPlus,
  Activity,
} from "lucide-react";

interface Campaign {
  title: string;
  message: string;
  campaign: string;
  target: string;
  recipients: number;
  date: string;
  time: string;
  clicks: string;
  conversion: string;
  revenue: string;
  status: "Sent";
}

const campaigns: Campaign[] = [
  {
    title: "Valentine's Day Special - 25% OFF",
    message:
      "Show some love! Get 25% off on all dry cleaning services from Feb 10-20. Use code: VALENTINE2026",
    campaign: "Valentine's Day 2026",
    target: "All Customers",
    recipients: 2847,
    date: "2026-01-18",
    time: "10:00 AM",
    clicks: "34%",
    conversion: "12%",
    revenue: "$8,450",
    status: "Sent",
  },
  {
    title: "Welcome Bonus Extended!",
    message:
      "New customer? Your 15% welcome offer is now valid until Feb 28! Start saving today.",
    campaign: "Welcome Offer Extension",
    target: "New Customers",
    recipients: 456,
    date: "2026-01-18",
    time: "9:30 AM",
    clicks: "45%",
    conversion: "28%",
    revenue: "$3,240",
    status: "Sent",
  },
  {
    title: "Weekend Super Sale - Limited Time",
    message:
      "48-hour flash sale! 20% off all wash & fold orders this weekend only. Don't miss out!",
    campaign: "Weekend Flash Sale",
    target: "Active Customers",
    recipients: 1523,
    date: "2026-01-20",
    time: "8:00 AM",
    clicks: "52%",
    conversion: "31%",
    revenue: "$12,680",
    status: "Sent",
  },
  {
    title: "VIP Exclusive: 30% OFF Premium Services",
    message:
      "As our valued VIP member, enjoy exclusive 30% discount on all premium services this month!",
    campaign: "VIP Exclusive",
    target: "VIP Customers",
    recipients: 187,
    date: "2026-01-15",
    time: "11:00 AM",
    clicks: "68%",
    conversion: "42%",
    revenue: "$9,870",
    status: "Sent",
  },
  {
    title: "Refer a Friend - Both Get $10!",
    message:
      "Share the love! Refer a friend and you both get $10 credit. Unlimited referrals!",
    campaign: "Referral Program",
    target: "All Customers",
    recipients: 2847,
    date: "2026-01-21",
    time: "2:00 PM",
    clicks: "29%",
    conversion: "15%",
    revenue: "$4,560",
    status: "Sent",
  },
  {
    title: "Spring Cleaning Sale Coming Soon!",
    message:
      "Get ready! Our biggest sale of the year starts March 20. Up to 35% off on all services!",
    campaign: "Spring Preview",
    target: "All Customers",
    recipients: 2847,
    date: "2026-01-22",
    time: "12:00 PM",
    clicks: "41%",
    conversion: "8%",
    revenue: "$1,200",
    status: "Sent",
  },
];

const PromotionTab = () => {
  return (
    <div className="w-full bg-[#171717] border border-[#262626] rounded-[14px] p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-white font-semibold flex items-center gap-2">
            <Megaphone size={18} className="text-[#AD46FF]" />
            Promotional Campaigns
          </h2>

          <p className="text-sm text-[#A1A1A1]">
            Marketing campaigns and promotional notifications sent to customers
          </p>
        </div>

        <span className="text-xs bg-[#AD46FF1A] text-[#AD46FF] px-3 py-1 rounded-full">
          6 Campaigns
        </span>
      </div>

      {/* TABLE */}

      <table className="w-full text-sm">

        <thead className="text-[#A1A1A1] border-b border-[#262626]">
          <tr>
            <th className="pb-3 text-left">Title & Message</th>
            <th className="pb-3 text-left">Campaign</th>
            <th className="pb-3 text-left">Target</th>
            <th className="pb-3 text-left">Recipients</th>
            <th className="pb-3 text-left">Date & Time</th>
            <th className="pb-3 text-left">Performance</th>
            <th className="pb-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {campaigns.map((item, index) => (
            <tr
              key={index}
              className="border-b border-[#262626] hover:bg-[#1A1A1A]"
            >

              {/* TITLE */}

              <td className="py-5 pr-6">
                <div className="flex items-start gap-2">
                  <Megaphone size={16} className="text-[#AD46FF]" />

                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-xs text-[#A1A1A1]">{item.message}</p>
                  </div>
                </div>
              </td>

              {/* CAMPAIGN */}

              <td className="text-[#E4E4E4]">{item.campaign}</td>

              {/* TARGET */}

              <td>
                <div className="flex items-center gap-2 text-[#A1A1A1]">
                  {item.target === "New Customers" ? (
                    <UserPlus size={16} />
                  ) : (
                    <Users size={16} />
                  )}
                  {item.target}
                </div>
              </td>

              {/* RECIPIENTS */}

              <td className="text-white">{item.recipients.toLocaleString()}</td>

              {/* DATE */}

              <td className="text-[#A1A1A1]">
                <p>{item.date}</p>
                <p className="text-xs">{item.time}</p>
              </td>

              {/* PERFORMANCE */}

              <td>
                <div className="text-xs space-y-1">
                  <p className="text-[#A1A1A1]">Click: {item.clicks}</p>
                  <p className="text-[#A1A1A1]">Convert: {item.conversion}</p>
                  <p className="text-[#00C950] font-medium">{item.revenue}</p>
                </div>
              </td>

              {/* STATUS */}

              <td>
                <span className="bg-[#00C9501A] text-[#00C950] text-xs px-3 py-1 rounded-full">
                  Sent
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* CAMPAIGN PERFORMANCE SUMMARY */}

      <div className="mt-8 bg-[#1A1A1A] border border-[#262626] rounded-xl p-6 grid grid-cols-4 gap-6">

        <div>
          <p className="text-[#A1A1A1] text-sm">Total Sent</p>
          <p className="text-white text-xl font-semibold">10,707</p>
        </div>

        <div>
          <p className="text-[#A1A1A1] text-sm">Avg Click Rate</p>
          <p className="text-white text-xl font-semibold">44.8%</p>
        </div>

        <div>
          <p className="text-[#A1A1A1] text-sm">Avg Conversion</p>
          <p className="text-white text-xl font-semibold">22.7%</p>
        </div>

        <div>
          <p className="text-[#A1A1A1] text-sm">Total Revenue</p>
          <p className="text-[#00C950] text-xl font-semibold">$40,000</p>
        </div>

      </div>
    </div>
  );
};

export default PromotionTab;