// server.ts
import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://dhondttiemen.github.io");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const corsOptions = {
  origin: "https://dhondttiemen.github.io",
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));

const server = http.createServer(app)

const io = new Server(server, {
  cors: corsOptions,
});

const connectedUsers: { [userId: string]: string } = {};

io.on("connection", (socket: import("socket.io").Socket) => {
  socket.on("join", (userId: string) => {
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} connected.`);
  });

  socket.on("private-message", async ({ to, from, message }: { to: string; from: string; message: string }) => {
    const recipientSocketId = connectedUsers[to];

    // Emit naar ontvanger indien online
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("private-message", { from, message });
    } else {
      console.log(`User ${to} is not connected. Message not delivered.`);
    }
  });

  socket.on("user-list", (list: string[]) => {
    console.log("Connected users:", list);
  });

  socket.on("disconnect", () => {
    for (const userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        console.log(`User ${userId} disconnected.`);
        break;
      }
    }
  });
});

const PORT = Number(process.env.PORT) || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Socket.IO server listening on port ${PORT}`);
});
