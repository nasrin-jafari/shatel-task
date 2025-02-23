import React from "react";
import { CustomModalProps } from "../../../types";

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div role="dialog" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-5 rounded-lg min-w-[600px] relative shadow-lg" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-red-500 text-xl font-bold bg-transparent border-none cursor-pointer" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
