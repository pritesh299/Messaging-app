import React, { useEffect, useState } from "react";
import { addMessage, getMessages, getUser } from "../../api";
import { getGlobal } from "../App";

interface CardProps {
   userId:string;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
}

const Card: React.FC<CardProps> = ({userId,setCurrentUserId}) => {
  const [hover, setHover] = useState(false);
  const [user,setUser]=  useState<{userName:String,LastMessgae:string,TimeStamp:string,Avatar:string}>()

  useEffect(  ()=>{
     async function fetchUser(){
      let userData  = await getUser(userId)
      setUser({
        userName:userData.username,
        LastMessgae:"Last message",
        TimeStamp:"2:30",
        Avatar:userData.avatar
      })
     }
     fetchUser()
  },[])

  return (
    <>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => {addMessage() ;getMessages(userId,getGlobal("id"))}}
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
            <p className="text-slate-400 text-sm"> { user?.LastMessgae}</p>
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
