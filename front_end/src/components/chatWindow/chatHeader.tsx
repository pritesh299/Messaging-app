import React,{useEffect, useState} from "react";
import { getUser } from "../../api";
 
interface ChatHeaderProps{
  currentUserId:string;
  setChat:React.Dispatch<React.SetStateAction<boolean>>

}

const ChatHeader:React.FC<ChatHeaderProps> =({currentUserId,setChat})=>{

  const [viewSetting, setViewSetting] = useState(false);
  const [user,setUser]=useState<{id:string,userName:String,Avatar:string}>()
  useEffect(  ()=>{
    async function fetchUser(){
     let userData  = await getUser(currentUserId)
     
     setUser({
       id:userData._id,
       userName:userData.username,
       Avatar:userData.avatar
     })
    }
    fetchUser()
 },[currentUserId])


  return(<>
   <div className=" w-[100%] h-[7.5%] bg-[#202c33] px-4 py-[6px] flex border-x border-slate-700">
       <div className="w-[5%] min-w-[50px]" >
        <div className="h-[40px] w-[40px] bg-white rounded-full overflow-hidden" >
        <img src={user&&user.Avatar} alt="contcat image" />
        </div>
       </div>
       <div className="flex flex-col w-[75%] text-white "> 
          <p >{user&&user.userName}</p>
          <p className=" text-sm text-slate-400">online status</p>
       </div>
       <div className="flex w-[20%] min-w-[125px] justify-end">
    
        
          <button onClick={()=>{
              setViewSetting(!viewSetting)
          }}>
             <svg viewBox="0 0 24 24" height="28" width="28" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>menu</title><path fill="#94a3b8" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"></path></svg>
             {viewSetting ? (
                <>
                  <div className="w-[25%] absolute top-10 right-10 bg-[#202c33] py-3 text-white shadow-lg z-50 border-[0.1px] border-slate-600">
                    <button onClick={()=>{setChat(false)}} className="w-full py-2 hover:bg-[#2a3942] ">
                     Exit Chat
                    </button>
              
                  </div>
                </>
              ) : (
                <></>
              )}
          </button>
       </div>
   </div> 
  </>)
}
export default ChatHeader
