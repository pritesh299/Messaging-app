import express from "express";
import { LoginUser, RegisterUser } from "../controllers/authController.js";
const router = express.Router();
router.post("/login", LoginUser);
router.post("/register", RegisterUser);
// login
// register
// new convo
// get convo
// new message
// get message
export default router;
