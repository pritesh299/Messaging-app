import express from "express";
import { LoginUser, RegisterUser } from "../controllers/authController.js";
import TokenAuth from "../middleware/authMiddleware.js";
import {getMessages,createMessage,getLastMessage} from "../controllers/messageController.js";
import {createConversation, getConversations} from "../controllers/conversationController.js"
import { deleteUser, getUser,updateUser,getUsers } from "../controllers/userController.js";


const router = express.Router();

router.post("/users/login", TokenAuth,LoginUser);      // Login a user
router.post("/users/register", RegisterUser);          // Register a new user

router.get("/users/:id", getUser);                  // Get user by ID
router.get("/users/username/:keyword", getUsers);   // Get users by username
router.delete("/users/:userId", deleteUser);        // Delete user by ID
router.put("/users/:id",updateUser)       

router.post("/conversations", createConversation);             // Create a new 1-on-1 conversation
router.get("/conversations/:userId", getConversations);        // Create a new 1-on-1 conversation
router.post("/messages", createMessage);
router.get("/messages/lastMessage/:conversationId/:userId", getLastMessage)
router.get("/messages/:conversationId", getMessages) 
// router.get("/contacts/:userId", getContacts);

export default router;
