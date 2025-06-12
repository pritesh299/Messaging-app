var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import bodyParser from 'body-parser';
import route from './routes/routes.js';
import cors from 'cors';
import connectDB from './config/db.js';
import { PrismaClient } from './generated/prisma/index.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { makeMessageDelivered, makeMessageRead, makeMessagesRead } from './controllers/messageController.js';
const app = express();
const PORT = 3000;
export let users = [];
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
    socket.on('update-user-status', (userId) => {
        let user = users.find(u => u.userId === userId);
        if (!user) {
            users.push({ userId, toUserId: null, socketId: socket.id, roomId: null });
        }
        else {
            user.socketId = socket.id;
        }
        users.forEach(observer => {
            if (observer.toUserId === userId && observer.roomId) {
                socket.to(observer.roomId).emit('user-status', true);
            }
        });
    });
    socket.on('get-user-status', (userId) => {
        const isOnline = users.some(u => u.userId === userId);
        socket.emit('user-status', isOnline);
    });
    socket.on('join room', (roomId, userId, toUserId) => __awaiter(void 0, void 0, void 0, function* () {
        yield socket.join(roomId);
        let response = yield makeMessagesRead(roomId, toUserId);
        let user = users.find(u => u.socketId === socket.id);
        if (user) {
            user.roomId = roomId;
            user.toUserId = toUserId;
        }
        else {
            users.push({ userId: userId, toUserId: toUserId, socketId: socket.id, roomId });
        }
        socket.to(roomId).emit('user-status', true);
    }));
    socket.on('leave room', (roomId) => __awaiter(void 0, void 0, void 0, function* () {
        yield socket.leave(roomId);
        let user = users.find(u => u.socketId === socket.id);
        if (user) {
            user.roomId = null;
            socket.to(roomId).emit('user-status', false);
        }
    }));
    socket.on('message-dilevered-confirmation', (messageId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("message dilivered confirmation recived", messageId);
        const messageDlivered = yield makeMessageDelivered(messageId);
        if (messageDlivered.msg === "Message marked as delivered" && messageDlivered.message) {
            const user = users.find(u => u.userId === messageDlivered.message.senderId);
            if (user && user.roomId) {
                io.to(user.socketId).emit('mark-dilivered', messageId);
            }
        }
    }));
    socket.on('message-read-confirmation', (messageId) => __awaiter(void 0, void 0, void 0, function* () {
        const messageRead = yield makeMessageRead(messageId);
        if (messageRead.msg === "Message marked as read" && messageRead.message) {
            const user = users.find(u => u.userId === messageRead.message.senderId);
            if (user && user.roomId) {
                io.to(user.socketId).emit('mark-read', messageId);
            }
        }
    }));
    socket.on('disconnect', () => {
        const disconnectedUser = users.find(u => u.socketId === socket.id);
        users.forEach(observer => {
            if (observer.toUserId === (disconnectedUser === null || disconnectedUser === void 0 ? void 0 : disconnectedUser.userId) && observer.roomId) {
                socket.to(observer.roomId).emit('mark-read', false);
            }
        });
        if (disconnectedUser === null || disconnectedUser === void 0 ? void 0 : disconnectedUser.roomId) {
            socket.to(disconnectedUser.roomId).emit('user-status', false);
        }
        users = users.filter(u => u.socketId !== socket.id);
        console.log(`User disconnected: ${socket.id}`);
    });
});
httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
