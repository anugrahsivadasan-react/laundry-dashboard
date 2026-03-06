import { ChartColumnIcon, DollarSign, Package, User } from 'lucide-react';
import ReportStats from '../../components/reportandanalytics/ReportStatsCard';
import ReportGeneratorCard from '../../components/reportandanalytics/ReportGeneratorCard';
import { useState } from 'react';
import ReportAnalysisTabs from '../../components/reportandanalytics/ReportAnalysisTabs';



const statsData = [
  {
    title: "Total Revenue",
    value: 1247,
    icon: <DollarSign className="w-5 h-5 text-[#AD46FF]" />,
    iconBg: "bg-[#AD46FF1A]",
  },
  {
    title: "Total Orders",
    value: 89,
    icon: <Package className="w-5 h-5 text-[#00C950]" />,
    iconBg: "bg-[#00C9501A]",
  },
  {
    title: "New Customers",
    value: 4187,
    icon: <User className="w-5 h-5 text-[#2B7FFF]" />,
    iconBg: "bg-[#2B7FFF1A]",
  },
  {
    title: "Avg Order Value",
    value: 23,
    icon: <ChartColumnIcon className="w-5 h-5 text-[#FE9A00]" />,
    iconBg: "bg-[#FE9A001A]",
  },
];





const ReportAndAnalytics = () => {


const [activeTab, setActiveTab] = useState<"overview" | "branch" | "admin" | "trends">("overview");


  return (
     <div className="p-6 bg-[#0A0A0A] min-h-screen">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Reports & Analytics
          </h1>
          <p className="text-[14px] font-arimo text-[#A1A1A1]">
          Generate comprehensive business reports and analytics
                  </p>
        </div>

       
      </div>


<ReportStats stats={statsData}/>

<section className='mt-8 mb-8'>
<ReportGeneratorCard/>
</section>


<section>
  <ReportAnalysisTabs 
    activeTab={activeTab} 
    onChange={setActiveTab} 
  />
</section>

        </div>
  )
}
    
export default ReportAndAnalytics
