import React, { Suspense, lazy } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Title from "../shared/Title";
import { useParams } from "react-router-dom";

const ChatList = React.lazy(() => import("../layout/ChatList"));
const Chat = React.lazy(() => import("../pages/Chat"));
const Profile = React.lazy(() => import("../layout/Profile"));

import Loader from "../components/Loader.jsx";

import sampleData from "../data/sampleData.js";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { _id } = useParams();
    const handlerDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete chat with ID: ", _id);
    };
    return (
      <>
        <Header />
        <Suspense fallback={<Loader />}>
          <div className="container mx-auto">
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[30%,45%,1fr] ">
              <div className="C_hight overflow-scroll HideScrollbar">
              <ChatList
                chats={sampleData}
                chatID={_id}
                onlineUsers={["1", "2"]}
                newMessageAlert={[{ chatID: _id, count: 5 }]}
                handlerDeleteChat={handlerDeleteChat}
                />
                </div>
              <Suspense fallback={<Loader />}>
                <WrappedComponent {...props} />
              </Suspense>
              <Profile />
            </div>
          </div>
        </Suspense>
      </>
    );
  };
};

export default AppLayout;
