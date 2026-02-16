import React from "react";

import activeIcon from "../../assets/icons/activeoffericon.svg";
import UserIcon from "../../assets/icons/UsersIcon.svg";
import discountIcon from "../../assets/icons/discounticon.svg";
import scheduleIcon from "../../assets/icons/scheduledoffericon.svg";

const AdminStaffStatsCard:React.FC = () => {
  const stats = [
    {
      title: "Total Admins",
      value: "8",
      color: "#22C55E",
      icon: activeIcon,
    },
    {
      title: "Branch Managers",
      value: "3",
      color: "#3B82F6",
      icon: UserIcon,
    },
    {
      title: "Delivery Staff",
      value: "12",
      color: "#A855F7",
      icon: discountIcon,
    },
    {
      title: "Active Now",
      value: "5",
      color: "#F97316",
      icon: scheduleIcon,
    },
  ];

  return (
    <div className="flex gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white flex items-center justify-between rounded-[14px]"
          style={{
            width: "409px",
            height: "106px",
            paddingTop: "23.98px",
            paddingBottom: "23.98px",
            paddingLeft: "23.98px",
            paddingRight: "23.98px",
            borderTopWidth: "1.25px",
            borderRightWidth: "1.25px",
            borderBottomWidth: "1.25px",
            borderLeftWidth: "3.75px",
            borderStyle: "solid",
            borderColor: "#E5E7EB",
            borderLeftColor: item.color,
          }}
        >
          <div>
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="text-[20px] font-semibold text-gray-900 mt-1">
              {item.value}
            </h2>
          </div>

          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${item.color}20` }}
          >
            <img src={item.icon} alt={item.title} className="w-5 h-5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStaffStatsCard;
