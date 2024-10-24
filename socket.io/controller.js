// models
import Message from "../database/models/Message.js";
import Group from "../database/models/Group.js";

const onlineUsers = {};

export default (socket, io) => {
  const controller = {
    "user-connected": (user) => {
      onlineUsers[socket.id] = user;
      io.emit("online-users", onlineUsers);
    },

    disconnect: () => {
      const user = onlineUsers[socket.id]?.peerId;

      io.emit("stop-live", user);

      delete onlineUsers[socket.id];
      io.emit("online-users", onlineUsers);
    },
    "send-message": async function (message) {
      if (message.groupId) {
        io.to(message.groupId).emit("group_message", message);
      } else {
        const to = getSocketIdByUserId(message.to);
        if (to) io.to(to).emit("private_message", message);
      }

      const msg = new Message(message);
      await msg.save();
    },

    "audio-chunk": async (message) => {
      if (message.groupId) {
        io.to(message.groupId).emit("group_message", message);
      } else {
        const to = getSocketIdByUserId(message.to);
        if (to) io.to(to).emit("private_message", message);
      }

      const msg = new Message(message);
      await msg.save();
    },
    "stop-live": (to) => {
      const socketId = getSocketIdByUserId(to);
      const user = onlineUsers[socketId]?.peerId;

      io.to(socketId).emit("stop-live", user);
    },

    "create-group": async (group) => {
      const newGroup = new Group(group);
      const g = await newGroup.save();

      io.emit("create-group", g);
    },

    "join-group": (groupId) => {
      socket.join(groupId);
    },

    "leave-group": (groupId) => {
      socket.leave(groupId);
    },

    "send-group-message": async function (message) {
      io.emit("group_message", message);
      const msg = new Message(message);
      await msg.save();
    },

    "audio-chunk-group": async (message) => {
      io.emit("group_message", message);
      const msg = new Message(message);
      await msg.save();
    },
  };

  return controller;
};

function getSocketIdByUserId(userId) {
  for (const socketId in onlineUsers) {
    if (onlineUsers[socketId].id === userId) return socketId;
  }
  return null; // Return null if the user is not found
}
