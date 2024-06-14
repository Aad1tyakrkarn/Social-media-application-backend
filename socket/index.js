const socketIO = require("socket.io");

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:4000",
    },
  });

  let activeUsers = [];

  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // Add new user
    socket.on("new-user-add", (newUserId) => {
      // Check if user is already added
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      io.emit("get-users", activeUsers);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      io.emit("get-users", activeUsers);
    });

    // Send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      if (user) {
        io.to(user.socketId).emit("receive-message", data);
      }
    });
  });

  return io;
};

module.exports = initializeSocket;
