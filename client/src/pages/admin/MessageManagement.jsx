import React, { useEffect } from 'react'
import Table from '../../shared/Table';
import { sampleMessages } from '../../data/sampleData';
import AvatarCard from '../../shared/AvatarCard';
import { Avatar, Stack } from '@mui/material';
import moment from 'moment';
import { fileFormat } from '../../lib/features.js';
import { Box } from '@mui/system';
import renderAttachment from '../../components/RenderAttachment.jsx';

const MessageManagement = () => {

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 100,
    },
    {
      field: "attachment",
      headerName: "attachment",
      headerClassName: "table-header",
      width: 250,
      display: "flex",
      renderCell: (params) => {
        const { attachment } = params.row
        return (
          attachment?.length > 0 ? (
            attachment.map((att, i) => {
              const url = att
              const file = fileFormat(url)
              console.log(file)
              return (
                <Box key={i}>
                  <a href={url} target="_blank" download>
                    {renderAttachment(file, url, attachment?.description)}
                  </a>
                </Box>
              )
            })
          ) : "no attachments"
        )
      },
    },
    {
      field: "content",
      headerName: "content",
      headerClassName: "table-header",
      width: 250,
    },

    {
      field: "sender",
      headerName: "sender",
      headerClassName: "table-header",
      width: 200,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" spacing={"1rem"}>
            <Avatar alt={params.row.sender.name} src={params.row.sender.avatar[0]} />
            <span>{params.row.sender.name}</span>
          </Stack>
        );
      }
    },

    {
      field: "friends",
      headerName: "friends",
      headerClassName: "table-header",
      width: 300,
    },
    {
      field: "chat",
      headerName: "chat",
      headerClassName: "table-header",
      width: 220,
    },
    {
      field: "groupChat",
      headerName: "groupChat",
      headerClassName: "table-header",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "time",
      headerClassName: "table-header",
      width: 250,
    },
  ];

  const messages = [
    {
      id: 1,
      attachment: ["https://ik.imagekit.io/ikmedia/backlit.jpg"],
      content: "Hello, How are you?",
      sender: {
        name: "John Doe",
        avatar: ["https://via.placeholder.com/50"],
      },
      friends: ["Alice", "Bob", "Charlie"],
      chat: "John Doe",
      groupChat: false,
      createdAt: "2022-01-10 12:30:00",
    },
    {
      id: 2,
      attachment: [],
      content: "I'm fine, thanks for asking.",
      sender: {
        name: "Alice",
        avatar: ["https://via.placeholder.com/50"],
      },
      friends: ["John Doe", "Bob", "Charlie"],
      chat: "John Doe",
      groupChat: false,
      createdAt: "2022-01-10 12:35:00",
    },

  ]

  const [row, setRow] = React.useState([]);
  useEffect(() => {
    if (messages) {
      setRow(
        messages.map((message) => ({
          id: message.id,
          attachment: message.attachment,
          content: message.content,
          sender: {
            name: message.sender.name,
            avatar: message.sender.avatar
          },
          friends: message.friends,
          chat: message.chat,
          groupChat: message.groupChat,
          createdAt: moment(message.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        }))
      )
    }
  }, [])


  return (
    <div className='h-screen w-full bg-green-100'>
      <Table columns={columns} rows={row} heading={"messages"} />
    </div>
  )
}

export default MessageManagement