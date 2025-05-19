
import MessagesContainer from "./messagesContainer"
import { Message } from "../../api";
interface ChatWindowProps{
    currentUserId:Number;
    setChat:React.Dispatch<React.SetStateAction<boolean>>
    setMessages: React.Dispatch<React.SetStateAction<Message[] | undefined>>
    messages: Message[] | undefined
}

const ChatWindow:React.FC<ChatWindowProps>=({messages,setMessages,currentUserId,setChat} )=>{
   
    return(<>
     <MessagesContainer messages={messages} setMessages={setMessages} currentUserId={currentUserId} setChat={setChat} />
    </>)
}

export default ChatWindow