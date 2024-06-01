import React, { useEffect, useState } from "react";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import Message from "./message";
import { getMessages } from "../../api";
import { getGlobal } from "../App";

interface MessagesContainerProps{
  currentUserId:string
}

const MessagesContainer:React.FC<MessagesContainerProps>=({currentUserId})=> {
   const [messages,setMessages]=useState<string[]>([])
    

  useEffect(()=>{
    async function fetchMessageList() {
    const messageList= await getMessages(currentUserId,getGlobal("id"))
    setMessages(messageList)
    console.log(messageList,currentUserId,getGlobal("id"))
    }
    fetchMessageList()
   
 },[])

   
  return (
    <div className="h-[100%]">
      <div
        className="h-full w-full bg-fixed"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        <ChatHeader />
        <div className="h-[85%] w-full bg-[#0b141a] bg-opacity-[0.95] overflow-y-scroll pt-2 pb-4">
          <div className="h-full w-full relative px-[5%]">
            {messages.map((message,index)=>(
                <>
                <Message key={index} message={message} currentUserId={currentUserId}></Message> </>
               ))}
         {/*    />
            <Message left={false} right={true} middle={false} />
            <Message left={false} right={false} middle={true} />
            <Message left={true} right={false} middle={false} />
            <Message left={false} right={true} middle={false} />
            <Message left={false} right={false} middle={true} />
            <Message left={true} right={false} middle={false} />
            <Message left={false} right={true} middle={false} />
            <Message left={false} right={false} middle={true} /> */}
          </div>
        </div>
        <MessageInput  currentUserId={currentUserId}/>
      </div>
    </div>
  );
}

export default MessagesContainer;
