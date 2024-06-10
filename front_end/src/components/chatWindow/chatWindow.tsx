
import MessagesContainer from "./messagesContainer"

interface ChatWindowProps{
    currentUserId:string;
    setChat:React.Dispatch<React.SetStateAction<boolean>>
    setMessages: React.Dispatch<React.SetStateAction<object[]>>
    messages: [{
        receiverId: String;
        message: String;
    }]
}

const ChatWindow:React.FC<ChatWindowProps>=({messages,setMessages,currentUserId,setChat} )=>{
   
    return(<>
     <MessagesContainer messages={messages} setMessages={setMessages} currentUserId={currentUserId} setChat={setChat} />
    </>)
}

export default ChatWindow