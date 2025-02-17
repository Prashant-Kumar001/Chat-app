import { BellOff, BellRing, House, LogIn, LogOut, Search } from "lucide-react";
import React, { Suspense, lazy, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { SiLiberadotchat } from "react-icons/si";
import { TfiHome } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { notificationsData } from "../data/sampleData.js";
import BlackScreen from "./BlackScreen";
import NewLoader from "./NewLoader";

const SearchBar = lazy(() => import("./SearchBar"));
const Notification = lazy(() => import("./Notification"));
const NewGroup = lazy(() => import("./NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  const toggleState = (setter) =>
    setter((prev) => {
      setSearchQuery("");
      return !prev;
    });

  const handleSearch = () => {
    if (!searchQuery.trim()) return toast.error("Please enter a search query");
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
  };

  return (
    <header className="sticky header top-0 z-[100]  text-white rounded-b">
      {(searchTerm || isNewGroup || notifications) && (
        <BlackScreen top="44px" />
      )}
      <div className="max-w-7xl mx-auto flex justify-between items-center p-2 md:px-4">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <SiLiberadotchat size={30} className="mr-2 text-pink-200" />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-[16px]">
          <Icon icon={<House size={22} />} text={"home"} />
          <Icon
            icon={<MdGroups size={23} />}
            onClick={() => navigate("/groups")}
            text={"Groups"}
          />
          <Icon
            icon={<HiOutlineUserGroup size={20} />}
            onClick={() => toggleState(setIsNewGroup)}
            text={"New Group"}
          />
          <Suspense fallback={<NewLoader />}>
            <NewGroup
              onClose={() => toggleState(setIsNewGroup)}
              isShow={isNewGroup}
            />
          </Suspense>
          <Icon
            icon={
              searchTerm ? (
                <IoCloseSharp size={22} />
              ) : (
                <Search size={22} />
              )
            }
            onClick={searchTerm ? () => setSearchTerm(false) : () => toggleState(setSearchTerm)}
            text={"Search"}
          />
          <Icon
            icon={
              notifications ? (
                <BellOff
                  size={22}
                  onClick={() => toggleState(setNotifications)}
                />
              ) : (
                <BellRing
                  size={22}
                  onClick={() => toggleState(setNotifications)}
                />
              )
            }
          />
          {notifications && (
            <Suspense fallback={<NewLoader />}>
              <Notification
                notifications={notificationsData}
                duration={5000}
                onClose={() => setNotifications(false)}
              />
            </Suspense>
          )}
          {isLoggedIn ? (
            <button
              className="px-3 py-1  rounded-lg   hover:text-gray-200"
              onClick={handleLogout}
            >
              <LogOut size={25} />
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1  rounded-lg    hover:text-gray-200 "
            >
              <LogIn size={25} />
            </Link>
          )}
        </nav>
        <button
          className="md:hidden text-gray-900  transition"
          onClick={() => toggleState(setIsMenuOpen)}
        >
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>
      <div
        className={`md:hidden flex flex-col items-center bg-white shadow-md absolute w-full left-0 px-4 py-6 space-y-4 transition-all duration-300 ${isMenuOpen ? "top-[45px] opacity-100" : "top-[-400px] opacity-0"
          }`}
      >
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          <TfiHome />
        </Link>
        {isLoggedIn ? (
          <button
            className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
      <Suspense fallback={<BlackScreen />}>
        <div
          className={`absolute w-full flex justify-center transition-all duration-400 ${searchTerm ? "top-[120px] opacity-100" : "top-[-1000px] opacity-0"
            }`}
        >
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            title="users and groups"
            onClear={() => setSearchQuery("")}
          />
        </div>
      </Suspense>
    </header>
  );
};

const Icon = ({ icon, onClick, text }) => (
  <div className="tooltip tooltip-bottom" data-tip={`${text}`}>
    <button
      className="hover:text-gray-200 cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      {icon}
    </button>
  </div>
);

export default Header;
