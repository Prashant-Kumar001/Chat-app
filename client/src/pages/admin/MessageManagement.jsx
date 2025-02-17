import React from 'react'

const MessageManagement = () => {

  const columns = [
    { title: "ID", key: "id", width: "200px" },
    { title: "Attachment", key: "attachment", width: "200px" },
    { title: "Content", key: "content", width: "400px" },
    { title: "Sender", key: "sent by", width: "200px" },
    { title: "Chat", key: "chat", width: "250px" },
    { title: "Groups-Chat", key: "groups-chat", width: "150px" },
    { title: "CreatedAt", key: "time", width: "250px" },
   
  ];

  return (
    <div className='h-screen w-full bg-green-100 py-6 px-6'>MessageManagement</div>
  )
}

export default MessageManagement