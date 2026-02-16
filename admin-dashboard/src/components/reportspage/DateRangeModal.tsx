import React from "react";
import { Calendar } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const presets = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 15 Days",
  "Last 30 Days",
  "Last 60 Days",
  "Last 90 Days",
  "This Month",
  "Last Month",
  "This Year",
];

const DateRangeModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[520px] bg-white rounded-xl shadow-xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex items-center gap-2 px-5 py-4 text-white bg-gradient-to-r from-[#2B7FFF] to-[#9810FA]">
          <Calendar size={18} />
          <h2 className="font-semibold text-sm">Select Date Range</h2>
        </div>

        {/* BODY */}
        <div className="max-h-[75vh] overflow-y-auto p-5 space-y-5">
          {/* PRESETS */}
          <div>
            <p className="text-sm font-medium mb-2">Quick Presets</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  className="px-3 py-1.5 text-xs border rounded-md hover:bg-gray-100"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* CUSTOM RANGE */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium">Custom Date Range</p>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                className="input"
                placeholder="Start Date"
              />
              <input
                type="date"
                className="input"
                placeholder="End Date"
              />
            </div>
          </div>

          {/* TIME RANGE */}
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-medium">Time Range (Optional)</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="time" className="input" />
              <input type="time" className="input" />
            </div>
          </div>

          {/* COMPARE */}
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-medium">Compare with Previous Period</p>
            </div>
            <div className="flex gap-2">
              {["Previous Period", "Same Period Last Year", "Custom"].map((x) => (
                <button
                  key={x}
                  className="px-3 py-1.5 text-xs border rounded-md hover:bg-gray-100"
                >
                  {x}
                </button>
              ))}
            </div>
          </div>

          {/* SELECTED */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-xs space-y-1">
            <p>
              <strong>From:</strong> Not selected
            </p>
            <p>
              <strong>To:</strong> 19/01/2026
            </p>
            <p>
              <strong>Duration:</strong> -- days
            </p>
          </div>

          {/* TIMEZONE */}
          <div>
            <p className="text-sm font-medium mb-2">Timezone</p>
            <input className="input" placeholder="Select timezone" />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center p-4 border-t">
          <button
            onClick={onClose}
            className="px-3 py-2 text-xs border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <div className="flex gap-2">
            <button className="px-3 py-2 text-xs border rounded-md hover:bg-gray-100">
              Reset
            </button>
            <button className="px-3 py-2 text-xs text-white rounded-md bg-gradient-to-r from-[#2B7FFF] to-[#9810FA] hover:opacity-90">
              Apply Date Range
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangeModal;
