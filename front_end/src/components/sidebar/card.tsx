import React, { useEffect, useState } from "react";
import { getGlobal, getLastMessage, getUser } from "../../api";
import { setGlobal} from "../../api";

interface CardProps {
   userId: Number;
   conversationId:String;
  setCurrentUserId: React.Dispatch<React.SetStateAction<Number>>;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
  messages: [{
    senderId: Number;
    content: String;
    timestamp:string
}] | undefined
}

const Card: React.FC<CardProps> = ({messages,conversationId,userId,setCurrentUserId,setChat}) => {
  const [hover, setHover] = useState(false);
  const [user,setUser]=  useState<{id:Number,userName:String,lastMessgae:string,TimeStamp:string,Avatar:string}>()
  
  useEffect(()=>{
     async function fetchData(){
      let userData  = await getUser(userId)
      let lastMessgae = await getLastMessage(conversationId,userId)
      const isoString = lastMessgae?lastMessgae.updatedAt:"";
      const time = new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      userData&&setUser({
        id:userData.id,
        userName:userData.name,
        lastMessgae:lastMessgae?lastMessgae.content:"",
        TimeStamp:time,
        Avatar:userData.avatar
      })
     }
     fetchData()
  },[messages])

  function reduceMessage(msg:string |undefined){
     if(msg){
        if(msg.length>25){
          msg=msg.substring(0,25)
          msg=msg+"..."
        }
     }
     return msg
  }

  return (
    <>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => {setChat(true); {user&&setCurrentUserId(user.id)};setGlobal({"conversationId":conversationId,"activeChatUserId":user?.id})}}
        className={`card h-[70px] gap-[5px] text-white flex justify-between items-center w-[100%] ${hover ? 'bg-[#273443]' : 'bg-[#111b21]'}`}
      >
        <div className="w-[20%] flex justify-center">
          <div className="h-[50px] w-[50px] bg-white rounded-full overflow-hidden" >
            <img src={user?.Avatar} alt="" />
          </div>
        </div>
        <div className="w-[80%] border-b py-3 border-slate-700 flex">
          <div className="text-left w-[80%]">
            <p>{ user?.userName || "John Doe"}</p>
            <p className="text-slate-400 text-sm"> {reduceMessage(user?.lastMessgae)}</p>
          </div>
          <div className="w-[20%] flex flex-col items-center">
            <div className="w-[100%] flex justify-center text-[12px]">{user?.TimeStamp}</div>
          </div>
        </div>
      </button>
    </>
  );
}

export default Card;
