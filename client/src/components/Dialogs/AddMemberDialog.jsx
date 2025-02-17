import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserItem from "../../shared/UserItem";
import sampleData from "../../data/sampleData.js";
import { UserRoundX, XIcon } from "lucide-react";
import IconBtn from "../../shared/IconBtn.jsx";
const AddMemberDialog = ({
    handleClose,
    handleAdd,
    icon,
    addMember,
    ChatId,
    isLoading = false,
}) => {
    const [members, setMembers] = useState(sampleData);
    const [selectedUsers, setSelectedUsers] = useState(new Set());

    const handleSelectUser = (user) => {
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

    const HandleCancel = () => {
        setMembers([]);
        setSelectedUsers([]);
    };

    const handleSubmit = () => {
        HandleCancel();
        handleClose()
    }

    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-2">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white flex flex-col gap-2 p-4 rounded-2xl shadow-xl w-96 "
            >
                <div className="flex justify-between w-full sticky top-0 bg_blur ">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 rounded-full">
                        Add a New Member
                    </h2>
                    <IconBtn
                        onClick={handleClose}
                        className=" btn-error"
                        icon={<XIcon size={25} />}
                        tooltip={'Close'}
                    />
                </div>
                <div className="flex flex-col gap-1 overflow-scroll HideScrollbar">
                    {members.length === 0 && (
                        <p className="text-gray-600 text-sm">No members found.</p>
                    )}
                    {members?.map((item) => {
                        return (
                            <UserItem
                                key={item._id}
                                user={item}
                                size="sm"
                                handler={() => handleSelectUser(item)}
                                addIcon={
                                    item?.isGroup ? <UserRoundX size={25} color="red" /> : icon
                                }
                            />
                        );
                    })}
                </div>
                <div className="flex justify-between mt-6">
                    <IconBtn
                        disabled={isLoading}
                        text={"submit"}
                        handler={handleSubmit}
                        className={` ${isLoading ? "cursor-not-allowed" : "cursor-pointer"
                            } border p-0 py-1 border-gray-400 text-gray-700 hover:bg-gray-100 px-4`}
                    />
                    <IconBtn
                        text={"cancel"}
                        handler={HandleCancel}
                        className={`bg-red-400 text-white border p-0 py-1 border-red-600 hover:bg-red-600 px-4`}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default AddMemberDialog;
