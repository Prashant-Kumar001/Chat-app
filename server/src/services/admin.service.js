import User from "../models/user.Model.js";
import Chat from "../models/user.chat.js";
import { CustomError } from "../error.js";
import Message from "../models/user.message.js";
import { generateToken } from "../utils/helper.js";

export const adminLogin = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
        throw new CustomError("Invalid credentials", 401);
    }
    const admin = {
        _id: user._id,
        // username: user.username,
        // avatar: user.avatar?.secure_url,
        // email: user.email,   
        admin: true,
        role: user.role,    
    }
    const token = generateToken(admin);

    return { admin, token };
};

export const getAllUsers = async (page, limit) => {
    const [allUsers, total] = await Promise.all([
        User.find({})
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean(),
        User.find({})
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean(),
        User.countDocuments(),
    ]);

    if (allUsers.length === 0) {
        throw new CustomError("users not found", 404);
    }

    const transformedUsers = await Promise.all(
        allUsers.map(async ({ username, avatar, _id }) => {
            const groups = await Chat.countDocuments({
                members: _id,
                GroupChat: true,
            });
            const friends = await Chat.countDocuments({
                members: _id,
                GroupChat: false,
            });
            return {
                _id,
                username,
                avatar: avatar?.secure_url,
                groups: groups,
                friends: friends,
            };
        })
    );

    return { allUsers: transformedUsers, total };
};

export const getAllChats = async (page, limit) => {
    const [allChats, total] = await Promise.all([
        Chat.find({})
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean()
            .populate({
                path: "creator",
                select: "username avatar",
            })
            .populate({
                path: "members",
                select: "username avatar",
            }),
        Chat.countDocuments(),
    ]);

    console.log(allChats);

    const transformChats = await Promise.all(
        allChats.map(async ({ _id, members, GroupChat, username, creator }) => {
            const totalMessages = await Message.countDocuments({ _id });
            return {
                _id,
                username,
                GroupChat,
                creator,
                avatar: members.slice(0, 3).map(({ avatar }) => avatar?.secure_url),
                members: members.map((item) => {
                    return {
                        _id: item._id,
                        username: item.username,
                        avatar: item.avatar?.secure_url,
                    };
                }),
                creator: {
                    _id: creator?._id,
                    username: creator?.username,
                    avatar: creator?.avatar?.secure_url,
                },
                totalMembers: members.length,
                totalMessages,
            };
        })
    );

    if (allChats.length === 0) {
        throw new CustomError("Chats not found", 404);
    }

    return { allChats: transformChats, total };
};

export const getAllMessages = async (page, limit) => {
    const [allMessages, total] = await Promise.all([
        Message.find({})
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean()
            .populate("sender", "username avatar")
            .populate("chat", "username creator groupChat"),
        Message.countDocuments(),
    ]);
    if (allMessages.length === 0) {
        throw new CustomError("there are no messages", 401);
    }
    const transformMessages = allMessages?.map((message) => {
        return {
            _id: message._id,
            sender: {
                _id: message.sender?._id,
                username: message.sender?.username,
                avatar: message.sender?.avatar?.secure_url,
            },
            chat: {
                _id: message.chat?._id,
                username: message.chat?.username,
                creator: message.chat?.creator?._id,
                groupChat: message.chat?.groupChat,
            },
            content: message.content,
            createdAt: message.createdAt,
        };
    });
    return { transformMessages, total };
};
export const getDashBordData = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
        groupChatsCount,
        personalChatsCount,
        totalMessages,
        totalUsers,
        lastWeekMessages,
    ] = await Promise.all([
        Chat.countDocuments({ GroupChat: true }),
        Chat.countDocuments({ GroupChat: false }),
        Message.countDocuments(),
        User.countDocuments(),
        Message.find({ createdAt: { $gte: sevenDaysAgo } })
            .sort({ createdAt: -1 }) // Sorting in descending order (latest first)
            .lean(), // Converts Mongoose documents into plain objects
    ]);

    const stats = {
        groupChatsCount,
        personalChatsCount,
        totalMessages,
        totalUsers,
        totalChats: groupChatsCount + personalChatsCount,
        lastWeekMessages,
    };

    return stats;
};
