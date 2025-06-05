import React, { useState,useEffect } from "react";
import ProfileHeadBar from "./userProfile";
import SearchComponent from "./searchBar";
import RenderCards from "./chatList";
import Profile from "./profile";
import { Message } from "../../api";



interface SidebarProps {
  viewNewContact: boolean;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
  setViewNewContact: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUserId: React.Dispatch<React.SetStateAction<Number>>;
  messages: Message[] | undefined;
}

const Sidebar:React.FC<SidebarProps>=( {messages,viewNewContact,setChat,setViewNewContact,setCurrentUserId})=>{
  const [viewProfile,setViewProfile] =useState(false)

 


  return (
    <>
       {viewProfile
       ?<>
        <div className=" absolute h-full w-full flex justify-center items-center ">
        <div onClick={()=>{setViewProfile(false)}} className="absolute h-full w-full bg-black z-10 bg-opacity-50 ">  
        </div>
        <div className="absolute min-w-[300px] z-20 "><Profile setViewProfile={setViewProfile}/></div>
        </div></>
        :<></> }

      <ProfileHeadBar 
        viewNewContact={viewNewContact} 
        setViewNewContact={setViewNewContact} 
        setViewProfile={setViewProfile}
        setChat={setChat}
      />
      <SearchComponent/>
      <RenderCards messages={messages} setCurrentUserId={setCurrentUserId} setChat={setChat}/> 
    </>
  );
}

export default Sidebar;
