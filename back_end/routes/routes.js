import express from "express";
import Login from "../controllers/authController.js";
const route = express.Router();
route.get("/", Login);
//login
//register
//new convo
//get convo
//new message
//get message
export default route;
