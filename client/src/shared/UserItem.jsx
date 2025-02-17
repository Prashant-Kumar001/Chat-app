import React, { useState, memo } from "react";
import AvatarCard from "./AvatarCard.jsx";
import { RiAddLargeFill } from "react-icons/ri";

const UserItem = ({
  user,
  handler,
  size = "md",
  addIcon,
  border = false,
  textColor = "text-gray-900",
  hover = true,
  disable = false,
  className=""
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={`flex items-center ${className} justify-between p-2 ${textColor}  rounded-lg ${border ? "border" : "border-none"
        }  transition duration-200 ${hover ? "hover:bg-gray-100" : ""}`}
    >
      <div className="flex items-center gap-3 w-full">
        <AvatarCard avatar={user.avatar} name={user.name} size={size} />
        <div className="flex flex-col flex-grow">
          <h3 className={" font-semibold"}>{user.name}</h3>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>
      <div>
        <button
          className="flex items-center justify-center p-2 rounded-md transition disabled:opacity-50"
          onClick={handler}
          disabled={disable}
          aria-label="Add user"
        >
          {addIcon ? addIcon : <RiAddLargeFill />}
        </button>
      </div>
    </div>
  );
};

export default memo(UserItem);
