import React, { useCallback, useEffect, useState } from "react"
import { Trash2, Power, SquarePen } from "lucide-react"
import toast from "react-hot-toast"
import { apiAxios } from "../../config/axios"
import socket from "../../config/soket"
import type { getImage } from "../../utils/getImage"

interface Ad {
  id: string
  title: string
  image: string
  location: "HOME" | "MY_ORDERS"
  isActive: boolean
}

const AllAdvertisements: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(false)

  // ================= FETCH =================
  const fetchAds = useCallback(async () => {
    try {
      setLoading(true)

      const res = await apiAxios.get("/super_admin/advertisements/all")

      setAds(res.data?.data || [])
    } catch (error) {
      console.error(error)
      toast.error("Failed to load ads")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAds()
  }, [fetchAds])

  // SOCKET
  useEffect(() => {
    socket.on("advertisement-changed", fetchAds)
    return () => {
      socket.off("advertisement-changed", fetchAds)
    }
  }, [fetchAds])

  // ================= TOGGLE =================
  const handleToggle = async (id: string) => {
    try {
      const res = await apiAxios.patch(
        `/super_admin/advertisements/toggle-status/${id}`,
      )

      toast.success(`Ad ${res.data?.isActive ? "Activated" : "Deactivated"}`)
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    try {
      await apiAxios.delete(`/super_admin/advertisements/delete/${id}`)
      toast.success("Ad deleted")
    } catch {
      toast.error("Delete failed")
    }
  }

  return (
    <div className="w-full bg-[#171717] border border-[#262626] rounded-[14px] p-6 select-none">
      <h2 className="text-white text-lg font-semibold mb-6">
        All Advertisements
      </h2>

      <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
        <table className="w-full  h-full text-sm text-left text-gray-300 min-w-[800px]  border-separate border-spacing-y-2">
          {/* HEADER */}
          <thead className="text-xs text-gray-400">
            <tr className="[&>th]:px-4 [&>th]:py-3">
              <th>Advertisement</th>
              <th>Location</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={4}>
                    <div className="h-12 bg-[#1F1F1F] animate-pulse rounded-lg" />
                  </td>
                </tr>
              ))
            ) : ads.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  No ads found
                </td>
              </tr>
            ) : (
              ads.map((ad) => (
                <tr
                  key={ad.id}
                  className="[&>td]:px-4 [&>td]:py-4 bg-[#171717] hover:bg-[#1F1F1F] rounded-lg"
                >
                  {/* TITLE + IMAGE */}
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={ad.image}
                        className="w-10 h-10 rounded-md object-cover border border-[#262626]"
                      />
                      <span className="text-white">{ad.title}</span>
                    </div>
                  </td>

                  {/* LOCATION */}
                  <td>
                    <span className="text-xs bg-[#1F1F1F] px-3 py-1 rounded">
                      {ad.location}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        ad.isActive
                          ? "bg-green-900/30 text-green-400"
                          : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {ad.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="text-right">
                    <div className="flex justify-end gap-4">
                      {/* TOGGLE */}
                      <Power
                        className={`w-4 h-4 cursor-pointer ${
                          ad.isActive ? "text-green-400" : "text-red-400"
                        }`}
                        onClick={() => handleToggle(ad.id)}
                      />

                      {/* DELETE */}
                      <Trash2
                        className="w-4 h-4 text-red-400 cursor-pointer"
                        onClick={() => handleDelete(ad.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllAdvertisements
