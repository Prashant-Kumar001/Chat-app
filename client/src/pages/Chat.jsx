import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import Input from "../components/Input";
import toast from "react-hot-toast";
import Message from "../shared/Message";
import { sampleMessages } from "../data/sampleData.js";
import { FaFileAudio } from "react-icons/fa6";
import { FaFileVideo } from "react-icons/fa6";
import { FaFileImage } from "react-icons/fa6";
import { motion } from "framer-motion";

const user = {
  _id: "122",
  name: "Alice",
  avatar: ["https://avatar.iran.liara.run/public/16"],
};

const Chat = () => {
  const { _id } = useParams();
  const [usersMessage, setUserMessage] = useState(sampleMessages);
  const [message, setMessage] = useState("");
  const [audio, setAudio] = useState("");
  const [video, setVideo] = useState("");
  const [image, setImage] = useState("");

  const handlerMessage = (e) => {
    e.preventDefault();
    toast.success(`${message}`);
    setMessage("");
  };

  const loadCurrentUserChat = usersMessage.filter(
    (message) => message.chatId == _id
  );

  if (!_id || loadCurrentUserChat.length === 0) {
    return (
      <div className=" w-full text-center flex items-center justify-center bg-gray-200">
        <h1>Please select a user to chat with</h1>
      </div>
    );
  }

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

  return (
    <div className="text-2xl bg-gray-200 container flex justify-between C_hight flex-col   ">
      <div className="h-[95vh] bg-gray-300 overflow-scroll HideScrollbar">
        <Message messageData={loadCurrentUserChat} user={user} />
      </div>
      <div className="flex justify-between px-2 w-full h-[10vh] items-center relative">
        <div className="dropdown dropdown-top ">
          <div tabIndex={0} role="button" className="relative w-full">
            <MdOutlineAttachFile
              size={25}
              color="black"
              className="absolute left-3 -top-3  rotate-45"
            />
          </div>
          <motion.div
            {...animations.fadeIn}
            tabIndex={0}
            className="dropdown-content rounded-box z-[1] p-2 flex bg-slate-50 gap-8 mb-6"
          >
            <input value={audio}  type="file" id="audio" className="hidden" onChange={(e) => setAudio(e.target.files[0])} />
            <input value={video}  type="file" id="video" className="hidden" onChange={(e) => setVideo(e.target.files[0])} />
            <input value={image}  type="file" id="image" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={() => document.getElementById('audio').click()} ><FaFileAudio color="green" size={22} /></button>
            <button onClick={() => document.getElementById('video').click()} ><FaFileVideo color="orange" size={22} /></button>
            <button onClick={() => document.getElementById('image').click()} ><FaFileImage color="blue" size={22} /></button>
          </motion.div>
        </div>
        <form action="" className="w-full">
          <input
            type="text"
            className="bg-gray-300 w-[97%] rounded-2xl px-4 py-1 outline-none text-gray-800 text-[16px] pl-12"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <button
          className="cursor-pointer bg-orange-500 hover:bg-orange-600 rounded-full -rotate-45 text-white p-2"
          onClick={handlerMessage}
        >
          <IoSend size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default AppLayout()(Chat);
