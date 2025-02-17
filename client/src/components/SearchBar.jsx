import React, { memo, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import sampleData from "../data/sampleData.js";
import UserItem from "../shared/UserItem.jsx";
import toast from "react-hot-toast";
const SearchBar = ({ value, onChange, onSearch, onClear, title }) => {
  const [user, setUser] = useState(sampleData);
  const [filterUsers, setFilterUser] = useState(user);

  const handlerAddUser = (user = null) => {
    console.log("user", user.name);
    toast.success(`Added ${user.name}`);
  };

  useEffect(() => {
    if (value) {
      const filteredUsers = user.filter((u) =>
        u.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilterUser(filteredUsers);
    } else {
      setFilterUser(user);
    }
  }, [value, user]);

  return (
    <div className="flex items-center w-full flex-col justify-center mt-5">
      <div className="relative flex items-center justify-center mb-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="px-4 py-2 pr-12 max-w-sm bg-white text-gray-950 rounded-full w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
          placeholder="Search..."
        />

        {/* Clear Button */}
        {value && (
          <button
            onClick={onClear}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            <AiOutlineClose className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        )}

        {/* Search Button */}
        {/* <button
          onClick={onSearch}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          <svg
            className="w-5 h-5 text-gray-950 hover:text-pink-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </button> */}
      </div>
      <div className="w-full bg-white max-w-4xl rounded-lg shadow-md p-4">
        <p className="text-gray-700 text-[16px] m_font">{title}</p>
        <div className="space-y-1 h-[50vh] overflow-scroll HideScrollbar">
          {filterUsers.map((item, index) => (
            <UserItem
              key={index}
              user={item}
              size="sm"
              handler={() => {
                handlerAddUser(item);
              }}
              handleIsLoading={() => { }}
            />

          ))}
        </div>
        {
          filterUsers.length === 0 && (
            <p className="text-gray-700 text-xl text-center ">No results found</p>
          )
        }
      </div>
    </div>
  );
};

export default memo(SearchBar);
