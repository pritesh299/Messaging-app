import express from 'express';
import bodyParser from "body-parser";
import route from "./routes/routes.js" 
import cors from "cors";
import connectDB from './config/db.js';
import  {Server } from 'socket.io';
import { createServer } from "http";
import { addUserToSocket, users } from './socket.js';



const app = express();
const PORT:Number=3000;
export const corsOption = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
const httpServer = createServer(app);
export const io = new Server(httpServer,{
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

connectDB()
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);


app.post('/newMessage', (req, res) => {
    console.log('Received message data:', req.body);
    res.status(200).send('Message received');
  });


  httpServer.listen(PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
})