import axios from "axios"
import { io } from "socket.io-client";
let serverURL="http://localhost:3000/"

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
    return response;
  }catch(error){
    console.log(error);
    return error;
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

// export async function getUsers(keyword:string){
//   const config = {
//     method : "post",
//     url : serverURL+ "getusers",
//     xsrfCookieName: 'csrftoken',
//         xsrfHeaderName: 'X-CSRFToken',
//         headers: {'X-Requested-With': 'XMLHttpRequest',
//                   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
//     data : {keyqord:keyword,userId:getGlobal("id")}
// }
  
//   try {
//     const response = await axios(config)
//     console.log(response)

//      return response.data.userList
//   } catch (error: any) {
//     console.error('Error:', error.message);
//     return null;
//   }
// }
  
// export async function getConversations(userId: string) {
//     try {
//       const response = await axios.get(`${serverURL}conversations/${userId}`);
//       console.log(response);
//       return response.data
//     } catch (error: any) {
//       console.error('Error:', error.message);
//       return null;
//     }
//   }

//   export async function getUser(id: Number) {
//     try {
//       const response = await axios.get(serverURL+"users/"+id);
//       return response.data
//     } catch (error: any) {
//       console.error('Error:', error.message);
//       return null;
//     }
//   }
// export async function getMessages(conversationId:string) {
//     try {
//       const response = await axios.get(`${serverURL}messages/${conversationId}`);
//       return response.data.messageList
//     } catch (error: any) {
//       console.error('Error:', error.message);
//       return null;
//     }  
// }

// export async function getLastMessage(conversationId:String,senderId:Number){
//   try {
//       const response = await axios.get(`${serverURL}messages/LastMessage/${conversationId}/${senderId}`);
//       return response.data.lastMessage

//     } catch (error: any) {
//       console.error('Error:', error.message);
//       return null;
//     }  
//   }
// export async function addMessage( messageData:object ) {
//   console.log(messageData);
//   try{
//     const response = await axios.post(serverURL+ "messages", messageData, 
//       {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//   })
//   console.log(response);
//     return response;
//   }catch(error){
//     console.log(error);
//     return error;
//   }
// }



// export async function addContact(ContactData:object,userId:string) {
  
//   const config = {
//     method : "post",
//     url : serverURL+ "addContact",
//     xsrfCookieName: 'csrftoken',
//         xsrfHeaderName: 'X-CSRFToken',
//         headers: {'X-Requested-With': 'XMLHttpRequest',
//                   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
//     data : {ContactData:ContactData,userId:userId}
// }
  
//   try {
   
//      const response = await axios(config)
//      return response.data  
//   } catch (error: any) {
//     console.log(error.response.data.code)
//     return error.response.data;
//   } 

// }

