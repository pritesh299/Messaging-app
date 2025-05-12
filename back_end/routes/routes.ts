import express from "express";
import { LoginUser, RegisterUser } from "../controllers/authController.js";
import TokenAuth from "../middleware/authMiddleware.js";
import {newMessage,getMessages} from "../controllers/messageController.js";
import { addContact, getContacts, getUser, getUsers } from "../controllers/userController.js";
/* import getConversations, { newConverstion } from "../controllers/ConverstionController.js"; */

const router = express.Router();

// router.get("/getContacts/:id", getContacts);

// router.get("/getMessages/:id1/:id2", getMessages);

// router.post("/getusers", getUsers);
// router.get("/:id", getUser);
router.post("/login", LoginUser);

router.post("/register", RegisterUser);
// router.post("/addContact", addContact);
// router.post("/newMessage", newMessage);


export default router;
