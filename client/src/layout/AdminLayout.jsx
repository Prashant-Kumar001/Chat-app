import React, { Suspense } from "react";
import SideBar from "../pages/SideBar";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import NewLoader from "../components/NewLoader";

const AdminLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="flex h-screen text-black">
      <div
        className={`fixed md:relative h-full  transition-all duration-300 z-50 ${isMenuOpen ? "w-[60%] md:w-[25%] bg-gray-200" : "w-0 md:w-64"}  overflow-hidden md:overflow-visible`}
      >
        <SideBar />
      </div>
      <Suspense fallback={<NewLoader />}>
        <div
          className={`flex-1 overflow-x-hidden h-screen flex flex-col items-center justify-center bg-gray-200`}
        >
          {children}
        </div>
      </Suspense>


      <div className="md:hidden fixed top-2 right-4 z-50">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <MdClose className="text-white  p-2 rounded-full" size={30} />
          ) : (
            <MdOutlineMenu className="text-white p-2 rounded-full" size={30} />
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminLayout;