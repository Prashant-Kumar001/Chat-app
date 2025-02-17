import User from "../models/user.Model.js";
import { CustomError } from "../error.js";
import mongoose from "mongoose";
import Request from "../models/user.request.js";
import Chat from "../models/user.chat.js";

/**
 * Get all users with optional filters
 * @param {Object} filters - Optional filters (e.g., role, status)
 * @returns {Promise<Array>} - List of users
 */
export const getAllUsers = async (page, limit) => {
  const [allUsers, total] = await Promise.all([
    User.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean(),
    User.countDocuments(),
  ]);
  if (allUsers.length === 0) {
    throw new Error("users not found");
  }
  return { allUsers, total };
};

/**
 * Get a single user by ID
 * @param {String} userId - User's ID
 * @returns {Promise<Object>} - User data
 */
export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password"); // Exclude password
  if (!user) {
    throw CustomError("User not found", 404);
  }
  return user;
};

/**
 * Update user details
 * @param {String} userId - User's ID
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object>} - Updated user data
 */

export const updateUser = async (userId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new CustomError("Invalid user ID format", 400);
  }

  const [user, update] = await Promise.all([
    User.findOne({ _id: userId }),
    User.findByIdAndUpdate(userId, updateData, { new: true }).select(
      "-password"
    ),
  ]);

  if (!user) {
    throw new CustomError("User not found", 404);
  }
  if (!update) {
    throw new CustomError("Failed to update user", 401);
  }
  return update;
};

/**
 * Delete a user (soft delete or permanent delete)
 * @param {String} userId - User's ID
 * @param {Boolean} softDelete - If true, marks the user as inactive instead of deleting
 * @returns {Promise<String>} - Success message
 */
export const deleteUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new CustomError("Invalid user ID format", 400);
  }

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  return { message: "User deleted successfully" };
};

export const searchUsers = async (name) => {
  const users = await User.find({ username: { $regex: name, $options: "i" } });
  if (users.length === 0) {
    throw new CustomError(`User ${name} not found`, 404);
  }
  return users;
};

export const sendFriendRequest = async (sender, receiver) => {
  const user = await User.findById(sender);
  if (!user) {
    throw new CustomError("User not found", 404).select("_id");
  }
  if (user._id.equals(receiver)) {
    throw new CustomError("You cannot send a friend request to yourself", 400);
  }
  const reqPending = await Request.findOne({
    $or: [
      { sender: sender, receiver: receiver },
      { sender: receiver, receiver: sender },
    ],
    status: "pending",
  });
  if (reqPending) {
    throw new CustomError("You already sent a friend request", 400);
  }

  const request = await Request.create({
    sender: sender,
    receiver: receiver,
    status: "pending",
  });
  if (!request) {
    throw new CustomError("Failed to send friend request", 500);
  }

  return request;
};

export const acceptFriendRequest = async (requestId, status, me) => {
  const request = await Request.findById(requestId)
    .populate({
      path: "sender",
      select: "username avatar",
    })
    .populate({
      path: "receiver",
      select: "username avatar",
    });
  if (!request) {
    throw new CustomError("Friend request not found", 404);
  }
  console.log(me);
  console.log(request);

  if (me._id.toString() !== request.receiver?._id.toString()) {
    throw new CustomError("You are not the receiver of this request", 403);
  }

  if (request.status !== "pending") {
    throw new CustomError("Friend request is not pending", 400);
  }

  if (status === "rejected") {
    await Request.findByIdAndDelete(requestId);
    throw new CustomError("Friend request rejected", 200);
  }

  if (status === "accepted") {
    const [newChat, deleteRequest] = await Promise.all([
      Chat.create({
        name: `${request.sender?.username}-${request.receiver?.username}`,
        members: [request.sender?.id, request.receiver?.id],
        GroupChat: false,
      }),
      Request.findByIdAndDelete(requestId),
    ]);

    return { newChat, deleteRequest };
  }
};

export const getMyNotifications = async (userId) => {
  const notifications = await Request.find({ receiver: userId, status: "pending" })
    .populate({
      path: "sender",
      select: "username avatar",
    })
    .sort({ createdAt: -1 });
  if (notifications.length === 0) {
    throw new CustomError("No notifications found", 200);
  }
  return notifications;
}
