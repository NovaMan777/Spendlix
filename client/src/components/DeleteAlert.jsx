import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiX, FiTrash2 } from "react-icons/fi";

const dangerStyles = {
  low:  { bg: "bg-blue-50",  text: "text-blue-800",  btn: "bg-blue-600 hover:bg-blue-700",  icon: "text-blue-500"  },
  medium: { bg: "bg-amber-50", text: "text-amber-800", btn: "bg-amber-600 hover:bg-amber-700", icon: "text-amber-500" },
  high: { bg: "bg-red-50",  text: "text-red-800",  btn: "bg-red-600 hover:bg-red-700",  icon: "text-red-500"  },
};

const DeleteAlert = ({
  title = "Confirm Deletion",
  content,
  confirmText = "Delete",
  cancelText = "Cancel",
  onDelete,
  onCancel,
  dangerLevel = "medium",
}) => {
  const color = dangerStyles[dangerLevel] || dangerStyles.medium;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className={`relative w-full max-w-md p-6 rounded-lg shadow-xl ${color.bg} ${color.text}`}
      >
        {onCancel && (
          <button onClick={onCancel} className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/10">
            <FiX className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${color.bg}`}>
            <FiAlertTriangle className={`w-6 h-6 ${color.icon}`} />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm opacity-90">{content}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {onCancel && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
            >
              {cancelText}
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDelete}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white ${color.btn}`}
          >
            <FiTrash2 className="w-4 h-4" />
            {confirmText}
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteAlert;
