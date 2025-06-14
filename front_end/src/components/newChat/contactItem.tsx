import React, { useState } from "react";
import { getGlobal,addConversation, setGlobal }  from "../../api";

interface ContactItemProp {
  user: {
    id:Number
    username: string;
    email: string;
    avatar:string

  };
  setCurrentUserId:React.Dispatch<React.SetStateAction<Number>>;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
  setViewNewContact: React.Dispatch<React.SetStateAction<boolean>>;

}

const ContactItem: React.FC<ContactItemProp> = ({ user,setCurrentUserId,setChat,setViewNewContact}) => {
  const [hover, setHover] = useState(false);

   async function clickHandler()
   {
    const response = await addConversation(user.id,getGlobal("id")) 

    setCurrentUserId(user.id) 

    setGlobal({"conversationId":response.conversation._id,"activeChatUserId":user.id})
    setChat(true)
    setViewNewContact(false) 
   }

  return (
    <>
      <button
        id={user.id.toString()}
        onClick={clickHandler}
        onMouseEnter={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className={`card h-[70px] gap-[5px] text-white flex justify-between items-center w-[100%] ${hover ? 'bg-[#273443]' : 'bg-[#111b21]'}`}
      >
        <div className="w-[20%] flex justify-center">
          <div className="h-[50px] w-[50px] bg-white rounded-full overflow-hidden" >
            <img src={`${user.avatar}`} alt="" />
          </div>
        </div>
        <div className="w-[80%] border-b py-3 border-slate-700 flex">
          <div className="text-left flex  text-xl items-center gap-2 w-[80%]">
            <h2>{user.username || "John Doe"}</h2>
          </div>
        </div>
      </button>
    </>
  );
}

export default ContactItem;
