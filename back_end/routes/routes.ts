import express from "express";
import { LoginUser, RegisterUser } from "../controllers/authController.js";
import TokenAuth from "../middleware/authMiddleware.js";
import getConversation from "../controllers/ConverstionController.js";
import {newMessage,getMessages} from "../controllers/messageController.js";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login",TokenAuth, LoginUser);
router.post("/register", RegisterUser);
router.get("/newConversation/:id1/:id2",getConversation)
router.post("/newmessage",newMessage)
router.get("/:id1/:id2",getMessages)
router.get("/:Keyword",getUser)
router.get("/",(req,res)=>{
    console.log("dfkdkkd")
  res.json({message:"message from backend"})
})

export default router;
