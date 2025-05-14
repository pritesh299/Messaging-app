import React, { useEffect, useState } from "react";
import Card from "./card";
import { getConversations, getUser } from "../../api";
import { getGlobal } from "../../api";

interface RenderCardsProps{
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
  messages: never[]
}
interface chatProfileProps {
  conversationId: string;
  id:Number;
  updatedAt: Date;
}

const RenderCards:React.FC<RenderCardsProps>=({messages,setChat,setCurrentUserId})=> {
  const [chatList, setChatList] = useState<chatProfileProps[]>([]);
  useEffect(() => {
    async function fetchChatList() {
      try {
        const data = await getConversations(getGlobal("id"));
        const updatedList = []
        if (data && data.conversations) {
          for(let i = 0;i<data.conversations.length;i++){
            updatedList.push({
              conversationId: data.conversations[i]._id,
              id: data.conversations[i].memberList[0],
              updatedAt: data.conversations[i].updatedAt,
            });
          }
        }
        setChatList(updatedList);
      } catch (err) {
        console.log(err);
      }
    }

    fetchChatList();
    const intervalId = setInterval(fetchChatList, 1000);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <div className="overflow-y-scroll w-[100%] h-[85%] bg-[#111b21] shadow-lg p-1">
      {chatList&&chatList.map((contact,id) => (
      <>
        <Card
          key={id}
          userId={contact.id}
          conversationId={contact.conversationId}
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
