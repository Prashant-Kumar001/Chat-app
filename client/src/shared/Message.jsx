import React, { memo } from "react";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";
import moment from "moment";
import { fileFormat, transformImg } from "../lib/features.js";

const animations = {
  h1: {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { delay: 0.5, duration: 1 },
  },
  fadeOut: {
    initial: { opacity: 1 },
    whileInView: { opacity: 0 },
    transition: { delay: 0.1, duration: 0.5 },
  },
  zoomIn: {
    initial: { scale: 0.5 },
    whileInView: { scale: 1 },
    transition: { duration: 0.5 },
  },
  zoomOut: {
    initial: { scale: 1 },
    whileInView: { scale: 0.5 },
    transition: { duration: 0.5 },
  },

  statsAnimation: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  },
  div: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.4 },
  },
};

const Message = ({ messageData, user }) => {
  if (messageData?.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-gray-400">
        <span>No messages yet</span>
      </div>
    );
  }

  const sender = messageData[0].participants?.filter(
    (senderId) => senderId.userId !== user?._id
  );

  return (
    <div className="flex flex-col gap-3 ">
      {/* Header with sender info */}
      <div className="flex items-center gap-2  bg-gray-100 px-6 py-3 border-b sticky top-0 z-50 shadow-sm">
        <AvatarCard avatar={sender[0].avatar} name={sender[0].name} size="sm" />
        <p className="text-black text-sm font-medium">{sender[0].name}</p>
      </div>

      {/* Messages list */}
      <div className="flex flex-col mb-3 gap-2 overflow-y-auto px-1">
        {messageData[0].messages?.map((message) => {
          const timeAgo = moment(message?.timestamp).fromNow();
          return (
            <motion.div
              key={message?.messageId}
              {...animations.div}
              className={`flex ${sender[0].name === message?.senderId
                  ? "justify-start"
                  : "justify-end"
                }`}
            >
              <div
                className={`max-w-[70%] flex flex-col gap-1 p-3 rounded-lg ${sender[0].name === message?.senderId
                    ? "bg-blue-50"
                    : "bg-green-50"
                  }`}
              >
                {/* Sender name for received messages */}
                {sender[0].name === message?.senderId && (
                  <span className="text-xs text-blue-600 font-medium">
                    {sender[0].name}
                  </span>
                )}

                {/* Message text and attachments */}
                {message?.text ? (
                  <p className="text-sm text-gray-800">{message?.text}</p>
                ) : (
                  message?.attachment &&
                  message?.attachment?.map((img, index) => {
                    const url = img.url;
                    const format = fileFormat(url);
                    return (
                        <a
                          href=""
                          target="_blank"
                          // download={img.url}
                          style={{
                            color: "black",
                          }}
                          key={index}
                        >
                          <AttachMent
                            url={transformImg(url)}
                            file={format}
                            description={img.description}
                          />
                        </a>
                    );
                  })
                )}

                {/* Timestamp and read status */}
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {sender[0].name !== message?.senderId && message?.read
                      ? "Seen"
                      : ""}
                  </span>
                  <span className="text-xs text-gray-500">{timeAgo}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Message);

// Attachment component
const AttachMent = memo(({ url, description, file }) => {
  switch (file) {
    case "video":
      return <video src={url} controls />;
    case "image":
      return (
        <img
          src={url}
          alt={description}
          className="w-[200px] h-[150px] object-contain "
        />
      );
    case "audio":
      return <audio src={url} controls className="w-[200px] h-[150px] object-contain" />;
    default:
      return <a href={url}>Download</a>;
  }
});
