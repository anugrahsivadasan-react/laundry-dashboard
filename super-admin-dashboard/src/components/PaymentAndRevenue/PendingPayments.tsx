import React from "react";

/* ---------- TYPES ---------- */

export interface PendingPayment {
  id: string;
  customer: string;
  amount: number;
  overdue: string;
}

type Props = {
  data: PendingPayment[];
};

/* ---------- COMPONENT ---------- */

const PendingPayments: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-[#0f0f10] p-5 rounded-xl border border-gray-800">

      <h2 className="text-sm text-gray-300 mb-4">
        Pending Payments
      </h2>

      <table className="w-full text-xs text-gray-300">
        <thead className="text-gray-500">
          <tr>
            <th className="text-left py-2">Order ID</th>
            <th className="text-left">Customer</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Overdue</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p.id} className="border-t border-gray-800">
              <td className="py-2">{p.id}</td>
              <td>{p.customer}</td>
              <td>${p.amount}</td>
              <td>
                <span className="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded">
                  {p.overdue}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default PendingPayments;