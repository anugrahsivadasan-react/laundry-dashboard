import React from "react";
import {
  Copy,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  SquarePen,
} from "lucide-react";

type StatusType = "Active" | "Expired" | "Scheduled";

interface Offer {
  id: number;
  name: string;
  code: string;
  discount: string;
  scope: string;
  validity: string;
  usage: number;
  maxUsage: number;
  status: StatusType;
}

interface AllOffersProps {
  filter: "all" | "active" | "expired" | "scheduled";
}

const offers: Offer[] = [
  {
    id: 1,
    name: "New Year Special",
    code: "NEWYEAR2026",
    discount: "20%",
    scope: "Global",
    validity: "2026-01-01 to 2026-01-31",
    usage: 347,
    maxUsage: 1000,
    status: "Active",
  },
  {
    id: 2,
    name: "First Time Customer",
    code: "WELCOME15",
    discount: "15%",
    scope: "Global",
    validity: "2025-12-01 to 2025-12-31",
    usage: 892,
    maxUsage: 999,
    status: "Active",
  },
  {
    id: 3,
    name: "Summer Sale",
    code: "SUMMER25",
    discount: "25%",
    scope: "Global",
    validity: "2025-06-01 to 2025-08-31",
    usage: 1987,
    maxUsage: 2000,
    status: "Expired",
  },
  {
    id: 4,
    name: "Valentine Special",
    code: "VALENTINE2026",
    discount: "25%",
    scope: "Global",
    validity: "2026-02-10 to 2026-02-20",
    usage: 0,
    maxUsage: 1000,
    status: "Scheduled",
  },
];

const StatusBadge = ({ status }: { status: StatusType }) => {
  if (status === "Active") {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs">
        <CheckCircle size={14} /> Active
      </span>
    );
  }

  if (status === "Expired") {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-xs">
        <XCircle size={14} /> Expired
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-xs">
      <Clock size={14} /> Scheduled
    </span>
  );
};

const AllOffers: React.FC<AllOffersProps> = ({ filter }) => {
  // ✅ Filtering logic
  const filteredOffers =
    filter === "all"
      ? offers
      : offers.filter(
          (offer) =>
            offer.status.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="w-full bg-[#171717] border border-[#262626] rounded-[14px] px-[24px] py-[24px]">
      <h2 className="text-white text-lg font-semibold mb-6">
        All Promotional Offers
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 border-b border-[#262626]">
            <tr>
              <th className="py-3">Offer Name</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Scope</th>
              <th>Validity</th>
              <th>Usage</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOffers.map((offer) => {
              const percentage =
                (offer.usage / offer.maxUsage) * 100;

              return (
                <tr
                  key={offer.id}
                  className="border-b border-[#262626] hover:bg-[#1F1F1F]"
                >
                  <td className="py-4 text-white font-medium">
                    {offer.name}
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#1F1F1F] px-3 py-1 rounded-md text-blue-400 text-xs">
                        {offer.code}
                      </span>
                      <Copy
                        size={14}
                        className="cursor-pointer text-gray-400 hover:text-white"
                      />
                    </div>
                  </td>

                  <td>{offer.discount}</td>
                  <td>{offer.scope}</td>
                  <td className="text-xs text-gray-400">
                    {offer.validity}
                  </td>

                  <td>
                    <div className="w-[140px]">
                      <div className="text-xs mb-1">
                        {offer.usage} / {offer.maxUsage}
                      </div>
                      <div className="w-full h-1.5 bg-[#262626] rounded-full">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <StatusBadge status={offer.status} />
                  </td>

                  <td className="text-right">
                    <div className="flex justify-end gap-4">
                      <SquarePen
                        size={16}
                        className="text-blue-400 cursor-pointer hover:scale-110"
                      />
                      <Trash2
                        size={16}
                        className="text-red-400 cursor-pointer hover:scale-110"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredOffers.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  No offers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOffers;