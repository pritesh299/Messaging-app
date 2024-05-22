import React, { useState } from "react";

function Card_options() {
  const [viewOptions, setViewOptions] = useState(false);

  return (
    <>
   
      <button
        onClick={() => {
          console.log(viewOptions)
          setViewOptions(!viewOptions);
        }}
        className="w-[100%] flex justify-center "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>

        {viewOptions && (
          <div className="absolute  mt-2 py-3 w-[200px] bg-[#2a3942] shadow-lg">
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
      </button>
    </>
  );
}

export default Card_options;
