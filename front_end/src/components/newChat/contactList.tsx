import React, { useState,useEffect } from "react";
import ContactItem from "./contactItem";

interface ContactListProps{
  userList:any[]
  setCurrentUserId:React.Dispatch<React.SetStateAction<string>>;

}

const ContactList :React.FC<ContactListProps>= ({userList,setCurrentUserId})=> {

  const [NoneUser,setNoneUser]=useState(false)
  const [hover, setHover] = useState(false);  
  
  useEffect(() => {
    if (userList.length === 0 || userList[0] === "no users") {
      setNoneUser(true);
    } else {
      setNoneUser(false);
    }
  }, [userList]);


  return (
    <>
      <div className="bg-[#111b21]" >
        <div>
        
        <div className="px-2">
        { userList.map((user) => <ContactItem key={user.id} user={user}  setCurrentUserId={setCurrentUserId}/>)}
        {NoneUser&&
        <div
        onMouseEnter={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className={`card h-[70px] gap-[5px] text-white flex justify-center items-center w-[100%] bg-[#111b21] `}
      >
         <div className=" text-center" >No  Users  </div>
      
      </div>
        }
        </div>
        </div>
      </div>
    </>
  );
}

export default ContactList;
