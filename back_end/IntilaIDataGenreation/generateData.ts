import Message from "../models/message.js";
import User from "../models/user.js";


function getTime(): string {

    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
  
    const time = hours + ':' + minutesStr + ' ' + ampm;
  
    return time;
  }
  
  function getDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
  
    const dayStr = day < 10 ? '0' + day : day.toString();
    const monthStr = month < 10 ? '0' + month : month.toString();
  
    const formattedDate = monthStr + '/' + dayStr + '/' + year
  
    return formattedDate;
  }
  

export default async function generateServerMessage(user:User){
    
    let [ username, email, password, avatar ] =["DEVELOPER","adummyemailfordeveloper@gmail.com","999999","data:image/jpeg;base64,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"]
    let date= new Date()
    try {
        let DEVELOPER:User
        let exist = await User.findOne({ email });
        if (exist) {
            DEVELOPER = exist
        }else{
            DEVELOPER = new User({ username, email, password,avatar,contactList:[] });
            const  response =await DEVELOPER.save();
        }

        let response1= await DEVELOPER.updateOne({contactList:[...DEVELOPER.contactList,user]})
        let response2= await user.updateOne({contactList:[...user.contactList,DEVELOPER]}) 
         const msgFromDeveloper={
            senderId:DEVELOPER._id,
            receiverId: user._id,
            message: `hello ${user.username},welcome to my clone to chat with someone you know go to new chat icon on top right and ad new contact `,
            seen: false,
            date:getDate(),
            time:getTime(),
         }
        const newMessage = new Message(msgFromDeveloper);
        let reposnse=await newMessage.save();
      

    } catch (error:any) {
        console.error(error);
    }
}