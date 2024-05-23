import {useState} from "react"
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import MessagesContainer from "./messagesContainer"


function ChatWindow(){
    const [viewOptions, setViewOptions] = useState(false);
    return(<>
     <ChatHeader />
     <MessagesContainer />
     <MessageInput />
    </>)
}

export default ChatWindow