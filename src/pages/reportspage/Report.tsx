import React from 'react'
import ReportStatCard from '../../components/reportspage/ReportStatCard'
import RevenueIcon from '../../assets/icons/revenueicon.svg'
import UsersIcon from '../../assets/icons/usersicon.svg'
import OrdersIcon from '../../assets/icons/OrdersIcon.svg'
import AvgIcon from '../../assets/icons/AvgIcon.svg'


const Report = () => {
  return (
     <div className="p-6 bg-[#F3F6F9] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#101828]">
Reports & Analytics    
     </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            Comprehensive business insights and analytics  
          </p>
        </div>
         <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
         >

          Record Payment 
        </button>
        </div>

<div className="flex gap-4 ">
      <ReportStatCard
        title="Total Revenue"
        value="$196,750"
        subtitle="Last 6 months"
        change="+18%"
        icon={<img src={RevenueIcon} className="w-5 h-5" />}
        borderColor="border-l-blue-500"
      />
      <ReportStatCard
        title="Total Revenue"
        value="$196,750"
        subtitle="Last 6 months"
        change="+18%"
        icon={<img src={OrdersIcon} className="w-5 h-5" />}
        borderColor="border-l-purple-500"
      />
      <ReportStatCard
        title="Total Revenue"
        value="$196,750"
        subtitle="Last 6 months"
        change="+18%"
        icon={<img src={UsersIcon} className="w-5 h-5" />}
        borderColor="border-l-green-500"
      />
      <ReportStatCard
        title="Total Revenue"
        value="$196,750"
        subtitle="Last 6 months"
        change="+18%"
        icon={<img src={AvgIcon} className="w-5 h-5" />}
        borderColor="border-l-orange-500"
      />

</div>

        </div>
  )
}

export default Report
