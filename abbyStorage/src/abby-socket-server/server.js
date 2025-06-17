// server.js
import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { getFirestore, collection, addDoc, Timestamp } from "../firebase/firestore";
import db from "../firebase/firebase.ts";

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

const connectedUsers = {};

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} connected.`);
  });

  socket.on("private-message", async ({ to, from, message }) => {
    const recipientSocketId = connectedUsers[to];

    // Sla op in Firestore
    try {
    const docRef = await addDoc(collection(db, "messages"), {
      from,
      to,
      message,
      timestamp: Timestamp.now(),
    });
    console.log("Message saved with ID:", docRef.id);
  } catch (err) {
    console.error("🔥 Failed to save message to Firestore:", err.message);
  }

    // Emit naar ontvanger indien online
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("private-message", { from, message });
    } else {
      console.log(`User ${to} is not connected. Message not delivered.`);
    }
  });

  socket.on("user-list", (list) => {
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

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Socket.IO server listening on port ${PORT}`);
});
