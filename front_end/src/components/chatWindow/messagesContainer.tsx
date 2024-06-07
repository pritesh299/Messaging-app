import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import Message from "./message";
import { getMessages } from "../../api";
import { getGlobal } from "../App";

interface MessagesContainerProps{
  currentUserId:string
}

const MessagesContainer:React.FC<MessagesContainerProps>=({currentUserId})=> {
   const [messages,setMessages]=useState<any[]>([])
   const MesagesRef:any=useRef(null)

  useEffect(()=>{
    async function fetchMessageList() {
    const messageList= await getMessages(currentUserId,getGlobal("id"))
    setMessages(messageList)
    }
    fetchMessageList()
 },[currentUserId])

 useEffect(()=>{
 MesagesRef.current?.lastElementChild?.scrollIntoView()
 },[messages])

  return (
    <div className="h-[100%]">
      <div
        className="h-full w-full bg-fixed"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        <ChatHeader  currentUserId={currentUserId} />
        <div  className="h-[85%] w-full bg-[#0b141a] bg-opacity-[0.95]  pt-2 pb-4">
          <div ref={MesagesRef} className="h-full w-full overflow-y-scroll relative px-[5%]">
            {messages.map((message,index)=>(
                <>
                <Message key={index} message={message} currentUserId={currentUserId}></Message> </>
               ))}
          </div>
        </div>
        <MessageInput  currentUserId={currentUserId} messages={messages} setMessages={setMessages}/>
      </div>
    </div>
  );
}

export default MessagesContainer;
