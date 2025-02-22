import React, { useState, useEffect } from "react";
import Table from "../../shared/Table";
import { Avatar, Skeleton, Stack } from "@mui/material";
import AvatarCard from "../../shared/AvatarCard";
import chatData from "../../data/sampleData";
const UsersManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      headerClassName: "table-header",
      width: 150,
      display: "flex",
      renderCell: (params) => (
        <AvatarCard size="sm" avatar={params.row.avatar} />
      ),
    },

    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      width: 300,
    },

    {
      field: "groupChat",
      headerName: "Group",
      headerClassName: "table-header",
      width: 100,
    },
    {
      field: "totalMembers",
      headerName: "Total Members",
      headerClassName: "table-header",
      width: 120,
    },
    {
      field: "members",
      headerName: "Members",
      headerClassName: "table-header",
      width: 400,
      display: "flex",
      renderCell: (params) => {
        return <AvatarCard size="sm" avatar={params.row.members} />;
      },
    },
    {
      field: "totalMessages",
      headerName: "Total Messages",
      headerClassName: "table-header",
      width: 120,
    },
    {
      field: "creator",
      headerName: "Created By",
      headerClassName: "table-header",
      width: 250,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={"1rem"}>
          <Avatar  alt="Remy Sharp" src={params.row.creator.avatar} />
          <span>{params.row.creator.name}</span>
        </Stack>
      ),
    },
  ];


  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      chatData.map((row, index) => {
        return {
          id: row._id,
          avatar: row.avatar,
          name: row.name,
          groupChat: row.groupChat ? "Yes" : "No",
          totalMembers: row.members.length,
          members: row.avatar,
          totalMessages: row.newMessage,
          creator: {
            name: row.name,
            avatar: row.avatar[0],
          },
        };
      })
    );
  }, []);

  return (
    <div className=" container w-full h-screen flex flex-col items-center justify-center">
      <Table heading={"All Users"} columns={columns} rows={rows} />
    </div>
  );
};

export default UsersManagement;
