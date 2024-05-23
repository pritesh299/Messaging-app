import React, { useState } from "react";

function SearchComponent() {
  let [focus, setFocus] = useState(false);

  return (
    <>
      <div className="w-[100%] h-[7.5%] bg-[#111b21] p-4">
        <div className="flex">
          <div className="w-[20%] py-1 rounded-l-lg bg-[#202c33] flex justify-center items-center">
            <div className={`svg-container ${focus ? 'focused' : 'unfocused'}`}>
              {focus ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 28 25"
                  stroke-width="2"
                  stroke="#25D366"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  color="#FFFFFF"
                  fill="none"
                  viewBox="0 0 28 25"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              )}
            </div>
          </div>
          <input
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            className="w-[100%] bg-[#202c33]  outline-none rounded-r-lg caret-white text-white"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="w-[100%] h-[7.5%] bg-[#111b21] pb-3 px-3 pt-2 border-b border-slate-700">
        <div className=" flex gap-3">
          <button className="text-slate-200 bg-[#202c33]  rounded-2xl px-3 py-1 "> All</button>
          <button className="text-slate-200 bg-[#202c33]  rounded-2xl px-3 py-1 "> Unread</button>
        </div>
      </div>
    </>
  );
} 

export default SearchComponent;
