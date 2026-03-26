import { SquarePen } from "lucide-react"
import AddClothCategoryModal from "./AddClothCategoryModal"
import { useEffect, useState } from "react"
import { apiAxios } from "../../../config/axios"
import toast from "react-hot-toast"

export interface ServiceItemRow {
  costume: string
  type?: string
  image?: string
  status?: boolean
  itemIds: Record<string, string>
  tags?: { id: string; name: string }[]
  [key: string]: any
}

type ServiceItemsType = {
  headers: string[]
  rows: ServiceItemRow[]
}
const ClothCategoryTab = () => {
  const [loading, setLoading] = useState(true)
  const [isopen, setIsOpen] = useState(false)
  const [servicesitems, setServicesitems] = useState<ServiceItemsType | null>(
    null,
  )

  const [selectedServiceItem, setSelectedServiceItem] =
    useState<ServiceItemRow | null>(null)

  const loadServiceItems = async () => {
    try {
      const res = await apiAxios.get<{ data: ServiceItemsType }>(
        "/super_admin/service/service-item/rate",
      )
      setServicesitems(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  console.log(servicesitems)
  useEffect(() => {
    loadServiceItems()
  }, [])

  const handelSubmit = async (formData: FormData, isEdit?: boolean) => {
    try {
      if (isEdit) {
        await apiAxios.put(
          `/super_admin/service/service-item/update-group`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
        toast.success("Service updated")
      } else {
        await apiAxios.post(
          `/super_admin/service/service-item/create-multiple`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
        toast.success("Service created")
      }

      setIsOpen(false)
      setSelectedServiceItem(null)
      loadServiceItems()
    } catch (error) {
      console.error(error)
      toast.error("Error saving service")
    }
  }

  const handleEditClick = (row: ServiceItemRow) => {
    setSelectedServiceItem(row)
    setIsOpen(true)
  }

  const handleDeleteRow = async (row: ServiceItemRow) => {
    try {
      const ids = Object.values(row.itemIds || {})

      if (ids.length === 0) {
        toast.error("No items found to delete")
        return
      }

      await apiAxios.delete(`/super_admin/service/service-item/delete-group`, {
        data: { ids },
      })

      toast.success("Service group deleted")
      loadServiceItems()
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete service group")
    }
  }
  const filteredHeaders =
    servicesitems?.headers?.filter((h: string) => h !== "status") || []
  const columnStyle = {
    gridTemplateColumns: `repeat(${(servicesitems?.headers?.length ?? 0) + 2 || 1}, minmax(150px, 200px))`,
  }
  return (
    <div
      className="w-full bg-[#171717] border rounded-[14px] p-6"
      style={{
        borderColor: "#262626",
        borderWidth: "1.25px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">
          Cloth Categories Pricing
        </h2>

        <button
          className="px-4 h-9 rounded-lg text-sm text-white font-medium"
          onClick={() => setIsOpen(true)}
          style={{
            background: "linear-gradient(90deg, #155DFC 0%, #9810FA 100%)",
          }}
        >
          + Add Category
        </button>
      </div>
      <div className="overflow-x-auto w-full">
        {/* Table Header */}
        <div
          className="grid text-sm text-gray-400 border-b border-[#262626] pb-3 min-w-max"
          style={columnStyle}
        >
          {filteredHeaders.map((header: string, i: number) => (
            <span key={i} className="whitespace-normal break-words px-2">
              {header}
            </span>
          ))}

          <span className="px-2">Status</span>
          <span className=" text-right px-2">Actions</span>
        </div>
        {/* Table Rows */}
        <div className="mt-4 space-y-2">
          {servicesitems?.rows.map((row: ServiceItemRow, index: number) => {
            const isActive = row.status === true || row.status === "true"
            return (
              <div
                key={index}
                className="grid items-center text-sm text-white border-b border-[#262626]  min-w-max hover:bg-[#1F1F1F] transition-colors duration-200 rounded-lg px-2 py-3 cursor-pointer"
                style={columnStyle}
              >
                {filteredHeaders.map((header: string, i: number) => (
                  <span key={i} className="whitespace-normal break-words px-2">
                    {row[header] ?? "-"}
                  </span>
                ))}

                {/* Status */}
                <span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      row.status
                        ? "bg-green-900 text-green-400"
                        : "bg-red-900 text-red-400"
                    }`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </span>

                {/* Actions */}
                <span
                  className="px-3 flex justify-end"
                  onClick={() => {
                    setIsOpen(true)
                    handleEditClick(row)
                  }}
                >
                  <SquarePen className="w-5 h-5 text-[#51A2FF]" />
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <AddClothCategoryModal
        isOpen={isopen}
        onClose={() => {
          setIsOpen(false)
          setSelectedServiceItem(null)
        }}
        onSubmit={handelSubmit}
        selectedRow={selectedServiceItem}
      />
    </div>
  )
}

export default ClothCategoryTab
