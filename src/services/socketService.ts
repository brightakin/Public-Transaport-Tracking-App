import { io } from "socket.io-client";

let socket: any;

export const connectSocket = () => {
  socket = io("https://public-transport-tracker-backend.onrender.com"); // Replace with your server URL
  return socket;
};

export const getSocket = () => socket;
