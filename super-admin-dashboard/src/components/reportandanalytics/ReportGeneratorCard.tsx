import React from "react";
import { Download, Calendar } from "lucide-react";

const ReportGeneratorCard: React.FC = () => {
  return (
    <div className="w-full bg-[#171717] border border-[#262626] rounded-[14px] p-6 flex items-end justify-between gap-8">

      {/* LEFT SECTION */}
      <div className="flex flex-col gap-6 flex-1">
        <h2 className="text-white text-lg font-semibold">
          Generate Custom Report
        </h2>

        <div className="flex gap-6 flex-wrap">

          {/* Report Type */}
          <div className="flex flex-col gap-2 w-[240px]">
            <label className="text-sm text-gray-400">Report Type</label>
            <select className="h-9 bg-[#262626] border border-[#333] text-gray-200 px-3 rounded-lg focus:outline-none">
              <option>Revenue Report</option>
              <option>User Report</option>
              <option>Performance Report</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex flex-col gap-2 w-[240px]">
            <label className="text-sm text-gray-400">Date Range</label>
            <select className="h-9 bg-[#262626] border border-[#333] text-gray-200 px-3 rounded-lg focus:outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 12 Months</option>
            </select>
          </div>

          {/* Export Format */}
          <div className="flex flex-col gap-2 w-[240px]">
            <label className="text-sm text-gray-400">Export Format</label>
            <select className="h-9 bg-[#262626] border border-[#333] text-gray-200 px-3 rounded-lg focus:outline-none">
              <option>PDF</option>
              <option>CSV</option>
              <option>XLSX</option>
            </select>
          </div>

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex gap-3">

        {/* Schedule Button */}
        <button className="h-9 px-4 flex items-center gap-2 rounded-lg border border-[#333] bg-[#FFFFFF] text-[#515151] hover:bg-[#333] transition">
          <Calendar size={16} />
          Schedule Report
        </button>

        {/* Generate Button */}
        <button className="h-9 px-5 flex items-center gap-2 rounded-lg text-white font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition">
          <Download size={16} />
          Generate & Download
        </button>

      </div>
    </div>
  );
};

export default ReportGeneratorCard;