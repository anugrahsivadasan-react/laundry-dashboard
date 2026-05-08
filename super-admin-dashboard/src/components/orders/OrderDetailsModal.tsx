import React, { useCallback, useEffect, useState } from "react"
import { apiAxios } from "../../config/axios"
import toast from "react-hot-toast"

type Props = {
  isOpen: boolean
  onClose: () => void
  orderId: string
}

const OrderDetailsModal: React.FC<Props> = ({ isOpen, onClose, orderId }) => {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // ================= FETCH =================
  const fetchOrder = useCallback(async (id: string) => {
    try {
      setLoading(true)

      const res = await apiAxios.get(`/super_admin/order_mangement/order/${id}`)

      setOrder(res.data?.data || null)
    } catch (error) {
      console.error(error)
      toast.error("Failed to load order details")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen && orderId) {
      fetchOrder(orderId)
    }
  }, [isOpen, orderId, fetchOrder])

  useEffect(() => {
    if (!isOpen) {
      setOrder(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-[700px] max-h-[90vh] overflow-y-auto bg-[#171717] border border-[#262626] rounded-[10px] p-6 text-white flex flex-col gap-5 custom-scrollbar">
        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-[#1F1F1F] animate-pulse rounded"
              />
            ))}
          </div>
        ) : !order ? (
          <p className="text-center text-gray-500">No order found</p>
        ) : (
          <>
            {/* HEADER */}
            <div>
              <h2 className="text-lg font-semibold">
                Order #{order.orderNumber}
              </h2>
              <p className="text-sm text-gray-400">
                View complete order details
              </p>
            </div>

            {/* STATUS */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Status</span>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  order.status === "DELIVERED"
                    ? "bg-green-900/30 text-green-400"
                    : order.status === "CANCELLED"
                      ? "bg-red-900/30 text-red-400"
                      : "bg-yellow-900/30 text-yellow-400"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* PRICING */}
            <Section title="Pricing">
              <Row
                label="Subtotal"
                value={formatCurrency(order.pricing?.subTotal)}
              />

              <Row
                label="GST"
                value={formatCurrency(order.pricing?.gstAmount)}
                valueClass="text-yellow-400"
              />

              <Row
                label="Pickup Charge"
                value={formatCurrency(order.pricing?.pickupCharge)}
                valueClass="text-yellow-400"
              />

              <Row
                label="Discount"
                value={`- ${formatCurrency(order.pricing?.discountAmount)}`}
                valueClass="text-red-400"
              />

              <Divider />

              <Row
                label="Total"
                value={formatCurrency(order.pricing?.totalAmount)}
                valueClass="text-blue-400 font-semibold"
              />

              <Row
                label="Payable"
                value={formatCurrency(order.pricing?.payableAmount)}
                valueClass="text-purple-400 font-semibold"
              />

              <Row
                label="Paid"
                value={formatCurrency(order.pricing?.paidAmount)}
                valueClass="text-green-400 font-semibold"
              />
            </Section>

            {/* PAYMENT */}
            <Section title="Payment">
              <Row label="Method" value={order.payment?.method} />
              <Row label="Status" value={order.payment?.status} />
              <Row label="Type" value={order.payment?.type} />
            </Section>

            {/* BRANCH */}
            <Section title="Branch">
              <Row label="Name" value={order.branch?.name} />
              <Row label="Address" value={order.branch?.address} />
            </Section>

            {/* PICKUP */}
            <Section title="Pickup Person">
              <Row label="Name" value={order.pickupPerson?.name} />
              <Row label="Phone" value={order.pickupPerson?.phone} />
            </Section>

            {/* DELIVERY */}
            <Section title="Delivery Person">
              <Row label="Name" value={order.deliveryPerson?.name} />
              <Row label="Phone" value={order.deliveryPerson?.phone} />
            </Section>

            {/* ITEMS */}
            <Section title="Items">
              <div className="flex flex-col gap-2">
                {order.items?.length > 0 ? (
                  order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="bg-[#1F1F1F] border border-[#262626] px-4 py-3 rounded-md text-sm flex flex-col gap-1"
                    >
                      <div className="flex justify-between">
                        <span className="text-white font-medium">
                          {item.name}
                        </span>
                        <span className="text-blue-400 font-semibold">
                          {formatCurrency(item.total)}
                        </span>
                      </div>

                      <div className="flex justify-between text-xs text-gray-400">
                        <span>
                          {formatCurrency(item.price)} × {item.quantity}
                        </span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No items</p>
                )}
              </div>
            </Section>
          </>
        )}

        {/* FOOTER */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-black rounded-md text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsModal

/* ================= REUSABLE UI ================= */

const Section = ({ title, children }: any) => (
  <div className="flex flex-col gap-2">
    <h3 className="text-sm font-semibold text-gray-300 ">{title}</h3>
    <div className="bg-[#1F1F1F] border border-gray-700 rounded-lg p-3 flex flex-col gap-2">
      {children}
    </div>
  </div>
)

const Row = ({ label, value, valueClass = "" }: any) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-400">{label}</span>
    <span className={valueClass ? valueClass : "text-white"}>
      {value ?? "-"}
    </span>
  </div>
)

const Divider = () => <div className="border-t border-[#262626] my-2" />

/* ================= HELPERS ================= */

const formatCurrency = (value: any) => {
  if (!value || isNaN(value)) return "₹0.00"
  return `₹${Number(value).toFixed(2)}`
}
