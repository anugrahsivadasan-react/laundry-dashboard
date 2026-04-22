import { Power, SquarePen, Trash } from "lucide-react"
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

  const handleStatusToggle = async (row: ServiceItemRow) => {
    try {
      const ids = Object.values(row.itemIds || {})
      const newStatus = !(row.status === true)

      if (ids.length === 0) {
        toast.error("No service items found")
        return
      }

      await apiAxios.put("/super_admin/service/service-item/update-status", {
        ids,
        status: newStatus,
      })

      toast.success(`Service group ${newStatus ? "activated" : "deactivated"}`)
      loadServiceItems()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update status")
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
                    {row.status ? "Active" : "Inactive"}
                  </span>
                </span>

                {/* Actions */}
                <span className="px-3 flex justify-end gap-3 ">
                  <SquarePen
                    className="w-4 h-4 text-[#51A2FF]"
                    onClick={() => {
                      setIsOpen(true)
                      handleEditClick(row)
                    }}
                  />

                  <Power
                    className={`w-4 h-4 ${
                      !row.status
                        ? "text-red-400 hover:text-red-300"
                        : "text-green-400 hover:text-green-300"
                    }`}
                    onClick={() => handleStatusToggle(row)}
                  />

                  <Trash
                    className="w-4 h-4 text-[#bf3343]"
                    onClick={() => {
                      handleDeleteRow(row)
                    }}
                  />
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
