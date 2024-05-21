import React, { useState } from "react";
import Card_options from "./card_options"

function Card(props: any) {
  let [hover, setHover] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className={`card relative h-[70px] gap-[5px] text-white flex justify-between items-center w-[35vw] ${hover ? 'bg-[#273443]' : 'bg-[#202c33]'}`}
      >
        <div className="w-[20%] flex justify-center">
          <img className="h-[50px] w-[50px] bg-white rounded-full" />
        </div>
        <div className="w-[80%] flex">
          <div className="text-left w-[80%]">
            <p>{props.name || "John Doe"}</p>
            <p>{props.lastMessage || "Last message"}</p>
          </div>
          <div className="w-[20%] flex flex-col  items-center">
            <div className="w-[100%] flex justify-center">2:30</div>
            {hover && <Card_options /> }
          
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
