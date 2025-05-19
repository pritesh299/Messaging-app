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
const app = express();
const PORT = 3000;
const corsOption = {
    origin: process.env.APP_ORIGIN_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
export const prisma = new PrismaClient();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
    cors: corsOption
});
connectDB();
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);
app.use(route);
io.on('connection', (socket) => {
    console.log('a user connected with :' + socket.id);
    socket.on('join room', (roomId) => __awaiter(void 0, void 0, void 0, function* () {
        yield socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    }));
    socket.on('leave room', (roomId) => __awaiter(void 0, void 0, void 0, function* () {
        yield socket.leave(roomId);
    }));
    socket.on('disconnect', () => console.log('user disconnected'));
});
httpServer.listen(PORT, () => {
    console.log('The application is listening '
        + 'on port http://localhost:' + PORT);
});
