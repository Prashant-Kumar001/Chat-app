import React, { memo, useState, useEffect, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import UserItem from "../shared/UserItem.jsx";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../redux/api/api.js";
import { useDebounce } from "../hooks/hook"


const SearchBar = ({ value, onChange, onClose, onClear, title }) => {
  const [users, setUsers] = useState([]);
  const debouncedValue = useDebounce(value, 1000);

  const [searchQuery] = useLazySearchUserQuery();
  const [sendFriendRequest] = useSendFriendRequestMutation()

  useEffect(() => {
    searchQuery(debouncedValue)
      .unwrap()
      .then((query) => {
        if (query) {
          setUsers(query?.data);
        }
      })
      .catch((error) => {
        toast.error(`${error?.data?.message}`)
        console.error("Error fetching users:", error);
      });
  }, [debouncedValue]);



  const handleAddUser = async (user) => {
    try {
      toast.loading(`sending... ${user.username}`)
      const res = await sendFriendRequest({ userId: user._id });
      if(res?.data?.success) {
        toast.success(`Friend request sent to ${user.username}`);
      }else {
        toast.error(`${res?.data?.message || 'already sent'}`)
      }
    } catch (error) {
      toast.error(`${error?.data?.message}`)
      console.error("Error sending friend request:", error);
    }
  }

  return (
    <div className="flex flex-col relative rounded pt-2 bg-white items-center w-full max-w-xs  z-50">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 rounded-full">
        {title}
      </h2>
      <button onClick={onClose} className="absolute right-4 top-4">
        <X size={24} className="text-gray-500 hover:text-gray-700" />
      </button>
      <div className="relative flex items-center mb-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="px-4 py-2 outline outline-1 outline-pink-500 pr-10 w-full bg-white text-gray-950 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
          placeholder="Search..."
        />
        {value && (
          <button onClick={onClear} className="absolute right-3">
            <AiOutlineClose className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </div>

      <div className="   w-full relative shadow-md p-4">
        <div className=" overflow-auto HideScrollbar space-y-2">
          {users.length > 0 ? (
            users.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                size="sm"
                handler={() => handleAddUser(user)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center text-lg mt-4 animate-pulse">
              No results found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SearchBar);
