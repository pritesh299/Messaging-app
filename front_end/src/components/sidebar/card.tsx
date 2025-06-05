import React, { useEffect, useState } from "react";
import { getGlobal, getLastMessage, getUser } from "../../api";
import { setGlobal, Message} from "../../api";

interface CardProps {
   userId: Number;
   conversationId:String;
  setCurrentUserId: React.Dispatch<React.SetStateAction<Number>>;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
  messages: Message[] | undefined
}

const Card: React.FC<CardProps> = ({messages,conversationId,userId,setCurrentUserId,setChat}) => {
  const [hover, setHover] = useState(false);
  const [user,setUser]=  useState<{id:Number,username:String,lastMessgae:string,lastMessgaeSeen:Boolean,lastMessgaeSenderId:Number,TimeStamp:string,Avatar:string}>()
  
  useEffect(()=>{
     async function fetchData(){
      let userData  = await getUser(userId)
      let lastMessgae = await getLastMessage(conversationId)
      const isoString = lastMessgae?lastMessgae.updatedAt:"";
      const time = new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      userData&&setUser({
        id:userData.id,
        username:userData.username,
        lastMessgae:lastMessgae?lastMessgae.content:"",
        lastMessgaeSeen:lastMessgae?lastMessgae.seen:false,
        lastMessgaeSenderId:lastMessgae?lastMessgae.senderId:0,
        TimeStamp:time,
        Avatar:userData.avatar
      })
     }
     fetchData()
  },[messages,userId])

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
            <p>{ user?.username || "John Doe"}</p>
            <div className="flex gap-2 items-center">
            {user?.lastMessgaeSenderId === getGlobal("id") && (
              <svg
                viewBox="0 0 16 11"
                height="11"
                width="16"
                preserveAspectRatio="xMidYMid meet"
                fill="#3b82f6"
              >
                <title>msg-dblcheck</title>
                <path
                  d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z"
                  fill={user?.lastMessgaeSeen ? "#3b82f6" : "currentColor"}
                />
              </svg>
            )}
            <p className="text-slate-400 text-sm"> {reduceMessage(user?.lastMessgae)}</p>

            </div>
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
