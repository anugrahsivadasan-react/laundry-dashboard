import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  Copy,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  SquarePen,
  Power,
} from "lucide-react"
import toast from "react-hot-toast"
import { apiAxios } from "../../../config/axios"
import { getImage } from "../../../utils/getImage"
import socket from "../../../config/soket"

type StatusType = "Active" | "Expired" | "Scheduled" | "Inactive"

interface Offer {
  id: string
  name: string
  code: string
  tag: string
  discount: string
  scope: string
  validity: string
  usage: number
  maxUsage: number | null
  status: StatusType
  image?: string
  isActive?: boolean
}

interface AllOffersProps {
  filter: "all" | "active" | "expired" | "scheduled"
  refreshKey?: number
  onEdit?: (offer: Offer) => void
  onDelete?: (offer: Offer) => void
}

type CouponListResponse = {
  success: boolean
  data: Offer[]
}

const StatusBadge = ({ status }: { status: StatusType }) => {
  if (status === "Active") {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs w-fit">
        <CheckCircle size={14} /> Active
      </span>
    )
  }
  if (status === "Inactive") {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-900/30 text-red-400 text-xs w-fit">
        <XCircle size={14} /> Inactive
      </span>
    )
  }

  if (status === "Expired") {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-xs w-fit">
        <XCircle size={14} /> Expired
      </span>
    )
  }

  return (
    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-xs w-fit">
      <Clock size={14} /> Scheduled
    </span>
  )
}

const AllOffers: React.FC<AllOffersProps> = ({
  filter,
  refreshKey,
  onEdit,
  onDelete,
}) => {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(false)

  // ================= FETCH ALL COUPONS =================
  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true)

      const response = await apiAxios.get<CouponListResponse>(
        "/super_admin/coupons/all",
      )

      setOffers(response.data?.data || [])
    } catch (error: any) {
      console.error("Failed to fetch coupons:", error)
      toast.error("Failed to load offers")
      setOffers([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCoupons()
  }, [fetchCoupons])

  useEffect(() => {
    if (!socket) return

    const handleCouponChange = () => {
      fetchCoupons()
    }

    socket.on("coupon-changed", handleCouponChange)

    return () => {
      socket.off("coupon-changed", handleCouponChange)
    }
  }, [socket, fetchCoupons])

  const handleStatusToggle = async (id: string) => {
    try {
      const res = await apiAxios.patch(
        `/super_admin/coupons/toggle-status/${id}`,
      )

      toast.success(
        `coupon is ${res.data?.isActive ? "activated" : "deactivated"}`,
      )
      // fetchCoupons()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update status")
    }
  }

  // ================= DELETE COUPON =================
  const handleDeleteCoupon = async (id: string) => {
    try {
      await apiAxios.delete(`/super_admin/coupons/delete/${id}`)

      toast.success(`Coupon deleted successfully"`)
      // fetchCoupons()
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete coupon")
    }
  }

  //================= UPDATE TAG =================
  const handleTagUpdate = async (id: string, tag: string) => {
    try {
      await apiAxios.patch(`/super_admin/coupons/update-tag/${id}`, { tag })

      toast.success("Tag updated successfully")

      // optional (socket already handles)
      // fetchCoupons()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update tag")
    }
  }

  // ================= FILTER =================
  const filteredOffers = useMemo(() => {
    if (filter === "all") return offers

    return offers.filter(
      (offer) => offer.status.toLowerCase() === filter.toLowerCase(),
    )
  }, [offers, filter])

  // ================= COPY CODE =================
  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success("Coupon code copied")
    } catch {
      toast.error("Failed to copy code")
    }
  }

  return (
    <div className="w-full bg-[#171717] border border-[#262626] rounded-[14px] px-[24px] py-[24px] select-none">
      <h2 className="text-white text-lg font-semibold mb-6">
        All Promotional Offers
      </h2>

      <div className="max-h-[500px] overflow-y-auto overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-left text-gray-300 min-w-[1100px]  border-separate border-spacing-y-2">
          {/* HEADER */}
          <thead className="text-xs text-gray-400">
            <tr className="[&>th]:px-4 [&>th]:py-3 ">
              <th className="w-[220px]">Offer Name</th>
              <th>Code</th>
              <th>Tag</th>
              <th>Discount</th>
              <th>Scope</th>
              <th>Validity</th>
              <th>Usage</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td colSpan={8} className="px-4 py-4">
                    <div className="h-12 rounded-lg bg-[#1F1F1F] animate-pulse" />
                  </td>
                </tr>
              ))
            ) : filteredOffers.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500">
                  No offers found.
                </td>
              </tr>
            ) : (
              filteredOffers.map((offer) => {
                const percentage =
                  offer.maxUsage && offer.maxUsage > 0
                    ? Math.min((offer.usage / offer.maxUsage) * 100, 100)
                    : 0

                return (
                  <tr
                    key={offer.id}
                    className="[&>td]:px-4 [&>td]:py-4 bg-[#171717] hover:bg-[#1F1F1F] transition rounded-lg"
                  >
                    {/* Offer Name */}
                    <td className="text-white font-medium ">
                      <div className="flex items-center gap-3  w-[180px]">
                        {offer.image ? (
                          <img
                            src={getImage(offer.image)}
                            alt={offer.name}
                            className="w-10 h-10 rounded-md object-cover border border-[#262626]"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-[#262626]" />
                        )}

                        <p>{offer.name}</p>
                      </div>
                    </td>

                    {/* Code */}
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#1F1F1F] px-3 py-1 rounded-md text-blue-400 text-xs">
                          {offer.code}
                        </span>
                        <Copy
                          size={14}
                          onClick={() => handleCopy(offer.code)}
                          className="cursor-pointer text-gray-400 hover:text-white"
                        />
                      </div>
                    </td>

                    {/* Tag */}
                    <td>
                      <select
                        value={offer.tag}
                        disabled={offer.status !== "Active"}
                        onChange={(e) =>
                          handleTagUpdate(offer.id, e.target.value)
                        }
                        className="bg-[#1F1F1F] text-gray-300 text-xs px-2 py-1 rounded border border-[#262626] focus:outline-none"
                      >
                        <option value="FEATURED">FEATURED</option>
                        <option value="SPECIAL">SPECIAL</option>
                        <option value="TRENDING">TRENDING</option>
                        <option value="NEW">NEW</option>
                      </select>
                    </td>

                    {/* Discount */}
                    <td>{offer.discount}</td>

                    {/* Scope */}
                    <td>{offer.scope}</td>

                    {/* Validity */}
                    <td>
                      <div className="text-xs text-gray-400 w-[140px] ">
                        {offer.validity}
                      </div>
                    </td>

                    {/* Usage */}
                    <td>
                      <div className="w-[140px]">
                        <div className="text-xs mb-1">
                          {offer.usage.toLocaleString()} /{" "}
                          {offer.maxUsage !== null
                            ? offer.maxUsage.toLocaleString()
                            : "∞"}
                        </div>

                        <div className="w-full h-1.5 bg-[#262626] rounded-full overflow-hidden">
                          <div
                            className="h-1.5 rounded-full bg-blue-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <StatusBadge status={offer.status} />
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <div className="flex justify-end gap-4">
                        <Power
                          className={`w-4 h-4 cursor-pointer ${
                            !offer.isActive
                              ? "text-red-400 hover:text-red-300"
                              : "text-green-400 hover:text-green-300"
                          }`}
                          onClick={() => handleStatusToggle(offer.id)}
                        />

                        <Trash2
                          size={16}
                          onClick={() => handleDeleteCoupon(offer.id)}
                          className="text-red-400 cursor-pointer hover:scale-110 transition"
                        />
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllOffers
