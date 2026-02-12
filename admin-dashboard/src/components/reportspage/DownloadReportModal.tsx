import React from "react";
import {
  FileText,
  FileSpreadsheet,
  File,
  Download,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const reportTypes = [
  "Revenue Report",
  "Orders Report",
  "Customer Report",
  "Services Report",
  "Payment Report",
  "Staff Performance",
  "Inventory Report",
  "Financial Summary",
];

const dateRanges = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "Last Month",
  "Last 3 Months",
  "Last 6 Months",
  "This Year",
  "Last Year",
  "Custom Range",
];

const DownloadReportModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[900px] bg-white rounded-xl shadow-xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="px-6 py-4 text-white bg-gradient-to-r from-[#2B7FFF] to-[#9810FA]">
          <h2 className="font-semibold">Download Report</h2>
          <p className="text-xs opacity-80">
            Generate and download comprehensive business reports
          </p>
        </div>

        {/* BODY */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
          {/* REPORT TYPE */}
          <section>
            <p className="text-sm font-medium mb-2">Select Report Type</p>
            <div className="grid grid-cols-2 gap-3">
              {reportTypes.map((x, i) => (
                <button
                  key={x}
                  className={`p-3 border rounded-lg text-left text-sm hover:bg-gray-50 ${
                    i === 0 && "border-blue-500 bg-blue-50"
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>
          </section>

          {/* DATE RANGE */}
          <section>
            <p className="text-sm font-medium mb-2">Date Range</p>
            <div className="flex flex-wrap gap-2">
              {dateRanges.map((d) => (
                <button
                  key={d}
                  className="px-3 py-1.5 text-xs border rounded-md hover:bg-gray-100"
                >
                  {d}
                </button>
              ))}
            </div>
          </section>

          {/* EXPORT */}
          <section>
            <p className="text-sm font-medium mb-2">Export Format</p>
            <div className="grid grid-cols-3 gap-3">
              <FormatCard icon={<FileText />} title="PDF" />
              <FormatCard icon={<FileSpreadsheet />} title="Excel" />
              <FormatCard icon={<File />} title="CSV" />
            </div>
          </section>

          {/* FILTERS */}
          <section>
            <p className="text-sm font-medium mb-2">Report Filters & Options</p>
            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="Branch" />
              <input className="input" placeholder="Status" />
              <input className="input" placeholder="Payment Method" />
              <input className="input" placeholder="Service Type" />
            </div>
          </section>

          {/* CONTENT */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs grid grid-cols-2 gap-2">
            <label className="flex gap-2">
              <input type="checkbox" /> Include summary statistics
            </label>
            <label className="flex gap-2">
              <input type="checkbox" /> Include charts & graphs
            </label>
            <label className="flex gap-2">
              <input type="checkbox" /> Include detailed breakdown
            </label>
            <label className="flex gap-2">
              <input type="checkbox" /> Include customer details
            </label>
          </section>

          {/* FILE */}
          <section>
            <p className="text-sm font-medium mb-2">File Settings</p>
            <input className="input" defaultValue="Revenue_Report_2026-01-19" />
          </section>

          {/* SUMMARY */}
          <section className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-xs space-y-1">
            <p><strong>Report:</strong> Revenue Report</p>
            <p><strong>Date Range:</strong> Last 30 Days</p>
            <p><strong>Format:</strong> PDF</p>
            <p><strong>Estimated Size:</strong> 2.4 MB</p>
            <p><strong>Processing Time:</strong> ~5 seconds</p>
          </section>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-xs text-white rounded-md bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] hover:opacity-90">
            <Download size={14} />
            Generate & Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadReportModal;

const FormatCard = ({ icon, title }: any) => (
  <button className="p-3 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
    {icon}
    <span className="text-sm">{title}</span>
  </button>
);
 