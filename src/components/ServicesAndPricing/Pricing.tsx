import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

// ---------------- types ----------------
export type PriceRow = {
  id: string;
  category: string;
  washIron: number;
  dryClean: number;
  ironOnly: number;
  express: number;
};

// ---------------- mock data (replace with API later) ----------------
const initialData: PriceRow[] = [
  { id: "1", category: "Shirts", washIron: 50, dryClean: 90, ironOnly: 25, express: 75 },
  { id: "2", category: "Trousers", washIron: 60, dryClean: 100, ironOnly: 30, express: 85 },
  { id: "3", category: "T-Shirts", washIron: 40, dryClean: 70, ironOnly: 20, express: 60 },
  { id: "4", category: "Jeans", washIron: 70, dryClean: 110, ironOnly: 35, express: 95 },
  { id: "5", category: "Sarees", washIron: 120, dryClean: 200, ironOnly: 80, express: 160 },
  { id: "6", category: "Suits", washIron: 150, dryClean: 250, ironOnly: 100, express: 200 },
  { id: "7", category: "Bedsheets", washIron: 80, dryClean: 150, ironOnly: 50, express: 110 },
  { id: "8", category: "Curtains", washIron: 100, dryClean: 180, ironOnly: 60, express: 140 },
];

// ---------------- component ----------------
const Pricing: React.FC = () => {
  const [rows, setRows] = useState<PriceRow[]>(initialData);

  const handleChange = (
    id: string,
    field: keyof Omit<PriceRow, "id" | "category">,
    value: number
  ) => {
    setRows(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleEdit = (id: string) => {
    console.log("Edit row", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete row", id);
  };

  const handleSaveAll = () => {
    console.log("Save to backend", rows);
  };

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-sm">
      {/* header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#101828]">Pricing Configuration</h2>
          <p className="text-sm text-[#667085]">Set prices for each cloth category and service</p>
        </div>
        <button
          onClick={handleSaveAll}
          className="rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-medium text-[#344054] hover:bg-gray-50"
        >
          Save All Changes
        </button>
      </div>

      {/* table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-[#EAECF0] bg-[#F9FAFB] text-left text-xs font-medium text-[#475467]">
              <th className="px-4 py-3">Cloth Category</th>
              <th className="px-4 py-3">Wash &amp; Iron</th>
              <th className="px-4 py-3">Dry Clean</th>
              <th className="px-4 py-3">Iron Only</th>
              <th className="px-4 py-3">Express</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="border-b border-[#F2F4F7] last:border-b-0">
                <td className="px-4 py-4 text-sm text-[#101828]">{row.category}</td>

                {([
                  "washIron",
                  "dryClean",
                  "ironOnly",
                  "express",
                ] as const).map(field => (
                  <td key={field} className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#98A2B3]">$</span>
                      <input
                        type="number"
                        value={row[field]}
                        onChange={e => handleChange(row.id, field, Number(e.target.value))}
                        className="h-8 w-20 rounded-md bg-[#F2F4F7] px-2 text-sm text-[#101828] outline-none focus:ring-2 focus:ring-[#E4E7EC]"
                      />
                    </div>
                  </td>
                ))}

                <td className="px-4 py-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleEdit(row.id)}>
                      <Pencil size={14} className="text-[#101828]" />
                    </button>
                    <button onClick={() => handleDelete(row.id)}>
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pricing;