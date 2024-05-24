import React from "react";
import ContactItem from "./contactItem"

function ContactList(props:any){
    
    return(<>
     <div className=" bg-[#111b21] ">
        <div>
        <div className=" py-4  px-10 text-teal-500 font-md text-md" >
            RECENT
        </div>
        <div className="  p-2">
           <ContactItem />
           <ContactItem />
           <ContactItem />
        </div>
        </div>
        <div>
        <div className=" py-4  px-10 text-teal-500 font-md text-md" >
            VIEWED
        </div>
        <div className="  p-2">
           <ContactItem />
           <ContactItem />
           <ContactItem />
        </div>
        </div>
     </div>
    </>)
}

export default ContactList