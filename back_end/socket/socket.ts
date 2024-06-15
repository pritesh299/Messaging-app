import { Server } from 'socket.io';
import {Express} from 'express';
import { createServer } from 'http';


interface User {
    userId: string;
    socketId: string;
}


export let users: User[] = [];
let count=0

export const addUserToSocket = (userId: string , socketId: string) => {
    const user = users.find(user => user.userId === userId);
    const index=users.findIndex(user => user.userId === userId);
    if (!user) {
        users.push({ userId: userId, socketId: socketId });
    }
    if (user) {
       users[index]={ userId: userId, socketId: socketId }
    
    }
}

export function Socket(app: Express,corsOption:{ origin: string | undefined;credentials: boolean;methods: string[];}){

const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors:corsOption

})

io.on('connection', (socket) => {
    console.log('user connected with socket id:',socket.id);
    socket.on("addUsers", (userId: string ) => {
        addUserToSocket(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on('sendMessage', (data: { receiverId: string; message: string } ) => {
      const user = users.find(user => user.userId === data.receiverId);
        if (user) {
            socket.to(user.socketId).emit('getMessage', data);

        }
    });
});
 
return httpServer
}

