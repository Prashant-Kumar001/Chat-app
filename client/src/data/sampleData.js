const chatData = [
  {
    _id: "1",
    name: "Dana",
    LastMessage: "Hey, how's it going?",
    date: "2024-02-02T10:30:00Z",
    avatar: ["https://randomuser.me/api/portraits/women/45.jpg"], // Fake avatar
    members: ["1", "2"],
    isOnline: true,
    groupChat: false,
    sameSender: false,
    newMessage: 2,
    index: 1,
    handlerDeleteChatOpen: null,
  },
  {
    _id: "2",
    name: "Bob",
    LastMessage: "Let's catch up later!",
    date: "2024-02-02T11:00:00Z",
    avatar: ["https://randomuser.me/api/portraits/men/32.jpg"], // Fake avatar
    isOnline: false,
    members: ["1", "2"],
    groupChat: false,
    sameSender: true,
    newMessage: 0,
    index: 2,
    handlerDeleteChatOpen: null,
  },
  {
    _id: "3",
    name: "Study Group",
    LastMessage: "Meeting at 5 PM",
    date: "2024-02-01T18:00:00Z",
    avatar: [
      "https://randomuser.me/api/portraits/men/50.jpg",
      "https://randomuser.me/api/portraits/women/29.jpg",
      "https://randomuser.me/api/portraits/men/10.jpg",
      "https://randomuser.me/api/portraits/men/10.jpg",
      "https://randomuser.me/api/portraits/men/10.jpg",
      "https://randomuser.me/api/portraits/men/10.jpg",
      "https://randomuser.me/api/portraits/men/10.jpg",
      "https://randomuser.me/api/portraits/men/10.jpg",
    ], // Fake avatars for group chat
    isOnline: true,
    members: ["1", "2", "3"],
    groupChat: true,
    sameSender: false,
    newMessage: 5,
    index: 3,
    handlerDeleteChatOpen: null,
  },
];
export default chatData;

export const notificationsData = [
  {
    _id: "1",
    sender: {
      name: "Dana",
      avatar: ["https://randomuser.me/api/portraits/women/45.jpg"], // Fake avatar
    },
    message: {
      text: "Hey, how's it going?",
      type: "text",
      createdAt: "2024-02-02T10:30:00Z",
      status: "success",
    },
  },
  {
    _id: "2",
    sender: {
      name: "Bob",
      avatar: ["https://randomuser.me/api/portraits/men/32.jpg"], // Fake avatar
    },
    message: {
      text: "Hey, what do you think about this project?",
      type: "text",
      createdAt: "2024-02-02T11:00:00Z",
      status: "success",
    },
  },
];
export const sampleMessages = [
  {
    chatId: "1",
    participants: [
      {
        userId: "122",
        name: "Alice",
        avatar: ["https://avatar.iran.liara.run/public/16"],
      },
      {
        userId: "343",
        name: "Dana",
        avatar: ["https://avatar.iran.liara.run/public/91"],
      },
    ],
    messages: [
      {
        messageId: "msg1",
        senderId: "Alice",
        text: "Hey Dana, are you free this weekend? I was thinking of visiting the temple.",
        timestamp: "2024-10-02T10:00:00Z",
        read: true,
        type: "text",
        reactions: [],
      },
      {
        messageId: "msg2",
        senderId: "Dana",
        text: "Hey Alice! That sounds like a great idea. Which temple do you have in mind?",
        timestamp: "2024-10-02T10:05:00Z",
        read: true,
        type: "text",
        reactions: [],
      },
      {
        messageId: "msg3",
        senderId: "Alice",
        text: "I was thinking about visiting the Lotus Temple. It's so peaceful there.",
        timestamp: "2024-10-02T10:10:00Z",
        read: true,
        type: "text",
        reactions: [
          {
            userId: "Dana",
            emoji: "😊",
          },
        ],
      },
      {
        messageId: "msg4",
        senderId: "Dana",
        text: "That’s perfect! I haven’t been there in a while. What time are you planning to go?",
        timestamp: "2024-10-02T10:15:00Z",
        read: true,
        type: "text",
        reactions: [],
      },
      {
        messageId: "msg5",
        senderId: "Alice",
        text: "How about 9 AM on Sunday? That way we can avoid the rush and spend some quiet time there.",
        timestamp: "2024-10-02T10:20:00Z",
        read: true,
        type: "text",
        reactions: [],
      },
      {
        messageId: "msg6",
        senderId: "Dana",
        text: "Sounds good! Should we bring anything for offerings?",
        timestamp: "2024-10-02T10:25:00Z",
        read: true,
        type: "text",
        reactions: [],
      },
      {
        messageId: "msg7",
        senderId: "Alice",
        text: "Maybe some flowers and incense sticks. I’ll also bring some sweets for prasad.",
        timestamp: "2024-10-02T10:30:00Z",
        read: true,
        type: "text",
        reactions: [
          {
            userId: "Dana",
            emoji: "👍",
          },
        ],
      },
      {
        messageId: "msg8",
        senderId: "Dana",
        text: "Perfect! I’ll bring some fruits too. See you at 9 AM!",
        timestamp: "2024-10-02T10:35:00Z",
        read: true,
        type: "text",
        reactions: [
          {
            userId: "Alice",
            emoji: "🙏",
          },
        ],
      },
      {
        messageId: "msg9",
        senderId: "Alice",
        timestamp: "2024-10-02T10:40:00Z",
        attachment: [
          {
            url: "https://indotoursadventures.com/public/storage/blogs/4a5e59e827477abdf219bf3e58b4d3f4.jpg",
            description: "A beautiful sunrise.",
          },
        ],
        read: true,
        type: "attachment",
        reactions: [
          {
            userId: "Dana",
            emoji: "👍",
          },
        ],
      },
      {
        messageId: "msg10",
        senderId: "Dana",
        text: "nice ❤️❤️❤️❤️",
        timestamp: "2024-10-02T10:35:00Z",
        read: true,
        type: "text",
        reactions: [
          {
            userId: "Alice",
            emoji: "🙏",
          },
        ],
      },
      {
        messageId: "msg11",
        senderId: "Dana",
        timestamp: "2024-10-02T10:40:00Z",
        attachment: [
          {
            url: "https://indotoursadventures.com/public/storage/blogs/4a5e59e827477abdf219bf3e58b4d3f4.jpg",
            description: "A beautiful sunrise.",
          },
        ],
        read: true,
        type: "attachment",
        reactions: [
          {
            userId: "Dana",
            emoji: "👍",
          },
        ],
      },
      {
        messageId: "msg12",
        senderId: "Dana",
        timestamp: "2024-10-02T10:40:00Z",
        attachment: [
          {
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            description:
              "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
          },
        ],
        read: true,
        type: "attachment",
        reactions: [
          {
            userId: "Dana",
            emoji: "👍",
          },
        ],
      },
      {
        messageId: "msg13",
        senderId: "Dana",
        timestamp: "2024-10-02T10:40:00Z",
        attachment: [
          {
            url: "https://actions.google.com/sounds/v1/human_voices/baby_cry_long.ogg",
            description:
              "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
          },
        ],
        read: true,
        type: "attachment",
        reactions: [
          {
            userId: "Dana",
            emoji: "👍",
          },
        ],
      },
      {
        messageId: "msg14",
        senderId: "Dana",
        timestamp: "2024-10-02T10:40:00Z",
       text: "watch this video you would feel good 😍😍😍",
        read: true,
        type: "attachment",
        reactions: [
          {
            userId: "Dana",
            emoji: "👍",
          },
        ],
      },
    ],
  },
];
