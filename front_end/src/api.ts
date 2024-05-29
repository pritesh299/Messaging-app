import axios from "axios"

let serverURL="http://localhost:3000/"
console.log(serverURL)


export async function getUsers(keyword:string){
   
     try {
        const userList = await axios.get(serverURL+keyword)
        return userList.data.userList
    } catch (error:any) {
        console.error('Error:', error.message);
    }

}

export async function addNewChat(id1: string, id2: string) {
    try {
      const response = await axios.get(`${serverURL}newConversation/${id1}/${id2}`);
      console.log( response.data);
    } catch (error: any) {
      console.error('Error:', error.message);
      return null;
    }
  }
  


