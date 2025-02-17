import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  chats = [],
  chatID,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatID: "",
      count: 0, 
    },
  ],
  handlerDeleteChat,
}) => {
  return (
    <div className="bg-white ">
      {chats.map((chat, index) => {
        const { avatar, name, _id, groupChat, members, date } = chat;

        const isOnline = members?.some((member) => onlineUsers.includes(_id))

        const newMessage = newMessageAlert?.find(
          ({ chatID }) => chatID === _id
        );



        return (
          <ChatItem
            index={index}
            newMessage={newMessage}
            isOnline={isOnline}
            avatar={avatar}
            key={_id}
            name={name}
            _id={_id}
            groupChat={groupChat}
            sameSender={chatID == _id}
            handlerDeleteChat={handlerDeleteChat}
            date={date}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
