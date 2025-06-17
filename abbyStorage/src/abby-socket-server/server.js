// server.js
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://dhondttiemen.github.io'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

const connectedUsers = {}

io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    connectedUsers[userId] = socket.id
    console.log(`User ${userId} connected.`)
  })

  socket.on('private-message', ({ to, from, message }) => {
    const recipientSocketId = connectedUsers[to]
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('private-message', { from, message })
    } else {
      console.log(`User ${to} is not connected. Message not delivered.`)
    }
  })

  socket.on('user-list', (list) => {
  console.log("Connected users:", list)
})

  socket.on('disconnect', () => {
    for (const userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId]
        console.log(`User ${userId} disconnected.`)
        break
      }
    }
  })
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`Socket.IO server listening on port ${PORT}`)
})