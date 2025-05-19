import express,{Response,Request} from 'express';
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
}

export const prisma = new PrismaClient();
const httpServer = createServer(app);
export const io = new Server(httpServer,{
  cors:corsOption
})

connectDB()
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);

app.use(route)

io.on('connection', (socket) => {
  console.log('a user connected with :'+ socket.id);
  
  socket.on('join room', async (roomId: string) => {
    await socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('leave room', async (roomId: string) => {
    await socket.leave(roomId);
  });

  socket.on('disconnect', () => console.log('user disconnected'));
});

httpServer.listen(PORT,() => {
  console.log('The application is listening '
        + 'on port http://localhost:'+PORT);
})