import { Calendar, Gift, Percent, Tag } from "lucide-react"
import OfferAndCouponsStats from "../../components/offers&coupons/OffersAndCouponStats"
import OffersAndCouponsTabs from "../../components/offers&coupons/offerscouponstabs/OffersAndCouponsTabs"
import { useCallback, useEffect, useState } from "react"
import { apiAxios } from "../../config/axios"
import CouponModal from "../../components/offers&coupons/CouponModal"
import toast from "react-hot-toast"
import socket from "../../config/soket"

type CouponStatsResponse = {
  totalOffers: number
  activeOffers: number
  totalRedemptions: number
  scheduledOffers: number
  expiredOffers?: number
}

const OffersAndCoupons = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "expired" | "scheduled"
  >("all")
  const [open, setOpen] = useState(false)

  const [statsLoading, setStatsLoading] = useState(false)

  const [stats, setStats] = useState({
    totalOffers: 0,
    activeOffers: 0,
    totalRedemptions: 0,
    scheduledOffers: 0,
    expiredOffers: 0,
  })
  // ================= FETCH STATS =================
  const fetchCouponStats = useCallback(async () => {
    try {
      setStatsLoading(true)

      const response = await apiAxios.get<CouponStatsResponse>(
        "/super_admin/coupons/stats",
      )

      setStats({
        totalOffers: response.data?.totalOffers || 0,
        activeOffers: response.data?.activeOffers || 0,
        totalRedemptions: response.data?.totalRedemptions || 0,
        scheduledOffers: response.data?.scheduledOffers || 0,
        expiredOffers: response.data?.expiredOffers || 0,
      })
    } catch (error: any) {
      console.error("Failed to fetch coupon stats:", error)
      toast.error("Failed to load coupon stats")
    } finally {
      setStatsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCouponStats()
  }, [fetchCouponStats])

  useEffect(() => {
    if (!socket) return

    const handleCouponChanged = () => {
      console.log("coupon changed")
      fetchCouponStats()
    }

    socket.on("coupon-changed", handleCouponChanged)

    return () => {
      socket.off("coupon-changed", handleCouponChanged)
    }
  }, [fetchCouponStats])

  const statsData = [
    {
      title: "Total Offers",
      value: stats?.totalOffers,
      icon: <Gift className="w-5 h-5 text-[#AD46FF]" />,
      iconBg: "bg-[#AD46FF1A]",
    },
    {
      title: "Active Offers",
      value: stats?.activeOffers,
      icon: <Tag className="w-5 h-5 text-[#00C950]" />,
      iconBg: "bg-[#00C9501A]",
    },
    {
      title: "Total REDEMPTIONS",
      value: stats?.totalRedemptions?.toLocaleString(),
      icon: <Percent className="w-5 h-5 text-[#2B7FFF]" />,
      iconBg: "bg-[#2B7FFF1A]",
    },
    {
      title: "Scheduled",
      value: stats?.scheduledOffers,
      icon: <Calendar className="w-5 h-5 text-[#FE9A00]" />,
      iconBg: "bg-[#FE9A001A]",
    },
  ]
  const handleCreateCoupon = async (formData: FormData) => {
    try {
      const response = await apiAxios.post(
        "/super_admin/coupons/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )

      toast.success(response.data?.message || "Coupon created successfully")
      return response.data
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0] ||
        "Failed to create coupon"

      toast.error(errorMessage)
      throw error
    }
  }

  return (
    <div className="p-6 bg-[#0A0A0A] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Offers & Coupons
          </h1>
          <p className="text-[14px] font-arimo text-[#A1A1A1]">
            Create and manage promotional campaigns
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"
        >
          + Add Coupon
        </button>
      </div>

      <OfferAndCouponsStats stats={statsData} />

      <section className="mt-8">
        <OffersAndCouponsTabs activeTab={activeTab} onChange={setActiveTab} />
      </section>
      <CouponModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreateCoupon}
      />
    </div>
  )
}

export default OffersAndCoupons;