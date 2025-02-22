import React, { useState } from "react";
import UserItem from "../shared/UserItem";
import sampleData from "../data/sampleData.js";
import { UserRoundPlus, UserRoundX } from "lucide-react";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const NewGroup = ({ top = 48, isShow, onClose, handlerAddToGroup }) => {
  const [members, setMembers] = useState(sampleData);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [groupName, setGroupName] = useState("");

  const handleAddToGroup = (user) => {
    setSelectedUsers((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(user._id)) {
        newSelected.delete(user._id);
      } else {
        newSelected.add(user._id);
      }

      setMembers((prevMembers) =>
        prevMembers.map((obj) =>
          obj._id === user._id ? { ...obj, isGroup: newSelected.has(user._id) } : obj
        )
      );

      return newSelected;
    });
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }
    toast.success(`Group "${groupName}" created successfully!`);
    setGroupName("");
    setSelectedUsers(new Set());
  };

  return (
    <div
      className={`absolute right-0 left-0 w-full max-w-[384px] mx-auto z-50 bg-white text-black shadow-lg p-5 rounded-lg transition-all duration-300 ease-in-out ${isShow ? "translate-y-32 opacity-100" : "-translate-y-[200%] opacity-0"
        }`}
      style={{ top: `${top}px` }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Create Group</h2>
        <MdClose
          size={22}
          className="cursor-pointer hover:rotate-90  transition-transform duration-300"
          onClick={onClose}
        />
      </div>

      {/* Group Name Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Group Name"
          className="w-full p-2 rounded-lg border  placeholder-gray-400 focus:outline-none"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Button variant="outlined" loading={false} onClick={handleCreateGroup} >
          create
        </Button>
      </div>

      {/* User List */}
      <div className="max-h-64 overflow-y-auto  HideScrollbar space-y-2">
        {members.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            handler={() => handleAddToGroup(user)}
            addIcon={
              user.isGroup ? (
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
  );
};

export default NewGroup;
