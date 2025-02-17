import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  AlignJustify,
  UserPlus,
  UserRoundX,
  UserRoundPlus,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import sampleData from "../data/sampleData.js";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AvatarCard from "../shared/AvatarCard";
import { MdOutlineEdit } from "react-icons/md";
import toast from "react-hot-toast";
import IconBtn from "../shared/IconBtn";
import BlackScreen from "../components/BlackScreen.jsx";
import AddMemberDialog from "../components/Dialogs/AddMemberDialog.jsx";
import UserItem from "../shared/UserItem";

const DialogsModal = lazy(() => import("../components/Dialogs/ConfirmDialog"));

const Groups = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(sampleData);
  const [isEdit, setIsEdit] = useState(false);
  const [GroupName, setGroupName] = useState("");
  const [EditGroupName, SetEditGroupName] = useState("");
  const [conformDeleteDialog, setConformDeleteDialog] = useState(false);
  const [conformAddDialog, setConformAddDialog] = useState(false);
  const chatId = useSearchParams()[0].get("group");
  const handleNavigateBack = () => {
    navigate("/");
  };

  const handleOpenDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const updateGroupName = () => {
    toast.success("Group name updated");
    setIsEdit((prev) => !prev);
    console.log(EditGroupName);
  };

  const handlerRemover = (user) => {
    console.log("user", user);
    toast.success(`Removed ${user.name}`);
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`group ${chatId}`);
      SetEditGroupName(`group ${chatId}`);
    }

    // cleanup function
    return () => {
      setGroupName("");
      SetEditGroupName("");
      setIsEdit(false);
    };
  }, [chatId]);

  const handlerCloseDialog = (user = null) => {
    setConformAddDialog((prev) => !prev);
  };
  const OpenHandlerDeleteUser = (user = null) => {
    setConformDeleteDialog(true);
  };

  const CloseHandlerDeleteUser = (user = null) => {
    setConformDeleteDialog(false);
  };

  const handleDelete = () => {
    toast.success("Group deleted");
    setConformDeleteDialog(false);
  };
  const handleAdd = () => {
    toast.success("Group added");
    setConformAddDialog((prev) => !prev);
  };

  return (
    <div className="h-screen bg-white flex text-black relative overflow-hidden ">
      <div
        className={`w-[70%] md:p-3 md:w-1/3 lg:w-1/4 fixed md:relative h-full  bg-gradient-to-r from-pink-300 to-orange-400 hover:from-pink-600 hover:to-orange-600
 z-50 ${isOpen ? "left-0 " : "-left-full md:left-0"}`}
      >
        <div className="space-y-2 overflow-scroll h-screen HideScrollbar">
          <GroupList myGroups={user} chatId={chatId} />
        </div>
      </div>

      <div
        className={`flex-1 px-1 md:px-3  transition-all duration-300 ${isOpen ? "opacity-50 md:opacity-100" : "opacity-100"
          }`}
      >
        <div className="flex justify-between items-center">
          <IconBtn
            icon={<IoArrowBackCircle size={35} />}
            onClick={handleNavigateBack}
            className="hover:text-gray-700 p-0"
            text="Back"
            tooltip="Back"
          />

          <IconBtn
            icon={<AlignJustify size={35} />}
            className="flex md:hidden hover:text-gray-700"
            onClick={handleOpenDrawer}
            text="Menu"
            tooltip="Menu"
          />
        </div>

        <div className="">
          <h2 className="text-2xl font-bold">Welcome to Groups</h2>
          <p className="text-gray-800 p_font text-[12px]">
            Select a group from the sidebar to start chatting.
          </p>
        </div>
        <div>
          {isEdit ? (
            <div className="flex gap-3">
              <input
                type="text"
                value={EditGroupName}
                onChange={(e) => SetEditGroupName(e.target.value)}
                className="text-white rounded-md outline-none p-2 w-full"
              />
              <button onClick={updateGroupName}>
                <FaCheck size={30} />
              </button>
            </div>
          ) : (
            <div className="">
              {GroupName && (
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center text-3xl mb-10 items-center ">
                    {GroupName}
                    <IconBtn
                      icon={<MdOutlineEdit size={30} />}
                      text="edit"
                      onClick={() => setIsEdit(true)}
                      tooltip="edit"
                    />
                  </div>
                  <div className=" mb-2 flex w-full max-w-2xl mx-auto flex-col gap-1 ">
                    <h1 className="mb-5 r_font">members</h1>
                    <div className=" w-full mx-auto">
                      {sampleData.length === 0 && <p>no members found</p>}
                      <div className="flex flex-col gap-5 mb-5 overflow-scroll h-[50vh] HideScrollbar">
                        {sampleData?.map((item) => {
                          return (
                            <UserItem
                              className="shadow-xl bg-gray-100"
                              handler={() => handlerRemover(item)}
                              key={item._id}
                              user={item}
                              size="sm"
                              addIcon={<UserRoundX color="red" size={25} />}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <IconBtn
                        icon={<UserPlus size={22} />}
                        text="add"
                        className="btn btn-outline btn-accent"
                        onClick={handlerCloseDialog}
                      />
                      <IconBtn
                        icon={<UserPlus size={22} />}
                        text="delete"
                        className="btn btn-error btn-outline"
                        onClick={OpenHandlerDeleteUser}
                      />
                    </div>
                  </div>
                  {conformDeleteDialog && (
                    <Suspense fallback={<BlackScreen />}>
                      <DialogsModal
                        open={conformDeleteDialog}
                        handleClose={CloseHandlerDeleteUser}
                        handleDelete={handleDelete}
                        text={"are you sure you want to delete this group?"}
                      />
                    </Suspense>
                  )}
                  {conformAddDialog && (
                    <Suspense fallback={<BlackScreen />}>
                      <AddMemberDialog
                        handleAdd={handleAdd}
                        handleClose={handlerCloseDialog}
                        icon={<UserPlus size={25} color="green" />}
                      />
                    </Suspense>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GroupList = ({ myGroups, chatId }) => {
  return (
    <div className="flex flex-col gap-1 ">
      {myGroups.length === 0 && (
        <p className="text-gray-600 text-center">No groups found.</p>
      )}
      {myGroups?.map((group) => (
        <GroupListItem key={group._id} Groups={group} chatId={chatId} />
      ))}
    </div>
  );
};

const GroupListItem = memo(({ Groups, chatId }) => {
  const { _id, avatar, name } = Groups;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => chatId === _id && e.preventDefault()}
    >
      <div className="hover: rounded px-3 py-1 flex items-center gap-4">
        <AvatarCard avatar={avatar} name={name} size="sm" />
        <p className="text-sm font-medium">{name}</p>
      </div>
    </Link>
  );
});
export default Groups;
