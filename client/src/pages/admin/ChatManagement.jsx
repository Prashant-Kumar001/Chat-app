import React, { useState, useEffect } from "react";
import Table from "../../shared/Table";
import AvatarCard from "../../shared/AvatarCard";

const chats = [
  {
    id: "1",
    avatar: ["https://randomuser.me/api/portraits/men/86.jpg"],
    name: "John Doe",
    totalMembers: "10",
    members: [
      {
        avatar: ["https://randomuser.me/api/portraits/men/86.jpg"],
        name: "Jane Doe",
      },
      {
        avatar: ["https://randomuser.me/api/portraits/men/55.jpg"],
        name: "Alice Doe",
      },
      {
        avatar: ["https://randomuser.me/api/portraits/men/30.jpg"],
        name: "Bob Doe",
      },
    ],
    totalMessages: "500",
    createdBy: {
      avatar: ["https://randomuser.me/api/portraits/men/86.jpg"],
      name: "Admin",
    },
  },
];

const ChatManagement = () => {
  const [AllChats, setChats] = useState([]); // ✅ Fix: Initialize as empty array

  useEffect(() => {
    setChats(
      chats.map((data) => ({
        ...data,
        avatar: <AvatarCard avatar={data.avatar} name={data.name} size="sm" />,
        members: data.members.map((member) => (
          <AvatarCard key={member.name} avatar={member.avatar} name={member.name} size="sm" />
        )),
        createdBy: <AvatarCard avatar={data.createdBy.avatar} name={data.createdBy.name} size="sm" />,
      }))
    );
  }, []);

  console.log(AllChats);

  const columns = [
    { title: "ID", key: "id", width: "120px" },
    { title: "Avatar", key: "avatar", width: "200px" },
    { title: "Name", key: "name", width: "200px" },
    { title: "Total Members", key: "totalMembers", width: "150px" },
    { title: "Members", key: "members", width: "400px" }, // ✅ No need for `renderCell`, already formatted in state
    { title: "Total Messages", key: "totalMessages", width: "150px" },
    { title: "Creator", key: "createdBy", width: "250px" }, // ✅ Fixed key
  ];

  return (
    <div className="container w-full h-screen flex flex-col items-center justify-center">
      <div className="h-[90vh] w-[80vw] overflow-scroll">
        <Table heading={"All Chats"} columns={columns} rows={AllChats} /> 
        <AvatarCard avatar={AllChats?.members}  />
      </div>
    </div>
  );
};

export default ChatManagement;
