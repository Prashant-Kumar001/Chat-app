import {
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends,
} from "../services/user.Service.js";
import ResponseHandler from "../utils/responseHandler.js";
import statusCodes from "../utils/statusCodes.js";
import { ALERT, NEW_REQUEST, REFETCH_CHAT } from "../constants/events.js";
import { emitEvent } from "../utils/features.js";


export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Allow only Admins or the user themselves to access their profile
    if (req.user.role !== "admin" && req.user.id !== id) {
      return ResponseHandler.error(res, statusCodes.FORBIDDEN, "Access denied");
    }

    const user = await getUserById(id);

    return ResponseHandler.success(
      res,
      statusCodes.OK,
      "User fetched successfully",
      user
    );
  } catch (error) {
    return ResponseHandler.error(
      res,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

export const modifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Allow only Admins or the user themselves to update
    if (req.user.role !== "admin" && req.user.id !== id) {
      return ResponseHandler.error(res, statusCodes.FORBIDDEN, "Access denied");
    }

    const updatedUser = await updateUser(id, updateData);
    return ResponseHandler.success(
      res,
      statusCodes.OK,
      "User updated successfully",
      updatedUser
    );
  } catch (error) {
    console.log(error);
    return ResponseHandler.error(
      res,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only Admins can delete users
    if (req.user.role !== "admin") {
      return ResponseHandler.error(res, statusCodes.FORBIDDEN, "Access denied");
    }

    const message = await deleteUser(id);
    return ResponseHandler.success(res, statusCodes.OK, message);
  } catch (error) {
    return ResponseHandler.error(
      res,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
      error.message || "failed to delete user"
    );
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return ResponseHandler.error(
        res,
        statusCodes.UNAUTHORIZED,
        "User not authenticated"
      );
    }
    return ResponseHandler.success(res, statusCodes.OK, "User fetched", user);
  } catch (error) {
    return ResponseHandler.error(
      res,
      statusCodes.INTERNAL_SERVER_ERROR,
      "Failed to fetch user",
      error.message
    );
  }
};

export const searchUser = async (req, res) => {
  try {
    const { name= "" } = req.query;

    const users = await searchUsers(name);
    const data = users.filter(user => user._id.toString() !== req.user._id.toString());
    return ResponseHandler.success(res, statusCodes.OK, "User fetched", data);
  } catch (error) {
    return ResponseHandler.error(
      res,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

export const SendRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    const request = await sendFriendRequest(req.user._id, userId);
    emitEvent(
      req,
      NEW_REQUEST,
      [{ sender: request.sender, receiver: request.receiver }],
      "request"
    );
    return ResponseHandler.success(
      res,
      statusCodes.OK,
      "Friend request sent",
      request
    );
  } catch (error) {
    return ResponseHandler.error(
      res,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const request = await acceptFriendRequest(requestId, status, req.user);
    emitEvent(req, REFETCH_CHAT, request?.name, "accepted");
    return ResponseHandler.success(
      res,
      statusCodes.OK,
      "Friend request accepted",
      request
    );
  } catch (error) {
    return ResponseHandler.error(
      res,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

export const notifyMe = async (req, res) => {
  try {
    const notifications = await getMyNotifications(req.user._id);
    emitEvent(req, ALERT, notifications, "notification");
    return ResponseHandler.success(
      res,
      statusCodes.OK,
      "Notifications fetched",
      notifications
    );
  } catch (error) {
    return ResponseHandler.error(
      res,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

export const friends = async (req, res) => {
  try {
    const chatId = req.query.chatId;
    const friends = await getMyFriends(req.user._id, chatId);
    // emitEvent(req, REFETCH_CHAT, friends, "friend");
    return ResponseHandler.success(
      res,
      statusCodes.OK,
      "Friends fetched",
      friends
    );
  } catch (error) {
    console.log(error);
    return ResponseHandler.error(
      res,
      error.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};
