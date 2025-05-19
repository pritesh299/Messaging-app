import axios from "axios"
import { io } from "socket.io-client";
let serverURL="http://localhost:3000/"

export  interface Message {
    senderId: Number;
    content: String;
    timestamp: string;
    seen:Boolean;
    conversationId:string
  }

export const socket=io(serverURL)

let _obj:any={}

export const setGlobal = (obj:any) => {
  Object.assign(_obj, obj)
}

export const getGlobal = (varName:any) => {
  if(_obj[varName] !== undefined){
     return _obj[varName]
  }
  else {
     return null
  }
} 

export async function registerUser(userCredentails:object){
  try{
    const response = await axios.post(serverURL+ "users/register", userCredentails, 
      {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  })
    return response.data;
  }catch(error:any){
    return error.response.data;
  }
}

export async function LoginUser(userCredentails:object) {
    try{
      const response = await axios.post(serverURL+ "users/login", userCredentails, 
        {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return response.data;
    }
    catch(error:any){
      return error.response.data;
    }
}

export async function getLastMessage(conversationId:String,senderId:Number){
  try {
      const response = await axios.get(`${serverURL}messages/LastMessage/${conversationId}`);
      return response.data.lastMessage

    } catch (error: any) {
      console.error('Error:', error.message);
      return null;
    }  
  }

export async function getConversations(userId: string) {
  try {
    const response = await axios.get(`${serverURL}conversations/${userId}`);
    return response.data
  } catch (error: any) {
    console.error('Error:', error.message);
    return null;
  }
}

export async function getUser(id: Number) {
  try {
    const response = await axios.get(serverURL+"users/"+id);
    return response.data
  } catch (error: any) {
    console.error('Error:', error.message);
    return null;
  }
}

export async function getUsers(keyword:string){
  try {
    const response = await axios.get(serverURL+"users/username/"+keyword);
    return response.data
  } catch (error: any) {
    console.error('Error:', error.message);
    return null;
  }
}
  

export async function getMessages(conversationId:string) {
    try {
      const response = await axios.get(`${serverURL}messages/${conversationId}`);
      return response.data.messageList
    } catch (error: any) {
      console.error('Error:', error.message);
      return null;
    }  
}

export async function addMessage( messageData:object ) {
  console.log(messageData);
  try{
    const response = await axios.post(serverURL+ "messages", messageData, 
      {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  })

    return response;
  }catch(error){
    console.log(error);
    return error;
  }
}

export async function addConversation(userId1:Number,UserId2:Number) {
  const data = {
    userId1: userId1,
    userId2: UserId2
  }
  try {
    const response = await axios.post(serverURL+ "Conversations", data, 
      {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  })
    return response.data;
  }catch(error){
    console.log(error);
  }
}

