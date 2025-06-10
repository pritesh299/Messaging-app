import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import MessageCard from "./message";
import { getMessages,socket,getGlobal,Message } from "../../api";
import EmojiTray from "./emojiTray";

interface MessagesContainerProps {
  currentUserId: Number;
  setChat: React.Dispatch<React.SetStateAction<boolean>>
  setMessages: React.Dispatch<React.SetStateAction<Message[] | undefined>>
  messages: Message[] | undefined
}
const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages, setMessages, currentUserId, setChat }) => {

  const [showEmoji, setShowEmoji] = useState<boolean>(false)
  const [message, setMessage] = useState("");
  const MesagesRef: any = useRef(null)

  async function fetchMessageList() {
    const conversationId = getGlobal("conversationId")
    if (conversationId === null) return
    let messageList = await getMessages(conversationId)
    setMessages(messageList)
  }



  useEffect(() => {
    fetchMessageList()
        const conversationId = getGlobal("conversationId");

    if (conversationId) {
      socket.emit('join room', conversationId, currentUserId);
    }
    const handleNewMessage = () => {
      fetchMessageList()
    };
    socket.on('new message', handleNewMessage);
    socket.on('message read',()=>{
      messages?.forEach((message)=>{
        if (message.senderId !== currentUserId && message.seen === false) {
          message.seen = true;
      }
    })
  })

    return () => {
      socket.off('new message', handleNewMessage);
    };
  }, [currentUserId])

  useEffect(() => {
    MesagesRef.current?.lastElementChild?.scrollIntoView()
  }, [messages])


  return (
    <div className="h-[100%]">
      {showEmoji ? <><div className=" absolute h-full w-[70%] ">
        <div onClick={() => { setShowEmoji(false) }} className="absolute h-full w-full bg-black z-10 bg-opacity-50 ">
        </div>
        <div className=" absolute z-20  top-[20%] left-[25%]"><EmojiTray message={message} setMessage={setMessage} setShowEmoji={setShowEmoji} /></div>
      </div></> : <></>}
      <div
        className="h-full w-full bg-fixed"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        <ChatHeader currentUserId={currentUserId} setChat={setChat} />
        <div className="h-[85%] w-full bg-[#0b141a] bg-opacity-[0.95]  pt-2 pb-4">
          <div ref={MesagesRef} className="h-full w-full overflow-y-scroll relative px-[5%]">
            {messages && messages.map((message, index) => (
              <><MessageCard key={index} message={message}></MessageCard></>
            ))}
          </div>
        </div>
        <MessageInput messageString={message} setMessage={setMessage} currentUserId={currentUserId} messages={messages} setMessages={setMessages} setShowEmoji={setShowEmoji} />
      </div>
    </div>
  );
}

export default MessagesContainer;
