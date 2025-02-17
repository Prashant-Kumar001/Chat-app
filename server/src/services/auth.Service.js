import User from "../models/user.Model.js";
import { removeLocalFile } from "../utils/removeFile.js";
import { uploadFileToCloudinary } from "../utils/Cloudinary.js";
import { CustomError } from "../error.js";

// Register User
export const registerUser = async (username, email, password, file) => {
  const local_filePath = file.path;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    removeLocalFile(local_filePath);
    throw new CustomError("user with this Email is already exists", 409);
  }

  let cloudinary = {
    public_id: "",
    secure_url: "",
  };

  try {
    const res = await uploadFileToCloudinary(local_filePath);
    if (res?.public_id && res?.secure_url) {
      cloudinary = res;
    } else {
      throw new Error("Failed to upload image to Cloudinary");
    }
  } catch (uploadError) {
    throw new Error(uploadError.message);
  } finally {
    removeLocalFile(local_filePath);
  }
  console.log(cloudinary);

  const user = await User.create({
    username,
    email,
    password,
    avatar: cloudinary,
  });

  return { user };
};

// Login User
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select(
    "username email password avatar role"
  );
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid credentials");
  }

  return { user };
};

export const isLogin = async (user) => {
  const isLoggedIn = await User.findOne({ _id: user._id });
  if (!isLoggedIn) throw new Error("User not found");
  return isLoggedIn;
};

export const searchUser = async () => {};
