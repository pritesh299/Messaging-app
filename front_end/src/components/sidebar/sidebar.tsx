import React from "react";
import ProfileHeadBar from "./userProfile";
import SearchComponent from "./searchBar";
import RenderCards from "./chatList";

interface SidebarProps {
  viewNewContact: boolean;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
  setViewNewContact: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
}


const Sidebar:React.FC<SidebarProps>=( {viewNewContact,setChat,setViewNewContact,setCurrentUserId})=>{
  return (
    <>
      <ProfileHeadBar 
        viewNewContact={viewNewContact} 
        setViewNewContact={setViewNewContact} 
    
      />
      <SearchComponent />
      <RenderCards  setCurrentUserId={setCurrentUserId} setChat={setChat}/> 
    </>
  );
}

export default Sidebar;
