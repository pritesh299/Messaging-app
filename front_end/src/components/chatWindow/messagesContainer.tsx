import React,{useState} from "react";
import Message from "./message";


function MessagesContainer() {

  const [viewOptions, setViewOptions] = useState(false);
 
  return (
    <div className="h-[85%]  relative">
      {viewOptions && (
          <div className="absolute top-0 left-0 z-10  mt-2 py-3 w-[200px] bg-[#2a3942] shadow-lg">
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
        )}
      <div
        style={{ backgroundImage: `url('/background.png')` }}
        className="h-full w-full bg-fixed l"
      >
        <div className="h-full w-full bg-[#0b141a] bg-opacity-[0.95] overflow-y-scroll py-2"> 
        <div className="h-full w-full relative  px-[5%]  ">
          <Message left={true}  right={false}  middle={false}  options={{viewOptions:viewOptions,setViewOptions:setViewOptions}}/>
          <Message left={false}  right={true}  middle={false} options={{viewOptions:viewOptions,setViewOptions:setViewOptions}} />  
          <Message left={false}  right={false}  middle={true}  options={{viewOptions:viewOptions,setViewOptions:setViewOptions}}/>
        </div>
        </div> 
      </div>
    </div>
  );
}

export default MessagesContainer;
