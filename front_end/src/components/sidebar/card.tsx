import React, { useState } from "react";

interface CardProps {
  name?: string;
  lastMessage?: string;
  time?: string;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
}

const Card: React.FC<CardProps> = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => { props.setCurrentUserId(`${Math.random() }`)}}
        className={`card h-[70px] gap-[5px] text-white flex justify-between items-center w-[100%] ${hover ? 'bg-[#273443]' : 'bg-[#111b21]'}`}
      >
        <div className="w-[20%] flex justify-center">
          <div className="h-[50px] w-[50px] bg-white rounded-full" />
        </div>
        <div className="w-[80%] border-b py-3 border-slate-700 flex">
          <div className="text-left w-[80%]">
            <p>{props.name || "John Doe"}</p>
            <p className="text-slate-400 text-sm">{props.lastMessage || "Last message"}</p>
          </div>
          <div className="w-[20%] flex flex-col items-center">
            <div className="w-[100%] flex justify-center text-[12px]">{props.time || "2:30"}</div>
          </div>
        </div>
      </button>
    </>
  );
}

export default Card;
