import express from "express";
import { LoginUser, RegisterUser } from "../controllers/authController.js";
import { getMessages, createMessage } from "../controllers/messageController.js";
import { createConversation, getConversations } from "../controllers/conversationController.js";
import { deleteUser, getUser, updateUser } from "../controllers/userController.js";
const router = express.Router();
router.get("/users/:id", getUser); // Get user by ID
router.delete("/users/:id", deleteUser); // Delete user by ID
router.put("/users/:id", updateUser);
router.post("/users/login", LoginUser); // Login
router.post("/users/register", RegisterUser); // Register
router.post("/conversations", createConversation); // Create a new 1-on-1 conversation
router.get("/conversations/:userId", getConversations); // Get all conversations for a user
router.post("/messages", createMessage);
router.get("/messages/:conversationId", getMessages);
export default router;
