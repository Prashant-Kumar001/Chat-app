import React, { Suspense, lazy, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Title from "../shared/Title";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsMobileView } from "../redux/reducers/misc";
import Drawer from '@mui/material/Drawer';

const ChatList = React.lazy(() => import("../layout/ChatList"));
const Chat = React.lazy(() => import("../pages/Chat"));
const Profile = React.lazy(() => import("../layout/Profile"));

import Loader from "../components/Loader.jsx";
import sampleData from "../data/sampleData.js";
import { useMyChartQuery } from "../redux/api/api.js";
import toast from "react-hot-toast";
import { useError } from "../hooks/hook.jsx";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const { isMobileView } = useSelector((state) => state.misc);

    const { data: myChats, isLoading, isError, error, refetch } = useMyChartQuery();

    const handlerDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete chat with ID: ", _id);
    };
    const handleMobileClose = () => {
      dispatch(setIsMobileView(false));
    }

    useError([{ isError, error }])


    return (
      <>
        <Header />
        <Suspense fallback={<Loader />}>
          <div className="container mx-auto bg-slate-50 C_hight">
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[30%,45%,1fr] ">
              <Drawer open={isMobileView} onClose={handleMobileClose}>
                {
                  <ChatList
                    width="w-72"
                    chats={myChats?.chats}
                    chatID={_id}
                    onlineUsers={["1", "2"]}
                    newMessageAlert={[{ chatID: _id, count: 5 }]}
                    handlerDeleteChat={handlerDeleteChat}
                  />
                }
              </Drawer>
              <div className=" overflow-scroll HideScrollbar md:block hidden">
                {
                  isLoading ? (
                    <Loader />
                  ) : isError ? (
                    <div>Error: {error.message}</div>
                  ) : (
                    <ChatList
                      chats={myChats?.chats}
                      chatID={_id}
                      onlineUsers={["1", "2"]}
                      newMessageAlert={[{ chatID: _id, count: 5 }]}
                      handlerDeleteChat={handlerDeleteChat}
                    />
                  )
                }
              </div>
              <div className="bg-amber-100 ">
                <Suspense fallback={<Loader />}>
                  <WrappedComponent {...props} />
                </Suspense>
              </div>
              <div className="md:block hidden">
                <Profile />
              </div>
            </div>
          </div>
        </Suspense>
      </>
    );
  };
};

export default AppLayout;
