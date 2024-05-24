import React, { useState } from "react";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import Message from "./message";

function MessagesContainer() {

  return (
    <div className="h-[100%]">
      <div
        className=" h-full w-full bg-fixed"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        <ChatHeader />
      
        <div className="h-[85%] w-full bg-[#0b141a] bg-opacity-[0.95] overflow-y-scroll pt-2 pb-4">
          {/*      {viewOptions && (
          <div className={`absolute top-20 left-0 translate-x-[px] z-10 mt-2 py-3 w-[200px] bg-[#2a3942] shadow-lg text-white`}>
            <div className="flex flex-col"> 
              <button className="px-4 py-2 text-left hover:bg-[#202c33]">
                Option 1
              </button>
              <button className="px-4 py-2 text-left hover:bg-[#202c33]">
                Option 2
              </button>
              <button className="px-4 py-2 text-left hover:bg-[#202c33]">
                Option 3
              </button>
              <button className="px-4 py-2 text-left hover:bg-[#202c33]">
                Option 4
              </button>
              <button className="px-4 py-2 text-left hover:bg-[#202c33]">
                Option 5
              </button>
            </div>
          </div>
        )}  */}
          <div className="h-full w-full relative px-[5%]">
            <Message left={true} right={false} middle={false}  />
            <Message left={false} right={true} middle={false}  />
            <Message left={false} right={false} middle={true}  />
            <Message left={true} right={false} middle={false}  />
            <Message left={false} right={true} middle={false}  />
            <Message left={false} right={false} middle={true}  />
            <Message left={true} right={false} middle={false}  />
            <Message left={false} right={true} middle={false} />
            <Message left={false} right={false} middle={true} />
          </div>
        </div>
        <MessageInput />
      </div>
    </div>
  );
}

export default MessagesContainer;
