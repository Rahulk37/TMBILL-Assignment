import type { Server as HttpServer } from "http";
import type { Server, Socket } from "socket.io";

let io: Server;

const initializeSocket = (server: HttpServer): Server => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PATCH"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Client Connected: ${socket.id}`);

    // Join Store Room
    socket.on("join-store", (storeId: string) => {
      socket.join(storeId);
      console.log(`${socket.id} joined ${storeId}`);
    });

    // Leave Store Room
    socket.on("leave-store", (storeId: string) => {
      socket.leave(storeId);
      console.log(`${socket.id} left ${storeId}`);
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.IO not initialized.");
  }

  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};