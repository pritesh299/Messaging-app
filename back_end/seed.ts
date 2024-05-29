import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {faker} from '@faker-js/faker';
import User from "./models/user.js"
import connectDB from './config/db.js';

dotenv.config();
// Generate dummy users
const generateUsers = async (num: number) => {
  const users = [];
 

  for (let i = 0; i < num; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const avatar = faker.image.avatar()

    users.push({
      username,
      email,
      password,
      avatar,
    });
  } 
   console.log(users)
  return users;
};
const generateMessages = async (num: number, conversationIds: mongoose.Types.ObjectId[], userIds: string[]) => {
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
};


// Insert dummy users into the database
const insertDummyUsers = async () => {
    await connectDB()

  try {
    const users = await generateUsers(1); // Adjust the number as needed
    await User.insertMany(users);
    console.log('Dummy users inserted');
    mongoose.connection.close();
  } catch (err:any) {
    console.error(err.message);
    mongoose.connection.close();
  }
};

setInterval(insertDummyUsers,1000)