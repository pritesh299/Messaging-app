import React, { useEffect, useState } from "react";
import Card from "./card";
import { getContacts, getUser } from "../../api";
import { getGlobal } from "../App";

interface RenderCardsProps{
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
}

 
 const RenderCards:React.FC<RenderCardsProps>=({setChat,setCurrentUserId})=> {
  const [chatList, setChatList] = useState<string[]>([]);

  
 
  useEffect(() => {
      
    async function fetchChatList() {

      try {
        const data = await getContacts(getGlobal("id"));
      
           setChatList(data)          
      } catch (err) {
        console.log(err);
      }
    }
    fetchChatList();
  }, []);

  

  return (
    <div className="overflow-y-scroll w-[100%] h-[85%] bg-[#111b21] shadow-lg p-1">
      {chatList.map((id, index) => (
      <>
      { }
        <Card
          key={id}
          userId={id}
          setCurrentUserId={setCurrentUserId}
          setChat={setChat}
        />
        </>
      ))}
    </div>
  );
}

export default RenderCards;
