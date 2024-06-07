import React,{useEffect, useState} from "react";
import { getUser } from "../../api";
 
interface ChatHeaderProps{
  currentUserId:string
}

const ChatHeader:React.FC<ChatHeaderProps> =({currentUserId})=>{

  const [viewSetting, setViewSetting] = useState(false);
  const [user,setUser]=useState<{id:string,userName:String,LastMessgae:string,TimeStamp:string,Avatar:string}>()
  useEffect(  ()=>{
    async function fetchUser(){
     let userData  = await getUser(currentUserId)
     
     setUser({
       id:userData._id,
       userName:userData.username,
       LastMessgae:"Last message",
       TimeStamp:"2:30",
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
       <div className="flex w-[20%] min-w-[125px] justify-between">
       <button>
       <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none"><title>video-call</title><path d="M3.27096 7.31042C3 7.82381 3 8.49587 3 9.84V14.16C3 15.5041 3 16.1762 3.27096 16.6896C3.5093 17.1412 3.88961 17.5083 4.35738 17.7384C4.88916 18 5.58531 18 6.9776 18H13.1097C14.502 18 15.1982 18 15.7299 17.7384C16.1977 17.5083 16.578 17.1412 16.8164 16.6896C17.0873 16.1762 17.0873 15.5041 17.0873 14.16V9.84C17.0873 8.49587 17.0873 7.82381 16.8164 7.31042C16.578 6.85883 16.1977 6.49168 15.7299 6.26158C15.1982 6 14.502 6 13.1097 6H6.9776C5.58531 6 4.88916 6 4.35738 6.26158C3.88961 6.49168 3.5093 6.85883 3.27096 7.31042Z" fill="#94a3b8"></path><path d="M18.7308 9.60844C18.5601 9.75994 18.4629 9.97355 18.4629 10.1974V13.8026C18.4629 14.0264 18.5601 14.2401 18.7308 14.3916L20.9567 16.3669C21.4879 16.8384 22.3462 16.4746 22.3462 15.778V8.22203C22.3462 7.52542 21.4879 7.16163 20.9567 7.63306L18.7308 9.60844Z" fill="#94a3b8"></path></svg>
          </button>
          <button>
          <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>search-alt</title><path fill="#94a3b8" d="M15.9,14.3H15L14.7,14c1-1.1,1.6-2.7,1.6-4.3c0-3.7-3-6.7-6.7-6.7S3,6,3,9.7 s3,6.7,6.7,6.7c1.6,0,3.2-0.6,4.3-1.6l0.3,0.3v0.8l5.1,5.1l1.5-1.5L15.9,14.3z M9.7,14.3c-2.6,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6 s4.6,2.1,4.6,4.6S12.3,14.3,9.7,14.3z"></path></svg>
          </button>
          <button onClick={()=>{
              setViewSetting(!viewSetting)
          }}>
             <svg viewBox="0 0 24 24" height="28" width="28" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>menu</title><path fill="#94a3b8" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"></path></svg>
             {viewSetting ? (
                <>
                  <div className="w-[25%] absolute top-10 right-10 bg-[#202c33] py-3 text-white shadow-lg z-50">
                    <button className="w-full py-2 hover:bg-[#2a3942]">
                      option 1
                    </button>
                    <button className="w-full py-2 hover:bg-[#2a3942]">
                      option 2
                    </button>
                    <button className="w-full py-2 hover:bg-[#2a3942]">
                      option 3
                    </button>
                    <button className="w-full py-2 hover:bg-[#2a3942]">
                      option 4
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
