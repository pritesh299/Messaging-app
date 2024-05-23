import React,{useState} from "react";

function ChatOptions(props:any) {

  return (
    <>
      <button 
      onClick={() => {
          
           props.options.setViewOptions(!props.options.viewOptions)
           console.log(props.options.viewOptions) 
      }}
      className= {`absolute top-0 right-0 h-[40px] w-[40px] rounded-full slide-left  flex items-center justify-center bg-[${props.color}]  shadow-[-6px_6px_5px_${props.color}]`}>
        <svg
          viewBox="0 0 18 18"
          height="20"
          width="20"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0px"
          y="0px"
          enable-background="new 0 0 18 18"
        >
          <title>down-context</title>
          <path
            fill="currentColor"
            d="M3.3,4.6L9,10.3l5.7-5.7l1.6,1.6L9,13.4L1.7,6.2L3.3,4.6z"
          ></path>
        </svg>
      </button>
      
    </>
  );
}

export default ChatOptions;
