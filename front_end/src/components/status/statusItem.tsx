import React, { useState } from "react";

function StatusItem(props: any) {
  let [hover, setHover] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className={`card h-[70px] gap-[5px] text-white flex justify-between items-center w-[100%] ${hover ? 'bg-[#273443]' : 'bg-[#111b21]'}`}
      >
        <div className="w-[20%] flex justify-center">
          <div className="h-[50px] w-[50px] bg-white rounded-full" />
        </div>
        <div className="w-[80%] border-t py-3 border-slate-700 flex">
          <div className="text-left w-[80%]">
            <p>{props.name || "John Doe"}</p>
            <p className="text-slate-400 text-sm">{props.lastMessage || "Last message"}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatusItem;
