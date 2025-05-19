import React, { useEffect, useState } from "react";
import Card from "./card";
import { getConversations, getUser } from "../../api";
import { getGlobal,Message } from "../../api";

interface RenderCardsProps{
  setCurrentUserId: React.Dispatch<React.SetStateAction<Number>>;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
  messages: Message[] | undefined
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
        const response  = await getConversations(getGlobal("id"));
        const updatedList = []
        if (response && response.conversations) {
          for(let i = 0;i<response.conversations.length;i++){
            updatedList.push({
              conversationId: response.conversations[i]._id,
              id: (response.conversations[i].memberList[0])? response.conversations[i].memberList[0] :  getGlobal("id"),
              updatedAt: response.conversations[i].updatedAt,
            });
          }
        }
        setChatList(updatedList);
      } catch (err) {
        console.log(err);
      }
    }
    fetchChatList();
  }, []);

  return (
    <div className="overflow-y-scroll w-[100%] h-[85%] bg-[#111b21] shadow-lg p-1">
      {
      chatList&&chatList.map((contact,id) => (
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
