
import MessagesContainer from "./messagesContainer"

interface ChatWindowProps{
    currentUserId:string
}

const ChatWindow:React.FC<ChatWindowProps>=({currentUserId})=>{
   
    return(<>
     <MessagesContainer  currentUserId={currentUserId} />
    </>)
}

export default ChatWindow