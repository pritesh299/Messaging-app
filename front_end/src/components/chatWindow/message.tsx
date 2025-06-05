import { useState } from "react";
import { getGlobal,Message } from "../../api";



function MessageCard({message}:{message:Message}) {

const [reciver]= useState<boolean>((message.senderId===getGlobal('id')?false:true))
const [read]= useState(false)
  return (
    <>
   {reciver
   ?<>
   <div
   className="flex  max-w-[90%] p-2  text-white"
 >
   <svg
     viewBox="0 0 8 13"
     height="13"
     width="8"
     preserveAspectRatio="xMidYMid meet"
     className=""
     version="1.1"
     x="0px"
     y="0px"
     enableBackground="new 0 0 8 13"
   >
     <title>tail-in</title>
     <path
       opacity="0.13"
       fill="#000000"
       d="M1.533,3.568L8,12.193V1H2.812C1.042,1,0.474,2.156,1.533,3.568z"
     ></path>
     <path
       fill="#202c33"
       d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
     ></path>
   </svg>

   <div className="bg-[#202c33]  w-auto relative max-w-[90%] rounded-r-lg rounded-b-lg  gap-2 overflow-hidden">
     <div className="gap-2 p-2 flex">
       <div className="max-w-[100%]">
         <p>{message.content}</p>
       </div>
     </div>
     <div className=" float-right text-[10px] flex items-end min-w-[50px] m-1">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
   </div>
  
 </div>
   </>
   :<> 
    <div className="flex justify-end w-full">
          <div
            className="flex p-2 max-w-[90%] justify-end text-white"
          >
            <div className="bg-[#005c4b] relative  rounded-l-lg w-auto rounded-b-lg  p-2 gap-2 overflow-hidden">
              <div className="max-w-[100%]">
              <p>{message.content}</p>
              </div>
              <div className=" float-right flex min-w-[50px]  items-end">
                <div className="text-[10px] flex items-end min-w-[50px]">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                <div className="text-[10px] flex items-end min-w-[5px]">
           
                    <svg
                      viewBox="0 0 16 11"
                      height="11"
                      width="16"
                      preserveAspectRatio="xMidYMid meet"
                      fill="#3b82f6"
                    >
                      <title>msg-dblcheck</title>
                      <path
                        d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z"
                     fill={read?"#3b82f6":"currentColor"} 
                      ></path>
                    </svg>
                
                </div>
              </div>
            </div>
            <svg
              viewBox="0 0 8 13"
              height="13"
              width="8"
              preserveAspectRatio="xMidYMid meet"
              version="1.1"
              x="0px"
              y="0px"
              enableBackground="new 0 0 8 13"
            >
              <title>tail-out</title>
              <path
                opacity="0.13"
                d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"
              ></path>
              <path
                fill="#005c4b"
                d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"
              ></path>
            </svg>
          </div>
        </div>
     
       </>}
   
    </>
  );
}

export default MessageCard;

