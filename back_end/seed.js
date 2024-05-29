var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import User from "./models/user.js";
import connectDB from './config/db.js';
dotenv.config();
// Generate dummy users
const generateUsers = (num) => __awaiter(void 0, void 0, void 0, function* () {
    const users = [];
    for (let i = 0; i < num; i++) {
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const avatar = faker.image.avatar();
        users.push({
            username,
            email,
            password,
            avatar,
        });
    }
    console.log(users);
    return users;
});
const generateMessages = (num, conversationIds, userIds) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = [];
    for (let i = 0; i < num; i++) {
        const conversationId = faker.helpers.arrayElement(conversationIds);
        const senderId = faker.helpers.arrayElement(userIds);
        const receiverId = faker.helpers.arrayElement(userIds.filter(id => id !== senderId)); // Ensure receiver is different from sender
        const messageID = faker.datatype.uuid();
        const message = faker.lorem.sentence();
        const seen = faker.datatype.boolean();
        messages.push({
            conversationId,
            messageID,
            senderId,
            receiverId,
            message,
            seen
        });
    }
    console.log(messages);
    return messages;
});
// Insert dummy users into the database
const insertDummyUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    try {
        const users = yield generateUsers(1); // Adjust the number as needed
        yield User.insertMany(users);
        console.log('Dummy users inserted');
        mongoose.connection.close();
    }
    catch (err) {
        console.error(err.message);
        mongoose.connection.close();
    }
});
setInterval(insertDummyUsers, 1000);
