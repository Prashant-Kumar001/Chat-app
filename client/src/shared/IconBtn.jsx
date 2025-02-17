import React from "react";
import { MdOutlineMenu, MdClose, MdLogout } from "react-icons/md";

const IconBtn = ({
  icon,
  onClick,
  className = "",
  text,
  showText = true,
  size = "md",
  tooltip = "",
}) => {
  const sizes = {
    sm: "p-1 text-sm",
    md: "p-2 text-base",
    lg: "p-3 text-lg",
  };
  return (
    <div className="relative group inline-flex items-center">
      <button
        className={`flex items-center gap-1 ${sizes[size]} rounded-md transition ${className}`}
        onClick={onClick}
      >
        {icon} {showText && <span>{text}</span>}
      </button>
      {tooltip && (
        <span className="absolute font-mono text-center text-gray-300 left-1/2 transform -translate-x-1/2 top-full mt-1 px-2 py-1 text-xs bg-black rounded opacity-0 group-hover:opacity-100 transition">
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default IconBtn;