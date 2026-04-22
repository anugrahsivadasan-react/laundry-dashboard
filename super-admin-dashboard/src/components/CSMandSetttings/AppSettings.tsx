import React, { useEffect, useState } from "react"
import { Image, Smartphone, Save, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { apiAxios } from "../../config/axios"
import { getImage } from "../../utils/getImage"

type Settings = {
  applicationName: string
  companyName: string
  supportEmail: string
  supportPhone: string
  addressLine1: string
  city: string
  state: string
  zipCode: string
  enableOnlinePayments: boolean
  enablePickupService: boolean
  enableExpressService: boolean
  enableLoyaltyProgram: boolean
  logo?: string | null
  favicon?: string | null
}

type SettingsErrors = {
  applicationName?: string
  companyName?: string
  supportEmail?: string
  supportPhone?: string
  addressLine1?: string
  city?: string
  state?: string
  zipCode?: string
  logo?: string
  favicon?: string
}

const defaultSettings: Settings = {
  applicationName: "",
  companyName: "",
  supportEmail: "",
  supportPhone: "",
  addressLine1: "",
  city: "",
  state: "",
  zipCode: "",
  enableOnlinePayments: false,
  enablePickupService: false,
  enableExpressService: false,
  enableLoyaltyProgram: false,
  logo: null,
  favicon: null,
}

const AppSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [logo, setLogo] = useState<File | null>(null)
  const [favicon, setFavicon] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null)

  const [errors, setErrors] = useState<SettingsErrors>({})

  const handleChange = (field: keyof Settings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }))
  }

  // =========================
  // LOAD EXISTING SETTINGS
  // =========================
  const loadSettings = async () => {
    try {
      setLoading(true)

      const res = await apiAxios.get("/super_admin/setting/app-settings")

      if (res.data.success && res.data.data) {
        const data = res.data.data

        setSettings({
          applicationName: data.applicationName || "",
          companyName: data.companyName || "",
          supportEmail: data.supportEmail || "",
          supportPhone: data.supportPhone || "",
          addressLine1: data.addressLine1 || "",
          city: data.city || "",
          state: data.state || "",
          zipCode: data.zipCode || "",
          enableOnlinePayments: !!data.enableOnlinePayments,
          enablePickupService: !!data.enablePickupService,
          enableExpressService: !!data.enableExpressService,
          enableLoyaltyProgram: !!data.enableLoyaltyProgram,
          logo: data.logo || null,
          favicon: data.favicon || null,
        })

        setLogoPreview(getImage(data.logo) || null)
        setFaviconPreview(getImage(data.favicon) || null)
        setIsEdit(true)
      } else {
        setSettings(defaultSettings)
        setLogoPreview(null)
        setFaviconPreview(null)
        setIsEdit(false)
      }
    } catch (err) {
      console.error("Failed to load settings:", err)
      setIsEdit(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  // =========================
  // FILE CHANGE HANDLERS
  // =========================
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLogo(file)
    setLogoPreview(URL.createObjectURL(file))
    setErrors((prev) => ({
      ...prev,
      logo: "",
    }))
  }

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFavicon(file)
    setFaviconPreview(URL.createObjectURL(file))
    setErrors((prev) => ({
      ...prev,
      logo: "",
    }))
  }

  const validateForm = () => {
    const newErrors: SettingsErrors = {}

    // text validations
    if (!settings.applicationName.trim()) {
      newErrors.applicationName = "Application name is required"
    }

    if (!settings.companyName.trim()) {
      newErrors.companyName = "Company name is required"
    }

    if (!settings.supportEmail.trim()) {
      newErrors.supportEmail = "Support email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.supportEmail)) {
      newErrors.supportEmail = "Enter a valid email address"
    }

    if (!settings.supportPhone.trim()) {
      newErrors.supportPhone = "Support phone is required"
    } else if (!/^\d{10}$/.test(settings.supportPhone)) {
      newErrors.supportPhone = "Phone number must be exactly 10 digits"
    }

    if (!settings.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required"
    }

    if (!settings.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!settings.state.trim()) {
      newErrors.state = "State is required"
    }

    if (!settings.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required"
    } else if (!/^\d{6}$/.test(settings.zipCode)) {
      newErrors.zipCode = "Zip code must be exactly 6 digits"
    }

    // image validation
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ]
    const maxSize = 2 * 1024 * 1024 // 2MB

    if (logo) {
      if (!allowedTypes.includes(logo.type)) {
        newErrors.logo = "Logo must be png, jpg, jpeg, webp, or svg"
      } else if (logo.size > maxSize) {
        newErrors.logo = "Logo must be less than 2MB"
      }
    }

    if (favicon) {
      if (!allowedTypes.includes(favicon.type)) {
        newErrors.favicon = "Favicon must be png, jpg, jpeg, webp, or svg"
      } else if (favicon.size > maxSize) {
        newErrors.favicon = "Favicon must be less than 2MB"
      }
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // =========================
  // SAVE (CREATE / UPDATE)
  // =========================
  const saveSettings = async () => {
    try {
      const isValid = validateForm()

      if (!isValid) {
        toast.error("Please fix the form errors")
        return
      }
      setLoading(true)

      // optional validation
      if (!settings.applicationName.trim()) {
        toast.error("Application name is required")
        return
      }

      const formData = new FormData()

      Object.entries(settings).forEach(([key, value]) => {
        if (key !== "logo" && key !== "favicon") {
          formData.append(key, String(value ?? ""))
        }
      })

      if (logo) formData.append("logo", logo)
      if (favicon) formData.append("favicon", favicon)

      let res

      if (isEdit) {
        res = await apiAxios.put(
          "/super_admin/setting/app-settings/update",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )
      } else {
        res = await apiAxios.post(
          "/super_admin/setting/app-settings/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )
      }

      if (res.data.success) {
        toast.success(res.data.message || "Settings saved successfully")
        setLogo(null)
        setFavicon(null)
        await loadSettings()
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // DELETE SETTINGS
  // =========================
  const deleteSettings = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete app settings?",
    )
    if (!confirmDelete) return

    try {
      setLoading(true)

      const res = await apiAxios.delete(
        "/super_admin/setting/app-settings/delete",
      )

      if (res.data.success) {
        toast.success(res.data.message || "Settings deleted successfully")
        setSettings(defaultSettings)
        setLogo(null)
        setFavicon(null)
        setLogoPreview(null)
        setFaviconPreview(null)
        setIsEdit(false)
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Failed to delete settings")
    } finally {
      setLoading(false)
    }
  }
  console.log(errors.zipCode)
  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white p-6">
      <div className="bg-[#111214] border border-[#1e1e1e] rounded-xl p-6">
        {/* Header */}
        <div className="text-sm text-gray-300 mb-6 flex items-center gap-2">
          <span className="text-gray-400">
            <Smartphone size={16} />
          </span>
          Application Settings
        </div>

        {/* BASIC INFO */}
        <div className="mb-8">
          <h2 className="text-sm text-gray-300 mb-4">Basic Information</h2>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="text-xs text-gray-400">Application Name</label>
              <input
                value={settings.applicationName}
                onChange={(e) =>
                  handleChange("applicationName", e.target.value)
                }
                className={`w-full mt-1 p-2 bg-[#1a1b1e] border rounded ${
                  errors.applicationName ? "border-red-500" : "border-[#2a2a2a]"
                }`}
              />
              {errors.applicationName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.applicationName}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400">Company Name</label>
              <input
                value={settings.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className={`w-full mt-1 p-2 bg-[#1a1b1e] border rounded ${
                  errors.companyName ? "border-red-500" : "border-[#2a2a2a]"
                }`}
              />
              {errors.companyName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-gray-400">Support Email</label>
              <input
                value={settings.supportEmail}
                onChange={(e) => handleChange("supportEmail", e.target.value)}
                className={`w-full mt-1 p-2 bg-[#1a1b1e] border rounded ${
                  errors.supportEmail ? "border-red-500" : "border-[#2a2a2a]"
                }`}
              />
              {errors.supportEmail && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.supportEmail}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400">Support Phone</label>
              <input
                value={settings.supportPhone}
                onChange={(e) => handleChange("supportPhone", e.target.value)}
                className={`w-full mt-1 p-2 bg-[#1a1b1e] border rounded ${
                  errors.supportPhone ? "border-red-500" : "border-[#2a2a2a]"
                }`}
              />
              {errors.supportPhone && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.supportPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* LOGO BRANDING */}
        <div className="mb-8">
          <h2 className="text-sm text-gray-300 mb-4">Logo & Branding</h2>

          <div className="grid grid-cols-2 gap-10">
            {/* LOGO */}
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                App Logo
              </label>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image />
                  )}
                </div>

                <label className="bg-gray-200 text-black text-xs px-3 py-2 rounded cursor-pointer hover:bg-white">
                  Upload New Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  {errors.logo && (
                    <p className="text-red-400 text-xs mt-1">{errors.logo}</p>
                  )}
                </label>
              </div>
            </div>

            {/* FAVICON */}
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Favicon
              </label>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1a1b1e] rounded-lg flex items-center justify-center border border-[#2a2a2a] overflow-hidden">
                  {faviconPreview ? (
                    <img
                      src={faviconPreview}
                      alt="favicon"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image />
                  )}
                </div>

                <label className="bg-gray-200 text-black text-xs px-3 py-2 rounded cursor-pointer hover:bg-white">
                  Upload Favicon
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFaviconChange}
                  />
                  {errors.logo && (
                    <p className="text-red-400 text-xs mt-1">{errors.logo}</p>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="mb-8 space-y-4">
          <h2 className="text-sm text-gray-300 mb-4">Business Address</h2>
          <div>
            <input
              value={settings.addressLine1}
              onChange={(e) => handleChange("addressLine1", e.target.value)}
              placeholder="Address Line 1"
              className={`w-full mt-1 p-2 bg-[#1a1b1e] border rounded ${
                errors.addressLine1 ? "border-red-500" : "border-[#2a2a2a]"
              }`}
            />
            {errors.addressLine1 && (
              <p className="text-red-400 text-xs mt-1">{errors.addressLine1}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                value={settings.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
                className={`w-full mt-1 p-2 bg-[#1a1b1e] border rounded ${
                  errors.city ? "border-red-500" : "border-[#2a2a2a]"
                }`}
              />
              {errors.city && (
                <p className="text-red-400 text-xs mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <input
                value={settings.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="State"
                className={`w-full mt-1 p-2 bg-[#1a1b1e] border rounded ${
                  errors.state ? "border-red-500" : "border-[#2a2a2a]"
                }`}
              />
              {errors.state && (
                <p className="text-red-400 text-xs mt-1">{errors.state}</p>
              )}
            </div>
            <div>
              <input
                value={settings.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                placeholder="zipCode"
                className={`w-full mt-1 p-2 bg-[#1a1b1e] border rounded ${
                  errors.zipCode ? "border-red-500" : "border-[#2a2a2a]"
                }`}
              />
              {errors.zipCode && (
                <p className="text-red-400 text-xs mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* FEATURE TOGGLES */}
        <div className="mb-8">
          <h2 className="text-sm text-gray-300 mb-4">Feature Toggles</h2>

          {[
            {
              key: "enableOnlinePayments",
              title: "Enable Online Payments",
              desc: "Allow customers to pay online",
            },
            {
              key: "enablePickupService",
              title: "Enable Pickup Service",
              desc: "Offer pickup and delivery",
            },
            {
              key: "enableExpressService",
              title: "Enable Express Service",
              desc: "Offer express laundry service",
            },
            {
              key: "enableLoyaltyProgram",
              title: "Enable Loyalty Program",
              desc: "Reward repeat customers",
            },
          ].map((feature: any) => (
            <div
              key={feature.key}
              className="flex items-center justify-between bg-[#1a1b1e] border border-[#2a2a2a] rounded-lg p-4 mb-3"
            >
              <div>
                <p className="text-sm">{feature.title}</p>
                <p className="text-xs text-gray-400">{feature.desc}</p>
              </div>

              <button
                onClick={() =>
                  handleChange(
                    feature.key,
                    !settings[feature.key as keyof Settings],
                  )
                }
                className={`w-10 h-5 rounded-full flex items-center p-1 transition ${
                  settings[feature.key as keyof Settings]
                    ? "bg-white"
                    : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-black rounded-full transition ${
                    settings[feature.key as keyof Settings] ? "ml-auto" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={saveSettings}
            disabled={loading}
            className="flex justify-center items-center gap-3 w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-sm disabled:opacity-60"
          >
            <Save />
            {loading
              ? "Saving..."
              : isEdit
                ? "Update Settings"
                : "Create Settings"}
          </button>

          {isEdit && (
            <button
              onClick={deleteSettings}
              disabled={loading}
              className="px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-60"
            >
              <Trash2 />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppSettings
