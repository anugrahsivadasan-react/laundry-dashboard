import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getAllBranchesName } from "../../redux/action/branchThunks"
import { clearAdmin } from "../../redux/reducer/adminSlice"

export type AdminForm = {
  name: string
  email: string
  phone: string
  password: string
  branchId: string | number
  permissions: string[]
}

export type UpdateAdminForm = {
  name: string
  email: string
  phone: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: AdminForm) => Promise<void>
  onEdit?: (id: string, data: UpdateAdminForm) => Promise<void> // backend ready
}

const roleOptions = [
  { name: "Branch Admin", id: "STAFF" },
  { name: "Support Staff", id: "MANAGER" },
  { name: "Delivery Manager", id: "DELIVERY" },
]

const AdminModal: React.FC<Props> = ({ isOpen, onClose, onCreate, onEdit }) => {
  const dispatch = useAppDispatch()

  const { branchNames } = useAppSelector((s) => s.branchs)
  const { admin, loading } = useAppSelector((s) => s.admin)
  const [isEdit, setIsEdit] = useState(false)
  const [form, setForm] = useState<AdminForm>({
    name: "",
    email: "",
    phone: "",
    branchId: "",
    password: "",
    permissions: [],
  })

  useEffect(() => {
    if (admin && isOpen) {
      setForm({
        name: admin.name || "",
        email: admin.email || "",
        phone: admin.phone || "",
        branchId: admin.branch?.id || "",
        password: "",
        permissions: [],
      })
      setIsEdit(true)
    }
  }, [admin, isOpen])

  const [inputErrors, setInputErrors] = useState<Partial<AdminForm>>({})
  useEffect(() => {
    if (isOpen) {
      dispatch(getAllBranchesName())
    }
  }, [isOpen])

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (key: keyof AdminForm, value: string) => {
    if (key === "phone") {
      const numeric = value.replace(/\D/g, "")

      if (numeric.length > 10) return

      setForm((prev) => ({ ...prev, phone: numeric }))

      setInputErrors((prev) => ({
        ...prev,
        phone:
          numeric.length === 10
            ? ""
            : numeric.length === 0
              ? "phone required"
              : "Phone must be 10 digits",
      }))

      return
    }

    if (key === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      setForm((prev) => ({ ...prev, email: value }))

      setInputErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value)
          ? ""
          : value.length === 0
            ? " email required"
            : "Invalid email",
      }))

      return
    }
    if (key === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/

      setForm((prev) => ({ ...prev, password: value }))

      setInputErrors((prev) => ({
        ...prev,
        password: passwordRegex.test(value)
          ? ""
          : value.length === 0
            ? " password required"
            : "Min 8 chars, 1 uppercase, 1 lowercase, 1 special char required",
      }))

      return
    }

    setForm((prev) => ({ ...prev, [key]: value }))

    setInputErrors((prev) => ({
      ...prev,
      [key]: value.trim() === "" ? `${key} required` : "",
    }))
  }

  /* ================= PERMISSIONS ================= */

  const togglePermission = (perm: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }))
  }

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    const newErrors: any = {}
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/
    if (!form.name.trim()) newErrors.name = "name required"

    if (!form.email.trim()) {
      newErrors.email = "Email required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!form.phone) {
      newErrors.phone = "Phone required"
    } else if (form.phone.length !== 10) {
      newErrors.phone = "Phone must be 10 digits"
    }

    if (!isEdit && !form.branchId) {
      newErrors.branchId = "Branch required"
    }
    if (!isEdit) {
      if (!form.branchId) {
        newErrors.password = "Password required"
      } else if (!passwordRegex.test(form.password)) {
        newErrors.password =
          "Password must be 8+ chars with uppercase, lowercase, and special character"
      }
    }

    setInputErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    const valid = validateForm()
    if (!valid) return
    console.log("object")
    try {
      if (isEdit && onEdit && admin?.id) {
        debugger
        await onEdit(admin?.id, {
          name: form.name,
          email: form.email,
          phone: form.phone,
        })
      } else {
        await onCreate(form)
      }

      handleClose()
    } catch (err) {
      console.error(err)
    }
  }

  /* ================= RESET ================= */

  const handleClose = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      branchId: "",
      password: "",
      permissions: [],
    })

    setInputErrors({})
    dispatch(clearAdmin())
    setIsEdit(false)
    onClose()
  }

  if (!isOpen) return null
  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-2xl bg-[#0f0f10] border border-gray-800 rounded-xl p-6">
        <h2 className="text-white text-lg font-semibold mb-1">Add New Admin</h2>

        <p className="text-sm text-gray-400 mb-6">Create a new admin user</p>

        <div className="space-y-4">
          {/*  NAME */}

          <Input
            label="Name"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            error={inputErrors.name}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* EMAIL */}

            <Input
              label="Email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              error={inputErrors.email}
            />

            {/* PHONE */}

            <Input
              label="Phone"
              value={form.phone}
              onChange={(v) => handleChange("phone", v)}
              error={inputErrors.phone}
              maxLength={10}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* BRANCH  */}
            {isEdit ? (
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Branch
                </label>
                <div className="bg-[#151517] border border-gray-700 px-3 py-2 rounded-md opacity-60 cursor-not-allowed text-gray-300">
                  {admin?.branch?.name}
                </div>
              </div>
            ) : (
              <Select
                label="Branch"
                value={form.branchId}
                onChange={(v) => handleChange("branchId", v)}
                error={inputErrors.branchId}
                options={branchNames}
                disabled={isEdit}
              />
            )}

            {!isEdit && (
              <Input
                label="Password"
                value={form.password}
                onChange={(v) => handleChange("password", v)}
                error={inputErrors.password}
              />
            )}
          </div>

          {/* PERMISSIONS */}

          <div>
            <h3 className="text-sm text-gray-300 mb-2">Permissions</h3>

            <div className="grid grid-cols-2 gap-2">
              {["Orders", "Customers", "Payments", "Reports", "Settings"].map(
                (perm) => (
                  <label
                    key={perm}
                    className="flex items-center gap-2 text-gray-300 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={form.permissions.includes(perm)}
                      onChange={() => togglePermission(perm)}
                    />
                    {perm}
                  </label>
                ),
              )}
            </div>
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
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update Branch"
                : "Create Branch"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminModal

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
      className={`w-full bg-[#151517] border ${
        error ? "border-red-500" : "border-gray-700"
      } text-sm text-gray-200 px-3 py-2 rounded-md outline-none`}
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
  disabled?: boolean
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
  error,
  disabled,
}) => (
  <div>
    <label className="text-gray-400 text-xs mb-1 block">{label}</label>

    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-[#151517] border ${
        error ? "border-red-500" : "border-gray-700"
      } text-sm text-gray-200 px-3 py-2 rounded-md outline-none ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
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
