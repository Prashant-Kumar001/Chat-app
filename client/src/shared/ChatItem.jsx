import React from "react";
import { Link } from "react-router-dom";
import { memo } from "react";
import formatTimestamp from "../utils/timeConvert.js";
import Avatar from "./AvatarCard.jsx";

const ChatItem = ({
    avatar = [],
    name,
    _id,
    LastMessage,
    groupChat = false,
    sameSender,
    isOnline,
    newMessage,
    index = 0,
    handlerDeleteChat,
    date,
}) => {
    return (
        <Link
            to={`/chat/${_id}`}
            onContextMenu={(e) => handlerDeleteChat(e, _id, groupChat)}
            className={`flex items-center p-2 hover:bg-gray-300 space-x-4 border-b border-gray-300 ${sameSender ? "bg-black text-white" : "text-black"} transition-all  shadow-sm`}
        >
            <div
                className={`relative `}
            >

                <Avatar avatar={avatar} name={name} size="sm" isOnline={isOnline} />

            </div>
            <div className="flex-1">
                <p className="font-normal  text-[16px] p_font ">{name}</p>
                <p className=" text-sm truncate max-w-xs">{LastMessage}</p>
            </div>
            <div className="text-right">
                {/* <p className="text-gray-500 text-xs font-mono italic">{formatTimestamp(date)}</p> */}
                {newMessage && (
                    <div className="flex items-center justify-center space-x-1">
                        <span className="text-white text-xs font-bold px-2 py-1 ">
                            {newMessage?.count}
                        </span>
                        <span className="text-gray-200 font-medium text-sm">new message</span>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default memo(ChatItem);
