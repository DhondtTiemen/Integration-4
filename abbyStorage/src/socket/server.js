// server.js
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const users = new Map()

io.on('connection', (socket) => {
  console.log('New socket connected:', socket.id)

  socket.on('join', (userId) => {
    console.log(`User ${userId} connected.`)
    users[userId] = socket.id
  })

  socket.on('private-message', ({ to, from, message }) => {
    const targetSocketId = users.get(to)
    if (targetSocketId) {
      io.to(targetSocketId).emit('private-message', { from, message })
    } else {
      console.warn(`User ${to} is not connected. Message not delivered.`)
    }
  })

  socket.on('get-online-users', () => {
    socket.emit('online-users', Array.from(users.keys()))
  })

  socket.on('disconnect', () => {
    for (const [userId, id] of users.entries()) {
      if (id === socket.id) {
        users.delete(userId)
        console.log(`User ${userId} disconnected`)
        break
      }
    }
  })
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`Socket.IO server listening on port ${PORT}`)
})