import React from "react";
import {
  DollarSign,
  CreditCard,
  Smartphone,
  Wallet,
  Calendar,
} from "lucide-react";

type RecordPaymentModalProps = {
  open: boolean;
  onClose?: () => void;
};

const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg bg-white rounded-xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 flex justify-between items-start">
          <h2 className="text-white text-lg font-semibold">
            Record Payment
          </h2>
          <p className="text-white text-sm text-right">
            Order ID:
            <br />
            <span className="font-medium">ORD-001</span>
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Order Summary */}
          <div className="border border-blue-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Order Summary
            </h3>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">ORD-001</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium">John Doe</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">$150</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Paid:</span>
                <span className="font-medium text-green-600">$0</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between">
                <span className="font-medium">Balance Due:</span>
                <span className="font-semibold text-red-600">
                  $150
                </span>
              </div>
            </div>
          </div>

          {/* Payment Amount */}
          <div>
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              Payment Amount *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                type="number"
                defaultValue={150}
                className="w-full h-10 pl-7 pr-3 bg-gray-100 border border-gray-200 rounded-md outline-none text-sm"
              />
            </div>
          </div>

          {/* Payment Date */}
          <div>
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              Payment Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                className="w-full h-10 pl-9 pr-3 bg-gray-100 border border-gray-200 rounded-md outline-none text-sm"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-sm font-medium text-gray-900 mb-2 block">
              Payment Method *
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button className="border rounded-lg p-4 flex items-center gap-3 hover:border-green-500">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Cash</span>
              </button>

              <button className="border rounded-lg p-4 flex items-center gap-3 hover:border-blue-500">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Card</span>
              </button>

              <button className="border rounded-lg p-4 flex items-center gap-3 hover:border-purple-500">
                <Smartphone className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">UPI</span>
              </button>

              <button className="border rounded-lg p-4 flex items-center gap-3 hover:border-orange-500">
                <Wallet className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium">Wallet</span>
              </button>
            </div>
          </div>

          {/* Transaction ID */}
          <div>
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              Transaction ID / Reference
            </label>
            <input
              type="text"
              defaultValue="TXN123456789"
              className="w-full h-10 px-3 bg-gray-100 border border-gray-200 rounded-md outline-none text-sm"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-900 mb-1 block">
              Notes
            </label>
            <textarea
              rows={3}
              placeholder="Any additional notes about this payment"
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none text-sm resize-none"
            />
          </div>

          {/* Additional Options */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Send receipt to customer via email/SMS
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Print receipt after recording
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>

          <button className="px-4 py-2 text-sm text-white rounded-md bg-gradient-to-r from-blue-500 to-purple-600">
            Record Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordPaymentModal;
