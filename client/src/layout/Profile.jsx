import React from "react";
import AvatarCard from "../shared/AvatarCard";
import { PencilIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  return (
    <div className="bg-gray-950 text-white flex flex-col items-center justify-start C_hight">
      {/* Profile Card */}
      <div className=" rounded-xl p-6 w-full max-w-md text-center">
        {/* Avatar */}
        <div className="relative flex justify-center mb-4">
          <AvatarCard
            avatar={["https://randomuser.me/api/portraits/men/45.jpg"]}
            name="John Doe"
            size="el"
            // isOnline={true}
          />
        </div>

        {/* Name & Bio */}
        <h1 className="text-3xl font-semibold ">John Doe</h1>
        <p className=" text-lg mt-2">Full Stack Developer</p>

        {/* Info Section */}
        <div className="mt-6">
          <ProfileComponent text="Email" heading="johndoe@example.com" />
          <ProfileComponent text="Location" heading="New York, USA" />
          <ProfileComponent text="Joined" heading="March 2020" />
        </div>
      </div>
    </div>
  );
};

const ProfileComponent = ({ text, heading }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <p className=" text-sm">{text}</p>
      <h2 className=" text-lg font-medium">{heading}</h2>
    </div>
  );
};

export default Profile;
