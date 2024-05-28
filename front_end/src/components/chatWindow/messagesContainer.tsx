import React, { useState } from "react";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import Message from "./message";

function MessagesContainer() {
  return (
    <div className="h-[100%]">
      <div
        className="h-full w-full bg-fixed"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        <ChatHeader />
        <div className="h-[85%] w-full bg-[#0b141a] bg-opacity-[0.95] overflow-y-scroll pt-2 pb-4">
          <div className="h-full w-full relative px-[5%]">
            <Message left={true} right={false} middle={false} />
            <Message left={false} right={true} middle={false} />
            <Message left={false} right={false} middle={true} />
            <Message left={true} right={false} middle={false} />
            <Message left={false} right={true} middle={false} />
            <Message left={false} right={false} middle={true} />
            <Message left={true} right={false} middle={false} />
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
