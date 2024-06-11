import { Server } from 'socket.io';
import { io } from './server';


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

  


