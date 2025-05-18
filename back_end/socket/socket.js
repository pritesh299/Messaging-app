import { Server } from 'socket.io';
import { createServer } from 'http';
export let users = [];
let count = 0;
export const addUserToSocket = (userId, socketId) => {
    const user = users.find(user => user.userId === userId);
    const index = users.findIndex(user => user.userId === userId);
    if (!user) {
        users.push({ userId: userId, socketId: socketId });
    }
    if (user) {
        users[index] = { userId: userId, socketId: socketId };
    }
};
export function Socket(app, corsOption) {
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: corsOption
    });
    io.on('connection', (socket) => {
        console.log('user connected with socket id:', socket.id);
        socket.on("addUsers", (userId) => {
            addUserToSocket(userId, socket.id);
            console.log('users array:', users);
            io.emit("getUsers", users);
        });
        socket.on('sendMessage', (data) => {
            const user = users.find(user => user.userId === data.receiverId);
            if (user) {
                socket.to(user.socketId).emit('getMessage', data);
            }
        });
    });
    return httpServer;
}
