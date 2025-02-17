import React from "react";
import { motion } from "framer-motion";
import { XCircle, Check } from "lucide-react";

const ConfirmDialog = ({ handleClose, handleDelete, text="are you sure you want delete" }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center"
      >
        <XCircle className="text-red-500 w-12 h-12 mx-auto" />
        <h2 className="text-xl text-left font-semibold text-gray-900 mt-4">
          confirm delete
        </h2>
        <p className="text-gray-600 mt-2 text-left">
         {text}
        </p>
        <div className="flex justify-between mt-6">
          <button className="btn btn-success btn-outline btn-sm " onClick={handleDelete}>
            <Check />
          </button>
          <button
            className="btn btn-outline btn-error btn-sm "
            onClick={handleClose}
          >
            <XCircle />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmDialog;
