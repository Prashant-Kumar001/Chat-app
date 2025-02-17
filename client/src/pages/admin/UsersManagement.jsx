import React from "react";
import Table from "../../shared/Table";

const UsersManagement = () => {
  const columns = [
    { title: "ID", key: "id", width: "200px" },
    { title: "Avatar", key: "avatar", width: "200px" },
    { title: "Name", key: "name", width: "200px" },
    { title: "UserName", key: "username", width: "200px" },
    { title: "Friends", key: "friends", width: "150px" },
    { title: "Groups", key: "groups", width: "150px" },
   
  ];

  const rows = [
    { id: "1", avatar: "", name: "Hart Hagerty", username: "Hart", friends: "3", groups: "1", },

  ];

  return (
    <div className=" container w-full h-screen flex flex-col items-center justify-center">
      <div className="h-[90vh] w-[80vw] overflow-scroll">
        <Table heading={"All Users"} columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default UsersManagement;
