import React, { useState } from "react"
import { Upload } from "lucide-react"

/* ================= TYPES ================= */

type AdForm = {
  title: string
  location: "HOME" | "MY_ORDERS" | ""
  image: File | null
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: FormData) => Promise<void>
}

/* ================= COMPONENT ================= */

const AdvertisementModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState<AdForm>({
    title: "",
    location: "",
    image: null,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof AdForm, string>>>(
    {},
  )
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("")

  if (!isOpen) return null

  /* ================= HANDLE ================= */

  const handleChange = (key: keyof AdForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))

    setErrors((prev) => ({
      ...prev,
      [key]:
        !value || (typeof value === "string" && value.trim() === "")
          ? `${key} required`
          : "",
    }))
  }

  const validate = () => {
    const newErrors: Partial<Record<keyof AdForm, string>> = {}

    if (!form.title.trim()) newErrors.title = "Title required"
    if (!form.location) newErrors.location = "Location required"
    if (!form.image) newErrors.image = "Image required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("title", form.title)
      formData.append("location", form.location)

      if (form.image) {
        formData.append("image", form.image)
      }

      await onCreate(formData)
      handleClose()
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setForm({
      title: "",
      location: "",
      image: null,
    })
    setErrors({})
    setFileName("")
    onClose()
  }

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-[500px] bg-[#171717] border border-[#262626] rounded-[10px] p-6 text-white flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Add Advertisement</h2>
        <p className="text-sm text-gray-400">
          Create a new advertisement banner
        </p>

        {/* TITLE */}
        <Input
          label="Title"
          value={form.title}
          onChange={(v) => handleChange("title", v)}
          error={errors.title}
        />

        {/* LOCATION */}
        <Select
          label="Location"
          value={form.location}
          onChange={(v) => handleChange("location", v)}
          options={[
            { id: "HOME", name: "Home" },
            { id: "MY_ORDERS", name: "My Orders" },
          ]}
          error={errors.location}
        />

        {/* IMAGE */}
        <div>
          <label className="text-gray-400 text-xs mb-1 block">
            Advertisement Image
          </label>

          <input
            type="file"
            id="adUpload"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null
              setFileName(file ? file.name : "")
              handleChange("image", file)
            }}
            className="hidden"
          />

          <label
            htmlFor="adUpload"
            className={`flex items-center justify-center gap-2 mt-2 cursor-pointer bg-[#1F1F1F] border ${
              errors.image ? "border-red-500" : "border-[#262626]"
            } rounded-lg px-4 py-3 text-sm text-gray-400 hover:border-blue-500`}
          >
            <Upload className="w-4 h-4" />

            {fileName ? (
              <span className="truncate max-w-[220px] text-white">
                {fileName}
              </span>
            ) : (
              <span>Upload Image</span>
            )}
          </label>

          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image}</p>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-black rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md text-sm"
          >
            {loading ? "Creating..." : "Create Ad"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdvertisementModal

/* ================= INPUT ================= */

type InputProps = {
  label: string
  value: string
  maxLength?: number
  error?: string
  onChange: (v: string) => void
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  error,
  maxLength,
}) => (
  <div>
    <label className="text-gray-400 text-xs mb-1 block">{label}</label>
    <input
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full mt-2 bg-[#1F1F1F]  border ${
        error ? "border-red-500" : "border-[#262626]"
      } text-sm text-gray-200 px-4 py-3 rounded-lg outline-none focus:border-blue-500 resize-none`}
    />

    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
)

/* ================= SELECT ================= */

type SelectProps = {
  label: string
  value: string
  options: any[]
  error?: string
  onChange: (v: string) => void
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
  error,
}) => (
  <div>
    <label className="text-gray-400 text-xs mb-1 block">{label}</label>

    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full mt-2 bg-[#1F1F1F] border ${
        error ? "border-red-500" : "border-[#262626]"
      } text-sm text-gray-200 px-4 py-3 rounded-md outline-none focus:border-blue-500 resize-none`}
    >
      <option value="">Select</option>

      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>

    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
)
