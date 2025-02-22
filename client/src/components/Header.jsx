import { BellOff, BellRing, LogIn, LogOut, Search } from "lucide-react";
import React, { Suspense, lazy, useEffect, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import toast from "react-hot-toast";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { SiLiberadotchat } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { notificationsData } from "../data/sampleData.js";
import BlackScreen from "./BlackScreen";
import NewLoader from "./NewLoader";
import { useSelector, useDispatch } from "react-redux";
import { logout, setLoading } from "../redux/reducers/auth";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import { setIsMobileView } from "../redux/reducers/misc";
import { setIsSearch, setIsNotification, setIsNewGroup } from "../redux/reducers/misc";

const SearchBar = lazy(() => import("./SearchBar"));
const Notification = lazy(() => import("./Notification"));
const NewGroup = lazy(() => import("./NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSearch, isNotification, isNewGroups } = useSelector((state) => state.misc);

  const [searchQuery, setSearchQuery] = useState("");

  const { user, loading } = useSelector((state) => state.auth);
  const { isMobileView } = useSelector((state) => state.misc);

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      toast.success("Logged out");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const closeInput = () => {
    dispatch(setIsSearch(false));
    setSearchQuery('')
  }



  if (loading) return <BlackScreen />;

  return (
    <header className=" justify-between flex p-2 container mx-auto z-50">
      {(isSearch || isNotification || isNewGroups) && <BlackScreen top="0" />}

      <Link to="/" className="hidden md:flex items-center text-2xl font-bold">
        <SiLiberadotchat size={30} className="mr-2 text-pink-200" />
      </Link>

      <nav className="flex items-center justify-center gap-4 mr-10">
        <Icon icon={<FaPeopleGroup size={25} />} onClick={() => navigate("/groups")} text="Groups" />
        <Icon icon={<MdOutlineGroupAdd size={22} />} onClick={() => dispatch(setIsNewGroup(!isNewGroups))} text="New Group" />

        <Suspense fallback={<NewLoader />}>
          <NewGroup top={53} onClose={() => dispatch(setIsNewGroup(false))} isShow={isNewGroups} />
        </Suspense>

        <Icon
          icon={isSearch ? <IoCloseSharp size={21} /> : <Search size={21} />}
          onClick={() => dispatch(setIsSearch(!isSearch))}
          text="Search"
        />

        <Icon
          icon={isNotification ? <BellOff size={21} /> : <BellRing size={21} />}
          onClick={() => dispatch(setIsNotification(!isNotification))}
          text="Notifications"
        />

        {/* Lazy Load Notifications */}
        {isNotification && (
          <Suspense fallback={<NewLoader />}>
            <Notification notifications={notificationsData} duration={5000} onClose={() => dispatch(setIsNotification(false))} />
          </Suspense>
        )}

        {/* Authentication Buttons */}
        {user ? (
          <button className="hover:text-gray-800 transition" onClick={handleLogout}>
            <LogOut size={25} aria-label="Logout" />
          </button>
        ) : (
          <Link to="/login" className="hover:text-gray-800 transition">
            <LogIn size={25} aria-label="Login" />
          </Link>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button className="md:hidden transition" onClick={() => dispatch(setIsMobileView(!isMobileView))}>
        {isMobileView ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Search Bar (Lazy Loaded) */}
      <Suspense fallback={<BlackScreen />}>
        <div className={`absolute left-0 w-full max-w-2xl mx-auto right-0 flex justify-center transition-all duration-500 ${isSearch ? "top-[100px] opacity-100" : "top-[-1000px] opacity-100"}`}>
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} title="Users and Groups" onClear={() => setSearchQuery("")} onClose={closeInput} />
        </div>
      </Suspense>
    </header>
  );
};

const Icon = ({ icon, onClick, text }) => (
  <Tooltip title={`${text}`}>
    <div className="mt-[7px]" data-tip={text}>
      <button className="hover:text-gray-800 transition-all duration-300" onClick={onClick}>
        {icon}
      </button>
    </div>
  </Tooltip>
);

export default Header;
