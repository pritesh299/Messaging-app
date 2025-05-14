import express from "express";
import { LoginUser, RegisterUser } from "../controllers/authController.js";
import TokenAuth from "../middleware/authMiddleware.js";
import {getMessages,createMessage,getLastMessage} from "../controllers/messageController.js";
import {createConversation, getConversations} from "../controllers/conversationController.js"
import { deleteUser, getUser,updateUser } from "../controllers/userController.js";


const router = express.Router();

router.get("/users/:id", getUser);               // Get user by ID
router.delete("/users/:userId", deleteUser);        // Delete user by ID
router.put("/users/:id",updateUser)       
router.post("/users/login", LoginUser);          // Login
router.post("/users/register", RegisterUser);    // Register
router.post("/conversations", createConversation);             // Create a new 1-on-1 conversation
router.get("/conversations/:userId", getConversations);             // Create a new 1-on-1 conversation
router.post("/messages", createMessage);
router.get("/messages/lastMessage/:conversationId/:userId", getLastMessage)
router.get("/messages/:conversationId", getMessages)
// router.get("/contacts/:userId", getContacts);

export default router;
