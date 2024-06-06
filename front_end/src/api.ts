import axios from "axios"

let serverURL="http://localhost:3000/"
console.log(serverURL)


export async function getUsers(keyword:string){
   
     try {
        const userList = await axios.get(serverURL+"getUsers/"+keyword)
        return userList.data.userList
    } catch (error:any) {
        console.error('Error:', error.message);
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

export async function LoginUser(userCredentails:object) {
  
  const config = {
    method : "post",
    url : serverURL+ "login",
    xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    data : userCredentails
}
  
  try {
   
     const response = await axios(config)
     return response.data  
  } catch (error: any) {
    console.log(error.response.data.code)
    return error.response.data;
  } 

}

