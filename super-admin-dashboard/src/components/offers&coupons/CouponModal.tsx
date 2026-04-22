import React, { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getAllBranchesName } from "../../redux/action/branchThunks"

import { Upload } from "lucide-react"

export type CouponForm = {
  name: string
  code: string
  discountType: "PERCENTAGE" | "FLAT"
  discountValue: string
  minOrderValue: string
  usageLimit: string
  perUserLimit: string
  validFrom: string
  validTo: string
  applyTo: "ALL" | "BRANCH"
  branchId: string
  isActive: boolean
  image: File | null
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: FormData) => Promise<void>
}

const CouponModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const dispatch = useAppDispatch()
  const { branchNames } = useAppSelector((s) => s.branchs)

  const [form, setForm] = useState<CouponForm>({
    name: "",
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    minOrderValue: "",
    usageLimit: "",
    perUserLimit: "1",
    validFrom: "",
    validTo: "",
    applyTo: "ALL",
    branchId: "",
    isActive: true,
    image: null,
  })

  const [inputErrors, setInputErrors] = useState<
    Partial<Record<keyof CouponForm, string>>
  >({})
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState("")

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllBranchesName())
    }
  }, [isOpen, dispatch])

  //auto-generate coupon code
  const generateCouponCode = (name: string) => {
    const prefix = name
      .replace(/[^a-zA-Z]/g, "") // only letters
      .slice(0, 3) // first 3 letters
      .padEnd(3, "X") // if less than 3 letters, fill with X

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let randomPart = ""

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      randomPart += chars[randomIndex]
    }

    return prefix + randomPart
  }

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (key: keyof CouponForm, value: any) => {
    if (key === "code") {
      const upperValue = value.toUpperCase().replace(/\s/g, "")
      setForm((prev) => ({ ...prev, code: upperValue }))
      setInputErrors((prev) => ({
        ...prev,
        code: upperValue.trim() === "" ? "Coupon code required" : "",
      }))
      return
    }

    if (
      ["discountValue", "minOrderValue", "usageLimit", "perUserLimit"].includes(
        key,
      )
    ) {
      const numeric = value.replace(/[^0-9.]/g, "")
      setForm((prev) => ({ ...prev, [key]: numeric }))
      setInputErrors((prev) => ({
        ...prev,
        [key]: numeric.trim() === "" ? `${key} required` : "",
      }))
      return
    }

    if (key === "validFrom" || key === "validTo") {
      const updatedForm = { ...form, [key]: value }
      const today = new Date().toISOString().split("T")[0]

      setForm(updatedForm)

      const errors: any = { ...inputErrors }

      if (key === "validFrom") {
        if (!value) {
          errors.validFrom = "Valid From is required"
        } else if (value < today) {
          errors.validFrom = "Valid From cannot be in the past"
        } else {
          errors.validFrom = ""
        }

        if (updatedForm.validTo && updatedForm.validTo <= value) {
          errors.validTo = "Valid To must be after Valid From"
        } else {
          errors.validTo = ""
        }
      }

      if (key === "validTo") {
        if (!value) {
          errors.validTo = "Valid To is required"
        } else if (updatedForm.validFrom && value <= updatedForm.validFrom) {
          errors.validTo = "Valid To must be after Valid From"
        } else {
          errors.validTo = ""
        }
      }

      setInputErrors(errors)
      return
    }
    if (key === "image") {
      const file = value as File | null

      setForm((prev) => ({ ...prev, image: file }))

      if (file) {
        setInputErrors((prev) => ({
          ...prev,
          image: "",
        }))
      } else {
        setInputErrors((prev) => ({
          ...prev,
          image: "Coupon image required",
        }))
      }

      return
    }

    setForm((prev) => ({ ...prev, [key]: value }))

    setInputErrors((prev) => ({
      ...prev,
      [key]:
        typeof value === "string" && value.trim() === ""
          ? `${key} required`
          : "",
    }))
  }

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    const errors: Partial<Record<keyof CouponForm, string>> = {}

    if (!form.name.trim()) errors.name = "Coupon name required"
    if (!form.code.trim()) errors.code = "Coupon code required"

    if (!["PERCENTAGE", "FLAT"].includes(form.discountType)) {
      errors.discountType = "Invalid discount type"
    }

    if (!form.discountValue || Number(form.discountValue) <= 0) {
      errors.discountValue = "Discount value must be greater than 0"
    }

    if (
      form.discountType === "PERCENTAGE" &&
      Number(form.discountValue) > 100
    ) {
      errors.discountValue = "Percentage discount cannot be greater than 100"
    }

    if (form.minOrderValue && Number(form.minOrderValue) < 0) {
      errors.minOrderValue = "Minimum order value cannot be negative"
    }

    if (form.usageLimit && Number(form.usageLimit) < 1) {
      errors.usageLimit = "Usage limit must be at least 1"
    }

    if (!form.perUserLimit || Number(form.perUserLimit) < 1) {
      errors.perUserLimit = "Per user limit must be at least 1"
    }

    if (!form.validFrom) errors.validFrom = "Valid from date required"
    if (!form.validTo) errors.validTo = "Valid to date required"

    if (form.validFrom && form.validTo) {
      if (new Date(form.validTo) < new Date(form.validFrom)) {
        errors.validTo = "Valid to must be after valid from"
      }
    }

    if (!["ALL", "BRANCH"].includes(form.applyTo)) {
      errors.applyTo = "Invalid apply type"
    }

    if (form.applyTo === "BRANCH" && !form.branchId) {
      errors.branchId = "Branch required"
    }

    if (!form.image) {
      errors.image = "Coupon image required"
    }

    setInputErrors(errors)

    return Object.keys(errors).length === 0
  }

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    const valid = validateForm()
    if (!valid) return

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", form.name)
      formData.append("code", form.code)
      formData.append("discountType", form.discountType)
      formData.append("discountValue", form.discountValue)
      formData.append("minOrderValue", form.minOrderValue || "0")
      formData.append("usageLimit", form.usageLimit || "")
      formData.append("perUserLimit", form.perUserLimit || "1")
      formData.append("validFrom", form.validFrom)
      formData.append("validTo", form.validTo)
      formData.append("applyTo", form.applyTo)
      formData.append(
        "branchId",
        form.applyTo === "BRANCH" ? form.branchId : "",
      )
      formData.append("isActive", String(form.isActive))

      if (form.image) {
        formData.append("image", form.image)
      }

      await onCreate(formData)
      handleClose()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  /* ================= RESET ================= */

  const handleClose = () => {
    setForm({
      name: "",
      code: "",
      discountType: "PERCENTAGE",
      discountValue: "",
      minOrderValue: "",
      usageLimit: "",
      perUserLimit: "1",
      validFrom: "",
      validTo: "",
      applyTo: "ALL",
      branchId: "",
      isActive: true,
      image: null,
    })

    setPreview("")
    setInputErrors({})
    onClose()
  }

  const today = new Date().toISOString().split("T")[0]
  if (!isOpen) return null

  /* ================= UI ================= */
  console.log(form)
  return (
    <div className="fixed inset-0 z-50 flex items-center  justify-center bg-black/60 px-4 ">
      <div className="w-[620px] max-h-[90%]   bg-[#171717] border border-[#262626] rounded-[10px] p-6 text-white flex flex-col gap-4">
        <h2 className="text-white text-lg font-semibold mb-1">
          Add New Coupon
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Create a new coupon offer for customers
        </p>

        <div className="flex-1 overflow-y-auto p-2 space-y-4 no-scrollbar">
          {/* NAME + CODE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Coupon Name"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
              error={inputErrors.name}
            />

            <div>
              <label className="text-gray-400 text-xs mb-1 block">
                Coupon Code
              </label>
              <div className="flex gap-2 mt-3">
                <input
                  value={form.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  className={`w-full bg-[#1F1F1F] border ${
                    inputErrors.code ? "border-red-500" : "border-[#262626]"
                  } text-sm text-gray-200 px-4 py-3 rounded-lg outline-none focus:border-blue-500`}
                />
                <button
                  type="button"
                  onClick={() =>
                    handleChange("code", generateCouponCode(form.name))
                  }
                  className="px-4 py-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 text-sm"
                >
                  Generate
                </button>
              </div>

              {inputErrors.code && (
                <p className="text-red-500 text-xs mt-1">{inputErrors.code}</p>
              )}
            </div>
          </div>

          {/* DISCOUNT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Discount Type"
              value={form.discountType}
              onChange={(v) => handleChange("discountType", v)}
              error={inputErrors.discountType}
              options={[
                { id: "PERCENTAGE", name: "Percentage" },
                { id: "FLAT", name: "Flat" },
              ]}
            />

            <Input
              label="Discount Value"
              value={form.discountValue}
              onChange={(v) => handleChange("discountValue", v)}
              error={inputErrors.discountValue}
            />
          </div>

          {/* ORDER VALUES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Min Order Value"
              value={form.minOrderValue}
              onChange={(v) => handleChange("minOrderValue", v)}
              error={inputErrors.minOrderValue}
            />

            <Input
              label="Usage Limit"
              value={form.usageLimit}
              onChange={(v) => handleChange("usageLimit", v)}
              error={inputErrors.usageLimit}
            />

            <Input
              label="Per User Limit"
              value={form.perUserLimit}
              onChange={(v) => handleChange("perUserLimit", v)}
              error={inputErrors.perUserLimit}
            />
          </div>

          {/* DATE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateInput
              label="Valid From"
              value={form.validFrom}
              min={today}
              onChange={(v) => handleChange("validFrom", v)}
              error={inputErrors.validFrom}
            />

            <DateInput
              label="Valid To"
              value={form.validTo}
              min={
                form.validFrom
                  ? new Date(new Date(form.validFrom).getTime() + 86400000)
                      .toISOString()
                      .split("T")[0]
                  : today
              }
              onChange={(v) => handleChange("validTo", v)}
              error={inputErrors.validTo}
            />
          </div>

          {/* APPLY TO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Apply To"
              value={form.applyTo}
              onChange={(v) => handleChange("applyTo", v)}
              error={inputErrors.applyTo}
              options={[
                { id: "ALL", name: "All Branches" },
                { id: "BRANCH", name: "Single Branch" },
              ]}
            />

            {form.applyTo === "BRANCH" && (
              <Select
                label="Branch"
                value={form.branchId}
                onChange={(v) => handleChange("branchId", v)}
                error={inputErrors.branchId}
                options={branchNames || []}
              />
            )}
            {/* IMAGE */}
            <div>
              <label className="text-sm text-gray-300">Coupon Image</label>

              {/* Hidden File Input */}
              <input
                type="file"
                //   ref={fileInputRef}
                id="couponImageUpload"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null
                  setFileName(file ? file.name : "")
                  handleChange("image", file)
                }}
                className="hidden"
              />

              {/* Custom Upload Box */}
              <label
                htmlFor="couponImageUpload"
                className={`flex items-center justify-center gap-2 mt-2 cursor-pointer bg-[#1F1F1F] border ${
                  inputErrors.image ? "border-red-500" : "border-[#262626]"
                } rounded-lg px-4 py-3 text-sm text-gray-400 hover:border-blue-500 transition`}
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

              {inputErrors.image && (
                <p className="text-red-500 text-xs mt-1">{inputErrors.image}</p>
              )}
            </div>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-3">
            <input
              id="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
            />
            <label htmlFor="isActive" className="text-sm text-gray-300">
              Coupon Active
            </label>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600"
          >
            {loading ? "Creating..." : "Create Coupon"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CouponModal

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

/* ================= DATE INPUT ================= */

type DateInputProps = {
  label: string
  value: string
  min?: string
  error?: string
  onChange: (v: string) => void
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  error,
  min,
}) => (
  <div>
    <label className="text-gray-400 text-xs mb-1 block">{label}</label>

    <input
      type="date"
      value={value}
      min={min}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full mt-2 bg-[#1F1F1F] border ${
        error ? "border-red-500" : "border-[#262626]"
      } text-sm text-gray-200 px-4 py-3 rounded-md outline-none focus:border-blue-500 resize-none`}
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
