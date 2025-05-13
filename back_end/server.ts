import express,{Response,Request} from 'express';
import bodyParser from 'body-parser';
import route from './routes/routes.js';
import cors from 'cors';
import connectDB from './config/db.js';
import { Socket, } from './socket/socket.js';
import { PrismaClient } from './generated/prisma/index.js';


const app = express();
const PORT = 3000;

const corsOption = {
    origin: process.env.APP_ORIGIN_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

export const prisma = new PrismaClient();

const httpServer =Socket(app,corsOption)
connectDB()
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);

app.use(route)

httpServer.listen(PORT,() => {
  console.log('The application is listening '
        + 'on port http://localhost:'+PORT);
})