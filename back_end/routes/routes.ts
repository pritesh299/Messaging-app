import express from "express";
import { LoginUser, RegisterUser } from "../controllers/authController.js";
import TokenAuth from "../middleware/authMiddleware.js";
import NewConvo from "../controllers/ConverstionController.js";
import newMessage from "../controllers/messageController.js";

const router = express.Router();

router.post("/login",TokenAuth, LoginUser);
router.post("/register", RegisterUser);
router.post("/newconvo",NewConvo)
router.post("/newmessage",newMessage)

// new convo
// get convo
// new message
// get message

export default router;
