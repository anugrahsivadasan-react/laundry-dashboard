import { SquarePen } from "lucide-react"
import { useEffect, useState } from "react"
import AddServiceModal from "./AddServiceModal"
import { apiAxios } from "../../../config/axios"
import toast from "react-hot-toast"

// const services = [
//   {
//     name: "Wash & Fold",
//     basePrice: "$2.50",
//     express: "+$1.00",
//     status: "Active",
//   },
//   {
//     name: "Dry Clean",
//     basePrice: "$8.00",
//     express: "+$3.00",
//     status: "Active",
//   },
//   {
//     name: "Iron/Press",
//     basePrice: "$3.00",
//     express: "+$1.50",
//     status: "Active",
//   },
//   {
//     name: "Wash & Iron",
//     basePrice: "$4.50",
//     express: "+$2.00",
//     status: "Active",
//   },
// ]

type service = {
  id: string
  name: string
  basePrice: string
  express: string
  status: "Active" | "Inactive"
}
type ServiceType = {
  id: string
  name: string
  subtitle?: string
  description: string
  pricePerKg: number
  status: string
  isExpressAvailable: boolean
  expressCharge?: number
  image?: string
}
const ServicesTab = () => {
  const [isopen, setIsOpen] = useState(false)
  const [services, setServices] = useState<service[]>([])
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  )

  const [loading, setLoading] = useState(true)

  const loadService = async () => {
    try {
      const res = await apiAxios.get<{ services: service[] }>(
        "/super_admin/service/",
      )
      setServices(res.data.services)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadService()
  }, [])

  const handleCreateService = async (
    formData: FormData,
    isEdit?: boolean,
    id?: string,
  ) => {
    try {
      if (isEdit && id) {
        await apiAxios.put(`/super_admin/service/update/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        toast.success("Service updated")
      } else {
        await apiAxios.post(`/super_admin/service/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        toast.success("Service created")
      }

      // reload list
      loadService()
    } catch {
      toast.error("Error saving service")
    }
  }

  const handleEditClick = async (id: string) => {
    try {
      const res = await apiAxios.get(`/super_admin/service/${id}`)
      setSelectedService(res.data.data)
      setIsOpen(true)
    } catch {
      toast.error("Failed to load service")
    }
  }

  return (
    <div
      className=" w-full bg-[#171717] border rounded-[14px] p-6 "
      style={{
        borderColor: "#262626",
        borderWidth: "1.25px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">Service List</h2>

        <button
          className=" px-4 h-9 rounded-lg text-sm text-white font-medium "
          style={{
            background: "linear-gradient(90deg, #155DFC 0%, #9810FA 100%)",
          }}
          onClick={() => setIsOpen(true)}
        >
          + Add Service
        </button>
      </div>

      {/* Table */}
      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-5 text-sm text-gray-400 border-b border-[#262626] pb-3">
          <span>Service</span>
          <span>Base Price / kg</span>
          <span>Express Charge</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Table Rows */}
        <div className="mt-4 space-y-4">
          {services.map((service, index) => (
            <div
              key={index}
              className=" grid grid-cols-5 items-center text-sm text-white border-b border-[#262626] pb-4"
            >
              <span>{service.name}</span>
              <span>{service.basePrice}</span>
              <span className="text-gray-300">{service.express}</span>

              {/* Status */}
              <span>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    service.status === "Active"
                      ? "bg-green-900 text-green-400"
                      : "bg-red-900 text-red-400"
                  }`}
                >
                  {service.status}
                </span>
              </span>

              {/* Actions */}
              <span className="flex justify-end">
                <SquarePen
                  className="w-5 h-5 text-[#51A2FF]"
                  strokeWidth={2}
                  onClick={() => handleEditClick(service?.id)}
                />
              </span>
            </div>
          ))}
        </div>

        <AddServiceModal
          isOpen={isopen}
          onClose={() => {
            setIsOpen(false)
            setSelectedService(null)
          }}
          onSubmit={handleCreateService}
          selectedService={selectedService}
        />
      </div>
    </div>
  )
}

export default ServicesTab
