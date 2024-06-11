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


export async function getUsers(keyword:string){
  const config = {
    method : "post",
    url : serverURL+ "getusers",
    xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    data : {keyqord:keyword,userId:getGlobal("id")}
}
  
  try {
    const response = await axios(config)
    console.log(response)

     return response.data.userList
  } catch (error: any) {
    console.error('Error:', error.message);
    return null;
  }
}
  
  export async function getContacts(id1: string) {
    try {
      const response = await axios.get(`${serverURL}getContacts/${id1}`);
      return response.data
    } catch (error: any) {
      console.error('Error:', error.message);
      return null;
    }
  }

  export async function getUser(id1: string) {
    try {
      const response = await axios.get(serverURL+id1);
      return response.data
    } catch (error: any) {
      console.error('Error:', error.message);
      return null;
    }
  }

  export async function getMessages(id1: string,id2:string) {
    try {
      const response = await axios.get(`${serverURL}getMessages/${id1}/${id2}`);
      return response.data
    } catch (error: any) {
      console.error('Error:', error.message);
      return null;
    }
  
}


export async function addMessage( data:object ) {

  const config = {
    method : "post",
    url : serverURL+ "newMessage",
    xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    data : data
}
  
  try {
    const response = await axios(config)
     return response
  } catch (error: any) {
    console.error('Error:', error.message);
    return null;
  }
}


export async function registerUser(userData:object){

  const config = {
    method : "post",
    url : serverURL+ "register",
    xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    data : userData
}
  
  try {
    const response = await axios(config)
     return response
  } catch (error: any) {
    console.error('Error:', error.message);
    return error;
  } 
}

export async function LoginUser(userCredentails:object,token?:string) {
  
  const config = {
    method : "post",
    url : serverURL+ "login",
    xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    data : {userData:userCredentails,token:token||""}
}
  
  try {
   
     const response = await axios(config)
     return response.data  
  } catch (error: any) {
 
    return error.response.data;
  } 

}

export async function addContact(ContactData:object,userId:string) {
  
  const config = {
    method : "post",
    url : serverURL+ "addContact",
    xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    data : {ContactData:ContactData,userId:userId}
}
  
  try {
   
     const response = await axios(config)
     return response.data  
  } catch (error: any) {
    console.log(error.response.data.code)
    return error.response.data;
  } 

}

