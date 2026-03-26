import React, { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp, Upload, X } from "lucide-react"

interface AddServiceModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: FormData, isEdit?: boolean, id?: string) => void
  selectedService?: any
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedService,
}) => {
  const [serviceName, setServiceName] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")
  const [basePrice, setBasePrice] = useState("")
  const [expressCharge, setExpressCharge] = useState("")
  const [status, setStatus] = useState("New")

  const [isDropOpen, setIsDropOpen] = useState(false)
  const [isExpressEnabled, setIsExpressEnabled] = useState(false)
  const [fileName, setFileName] = useState("")

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const statusOptions = [
    "Recommended",
    "Most Popular",
    "Highly Rated",
    "Express",
    "Classic",
    "Specialized",
    "Premium",
    "Special",
    "Home",
    "Deep Clean",
    "Repair",
    "New",
  ]
  console.log(selectedService)
  useEffect(() => {
    if (selectedService) {
      setServiceName(selectedService.name || "")
      setSubtitle(selectedService.subtitle || "")
      setDescription(selectedService.description || "")
      setBasePrice(String(selectedService.pricePerKg || ""))
      setStatus(selectedService.status || "New")

      setIsExpressEnabled(selectedService.isExpressAvailable || false)
      setExpressCharge(String(selectedService.expressCharge || ""))

      if (selectedService.image) {
        setFileName(selectedService.image.split("/").pop())
      }
    }
  }, [selectedService])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = () => {
    const formData = new FormData()

    formData.append("name", serviceName)
    formData.append("subtitle", subtitle)
    formData.append("description", description)
    formData.append("pricePerKg", basePrice)
    formData.append("status", status)
    formData.append("isExpressAvailable", String(isExpressEnabled))
    formData.append("expressCharge", expressCharge)

    if (fileInputRef.current?.files?.[0]) {
      console.log(fileInputRef.current.files[0])
      formData.append("image", fileInputRef.current.files[0])
    }
    if (selectedService) {
      // EDIT
      onSubmit?.(formData, true, selectedService.id)
    } else {
      // CREATE
      onSubmit?.(formData, false)
    }

    // onSubmit?.(formData)
    handleClose()
  }

  const handleClose = () => {
    // reset
    setServiceName("")
    setSubtitle("")
    setDescription("")
    setBasePrice("")
    setExpressCharge("")
    setFileName("")
    setStatus("New")
    setIsExpressEnabled(false)

    onClose()
  }
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className=" w-[511.99px] h-min-[328.41px] bg-[#171717] border border-[#262626] rounded-[10px] p-6 text-white flex flex-col justify-between relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div>
          <h2 className="text-[18px] font-semibold">Add New Service</h2>
          <p className="text-sm text-gray-400 mt-1">
            Create a new laundry service
          </p>
        </div>

        {/* Form */}
        <div className="mt-5 space-y-4">
          {/* Service Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300">Service Name</label>
              <input
                type="text"
                placeholder="e.g., Wash & Fold"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className=" w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Service Subtitle</label>
              <input
                type="text"
                placeholder="e.g., Perfect for daily wear"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className=" w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              rows={3}
              placeholder="e.g., Wash & Fold description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 resize-none"
            />
          </div>
          {/* Price Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300">Base Price / kg</label>
              <input
                type="text"
                placeholder="0.00"
                value={basePrice}
                onChange={(e) => {
                  const value = e.target.value

                  // allow only numbers + one decimal point
                  if (/^\d*\.?\d*$/.test(value)) {
                    setBasePrice(value)
                  }
                }}
                className=" w-full mt-2 bg-[#1F1F1F] border border-[#262626] rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Express Charge</label>

              <input
                type="text"
                placeholder="0.00"
                value={expressCharge}
                onChange={(e) => {
                  const value = e.target.value

                  // allow only numbers + one decimal point
                  if (/^\d*\.?\d*$/.test(value)) {
                    setExpressCharge(value)
                  }
                }}
                className={`w-full mt-2 border rounded-lg px-3 py-2 text-sm outline-none bg-[#1F1F1F] border-[#262626] focus:border-blue-500 text-white`}
              />
            </div>
          </div>

          {/* status and image */}
          <div className="grid grid-cols-2 gap-4">
            {selectedService && (
              <div>
                <label className="text-sm text-gray-300">Status</label>

                <div className="relative mt-2">
                  {/* SELECT BOX */}
                  <div
                    onClick={() => setIsDropOpen((prev) => !prev)}
                    className="w-full bg-[#1F1F1F] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white flex justify-between items-center cursor-pointer"
                  >
                    {status || "Select Status"}

                    {isDropOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </div>

                  {/* DROPDOWN */}
                  {isDropOpen && (
                    <div className="absolute bottom-full w-full mb-1 bg-[#1F1F1F] border border-[#262626] rounded-lg z-10">
                      {statusOptions.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setStatus(item)
                            setIsDropOpen(false)
                          }}
                          className="px-3 py-2 hover:bg-[#2a2a2a] cursor-pointer text-sm text-white"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm text-gray-300">Image</label>

              {/* Hidden Input */}
              <input
                type="file"
                ref={fileInputRef}
                id="fileUpload"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Custom Upload Box */}
              <label
                htmlFor="fileUpload"
                className="flex items-center justify-center gap-2 mt-2 cursor-pointer bg-[#1F1F1F] border border-[#262626] rounded-lg px-4 py-3 text-sm text-gray-400 hover:border-blue-500"
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
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleClose}
            className=" px-5 py-2 rounded-lg bg-gray-200 text-black text-sm font-medium hover:opacity-90"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className=" px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#155DFC] to-[#9810FA] hover:opacity-90"
          >
            {selectedService ? "Update Service" : "Create Service"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddServiceModal
