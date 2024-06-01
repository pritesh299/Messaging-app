import express from 'express';
import bodyParser from "body-parser";
import route from "./routes/routes.js";
import cors from "cors";
import connectDB from './config/db.js';
const app = express();
const PORT = 3000;
const corsOption = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
connectDB();
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);
app.post('/newMessage', (req, res) => {
    console.log('Received message data:', req.body);
    res.status(200).send('Message received');
});
app.listen(PORT, () => {
    console.log('The application is listening '
        + 'on port http://localhost:' + PORT);
});
