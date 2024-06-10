import React, { useEffect, useState } from "react";
import { addMessage, getMessages, getUser } from "../../api";
import { getGlobal } from "../../api";

interface CardProps {
   userId:string;
 
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
  messages: never[]
}

const Card: React.FC<CardProps> = ({messages,userId,setCurrentUserId,setChat}) => {
  const [hover, setHover] = useState(false);
  const [user,setUser]=  useState<{id:string,userName:String,LastMessgae:string,TimeStamp:string,Avatar:string}>()


  useEffect(()=>{
     async function fetchData(){
      let userData  = await getUser(userId)
      let messaegList=await getMessages(userData._id,getGlobal("id"))
    
   
      setUser({
        id:userData._id,
        userName:userData.username,
        LastMessgae:messaegList[messaegList.length-1].message,
        TimeStamp:messaegList[messaegList.length-1].time,
        Avatar:userData.avatar
      })
     }
     fetchData()
  },[messages])

  return (
    <>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => {setChat(true); {user&&setCurrentUserId(user.id)}getMessages(userId,getGlobal("id"))}}
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
            <p className="text-slate-400 text-sm"> {user?.LastMessgae}</p>
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
