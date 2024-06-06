import React, { useState } from "react";
import { getGlobal } from "../App";
import { addMessage } from "../../api";
import { response } from "express";


interface MessageInputProps {
  currentUserId: string;
  messages: object[];
  setMessages: React.Dispatch<React.SetStateAction<object[]>>;
}


function getTime(): string {

  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();

  const time = hours + ':' + minutesStr + ' ' + ampm;

  return time;
}

function getDate(): string {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();

  const dayStr = day < 10 ? '0' + day : day.toString();
  const monthStr = month < 10 ? '0' + month : month.toString();

  const formattedDate = monthStr + '/' + dayStr + '/' + year

  return formattedDate;
}


function MessageInput({currentUserId,messages,setMessages}:MessageInputProps) {
  const [focus, setFocus] = useState(false);
  const [message, setMessage] = useState("");
  const [post, setPost] = useState({ senderId: "" });

  async function sendMessage() {
    const newPost = {
      senderId: getGlobal("id"),
      receiverId: currentUserId,
      message: message,
      seen: false,
      time: getTime(),
      date: getDate(),
    };
    setPost(newPost);
    const response:{data:{message:object}} = await addMessage(newPost) || {data:{message:{}}}
    console.log("message sent ",response.data.message,messages)
   setMessages([...messages,response.data.message]) 
  }
 
  return (
    <>
      <div className="z-10 h-[7.5%] bg-[#202c33] w-[100%] flex items-center border-x border-slate-700">
        <div className="min-w-[50px] w-[7.5%] flex justify-center">
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enable-background="new 0 0 24 24"
          >
            <title>smiley</title>
            <path
              fill="#94a3b8"
              d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"
            ></path>
          </svg>
        </div>
        <div className="min-w-[50px] w-[7.5%] flex justify-center">
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <title>attach-menu-plus</title>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.5 13.2501L20.5 10.7501L13.25 10.7501L13.25 3.5L10.75 3.5L10.75 10.7501L3.5 10.7501L3.5 13.2501L10.75 13.2501L10.75 20.5L13.25 20.5L13.25 13.2501L20.5 13.2501Z"
              fill="#94a3b8"
            ></path>
          </svg>
        </div>
        <div className="min-w-[300px] w-[85%]">
          <form  onSubmit={(e)=>{
            e.preventDefault()
                sendMessage()
                 setMessage("")
              }}id="messageInput"  className="flex justify-center">
             
            <input  name="message"
              onChange={(event) => {
                event.target.value === "" ? setFocus(false) : setFocus(true);
                setMessage(event.target.value)
              }}
              className="min-w-[300px] w-[90%] px-4 py-2 rounded-lg outline-none bg-[#2a3942] text-white"
              type="text"
              value={message}
            />
            {focus ? (
              <button 
               type="submit"
                className="min-w-[50px] w-[10%] flex justify-center items-center">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.1"
                  x="0px"
                  y="0px"
                  enable-background="new 0 0 24 24"
                >
                  <title>send</title>
                  <path
                    fill="#94a3b8"
                    d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                  ></path>
                </svg>
              </button>
            ) : (
              <button 
              type="button"

              className="min-w-[50px] w-[10%] flex justify-center items-center">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.1"
                  x="0px"
                  y="0px"
                  enable-background="new 0 0 24 24"
                >
                  <title>ptt</title>
                  <path
                    fill="#94a3b8"
                    d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
                  ></path>
                </svg>
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default MessageInput;
