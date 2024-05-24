import React from "react";
import ContactList from "./contactList";

function NewChat(props: any) {
  const dummyStatusData = [
    { id: 1, name: "John Doe", lastMessage: "Hello there!", viewed: true },
    { id: 2, name: "Jane Smith", lastMessage: "What's up?", viewed: false },
    { id: 3, name: "Alice Johnson", lastMessage: "See you soon", viewed: true },
    { id: 4, name: "Michael Brown", lastMessage: "Good night", viewed: false },
  ];

  return (
    <div className="h-full">
      <div className="w-full flex items-end h-[15%] bg-[#202c33] py-4 px-2">
        <div className="px-3 flex items-center gap-6 w-full">
          <button
            onClick={() => {
              props.setViewNewContact(!props.viewNewContact);
            }}
          >
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
              <title>back</title>
              <path
                fill="#94a3b8"
                d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
              ></path>
            </svg>
          </button>
          <div>
            <p className="text-lg text-slate-200 font-semibold">Status</p>
          </div>
        </div>
      </div>
      <div className="overflow-y-scroll h-[85%]">
        <div className="card py-4 h-[100px] gap-[5px] text-white flex justify-between items-center w-full bg-[#111b21]">
          <div className="w-[20%] flex justify-center">
            <div className="h-[50px] w-[50px] bg-white rounded-full" />
          </div>
          <div className="w-[80%] py-4 flex">
            <div className="text-left w-full">
              <p>{props.name || "John Doe"}</p>
              <p className="text-slate-400 text-sm">
                {props.lastMessage || "Last message"}
              </p>
            </div>
          </div>
        </div>
        <ContactList statusList={dummyStatusData} />
      </div>
    </div>
  );
}

export default NewChat;
