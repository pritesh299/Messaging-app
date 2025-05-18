
import MessagesContainer from "./messagesContainer"

interface ChatWindowProps{
    currentUserId:Number;
    setChat:React.Dispatch<React.SetStateAction<boolean>>
    setMessages: React.Dispatch<React.SetStateAction<[{
        senderId: Number;
        content: String;
        timestamp: string;
    }] | undefined>>
    messages: [{
        senderId: Number;
        content: String;
        timestamp:string
    }] | undefined
}

const ChatWindow:React.FC<ChatWindowProps>=({messages,setMessages,currentUserId,setChat} )=>{
   
    return(<>
     <MessagesContainer messages={messages} setMessages={setMessages} currentUserId={currentUserId} setChat={setChat} />
    </>)
}

export default ChatWindow