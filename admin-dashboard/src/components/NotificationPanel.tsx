import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="
              fixed right-6 top-6
              w-full max-w-[360px]
              h-[420px]                 
              bg-gray-100
              border border-gray-300
              rounded-2xl
              shadow-lg
              flex flex-col             
              z-50
            "
            initial={{ x: "120%" }}
            animate={{ x: 0 }}
            exit={{ x: "120%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* Header (fixed) */}
            <div className="p-6 pb-4">
              <h2 className="text-gray-900 text-xl font-semibold">
                Notifications
              </h2>
            </div>

            <div className="border-t border-gray-300" />

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="text-gray-900 font-medium text-lg">
                  New order received
                </h3>
                <p className="text-gray-500 mt-1">
                  Order #1234 from John Doe
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 font-medium text-lg">
                  Pickup scheduled
                </h3>
                <p className="text-gray-500 mt-1">
                  5 items ready for pickup at 3:00 PM
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 font-medium text-lg">
                  Pickup scheduled
                </h3>
                <p className="text-gray-500 mt-1">
                  5 items ready for pickup at 3:00 PM
                </p>
              </div> 

              <div>
                <h3 className="text-gray-900 font-medium text-lg">
                  Pickup scheduled
                </h3>
                <p className="text-gray-500 mt-1">
                  5 items ready for pickup at 3:00 PM
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 font-medium text-lg">
                  Payment received
                </h3>
                <p className="text-gray-500 mt-1">
                  $125 from Order #1230
                </p>
              </div>

              {/* Add many items to test scroll */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
