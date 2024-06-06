import React, { useEffect, useState } from "react";
import Card from "./card";
import { getContacts, getUser } from "../../api";
import { getGlobal } from "../App";

interface RenderCardsProps{
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
}

 
 function RenderCards(props:RenderCardsProps) {
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
    <div className="overflow-y-scroll w-[100%] h-[77.5%] bg-[#111b21] shadow-lg p-1">
      {chatList.map((id, index) => (
      <>
      { }
        <Card
          key={id}
          userId={id}
          setCurrentUserId={props.setCurrentUserId}
        />
        </>
      ))}
    </div>
  );
}

export default RenderCards;
