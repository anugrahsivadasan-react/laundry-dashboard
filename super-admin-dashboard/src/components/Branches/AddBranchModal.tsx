import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import type { Branch } from "../../redux/interfaceType/branchType"
import { clearBranch } from "../../redux/reducer/branchSlice"

// export type BranchForm = {
//   id?: string
//   name: string
//   code: string
//   address: string
//   city: string
//   state: string
//   zipCode: string
//   phone: string
//   email: string
//   pickup: boolean
//   delivery: boolean
//   express: boolean
// }

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: Branch) => Promise<void> // backend ready
  onEdit?: (id: string, data: Branch) => Promise<void> // backend ready
}

const AddBranchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreate,
  onEdit,
}) => {
  const [form, setForm] = useState<Branch>({
    name: "",
    code: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    pickup: false,
    delivery: false,
    express: false,
    latitude: 0,
    longitude: 0,
  })

  const [inputError, setInputError] = useState<Partial<Branch>>({})

  const { branch, loading } = useAppSelector((s) => s.branchs)
  const dispatch = useAppDispatch()

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (branch && isOpen) {
      setForm({
        name: branch.name || "",
        code: branch.code || "",
        address: branch.address || "",
        city: branch.city || "",
        state: branch.state || "",
        zipCode: branch.zipCode || "",
        phone: branch.phone || "",
        email: branch.email || "",
        pickup: branch.pickup || false,
        delivery: branch.delivery || false,
        express: branch.express || false,
        latitude: branch.latitude || 0,
        longitude: branch.longitude || 0,
      })
      setIsEdit(true)
    }
  }, [branch, isOpen])

  useEffect(() => {
    if (!isOpen) return

    if (!navigator.geolocation) {
      console.log("Geolocation not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        console.log("Location:", latitude, longitude)

        setForm((prev) => ({
          ...prev,
          latitude: Number(latitude.toFixed(5)),
          longitude: Number(longitude.toFixed(5)),
        }))
      },
      (error) => {
        console.log("Location error:", error.message)
      },
    )
  }, [isOpen])

  const handleChange = (
    key: keyof Branch,
    value: string | boolean | number,
  ) => {
    /* ZIP CODE VALIDATION */
    if (key === "zipCode") {
      const numericValue = String(value).replace(/\D/g, "")

      if (numericValue.length > 6) return

      setForm((prev) => ({ ...prev, zipCode: numericValue }))

      setInputError((prev) => ({
        ...prev,
        zipCode:
          numericValue.length === 6
            ? ""
            : numericValue.length === 0
              ? "pincod required"
              : "ZIP Code must be 6 digits",
      }))

      return
    }

    /* PHONE VALIDATION */
    if (key === "phone") {
      const numericValue = String(value).replace(/\D/g, "")

      if (numericValue.length > 10) return

      setForm((prev) => ({ ...prev, phone: numericValue }))

      setInputError((prev) => ({
        ...prev,
        phone:
          numericValue.length === 10
            ? ""
            : numericValue.length === 0
              ? "phone required"
              : "Phone number must be 10 digits",
      }))

      return
    }

    /* EMAIL VALIDATION */
    if (key === "email") {
      setForm((prev) => ({ ...prev, email: String(value) }))

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      setInputError((prev) => ({
        ...prev,
        email: emailRegex.test(String(value))
          ? ""
          : String(value).length === 0
            ? "email required"
            : "Invalid email format",
      }))

      return
    }

    /* OTHER FIELDS */
    setForm((prev) => ({ ...prev, [key]: value }))

    // Clear error when user types
    setInputError((prev) => ({
      ...prev,
      [key]:
        typeof value === "string" && value.trim() === ""
          ? `${key} required`
          : "",
    }))
  }

  const validateForm = () => {
    const errors: any = {}

    if (!form.name.trim()) errors.name = "Branch name is required"
    if (!form.code.trim()) errors.code = "Branch code is required"
    if (!form.address.trim()) errors.address = "Address is required"
    if (!form.city.trim()) errors.city = "City is required"
    if (!form.state.trim()) errors.state = "State is required"

    if (!form.zipCode) {
      errors.zipCode = "ZIP Code is required"
    } else if (form.zipCode.length !== 6) {
      errors.zipCode = "ZIP Code must be 6 digits"
    }

    if (!form.phone) {
      errors.phone = "Phone number is required"
    } else if (form.phone.length !== 10) {
      errors.phone = "Phone number must be 10 digits"
    }

    if (!form.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Invalid email format"
    }

    setInputError(errors)

    return Object.keys(errors).length === 0
  }

  const handleClose = () => {
    setForm({
      name: "",
      code: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      pickup: false,
      delivery: false,
      express: false,
      latitude: 0,
      longitude: 0,
    })
    setInputError({})
    dispatch(clearBranch())
    setIsEdit(false)
    onClose()
  }

  const handleSubmit = async () => {
    const isValid = validateForm()

    if (!isValid) return

    try {
      if (isEdit && onEdit && branch?.id) {
        await onEdit(branch?.id, form)
      } else {
        await onCreate(form)
      }

      handleClose()
    } catch (err) {
      console.error(err)
    }
  }
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-[#0f0f10] border border-gray-800 rounded-xl p-6 shadow-xl">
        {/* Header */}
        <h2 className="text-white text-lg font-semibold mb-1">
          Add New Branch
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Create a new branch location for your laundry service
        </p>

        {/* Form */}
        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Branch Name"
              placeholder="Enter branch name"
              value={form?.name}
              error={inputError.name}
              onChange={(v) => handleChange("name", v)}
            />
            <Input
              label="Branch Code"
              placeholder="e.g., DT001"
              value={form.code}
              error={inputError.code}
              onChange={(v) => handleChange("code", v)}
            />
          </div>

          {/* Address */}
          <Input
            label="Address"
            placeholder="Street address"
            value={form.address}
            error={inputError.address}
            onChange={(v) => handleChange("address", v)}
          />

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              placeholder="City"
              value={form.city}
              error={inputError.city}
              onChange={(v) => handleChange("city", v)}
            />
            <Input
              label="State"
              placeholder="State"
              value={form.state}
              error={inputError.state}
              onChange={(v) => handleChange("state", v)}
            />
            <Input
              label="ZIP Code"
              placeholder="ZIP"
              maxLength={6}
              value={form.zipCode}
              error={inputError.zipCode}
              onChange={(v) => handleChange("zipCode", v)}
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              maxLength={10}
              error={inputError.phone}
              onChange={(v) => handleChange("phone", v)}
            />
            <Input
              label="Email"
              placeholder="branch@juggle.com"
              value={form.email}
              error={inputError.email}
              onChange={(v) => handleChange("email", v)}
            />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              placeholder="10.3366565"
              value={form.latitude}
              onChange={(v) => handleChange("latitude", Number(v))}
            />
            <Input
              label="Longitude"
              placeholder="10.3366565"
              value={form.longitude}
              onChange={(v) => handleChange("longitude", Number(v))}
            />
          </div>

          {/* Service Availability */}
          <div className="pt-2">
            <h3 className="text-white text-sm font-medium mb-3">
              Service Availability
            </h3>

            <ToggleRow
              label="Pickup Service"
              checked={form.pickup}
              onChange={(v) => handleChange("pickup", v)}
            />
            <ToggleRow
              label="Delivery Service"
              checked={form.delivery}
              onChange={(v) => handleChange("delivery", v)}
            />
            <ToggleRow
              label="Express Service"
              checked={form.express}
              onChange={(v) => handleChange("express", v)}
            />
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
          >
            {loading
              ? branch
                ? "Updating..."
                : "Creating..."
              : branch
                ? "Update Branch"
                : "Create Branch"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddBranchModal

/* ================= INPUT ================= */
type InputProps = {
  label: string
  placeholder: string
  value?: string | number
  maxLength?: number

  onChange: (v: string) => void
  error?: string
}

const Input: React.FC<InputProps> = ({
  label,
  maxLength,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div>
    <label className="text-gray-400 text-xs mb-1 block">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`w-full bg-[#151517] border ${
        error ? "border-red-500" : "border-gray-700"
      } text-sm text-gray-200 px-3 py-2 rounded-md outline-none placeholder-gray-500 focus:border-gray-500`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
)

/* ================= TOGGLE ================= */
type ToggleProps = {
  label: string
  checked?: boolean
  onChange: (v: boolean) => void
}

const ToggleRow: React.FC<ToggleProps> = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-gray-300 text-sm">{label}</span>

    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 flex items-center rounded-full transition ${
        checked ? "bg-green-500" : "bg-gray-600"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  </div>
)
