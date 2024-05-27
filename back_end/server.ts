import express from 'express';
import bodyParser from "body-parser";
import route from "./routes/routes.js" 
import cors from "cors";
import connectDB from './config/db.js';

const app = express();
const PORT:Number=3000;
const corsOption = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));
app.use("/",route)
connectDB()

app.listen(PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
})