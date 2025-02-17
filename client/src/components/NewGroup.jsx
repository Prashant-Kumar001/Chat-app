import React, { useState, useEffect } from "react";
import UserItem from "../shared/UserItem";
import sampleData from "../data/sampleData.js";
import { UserRoundPlus, UserRoundX } from "lucide-react";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";

const NewGroup = ({ top = 48, isShow, onClose, handlerAddToGroup }) => {
  const [members, setMembers] = useState(sampleData);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [groupName, setGroupName] = useState("");

  const handleAddToGroup = (user) => {
    setSelectedUsers((prev) => {
      const usersArray = Array.from(prev);
      const userIndex = usersArray.findIndex((obj) => obj.id === user._id);
      if (userIndex !== -1) {
        const updatedUsers = usersArray.filter((obj) => obj.id !== user._id);
        setMembers((prevMembers) =>
          prevMembers.map((obj) =>
            obj._id === user._id ? { ...obj, isGroup: false } : obj
          )
        );
        return new Set(updatedUsers);
      } else {
        const newUser = { user: user.name, id: user._id, isGroup: true };
        const updatedUsers = [...usersArray, newUser];
        setMembers((prevMembers) =>
          prevMembers.map((obj) =>
            obj._id === user._id ? { ...obj, isGroup: true } : obj
          )
        );
        return new Set(updatedUsers);
      }
    });
  };



  return (
    <div
      className={`absolute ${
        isShow
          ? `top-[45px] opacity-100`
          : "top-[-900px] opacity-0"
      } w-full max-w-[383.8px] bg-gradient-to-r from-gray-600 border-l-4 via-gray-800 to-gray-950 C_hight HideScrollbar p-4  newGroup right-0 px-4 py-6 space-y-4 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="r_font mb-2">Group</h2>
          <MdClose
            size={22}
            className="cursor-pointer hover:animate-spin"
            onClick={onClose}
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Group Name"
            className="p-2 rounded-lg w-full"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button className="rounded-lg bg-gray-950 px-3">Create</button>
        </div>
        <div>
          <div className="flex flex-col gap-1 HideScrollbar">
            {members?.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={() => handleAddToGroup(user)}
                addIcon={
                  user?.isGroup ? (
                    <UserRoundX size={20} color="red" />
                  ) : (
                    <UserRoundPlus size={20} color="green" />
                  )
                }
                hover={false}
                textColor="text-gray-100"
                size="sm"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGroup;
