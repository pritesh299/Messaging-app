import React from "react";
import ProfileHeadBar from "./userProfile";
import SearchComponent from "./searchBar";
import RenderCards from "./chatList";

interface SidebarProps {
  viewNewContact: boolean;
  setViewNewContact: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
}


function Sidebar(props:SidebarProps ) {
  return (
    <>
      <ProfileHeadBar 
      
        viewNewContact={props.viewNewContact} 
        setViewNewContact={props.setViewNewContact} 
    
      />
      <SearchComponent />
      <RenderCards  setCurrentUserId={props.setCurrentUserId}/> 
    </>
  );
}

export default Sidebar;
