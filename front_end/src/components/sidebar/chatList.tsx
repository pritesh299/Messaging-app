import React, { useEffect, useState } from "react";
import Card from "./card";
import { getContacts } from "../../api";
import { getGlobal } from "../../api";

interface RenderCardsProps{
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
  messages: never[]
}

 
 const RenderCards:React.FC<RenderCardsProps>=({messages,setChat,setCurrentUserId})=> {
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
      {chatList&&chatList.map((id,index) => (
      <>
      { }
        <Card
          key={id}
          userId={id}
          setCurrentUserId={setCurrentUserId}
          setChat={setChat}
          messages={messages}
        />
        </>
      ))}
    </div>
  );
}

export default RenderCards;
