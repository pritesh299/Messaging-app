import React from "react";
import ProfileHeadBar from "./userProfile";
import SearchComponent from "./searchBar";
import RenderCards from "./chatList";

function Sidebar(props: any) {
  return (
    <>
      <ProfileHeadBar 
        viewStatus={props.viewStatus} 
        setViewStatus={props.setViewStatus} 
        viewNewContact={props.viewNewContact} 
        setViewNewContact={props.setViewNewContact} 
      />
      <SearchComponent />
      <RenderCards /> 
    </>
  );
}

export default Sidebar;
