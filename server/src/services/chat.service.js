import Chat from "../models/user.chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHAT } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
const createGroupChat = (name, GroupChat, creator, members, req) => {
  console.log(`createGroupChat`, name, creator, members);
  const Chats = Chat.create({
    name,
    GroupChat,
    creator,
    members,
  });
  if (!Chats) {
    throw new Error("Failed to create group chat");
  }
  emitEvent(req, ALERT, members, `welcome to ${name} group`);
  emitEvent(req, REFETCH_CHAT, members);
  return Chats;
};

const getMyChats = async (user) => {
  if (!user || !user._id) return [];

  const chats = await Chat.find({ members: user._id }).populate({
    path: "members",
    select: "username avatar",
  });

  const transformedChats = chats?.map((chat) => {
    const otherMember = getOtherMember(chat.members, user._id);

    return {
      _id: chat._id,
      groupChat: chat.GroupChat,
      name: chat.GroupChat ? chat.name : otherMember?.username || "Unknown",
      avatar: chat.GroupChat
        ? chat.members
            .slice(0, 3)
            .map((member) => member?.avatar?.secure_url || "")
        : [otherMember?.avatar?.secure_url || ""],
      members: chat.members
        .filter((member) => String(member._id) !== String(user._id))
        .map((member) => member._id),
    };
  });

  return transformedChats;
};

const getMyGroups = async (user) => {
  const chats = await Chat.find({
    GroupChat: true,
    members: user._id,
    creator: user._id,
  }).populate({
    path: "members",
    select: "username avatar",
  });
  if (!chats) throw new Error("No chat found");

  const groups = chats?.map((i) => {
    return {
      _id: i._id,
      groupChat: i.GroupChat,
      name: i.name,
      avatar: i.members?.map((Member) => Member?.avatar?.secure_url),
    };
  });
  return groups;
};
export { createGroupChat, getMyChats, getMyGroups };
