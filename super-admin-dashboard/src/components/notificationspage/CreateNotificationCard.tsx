import React, { useEffect, useRef, useState } from "react"
import { Send, Bell, Save, ChevronDown, ChevronUp, X } from "lucide-react"
import { apiAxios } from "../../config/axios"
import toast from "react-hot-toast"

/* ---------------------- OPTIONS ---------------------- */
const notificationTypeOptions = [
  { label: "System Alert", value: "SYSTEM" },
  { label: "Promotion", value: "PROMOTIONAL" },
  { label: "Reminder", value: "REMINDER" },
]

const targetAudienceOptions = [
  { label: "All Users", value: "ALL" },
  { label: "By Role", value: "ROLE" },
  { label: "By Branch", value: "BRANCH" },
  { label: "Specific Users", value: "USER" },
]

const priorityOptions = [
  { label: "Info", value: "INFO" },
  { label: "Warning", value: "WARNING" },
  { label: "High", value: "HIGH" },
  { label: "Critical", value: "CRITICAL" },
]

const roleDropdownOptions = [
  { label: "USER", value: "USER" },
  { label: "DRIVER", value: "DRIVER" },
  { label: "ADMIN", value: "ADMIN" },
  { label: "SUPERADMIN", value: "SUPERADMIN" },
]

/* ---------------------- TYPES ---------------------- */
type UserOptionType = {
  name: string
  id: string
  role: string
}

type BranchOptionType = {
  id: string
  name: string
}

interface SearchableDropdownProps {
  label: string
  name: string
  value: string
  options?: { label: string; value: string }[]
  onSelect: (name: string, value: string) => void
  placeholder?: string
}

/* ---------------------- REUSABLE DROPDOWN ---------------------- */
const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  name,
  value,
  options = [],
  onSelect,
  placeholder = "Select option",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const optionRefs = useRef<(HTMLDivElement | null)[]>([])

  const selectedOption = options.find((opt) => opt.value === value)

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSelect = (option: { label: string; value: string }) => {
    onSelect(name, option.value)
    setSearch(option.label)
    setIsOpen(false)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
    setSearch("")
    const selectedIndex = options.findIndex((o) => o.value === value)
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault()
      setIsOpen(true)
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0,
        )
        break

      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1,
        )
        break

      case "Enter":
        e.preventDefault()
        if (filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex])
        }
        break

      case "Escape":
        setIsOpen(false)
        break

      default:
        break
    }
  }

  useEffect(() => {
    if (isOpen && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
      })
    }
  }, [highlightedIndex, isOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
        setSearch("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef}>
      {label && <label className="text-sm text-gray-400">{label}</label>}

      <div className="relative mt-2">
        <input
          type="text"
          value={isOpen ? search : selectedOption?.label || ""}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
            setHighlightedIndex(0)
          }}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 pr-10 text-sm outline-none focus:border-blue-500 text-white placeholder:text-gray-500"
        />

        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-[#1F1F1F] border border-[#262626] rounded-lg z-20 max-h-48 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={option.value}
                ref={(el) => (optionRefs.current[index] = el)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 text-sm cursor-pointer text-white ${
                  highlightedIndex === index
                    ? "bg-[#2A2A2A]"
                    : "hover:bg-[#2A2A2A]"
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}

        {isOpen && filteredOptions.length === 0 && (
          <div className="absolute top-full mt-1 w-full bg-[#1F1F1F] border border-[#262626] rounded-lg z-20 px-4 py-3 text-sm text-gray-400">
            No results found
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------------- MAIN COMPONENT ---------------------- */
const CreateNotificationCard = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "SYSTEM",
    campaign: "",
    priority: "INFO",
    scheduledAt: "",
    dueDate: "",
    targetType: "ALL",
    targetRole: "",
    targetBranchId: "",
    selectedUsers: [] as UserOptionType[],
  })

  const [loading, setLoading] = useState(false)
  const [draftLoading, setDraftLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  /* ---------------------- USER MULTISELECT ---------------------- */
  const [userOptions, setUserOptions] = useState<UserOptionType[]>([])
  const [isUserOpen, setIsUserOpen] = useState(false)
  const [userSearch, setUserSearch] = useState("")
  const [highlightedUserIndex, setHighlightedUserIndex] = useState(0)

  const userWrapperRef = useRef<HTMLDivElement | null>(null)
  const userOptionRefs = useRef<(HTMLDivElement | null)[]>([])

  /* ---------------------- BRANCHES ---------------------- */
  const [branchOptions, setBranchOptions] = useState<BranchOptionType[]>([])
  const [isBranchOpen, setIsBranchOpen] = useState(false)
  const [branchSearch, setBranchSearch] = useState("")
  const [highlightedBranchIndex, setHighlightedBranchIndex] = useState(0)

  const branchWrapperRef = useRef<HTMLDivElement | null>(null)
  const branchOptionRefs = useRef<(HTMLDivElement | null)[]>([])

  /* ---------------------- FETCH USERS ---------------------- */
  const fetchUsers = async () => {
    try {
      const res = await apiAxios.get("/notifications/user-suggestions", {
        withCredentials: true,
      })
      setUserOptions(res.data.users || [])
    } catch (err) {
      console.error("Fetch users error:", err)
    }
  }

  /* ---------------------- FETCH BRANCHES ---------------------- */
  const fetchBranches = async () => {
    try {
      const res = await apiAxios.get("/notifications/branch-suggestions", {
        withCredentials: true,
      })
      setBranchOptions(res.data.branches || [])
    } catch (err) {
      console.error("Fetch branches error:", err)
    }
  }
  /* ---------------------- FILTER USERS ---------------------- */
  const filteredUsers = userOptions.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.id.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.role.toLowerCase().includes(userSearch.toLowerCase())

    const alreadySelected = formData.selectedUsers.some(
      (selected) => selected.id === user.id,
    )

    return matchesSearch && !alreadySelected
  })

  /* ---------------------- FILTER BRANCHES ---------------------- */
  const filteredBranches = branchOptions.filter((branch) =>
    branch.name.toLowerCase().includes(branchSearch.toLowerCase()),
  )

  /* ---------------------- SELECT USER ---------------------- */
  const handleSelectUser = (user: UserOptionType) => {
    setFormData((prev) => ({
      ...prev,
      selectedUsers: [...prev.selectedUsers, user],
    }))
    setUserSearch("")
    setIsUserOpen(false)
    setHighlightedUserIndex(0)
  }

  const handleRemoveUser = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedUsers: prev.selectedUsers.filter((user) => user.id !== id),
    }))
  }

  /* ---------------------- SELECT BRANCH ---------------------- */
  const handleSelectBranch = (branch: BranchOptionType) => {
    setFormData((prev) => ({
      ...prev,
      targetBranchId: branch.id,
    }))
    setBranchSearch(branch.name)
    setIsBranchOpen(false)
  }

  const selectedBranch = branchOptions.find(
    (branch) => branch.id === formData.targetBranchId,
  )

  /* ---------------------- USER KEYBOARD ---------------------- */
  const handleUserKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isUserOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault()
      setIsUserOpen(true)
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedUserIndex((prev) =>
          prev < filteredUsers.length - 1 ? prev + 1 : 0,
        )
        break

      case "ArrowUp":
        e.preventDefault()
        setHighlightedUserIndex((prev) =>
          prev > 0 ? prev - 1 : filteredUsers.length - 1,
        )
        break

      case "Enter":
        e.preventDefault()
        if (filteredUsers[highlightedUserIndex]) {
          handleSelectUser(filteredUsers[highlightedUserIndex])
        }
        break

      case "Escape":
        setIsUserOpen(false)
        break

      case "Backspace":
        if (!userSearch && formData.selectedUsers.length > 0) {
          handleRemoveUser(
            formData.selectedUsers[formData.selectedUsers.length - 1].id,
          )
        }
        break

      default:
        break
    }
  }

  /* ---------------------- BRANCH KEYBOARD ---------------------- */
  const handleBranchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isBranchOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault()
      setIsBranchOpen(true)
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedBranchIndex((prev) =>
          prev < filteredBranches.length - 1 ? prev + 1 : 0,
        )
        break

      case "ArrowUp":
        e.preventDefault()
        setHighlightedBranchIndex((prev) =>
          prev > 0 ? prev - 1 : filteredBranches.length - 1,
        )
        break

      case "Enter":
        e.preventDefault()
        if (filteredBranches[highlightedBranchIndex]) {
          handleSelectBranch(filteredBranches[highlightedBranchIndex])
        }
        break

      case "Escape":
        setIsBranchOpen(false)
        break

      default:
        break
    }
  }

  /* ---------------------- EFFECTS ---------------------- */
  useEffect(() => {
    if (isUserOpen && userOptionRefs.current[highlightedUserIndex]) {
      userOptionRefs.current[highlightedUserIndex]?.scrollIntoView({
        block: "nearest",
      })
    }
  }, [highlightedUserIndex, isUserOpen])

  useEffect(() => {
    if (isBranchOpen && branchOptionRefs.current[highlightedBranchIndex]) {
      branchOptionRefs.current[highlightedBranchIndex]?.scrollIntoView({
        block: "nearest",
      })
    }
  }, [highlightedBranchIndex, isBranchOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userWrapperRef.current &&
        !userWrapperRef.current.contains(e.target as Node)
      ) {
        setIsUserOpen(false)
      }

      if (
        branchWrapperRef.current &&
        !branchWrapperRef.current.contains(e.target as Node)
      ) {
        setIsBranchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  /* ---------------------- FORM HANDLERS ---------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* ---------------------- HANDLE DROPDOWN ---------------------- */
  const handleDropdownSelect = (name: string, value: string) => {
    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        type: value,
        campaign: value === "PROMOTIONAL" ? prev.campaign : "",
        targetType:
          value === "PROMOTIONAL" && !["ALL", "USER"].includes(prev.targetType)
            ? "ALL"
            : prev.targetType,
        targetRole:
          value === "PROMOTIONAL" && !["ALL", "USER"].includes(prev.targetType)
            ? ""
            : prev.targetRole,
        targetBranchId:
          value === "PROMOTIONAL" && !["ALL", "USER"].includes(prev.targetType)
            ? ""
            : prev.targetBranchId,
      }))
      return
    }

    if (name === "targetType") {
      setFormData((prev) => ({
        ...prev,
        targetType: value,
        targetRole: value === "ROLE" ? prev.targetRole : "",
        targetBranchId: value === "BRANCH" ? prev.targetBranchId : "",
        selectedUsers: value === "USER" ? prev.selectedUsers : [],
      }))

      setUserSearch("")
      setIsUserOpen(false)
      setBranchSearch("")
      setIsBranchOpen(false)

      if (value === "USER") {
        fetchUsers()
      } else if (value === "BRANCH") {
        fetchBranches()
      }

      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* ---------------------- VALIDATION ---------------------- */
  const validateForm = () => {
    if (!formData.title.trim()) return "Notification title is required"
    if (!formData.message.trim()) return "Message is required"

    if (
      formData.type === "PROMOTIONAL" &&
      ["ALL", "BRANCH"].includes(formData.targetType)
    ) {
      return "Promotional notifications are only allowed for All Users or Specific Users"
    }

    if (formData.targetType === "ROLE" && !formData.targetRole.trim()) {
      return "Target role is required"
    }

    if (formData.targetType === "BRANCH" && !formData.targetBranchId.trim()) {
      return "Please select a branch"
    }

    if (formData.targetType === "USER" && formData.selectedUsers.length === 0) {
      return "At least one user must be selected"
    }

    if (formData.type === "PROMOTIONAL" && !formData.campaign.trim()) {
      return "Campaign is required"
    }

    const now = new Date()
    const scheduledDate = formData.scheduledAt
      ? new Date(formData.scheduledAt)
      : null
    const dueDate = formData.dueDate ? new Date(formData.dueDate) : null

    if (scheduledDate && scheduledDate < now) {
      return "Scheduled date and time cannot be in the past"
    }

    if (dueDate && dueDate < now) {
      return "Due date and time cannot be in the past"
    }

    if (
      scheduledDate &&
      dueDate &&
      scheduledDate.getTime() === dueDate.getTime()
    ) {
      return "Schedule date and Due date cannot be the same"
    }

    if (scheduledDate && dueDate && dueDate < scheduledDate) {
      return "Due date must be after the scheduled date"
    }

    return ""
  }

  /* ---------------------- BUILD PAYLOAD ---------------------- */
  const buildPayload = () => {
    return {
      title: formData.title.trim(),
      message: formData.message.trim(),
      type: formData.type,
      campaign:
        formData.type === "PROMOTIONAL" ? formData.campaign.trim() : null,
      priority: formData.priority,
      scheduledAt: formData.scheduledAt || null,
      dueDate: formData.dueDate || null,
      targetType: formData.targetType,
      targetRole:
        formData.targetType === "ROLE" ? formData.targetRole.trim() : null,
      targetBranchId:
        formData.targetType === "BRANCH" ? formData.targetBranchId : null,
      userIds:
        formData.targetType === "USER"
          ? formData.selectedUsers.map((user) => user.id)
          : [],
    }
  }
  console.log(buildPayload())
  /* ---------------------- SUBMIT ---------------------- */
  const handleSubmit = async () => {
    setError("")
    setSuccess("")

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)

      const payload = buildPayload()

      const res = await apiAxios.post("/notifications/create", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.data.success) {
        toast.success("Notification sent successfully")

        setFormData({
          title: "",
          message: "",
          type: "SYSTEM",
          campaign: "",
          priority: "INFO",
          scheduledAt: "",
          dueDate: "",
          targetType: "ALL",
          targetRole: "",
          targetBranchId: "",
          selectedUsers: [],
        })

        setUserSearch("")
        setBranchSearch("")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create notification")
    } finally {
      setLoading(false)
    }
  }

  /* ---------------------- SAVE DRAFT ---------------------- */
  const handleSaveDraft = async () => {
    setError("")
    setSuccess("")

    try {
      setDraftLoading(true)
      localStorage.setItem("notificationDraft", JSON.stringify(formData))
      setSuccess("Draft saved successfully")
    } catch (err) {
      setError("Failed to save draft")
    } finally {
      setDraftLoading(false)
    }
  }

  /* ---------------------- TIME ---------------------- */
  const getCurrentDateTimeLocal = () => {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    return now.toISOString().slice(0, 16)
  }

  return (
    <div
      className="w-full bg-[#171717] border border-[#262626] rounded-[14px] p-6 text-white"
      style={{ minHeight: "565px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Bell size={18} className="text-blue-400" />
        <h2 className="text-lg font-semibold">Create New Notification</h2>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SearchableDropdown
            label="Notification Type"
            name="type"
            value={formData.type}
            options={notificationTypeOptions}
            onSelect={handleDropdownSelect}
            placeholder="Select notification type"
          />

          <SearchableDropdown
            label="Target Audience"
            name="targetType"
            value={formData.targetType}
            options={
              formData.type === "PROMOTIONAL"
                ? targetAudienceOptions.filter((opt) =>
                    ["USER", "ROLE"].includes(opt.value),
                  )
                : targetAudienceOptions
            }
            onSelect={handleDropdownSelect}
            placeholder="Select target audience"
          />
        </div>

        {/* Role Dropdown */}
        {formData.targetType === "ROLE" && (
          <SearchableDropdown
            label="Target Role"
            name="targetRole"
            value={formData.targetRole}
            options={
              formData.type === "PROMOTIONAL"
                ? roleDropdownOptions.filter((opt) =>
                    ["USER"].includes(opt.value),
                  )
                : roleDropdownOptions
            }
            onSelect={handleDropdownSelect}
            placeholder="Search or select role"
          />
        )}

        {/* User Multi Select */}
        {formData.targetType === "USER" && (
          <div ref={userWrapperRef}>
            <label className="text-sm text-gray-400">Select Users</label>

            <div className="relative mt-2">
              <div className="w-full min-h-[44px] bg-[#1F1F1F] border border-[#262626] rounded-lg px-3 py-2 flex flex-wrap items-center gap-2 focus-within:border-blue-500">
                {formData.selectedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 bg-[#2A2A2A] text-white text-xs px-3 py-1 rounded-full"
                  >
                    <span>{user.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveUser(user.id)}
                      className="text-gray-300 hover:text-red-400"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => {
                    setUserSearch(e.target.value)
                    setIsUserOpen(true)
                    setHighlightedUserIndex(0)
                  }}
                  onFocus={() => {
                    setIsUserOpen(true)
                    if (userOptions.length === 0) fetchUsers()
                  }}
                  onKeyDown={handleUserKeyDown}
                  placeholder={
                    formData.selectedUsers.length === 0
                      ? "Search users by name, ID, or role"
                      : ""
                  }
                  className="flex-1 min-w-[180px] bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
                />
              </div>

              {isUserOpen && filteredUsers.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-[#1F1F1F] border border-[#262626] rounded-lg z-20 max-h-56 overflow-y-auto">
                  {filteredUsers.map((user, index) => (
                    <div
                      key={user.id}
                      ref={(el) => (userOptionRefs.current[index] = el)}
                      onMouseEnter={() => setHighlightedUserIndex(index)}
                      onClick={() => handleSelectUser(user)}
                      className={`px-4 py-3 cursor-pointer text-sm ${
                        highlightedUserIndex === index
                          ? "bg-[#2A2A2A]"
                          : "hover:bg-[#2A2A2A]"
                      }`}
                    >
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-xs text-gray-400">
                        ID: {user.id} • Role: {user.role}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isUserOpen && userSearch && filteredUsers.length === 0 && (
                <div className="absolute top-full mt-1 w-full bg-[#1F1F1F] border border-[#262626] rounded-lg z-20 px-4 py-3 text-sm text-gray-400">
                  No users found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Branch Select */}
        {formData.targetType === "BRANCH" && (
          <div ref={branchWrapperRef}>
            <label className="text-sm text-gray-400">Select Branch</label>

            <div className="relative mt-2">
              <input
                type="text"
                value={isBranchOpen ? branchSearch : selectedBranch?.name || ""}
                onChange={(e) => {
                  setBranchSearch(e.target.value)
                  setIsBranchOpen(true)
                  setHighlightedBranchIndex(0)
                }}
                onFocus={() => {
                  setIsBranchOpen(true)
                  if (branchOptions.length === 0) fetchBranches()
                }}
                onKeyDown={handleBranchKeyDown}
                placeholder="Search branch"
                className="w-full bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 text-white placeholder:text-gray-500"
              />

              {isBranchOpen && filteredBranches.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-[#1F1F1F] border border-[#262626] rounded-lg z-20 max-h-48 overflow-y-auto">
                  {filteredBranches.map((branch, index) => (
                    <div
                      key={branch.id}
                      ref={(el) => (branchOptionRefs.current[index] = el)}
                      onMouseEnter={() => setHighlightedBranchIndex(index)}
                      onClick={() => handleSelectBranch(branch)}
                      className={`px-4 py-3 cursor-pointer text-sm text-white ${
                        highlightedBranchIndex === index
                          ? "bg-[#2A2A2A]"
                          : "hover:bg-[#2A2A2A]"
                      }`}
                    >
                      {branch.name}
                    </div>
                  ))}
                </div>
              )}

              {isBranchOpen &&
                branchSearch &&
                filteredBranches.length === 0 && (
                  <div className="absolute top-full mt-1 w-full bg-[#1F1F1F] border border-[#262626] rounded-lg z-20 px-4 py-3 text-sm text-gray-400">
                    No branches found
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Notification Title */}
        <div>
          <label className="text-sm text-gray-400">Notification Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter notification title"
            className="w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-sm text-gray-400">Message</label>
          <textarea
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message here..."
            className="w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 resize-none"
          />
        </div>

        {/* Campaign + Priority */}
        <div
          className={`grid grid-cols-1 ${
            formData.type === "PROMOTIONAL" ? "md:grid-cols-2" : ""
          } gap-6`}
        >
          {formData.type === "PROMOTIONAL" && (
            <div>
              <label className="text-sm text-gray-400">
                Notification Campaign
              </label>
              <input
                type="text"
                name="campaign"
                value={formData.campaign}
                onChange={handleChange}
                placeholder="Enter notification campaign"
                className="w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <SearchableDropdown
              label="Priority"
              name="priority"
              value={formData.priority}
              options={priorityOptions}
              onSelect={handleDropdownSelect}
              placeholder="Select priority"
            />
          </div>
        </div>

        {/* Schedule + Due */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-400">Schedule (Optional)</label>
            <input
              type="datetime-local"
              name="scheduledAt"
              value={formData.scheduledAt}
              min={getCurrentDateTimeLocal()}
              onChange={handleChange}
              className="w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Due Date (Optional)</label>
            <input
              type="datetime-local"
              name="dueDate"
              value={formData.dueDate}
              min={formData.scheduledAt || getCurrentDateTimeLocal()}
              onChange={handleChange}
              className="w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 text-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleSaveDraft}
          disabled={draftLoading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-black rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          <Save size={16} />
          {draftLoading ? "Saving..." : "Save as Draft"}
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#155DFC] to-[#9810FA] hover:opacity-90 disabled:opacity-50"
        >
          <Send size={16} />
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </div>
    </div>
  )
}

export default CreateNotificationCard
