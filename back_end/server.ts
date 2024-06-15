import express from 'express';
import bodyParser from 'body-parser';
import route from './routes/routes.js';
import cors from 'cors';
import connectDB from './config/db.js';
import { Socket, } from './socket/socket.js';
import generateServerMessage from './IntilaIDataGenreation/generateData.js';


// Initialize express app
const app = express();
const PORT = 3000;

 const corsOption = {
    origin: process.env.APP_ORIGIN_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}


const httpServer =Socket(app,corsOption)

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