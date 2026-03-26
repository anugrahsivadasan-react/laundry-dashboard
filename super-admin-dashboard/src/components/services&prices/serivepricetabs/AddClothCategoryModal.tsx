import React, { useEffect, useRef, useState } from "react"
import { apiAxios } from "../../../config/axios"

import { Upload } from "lucide-react"
import type { ServiceItemRow } from "./ClothCategoryTab"

interface AddClothCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: FormData, isEdit?: boolean) => void
  selectedRow?: ServiceItemRow | null
}

type servicesLists = {
  id: string
  name: string
}

type TagType = {
  id: string
  name: string
}

const AddClothCategoryModal: React.FC<AddClothCategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedRow,
}) => {
  const [category, setCategory] = useState("")
  const [type, setType] = useState("")

  //  dynamic services (serviceId -> price)
  const [servicePrices, setServicePrices] = useState<{
    [key: string]: string
  }>({})

  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [servicesList, setServicesList] = useState<servicesLists[]>([])

  const [activeIndex, setActiveIndex] = useState(-1)
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<TagType[]>([]) // API tags
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]) // selected
  const [tagError, setTagError] = useState("")
  const [loading, setLoading] = useState(false)
  const [editItemIds, setEditItemIds] = useState<Record<string, string>>({})

  //  Example service list (later fetch from backend)

  const loadServices = async () => {
    try {
      const res = await apiAxios.get<{ data: servicesLists[] }>(
        "/super_admin/service/name-and-price",
      )
      setServicesList(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Load tags
  const loadTags = async () => {
    try {
      setLoading(true)
      const res = await apiAxios.get<{ tags: TagType[] }>(
        "/super_admin/tags/all",
      )
      setTags(res.data.tags)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
    loadTags()
  }, [])

  useEffect(() => {
    if (!selectedRow || servicesList.length === 0) return

    setCategory(selectedRow.costume || "")
    setType(selectedRow.type || "")
    setFileName(
      selectedRow.image ? selectedRow.image.split("/").pop() || "" : "",
    )

    const prices: Record<string, string> = {}

    servicesList.forEach((service) => {
      prices[service.id] = ""
    })

    servicesList.forEach((service) => {
      const serviceName = service.name
      if (selectedRow[serviceName] !== undefined) {
        prices[service.id] = String(selectedRow[serviceName])
      }
    })

    setServicePrices(prices)
    setEditItemIds(selectedRow.itemIds || {})
    setSelectedTags(selectedRow.tags || [])
  }, [selectedRow, servicesList])
  console.log(selectedRow)
  console.log(servicesList)
  // const servicesList = [
  //   { id: "wash", name: "Wash" },
  //   { id: "dryClean", name: "Dry Clean" },
  //   { id: "iron", name: "Iron" },
  //   { id: "iron", name: "Iron" },
  // ]

  if (!isOpen) return null

  //tags

  const filteredTags = tags.filter(
    (t) =>
      t.name.toLowerCase().includes(tagInput.toLowerCase()) &&
      !selectedTags.some((selected) => selected.id === t.id),
  )

  // Add tag (ENTER)
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!tagInput.trim()) return

    // Arrow Down
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((prev) => (prev < filteredTags.length - 1 ? prev + 1 : 0))
      return
    }

    // Arrow Up
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredTags.length - 1))
      return
    }

    // Enter
    if (e.key === "Enter") {
      e.preventDefault()

      // If highlighted option exists → select it
      if (activeIndex >= 0 && filteredTags[activeIndex]) {
        handleSelectTag(filteredTags[activeIndex])
        return
      }

      // exact match from all tags
      const found = tags.find(
        (t) => t.name.toLowerCase() === tagInput.trim().toLowerCase(),
      )

      if (!found) {
        setTagError("Please select a valid tag from the list")
        return
      }

      if (selectedTags.some((t) => t.id === found.id)) {
        setTagError("Tag already selected")
        return
      }

      handleSelectTag(found)
    }
  }

  // Remove tag
  const removeTag = (id: string) => {
    setSelectedTags((prev) => prev.filter((t) => t.id !== id))
  }

  // Click select from dropdown
  const handleSelectTag = (tag: TagType) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setTagError("Tag already selected")
      return
    }

    setSelectedTags((prev) => [...prev, tag])
    setTagInput("")
    setTagError("")
    setActiveIndex(-1)
  }

  //  handle price change
  const handlePriceChange = (serviceId: string, value: string) => {
    // allow only numbers + one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setServicePrices((prev) => ({
        ...prev,
        [serviceId]: value,
      }))
    }
  }

  //  build services array (ONLY filled values)
  const buildUpdateServicesArray = () => {
    return servicesList
      .filter((service) => servicePrices[service.id] !== "")
      .map((service) => ({
        id: editItemIds[service.name] || null,
        serviceId: service.id,
        serviceName: service.name,
        pricePerPiece: Number(servicePrices[service.id]),
      }))
  }

  const detectDeletedItemIds = () => {
    const stillExistingNames = servicesList
      .filter((service) => servicePrices[service.id] !== "")
      .map((service) => service.name)

    const removedIds = Object.entries(editItemIds)
      .filter(([serviceName]) => !stillExistingNames.includes(serviceName))
      .map(([, itemId]) => itemId)

    return removedIds
  }

  //  file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  //  submit
  const handleSubmit = () => {
    const formData = new FormData()

    formData.append("costume", category)
    formData.append("type", type)

    // services
    formData.append("services", JSON.stringify(buildUpdateServicesArray()))

    formData.append(
      "deletedItemIds",
      JSON.stringify(selectedRow ? detectDeletedItemIds() : []),
    )

    // tags (static or dynamic)
    formData.append("tags", JSON.stringify(selectedTags.map((tag) => tag.id)))

    // image
    if (fileInputRef.current?.files?.[0]) {
      formData.append("image", fileInputRef.current.files[0])
    }
    if (selectedRow) {
      onSubmit?.(formData, !!selectedRow)
    } else {
      onSubmit?.(formData)
    }

    // reset
    resetForm()

    onClose()
  }
  console.log(
    // category,
    // type,
    // servicePrices,
    // selectedTags,
    // tagInput,
    // "servc" + JSON.stringify(buildUpdateServicesArray()),
    // JSON.stringify(selectedTags.map((tag) => tag.id)),

    JSON.stringify(selectedRow ? detectDeletedItemIds() : []),
  )
  const resetForm = () => {
    setCategory("")
    setType("")
    setServicePrices({})
    setFileName("")
    setSelectedTags([])
    setTagInput("")
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50  ">
      <div className="w-[620px] max-h-[90%]   bg-[#171717] border border-[#262626] rounded-[10px] p-6 text-white flex flex-col gap-4">
        {/* Header */}
        <div>
          <h2 className="text-[18px] font-semibold">Add Cloth Category</h2>
          <p className="text-sm text-gray-400 mt-1">
            Add a new category with pricing
          </p>
        </div>
        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4 no-scrollbar">
          {/* Category */}
          <div>
            <label className="text-sm text-gray-300">Category</label>
            <input
              type="text"
              placeholder="e.g., Shirt"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2"
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-sm text-gray-300">Type</label>
            <input
              type="text"
              placeholder="e.g., Cotton"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2"
            />
          </div>

          {/* Dynamic Services */}
          <div>
            <label className="text-sm text-gray-300">Service Pricing</label>

            <div className="grid grid-cols-3 gap-4 mt-2">
              {servicesList?.map((service) => (
                <div key={service.id}>
                  <label className="text-xs text-gray-400">
                    {service.name}
                  </label>

                  <input
                    type="text"
                    placeholder="0.00"
                    value={servicePrices[service.id] || ""}
                    onChange={(e) =>
                      handlePriceChange(service.id, e.target.value)
                    }
                    className="w-full mt-1 bg-[#1F1F1F] border border-[#262626] rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload and tags */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300">Image</label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="upload"
              />

              <label
                htmlFor="upload"
                className="flex items-center justify-center gap-2 mt-2 cursor-pointer bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 text-sm text-gray-400 hover:border-blue-500"
              >
                <Upload className="w-4 h-4" />

                {fileName ? (
                  <span className="truncate max-w-[200px] text-white">
                    {fileName}
                  </span>
                ) : (
                  <span>Upload Image</span>
                )}
              </label>
            </div>

            <div className="relative">
              <label className="text-sm text-gray-300">Tags</label>

              <div
                className={`w-full mt-2 bg-[#1F1F1F] border rounded-lg px-3 py-2 flex flex-wrap gap-2 ${
                  tagError ? "border-red-500" : "border-[#262626]"
                }`}
              >
                {/* Selected Tags */}
                {selectedTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="flex items-center gap-1 bg-[#2a2a2a] text-white text-xs px-2 py-1 rounded-full"
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => removeTag(tag.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      ✕
                    </button>
                  </span>
                ))}

                {/* Input */}
                <input
                  type="text"
                  placeholder="Type and press Enter"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value)
                    setTagError("")
                    setActiveIndex(-1)
                  }}
                  onKeyDown={handleAddTag}
                  className="bg-transparent outline-none text-sm text-white flex-1 min-w-[120px]"
                />
              </div>

              {/* Error */}
              {tagError && (
                <p className="text-red-400 text-xs mt-1">{tagError}</p>
              )}

              {/* Suggestions Dropdown */}
              {tagInput && filteredTags.length > 0 && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-[#1F1F1F] border border-[#262626] rounded-lg max-h-40 overflow-y-auto z-50">
                  {filteredTags.map((t, index) => (
                    <div
                      key={t.id}
                      onClick={() => handleSelectTag(t)}
                      className={`px-3 py-2 text-sm cursor-pointer ${
                        index === activeIndex
                          ? "bg-blue-600 text-white"
                          : "text-white hover:bg-[#2a2a2a]"
                      }`}
                    >
                      {t.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-black rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-[#155DFC] to-[#9810FA]"
          >
            {selectedRow ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddClothCategoryModal
