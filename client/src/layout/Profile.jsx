import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Avatar } from "@mui/material";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = user;

  return (
    <div className="bg-gray-950 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-black p-4 border-gray-700 text-center">
        <div className="relative flex justify-center mb-4">
          <Avatar
            sx={{ width: 120, height: 120 }}
            alt={data?.login?.username}
            src={data?.login?.avatar?.secure_url}
            className="border-4 border-gray-600 shadow-lg"
          />
        </div>
        <h1 className="text-3xl font-semibold mb-2">{data?.login?.username}</h1>
        <p className="text-lg text-gray-400">Full Stack Developer</p>
        <div className="mt-6 space-y-4 text-left">
          <ProfileComponent text="Email" heading={data?.login?.email} />
          <ProfileComponent text="Bio" heading={data?.login?.bio} />
          <ProfileComponent text="Joined" heading={moment(data?.login?.createdAt).format('MMMM YYYY')} />
        </div>
      </div>
    </div>
  );
};

const ProfileComponent = ({ text, heading }) => {
  return (
    <div className="flex flex-col bg-gray-900 p-4 rounded-lg shadow-md">
      <p className="text-gray-400 text-sm">{text}</p>
      <h2 className="text-lg font-medium text-white">{heading}</h2>
    </div>
  );
};

export default Profile;
