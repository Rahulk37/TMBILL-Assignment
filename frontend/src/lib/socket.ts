import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
});

socket.on("connect", () => {
  console.log("✅ Socket Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("❌ Socket Error:", err.message);
});

socket.on("disconnect", () => {
  console.log("❌ Socket Disconnected");
});

export default socket;