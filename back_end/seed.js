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
            contactList: ["6656cc10ce2308b03287ca03"]
        });
    }
    console.log(users);
    return users;
});
// Insert dummy users into the database
const insertDummyUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    try {
        const users = yield generateUsers(8); // Adjust the number as needed
        let response = yield User.insertMany(users);
        console.log('Dummy users inserted', response);
        mongoose.connection.close();
    }
    catch (err) {
        console.error(err.message);
        mongoose.connection.close();
    }
});
insertDummyUsers();
/*
const generateMessages = async (num: number) => {
  const messages = [];

  for (let i = 0; i < num; i++) {
      const senderId = "6656cc1ece2308b03287ca1f"
      const recieverId = "6656cc14ce2308b03287ca0b"
      const message = faker.lorem.sentence();
      const seen = faker.datatype.boolean();

      messages.push({
          senderId,
          recieverId,
          message,
          seen,
      });
  }

  return messages;
};


async function insertDummyMessages() {
  connectDB()
  try{
  console.log(generateMessages(20))
  let messagesData=generateMessages(20)
  const response= await Message.insertMany(messagesData)
  console.log(response)
  } catch(error){
    console.log(error)
  }

}
insertDummyMessages() */ 
