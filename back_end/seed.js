var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import connectDB from './config/db.js';
import Message from './models/message.js';
dotenv.config();
// Generate dummy users
/*
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
      contactList:["6656cc10ce2308b03287ca03"]

    });
  }
   console.log(users)
  return users;
};




// Insert dummy users into the database
const insertDummyUsers = async () => {
    await connectDB()

  try {
    const users = await generateUsers(1); // Adjust the number as needed
   let response= await User.insertMany(users);
    console.log('Dummy users inserted',response);
    mongoose.connection.close();
  } catch (err:any) {
    console.error(err.message);
    mongoose.connection.close();
  }
};

insertDummyUsers() */
const generateMessages = (num) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = [];
    for (let i = 0; i < num; i++) {
        const senderId = "6656cc1ece2308b03287ca1f";
        const recieverId = "6656cc14ce2308b03287ca0b";
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
});
function insertDummyMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        connectDB();
        try {
            console.log(generateMessages(20));
            let messagesData = generateMessages(20);
            const response = yield Message.insertMany(messagesData);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    });
}
insertDummyMessages();
