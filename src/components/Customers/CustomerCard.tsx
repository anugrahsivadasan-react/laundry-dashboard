import { Eye } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  avatar: string;
  status: string;
  rating: number;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

interface Props {
  customer: Customer;
}

const CustomerCard = ({ customer }: Props) => {
  return (
    <div
      className="bg-white border rounded-[14px] w-full"
      style={{
        paddingTop: "25.23px",
        paddingRight: "25.23px",
        paddingBottom: "12px",
        paddingLeft: "25.23px",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-gray-900">{customer.name}</h3>

            <div className="flex items-center gap-2 text-xs">
              <span
                className={`px-2 py-[2px] rounded-full text-[11px] ${
                  customer.status === "VIP"
                    ? "bg-purple-100 text-purple-600"
                    : customer.status === "New"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {customer.status}
              </span>

              <span className="flex items-center gap-1 text-yellow-500">
                ⭐ {customer.rating}
              </span>
            </div>
          </div>
        </div>

        <Eye className="w-4 h-4 text-gray-400 cursor-pointer" />
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p>✉ {customer.email}</p>
        <p>📞 {customer.phone}</p>
        <p>📍 {customer.address}</p>
      </div>

      <hr className="my-4" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Total Orders</p>
          <p className="font-semibold text-gray-900">
            {customer.totalOrders}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Total Spent</p>
          <p className="font-semibold text-green-600">
            ${customer.totalSpent}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Last Order</p>
          <p className="font-semibold text-gray-900">
            {customer.lastOrder}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="h-9 border rounded-lg text-sm hover:bg-gray-50">
          View Orders
        </button>
        <button className="h-9 border rounded-lg text-sm hover:bg-gray-50">
          Contact
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;
