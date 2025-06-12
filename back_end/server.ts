import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import route from './routes/routes.js';
import cors from 'cors';
import connectDB from './config/db.js';
import { PrismaClient } from './generated/prisma/index.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { makeMessageDelivered, makeMessageRead, makeMessagesRead } from './controllers/messageController.js';

interface User {
  userId: number;
  toUserId: number | null;
  socketId: string;
  roomId: string | null;
}

const app = express();
const PORT = 3000;
export let users: User[] = [];

const corsOption = {
  origin: process.env.APP_ORIGIN_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

export const prisma = new PrismaClient();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: corsOption,
});

connectDB();

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('update-user-status', (userId: number) => {
    let user = users.find(u => u.userId === userId);
    if (!user) {
      users.push({ userId, toUserId: null, socketId: socket.id, roomId: null });
    } else {
      user.socketId = socket.id;
    }

    users.forEach(observer => {
      if (observer.toUserId === userId && observer.roomId) {
        socket.to(observer.roomId).emit('user-status', true);
      }
    });
  });

  socket.on('get-user-status', (userId: number) => {
    const isOnline = users.some(u => u.userId === userId);
    socket.emit('user-status', isOnline);
  });

  socket.on('join room', async (roomId: string,userId:number, toUserId: number) => {
    await socket.join(roomId);

    let response = await makeMessagesRead(roomId,toUserId);
    let user = users.find(u => u.socketId === socket.id);
    if (user) {
      user.roomId = roomId;
      user.toUserId = toUserId;
    }else{
      users.push({ userId: userId, toUserId: toUserId, socketId: socket.id, roomId });
    }
    socket.to(roomId).emit('user-status', true);
  });

  socket.on('leave room', async (roomId: string) => {
    await socket.leave(roomId);
    let user = users.find(u => u.socketId === socket.id);
    if (user) {
      user.roomId = null;
      socket.to(roomId).emit('user-status', false);
    }
  });

  socket.on('message-dilevered-confirmation',async (messageId: string) => {
    console.log("message dilivered confirmation recived", messageId);
    const messageDlivered = await makeMessageDelivered(messageId);
    if (messageDlivered.msg === "Message marked as delivered" && messageDlivered.message) {
      const user = users.find(u => u.userId === messageDlivered.message.senderId);
      if (user && user.roomId) {
        io.to(user.socketId).emit('mark-dilivered', messageId);
      }
    } 
  }
  );

  socket.on('message-read-confirmation', async (messageId: string) => {
    const messageRead = await makeMessageRead(messageId);
    if (messageRead.msg === "Message marked as read" && messageRead.message) {
      const user = users.find(u => u.userId === messageRead.message.senderId);
      if (user && user.roomId) {
        io.to(user.socketId).emit('mark-read', messageId);
      }
    } 
  }
  );

  socket.on('disconnect', () => {
    const disconnectedUser = users.find(u => u.socketId === socket.id);
    users.forEach(observer => {
      if (observer.toUserId === disconnectedUser?.userId && observer.roomId) {
        socket.to(observer.roomId).emit('mark-read', false);
      }
    });
    if (disconnectedUser?.roomId) {
      socket.to(disconnectedUser.roomId).emit('user-status', false);
    }
    users = users.filter(u => u.socketId !== socket.id);
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
