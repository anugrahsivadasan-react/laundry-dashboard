import { useState } from "react"

interface InvoiceSettings {
  prefix: string
  startingNumber: string
  companyName: string
  address: string
  taxId: string
}

const InvoiceSettingsSection = () => {

  // Mock data (backend ready)
  const [form, setForm] = useState<InvoiceSettings>({
    prefix: "JGL",
    startingNumber: "1000",
    companyName: "Juggle Laundry Services Inc.",
    address: "123 Business St, City, State 12345",
    taxId: "12-3456789",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    console.log("Send to backend:", form)
  }

  return (
    <div className="bg-[#0f0f10] border border-gray-800 rounded-xl p-6 text-white w-full">

      {/* Title */}
      <h2 className="text-sm text-gray-300 mb-6 flex items-center gap-2">
        📄 Invoice Configuration
      </h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Invoice Prefix */}
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Invoice Prefix
          </label>

          <input
            name="prefix"
            value={form.prefix}
            onChange={handleChange}
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-3 py-2 text-sm outline-none"
          />

          <p className="text-[10px] text-gray-500 mt-1">
            Example: JGL-2026-001
          </p>
        </div>

        {/* Starting Number */}
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Starting Number
          </label>

          <input
            name="startingNumber"
            value={form.startingNumber}
            onChange={handleChange}
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-3 py-2 text-sm outline-none"
          />
        </div>

      </div>

      {/* Company Details */}
      <div className="mb-4">
        <label className="text-xs text-gray-400 block mb-2">
          Company Details (appears on invoice)
        </label>

        <div className="flex flex-col gap-2">

          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-3 py-2 text-sm outline-none"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-3 py-2 text-sm outline-none"
          />

          <input
            name="taxId"
            value={form.taxId}
            onChange={handleChange}
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md px-3 py-2 text-sm outline-none"
          />

        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-xs px-4 py-2 rounded-md"
      >
        Save Invoice Settings
      </button>

    </div>
  )
}

export default InvoiceSettingsSection